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
                console.log("🔄 Fetching university banners from /api/banners...")
                const response = await fetch("/api/banners", {
                    cache: "no-store",
                    headers: { "Cache-Control": "no-cache" }
                })

                if (!response.ok) {
                    throw new Error(`API returned status ${response.status}`)
                }

                const result = await response.json()
                console.log("✅ Banner data received:", result)

                if (result.success && result.data && Array.isArray(result.data) && result.data.length > 0) {
                    // Transform banners to slides format
                    const transformedSlides = result.data.map((banner) => ({
                        id: banner._id,
                        title: banner.university?.universityName || "Featured University",
                        description: banner.offerText || "Exclusive offer",
                        offer: banner.offerPercentage || "",
                        deadline: banner.deadlineText || "",
                        image: banner.customBannerImage || banner.university?.bannerImage || "/placeholder.jpg",
                        university: banner.university,
                        ctaText: banner.buttonText || "Apply Now",
                        ctaLink: banner.university?.slug ? `/university/${banner.university.slug}` : "/universities"
                    }))
                    console.log(`📊 Loaded ${transformedSlides.length} banner slides`)
                    setSlides(transformedSlides)
                    setError(null)
                } else {
                    console.warn("⚠️ No banners in response")
                    setSlides([])
                    setError("No university offers available")
                }
            } catch (err) {
                console.error("❌ Error fetching banners:", err)
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
        }, 3000) // Increased speed to 3s
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
            <section className="w-full h-[320px] sm:h-[400px] bg-gray-300 rounded-lg flex items-center justify-center">
                <p className="text-gray-700 text-base sm:text-lg">Loading banner...</p>
            </section>
        )
    }

    if (error || slides.length === 0) {
        return (
            <section className="w-full h-[320px] sm:h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-600 text-base sm:text-lg">{error || "No slides available"}</p>
            </section>
        )
    }

    const slide = slides[currentSlide]
    return (
        <section className="relative w-full h-[350px] sm:h-[400px] overflow-hidden rounded-lg">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${slide.image}')` }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="relative h-full flex flex-col justify-center items-start px-6 sm:px-8 lg:px-16 z-10">
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4 max-w-xl leading-tight">
                    {slide.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-gray-100 mb-2 sm:mb-3 max-w-lg">
                    {slide.description}
                </p>
                {slide.offer && (
                    <p className="text-lg sm:text-2xl font-bold text-yellow-300 mb-3 sm:mb-4">
                        {slide.offer}
                    </p>
                )}
                {slide.deadline && (
                    <p className="text-xs sm:text-sm text-red-200 mb-5 sm:mb-8 font-semibold">
                        Apply by: {slide.deadline}
                    </p>
                )}
                <Link href={slide.ctaLink}>
                    <Button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 sm:px-8 sm:py-3 text-sm sm:text-lg rounded-md">
                        {slide.ctaText}
                    </Button>
                </Link>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 p-1.5 sm:p-2 rounded-full transition-all hidden sm:block"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 p-1.5 sm:p-2 rounded-full transition-all hidden sm:block"
                aria-label="Next slide"
            >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {slides.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-2 sm:h-3 rounded-full transition-all ${idx === currentSlide ? "bg-white w-6 sm:w-8" : "bg-white/50 w-2 sm:w-3"
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </section>
    )
}
