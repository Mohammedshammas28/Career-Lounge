"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, GraduationCap } from "lucide-react"

const exams = [
    {
        name: "ACT",
        targetScore: "Target: 28+",
        description: "College readiness assessment.",
        img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=60",
    },
    {
        name: "CELPIP",
        targetScore: "Target: 9+",
        description: "Canadian immigration and study pathways.",
        img: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&q=60",
    },
    {
        name: "Duolingo English Test",
        targetScore: "Target: 120+",
        description: "Affordable online English test.",
        img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=60",
    },
    {
        name: "GMAT",
        targetScore: "Target: 650+",
        description: "Business school admission test.",
        img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=60",
    },
    {
        name: "GRE",
        targetScore: "Target: 320+",
        description: "Graduate school admission test.",
        img: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&q=60",
    },
    {
        name: "IELTS",
        targetScore: "Target: 7.0+",
        description: "English proficiency test accepted worldwide.",
        img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=60",
    },
    {
        name: "OET",
        targetScore: "Target: B+",
        description: "English test for healthcare professionals.",
        img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=60",
    },
    {
        name: "PTE Academic",
        targetScore: "Target: 65+",
        description: "Fast computer-based English test.",
        img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&q=60",
    },
    {
        name: "SAT",
        targetScore: "Target: 1400+",
        description: "Undergraduate admission test.",
        img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=60",
    },
    {
        name: "TOEFL iBT",
        targetScore: "Target: 95+",
        description: "University-focused English proficiency exam.",
        img: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=800&q=60",
    },
]

export default function TestPreparationCarousel() {
    const railRef = useRef(null)
    const autoplayRef = useRef(null)
    const pauseTimeoutRef = useRef(null)
    const [visibleCount, setVisibleCount] = useState(4)
    const [currentPage, setCurrentPage] = useState(0)
    const [isPaused, setIsPaused] = useState(false)

    useEffect(() => {
        const calc = () => {
            const width = window.innerWidth
            if (width >= 1024) setVisibleCount(4)
            else if (width >= 768) setVisibleCount(2)
            else setVisibleCount(1)
        }

        calc()
        window.addEventListener("resize", calc)
        return () => window.removeEventListener("resize", calc)
    }, [])

    useEffect(() => {
        const rail = railRef.current
        if (!rail) return

        const step = Math.floor(rail.clientWidth / visibleCount)
        const intervalMs = 3200

        const startAutoplay = () => {
            if (autoplayRef.current) return
            autoplayRef.current = setInterval(() => {
                if (isPaused || !rail) return
                const maxScroll = rail.scrollWidth - rail.clientWidth
                if (rail.scrollLeft >= maxScroll - 10) {
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
            if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
            pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 3000)
        }

        rail.addEventListener("mouseenter", handleMouseEnter)
        rail.addEventListener("mouseleave", handleMouseLeave)
        rail.addEventListener("touchstart", handleUserInteraction, { passive: true })
        rail.addEventListener("scroll", handleUserInteraction, { passive: true })

        startAutoplay()

        return () => {
            stopAutoplay()
            if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
            rail.removeEventListener("mouseenter", handleMouseEnter)
            rail.removeEventListener("mouseleave", handleMouseLeave)
            rail.removeEventListener("touchstart", handleUserInteraction)
            rail.removeEventListener("scroll", handleUserInteraction)
        }
    }, [visibleCount, isPaused])

    const goLeft = () => {
        const rail = railRef.current
        if (!rail) return
        const cardWidth = Math.floor(rail.clientWidth / visibleCount)
        if (rail.scrollLeft <= 10) {
            rail.scrollTo({ left: rail.scrollWidth - rail.clientWidth, behavior: "smooth" })
        } else {
            rail.scrollBy({ left: -cardWidth, behavior: "smooth" })
        }
    }

    const goRight = () => {
        const rail = railRef.current
        if (!rail) return
        const cardWidth = Math.floor(rail.clientWidth / visibleCount)
        const maxScroll = rail.scrollWidth - rail.clientWidth
        if (rail.scrollLeft >= maxScroll - 10) {
            rail.scrollTo({ left: 0, behavior: "smooth" })
        } else {
            rail.scrollBy({ left: cardWidth, behavior: "smooth" })
        }
    }

    useEffect(() => {
        const rail = railRef.current
        if (!rail) return

        let rafId = null
        const onScroll = () => {
            if (rafId) cancelAnimationFrame(rafId)
            rafId = requestAnimationFrame(() => {
                const cardWidth = Math.floor(rail.clientWidth / visibleCount)
                setCurrentPage(Math.round(rail.scrollLeft / cardWidth))
            })
        }

        rail.addEventListener("scroll", onScroll, { passive: true })
        return () => {
            rail.removeEventListener("scroll", onScroll)
            if (rafId) cancelAnimationFrame(rafId)
        }
    }, [visibleCount])

    const pages = Math.ceil(exams.length / visibleCount)

    return (
        <section className="relative z-20 mt-8 pb-12 bg-transparent">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-4 flex justify-center px-1 text-center sm:px-2">
                    <div className="max-w-2xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">Test Preparation</p>
                        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                            Prepare for Global Exams
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Get expert coaching and resources to achieve your target scores and secure admissions abroad.
                        </p>
                    </div>
                </div>

                <div className="relative">
                    <button
                        type="button"
                        aria-label="Scroll preparation cards left"
                        onClick={goLeft}
                        className="absolute left-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border/20 bg-white/90 shadow-lg backdrop-blur transition-transform hover:scale-105 hover:bg-white sm:inline-flex"
                    >
                        <ChevronLeft className="h-6 w-6 text-foreground" />
                    </button>

                    <div className="overflow-hidden">
                        <div ref={railRef} className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-6" style={{ marginBottom: "-16px" }}>
                            {exams.map((exam) => (
                                <motion.article
                                    key={exam.name}
                                    whileHover={{ y: -10 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="min-w-[100%] flex-shrink-0 rounded-[24px] border border-border/20 bg-white p-4 shadow-md cursor-pointer sm:min-w-[calc(50%-12px)] lg:min-w-[calc(25%-18px)] hover:shadow-xl"
                                >
                                    <div className="relative overflow-hidden rounded-[20px] bg-slate-100">
                                        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/18 via-black/0 to-transparent" />
                                        <motion.img
                                            src={exam.img}
                                            alt={exam.name}
                                            className="h-48 w-full object-cover"
                                            whileHover={{ scale: 1.08 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                        <div className="absolute left-3 top-3 z-20 inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold text-slate-700 backdrop-blur">
                                            <GraduationCap className="h-3.5 w-3.5 text-primary" />
                                            {exam.name}
                                        </div>
                                    </div>

                                    <div className="mt-4 flex items-start justify-between gap-3">
                                        <div>
                                            <h3 className="text-lg font-semibold text-foreground">{exam.name}</h3>
                                            <p className="mt-2 text-sm text-muted-foreground">{exam.description}</p>
                                        </div>
                                        <span className="shrink-0 rounded-full border border-border/60 bg-primary/5 px-3 py-1 text-[11px] font-semibold text-primary">
                                            {exam.targetScore}
                                        </span>
                                    </div>

                                    <div className="mt-4">
                                        <button className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:brightness-95">
                                            Explore Preparation
                                        </button>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </div>

                    <button
                        type="button"
                        aria-label="Scroll preparation cards right"
                        onClick={goRight}
                        className="absolute right-0 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-border/20 bg-white/90 shadow-lg backdrop-blur transition-transform hover:scale-105 hover:bg-white sm:inline-flex"
                    >
                        <ChevronRight className="h-6 w-6 text-foreground" />
                    </button>

                    <div className="mt-6 flex items-center justify-center gap-2">
                        {Array.from({ length: pages }).map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                aria-label={`Go to page ${index + 1}`}
                                onClick={() => {
                                    const rail = railRef.current
                                    if (!rail) return
                                    const cardWidth = Math.floor(rail.clientWidth / visibleCount)
                                    rail.scrollTo({ left: index * cardWidth, behavior: "smooth" })
                                }}
                                className={`h-2 w-8 rounded-full transition-colors ${index === currentPage ? "bg-foreground" : "bg-border/40"}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
