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
            className={`absolute inset-0 transition-all duration-700 ease-out ${isActive ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
                }`}
        >
            <div className="h-full rounded-[28px] border border-slate-200/80 bg-white/70 px-7 py-7 backdrop-blur-xl sm:px-8 sm:py-8 lg:px-10 lg:py-9">

                <h3 className={`${poppins.className} mt-0 text-[2rem] font-bold leading-tight tracking-tight text-[#1E293B] sm:text-[2.3rem]`}>
                    {service.title}
                </h3>

                <p className={`${inter.className} mt-4 max-w-3xl text-lg leading-9 text-[#475569]`}>
                    {service.description}
                </p>


                <div className="mt-3 flex flex-wrap gap-2">
                    {service.chips.map((chip) => (
                        <span
                            key={chip}
                            className={`${inter.className} rounded-full border border-[#A78BFA]/45 bg-[#A78BFA]/16 px-2 py-1 text-xs font-semibold text-[#475569] sm:px-4 sm:py-1.5 sm:text-sm`}
                        >
                            {chip}
                        </span>
                    ))}
                </div>

                <p className={`${inter.className} mt-3 max-w-3xl text-base font-semibold leading-8 text-[#1E293B]`}>
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
        <section className="relative h-screen w-full overflow-hidden bg-[#F8FAFF]">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#A78BFA]/35 via-[#60A5FA]/25 to-[#F472B6]/28" />
            <div className="pointer-events-none absolute left-[-100px] top-[-100px] h-[400px] w-[400px] rounded-full bg-[#C4B5FD] opacity-45 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-[-100px] right-[-100px] h-[400px] w-[400px] rounded-full bg-[#C4B5FD] opacity-35 blur-[120px]" />
            <div className="pointer-events-none absolute inset-0 bg-white/25" />

            <div className="relative z-10 flex h-full w-full items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
                <div className="w-full max-w-6xl animate-fadeInUp">

                    <h2 className={`${poppins.className} mb-3 text-2xl font-bold tracking-tight text-[#1E293B] sm:text-3xl lg:text-4xl`}>
                        Designing Your Next Big Move
                    </h2>

                    <p className={`${inter.className} mb-5 max-w-3xl text-sm font-medium leading-7 text-[#475569] sm:text-base`}>
                        We don't just guide — we help you move forward with confidence.
                    </p>

                    <div className="relative h-[320px] overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/45 sm:h-[340px] lg:h-[360px]">
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
                                className={`h-2.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-10 bg-[#A78BFA] shadow-[0_0_16px_rgba(196,181,253,0.9)]" : "w-2.5 bg-slate-400/40 hover:bg-slate-500/60"
                                    }`}
                            />
                        ))}
                    </div>

                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-300/60">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-[#A78BFA] via-[#60A5FA] to-[#F472B6] transition-all duration-500 shadow-[0_0_16px_rgba(196,181,253,0.85)]"
                            style={{ width: `${((activeIndex + 1) / SERVICES.length) * 100}%` }}
                        />
                    </div>

                    <div className="mt-4 flex justify-center">
                        <button
                            type="button"
                            className={`${inter.className} rounded-full border border-[#A78BFA]/45 bg-gradient-to-r from-[#A78BFA]/24 via-[#60A5FA]/24 to-[#F472B6]/24 px-4 py-2 text-center text-xs font-extrabold uppercase tracking-[0.24em] text-[#1E293B] shadow-[0_0_24px_rgba(196,181,253,0.65)] sm:px-6 sm:text-sm`}
                        >
                            <div>Something great is on the way 🚀</div>
                            <div className="text-[0.65rem] font-semibold normal-case tracking-normal text-[#475569] sm:ml-2 sm:inline sm:text-xs">Launching soon — stay tuned.</div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

