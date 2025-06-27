import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { rateLimit } from '@/lib/rate-limit'
import { validateEmail } from '@/lib/email-validation'
import { sendConfirmationEmail, generateToken } from '@/lib/email-service'
import { trackSubscriptionAttempt } from '@/lib/analytics'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown'
    const { success } = await rateLimit(ip)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const { email } = await request.json()
    
    // Email validation and sanitization
    const validationResult = validateEmail(email)
    if (!validationResult.isValid) {
      return NextResponse.json(
        { error: validationResult.error },
        { status: 400 }
      )
    }

    const sanitizedEmail = validationResult.email!

    // Check if email already exists
    const { data: existingSubscriber, error: checkError } = await supabase
      .from('newsletter_subscribers')
      .select('id, status')
      .eq('email', sanitizedEmail)
      .single()

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "not found" error
      console.error('Database check error:', checkError)
      return NextResponse.json(
        { error: 'Database error during email check' },
        { status: 500 }
      )
    }

    if (existingSubscriber) {
      if (existingSubscriber.status === 'confirmed') {
        return NextResponse.json(
          { error: 'Email already subscribed' },
          { status: 409 }
        )
      } else if (existingSubscriber.status === 'pending') {
        // Generate new token
        const newToken = generateToken();
        // Update DB with new token
        await supabase
          .from('newsletter_subscribers')
          .update({ confirmation_token: newToken })
          .eq('email', sanitizedEmail);
        // Send email with new token
        await sendConfirmationEmail(sanitizedEmail, newToken);
        return NextResponse.json(
          { message: 'Confirmation email sent. Please check your inbox.' },
          { status: 200 }
        );
      }
    }

    // Generate confirmation token
    const confirmationToken = generateToken()

    // Insert new subscriber with pending status
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ 
        email: sanitizedEmail,
        status: 'pending',
        confirmation_token: confirmationToken,
        ip_address: ip,
        user_agent: request.headers.get('user-agent') || null
      }])
      .select()

    if (error) {
      console.error('Database insert error:', error)
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      )
    }

    // Send confirmation email
    try {
      await sendConfirmationEmail(sanitizedEmail, confirmationToken)
    } catch (emailError) {
      console.error('Email sending error:', emailError)
      // Continue with the process even if email fails
    }

    // Track analytics
    try {
      await trackSubscriptionAttempt(sanitizedEmail, 'pending')
    } catch (analyticsError) {
      console.error('Analytics error:', analyticsError)
      // Continue with the process even if analytics fails
    }

    return NextResponse.json(
      { message: 'Please check your email to confirm your subscription!' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : 'Unknown'
    })
    return NextResponse.json(
      { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    )
  }
}

// Confirmation endpoint
export async function PUT(request: NextRequest) {
  try {
    const { token } = await request.json()
    
    if (!token) {
      return NextResponse.json(
        { error: 'Invalid confirmation token' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .update({ 
        status: 'confirmed',
        confirmed_at: new Date().toISOString()
      })
      .eq('confirmation_token', token)
      .eq('status', 'pending')
      .select()

    if (error || !data || data.length === 0) {
      return NextResponse.json(
        { error: 'Invalid or expired confirmation token' },
        { status: 400 }
      )
    }

    // Track successful confirmation
    await trackSubscriptionAttempt(data[0].email, 'confirmed')

    return NextResponse.json(
      { message: 'Subscription confirmed successfully!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Confirmation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Unsubscribe endpoint
export async function DELETE(request: NextRequest) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('newsletter_subscribers')
      .update({ 
        status: 'unsubscribed',
        unsubscribed_at: new Date().toISOString()
      })
      .eq('email', email)
      .eq('status', 'confirmed')

    if (error) {
      console.error('Unsubscribe error:', error)
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Successfully unsubscribed' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Unsubscribe error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 