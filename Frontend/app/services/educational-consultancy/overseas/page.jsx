"use client"

import { Header } from "@/components/header"
import Link from "next/link"
import { Globe, CheckCircle, ArrowRight, Plane, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"

export default function OverseasEducationPage() {
    const features = [
        {
            title: "University Selection",
            description: "Expert guidance in choosing the perfect university matching your profile and goals",
            icon: Globe
        },
        {
            title: "Application Support",
            description: "Complete assistance with university applications and documentation",
            icon: CheckCircle
        },
        {
            title: "Visa Assistance",
            description: "Expert guidance through the visa application process",
            icon: Plane
        }
    ]

    const countries = [
        { name: "USA", universities: "Harvard, MIT, Stanford, etc." },
        { name: "UK", universities: "Oxford, Cambridge, LSE, etc." },
        { name: "Canada", universities: "University of Toronto, UBC, McGill, etc." },
        { name: "Australia", universities: "University of Sydney, ANU, Melbourne, etc." },
        { name: "Germany", universities: "Technical University, Heidelberg, etc." },
        { name: "Singapore", universities: "NUS, NTU, SMU, etc." }
    ]

    return (
        <main className="min-h-screen bg-background">
            <Header />

            {/* Hero Section */}
            <section className="py-20 lg:py-32 relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop')"
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-white dark:from-black/60 dark:via-black/50 dark:to-background z-10" />
                <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center animate-fadeInUp" style={{ animation: 'fadeInUp 0.6s ease-out 0.1s both' }}>
                        <div className="h-16 w-16 rounded-xl bg-purple-500/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                            <Globe className="h-8 w-8 text-purple-400" />
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
                            Overseas <span className="text-purple-400">Education</span>
                        </h1>
                        <p className="text-xl text-gray-200 mb-8">
                            Study at world-class universities across the globe
                        </p>
                    </div>
                </div>
            </section>

            {/* Overview Section */}
            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="animate-fadeInUp" style={{ animation: 'fadeInUp 0.6s ease-out 0.2s both' }}>
                            <h2 className="text-3xl font-bold text-foreground mb-6">Global Education Opportunities</h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                Pursue your academic dreams at prestigious universities worldwide. Our overseas education services are designed to help you secure admissions at top institutions globally.
                            </p>
                            <p className="text-lg text-muted-foreground mb-6">
                                From selecting the right university to visa processing and post-arrival assistance, we guide you through every step of your international education journey.
                            </p>
                            <p className="text-lg text-muted-foreground">
                                Our educational consultants have extensive experience with universities across USA, UK, Canada, Australia, and more—ensuring you get the best guidance tailored to your aspirations.
                            </p>
                        </div>
                        <div className="animate-fadeInUp" style={{ animation: 'fadeInUp 0.6s ease-out 0.3s both' }}>
                            <img
                                src="https://images.unsplash.com/photo-1427504494785-cdded0338d6f?w=600&h=400&fit=crop"
                                alt="Overseas Education"
                                className="rounded-xl shadow-xl"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 lg:py-24 bg-secondary/30">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">Our Services</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Complete support for your overseas education goals
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
                                    <Icon className="h-10 w-10 text-purple-400 mb-4" />
                                    <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Countries & Universities */}
            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Top Study Destinations</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {countries.map((country, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-lg border border-border hover:border-primary/50 transition-all hover:shadow-lg bg-background"
                            >
                                <Award className="h-8 w-8 text-purple-400 mb-3" />
                                <h3 className="text-xl font-semibold text-foreground mb-2">{country.name}</h3>
                                <p className="text-sm text-muted-foreground">{country.universities}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Support Services */}
            <section className="py-16 lg:py-24 bg-secondary/30">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Support Services</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            "University Shortlisting & Selection",
                            "Statement of Purpose (SOP) Writing",
                            "Application Document Preparation",
                            "English Proficiency Test Guidance (IELTS/TOEFL)",
                            "Standardized Test Preparation (GRE/GMAT/SAT)",
                            "Interview Preparation",
                            "Visa Documentation & Process Guidance",
                            "Post-Arrival Accommodation & Settlement"
                        ].map((service, index) => (
                            <div
                                key={index}
                                className="flex items-center p-4 rounded-lg bg-background hover:bg-secondary transition-all border border-border hover:border-primary/50"
                            >
                                <CheckCircle className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0" />
                                <span className="text-foreground">{service}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-foreground mb-6">Start Your Global Journey</h2>
                    <p className="text-xl text-muted-foreground mb-8">
                        Connect with our educational consultants to explore universities worldwide and kickstart your international education journey.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/contact">
                            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg">
                                Schedule Consultation
                            </Button>
                        </Link>
                        <Link href="/services/educational-consultancy/domestic">
                            <Button variant="outline" className="px-8 py-6 text-lg">
                                Explore Domestic Education
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
