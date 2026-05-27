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
            "Find what truly fits you — not just what sounds right.",
        quote: "Clarity over confusion. Always.",
        chips: ["Career Mapping", "Interview Preparation", "Goal Planning"],
    },
    {
        label: "CORE SERVICE 02",
        title: "Domestic & Abroad Education",
        description:
            "From shortlisting to securing admission — we guide you every step.",
        quote: "Your dream college starts here.",
        chips: ["University Selection", "Application Support", "Visa Assistance"],
    },
    {
        label: "CORE SERVICE 03",
        title: "Recruitment Services",
        description:
            "Connecting the right talent with the right opportunities.",
        quote: "Right people. Right roles.",
        chips: ["Talent Screening", "Role Matching", "Efficient Hiring"],
    },
]

function Slide({ service, isActive, index }) {
    return (
        <article
            className={`absolute inset-0 transition-[transform,opacity] duration-700 ease-in-out ${isActive ? "translate-x-0 opacity-100 pointer-events-auto" : "translate-x-full opacity-0 pointer-events-none"
                }`}
        >
            <div className="flex h-full flex-col items-center justify-center rounded-[28px] border border-black/20 bg-black/25 px-6 py-6 backdrop-blur-xl sm:px-10 sm:py-10 lg:px-14 lg:py-12">

                <h3 className={`${poppins.className} mt-0 text-center text-xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl`}>
                    {service.title}
                </h3>

                <p className={`${inter.className} mt-3 max-w-3xl text-center text-xs leading-relaxed text-white/85 sm:mt-4 sm:text-base sm:leading-loose`}>
                    {service.description}
                </p>


                <div className="mt-4 flex flex-wrap justify-center gap-2 sm:mt-6 sm:gap-3">
                    {service.chips.map((chip) => (
                        <span
                            key={chip}
                            className={`${inter.className} rounded-full bg-[#A78BFA]/12 px-2 py-1 text-[10px] font-semibold text-white/95 sm:px-4 sm:py-1.5 sm:text-sm`}
                        >
                            {chip}
                        </span>
                    ))}
                </div>

                <p className={`${inter.className} mt-2 max-w-3xl text-center text-[0.92rem] font-semibold leading-6 text-white sm:mt-3 sm:text-base sm:leading-8`}>
                    {service.quote}
                </p>
            </div>
        </article>
    )
}

export function CoreServicesSlider() {
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((current) => (current + 1) % SERVICES.length)
        }, 6500)

        return () => clearInterval(timer)
    }, [])

    return (
        <>
            {/* Navbar/Header */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
                <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-4 lg:px-8">
                    <div className="flex items-center">
                        <img
                            src="/Careerlounge%20logo%20(1).png"
                            alt="Career Lounge logo"
                            className="h-auto w-[150px] sm:w-[200px]"
                        />
                    </div>
                </div>
            </nav>

            <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#020617] via-[#7C3AED] to-[#3B82F6]" style={{ marginTop: "70px" }}>
                <div className="pointer-events-none absolute left-[-100px] top-[-100px] h-[400px] w-[400px] rounded-full bg-[#3B82F6] opacity-20 blur-[120px]" />
                <div className="pointer-events-none absolute inset-0 bg-black/40" />

                <div className="relative z-10 flex min-h-screen w-full items-start justify-center px-4 py-6 sm:items-center sm:px-6 lg:px-8">
                    <div className="w-full max-w-6xl animate-fadeInUp">

                        <h2 className={`${poppins.className} mb-3 text-[1.75rem] font-bold tracking-tight text-white sm:text-3xl lg:text-4xl`}>
                            Designing Your Next Big Move
                        </h2>

                        <p className={`${inter.className} mb-5 max-w-3xl text-sm font-medium leading-7 text-white/80 sm:text-base`}>
                            We don't just guide — we help you move forward with confidence.
                        </p>

                        <div className="relative">
                            <div className="relative h-[480px] min-[400px]:h-[420px] sm:h-[360px] md:h-[340px] lg:h-[380px] overflow-hidden rounded-[28px] border border-black/20 bg-black/20">
                                {SERVICES.map((service, index) => (
                                    <Slide key={service.title} service={service} index={index} isActive={index === activeIndex} />
                                ))}
                            </div>

                            <button
                                type="button"
                                aria-label="Previous slide"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setActiveIndex((current) =>
                                        (current - 1 + SERVICES.length) % SERVICES.length
                                    )
                                }}
                                className="absolute left-2 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/55 text-lg font-bold text-white backdrop-blur transition hover:bg-black/75 sm:flex"
                            >
                                &lt;
                            </button>

                            <button
                                type="button"
                                aria-label="Next slide"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setActiveIndex((current) => (current + 1) % SERVICES.length)
                                }}
                                className="absolute right-2 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/55 text-lg font-bold text-white backdrop-blur transition hover:bg-black/75 sm:flex"
                            >
                                &gt;
                            </button>
                        </div>

                        <div className="mt-3 flex items-center justify-between sm:hidden">
                            <button
                                type="button"
                                aria-label="Previous slide"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setActiveIndex((current) =>
                                        (current - 1 + SERVICES.length) % SERVICES.length
                                    )
                                }}
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/35 bg-black/55 text-base font-bold text-white backdrop-blur"
                            >
                                &lt;
                            </button>

                            <button
                                type="button"
                                aria-label="Next slide"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setActiveIndex((current) => (current + 1) % SERVICES.length)
                                }}
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/35 bg-black/55 text-base font-bold text-white backdrop-blur"
                            >
                                &gt;
                            </button>
                        </div>

                        <div className="mt-3 flex items-center justify-center gap-2 sm:mt-4">
                            {SERVICES.map((service, index) => (
                                <button
                                    key={service.title}
                                    type="button"
                                    aria-label={`Show ${service.title}`}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setActiveIndex(index)
                                    }}
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
                                className={`${inter.className} max-w-full rounded-2xl sm:rounded-full bg-black/40 backdrop-blur-xl border border-white/20 px-4 py-3 sm:px-16 sm:py-2.5 text-center text-[12px] sm:text-sm font-extrabold uppercase tracking-[0.06em] sm:tracking-[0.24em] text-white shadow-[0_0_40px_rgba(139,92,246,0.6)] flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-0`}
                            >
                                <span className="font-bold">Something great is on the way 🚀</span>
                                <span className="text-[0.85rem] font-bold normal-case tracking-normal sm:ml-2 sm:text-base">Launching soon — stay tuned.</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

