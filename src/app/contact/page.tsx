"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import NavHeader from "@/components/nav-header"
import NewsletterFooter from "@/components/newsletter-footer"
import { toast } from "sonner"

export default function ContactPage() {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields")
      return
    }

    if (!formData.email.includes('@')) {
      toast.error("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success("Message sent successfully! We'll get back to you soon.")
      
      // Reset form
      setFormData({ name: "", email: "", message: "" })
      setIsSubscribed(false)
      
      // If user checked subscribe, add them to newsletter
      if (isSubscribed) {
        try {
          const response = await fetch('/api/newsletter', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: formData.email }),
          })

          const data = await response.json()

          if (response.ok) {
            toast.success("You've also been subscribed to our newsletter!")
          } else {
            toast.error(data.error || "Failed to subscribe to newsletter")
          }
        } catch (error) {
          toast.error("Failed to subscribe to newsletter")
        }
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <NavHeader />
      
      <div className="flex-1 flex items-center justify-center p-4">
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-100 p-8">
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
                <Input 
                  id="name" 
                  name="name"
                  type="text" 
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border-gray-300 bg-white text-black rounded-md h-10" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-black text-sm font-medium">
                  Email
                </Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border-gray-300 bg-white text-black rounded-md h-10" 
                />
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
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full border border-gray-300 bg-white text-black rounded-md p-3 resize-none focus:outline-none focus:ring-gray-500 focus:border-transparent"
                placeholder="Enter your message here..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black hover:bg-neutral-900 text-white font-medium py-2.5 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send message"}
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <NewsletterFooter />
    </div>
  )
} 