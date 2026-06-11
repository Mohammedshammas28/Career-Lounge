"use client"

import { Header } from "@/components/header"
import Link from "next/link"
import { GraduationCap, CheckCircle, ArrowRight, Home, MapPin, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export default function DomesticEducationPage() {
    const [universities, setUniversities] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const features = [
        {
            title: "Wide Range of Programs",
            description: "B.Com, B.Sc, BBA, Engineering, Allied Health Sciences, Pharmacy, and more",
            icon: GraduationCap
        },
        {
            title: "Expert Guidance",
            description: "Career guidance, course selection, and college admissions support",
            icon: CheckCircle
        },
        {
            title: "Scholarship Assistance",
            description: "Help securing scholarships and financial aid opportunities",
            icon: ArrowRight
        }
    ]

    useEffect(() => {
        const fetchUniversities = async () => {
            try {
                setIsLoading(true)
                const response = await fetch("/api/universities", {
                    cache: "no-store",
                    headers: {
                        "Cache-Control": "no-cache",
                        "Pragma": "no-cache",
                        "Expires": "0",
                    },
                })

                if (!response.ok) throw new Error("Failed to fetch universities")

                const result = await response.json()
                const data = result.data || result.universities || []
                
                // Filter out only Domestic Universities
                const domesticUnis = data.filter(uni => uni.category === "Domestic")
                setUniversities(domesticUnis)
            } catch (err) {
                console.error("Error fetching universities:", err)
            } finally {
                setIsLoading(false)
            }
        }

        fetchUniversities()
    }, [])

    return (
        <main className="min-h-screen bg-background">
            <Header />

            {/* Hero Section */}
            <section className="py-20 lg:py-32 relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1523036782622-b132e98381ff?w=1920&h=1080&fit=crop')"
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-white dark:from-black/60 dark:via-black/50 dark:to-background z-10" />
                <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center animate-fadeInUp" style={{ animation: 'fadeInUp 0.6s ease-out 0.1s both' }}>
                        <div className="h-16 w-16 rounded-xl bg-blue-500/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                            <Home className="h-8 w-8 text-blue-400" />
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
                            Domestic <span className="text-blue-400">Education</span>
                        </h1>
                        <p className="text-xl text-gray-200 mb-8">
                            Secure admissions in leading colleges and universities across India
                        </p>
                    </div>
                </div>
            </section>

            {/* Overview Section */}
            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="animate-fadeInUp" style={{ animation: 'fadeInUp 0.6s ease-out 0.2s both' }}>
                            <h2 className="text-3xl font-bold text-foreground mb-6">Excellence in Indian Education</h2>
                            <p className="text-lg text-muted-foreground mb-6">
                                Our Domestic Education Services help students secure admissions in leading colleges and universities across India for a wide range of undergraduate and postgraduate programs.
                            </p>
                            <p className="text-lg text-muted-foreground mb-6">
                                We provide expert guidance for courses such as B.Com, B.Sc, BBA, Engineering, Allied Health Sciences, Pharmacy, and many other professional and academic programs.
                            </p>
                            <p className="text-lg text-muted-foreground">
                                Our counselling services include career guidance, course selection, college admissions, application support, and scholarship assistance.
                            </p>
                        </div>
                        <div className="animate-fadeInUp" style={{ animation: 'fadeInUp 0.6s ease-out 0.3s both' }}>
                            <img
                                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=400&fit=crop"
                                alt="Domestic Education"
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
                            Comprehensive support for your domestic education journey
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
                                    <Icon className="h-10 w-10 text-blue-400 mb-4" />
                                    <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Top Universities Dynamic Section */}
            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">India's Top Universities</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            We help students explore opportunities at India's leading universities, ensuring the best academic pathway for a successful future.
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="rounded-[1.5rem] border border-border overflow-hidden bg-white shadow-sm p-8">
                                    <Skeleton className="h-24 w-24 rounded-full mx-auto mb-6" />
                                    <Skeleton className="h-6 w-3/4 mx-auto mb-4" />
                                    <Skeleton className="h-4 w-2/3 mx-auto mb-8" />
                                    <div className="flex gap-2">
                                        <Skeleton className="h-11 flex-1 rounded-xl" />
                                        <Skeleton className="h-11 flex-1 rounded-xl" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : universities.length === 0 ? (
                        <div className="text-center py-16 bg-secondary/20 rounded-2xl border border-border/50">
                            <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-foreground mb-2">No Universities Currently Available</h3>
                            <p className="text-muted-foreground max-w-md mx-auto">
                                We are currently updating our partner institutions in India. Please contact us directly for opportunities.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {universities.map((uni) => (
                                <div
                                    key={uni._id || uni.slug}
                                    className="bg-white rounded-[1.5rem] p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col items-center text-center group"
                                >
                                    {/* University Logo */}
                                    <div className="w-full h-32 flex items-center justify-center mb-6">
                                        {uni.logo ? (
                                            <img
                                                src={uni.logo}
                                                alt={uni.universityName}
                                                className="max-h-24 max-w-[80%] object-contain"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                                                <Home className="w-8 h-8 text-slate-300" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Divider (Thin) */}
                                    <div className="w-full h-px bg-slate-100 mb-6" />

                                    {/* Name & Location */}
                                    <h3 className="text-lg font-bold text-slate-900 mb-2 min-h-[3rem] line-clamp-2 leading-tight">
                                        {uni.universityName}
                                    </h3>
                                    <p className="text-sm text-slate-600 font-medium mb-4 h-10 line-clamp-2">
                                        {uni.city && `${uni.city}, `}{uni.country}
                                    </p>

                                    {/* Website */}
                                    <p className="text-[12px] text-slate-500 font-medium mb-8 truncate w-full">
                                        {uni.website ? uni.website.replace(/^https?:\/\/(www\.)?/, "") : "No website available"}
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="grid grid-cols-2 gap-3 w-full mt-auto">
                                        <Link href={`/university/${uni.slug || uni._id}`} className="w-full">
                                            <Button
                                                variant="outline"
                                                className="w-full rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 h-11 text-xs font-bold"
                                            >
                                                Know More
                                            </Button>
                                        </Link>
                                        <Link href={`/contact?service=${encodeURIComponent("Domestic Education")}&university=${encodeURIComponent(uni.universityName)}&country=${encodeURIComponent(uni.country || "India")}&sourcePage=${encodeURIComponent(`University Listing - ${uni.universityName}`)}`} className="w-full">
                                            <Button
                                                className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 h-11 text-xs font-bold"
                                            >
                                                Apply Now
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Programs Section */}
            <section className="py-16 lg:py-24 bg-secondary/30">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Programs We Support</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            "Bachelor of Commerce (B.Com)",
                            "Bachelor of Science (B.Sc)",
                            "Bachelor of Business Administration (BBA)",
                            "Engineering Programs",
                            "Allied Health Sciences",
                            "Pharmacy",
                            "Professional Certifications",
                            "Postgraduate Programs (M.Tech, M.Sc, MBA, etc.)"
                        ].map((program, index) => (
                            <div
                                key={index}
                                className="flex items-center p-4 rounded-lg bg-background hover:bg-secondary/50 transition-all border border-border hover:border-primary/50"
                            >
                                <CheckCircle className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />
                                <span className="text-foreground">{program}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 lg:py-24">
                <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Begin Your Journey?</h2>
                    <p className="text-xl text-muted-foreground mb-8">
                        Connect with our educational consultants to explore your options and secure admission in your dream college.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={`/contact?service=${encodeURIComponent("Domestic Education")}`}>
                            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg">
                                Schedule Consultation
                            </Button>
                        </Link>
                        <Link href="/services/educational-consultancy/overseas">
                            <Button variant="outline" className="px-8 py-6 text-lg">
                                Explore Overseas Education
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
