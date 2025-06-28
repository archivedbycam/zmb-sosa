"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Instagram, Youtube } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export default function Component() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubscribe = async () => {
    if (!email || !email.includes('@')) {
      toast.error("Please enter a valid email address")
      return
    }

    setStatus("loading")
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        toast.success(data.message)
        setEmail("")
      } else {
        setStatus("error")
        toast.error(data.error)
      }
    } catch (error) {
      setStatus("error")
      toast.error("Something went wrong. Please try again.")
    }
  }

  return (
    <footer className="border-[#d0d5dd] p-6 px-96 border-t-0 bg-[#ffffff]">
      <div className="w-full space-y-6 px-56">
        {/* Newsletter Signup */}
        <div className="flex flex-col gap-3 justify-center max-w-md mx-auto">
          <div className="flex gap-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border-[#d0d5dd] text-[#667085] placeholder:text-[#98a2b3] rounded-lg px-4 py-3 bg-white"
              disabled={status === "loading"}
            />
            <Button 
              onClick={handleSubscribe}
              disabled={status === "loading"}
              className="bg-[#000000] hover:bg-[#101828] text-[#ffffff] rounded-lg px-6 py-3 font-medium disabled:opacity-50"
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-6 py-8">
          {/* X (Twitter) Icon */}
          <button className="text-[#000000] hover:text-[#475467] transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="sr-only">X (Twitter)</span>
          </button>

          {/* Instagram Icon */}
          <button className="text-[#000000] hover:text-[#475467] transition-colors">
            <Instagram size={24} />
            <span className="sr-only">Instagram</span>
          </button>

          {/* YouTube Icon */}
          <button className="text-[#000000] hover:text-[#475467] transition-colors">
            <Youtube size={24} />
            <span className="sr-only">YouTube</span>
          </button>

          {/* TikTok Icon */}
          <button className="text-[#000000] hover:text-[#475467] transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
            <span className="sr-only">TikTok</span>
          </button>
        </div>
      </div>
      <div className="w-full text-right pr-6">
        <p className="text-[#667085] text-sm"></p>
      </div>
    </footer>
  )
}
