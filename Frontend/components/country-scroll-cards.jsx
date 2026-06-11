"use client"

import { useRef, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

// Fallback static data (same countries as before)
const STATIC_DESTINATIONS = [
  { title: "Australia", image: "https://flagcdn.com/w320/au.png", buttonLink: "/universities?country=Australia", description: "Top academic programs with pathways to permanent residency and work permits.", totalUniversities: 43 },
  { title: "Canada", image: "https://flagcdn.com/w320/ca.png", buttonLink: "/universities?country=Canada", description: "World-class education with affordable tuition fees and post-study work options.", totalUniversities: 96 },
  { title: "United Kingdom", image: "https://flagcdn.com/w320/gb.png", buttonLink: "/universities?country=UK", description: "Prestigious universities with high-quality education and graduate visa options.", totalUniversities: 160 },
  { title: "United States", image: "https://flagcdn.com/w320/us.png", buttonLink: "/universities?country=USA", description: "Unmatched research opportunities and diverse academic programs.", totalUniversities: 4000 },
  { title: "Germany", image: "https://flagcdn.com/w320/de.png", buttonLink: "/universities?country=Germany", description: "World-leading engineering courses with little to no tuition fees.", totalUniversities: 380 },
]

export function CountryScrollCards() {
  const railRef = useRef(null)
  const autoplayRef = useRef(null)
  const interactionTimeoutRef = useRef(null)
  const [isPaused, setIsPaused] = useState(false)
  const [destinations, setDestinations] = useState(STATIC_DESTINATIONS)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch study-destination cards from API
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch("/api/homepage-cards?type=study-destination")
        const result = await res.json()
        if (result.success && result.data && result.data.length > 0) {
          setDestinations(result.data)
        }
      } catch (err) {
        console.error("Error fetching study destinations:", err)
        // silently fall back to static data
      } finally {
        setIsLoading(false)
      }
    }
    fetchDestinations()
  }, [])

  const scroll = (direction) => {
    if (!railRef.current) return
    railRef.current.scrollBy({
      left: direction === "left" ? -340 : 340,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return

    const step = 340
    const intervalMs = 3500

    const startAutoplay = () => {
      if (autoplayRef.current) return
      autoplayRef.current = setInterval(() => {
        if (isPaused || !rail) return
        const maxScrollLeft = rail.scrollWidth - rail.clientWidth
        if (rail.scrollLeft >= maxScrollLeft - 10) {
          rail.scrollTo({ left: 0, behavior: "smooth" })
        } else {
          rail.scrollBy({ left: step, behavior: "smooth" })
        }
      }, intervalMs)
    }

    const stopAutoplay = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current)
        autoplayRef.current = null
      }
    }

    const handleMouseEnter = () => setIsPaused(true)
    const handleMouseLeave = () => setIsPaused(false)

    const handleUserInteraction = () => {
      setIsPaused(true)
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current)
      interactionTimeoutRef.current = setTimeout(() => setIsPaused(false), 3000)
    }

    rail.addEventListener("mouseenter", handleMouseEnter)
    rail.addEventListener("mouseleave", handleMouseLeave)
    rail.addEventListener("touchstart", handleUserInteraction, { passive: true })
    rail.addEventListener("scroll", handleUserInteraction, { passive: true })

    startAutoplay()

    return () => {
      stopAutoplay()
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current)
      rail.removeEventListener("mouseenter", handleMouseEnter)
      rail.removeEventListener("mouseleave", handleMouseLeave)
      rail.removeEventListener("touchstart", handleUserInteraction)
      rail.removeEventListener("scroll", handleUserInteraction)
    }
  }, [isPaused])

  return (
    <section className="relative z-20 mt-8 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex justify-center px-1 sm:px-2 text-center">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">Study Destinations</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Countries You Can Study In
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="hidden sm:inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-border/60 bg-white/90 text-foreground shadow-sm backdrop-blur transition-all hover:scale-105 hover:bg-white"
            aria-label="Scroll countries left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex flex-1 overflow-hidden">
            <div
              ref={railRef}
              className="flex gap-5 overflow-x-auto pb-4 scroll-smooth no-scrollbar"
            >
              {destinations.map((dest, idx) => (
                <div
                  key={dest._id || dest.title}
                  className="min-w-[85%] sm:min-w-[calc(50%-10px)] md:min-w-[calc(33.333%-14px)] lg:min-w-[calc(20%-16px)] flex-shrink-0"
                >
                  <motion.article
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="group relative flex h-full flex-col cursor-pointer rounded-[24px] bg-white border border-border/40 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                    onClick={() => dest.buttonLink && (window.location.href = dest.buttonLink)}
                  >
                    {/* Flag image — fixed height, object-cover */}
                    <div className="relative h-[140px] w-full overflow-hidden bg-slate-100 flex-shrink-0">
                      <img
                        src={dest.image}
                        alt={`${dest.title} flag`}
                        className="h-full w-full object-cover object-center transition-transform duration-400 group-hover:scale-[1.05]"
                        onError={(e) => {
                          e.currentTarget.style.display = "none"
                        }}
                      />
                      {/* Gradient overlay */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    </div>

                    {/* Card body */}
                    <div className="flex flex-1 flex-col items-center text-center p-5">
                      <h3 className="text-base font-bold text-foreground transition-colors duration-300 group-hover:text-primary leading-tight">
                        {dest.title}
                      </h3>

                      {dest.totalUniversities > 0 && (
                        <span className="mt-1.5 text-xs font-semibold text-muted-foreground">
                          {dest.totalUniversities.toLocaleString()}+ Universities
                        </span>
                      )}

                      {dest.description && (
                        <p className="mt-3 text-xs text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                          {dest.description}
                        </p>
                      )}

                      <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-primary transition-transform duration-300 group-hover:translate-x-1">
                        {dest.buttonText || "Explore Programs"}
                        <span aria-hidden="true">→</span>
                      </div>
                    </div>

                    {/* Hover ring */}
                    <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-border/30 transition-all duration-300 group-hover:ring-primary/30" />
                  </motion.article>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => scroll("right")}
            className="hidden sm:inline-flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-border/60 bg-white/90 text-foreground shadow-sm backdrop-blur transition-all hover:scale-105 hover:bg-white"
            aria-label="Scroll countries right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
