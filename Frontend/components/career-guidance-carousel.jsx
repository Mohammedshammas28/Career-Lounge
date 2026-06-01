"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import {
    ChevronLeft,
    ChevronRight,
    ArrowRight,
    UserRoundSearch,
    FileText,
    GraduationCap,
    NotebookPen,
    School2,
    ClipboardList,
} from "lucide-react"

const services = [
    {
        title: "Career Counselling",
        desc: "Personalized guidance to align your goals, profile, and study destination.",
        image:
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80",
        icon: UserRoundSearch,
        accent: "from-sky-500/30 via-cyan-400/10 to-transparent",
        cta: "Book Session",
    },
    {
        title: "Profile Evaluation",
        desc: "Get a clear assessment of your academics, experience, and improvement areas.",
        image:
            "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=1200&q=80",
        icon: FileText,
        accent: "from-violet-500/30 via-fuchsia-400/10 to-transparent",
        cta: "Evaluate Profile",
    },
    {
        title: "SOP & LOR Guidance",
        desc: "Craft compelling statements and strong recommendation letters that stand out.",
        image:
            "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80",
        icon: NotebookPen,
        accent: "from-emerald-500/30 via-teal-400/10 to-transparent",
        cta: "Improve Docs",
    },
    {
        title: "Resume Building",
        desc: "Build a polished resume that presents your strengths with clarity and impact.",
        image:
            "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80",
        icon: ClipboardList,
        accent: "from-amber-500/30 via-orange-400/10 to-transparent",
        cta: "Polish Resume",
    },
    {
        title: "University Shortlisting",
        desc: "Match your profile with the right universities, countries, and intake options.",
        image:
            "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80",
        icon: School2,
        accent: "from-blue-500/30 via-indigo-400/10 to-transparent",
        cta: "Shortlist Now",
    },
    {
        title: "Application Assistance",
        desc: "Stay on track with document preparation, form filing, and deadline support.",
        image:
            "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&q=80",
        icon: GraduationCap,
        accent: "from-rose-500/30 via-pink-400/10 to-transparent",
        cta: "Apply Now",
    },
]

export default function CareerGuidanceCarousel() {
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

    const pages = Math.ceil(services.length / visibleCount)

    return (
        <section className="relative z-20 mt-8 pb-14 bg-transparent">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-5 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur">
                        CAREER GUIDANCE
                    </div>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                        Career Counselling & Profile Building
                    </h2>
                    <p className="mx-auto mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
                        Get expert guidance to strengthen your profile and maximize your chances of admission to top universities.
                    </p>
                </div>

                <div className="relative">
                    <button
                        type="button"
                        aria-label="Scroll guidance cards left"
                        onClick={goLeft}
                        className="absolute left-0 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-white/90 text-foreground shadow-sm backdrop-blur transition-all hover:scale-105 hover:bg-white sm:inline-flex"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>

                    <div className="overflow-hidden">
                        <div
                            ref={railRef}
                            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-6"
                            style={{ marginBottom: "-16px" }}
                        >
                            {services.map((service, index) => {
                                const Icon = service.icon

                                return (
                                    <motion.article
                                        key={service.title}
                                        whileHover={{ y: -10 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className="min-w-[100%] sm:min-w-[48%] md:min-w-[48%] lg:min-w-[23%] flex-shrink-0"
                                    >
                                        <div className="group relative h-full overflow-hidden rounded-[28px] border border-border/40 bg-transparent p-4 sm:p-5 shadow-none transition-all duration-300">
                                            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${service.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                                            <div className="relative overflow-hidden rounded-[24px] bg-slate-100 shadow-[0_10px_24px_rgba(59,130,246,0.12)]">
                                                <motion.img
                                                    src={service.image}
                                                    alt={service.title}
                                                    className="h-44 w-full object-cover"
                                                    whileHover={{ scale: 1.08 }}
                                                    transition={{ duration: 0.35 }}
                                                />

                                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 via-slate-950/8 to-transparent" />

                                                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white shadow-lg backdrop-blur-md">
                                                    <Icon className="h-3.5 w-3.5" />
                                                    Premium
                                                </div>

                                                <div className="absolute bottom-4 right-4 rounded-full border border-white/20 bg-white/20 px-3 py-1 text-[11px] font-semibold text-white shadow-lg backdrop-blur-md">
                                                    {String(index + 1).padStart(2, "0")}
                                                </div>
                                            </div>

                                            <div className="relative mt-4 flex h-full flex-col items-start text-left">
                                                <div className="mb-3 flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-[0_12px_30px_rgba(15,23,42,0.18)]">
                                                        <Icon className="h-5 w-5" />
                                                    </div>
                                                    <div className="rounded-full border border-border/60 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600 shadow-sm backdrop-blur">
                                                        Career Support
                                                    </div>
                                                </div>

                                                <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                                                    {service.title}
                                                </h3>

                                                <p className="mt-2 max-w-[28ch] text-sm leading-6 text-muted-foreground">
                                                    {service.desc}
                                                </p>

                                                <div className="mt-5 flex items-center justify-between gap-3">
                                                    <button className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:brightness-95">
                                                        {service.cta}
                                                        <ArrowRight className="h-4 w-4" />
                                                    </button>

                                                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-transform duration-300 group-hover:translate-x-1">
                                                        Explore
                                                        <span aria-hidden="true">→</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-border/50 transition-all duration-300 group-hover:ring-primary/30" />
                                        </div>
                                    </motion.article>
                                )
                            })}
                        </div>
                    </div>

                    <button
                        type="button"
                        aria-label="Scroll guidance cards right"
                        onClick={goRight}
                        className="absolute right-0 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-white/90 text-foreground shadow-sm backdrop-blur transition-all hover:scale-105 hover:bg-white sm:inline-flex"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>

                    <div className="mt-6 flex items-center justify-center gap-2">
                        {Array.from({ length: pages }).map((_, pageIndex) => (
                            <button
                                key={pageIndex}
                                type="button"
                                aria-label={`Go to page ${pageIndex + 1}`}
                                className={`h-2 w-8 rounded-full transition-all ${pageIndex === currentPage ? "bg-foreground" : "bg-border/50"}`}
                                onClick={() => {
                                    const rail = railRef.current
                                    if (!rail) return
                                    const cardWidth = Math.floor(rail.clientWidth / visibleCount)
                                    rail.scrollTo({ left: pageIndex * cardWidth, behavior: "smooth" })
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}