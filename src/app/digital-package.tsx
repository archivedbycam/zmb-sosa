"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import NavHeader from "@/components/nav-header"

export default function Component() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "track (MP3 File)",
      description: "",
    },
    {
      title: "The full film (4:3 format, 4k resolution, MP4 file)",
      description: "",
    },
    {
      title: "All high-resolution image stills",
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

  return (
    <div className="min-h-screen bg-[#ffffff]">
      {/* Navigation */}
      <NavHeader />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 py-16">
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
                <div className="w-96 h-80 bg-[#c4c4c4] rounded-lg mb-4"></div>
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
          <Button className="bg-[#0f172a] hover:bg-[#101828] text-[#ffffff] px-8 py-3 rounded-lg font-medium">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  )
}
