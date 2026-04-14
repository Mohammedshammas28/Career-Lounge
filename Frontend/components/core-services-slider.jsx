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
            <div className="flex h-full flex-col rounded-[28px] border border-black/20 bg-black/25 pr-5 pl-7 py-5 backdrop-blur-xl sm:pr-8 sm:pl-10 sm:py-8 lg:pr-10 lg:pl-12 lg:py-9">

                <h3 className={`${poppins.className} mt-0 text-[1.55rem] font-bold leading-tight tracking-tight text-white sm:text-[2.15rem] lg:text-[2.3rem]`}>
                    {service.title}
                </h3>

                <p className={`${inter.className} mt-3 max-w-3xl text-sm leading-7 text-white/85 sm:mt-4 sm:text-lg sm:leading-9`}>
                    {service.description}
                </p>


                <div className="mt-2 flex flex-wrap gap-1.5 sm:mt-3 sm:gap-2">
                    {service.chips.map((chip) => (
                        <span
                            key={chip}
                            className={`${inter.className} rounded-full border border-[#A78BFA]/40 bg-[#A78BFA]/12 px-2 py-1 text-[10px] font-semibold text-white/95 sm:px-4 sm:py-1.5 sm:text-sm`}
                        >
                            {chip}
                        </span>
                    ))}
                </div>

                <p className={`${inter.className} mt-2 max-w-3xl text-[0.92rem] font-semibold leading-6 text-white sm:mt-3 sm:text-base sm:leading-8`}>
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
        <section className="relative min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#020617] via-[#7C3AED] to-[#3B82F6]">
            <div className="pointer-events-none absolute left-[-100px] top-[-100px] h-[400px] w-[400px] rounded-full bg-[#3B82F6] opacity-20 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-[-100px] right-[-100px] h-[400px] w-[400px] rounded-full bg-[#A78BFA] opacity-20 blur-[120px]" />
            <div className="pointer-events-none absolute inset-0 bg-black/40" />

            <div className="relative z-10 flex min-h-screen w-full items-start justify-center px-4 py-6 sm:items-center sm:px-6 lg:px-8">
                <div className="w-full max-w-6xl animate-fadeInUp">

                    <div className="mb-4 flex justify-start sm:mb-6">
                        <img
                            src="/Careerlounge%20logo%20(1).png"
                            alt="Career Lounge logo"
                            className="h-auto w-[210px] sm:w-[290px]"
                            style={{ filter: "brightness(1.9) contrast(1.15) saturate(1.1)" }}
                        />
                    </div>

                    <h2 className={`${poppins.className} mb-3 text-[1.75rem] font-bold tracking-tight text-white sm:text-3xl lg:text-4xl`}>
                        Designing Your Next Big Move
                    </h2>

                    <p className={`${inter.className} mb-5 max-w-3xl text-sm font-medium leading-7 text-white/80 sm:text-base`}>
                        We don't just guide — we help you move forward with confidence.
                    </p>

                    <div className="relative">
                        <div className="relative h-[420px] overflow-hidden rounded-[28px] border border-black/20 bg-black/20 sm:h-[360px] lg:h-[380px]">
                            {SERVICES.map((service, index) => (
                                <Slide key={service.title} service={service} index={index} isActive={index === activeIndex} />
                            ))}
                        </div>

                        <button
                            type="button"
                            aria-label="Previous slide"
                            onClick={() =>
                                setActiveIndex((current) =>
                                    (current - 1 + SERVICES.length) % SERVICES.length
                                )
                            }
                            className="absolute left-2 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/55 text-lg font-bold text-white backdrop-blur transition hover:bg-black/75 sm:flex"
                        >
                            &lt;
                        </button>

                        <button
                            type="button"
                            aria-label="Next slide"
                            onClick={() =>
                                setActiveIndex((current) => (current + 1) % SERVICES.length)
                            }
                            className="absolute right-2 top-1/2 z-20 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/35 bg-black/55 text-lg font-bold text-white backdrop-blur transition hover:bg-black/75 sm:flex"
                        >
                            &gt;
                        </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between sm:hidden">
                        <button
                            type="button"
                            aria-label="Previous slide"
                            onClick={() =>
                                setActiveIndex((current) =>
                                    (current - 1 + SERVICES.length) % SERVICES.length
                                )
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/35 bg-black/55 text-base font-bold text-white backdrop-blur"
                        >
                            &lt;
                        </button>

                        <button
                            type="button"
                            aria-label="Next slide"
                            onClick={() =>
                                setActiveIndex((current) => (current + 1) % SERVICES.length)
                            }
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
                            className={`${inter.className} max-w-full rounded-full border border-white/25 bg-gradient-to-r from-[#7C3AED]/30 via-[#3B82F6]/30 to-[#6366F1]/30 px-3 py-2 text-center text-[11px] font-extrabold uppercase tracking-[0.12em] text-white shadow-[0_0_24px_rgba(167,139,250,0.55)] sm:px-6 sm:text-sm sm:tracking-[0.24em]`}
                        >
                            <div>Something great is on the way 🚀</div>
                            <div className="text-[0.65rem] font-semibold normal-case tracking-normal sm:ml-2 sm:inline sm:text-xs">Launching soon — stay tuned.</div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

