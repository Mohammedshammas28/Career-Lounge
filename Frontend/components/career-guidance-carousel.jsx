"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
    ChevronLeft,
    ChevronRight,
    UserRoundSearch,
    FileText,
    ClipboardList,
    GraduationCap,
    Award,
    Globe,
} from "lucide-react"
import {
    Dialog,
    DialogTrigger,
    DialogContainer,
    DialogContent,
    DialogClose,
    DialogTitle,
    DialogDescription,
    DialogImage,
} from "@/components/ui/linear-card"

const STATIC_SERVICES = [
    {
        _id: "1",
        title: "Career Counselling",
        description: "Our personalised Career Counselling sessions pair you with seasoned overseas-education specialists who map your unique academic background, interests, and ambitions to the most suitable global destinations and programmes. Through a structured deep-dive, we help you clarify your goals, understand entry requirements, and chart a realistic timeline — so every decision you make is purposeful and well-informed.",
        image: "/images/career-counselling.jpg",
        iconName: "UserRoundSearch",
        buttonText: "Book a Session",
        buttonLink: "/contact?service=Career+Counselling",
    },
    {
        _id: "2",
        title: "Profile Evaluation",
        description: "We conduct a thorough 360 analysis of your academic transcripts, standardised test scores, extracurricular achievements, and professional experience to benchmark your profile against actual admission standards at your target universities. You receive a detailed strengths-and-gaps report with concrete, prioritised action steps.",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&fit=crop",
        iconName: "FileText",
        buttonText: "Evaluate My Profile",
        buttonLink: "/contact?service=Profile+Evaluation",
    },
    {
        _id: "3",
        title: "Resume Building",
        description: "A compelling resume is your first impression. Our expert writers craft ATS-optimised, visually clean CVs that highlight your achievements in quantifiable terms — tailored to the exact format expected by universities and international recruiters. We go beyond bullet points: every line is deliberately worded to demonstrate impact, relevance, and the value you bring to an institution.",
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1200&fit=crop",
        iconName: "ClipboardList",
        buttonText: "Polish My Resume",
        buttonLink: "/contact?service=Resume+Building",
    },
    {
        _id: "4",
        title: "SOP Writing",
        description: "Your Statement of Purpose is the most personal and often most decisive element of your application. We collaborate with you through multiple drafts to craft an SOP that tells your authentic story: your academic journey, the pivotal experiences that shaped your thinking, why this specific programme, and how it unlocks your future goals.",
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&fit=crop",
        iconName: "GraduationCap",
        buttonText: "Write My SOP",
        buttonLink: "/contact?service=SOP+Writing",
    },
    {
        _id: "5",
        title: "LOR Assistance",
        description: "Letters of Recommendation can make or break an application. We guide you on identifying the right recommenders, provide structured briefing templates, and review drafts to ensure each letter speaks directly to the qualities the admissions committee values most — leadership, intellectual curiosity, professional competence, and character.",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&fit=crop",
        iconName: "Award",
        buttonText: "Get LOR Help",
        buttonLink: "/contact?service=LOR+Assistance",
    },
    {
        _id: "6",
        title: "Visa Guidance",
        description: "Navigating student visa applications is stressful — we make it straightforward. From choosing the correct visa category and preparing your financial documents to mock visa interviews and post-arrival orientation, our end-to-end visa support ensures you arrive at your dream campus confident and compliant.",
        image: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?q=80&w=1200&fit=crop",
        iconName: "Globe",
        buttonText: "Visa Support",
        buttonLink: "/contact?service=Visa+Guidance",
    },
]

const ICON_MAP = { UserRoundSearch, FileText, ClipboardList, GraduationCap, Award, Globe }
const getIconComponent = (name) => ICON_MAP[name] || UserRoundSearch

const CARD_ACCENT_BG = [
    "from-sky-500/20 to-cyan-400/5",
    "from-violet-500/20 to-fuchsia-400/5",
    "from-amber-500/20 to-orange-400/5",
    "from-emerald-500/20 to-teal-400/5",
    "from-pink-500/20 to-rose-400/5",
    "from-indigo-500/20 to-blue-400/5",
]

export default function CareerGuidanceCarousel() {
    const railRef = useRef(null)
    const autoplayRef = useRef(null)
    const pauseTimeoutRef = useRef(null)
    const [visibleCount, setVisibleCount] = useState(3)
    const [currentPage, setCurrentPage] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [services, setServices] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch("/api/homepage-cards?type=career-counselling")
                const result = await res.json()
                if (result.success && result.data && result.data.length > 0) {
                    setServices(result.data)
                } else {
                    setServices(STATIC_SERVICES)
                }
            } catch {
                setServices(STATIC_SERVICES)
            } finally {
                setIsLoading(false)
            }
        }
        fetchServices()
    }, [])

    useEffect(() => {
        const calc = () => {
            const w = window.innerWidth
            if (w >= 1024) setVisibleCount(3)
            else if (w >= 768) setVisibleCount(2)
            else setVisibleCount(1)
        }
        calc()
        window.addEventListener("resize", calc)
        return () => window.removeEventListener("resize", calc)
    }, [])

    useEffect(() => {
        const rail = railRef.current
        if (!rail || services.length === 0) return
        const step = Math.floor(rail.clientWidth / visibleCount)

        const start = () => {
            if (autoplayRef.current) return
            autoplayRef.current = setInterval(() => {
                if (isPaused || !rail) return
                const max = rail.scrollWidth - rail.clientWidth
                if (rail.scrollLeft >= max - 10) rail.scrollTo({ left: 0, behavior: "smooth" })
                else rail.scrollBy({ left: step, behavior: "smooth" })
            }, 3400)
        }

        const handleMouseEnter = () => setIsPaused(true)
        const handleMouseLeave = () => setIsPaused(false)
        const handleInteract = () => {
            setIsPaused(true)
            if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
            pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 3000)
        }

        rail.addEventListener("mouseenter", handleMouseEnter)
        rail.addEventListener("mouseleave", handleMouseLeave)
        rail.addEventListener("touchstart", handleInteract, { passive: true })
        start()

        return () => {
            if (autoplayRef.current) { clearInterval(autoplayRef.current); autoplayRef.current = null }
            if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
            rail.removeEventListener("mouseenter", handleMouseEnter)
            rail.removeEventListener("mouseleave", handleMouseLeave)
            rail.removeEventListener("touchstart", handleInteract)
        }
    }, [visibleCount, isPaused, services.length])

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
        return () => { rail.removeEventListener("scroll", onScroll); if (rafId) cancelAnimationFrame(rafId) }
    }, [visibleCount])

    const goLeft = () => {
        const rail = railRef.current; if (!rail) return
        const w = Math.floor(rail.clientWidth / visibleCount)
        if (rail.scrollLeft <= 10) rail.scrollTo({ left: rail.scrollWidth - rail.clientWidth, behavior: "smooth" })
        else rail.scrollBy({ left: -w, behavior: "smooth" })
    }

    const goRight = () => {
        const rail = railRef.current; if (!rail) return
        const w = Math.floor(rail.clientWidth / visibleCount)
        const max = rail.scrollWidth - rail.clientWidth
        if (rail.scrollLeft >= max - 10) rail.scrollTo({ left: 0, behavior: "smooth" })
        else rail.scrollBy({ left: w, behavior: "smooth" })
    }

    const pages = Math.ceil(services.length / visibleCount)

    return (
        <section className="relative z-20 mt-8 pb-14 bg-transparent">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-primary shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur">
                        CAREER GUIDANCE
                    </div>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                        Career Counselling &amp; Profile Building
                    </h2>
                    <p className="mx-auto mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
                        Get expert guidance to strengthen your profile and maximise your chances of admission to top universities worldwide.
                    </p>
                </div>

                <div className="relative">
                    {pages > 1 && (
                        <button type="button" aria-label="Scroll left" onClick={goLeft}
                            className="absolute left-0 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-white/90 text-foreground shadow-sm backdrop-blur transition-all hover:scale-105 hover:bg-white sm:inline-flex">
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                    )}

                    <div className="overflow-hidden">
                        <div ref={railRef} className="flex gap-5 overflow-x-auto scroll-smooth no-scrollbar pb-4" style={{ marginBottom: "-16px" }}>
                            {isLoading
                                ? Array.from({ length: 3 }).map((_, i) => (
                                    <div key={i} className="min-w-[100%] sm:min-w-[48%] lg:min-w-[31.5%] flex-shrink-0 h-[340px] rounded-2xl bg-border/20 animate-pulse" />
                                ))
                                : services.map((service, index) => {
                                    const Icon = getIconComponent(service.iconName)
                                    const accent = CARD_ACCENT_BG[index % CARD_ACCENT_BG.length]
                                    const image = service.image || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&fit=crop"

                                    return (
                                        <div key={service._id || index} className="min-w-[100%] sm:min-w-[48%] lg:min-w-[31.5%] flex-shrink-0">
                                            <Dialog transition={{ type: "spring", bounce: 0.05, duration: 0.5 }}>
                                                <DialogTrigger
                                                    style={{ borderRadius: "20px" }}
                                                    className={`group flex h-full w-full flex-col overflow-hidden border border-border/40 bg-gradient-to-br ${accent} bg-white/60 dark:bg-white/5 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                                                >
                                                    <DialogImage src={image} alt={service.title} className="h-48 w-full object-cover" />
                                                    <div className="flex flex-1 flex-col justify-between p-5">
                                                        <div>
                                                            <div className="mb-3 flex items-center gap-3">
                                                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-md">
                                                                    <Icon className="h-4 w-4" />
                                                                </div>
                                                                <span className="rounded-full border border-border/50 bg-white/70 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-600 backdrop-blur">
                                                                    Career Support
                                                                </span>
                                                            </div>
                                                            <DialogTitle className="text-base font-bold tracking-tight text-foreground sm:text-lg">
                                                                {service.title}
                                                            </DialogTitle>
                                                            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                                                                {service.description}
                                                            </p>
                                                        </div>
                                                        <div className="mt-4 flex items-center justify-between">
                                                            <span className="text-xs font-semibold text-primary group-hover:underline">Learn more</span>
                                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-white">
                                                                <ChevronRight className="h-4 w-4" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </DialogTrigger>

                                                <DialogContainer>
                                                    <DialogContent
                                                        style={{ borderRadius: "24px" }}
                                                        className="relative mx-auto flex max-h-[85vh] w-full max-w-2xl flex-col overflow-y-auto bg-white dark:bg-zinc-950 border border-border/40 shadow-2xl"
                                                    >
                                                        <DialogImage
                                                            src={image}
                                                            alt={service.title}
                                                            className="h-64 w-full object-cover"
                                                            style={{ borderRadius: "24px 24px 0 0" }}
                                                        />
                                                        <div className="flex flex-1 flex-col p-7">
                                                            <div className="mb-4 flex items-center gap-3">
                                                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg">
                                                                    <Icon className="h-5 w-5" />
                                                                </div>
                                                                <span className="rounded-full border border-border/50 bg-slate-100 dark:bg-white/10 px-3 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-slate-600 dark:text-slate-300">
                                                                    Career Support
                                                                </span>
                                                            </div>
                                                            <DialogTitle className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                                                                {service.title}
                                                            </DialogTitle>
                                                            <DialogDescription
                                                                disableLayoutAnimation
                                                                variants={{
                                                                    initial: { opacity: 0, y: 16 },
                                                                    animate: { opacity: 1, y: 0 },
                                                                    exit: { opacity: 0, y: 12 },
                                                                }}
                                                            >
                                                                <p className="mt-4 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                                                                    {service.description}
                                                                </p>
                                                                <div className="mt-7">
                                                                    <Link
                                                                        href={service.buttonLink || "/contact?service=Career+Counselling"}
                                                                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-md transition hover:brightness-95 hover:scale-[1.02] active:scale-[0.98]"
                                                                    >
                                                                        {service.buttonText || "Book a Session"}
                                                                        <ChevronRight className="h-4 w-4" />
                                                                    </Link>
                                                                </div>
                                                            </DialogDescription>
                                                        </div>
                                                        <DialogClose
                                                            variants={{
                                                                initial: { opacity: 0, scale: 0.8 },
                                                                animate: { opacity: 1, scale: 1 },
                                                                exit: { opacity: 0, scale: 0.8 },
                                                            }}
                                                            className="bg-slate-900/80 backdrop-blur text-white hover:bg-slate-900 p-2.5 rounded-full"
                                                        />
                                                    </DialogContent>
                                                </DialogContainer>
                                            </Dialog>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    {pages > 1 && (
                        <button type="button" aria-label="Scroll right" onClick={goRight}
                            className="absolute right-0 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border/60 bg-white/90 text-foreground shadow-sm backdrop-blur transition-all hover:scale-105 hover:bg-white sm:inline-flex">
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    )}

                    {pages > 1 && (
                        <div className="mt-6 flex items-center justify-center gap-2">
                            {Array.from({ length: pages }).map((_, i) => (
                                <button key={i} type="button" aria-label={"Go to page " + (i + 1)}
                                    className={"h-2 rounded-full transition-all duration-300 " + (i === currentPage ? "w-8 bg-primary" : "w-2 bg-border/50 hover:bg-border")}
                                    onClick={() => {
                                        const rail = railRef.current; if (!rail) return
                                        const w = Math.floor(rail.clientWidth / visibleCount)
                                        rail.scrollTo({ left: i * w, behavior: "smooth" })
                                    }} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export { CareerGuidanceCarousel }
