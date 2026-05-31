"use client"

import { useRef, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { countries } from "../data/countries"

export function CountryScrollCards() {
  const railRef = useRef(null)
  const autoplayRef = useRef(null)
  const interactionTimeoutRef = useRef(null)
  const [isPaused, setIsPaused] = useState(false)

  const scroll = (direction) => {
    if (!railRef.current) return
    railRef.current.scrollBy({
      left: direction === "left" ? -340 : 340,
      behavior: "smooth",
    })
  }

  const goToCountry = (country) => {
    window.location.href = `/universities?country=${encodeURIComponent(country.filterValue)}`
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
          rail.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          rail.scrollBy({ left: step, behavior: 'smooth' })
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

    rail.addEventListener('mouseenter', handleMouseEnter)
    rail.addEventListener('mouseleave', handleMouseLeave)
    rail.addEventListener('touchstart', handleUserInteraction, { passive: true })
    rail.addEventListener('scroll', handleUserInteraction, { passive: true })

    startAutoplay()

    return () => {
      stopAutoplay()
      if (interactionTimeoutRef.current) clearTimeout(interactionTimeoutRef.current)
      rail.removeEventListener('mouseenter', handleMouseEnter)
      rail.removeEventListener('mouseleave', handleMouseLeave)
      rail.removeEventListener('touchstart', handleUserInteraction)
      rail.removeEventListener('scroll', handleUserInteraction)
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
            <div ref={railRef} className="flex gap-6 overflow-x-auto pb-6 scroll-smooth no-scrollbar" style={{ marginBottom: '-16px' }}>
              {countries.map((country) => (
                <div
                  key={country.name}
                  className="min-w-[100%] md:min-w-[calc(33.333%-16px)] lg:min-w-[calc(20%-19px)] flex-shrink-0"
                >
                  <motion.article
                    whileHover={{ y: -12 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    onClick={() => goToCountry(country)}
                    className="group relative h-full cursor-pointer rounded-[28px] bg-transparent p-4 sm:p-5 border border-border/40"
                  >
                    <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-blue-500/0 transition-all duration-400 group-hover:from-blue-500/10 group-hover:via-purple-500/5 group-hover:to-blue-500/10" />
                    <div className="relative z-10 flex h-full flex-col items-center text-center">
                      <div className="flag flex h-[104px] w-[104px] items-center justify-center rounded-full bg-white/85 shadow-[0_10px_24px_rgba(59,130,246,0.12)] backdrop-blur transition-all duration-400 group-hover:scale-[1.14] group-hover:shadow-[0_16px_32px_rgba(59,130,246,0.22)]">
                        <img
                          src={country.flag}
                          alt={`${country.name} flag`}
                          className="h-[64px] w-[64px] rounded-full object-cover transition-transform duration-400 group-hover:scale-[1.08] group-hover:rotate-3"
                        />
                      </div>

                      <h3 className="mt-5 text-lg font-semibold text-foreground transition-colors duration-300 group-hover:text-blue-700">
                        {country.name}
                      </h3>

                      <div className="mt-4 flex flex-wrap justify-center gap-2">
                        {country.highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="rounded-full border border-border/60 bg-white/70 px-3 py-1 text-[11px] font-medium text-slate-700"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-transform duration-300 group-hover:translate-x-1">
                        Explore Programs
                        <span aria-hidden="true">→</span>
                      </div>
                    </div>

                    <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-border/50 transition-all duration-400 group-hover:ring-primary/30" />
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
