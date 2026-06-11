"use client"

import { Header } from "@/components/header"
import Link from "next/link"
import { BookOpen, CheckCircle, Award, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"

export default function TestPreparationPage() {
    const exams = [
        { name: "IELTS", category: "Language Proficiency" },
        { name: "TOEFL", category: "Language Proficiency" },
        { name: "PTE", category: "Language Proficiency" },
        { name: "GRE", category: "Competitive Exams" },
        { name: "GMAT", category: "Competitive Exams" },
        { name: "SAT", category: "Entrance Exams" }
    ]

    const services = [
        {
            title: "Personalized Study Plans",
            description: "Customized learning paths based on your current level and target scores",
            icon: BookOpen
        },
        {
            title: "Expert Training",
            description: "Live classes and classroom coaching from experienced trainers",
            icon: Award
        },
        {
            title: "Flexible Learning",
            description: "Online and offline options to suit your schedule and learning style",
            icon: Clock
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
                        backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&fit=crop')"
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-white dark:from-black/60 dark:via-black/50 dark:to-background z-10" />
                <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center animate-fadeInUp" style={{ animation: 'fadeInUp 0.6s ease-out 0.1s both' }}>
                        <div className="h-16 w-16 rounded-xl bg-blue-500/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                            <BookOpen className="h-8 w-8 text-blue-400" />
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
                            Test <span className="text-blue-400">Preparation</span>
                        </h1>
                        <p className="text-xl text-gray-200 mb-8">
                            Expert coaching for academic and competitive examinations
                        </p>
                    </div>
                </div>
            </section>

            {/* Overview Section */}
            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="animate-fadeInUp" style={{ animation: 'fadeInUp 0.6s ease-out 0.2s both' }}>
                            <h2 className="text-3xl font-bold text-foreground mb-6">Achieve Your Target Scores</h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                Our Test Preparation Coaching services are designed to help students achieve excellent results in academic, language proficiency, and competitive examinations through both online and offline coaching.
                            </p>
                            <p className="text-lg text-muted-foreground mb-6">
                                We provide expert training for IELTS, TOEFL, PTE, GRE, GMAT, SAT, and other entrance or professional exams with flexible learning options to suit every student's schedule and needs.
                            </p>
                            <p className="text-lg text-muted-foreground">
                                Our services include personalized study plans, live classes, classroom coaching, mock tests, time-management strategies, and skill development sessions.
                            </p>
                        </div>
                        <div className="animate-fadeInUp" style={{ animation: 'fadeInUp 0.6s ease-out 0.3s both' }}>
                            <img
                                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop"
                                alt="Test Preparation"
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
                            Comprehensive test preparation support
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {services.map((service, index) => {
                            const Icon = service.icon
                            return (
                                <div
                                    key={index}
                                    className="p-8 rounded-xl bg-background border border-border hover:border-primary/50 transition-all hover:shadow-lg animate-fadeInUp"
                                    style={{ animation: `fadeInUp 0.6s ease-out ${0.2 + index * 0.1}s both` }}
                                >
                                    <Icon className="h-10 w-10 text-blue-400 mb-4" />
                                    <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                                    <p className="text-muted-foreground">{service.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Exams Offered */}
            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Exams We Prepare You For</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {exams.map((exam, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-lg border border-border hover:border-primary/50 transition-all hover:shadow-lg bg-background"
                            >
                                <h3 className="text-xl font-semibold text-foreground mb-2">{exam.name}</h3>
                                <p className="text-sm text-muted-foreground">{exam.category}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Support Services */}
            <section className="py-16 lg:py-24 bg-secondary/30">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Comprehensive Support</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            "Mock Tests & Practice Exams",
                            "Time Management Strategies",
                            "Skill Development Sessions",
                            "One-on-One Tutoring",
                            "Study Materials & Resources",
                            "Progress Tracking & Reports"
                        ].map((support, index) => (
                            <div
                                key={index}
                                className="flex items-center p-4 rounded-lg bg-background hover:bg-secondary transition-all border border-border hover:border-primary/50"
                            >
                                <CheckCircle className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                                <span className="text-foreground">{support}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-foreground mb-6">Why Choose Us?</h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        With experienced trainers and structured support, we help students build confidence, improve performance, and achieve their target scores for admissions and career success. Our flexible learning options ensure you can study at your own pace while receiving expert guidance every step of the way.
                    </p>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 lg:py-24 bg-secondary/30">
                <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-foreground mb-6">Start Your Test Prep Journey</h2>
                    <p className="text-xl text-muted-foreground mb-8">
                        Connect with our expert trainers and achieve your target scores with personalized coaching and comprehensive support.
                    </p>
                    <Link href={`/contact?service=${encodeURIComponent("Career Counselling")}`}>
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg">
                            Schedule Free Consultation
                        </Button>
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    )
}
