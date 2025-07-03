# Newsletter System Setup Guide

This guide will help you set up the complete newsletter subscription system with database integration, email validation, rate limiting, double opt-in, and analytics.

## Prerequisites

1. **Supabase Account** - [Sign up here](https://supabase.com)
2. **Upstash Redis Account** - [Sign up here](https://upstash.com) (for rate limiting)
3. **Resend Account** - [Sign up here](https://resend.com) (for sending emails)
4. **Email Marketing Service** (optional) - Mailchimp, ConvertKit, etc.

## Step 1: Set Up Supabase Database

1. Create a new Supabase project
2. Go to the SQL Editor and run the following SQL commands:

```sql
-- Create newsletter subscribers table
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'unsubscribed')),
  confirmation_token TEXT,
  confirmed_at TIMESTAMP WITH TIME ZONE,
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address TEXT,
  user_agent TEXT
);

-- Create subscription analytics table
CREATE TABLE subscription_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  status TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  ip_address TEXT
);

-- Create indexes for better performance
CREATE INDEX idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_subscribers_status ON newsletter_subscribers(status);
CREATE INDEX idx_newsletter_subscribers_token ON newsletter_subscribers(confirmation_token);
CREATE INDEX idx_subscription_analytics_timestamp ON subscription_analytics(timestamp);
CREATE INDEX idx_subscription_analytics_status ON subscription_analytics(status);

-- IMPORTANT: Fix Row Level Security (RLS) policies
-- Supabase enables RLS by default, but doesn't create policies
-- This causes "violates row-level security policy" errors
ALTER TABLE newsletter_subscribers DISABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_analytics DISABLE ROW LEVEL SECURITY;
```

3. Get your Supabase URL and anon key from Settings > API

## Step 2: Set Up Upstash Redis

1. Create a new Redis database in Upstash
2. Get your REST URL and token from the database dashboard

## Step 3: Set Up Resend

1. Create a Resend account
2. Add and verify your domain
3. Get your API key from the dashboard

## Step 4: Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Upstash Redis (for rate limiting)
UPSTASH_REDIS_REST_URL=your_upstash_redis_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_token

# Email Service (Resend)
RESEND_API_KEY=your_resend_api_key

# Email Marketing Services (optional)
MAILCHIMP_API_KEY=your_mailchimp_api_key
MAILCHIMP_LIST_ID=your_mailchimp_list_id
CONVERTKIT_API_KEY=your_convertkit_api_key
CONVERTKIT_FORM_ID=your_convertkit_form_id

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

## Step 5: Install Dependencies

The required dependencies have already been installed:
- `@supabase/supabase-js` - Database client
- `@upstash/redis` - Rate limiting
- `resend` - Email service

## Step 6: Test the System

1. Start your development server: `npm run dev`
2. Test the newsletter subscription form
3. Check your email for the confirmation link
4. Visit `/admin/analytics` to view subscription statistics

## Features Implemented

### ✅ Email Validation and Sanitization
- Comprehensive email format validation
- Disposable email domain blocking
- Email sanitization (trim, lowercase)
- Length and format checks

### ✅ Rate Limiting
- 5 subscription attempts per hour per IP
- Redis-based rate limiting
- Graceful fallback if Redis is unavailable

### ✅ Double Opt-in for GDPR Compliance
- Email confirmation required
- Confirmation tokens with expiration
- Pending status until confirmed
- Unsubscribe functionality

### ✅ Email Marketing Service Integration
- Mailchimp integration
- ConvertKit integration
- Extensible for other services
- Automatic list management

### ✅ Analytics Tracking
- Subscription attempt tracking
- Conversion rate calculation
- Daily statistics
- Admin dashboard at `/admin/analytics`

## API Endpoints

- `POST /api/newsletter` - Subscribe to newsletter
- `PUT /api/newsletter` - Confirm subscription
- `DELETE /api/newsletter` - Unsubscribe
- `GET /api/admin/stats` - Get subscription statistics
- `GET /api/admin/daily-stats` - Get daily statistics

## Pages

- `/confirm-subscription` - Email confirmation page
- `/admin/analytics` - Analytics dashboard

## Customization

### Email Templates
Edit the email template in `src/lib/email-service.ts` to match your brand.

### Rate Limiting
Adjust the rate limits in `src/lib/rate-limit.ts`:
- Change `limit` for different attempt limits
- Change `window` for different time windows

### Email Marketing Services
Add your preferred email marketing service in `src/lib/email-service.ts`.

### Styling
The components use Tailwind CSS and can be customized to match your design.

## Security Features

- Rate limiting to prevent spam
- Email validation and sanitization
- Confirmation tokens for security
- IP address tracking
- User agent logging

## Troubleshooting

### Common Issues

1. **"Internal server error" when subscribing**: This is usually caused by Row Level Security (RLS) policies. Make sure you've run the RLS fix commands in Step 1.

2. **"violates row-level security policy" error**: Run these commands in your Supabase SQL Editor:
   ```sql
   ALTER TABLE newsletter_subscribers DISABLE ROW LEVEL SECURITY;
   ALTER TABLE subscription_analytics DISABLE ROW LEVEL SECURITY;
   ```

3. **Emails not sending**: Check your Resend API key and domain verification

4. **Rate limiting not working**: Verify your Upstash Redis credentials

5. **Database errors**: Check your Supabase connection and table structure

6. **Confirmation links not working**: Ensure `NEXT_PUBLIC_SITE_URL` is set correctly

### Debug Mode

Add `DEBUG=true` to your environment variables to enable detailed logging.

## Support

If you encounter any issues, check the browser console and server logs for error messages. The system includes comprehensive error handling and logging. 