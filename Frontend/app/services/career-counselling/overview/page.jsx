"use client"

import { Header } from "@/components/header"
import Link from "next/link"
import { Briefcase, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"

export default function CareerCounsellingPage() {
    const features = [
        {
            title: "Personalized Guidance",
            description: "Identify your strengths, interests, and best career pathways",
            icon: Briefcase
        },
        {
            title: "Comprehensive Support",
            description: "Resume building, interview prep, and job search assistance",
            icon: CheckCircle
        },
        {
            title: "Global Opportunities",
            description: "Domestic and international admissions guidance",
            icon: ArrowRight
        }
    ]

    return (
        <main className="min-h-screen bg-background">
            <Header />

            {/* Hero Section */}
            <section className="py-20 lg:py-32 relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop')"
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-white dark:from-black/60 dark:via-black/50 dark:to-background z-10" />
                <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center animate-fadeInUp" style={{ animation: 'fadeInUp 0.6s ease-out 0.1s both' }}>
                        <div className="h-16 w-16 rounded-xl bg-green-500/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                            <Briefcase className="h-8 w-8 text-green-400" />
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
                            Career <span className="text-green-400">Counselling</span>
                        </h1>
                        <p className="text-xl text-gray-200 mb-8">
                            Your trusted partner for academic and career success
                        </p>
                    </div>
                </div>
            </section>

            {/* Overview Section */}
            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="animate-fadeInUp" style={{ animation: 'fadeInUp 0.6s ease-out 0.2s both' }}>
                            <h2 className="text-3xl font-bold text-foreground mb-6">Personalized Career Guidance</h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                Our Career Counselling is committed to guiding students, graduates, and professionals toward successful academic and career opportunities.
                            </p>
                            <p className="text-lg text-muted-foreground mb-6">
                                We provide personalized counselling services to help individuals identify their strengths, interests, and the best pathways for their future.
                            </p>
                            <p className="text-lg text-muted-foreground">
                                Our expertise includes domestic and international admissions, course selection, university applications, domestic and overseas education guidance, visa support, career planning, resume building, interview preparation, and job search assistance.
                            </p>
                        </div>
                        <div className="animate-fadeInUp" style={{ animation: 'fadeInUp 0.6s ease-out 0.3s both' }}>
                            <img
                                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
                                alt="Career Counselling"
                                className="rounded-xl shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 lg:py-24 bg-secondary/30">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">Our Services</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Comprehensive career development and guidance services
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const Icon = feature.icon
                            return (
                                <div
                                    key={index}
                                    className="p-8 rounded-xl bg-background border border-border hover:border-primary/50 transition-all hover:shadow-lg animate-fadeInUp"
                                    style={{ animation: `fadeInUp 0.6s ease-out ${0.2 + index * 0.1}s both` }}
                                >
                                    <Icon className="h-10 w-10 text-green-400 mb-4" />
                                    <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Expertise Section */}
            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Expertise</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            "Domestic & International Admissions",
                            "Course Selection & Planning",
                            "University Applications",
                            "Career Planning & Development",
                            "Resume Building",
                            "Interview Preparation",
                            "Job Search Assistance",
                            "Visa Support & Guidance"
                        ].map((expertise, index) => (
                            <div
                                key={index}
                                className="flex items-center p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-all"
                            >
                                <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                                <span className="text-foreground">{expertise}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Approach */}
            <section className="py-16 lg:py-24 bg-secondary/30">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-foreground mb-6">Our Approach</h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                        With expert advice and a client-focused approach, we help clients make informed decisions, achieve their goals, and build a successful future both locally and globally. Whether you're exploring career options, preparing for exams, or perfecting your language skills, we have specialized programs for every need.
                    </p>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Plan Your Future?</h2>
                    <p className="text-xl text-muted-foreground mb-8">
                        Connect with our career counsellors to explore your options, identify your strengths, and chart your path to success.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact">
                            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg">
                                Schedule Consultation
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
