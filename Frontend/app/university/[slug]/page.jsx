"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Globe, MapPin, Award, BookOpen, Calendar, DollarSign, GraduationCap, ChevronRight, CheckCircle2, Building2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { getIntakeStatus } from "@/lib/intake-status";

export default function UniversityDetailsPage() {
    const params = useParams();
    const [university, setUniversity] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeSection, setActiveSection] = useState("overview");
    const [showStickyNav, setShowStickyNav] = useState(false);
    const undergraduateRailRef = useRef(null);
    const postgraduateRailRef = useRef(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        city: "",
        preferredDestination: ""
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to your API
        alert("Thank you! Our counselor will get in touch with you shortly.");
        setFormData({ name: "", email: "", mobile: "", city: "", preferredDestination: "" });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Normalize logos for specific universities
    const getLogo = (uni) => {
        if (!uni) return null;
        // Prioritize the logo from database if available
        if (uni.logo) return uni.logo;

        const name = uni.universityName.toLowerCase();
        if (name.includes("melbourne")) return "/melbourne-logo.jpg";
        if (name.includes("arizona state") || name.includes("asu")) return "/logos/asu.png";
        if (name.includes("birmingham")) return "/logos/birmingham.png";
        return uni.image;
    };

    const scrollCourseRail = (railRef, direction) => {
        const rail = railRef.current;
        if (!rail) return;

        const scrollAmount = Math.max(rail.clientWidth * 0.7, 280);
        rail.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    const getDisplayedIntakes = () => {
        if (Array.isArray(university?.intakes) && university.intakes.length > 0) {
            return university.intakes.map((intake) => ({
                name: intake.intakeName || intake.name || "Intake",
                status: getIntakeStatus(intake),
            }));
        }

        return [
            {
                name: "Fall Intake (August)",
                status: getIntakeStatus({ intakeName: "Fall Intake (August)" }),
            },
            {
                name: "Spring Intake (January)",
                status: getIntakeStatus({ intakeName: "Spring Intake (January)" }),
            },
        ];
    };

    useEffect(() => {
        const handleScroll = () => {
            setShowStickyNav(window.scrollY > 400);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (!isLoading && university) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setActiveSection(entry.target.id);
                        }
                    });
                },
                {
                    rootMargin: "-25% 0px -25% 0px",
                    threshold: 0
                }
            );

            const sectionIds = ["overview", "ranking", "intakes", "courses", "cost", "scholarships", "admission"];
            sectionIds.forEach(id => {
                const el = document.getElementById(id);
                if (el) observer.observe(el);
            });

            return () => observer.disconnect();
        }
    }, [isLoading, university]);

    useEffect(() => {
        if (params.slug) {
            const fetchUniversity = async () => {
                try {
                    setIsLoading(true);
                    const response = await fetch(`/api/universities/${params.slug}`);
                    const result = await response.json();

                    if (result.success) {
                        setUniversity(result.data);
                    } else {
                        setError("University not found");
                    }
                } catch (err) {
                    console.error("Error fetching university:", err);
                    setError("Error loading university details");
                } finally {
                    setIsLoading(false);
                }
            };
            fetchUniversity();
        }
    }, [params.slug]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Loading university details...</p>
                </div>
            </div>
        );
    }

    if (error || !university) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center max-w-md px-6">
                    <div className="text-6xl mb-4">🏫</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">University Not Found</h2>
                    <p className="text-gray-600 mb-6">We couldn't find the university you're looking for. It might have been moved or renamed.</p>
                    <Link href="/universities" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        Back to Universities
                    </Link>
                </div>
            </div>
        );
    }

    const allCourses = Array.isArray(university.courses) ? university.courses : [];
    const undergradCourses = allCourses.filter((course) => {
        const level = (course?.level || "").toLowerCase();
        return level.includes("under");
    });
    const postgradCourses = allCourses.filter((course) => {
        const level = (course?.level || "").toLowerCase();
        return level.includes("post") || level.includes("master") || level.includes("mba") || level.includes("doctor") || level.includes("phd");
    });

    return (
        <main className="min-h-screen bg-gray-50">
            <Header />

            <div className="pt-[140px] pb-20">
                {/* University Secondary Navbar */}
                <div className="sticky top-[116px] z-40 bg-white border-b shadow-md overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            {/* Navigation Links with Horizontal Scroll on Mobile */}
                            <div className="relative flex-1 overflow-hidden h-full">
                                <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto scrollbar-hide h-full items-stretch">
                                    {[
                                        { id: "overview", label: "Overview" },
                                        { id: "ranking", label: "Ranking" },
                                        { id: "intakes", label: "Intakes" },
                                        { id: "courses", label: "Courses" },
                                        { id: "cost", label: "Cost" },
                                        { id: "scholarships", label: "Scholarships" },
                                        { id: "admission", label: "Admissions" },
                                    ].map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => {
                                                const el = document.getElementById(item.id);
                                                if (el) {
                                                    const headerHeight = 116;
                                                    const navHeight = 64;
                                                    const offset = headerHeight + navHeight + 20;
                                                    const bodyRect = document.body.getBoundingClientRect().top;
                                                    const elementRect = el.getBoundingClientRect().top;
                                                    const elementPosition = elementRect - bodyRect;
                                                    const offsetPosition = elementPosition - offset;

                                                    window.scrollTo({
                                                        top: offsetPosition,
                                                        behavior: "smooth",
                                                    });
                                                }
                                            }}
                                            className={`relative flex items-center px-4 text-sm font-bold transition-all whitespace-nowrap h-full outline-none
                                                ${activeSection === item.id
                                                    ? "text-blue-600"
                                                    : "text-gray-500 hover:text-gray-900"
                                                }`}
                                        >
                                            {item.label}
                                            {activeSection === item.id && (
                                                <motion.div
                                                    layoutId="activeTabIndicator"
                                                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-600 rounded-t-full"
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile Apply Button (Call to Action) */}
                            <div className="hidden md:flex items-center ml-8">
                                <Link
                                    href="/contact"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5"
                                >
                                    Apply Now
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="relative h-[300px] sm:h-[380px] w-full overflow-hidden">
                    {university.bannerImage ? (
                        <Image
                            src={university.bannerImage}
                            alt={university.universityName}
                            fill
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div className="absolute inset-0 bg-blue-900" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute inset-0 flex items-end">
                        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
                            <div className="flex flex-col md:flex-row items-center md:items-end gap-4 sm:gap-6">
                                <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-white rounded-xl shadow-2xl p-3 sm:p-4 flex items-center justify-center border-4 border-white shrink-0">
                                    {getLogo(university) ? (
                                        <Image
                                            src={getLogo(university)}
                                            alt={university.universityName}
                                            width={120}
                                            height={120}
                                            className="object-contain"
                                        />
                                    ) : (
                                        <Building2 className="w-12 h-12 sm:w-16 h-16 text-blue-600" />
                                    )}
                                </div>
                                <div className="text-center md:text-left flex-1 min-w-0">
                                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-2 sm:mb-3">
                                        <Badge className="bg-blue-600 hover:bg-blue-700 text-[10px] sm:text-xs">{university.country}</Badge>
                                        {university.ranking && (
                                            <Badge variant="outline" className="text-white border-white bg-white/10 text-[10px] sm:text-xs">
                                                <Award className="w-3 h-3 mr-1" /> {university.ranking}
                                            </Badge>
                                        )}
                                    </div>
                                    <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-2 sm:mb-4 tracking-tight truncate">
                                        {university.universityName}
                                    </h1>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-6 text-gray-200 text-xs sm:text-sm">
                                        <span className="flex items-center gap-1.5 sm:gap-2">
                                            <MapPin className="w-4 h-4 text-blue-400" />
                                            {university.city}, {university.country}
                                        </span>
                                        {university.website && (
                                            <a
                                                href={university.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1.5 sm:gap-2 hover:text-white transition-colors"
                                            >
                                                <Globe className="w-4 h-4 text-blue-400" />
                                                Website
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Sections */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Details */}
                        <div className="lg:col-span-2 space-y-8 sm:space-y-12 pb-24">
                            {/* Overview Section */}
                            <section id="overview" className="scroll-mt-[180px] space-y-6 sm:space-y-8">
                                <div className="bg-white rounded-2xl shadow-sm border p-6 sm:p-8">
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 font-serif">University Overview</h3>
                                    <p className="text-gray-600 leading-relaxed text-base sm:text-lg whitespace-pre-line">
                                        {university.overview}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                                    <div className="bg-blue-50/50 rounded-2xl p-5 sm:p-6 border border-blue-100">
                                        <h4 className="font-bold text-blue-900 mb-3 sm:mb-4 flex items-center gap-2">
                                            <Building2 className="w-5 h-5 text-blue-600" /> University Type
                                        </h4>
                                        <p className="text-blue-800 font-medium text-sm sm:text-base">{university.universityType || 'Public Research University'}</p>
                                    </div>
                                    <div className="bg-orange-50/50 rounded-2xl p-5 sm:p-6 border border-orange-100">
                                        <h4 className="font-bold text-orange-900 mb-3 sm:mb-4 flex items-center gap-2">
                                            <MapPin className="w-5 h-5 text-orange-600" /> Main Campus
                                        </h4>
                                        <p className="text-orange-800 font-medium text-sm sm:text-base">{university.city}, {university.country}</p>
                                    </div>
                                </div>
                            </section>

                            {/* Ranking Section */}
                            <section id="ranking" className="scroll-mt-[180px]">
                                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-4">
                                    <div className="p-3 bg-blue-100 rounded-2xl">
                                        <Award className="w-8 h-8 text-blue-600" />
                                    </div>
                                    Ranking
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                                    {[
                                        { label: "QSWR", value: `#${university.ranking || '500'}`, icon: "/icons/qs.png" },
                                        { label: "Times Higher Education", value: "301 - 350", icon: "/icons/the.png" },
                                        { label: "U.S. News & World Report", value: "#70", icon: "/icons/usnews.png" }
                                    ].map((rank, i) => (
                                        <div key={i} className="h-[250px] sm:h-[280px] p-6 sm:p-8 bg-white rounded-3xl border-2 border-blue-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center text-center group hover:border-blue-600 transition-all">
                                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                                                <Award className="w-8 h-8 text-blue-600" />
                                            </div>
                                            <span className="text-3xl font-normal text-black mb-2">{rank.value}</span>
                                            <span className="text-sm font-normal text-black uppercase tracking-tight leading-snug">{rank.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Intakes Section */}
                            <section id="intakes" className="scroll-mt-[180px] bg-white rounded-3xl shadow-sm border p-8 sm:p-10">
                                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-4">
                                    <div className="p-3 bg-blue-100 rounded-2xl">
                                        <Calendar className="w-8 h-8 text-blue-600" />
                                    </div>
                                    Intakes
                                </h3>
                                <p className="text-gray-600 mb-8 leading-relaxed max-w-2xl">
                                    Applications are typically accepted twice a year. We recommend starting your application process at least 6 months in advance.
                                </p>

                                <div className="space-y-4">
                                    {getDisplayedIntakes().map((intake, i) => (
                                        <div key={i} className="group p-5 sm:p-6 bg-gray-50 rounded-2xl border border-transparent hover:border-blue-200 hover:bg-white transition-all flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-4 min-w-0">
                                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center group-hover:bg-blue-50 shrink-0">
                                                    <Calendar className="w-6 h-6 text-blue-600" />
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className="font-bold text-gray-900 text-base sm:text-lg truncate">{intake.name}</h4>
                                                    <p className={`text-sm font-semibold ${intake.status === "Closed" ? "text-slate-400" : "text-blue-600"}`}>
                                                        {intake.status}
                                                    </p>
                                                </div>
                                            </div>
                                            <span className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-semibold border ${intake.status === "Closed" ? "border-slate-200 bg-slate-50 text-slate-500" : "border-blue-200 bg-blue-50 text-blue-700"}`}>
                                                {intake.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Courses Section */}
                            <section id="courses" className="scroll-mt-[180px] bg-white rounded-3xl shadow-sm border p-8 sm:p-10">
                                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-4">
                                    <div className="p-3 bg-indigo-100 rounded-2xl">
                                        <BookOpen className="w-8 h-8 text-indigo-600" />
                                    </div>
                                    Programs & Courses
                                </h3>
                                <p className="text-gray-600 mb-8 leading-relaxed max-w-2xl">
                                    Explore a wide range of undergraduate and postgraduate programs designed to prepare you for global career success.
                                </p>

                                <div className="space-y-10">
                                    {allCourses.length > 0 ? (
                                        <>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between gap-4">
                                                    <h4 className="text-base sm:text-lg font-semibold text-indigo-700">Undergraduate Courses</h4>
                                                    {undergradCourses.length > 2 && (
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                type="button"
                                                                aria-label="Scroll undergraduate courses left"
                                                                onClick={() => scrollCourseRail(undergraduateRailRef, "left")}
                                                                className="h-9 w-9 rounded-full border border-indigo-200 bg-white text-indigo-700 shadow-sm hover:bg-indigo-50 transition-colors"
                                                            >
                                                                <ChevronRight className="h-4 w-4 rotate-180 mx-auto" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                aria-label="Scroll undergraduate courses right"
                                                                onClick={() => scrollCourseRail(undergraduateRailRef, "right")}
                                                                className="h-9 w-9 rounded-full border border-indigo-200 bg-white text-indigo-700 shadow-sm hover:bg-indigo-50 transition-colors"
                                                            >
                                                                <ChevronRight className="h-4 w-4 mx-auto" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                                <div ref={undergraduateRailRef} className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2">
                                                    {undergradCourses.length > 0 ? (
                                                        undergradCourses.map((course, idx) => (
                                                            <div key={`ug-${idx}`} className="min-w-[280px] sm:min-w-[320px] p-6 bg-gray-50 rounded-2xl border border-transparent hover:border-indigo-200 hover:bg-white transition-all group flex-shrink-0">
                                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                                    <div className="flex-1">
                                                                        <h4 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{course.courseName}</h4>
                                                                        <div className="flex flex-wrap gap-4 mt-2">
                                                                            <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                                                                <Award className="w-4 h-4" /> {course.level}
                                                                            </div>
                                                                            <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                                                                <Calendar className="w-4 h-4" /> {course.duration}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-left md:text-right px-6 py-2 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
                                                                        <div className="text-indigo-600 font-semibold text-base">{course.fees}</div>
                                                                        <div className="text-[10px] text-indigo-400 font-semibold uppercase tracking-widest">ANNUAL FEE</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="p-6 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200 w-full">
                                                            <p className="text-gray-400">No undergraduate courses listed.</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between gap-4">
                                                    <h4 className="text-base sm:text-lg font-semibold text-indigo-700">Postgraduate Courses</h4>
                                                    {postgradCourses.length > 2 && (
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                type="button"
                                                                aria-label="Scroll postgraduate courses left"
                                                                onClick={() => scrollCourseRail(postgraduateRailRef, "left")}
                                                                className="h-9 w-9 rounded-full border border-indigo-200 bg-white text-indigo-700 shadow-sm hover:bg-indigo-50 transition-colors"
                                                            >
                                                                <ChevronRight className="h-4 w-4 rotate-180 mx-auto" />
                                                            </button>
                                                            <button
                                                                type="button"
                                                                aria-label="Scroll postgraduate courses right"
                                                                onClick={() => scrollCourseRail(postgraduateRailRef, "right")}
                                                                className="h-9 w-9 rounded-full border border-indigo-200 bg-white text-indigo-700 shadow-sm hover:bg-indigo-50 transition-colors"
                                                            >
                                                                <ChevronRight className="h-4 w-4 mx-auto" />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                                <div ref={postgraduateRailRef} className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2">
                                                    {postgradCourses.length > 0 ? (
                                                        postgradCourses.map((course, idx) => (
                                                            <div key={`pg-${idx}`} className="min-w-[280px] sm:min-w-[320px] p-6 bg-gray-50 rounded-2xl border border-transparent hover:border-indigo-200 hover:bg-white transition-all group flex-shrink-0">
                                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                                    <div className="flex-1">
                                                                        <h4 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{course.courseName}</h4>
                                                                        <div className="flex flex-wrap gap-4 mt-2">
                                                                            <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                                                                <Award className="w-4 h-4" /> {course.level}
                                                                            </div>
                                                                            <div className="flex items-center gap-1.5 text-sm text-gray-500">
                                                                                <Calendar className="w-4 h-4" /> {course.duration}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-left md:text-right px-6 py-2 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
                                                                        <div className="text-indigo-600 font-semibold text-base">{course.fees}</div>
                                                                        <div className="text-[10px] text-indigo-400 font-semibold uppercase tracking-widest">ANNUAL FEE</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="p-6 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200 w-full">
                                                            <p className="text-gray-400">No postgraduate courses listed.</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="p-10 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                                            <p className="text-gray-400 font-medium">Contact our counselors for the latest course catalog and fee structure.</p>
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Cost Section */}
                            <section id="cost" className="scroll-mt-[180px] bg-white rounded-3xl shadow-sm border p-8 sm:p-10">
                                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-4">
                                    <div className="p-3 bg-emerald-100 rounded-2xl">
                                        <DollarSign className="w-8 h-8 text-emerald-600" />
                                    </div>
                                    Study & Living Costs
                                </h3>
                                <p className="text-gray-600 mb-10 leading-relaxed max-w-2xl">
                                    Budgeting is crucial for international education. Here's an estimate of the major expenses you'll encounter.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <h4 className="font-black text-gray-900 flex items-center gap-2 text-sm uppercase tracking-widest text-blue-600">
                                            <span className="w-8 h-px bg-blue-200" /> Average Tuition
                                        </h4>
                                        <div className="space-y-3">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-blue-50/30 transition-colors">
                                                <span className="text-gray-600 font-medium">Undergraduate</span>
                                                <span className="font-normal text-sm sm:text-base leading-snug text-gray-900 text-left sm:text-right break-words">{university.tuitionFees?.undergraduate || '$25k - $45k'}</span>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-blue-50/30 transition-colors">
                                                <span className="text-gray-600 font-medium">Postgraduate</span>
                                                <span className="font-normal text-sm sm:text-base leading-snug text-gray-900 text-left sm:text-right break-words">{university.tuitionFees?.postgraduate || '$30k - $50k'}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <h4 className="font-black text-gray-900 flex items-center gap-2 text-sm uppercase tracking-widest text-blue-600">
                                            <span className="w-8 h-px bg-blue-200" /> Living Estimates
                                        </h4>
                                        <div className="space-y-3">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-blue-50/30 transition-colors">
                                                <span className="text-gray-600 font-medium">Accommodation</span>
                                                <span className="font-normal text-sm sm:text-base leading-snug text-gray-900 text-left sm:text-right break-words">{university.accommodation?.startingPrice || '$250/wk'}</span>
                                            </div>
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-blue-50/30 transition-colors">
                                                <span className="text-gray-600 font-medium">Food & Misc</span>
                                                <span className="font-normal text-sm sm:text-base leading-snug text-gray-900 text-left sm:text-right break-words">$15k - $18k/yr</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Scholarships Section */}
                            <section id="scholarships" className="scroll-mt-[180px] space-y-8">
                                <div className="bg-white rounded-3xl shadow-sm border p-8 sm:p-10">
                                    <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-4">
                                        <div className="p-3 bg-blue-100 rounded-2xl">
                                            <GraduationCap className="w-8 h-8 text-blue-600" />
                                        </div>
                                        Scholarships
                                    </h3>
                                    <p className="text-gray-600 mb-10 leading-relaxed max-w-2xl">
                                        Numerous financial aid opportunities are available for deserving international students based on merit and profile.
                                    </p>

                                    {university.scholarships && university.scholarships.length > 0 ? (
                                        <div className="grid grid-cols-1 gap-6">
                                            {university.scholarships.map((scholarship, idx) => (
                                                <div key={idx} className="bg-gradient-to-br from-blue-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden group">
                                                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                                        <div className="flex-1">
                                                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                                                                <GraduationCap className="w-6 h-6 text-blue-300" />
                                                            </div>
                                                            <h3 className="text-2xl font-black mb-2">{scholarship.title}</h3>
                                                            <p className="text-gray-400 text-lg leading-relaxed mb-6 max-w-xl">
                                                                Exclusively for students entering the {new Date().getFullYear()} intake.
                                                            </p>
                                                            <div className="flex items-center gap-3">
                                                                <div className="px-4 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-200 font-bold text-sm uppercase tracking-wider">
                                                                    Value: {scholarship.amount}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Button className="bg-white text-gray-900 hover:bg-blue-600 hover:text-white font-black px-10 h-14 rounded-2xl transition-all shadow-xl shadow-black/50">
                                                            Apply Now
                                                        </Button>
                                                    </div>
                                                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-blue-500/20 transition-all" />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden group">
                                            <div className="relative z-10">
                                                <h3 className="text-3xl font-black mb-4">General International Scholarship</h3>
                                                <p className="text-blue-100 text-lg leading-relaxed mb-10 max-w-2xl">
                                                    Up to 25% tuition fee reduction available for high-achieving international applicants. Contact us to check your eligibility profile.
                                                </p>
                                                <Button className="bg-white text-blue-900 hover:bg-blue-600 hover:text-white font-black px-12 h-16 rounded-2xl transition-all shadow-2xl">
                                                    Check Eligibility
                                                </Button>
                                            </div>
                                            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Admission Section */}
                            <section id="admission" className="scroll-mt-[180px] bg-white rounded-3xl shadow-sm border p-8 sm:p-10">
                                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-4">
                                    <div className="p-3 bg-blue-100 rounded-2xl">
                                        <CheckCircle2 className="w-8 h-8 text-blue-600" />
                                    </div>
                                    Admissions
                                </h3>
                                <p className="text-gray-600 mb-10 leading-relaxed max-w-2xl">
                                    Ensure you meet the minimum academic and language requirements before submitting your application.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 relative group overflow-hidden">
                                        <h4 className="font-black text-gray-900 mb-6 relative z-10 flex items-center gap-3">
                                            <span className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600"><Globe className="w-5 h-5" /></span>
                                            English Language
                                        </h4>
                                        <div className="space-y-4 relative z-10">
                                            {[
                                                { label: "IELTS Academic", score: university.languageRequirements?.ielts || '6.5 (6.0)' },
                                                { label: "TOEFL iBT", score: university.languageRequirements?.toefl || '79+' },
                                                { label: "PTE Academic", score: university.languageRequirements?.pte || '58+' }
                                            ].map((req, i) => (
                                                <div key={i} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-0">
                                                    <span className="text-gray-500 font-bold text-sm tracking-tight">{req.label}</span>
                                                    <span className="text-gray-900 font-black text-base">{req.score}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-blue-500/10 transition-all pointer-events-none" />
                                    </div>

                                    <div className="p-8 bg-black rounded-3xl border border-gray-800 relative group overflow-hidden flex flex-col justify-center">
                                        <div className="relative z-10">
                                            <h4 className="text-white font-black mb-4 flex items-center gap-2">
                                                <Badge className="bg-blue-600 text-[10px] font-black animate-pulse">FREE SERVICE</Badge>
                                                Visa Support
                                            </h4>
                                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                                Our expert visa team handles everything from GTE documentation to visa filing with a high success rate.
                                            </p>
                                            <div className="flex items-center gap-2 text-white font-black text-sm">
                                                <CheckCircle2 className="w-5 h-5 text-blue-500" /> COMPLETE VISA ASSISTANCE
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full -mr-24 -mb-24 blur-3xl pointer-events-none" />
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Right Column: Sticky Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-[200px] space-y-6">
                                <div className="bg-blue-600 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
                                    <h3 className="text-xl font-bold mb-2 relative z-10">Want to Study in {university.country}?</h3>
                                    <p className="text-blue-100 mb-6 relative z-10 text-sm">Fill in your details and we'll call you back</p>

                                    <form onSubmit={handleFormSubmit} className="space-y-4 relative z-10">
                                        <div>
                                            <label className="text-xs font-bold text-blue-100 uppercase tracking-wider mb-1 block">Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="w-full bg-white rounded-lg px-4 py-3 text-gray-900 border-none focus:ring-2 focus:ring-blue-400 transition-all text-sm"
                                                placeholder="Enter your name"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-blue-100 uppercase tracking-wider mb-1 block">Email *</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full bg-white rounded-lg px-4 py-3 text-gray-900 border-none focus:ring-2 focus:ring-blue-400 transition-all text-sm"
                                                placeholder="Enter your email"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-blue-100 uppercase tracking-wider mb-1 block">Mobile *</label>
                                            <div className="flex gap-2">
                                                <div className="bg-white rounded-lg px-2 flex items-center text-gray-500 text-sm font-bold border-none">
                                                    +91
                                                </div>
                                                <input
                                                    type="tel"
                                                    name="mobile"
                                                    required
                                                    value={formData.mobile}
                                                    onChange={handleInputChange}
                                                    className="w-full bg-white rounded-lg px-4 py-3 text-gray-900 border-none focus:ring-2 focus:ring-blue-400 transition-all text-sm"
                                                    placeholder="Mobile number"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-blue-100 uppercase tracking-wider mb-1 block">Your City *</label>
                                            <input
                                                type="text"
                                                name="city"
                                                required
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="w-full bg-white rounded-lg px-4 py-3 text-gray-900 border-none focus:ring-2 focus:ring-blue-400 transition-all text-sm"
                                                placeholder="Enter your city"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-blue-100 uppercase tracking-wider mb-1 block">Preferred Destination *</label>
                                            <select
                                                name="preferredDestination"
                                                required
                                                value={formData.preferredDestination}
                                                onChange={handleInputChange}
                                                className="w-full bg-white rounded-lg px-4 py-3 text-gray-900 border-none focus:ring-2 focus:ring-blue-400 transition-all text-sm appearance-none"
                                            >
                                                <option value="">Select Destination</option>
                                                <option value="UK">United Kingdom</option>
                                                <option value="USA">USA</option>
                                                <option value="Australia">Australia</option>
                                                <option value="Canada">Canada</option>
                                            </select>
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-lg transition-all shadow-lg hover:shadow-orange-400 flex items-center justify-center gap-2 mt-2"
                                        >
                                            Consult Now <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </form>

                                    {/* Decorative circles */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-400/20 rounded-full -ml-12 -mb-12 blur-2xl" />
                                </div>

                                <div className="bg-white rounded-2xl border p-6 shadow-sm">
                                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-green-500" /> Why Apply with Us?
                                    </h4>
                                    <ul className="space-y-3 text-sm text-gray-600">
                                        <li className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                                            Expert guidance from certified counselors
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                                            100% assistance with documentation
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                                            Direct communication with university
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </main>
    );
}
