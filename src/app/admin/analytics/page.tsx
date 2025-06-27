"use client"

import { useEffect, useState } from 'react'

interface SubscriptionStats {
  total: number
  confirmed: number
  pending: number
  failed: number
  conversionRate: number
}

interface DailyStats {
  date: string
  total: number
  confirmed: number
  pending: number
  failed: number
}

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState<SubscriptionStats | null>(null)
  const [dailyStats, setDailyStats] = useState<DailyStats[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [statsResponse, dailyResponse] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/daily-stats')
      ])

      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }

      if (dailyResponse.ok) {
        const dailyData = await dailyResponse.json()
        setDailyStats(dailyData)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Newsletter Analytics</h1>
        
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Total Subscriptions</h3>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Confirmed</h3>
              <p className="text-3xl font-bold text-green-600">{stats.confirmed}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Pending</h3>
              <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-sm font-medium text-gray-500">Conversion Rate</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.conversionRate.toFixed(1)}%</p>
            </div>
          </div>
        )}

        {dailyStats.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Daily Statistics (Last 7 Days)</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confirmed</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pending</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Failed</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dailyStats.map((day, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{day.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{day.total}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{day.confirmed}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600">{day.pending}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">{day.failed}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 