"use client"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface StillsGalleryProps {
  isOpen: boolean
  onClose: () => void
}

// Placeholder images - replace with actual still image paths when available
// Supports both JPG and PNG files
const stillImages = [
  "/stills/still-1.png",
  "/stills/still-2.png", 
  "/stills/still-3.png",
  "/stills/still-4.png",
  "/stills/still-5.png",
  "/stills/still-6.png",
  "/stills/still-7.png",
  "/stills/still-8.png",
  "/stills/still-9.png",
  "/stills/still-10.png",
]

export default function StillsGallery({ isOpen, onClose }: StillsGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!isOpen) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % stillImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + stillImages.length) % stillImages.length)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose()
    } else if (e.key === "ArrowRight") {
      nextImage()
    } else if (e.key === "ArrowLeft") {
      prevImage()
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
        aria-label="Close gallery"
      >
        <X className="w-8 h-8" />
      </button>

      {/* Navigation arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          prevImage()
        }}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation()
          nextImage()
        }}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10"
        aria-label="Next image"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Main image container */}
      <div 
        className="relative max-w-4xl max-h-[80vh] w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Placeholder for actual images */}
          <img
            src={stillImages[currentImageIndex]}
            alt={`Still ${currentImageIndex + 1}`}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>
      </div>

      {/* Image counter */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
        {currentImageIndex + 1} / {stillImages.length}
      </div>

      {/* Thumbnail strip */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-full overflow-x-auto px-4">
        {stillImages.map((image, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation()
              setCurrentImageIndex(index)
            }}
            className={`flex-shrink-0 w-16 h-12 rounded border-2 transition-colors ${
              index === currentImageIndex 
                ? "border-white" 
                : "border-gray-600 hover:border-gray-400"
            }`}
          >
            <div className="w-full h-full bg-gray-700 rounded flex items-center justify-center text-xs text-gray-400">
              {index + 1}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
} 