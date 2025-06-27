-- Fix Row Level Security policies for newsletter system
-- Run this in your Supabase SQL Editor

-- Option 1: Disable RLS (simpler approach)
ALTER TABLE newsletter_subscribers DISABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_analytics DISABLE ROW LEVEL SECURITY;

-- Option 2: Enable RLS with proper policies (more secure approach)
-- Uncomment the lines below if you want to use RLS with policies instead of disabling it

/*
-- Enable RLS
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_analytics ENABLE ROW LEVEL SECURITY;

-- Policy for newsletter_subscribers table
-- Allow anonymous users to insert new subscribers
CREATE POLICY "Allow anonymous insert" ON newsletter_subscribers
    FOR INSERT TO anon
    WITH CHECK (true);

-- Allow anonymous users to select their own subscription
CREATE POLICY "Allow anonymous select" ON newsletter_subscribers
    FOR SELECT TO anon
    USING (true);

-- Allow anonymous users to update their subscription status
CREATE POLICY "Allow anonymous update" ON newsletter_subscribers
    FOR UPDATE TO anon
    USING (true)
    WITH CHECK (true);

-- Policy for subscription_analytics table
-- Allow anonymous users to insert analytics data
CREATE POLICY "Allow anonymous analytics insert" ON subscription_analytics
    FOR INSERT TO anon
    WITH CHECK (true);

-- Allow authenticated users to read analytics (for admin dashboard)
CREATE POLICY "Allow authenticated analytics select" ON subscription_analytics
    FOR SELECT TO authenticated
    USING (true);
*/ 