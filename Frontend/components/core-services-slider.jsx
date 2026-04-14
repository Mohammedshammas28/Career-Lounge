"use client"

import { useEffect, useState } from "react"
import { Inter, Poppins } from "next/font/google"

const poppins = Poppins({ subsets: ["latin"], weight: ["600", "700"] })
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })

const SERVICES = [
    {
        label: "CORE SERVICE 01",
        title: "Career Counselling ",
        description:
            "Figure out what actually fits you - not just what sounds good.",
        quote: "Clarity > Confusion. Always.",
        chips: ["Career Mapping", "Interview Glow-Up", "Goal Setting (No Confusion Mode)"],
    },
    {
        label: "CORE SERVICE 02",
        title: "Domestic & Abroad Education ",
        description:
            "From shortlisting colleges to landing that offer - we’ve got you.",
        quote: "Dream college? Let’s make it real.",
        chips: ["University Matchmaking", "Application Game Strong", "Visa, Sorted"],
    },
    {
        label: "CORE SERVICE 03",
        title: "Recruitment Services ",
        description:
            "We connect real talent with real opportunities - fast.",
        quote: "Right people. Right roles. No drama.",
        chips: ["Talent Scouting", "Role Matching", "Quick Hiring"],
    },
]

function Slide({ service, isActive, index }) {
    return (
        <article
            className={`absolute inset-0 transition-all duration-700 ease-out ${isActive ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                }`}
        >
            <div className="h-full rounded-[28px] border border-black/20 bg-black/25 px-7 py-7 backdrop-blur-xl sm:px-8 sm:py-8 lg:px-10 lg:py-9">

                <div className={`${inter.className} text-xs font-semibold uppercase tracking-[0.28em] text-white/45`}>
                    {service.label}
                </div>

                <h3 className={`${poppins.className} mt-3 bg-gradient-to-r from-[#7C3AED] via-[#3B82F6] to-[#6366F1] bg-clip-text text-[2rem] font-bold leading-tight tracking-tight text-transparent sm:text-[2.3rem]`}>
                    {service.title}
                </h3>

                <p className={`${inter.className} mt-4 max-w-3xl text-lg leading-9 text-white/72`}>
                    {service.description}
                </p>

                <p className={`${inter.className} mt-4 max-w-3xl text-base font-semibold leading-8 text-white/92`}>
                    {service.quote}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                    {service.chips.map((chip) => (
                        <span
                            key={chip}
                            className={`${inter.className} rounded-full border border-[#A78BFA]/40 bg-[#A78BFA]/12 px-4 py-1.5 text-sm font-semibold text-white/92`}
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
        <section className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-[#020617] via-[#7C3AED] to-[#3B82F6]">
            <div className="pointer-events-none absolute left-[-100px] top-[-100px] h-[400px] w-[400px] rounded-full bg-[#3B82F6] opacity-20 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-[-100px] right-[-100px] h-[400px] w-[400px] rounded-full bg-[#A78BFA] opacity-20 blur-[120px]" />
            <div className="pointer-events-none absolute inset-0 bg-black/40" />

            <div className="relative z-10 flex h-full w-full items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
                <div className="w-full max-w-6xl animate-fadeInUp">

                    <h2 className={`${poppins.className} mb-3 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl`}>
                        Designing Your Next Big Move
                    </h2>

                    <p className={`${inter.className} mb-5 max-w-3xl text-sm font-medium leading-7 text-white/80 sm:text-base`}>
                        We don’t just guide - we level up your future.
                    </p>

                    <div className="relative h-[320px] overflow-hidden rounded-[28px] border border-black/20 bg-black/20 sm:h-[340px] lg:h-[360px]">
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
                            className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] via-[#3B82F6] to-[#6366F1] transition-all duration-500 shadow-[0_0_16px_rgba(167,139,250,0.8)]"
                            style={{ width: `${((activeIndex + 1) / SERVICES.length) * 100}%` }}
                        />
                    </div>

                    <div className="mt-4 flex justify-center">
                        <button
                            type="button"
                            className={`${inter.className} rounded-full border border-white/25 bg-gradient-to-r from-[#7C3AED]/30 via-[#3B82F6]/30 to-[#6366F1]/30 px-6 py-2 text-center text-xs font-extrabold uppercase tracking-[0.24em] text-white shadow-[0_0_24px_rgba(167,139,250,0.55)] sm:text-sm`}
                        >
                            We’re cooking something big 👀🔥
                            <span className="ml-2 hidden sm:inline">Launching soon - stay ready.</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

