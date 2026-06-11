"use client"

import { Header } from "@/components/header"
import Link from "next/link"
import { Globe, CheckCircle, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"

export default function LanguageTrainingPage() {
    const languages = [
        { name: "English", level: "Beginner to Advanced" },
        { name: "German", level: "Beginner to Advanced" },
        { name: "French", level: "Beginner to Advanced" },
        { name: "Japanese", level: "Beginner to Intermediate" }
    ]

    const services = [
        {
            title: "Online & Offline Classes",
            description: "Flexible learning options through live online classes or in-person classroom sessions",
            icon: Globe
        },
        {
            title: "Professional Trainers",
            description: "Experienced language experts with proven teaching methodologies",
            icon: Users
        },
        {
            title: "Practical Skills",
            description: "Focus on real-world communication for work, studies, and migration",
            icon: Zap
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
                        backgroundImage: "url('https://images.unsplash.com/photo-1543269865-cbdf26cecb46?w=1920&h=1080&fit=crop')"
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-white dark:from-black/60 dark:via-black/50 dark:to-background z-10" />
                <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center animate-fadeInUp" style={{ animation: 'fadeInUp 0.6s ease-out 0.1s both' }}>
                        <div className="h-16 w-16 rounded-xl bg-purple-500/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                            <Globe className="h-8 w-8 text-purple-400" />
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
                            Language <span className="text-purple-400">Training</span>
                        </h1>
                        <p className="text-xl text-gray-200 mb-8">
                            Master international languages with expert trainers
                        </p>
                    </div>
                </div>
            </section>

            {/* Overview Section */}
            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="animate-fadeInUp" style={{ animation: 'fadeInUp 0.6s ease-out 0.2s both' }}>
                            <h2 className="text-3xl font-bold text-foreground mb-6">Fluency in Your Chosen Language</h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                Our Language Training services offer professional coaching in English, German, French, and Japanese through both online and offline classes.
                            </p>
                            <p className="text-lg text-muted-foreground mb-6">
                                We provide flexible learning options for students, professionals, and individuals who want to improve communication skills, prepare for international studies, career opportunities, or migration purposes.
                            </p>
                            <p className="text-lg text-muted-foreground">
                                Our programs focus on speaking, listening, reading, writing, grammar, vocabulary, and practical conversation skills.
                            </p>
                        </div>
                        <div className="animate-fadeInUp" style={{ animation: 'fadeInUp 0.6s ease-out 0.3s both' }}>
                            <img
                                src="https://images.unsplash.com/photo-1543269865-cbdf26cecb46?w=600&h=400&fit=crop"
                                alt="Language Training"
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
                            Comprehensive language learning programs tailored to your needs
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
                                    <Icon className="h-10 w-10 text-purple-400 mb-4" />
                                    <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                                    <p className="text-muted-foreground">{service.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Languages Offered */}
            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Languages We Teach</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {languages.map((lang, index) => (
                            <div
                                key={index}
                                className="p-6 rounded-lg border border-border hover:border-primary/50 transition-all hover:shadow-lg bg-background text-center"
                            >
                                <h3 className="text-xl font-semibold text-foreground mb-2">{lang.name}</h3>
                                <p className="text-sm text-muted-foreground">{lang.level}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills Development */}
            <section className="py-16 lg:py-24 bg-secondary/30">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Skills We Develop</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            "Speaking & Conversation",
                            "Listening & Comprehension",
                            "Reading & Understanding",
                            "Writing & Grammar",
                            "Vocabulary Building",
                            "Pronunciation & Accent",
                            "Practical Communication",
                            "Cultural Awareness"
                        ].map((skill, index) => (
                            <div
                                key={index}
                                className="flex items-center p-4 rounded-lg bg-background hover:bg-secondary transition-all border border-border hover:border-primary/50"
                            >
                                <CheckCircle className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0" />
                                <span className="text-foreground">{skill}</span>
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
                        With experienced trainers, interactive sessions, and personalized guidance, we help learners gain confidence and achieve fluency in their chosen language. Whether you're preparing for international studies, career advancement, or personal growth, our programs are designed to help you succeed.
                    </p>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 lg:py-24 bg-secondary/30">
                <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-foreground mb-6">Begin Your Language Journey</h2>
                    <p className="text-xl text-muted-foreground mb-8">
                        Connect with our language experts and start learning in a way that works for you. Flexible classes, expert trainers, and guaranteed progress.
                    </p>
                    <Link href={`/contact?service=${encodeURIComponent("Career Counselling")}`}>
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg">
                            Enroll Now
                        </Button>
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    )
}
