import { supabase } from './supabase'

export async function trackSubscriptionAttempt(email: string, status: 'pending' | 'confirmed' | 'failed') {
  try {
    await supabase
      .from('subscription_analytics')
      .insert([{
        email,
        status,
        timestamp: new Date().toISOString(),
        user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : null,
      }])
  } catch (error) {
    console.error('Analytics tracking error:', error)
  }
}

export async function getSubscriptionStats() {
  try {
    const { data, error } = await supabase
      .from('subscription_analytics')
      .select('*')
      .gte('timestamp', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()) // Last 30 days

    if (error) throw error

    const stats = {
      total: data.length,
      confirmed: data.filter(d => d.status === 'confirmed').length,
      pending: data.filter(d => d.status === 'pending').length,
      failed: data.filter(d => d.status === 'failed').length,
      conversionRate: 0
    }

    if (stats.total > 0) {
      stats.conversionRate = (stats.confirmed / stats.total) * 100
    }

    return stats
  } catch (error) {
    console.error('Analytics retrieval error:', error)
    return null
  }
}

export async function getDailyStats(days: number = 7) {
  try {
    const { data, error } = await supabase
      .from('subscription_analytics')
      .select('*')
      .gte('timestamp', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
      .order('timestamp', { ascending: true })

    if (error) throw error

    // Group by date
    const dailyStats = data.reduce((acc, record) => {
      const date = new Date(record.timestamp).toDateString()
      if (!acc[date]) {
        acc[date] = { date, total: 0, confirmed: 0, pending: 0, failed: 0 }
      }
      acc[date].total++
      acc[date][record.status]++
      return acc
    }, {} as Record<string, any>)

    return Object.values(dailyStats)
  } catch (error) {
    console.error('Daily stats error:', error)
    return []
  }
} 