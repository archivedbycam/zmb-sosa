"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import NavHeader from "@/components/nav-header"
import NewsletterFooter from "@/components/newsletter-footer"
import StillsGallery from "@/components/stills-gallery"
import { toast } from "sonner"
import { loadStripe } from '@stripe/stripe-js'

export default function Component() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  const slides = [
    {
      title: "Started Rough (MP3 File)",
      description: "",
    },
    {
      title: "The Entire Film (4:3 format, 4k resolution, MP4 file)",
      description: "",
    },
    {
      title: "Hand Selected Stills (JPG/PNG files)",
      description: "",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const getSlideIndex = (offset: number) => {
    return (currentSlide + offset + slides.length) % slides.length
  }

  const handleBuyNow = async () => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/store`,
        }),
      })

      const { sessionId, error } = await response.json()

      if (error) {
        toast.error('Failed to create checkout session')
        return
      }

      // Redirect to Stripe Checkout
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId })
        if (error) {
          toast.error(error.message)
        }
      }
    } catch (error) {
      console.error('Checkout error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleStillsClick = () => {
    if (slides[currentSlide].title === "Hand Selected Stills (JPG/PNG files)") {
      setIsGalleryOpen(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col">
      {/* Navigation */}
      <NavHeader />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 py-16 flex-1">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-[#000000] text-4xl font-bold mb-4">Complete Digital Package</h1>
          <p className="text-[#000000] text-lg">$2.99</p>
        </div>

        {/* Carousel */}
        <div className="relative mb-16">
          <div className="flex items-center justify-center space-x-8">
            {/* Left Arrow */}
            <button onClick={prevSlide} className="p-2 rounded-full hover:bg-[#e2e8f0] transition-colors">
              <ChevronLeft className="w-6 h-6 text-[#667085]" />
            </button>

            {/* Slides Container */}
            <div className="flex items-start space-x-6">
              {/* Left Slide */}
              <div className="flex flex-col items-center">
                <div className="w-60 h-80 bg-[#e2e8f0] rounded-lg mb-4"></div>
                <p className="text-[#000000] text-sm text-center max-w-60">{slides[getSlideIndex(-1)].title}</p>
              </div>

              {/* Center Slide (Main) */}
              <div className="flex flex-col items-center">
                <div 
                  className={`w-96 h-80 rounded-lg mb-4 ${
                    slides[currentSlide].title === "Hand Selected Stills (JPG/PNG files)" 
                      ? "bg-[#c4c4c4] cursor-pointer hover:bg-[#a8a8a8] transition-colors" 
                      : "bg-[#c4c4c4]"
                  }`}
                  onClick={handleStillsClick}
                >
                  {slides[currentSlide].title === "Hand Selected Stills (JPG/PNG files)" ? (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <div className="grid grid-cols-2 grid-rows-2 gap-1 w-96 h-80 min-h-0 min-w-0 h-full w-full">
                        <div className="min-h-0 min-w-0 h-full w-full"><img src="/stills/still-1.png" alt="Still 1" className="object-cover w-full h-full rounded" /></div>
                        <div className="min-h-0 min-w-0 h-full w-full"><img src="/stills/still-2.png" alt="Still 2" className="object-cover w-full h-full rounded" /></div>
                        <div className="min-h-0 min-w-0 h-full w-full"><img src="/stills/still-3.png" alt="Still 3" className="object-cover w-full h-full rounded" /></div>
                        <div className="min-h-0 min-w-0 h-full w-full"><img src="/stills/still-4.png" alt="Still 4" className="object-cover w-full h-full rounded" /></div>
                      </div>
                    </div>
                  ) : null}
                </div>
                <p className="text-[#000000] text-sm text-center max-w-96">
                  {slides[currentSlide].title}
                </p>
              </div>

              {/* Right Slide */}
              <div className="flex flex-col items-center">
                <div className="w-60 h-80 bg-[#e2e8f0] rounded-lg mb-4"></div>
                <p className="text-[#000000] text-sm text-center max-w-60">{slides[getSlideIndex(1)].title}</p>
              </div>
            </div>

            {/* Right Arrow */}
            <button onClick={nextSlide} className="p-2 rounded-full hover:bg-[#e2e8f0] transition-colors">
              <ChevronRight className="w-6 h-6 text-[#667085]" />
            </button>
          </div>
        </div>

        {/* Buy Button */}
        <div className="text-center">
          <Button 
            onClick={handleBuyNow}
            disabled={isLoading}
            className="bg-[#0f172a] hover:bg-[#101828] text-[#ffffff] px-8 py-3 rounded-lg font-medium disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Buy Now"}
          </Button>
        </div>
      </div>

      {/* Footer */}
      <NewsletterFooter />
      
      {/* Gallery Modal */}
      <StillsGallery 
        isOpen={isGalleryOpen} 
        onClose={() => setIsGalleryOpen(false)} 
      />
    </div>
  )
}
