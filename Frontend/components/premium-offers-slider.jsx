"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Sparkles, TrendingUp } from "lucide-react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "swiper/css/effect-fade"

export function PremiumOffersSlider() {
    const [slides, setSlides] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchSlides()
    }, [])

    const fetchSlides = async () => {
        try {
            setLoading(true)
            const response = await fetch("/api/slider")
            if (!response.ok) throw new Error("Failed to fetch slides")
            const data = await response.json()
            setSlides(data.slides || [])
            setError(null)
        } catch (err) {
            console.error("Error fetching slides:", err)
            setError("Failed to load slides")
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <section className="relative w-full min-h-[600px] bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl overflow-hidden flex items-center justify-center">
                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
                    <Sparkles className="w-12 h-12 text-cyan-400" />
                </motion.div>
            </section>
        )
    }

    if (error || slides.length === 0) {
        return (
            <section className="relative w-full min-h-[600px] bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-700/50">
                <p className="text-gray-400 text-lg">{error || "No slides available"}</p>
            </section>
        )
    }

    return (
        <section className="relative w-full h-[600px] mt-16 rounded-3xl overflow-hidden shadow-2xl">
            <Swiper
                modules={[Autoplay, Pagination, Navigation, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true, dynamicBullets: true }}
                navigation={{
                    prevEl: ".slider-prev",
                    nextEl: ".slider-next",
                }}
                loop={true}
                className="w-full h-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={slide._id || index}>
                        <DynamicSlide slide={slide} allSlides={slides} />
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Navigation Buttons */}
            <button
                className="slider-prev absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 p-3 rounded-full transition-all duration-300 group"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>

            <button
                className="slider-next absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 p-3 rounded-full transition-all duration-300 group"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>
        </section>
    )
}

function DynamicSlide({ slide, allSlides }) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    }

    // Get glow colors based on glowColor
    const glowColorMap = {
        purple: "from-purple-600/25 to-transparent",
        cyan: "from-cyan-600/20 to-transparent",
        pink: "from-pink-600/25 to-transparent",
        blue: "from-blue-600/25 to-transparent",
        green: "from-green-600/20 to-transparent",
    }

    const glowColor = glowColorMap[slide.glowColor] || glowColorMap.purple

    // Helper function to check if link is external
    const isExternalLink = (url) => {
        return url && (url.startsWith("http://") || url.startsWith("https://"))
    }

    // Render button wrapper (Link for internal, a for external)
    const renderButtonLink = (href, children) => {
        if (!href || href === "#") {
            return <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{children}</motion.div>
        }

        if (isExternalLink(href)) {
            return (
                <a href={href} target="_blank" rel="noopener noreferrer">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        {children}
                    </motion.div>
                </a>
            )
        }

        return (
            <Link href={href}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    {children}
                </motion.div>
            </Link>
        )
    }

    return (
        <div className="relative w-full h-[600px] overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('${slide.image}')`,
                }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
            </div>

            {/* Background Glow Effects */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <motion.div
                    className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${glowColor} rounded-full blur-3xl`}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 6, repeat: Infinity }}
                />
            </div>

            {/* Content Container */}
            <motion.div
                className="relative h-full flex items-center justify-between px-8 md:px-16 py-12"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Left Side Content */}
                <motion.div className="flex-1 max-w-2xl z-10" variants={itemVariants}>
                    {/* Category Badge */}
                    <motion.div
                        className="inline-flex items-center gap-2 mb-6"
                        variants={itemVariants}
                    >
                        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-md border border-cyan-400/30 rounded-full">
                            <Sparkles className="w-4 h-4 text-cyan-400" />
                            <span className="text-sm font-semibold text-cyan-300">{slide.category}</span>
                        </div>
                    </motion.div>

                    {/* Main Title and Subtitle */}
                    <motion.h2
                        className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight"
                        variants={itemVariants}
                    >
                        {slide.title}
                    </motion.h2>

                    {slide.subtitle && (
                        <motion.div
                            className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent"
                            variants={itemVariants}
                        >
                            {slide.subtitle}
                        </motion.div>
                    )}

                    {/* Description */}
                    {slide.description && (
                        <motion.p
                            className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg leading-relaxed"
                            variants={itemVariants}
                        >
                            {slide.description}
                        </motion.p>
                    )}

                    {/* Stats Section */}
                    {slide.stats && slide.stats.length > 0 && (
                        <motion.div
                            className="grid grid-cols-3 gap-6 mb-12"
                            variants={itemVariants}
                        >
                            {slide.stats.map((stat, idx) => (
                                <div key={idx} className="group">
                                    <div className="text-2xl md:text-3xl font-bold text-cyan-400 group-hover:text-blue-400 transition-colors">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {/* Buttons */}
                    <motion.div
                        className="flex gap-4 flex-wrap"
                        variants={itemVariants}
                    >
                        {renderButtonLink(
                            slide.primaryButtonLink || "#",
                            <button
                                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 group"
                            >
                                <span className="flex items-center gap-2">
                                    {slide.primaryButtonText || "Explore Programs"}
                                    <TrendingUp className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                        )}

                        {slide.secondaryButtonText &&
                            renderButtonLink(
                                slide.secondaryButtonLink || "#",
                                <button
                                    className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold rounded-full transition-all duration-300"
                                >
                                    {slide.secondaryButtonText}
                                </button>
                            )}
                    </motion.div>
                </motion.div>

                {/* Right Side - Floating Cards */}
                {slide.floatingCards && slide.floatingCards.length > 0 && (
                    <motion.div
                        className="flex-1 relative h-full hidden lg:flex items-center justify-center"
                        variants={itemVariants}
                    >
                        <FloatingCards cards={slide.floatingCards} glowColor={slide.glowColor} />
                    </motion.div>
                )}
            </motion.div>
        </div>
    )
}

function FloatingCards({ cards = [], glowColor = "purple" }) {
    const glowMap = {
        purple: "rgba(124, 58, 237, 0.4)",
        cyan: "rgba(34, 211, 238, 0.4)",
        pink: "rgba(236, 72, 153, 0.4)",
        blue: "rgba(59, 130, 246, 0.4)",
        green: "rgba(34, 197, 94, 0.4)",
    }

    const glowGradientMap = {
        purple: "from-purple-600/25 to-transparent",
        cyan: "from-cyan-600/20 to-transparent",
        pink: "from-pink-600/25 to-transparent",
        blue: "from-blue-600/25 to-transparent",
        green: "from-green-600/20 to-transparent",
    }

    const selectedGlow = glowMap[glowColor] || glowMap.purple
    const selectedGradient = glowGradientMap[glowColor] || glowGradientMap.purple

    return (
        <div className="relative w-full h-full flex items-center justify-center perspective">
            {/* Background glow effects */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    className={`absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br ${selectedGradient} rounded-full blur-3xl`}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 6, repeat: Infinity }}
                />
            </div>

            {/* Render floating cards dynamically */}
            {cards.map((card, index) => (
                <motion.div
                    key={card._id || index}
                    className={`absolute w-56 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/15 rounded-2xl p-5 shadow-2xl ${card.position || "top-12 left-12"}`}
                    animate={
                        card.animation || {
                            y: [0, -20, 0],
                            x: [-15, 0, -15],
                        }
                    }
                    transition={{
                        duration: card.animation?.duration || 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    whileHover={{
                        scale: 1.1,
                        boxShadow: `0 0 50px ${selectedGlow}`,
                        borderColor: "rgba(96, 165, 250, 0.6)",
                    }}
                    style={{
                        rotateZ: card.rotateZ || 0,
                    }}
                >
                    {card.emoji && <div className="text-3xl mb-3">{card.emoji}</div>}

                    {card.badge && (
                        <motion.span
                            className={`absolute top-3 right-3 px-2 py-1 bg-gradient-to-r from-red-500/40 to-pink-500/40 backdrop-blur-md border border-red-400/40 rounded-lg text-xs font-bold text-red-300`}
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            {card.badge}
                        </motion.span>
                    )}

                    <h4 className="text-white font-bold text-sm mb-1">{card.title}</h4>
                    {card.highlight && (
                        <p className="text-cyan-300 font-bold text-lg mb-2">{card.highlight}</p>
                    )}
                    {card.description && (
                        <p className="text-xs text-gray-400">{card.description}</p>
                    )}
                </motion.div>
            ))}
        </div>
    )
}
