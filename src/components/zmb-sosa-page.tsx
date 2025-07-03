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
        {/**
        <Button className="bg-black text-white hover:bg-black px-8 py-3 rounded-md font-medium transition-colors">
          Stream Now
        </Button>
        */}
      </div>

      {/* Links Section */}
      <div className="px-8 py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-black">Connect & Stream</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bandcamp */}
            <a 
              href="https://bandcamp.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 text-center group"
            >
              <h3 className="font-semibold text-lg mb-2 text-black group-hover:text-gray-700">Bandcamp</h3>
              <p className="text-gray-600 text-sm">Stream and support on Bandcamp</p>
            </a>

            {/* Soundcloud */}
            <a 
              href="https://soundcloud.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 text-center group"
            >
              <h3 className="font-semibold text-lg mb-2 text-black group-hover:text-gray-700">Soundcloud</h3>
              <p className="text-gray-600 text-sm">Listen on Soundcloud</p>
            </a>

            {/* Website */}
            <a 
              href="https://linktr.ee/zmbsosa" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 text-center group"
            >
              <h3 className="font-semibold text-lg mb-2 text-black group-hover:text-gray-700">Connect</h3>
              <p className="text-gray-600 text-sm">Visit linktr.ee/zmbsosa</p>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <NewsletterFooter />
    </div>
  )
} 