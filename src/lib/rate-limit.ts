import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'https://blessed-jaybird-16626.upstash.io',
  token: 'AUDyAAIjcDE0YjJjY2M4YjhmYTM0MTdiODFhNzIxNmM0Y2EzOWM3OXAxMA',
})

// IP addresses exempt from rate limiting
const EXEMPT_IPS = ['127.0.0.1', '::1', 'localhost', 'unknown']

export async function rateLimit(identifier: string) {
  // Check if IP is exempt from rate limiting
  if (EXEMPT_IPS.includes(identifier)) {
    return { success: true }
  }

  const key = `rate_limit:newsletter:${identifier}`
  const limit = 5 // 5 attempts per hour
  const window = 3600 // 1 hour in seconds

  try {
    const current = await redis.incr(key)
    
    if (current === 1) {
      await redis.expire(key, window)
    }

    if (current > limit) {
      return { success: false }
    }

    return { success: true }
  } catch (error) {
    console.error('Rate limiting error:', error)
    // If Redis fails, allow the request (fail open)
    return { success: true }
  }
}