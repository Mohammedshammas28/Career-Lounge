"use client"

import { useEffect, useState } from "react"
import { BriefcaseBusiness, FileCheck2, GraduationCap } from "lucide-react"
import { Inter, Poppins } from "next/font/google"

const poppins = Poppins({ subsets: ["latin"], weight: ["600", "700"] })
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "700", "800"] })

const SERVICES = [
    {
        title: "Career Counselling",
        description:
            "Personalized support to help you choose the right path, build confidence, and move forward with clarity.",
        icon: BriefcaseBusiness,
        chips: ["Career Mapping", "Interview Prep", "Goal Planning"],
    },
    {
        title: "Domestic & Abroad Education",
        description:
            "Guidance for local and international study opportunities with application planning and admission support.",
        icon: GraduationCap,
        chips: ["University Selection", "Visa Support", "Application Help"],
    },
    {
        title: "Recruitment Services",
        description:
            "Smart hiring support to connect talent with the right opportunities quickly and effectively.",
        icon: FileCheck2,
        chips: ["Talent Screening", "Role Matching", "Hiring Support"],
    },
]

function Slide({ service, isActive, index }) {
    const Icon = service.icon

    return (
        <article
            className={`absolute inset-0 flex items-center transition-all duration-700 ease-out ${isActive ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                }`}
        >
            <div className="w-full rounded-[28px] border border-border bg-card/85 p-5 shadow-[0_20px_60px_-35px_rgba(15,23,42,0.25)] backdrop-blur-xl sm:p-7 lg:p-10">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                        Core Service {String(index + 1).padStart(2, "0")}
                    </p>

                    <h3 className={`${poppins.className} mt-2 text-2xl font-black tracking-tight text-foreground sm:text-3xl lg:text-[2.2rem]`}>
                        {service.title}
                    </h3>

                    <p className={`${inter.className} mt-4 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base`}>
                        {service.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                        {service.chips.map((chip) => (
                            <span
                                key={chip}
                                className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                            >
                                {chip}
                            </span>
                        ))}
                    </div>
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
        <section className="relative flex min-h-[56vh] w-full items-center justify-center overflow-hidden rounded-[28px] bg-gradient-to-br from-background via-card to-background px-4 py-6 shadow-[0_30px_90px_-45px_rgba(15,23,42,0.25)] sm:min-h-[60vh] sm:px-6 lg:min-h-[64vh] lg:px-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.08),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.08),transparent_40%)]" />
            <div className="pointer-events-none absolute inset-0 bg-background/10" />

            <div className="relative z-10 w-full max-w-5xl animate-fadeInUp">
                <div className="mb-4 flex items-center justify-between gap-4">
                    <p className={`${poppins.className} text-xs font-semibold uppercase tracking-[0.45em] text-primary sm:text-sm`}>
                        Our Core Services
                    </p>
                </div>

                <h2 className={`${poppins.className} mb-4 text-2xl font-black tracking-tight text-foreground sm:text-3xl lg:text-4xl`}>
                    Designed For Your Next Big Move
                </h2>

                <div className="relative h-[320px] overflow-hidden rounded-[28px] border border-border bg-card/70 sm:h-[340px] lg:h-[360px]">
                    {SERVICES.map((service, index) => (
                        <Slide key={service.title} service={service} index={index} isActive={index === activeIndex} />
                    ))}
                </div>

                <div className="mt-3 flex items-center gap-2">
                    {SERVICES.map((service, index) => (
                        <button
                            key={service.title}
                            type="button"
                            aria-label={`Show ${service.title}`}
                            onClick={() => setActiveIndex(index)}
                            className={`h-2.5 rounded-full transition-all duration-300 ${index === activeIndex ? "w-10 bg-primary" : "w-2.5 bg-primary/30 hover:bg-primary/45"
                                }`}
                        />
                    ))}
                    <div className="ml-2 h-3 w-8 rounded-full bg-primary" />
                </div>

                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-primary/15">
                    <div
                        className="h-full rounded-full bg-gradient-to-r from-primary via-primary to-accent transition-all duration-500"
                        style={{ width: `${((activeIndex + 1) / SERVICES.length) * 100}%` }}
                    />
                </div>

                <p className={`${inter.className} mt-2 text-right text-xs font-semibold uppercase tracking-[0.22em] text-primary sm:text-sm`}>
                    We are coming soon at our Service
                </p>
            </div>
        </section>
    )
}

