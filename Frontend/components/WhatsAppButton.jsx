"use client"

import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"
import { usePathname } from "next/navigation"

export default function WhatsAppButton() {
    const pathname = usePathname()
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const timer = window.setTimeout(() => setIsVisible(true), 4000)
        return () => window.clearTimeout(timer)
    }, [])

    if (!isVisible || pathname?.startsWith("/admin")) {
        return null
    }

    const phoneNumber = "917396460717"
    const message = encodeURIComponent(
        "Hi Career Lounge, I'm interested in studying abroad."
    )
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

    return (
        <div className="group fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
            <div className="pointer-events-none translate-y-2 rounded-2xl border border-white/20 bg-slate-950/90 px-3 py-2 text-right text-xs text-white shadow-[0_20px_40px_rgba(0,0,0,0.25)] backdrop-blur opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="font-semibold text-emerald-300">Need help?</div>
                <div>Chat with us on WhatsApp</div>
            </div>

            <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Chat with Career Lounge on WhatsApp"
                className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_20px_40px_rgba(37,211,102,0.45)] transition-transform duration-200 hover:scale-105 hover:shadow-[0_24px_48px_rgba(37,211,102,0.55)] focus:outline-none focus:ring-4 focus:ring-emerald-300/40 sm:h-16 sm:w-16"
            >
                <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
            </a>
        </div>
    )
}