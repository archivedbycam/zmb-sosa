"use client"

import { useState, useEffect } from "react"
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
  const [showSubscribe, setShowSubscribe] = useState(true)
  const [checkingSubscription, setCheckingSubscription] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  useEffect(() => {
    const checkSubscription = async () => {
      if (!formData.email || !formData.email.includes('@')) {
        setShowSubscribe(true)
        return
      }
      setCheckingSubscription(true)
      try {
        const response = await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email })
        })
        if (response.status === 409) {
          setShowSubscribe(false)
          setIsSubscribed(false)
        } else {
          setShowSubscribe(true)
        }
      } catch {
        setShowSubscribe(true)
      } finally {
        setCheckingSubscription(false)
      }
    }
    checkSubscription()
  }, [formData.email])

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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, subscribe: isSubscribed }),
      })
      const data = await response.json()

      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.")
        setFormData({ name: "", email: "", message: "" })
        setIsSubscribed(false)
      } else {
        toast.error(data.error || "Failed to send message. Please try again.")
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
                {checkingSubscription ? (
                  <span className="text-sm text-gray-500">Checking subscription status...</span>
                ) : showSubscribe && (
                  <>
                    <Checkbox
                      id="subscribe"
                      checked={isSubscribed}
                      onCheckedChange={(checked) => setIsSubscribed(checked as boolean)}
                      className="border-gray-300"
                    />
                    <Label htmlFor="subscribe" className="text-black text-sm font-medium cursor-pointer">
                      Subscribe to mailing list
                    </Label>
                  </>
                )}
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