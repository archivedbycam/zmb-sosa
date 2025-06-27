import { NextResponse } from 'next/server'
import { getSubscriptionStats } from '@/lib/analytics'

export async function GET() {
  try {
    const stats = await getSubscriptionStats()
    
    if (!stats) {
      return NextResponse.json(
        { error: 'Failed to fetch statistics' },
        { status: 500 }
      )
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Stats API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 