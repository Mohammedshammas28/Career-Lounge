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
            <div className="h-full rounded-[28px] border border-[#f2caa5] bg-[#f4f6f8] px-7 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-9">

                <h3 className={`${poppins.className} mt-3 text-[2rem] font-bold leading-tight tracking-tight text-[#151f36] sm:text-[2.3rem]`}>
                    {service.title}
                </h3>

                <p className={`${inter.className} mt-4 max-w-3xl text-lg leading-9 text-[#4e5b73]`}>
                    {service.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-2">
                    {service.chips.map((chip) => (
                        <span
                            key={chip}
                            className={`${inter.className} rounded-full border border-[#e7bc82] bg-[#f8ebd2] px-4 py-1.5 text-sm font-semibold text-[#9d5a11]`}
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
        <section className="relative flex min-h-[56vh] w-full items-center justify-center overflow-hidden rounded-[28px] bg-gradient-to-br from-[#fdf2de] via-[#fff4e6] to-[#ffe8eb] px-4 py-6 shadow-[0_30px_90px_-45px_rgba(180,83,9,0.45)] sm:min-h-[60vh] sm:px-6 lg:min-h-[64vh] lg:px-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,146,60,0.18),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(244,63,94,0.14),transparent_40%)]" />
            <div className="pointer-events-none absolute inset-0 bg-white/30" />

            <div className="relative z-10 w-full max-w-6xl animate-fadeInUp">
                <div className="mb-5 flex items-center justify-between gap-4">
                    <div />
                </div>

                <h2 className={`${poppins.className} mb-4 text-2xl font-bold tracking-tight text-[#3d170d] sm:text-3xl lg:text-4xl`}>
                    Designed For Your Next Big Move
                </h2>

                <div className="relative h-[320px] overflow-hidden rounded-[28px] border border-[#f0c79f] bg-[#fbfcff]/70 sm:h-[340px] lg:h-[360px]">
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
                            className={`h-2.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-10 bg-[#c4440f]" : "w-2.5 bg-[#efb06d] hover:bg-[#dd8f40]"
                                }`}
                        />
                    ))}
                </div>

                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[#efc9a2]">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-[#f15a0f] via-[#f0492d] to-[#ea2c7c] transition-all duration-500"
                        style={{ width: `${((activeIndex + 1) / SERVICES.length) * 100}%` }}
                    />
                </div>

                <div className="mt-4 flex justify-center">
                    <button
                        type="button"
                        className={`${inter.className} rounded-full border border-[#f1b36e] bg-gradient-to-r from-[#fff1dc] via-[#ffe7c9] to-[#ffd9bb] px-6 py-2 text-center text-xs font-extrabold uppercase tracking-[0.24em] text-[#c64b12] shadow-[0_0_24px_rgba(240,129,61,0.35)] sm:text-sm`}
                    >
                        WE ARE COMING SOON AT OUR SERVICE
                    </button>
                </div>
            </div>
        </section>
    )
}

