import { Resend } from 'resend'

const resend = new Resend('re_FrG25sLL_A1PxLPM3sYxZ4jfahasDKyTQ')

export function generateToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export async function sendConfirmationEmail(email: string, token: string) {
  try {
    // Use environment variable or fallback to localhost
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'
    const confirmationUrl = `${siteUrl}/confirm-subscription?token=${token}`
    
    await resend.emails.send({
      from: 'contact@zmbsosa.com',
      to: email,
      subject: 'Confirm your newsletter subscription',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; text-align: center;">Welcome to our newsletter!</h2>
          <p style="color: #666; line-height: 1.6;">
            Thank you for subscribing to our newsletter. To complete your subscription, please click the button below:
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${confirmationUrl}" 
               style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Confirm Subscription
            </a>
          </div>
          <p style="color: #666; line-height: 1.6; font-size: 14px; text-align: center;">
            If you didn't request this subscription, you can safely ignore this email.
          </p>
          <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">
            This link will expire in 24 hours.
          </p>
        </div>
      `
    })
  } catch (error) {
    console.error('Email sending error:', error)
    throw error // Re-throw the error so the API can handle it properly
  }
}

export async function sendContactEmail({ name, email, message, subscribe }: { name: string, email: string, message: string, subscribe: boolean }) {
  try {
    console.log('Sending contact email with Resend:', { name, email, message, subscribe });
    const result = await resend.emails.send({
      from: 'contact@zmbsosa.com',
      to: 'contact@zmbsosa.com',
      subject: name,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; text-align: center;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subscribe to mailing list:</strong> ${subscribe ? "Yes" : "No"}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-line;">${message}</p>
        </div>
      `
    });
    console.log('Resend response:', result);
  } catch (error) {
    console.error('Contact email sending error:', error)
    throw error
  }
}

/*
export async function addToEmailMarketingService(email: string) {
  // Integration with your preferred email marketing service
  // Example for Mailchimp:
  if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID) {
    try {
      const response = await fetch(`https://us1.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.MAILCHIMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
        }),
      })

      if (!response.ok) {
        console.error('Mailchimp integration error:', await response.text())
      }
    } catch (error) {
      console.error('Email marketing service error:', error)
    }
  }
  
  // Example for ConvertKit:
  if (process.env.CONVERTKIT_API_KEY && process.env.CONVERTKIT_FORM_ID) {
    try {
      const response = await fetch(`https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: process.env.CONVERTKIT_API_KEY,
          email: email,
        }),
      })

      if (!response.ok) {
        console.error('ConvertKit integration error:', await response.text())
      }
    } catch (error) {
      console.error('ConvertKit integration error:', error)
    }
  }
}
*/ 