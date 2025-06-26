"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import NavHeader from "@/components/nav-header"
import NewsletterFooter from "@/components/newsletter-footer"

export default function ContactPage() {
  const [isSubscribed, setIsSubscribed] = useState(false)

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <NavHeader />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-100 p-8">
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 text-sm leading-relaxed">
                We will get back with you shortly!
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-black text-sm font-medium">
                  Name
                </Label>
                <Input id="name" type="text" className="border-gray-300 bg-white text-black rounded-md h-10" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-black text-sm font-medium">
                  Email
                </Label>
                <Input id="email" type="email" className="border-gray-300 bg-white text-black rounded-md h-10" />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="subscribe"
                  checked={isSubscribed}
                  onCheckedChange={(checked) => setIsSubscribed(checked as boolean)}
                  className="border-gray-300"
                />
                <Label htmlFor="subscribe" className="text-black text-sm font-medium cursor-pointer">
                  Subscribe to mailing list
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-black text-sm font-medium">
                Message
              </Label>
              <textarea
                id="message"
                rows={4}
                className="w-full border border-gray-300 bg-white text-black rounded-md p-3 resize-none focus:outline-none focus:ring-gray-500 focus:border-transparent"
                placeholder="Enter your message here..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black hover:bg-neutral-900 text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200"
            >
              Send message
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <NewsletterFooter />
    </div>
  )
} 