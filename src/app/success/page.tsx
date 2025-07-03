"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import NavHeader from "@/components/nav-header"
import NewsletterFooter from "@/components/newsletter-footer"

export default function SuccessPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const searchParams = useSearchParams()

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    
    if (sessionId) {
      // Verify the payment was successful
      verifyPayment(sessionId)
    } else {
      setStatus('error')
    }
  }, [searchParams])

  const verifyPayment = async (sessionId: string) => {
    try {
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      })

      if (response.ok) {
        setStatus('success')
        toast.success('Payment successful! Your digital package will be delivered shortly.')
      } else {
        setStatus('error')
        toast.error('Payment verification failed.')
      }
    } catch (error) {
      setStatus('error')
      toast.error('Something went wrong.')
    }
  }

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col">
      <NavHeader />
      
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          {status === 'loading' && (
            <div>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-4 text-gray-600">Verifying your payment...</p>
            </div>
          )}
          
          {status === 'success' && (
            <div>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="mt-4 text-lg font-medium text-gray-900">Payment Successful!</h2>
              <p className="mt-2 text-gray-600">Thank you for your purchase. You'll receive your digital package via email shortly.</p>
              <a 
                href="/" 
                className="mt-6 inline-block bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Return to Home
              </a>
            </div>
          )}
          
          {status === 'error' && (
            <div>
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="mt-4 text-lg font-medium text-gray-900">Payment Verification Failed</h2>
              <p className="mt-2 text-gray-600">Please contact support if you believe this is an error.</p>
              <a 
                href="/store" 
                className="mt-6 inline-block bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Try Again
              </a>
            </div>
          )}
        </div>
      </div>
      
      <NewsletterFooter />
    </div>
  )
} 