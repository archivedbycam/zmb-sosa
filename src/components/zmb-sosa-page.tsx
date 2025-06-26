import { Button } from "@/components/ui/button"
import NavHeader from "@/components/nav-header"
import NewsletterFooter from "@/components/newsletter-footer"

export default function ZmbSosaPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <NavHeader />

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-8 py-4 flex-1">
        {/* Embedded Video Player */}
        <div className="mb-12 w-full max-w-2xl">
          <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
            <video 
              controls 
              className="absolute inset-0 w-full h-full rounded-lg bg-black object-contain" 
              preload="metadata"
            >
              <source src="/started%20rough%20final%20.mp4" type="video/mp4" />
              Your browser does not support the video element.
            </video>
          </div>
        </div>

        {/* Title Text */}
        <p className="text-[#000000] text-4xl font-bold mb-8 text-center">
          
        </p>

        {/* Button */}
        <Button className="bg-black text-white hover:bg-black px-8 py-3 rounded-md font-medium transition-colors">
          Stream Now
        </Button>
      </div>

      {/* Footer */}
      <NewsletterFooter />
    </div>
  )
} 