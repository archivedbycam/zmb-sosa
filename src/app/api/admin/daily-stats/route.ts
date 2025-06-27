import { NextResponse } from 'next/server'
import { getDailyStats } from '@/lib/analytics'

export async function GET() {
  try {
    const dailyStats = await getDailyStats(7) // Last 7 days
    
    return NextResponse.json(dailyStats)
  } catch (error) {
    console.error('Daily stats API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 