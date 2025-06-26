"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function NavHeader() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center justify-between px-8 py-6 border-b-[0.5px] border-black">
      <Link href="/" className="text-lg font-medium text-black hover:text-black transition-colors">
        zmb sosa
      </Link>
      <div className="w-full max-w-2xl flex items-center justify-between ml-auto mr-auto">
        <Link 
          href="/projects" 
          className={`text-black hover:text-black transition-colors ${pathname === "/projects" ? "font-bold" : ""}`}
        >
          Projects
        </Link>
        <Link 
          href="/store" 
          className={`text-black hover:text-black transition-colors ${pathname === "/store" ? "font-bold" : ""}`}
        >
          Store
        </Link>
        <Link 
          href="/contact" 
          className={`text-black hover:text-black transition-colors ${pathname === "/contact" ? "font-bold" : ""}`}
        >
          Contact
        </Link>
      </div>
      <div className="w-20"></div> {/* Spacer to balance the zmb sosa text */}
    </nav>
  )
} 