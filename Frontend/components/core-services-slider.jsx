"use client"

import { useEffect, useState } from "react"
import { Inter, Poppins } from "next/font/google"

const poppins = Poppins({ subsets: ["latin"], weight: ["600", "700"] })
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })

const SERVICES = [
    {
        label: "CORE SERVICE 01",
        title: "Career Counselling",
        description:
            "Personalized support to help you choose the right path, build confidence, and move forward with clarity.",
        chips: ["Career Mapping", "Interview Prep", "Goal Planning"],
    },
    {
        label: "CORE SERVICE 02",
        title: "Domestic & Abroad Education",
        description:
            "Complete admission support for local and international study opportunities, including profile evaluation and application strategy.",
        chips: ["University Selection", "Application Support", "Visa Guidance"],
    },
    {
        label: "CORE SERVICE 03",
        title: "Recruitment Services",
        description:
            "Smart talent matching and hiring support to connect organizations with high-potential candidates quickly and effectively.",
        chips: ["Talent Screening", "Role Matching", "Hiring Support"],
    },
]

function Slide({ service, isActive, index }) {
    return (
        <article
            className={`absolute inset-0 transition-all duration-700 ease-out ${isActive ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                }`}
        >
            <div className="h-full rounded-[28px] border border-white/20 bg-white/8 px-7 py-7 backdrop-blur-xl sm:px-8 sm:py-8 lg:px-10 lg:py-9">

                <h3 className={`${poppins.className} mt-3 bg-gradient-to-r from-[#d8c4ff] via-[#e0f2ff] to-[#ffc8ea] bg-clip-text text-[2rem] font-bold leading-tight tracking-tight text-transparent sm:text-[2.3rem]`}>
                    {service.title}
                </h3>

                <p className={`${inter.className} mt-4 max-w-3xl text-lg leading-9 text-white/85`}>
                    {service.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                    {service.chips.map((chip) => (
                        <span
                            key={chip}
                            className={`${inter.className} rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white`}
                        >
                            {chip}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    )
}

export function CoreServicesSlider() {
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((current) => (current + 1) % SERVICES.length)
        }, 4200)

        return () => clearInterval(timer)
    }, [])

    return (
        <section className="relative flex min-h-[56vh] w-full items-center justify-center overflow-hidden rounded-[28px] bg-[#020617] px-4 py-6 shadow-[0_30px_90px_-45px_rgba(124,58,237,0.45)] sm:min-h-[60vh] sm:px-6 lg:min-h-[64vh] lg:px-8">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#7C3AED] via-[#3B82F6] to-[#EC4899] opacity-35" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(167,139,250,0.38),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(167,139,250,0.24),transparent_44%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[#020617]/60" />

            <div className="relative z-10 w-full max-w-6xl animate-fadeInUp">
                <div className="mb-5 flex items-center justify-between gap-4">
                    <div />
                </div>

                <h2 className={`${poppins.className} mb-4 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl`}>
                    Designed For Your Next Big Move
                </h2>

                <div className="relative h-[320px] overflow-hidden rounded-[28px] border border-white/20 bg-white/6 sm:h-[340px] lg:h-[360px]">
                    {SERVICES.map((service, index) => (
                        <Slide key={service.title} service={service} index={index} isActive={index === activeIndex} />
                    ))}
                </div>

                <div className="mt-4 flex items-center justify-center gap-2">
                    {SERVICES.map((service, index) => (
                        <button
                            key={service.title}
                            type="button"
                            aria-label={`Show ${service.title}`}
                            onClick={() => setActiveIndex(index)}
                            className={`h-2.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-10 bg-[#A78BFA] shadow-[0_0_16px_rgba(167,139,250,0.85)]" : "w-2.5 bg-white/40 hover:bg-white/65"
                                }`}
                        />
                    ))}
                </div>

                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] via-[#3B82F6] to-[#EC4899] transition-all duration-500 shadow-[0_0_16px_rgba(167,139,250,0.8)]"
                        style={{ width: `${((activeIndex + 1) / SERVICES.length) * 100}%` }}
                    />
                </div>

                <div className="mt-4 flex justify-center">
                    <button
                        type="button"
                        className={`${inter.className} rounded-full border border-white/25 bg-gradient-to-r from-[#7C3AED]/30 via-[#3B82F6]/30 to-[#EC4899]/30 px-6 py-2 text-center text-xs font-extrabold uppercase tracking-[0.24em] text-white shadow-[0_0_24px_rgba(167,139,250,0.55)] sm:text-sm`}
                    >
                        WE ARE COMING SOON AT OUR SERVICE
                    </button>
                </div>
            </div>
        </section>
    )
}

