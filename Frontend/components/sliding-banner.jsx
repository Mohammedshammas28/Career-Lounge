"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SlidingBanner() {
    const [slides, setSlides] = useState([])
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchBannerData = async () => {
            try {
                console.log("🔄 Fetching banner data from /api/banner...")
                const response = await fetch("/api/banner", {
                    cache: "no-store",
                    headers: { "Cache-Control": "no-cache" }
                })

                if (!response.ok) {
                    throw new Error(`API returned status ${response.status}`)
                }

                const data = await response.json()
                console.log("✅ Banner data received:", data)

                if (data.slides && Array.isArray(data.slides) && data.slides.length > 0) {
                    console.log(`📊 Loaded ${data.slides.length} banner slides`)
                    setSlides(data.slides)
                    setError(null)
                } else {
                    console.warn("⚠️ No slides in response")
                    setSlides([])
                    setError("No slides available")
                }
            } catch (err) {
                console.error("❌ Error fetching banner:", err)
                setSlides([])
                setError(`Error: ${err.message}`)
            } finally {
                setLoading(false)
            }
        }

        fetchBannerData()

        // Refetch every 30 seconds to sync with admin changes
        const refreshInterval = setInterval(fetchBannerData, 30000)

        return () => clearInterval(refreshInterval)
    }, [])

    useEffect(() => {
        if (slides.length === 0) return
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [slides.length])

    // Validate currentSlide index when slides change (e.g., admin deletes slides)
    useEffect(() => {
        if (currentSlide >= slides.length && slides.length > 0) {
            console.log(`⚠️ Current slide index ${currentSlide} exceeds slides length. Resetting to 0.`)
            setCurrentSlide(0)
        }
    }, [slides, currentSlide])

    const nextSlide = () => {
        if (slides.length === 0) return
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        if (slides.length === 0) return
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }

    if (loading) {
        return (
            <section className="w-full h-[400px] bg-gray-300 rounded-lg flex items-center justify-center">
                <p className="text-gray-700 text-lg">Loading banner...</p>
            </section>
        )
    }

    if (error || slides.length === 0) {
        return (
            <section className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-600 text-lg">{error || "No slides available"}</p>
            </section>
        )
    }

    const slide = slides[currentSlide]
    return (
        <section className="relative w-full h-[400px] overflow-hidden rounded-lg">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${slide.image}')` }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="relative h-full flex flex-col justify-center items-start px-8 lg:px-16 z-10">
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 max-w-xl">
                    {slide.title}
                </h2>
                <p className="text-lg text-gray-100 mb-8 max-w-lg">
                    {slide.description}
                </p>
                <Link href={slide.ctaLink}>
                    <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                        {slide.ctaText}
                    </Button>
                </Link>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 p-2 rounded-full transition-all"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 p-2 rounded-full transition-all"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-3 rounded-full transition-all ${idx === currentSlide ? "bg-white w-8" : "bg-white/50 w-3"
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </section>
    )
}
