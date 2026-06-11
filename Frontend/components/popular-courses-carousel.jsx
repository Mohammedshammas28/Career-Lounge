"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Star, Building, Globe } from "lucide-react"
import Link from "next/link"

const staticCourses = [
    { _id: "allied-health", courseName: "Allied Health", description: "Patient care, clinical practice, and health sciences.", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=60" },
    { _id: "commerce", courseName: "Commerce", description: "Business, trade, accounting, and finance fundamentals.", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=60" },
    { _id: "engineering", courseName: "Engineering", description: "Design, innovation, and real-world problem solving.", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=60" },
    { _id: "management", courseName: "Management", description: "Strategy, operations, and data-driven decision making.", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=60" },
    { _id: "medicine", courseName: "Medicine", description: "Clinical science, diagnosis, and patient care.", image: "https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { _id: "science", courseName: "Science", description: "Core scientific principles, research, and discovery.", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=60" },
]

export default function PopularCoursesCarousel() {
    const railRef = useRef(null)
    const autoplayRef = useRef(null)
    const pauseTimeoutRef = useRef(null)
    const [visibleCount, setVisibleCount] = useState(4)
    const [currentPage, setCurrentPage] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [courses, setCourses] = useState(staticCourses)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchCoursesAndStats = async () => {
            try {
                const response = await fetch("/api/courses")
                const result = await response.json()
                if (result.success && result.data && result.data.length > 0) {
                    // Fetch stats for each course
                    const coursesWithStats = await Promise.all(
                        result.data.map(async (course) => {
                            try {
                                const statsRes = await fetch(`/api/courses/stats?courseName=${encodeURIComponent(course.courseName)}`)
                                const statsResult = await statsRes.json()
                                if (statsResult.success) {
                                    return {
                                        ...course,
                                        universityCount: statsResult.data.universityCount,
                                        countryCount: statsResult.data.countryCount,
                                    }
                                }
                            } catch (err) {
                                console.error(`Error fetching stats for ${course.courseName}:`, err)
                            }
                            return {
                                ...course,
                                universityCount: 0,
                                countryCount: 0,
                            }
                        })
                    )
                    setCourses(coursesWithStats)
                }
            } catch (error) {
                console.error("Error fetching popular courses:", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchCoursesAndStats()
    }, [])

    useEffect(() => {
        const calc = () => {
            const w = window.innerWidth
            if (w >= 1024) setVisibleCount(4)
            else if (w >= 768) setVisibleCount(2)
            else setVisibleCount(1)
        }
        calc()
        window.addEventListener('resize', calc)
        return () => window.removeEventListener('resize', calc)
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
            if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
            pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 3000)
        }

        rail.addEventListener('mouseenter', handleMouseEnter)
        rail.addEventListener('mouseleave', handleMouseLeave)
        rail.addEventListener('touchstart', handleUserInteraction, { passive: true })
        rail.addEventListener('scroll', handleUserInteraction, { passive: true })

        startAutoplay()

        return () => {
            stopAutoplay()
            if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current)
            rail.removeEventListener('mouseenter', handleMouseEnter)
            rail.removeEventListener('mouseleave', handleMouseLeave)
            rail.removeEventListener('touchstart', handleUserInteraction)
            rail.removeEventListener('scroll', handleUserInteraction)
        }
    }, [visibleCount, isPaused, courses.length])

    const handleRight = () => {
        const rail = railRef.current
        if (!rail) return
        const cardWidth = Math.floor(rail.clientWidth / visibleCount)
        const maxScroll = rail.scrollWidth - rail.clientWidth
        if (rail.scrollLeft >= maxScroll - 10) {
            rail.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
            rail.scrollBy({ left: cardWidth, behavior: 'smooth' })
        }
    }

    const handleLeft = () => {
        const rail = railRef.current
        if (!rail) return
        const cardWidth = Math.floor(rail.clientWidth / visibleCount)
        if (rail.scrollLeft <= 10) {
            const maxScroll = rail.scrollWidth - rail.clientWidth
            rail.scrollTo({ left: maxScroll, behavior: 'smooth' })
        } else {
            rail.scrollBy({ left: -cardWidth, behavior: 'smooth' })
        }
    }

    useEffect(() => {
        const rail = railRef.current
        if (!rail) return
        let raf = null
        const onScroll = () => {
            if (raf) cancelAnimationFrame(raf)
            raf = requestAnimationFrame(() => {
                const cardWidth = Math.floor(rail.clientWidth / visibleCount)
                const page = Math.round(rail.scrollLeft / cardWidth)
                setCurrentPage(page)
            })
        }
        rail.addEventListener('scroll', onScroll, { passive: true })
        return () => {
            rail.removeEventListener('scroll', onScroll)
            if (raf) cancelAnimationFrame(raf)
        }
    }, [visibleCount])

    const pages = Math.ceil(courses.length / visibleCount)

    return (
        <section className="relative z-20 mt-8 pb-12 bg-transparent">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-4 flex justify-center px-1 sm:px-2 text-center">
                    <div className="max-w-2xl">
                        <p className="text-xs font-semibold uppercase tracking-wide text-primary">POPULAR COURSES</p>
                        <h2 className="mt-2 text-3xl font-bold text-foreground">Explore Top Courses</h2>
                        <p className="mt-2 text-sm text-muted-foreground max-w-2xl">Discover in-demand courses from top universities and build your future.</p>
                    </div>
                </div>

                <div className="relative">
                    <button
                        aria-label="Previous"
                        onClick={handleLeft}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden sm:inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg border border-border/20 hover:scale-105 transition-transform"
                    >
                        <ChevronLeft className="h-6 w-6 text-foreground" />
                    </button>

                    <div className="overflow-hidden">
                        <div
                            ref={railRef}
                            className="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar pb-6"
                            style={{ marginBottom: '-16px' }}
                        >
                            {courses.map((course, idx) => {
                                const name = course.courseName || course.title || "";
                                const description = course.description || course.desc || "";
                                const image = course.image || course.img || "";
                                return (
                                    <Link href={`/universities?course=${encodeURIComponent(name)}`} key={course._id || idx} className="contents">
                                        <motion.article
                                            whileHover={{ y: -8 }}
                                            transition={{ duration: 0.3 }}
                                            className="min-w-[90%] sm:min-w-[46%] md:min-w-[46%] lg:min-w-[22%] flex-shrink-0 rounded-[24px] border border-border/20 bg-white p-4 shadow-md hover:shadow-xl cursor-pointer flex flex-col justify-between"
                                        >
                                            <div>
                                                <div className="relative overflow-hidden rounded-[20px] bg-slate-100">
                                                    <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/18 via-black/0 to-transparent" />
                                                    <motion.img
                                                        src={image}
                                                        alt={name}
                                                        className="h-48 w-full object-cover"
                                                        whileHover={{ scale: 1.08 }}
                                                        transition={{ duration: 0.3 }}
                                                        onError={(event) => {
                                                            event.currentTarget.src =
                                                                "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%23e2e8f0'/%3E%3Cstop offset='100%25' stop-color='%23cbd5e1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='500' fill='url(%23g)'/%3E%3C/svg%3E"
                                                        }}
                                                    />
                                                </div>
                                                <div className="mt-4 flex items-start justify-between">
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-lg font-semibold text-foreground truncate">{name}</h3>
                                                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{description}</p>
                                                    </div>
                                                    <div className="ml-3 text-primary/90 shrink-0">
                                                        <Star className="h-5 w-5" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                {/* Stats */}
                                                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500 border-t pt-3">
                                                    <span className="flex items-center gap-1">
                                                        <Building className="h-3.5 w-3.5 text-blue-500" />
                                                        {course.universityCount || 0} Universities
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Globe className="h-3.5 w-3.5 text-emerald-500" />
                                                        {course.countryCount || 0} {course.countryCount === 1 ? 'Country' : 'Countries'}
                                                    </span>
                                                </div>

                                                <div className="mt-4">
                                                    <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 text-sm font-semibold shadow-sm transition">
                                                        Explore Universities
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.article>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <button
                        aria-label="Next"
                        onClick={handleRight}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden sm:inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg border border-border/20 hover:scale-105 transition-transform"
                    >
                        <ChevronRight className="h-6 w-6 text-foreground" />
                    </button>

                    <div className="mt-6 flex items-center justify-center gap-2">
                        {Array.from({ length: pages }).map((_, i) => (
                            <button
                                key={i}
                                className={`h-2 w-8 rounded-full ${i === currentPage ? 'bg-foreground' : 'bg-border/40'}`}
                                onClick={() => {
                                    const rail = railRef.current
                                    if (!rail) return
                                    const cardWidth = Math.floor(rail.clientWidth / visibleCount)
                                    rail.scrollTo({ left: i * cardWidth, behavior: 'smooth' })
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
