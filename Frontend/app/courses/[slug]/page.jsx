"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, GraduationCap, BookOpen, CheckCircle, ArrowRight, User, Mail, Phone, MessageSquare, Briefcase, Award, ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CourseDetailsPage() {
    const params = useParams();
    const [course, setCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeSection, setActiveSection] = useState("overview");
    const [expandedIndex, setExpandedIndex] = useState(0);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    useEffect(() => {
        if (params.slug) {
            const fetchCourse = async () => {
                try {
                    setIsLoading(true);
                    const response = await fetch(`/api/courses/${params.slug}`);
                    const result = await response.json();

                    if (result.success) {
                        setCourse(result.data);
                    } else {
                        setError("Course not found");
                    }
                } catch (err) {
                    console.error("Error fetching course:", err);
                    setError("Error loading course details");
                } finally {
                    setIsLoading(false);
                }
            };
            fetchCourse();
        }
    }, [params.slug]);

    useEffect(() => {
        if (!isLoading && course) {
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

            const sectionIds = ["overview", "specializations", "requirements", "subjects", "opportunities"];
            sectionIds.forEach(id => {
                const el = document.getElementById(id);
                if (el) observer.observe(el);
            });

            return () => observer.disconnect();
        }
    }, [isLoading, course]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: `Course Enquiry: ${course?.title || ""}. Mobile: ${formData.phone}. User message: ${formData.message}`
                })
            });
            const result = await response.json();
            if (result.success) {
                setSubmitSuccess(true);
                setFormData({ name: "", email: "", phone: "", message: "" });
            } else {
                alert("Thank you! Our counselor will get in touch with you shortly.");
                setSubmitSuccess(true);
            }
        } catch (error) {
            console.error("Error submitting contact:", error);
            setSubmitSuccess(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-500 font-medium">Loading course details...</p>
                </div>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center max-w-md px-6">
                    <div className="text-6xl mb-4">📚</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h2>
                    <p className="text-gray-600 mb-6 font-medium">We couldn't find the course you're looking for. It might have been moved or deleted.</p>
                    <Link href="/" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    // Dynamically build secondary nav items based on course content
    const navItems = [
        { id: "overview", label: "Overview" },
    ];
    if (course.subCourses && course.subCourses.length > 0) {
        navItems.push({ id: "specializations", label: "Specializations" });
    }
    if (course.requirements) {
        navItems.push({ id: "requirements", label: "Requirements" });
    }
    if (course.subjects && course.subjects.length > 0) {
        navItems.push({ id: "subjects", label: "Curriculum" });
    }
    if (course.opportunities) {
        navItems.push({ id: "opportunities", label: "Careers" });
    }

    return (
        <main className="min-h-screen bg-gray-50">
            <Header />

            <div className="pt-[140px] pb-20">
                {/* Course Secondary Navbar */}
                <div className="sticky top-[116px] z-40 bg-white border-b shadow-md overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between h-16">
                            {/* Navigation Links with Horizontal Scroll on Mobile */}
                            <div className="relative flex-1 overflow-hidden h-full">
                                <div className="flex items-center gap-2 sm:gap-6 overflow-x-auto scrollbar-hide h-full items-stretch">
                                    {navItems.map((item) => (
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
                                                    layoutId="activeCourseTabIndicator"
                                                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-600 rounded-t-full"
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Enquire Now Link/Button */}
                            <div className="hidden md:flex items-center ml-8">
                                <button
                                    onClick={() => {
                                        const formEl = document.querySelector("form");
                                        if (formEl) {
                                            formEl.scrollIntoView({ behavior: "smooth", block: "center" });
                                        }
                                    }}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5"
                                >
                                    Enquire Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="relative h-[250px] sm:h-[350px] w-full overflow-hidden">
                    <img
                        src={course.img || "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80"}
                        alt={course.title}
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80";
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
                    <div className="absolute inset-0 flex items-end">
                        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
                            <div className="max-w-3xl">
                                <div className="flex flex-wrap gap-2 mb-3">
                                    <Badge className="bg-blue-600 hover:bg-blue-700 text-xs font-semibold uppercase tracking-wider py-1 px-3">
                                        {course.level || "Undergraduate"}
                                    </Badge>
                                    <Badge variant="outline" className="text-white border-white bg-white/10 text-xs font-semibold py-1 px-3">
                                        <Clock className="w-3.5 h-3.5 mr-1 text-blue-400" /> {course.duration || "3 Years"}
                                    </Badge>
                                </div>
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
                                    {course.title}
                                </h1>
                                <p className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                                    {course.desc}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course Metadata Cards bar */}
                <div className="bg-white border-b shadow-sm relative z-30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x border-x-0 sm:border-x">
                            <div className="p-4 sm:p-6 text-center sm:text-left flex items-center gap-4 justify-center sm:justify-start">
                                <div className="p-3 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                                    <GraduationCap className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Degree Level</p>
                                    <p className="text-sm font-bold text-gray-900 mt-0.5">{course.level || "Undergraduate"}</p>
                                </div>
                            </div>
                            <div className="p-4 sm:p-6 text-center sm:text-left flex items-center gap-4 justify-center sm:justify-start">
                                <div className="p-3 rounded-xl bg-amber-50 text-amber-600 shrink-0">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Duration</p>
                                    <p className="text-sm font-bold text-gray-900 mt-0.5">{course.duration || "3-4 Years"}</p>
                                </div>
                            </div>
                            <div className="p-4 sm:p-6 text-center sm:text-left flex items-center gap-4 justify-center sm:justify-start">
                                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                                    <DollarSign className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Average Fees</p>
                                    <p className="text-sm font-bold text-gray-900 mt-0.5">{course.fees || "$15,000 / Year"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Course details - Column 1 & 2 */}
                        <div className="lg:col-span-2 space-y-10">
                            {/* Course Overview */}
                            <section id="overview" className="scroll-mt-[200px] bg-white rounded-3xl shadow-sm border p-6 sm:p-8">
                                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3 border-b pb-4 mb-6">
                                    <BookOpen className="w-6 h-6 text-blue-600" />
                                    Course Overview
                                </h2>
                                <p className="text-gray-600 leading-relaxed text-base whitespace-pre-line">
                                    {course.overview || "This course is designed to provide comprehensive theoretical knowledge and practical training to help you develop industry-relevant skills. You will learn to tackle real-world problems and develop strategic skills required for your future career."}
                                </p>
                            </section>

                            {/* Specializations & Sub-courses */}
                            {course.subCourses && course.subCourses.length > 0 && (
                                <section id="specializations" className="scroll-mt-[200px] bg-white rounded-3xl shadow-sm border p-6 sm:p-8">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 mb-6">
                                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                            <Award className="w-6 h-6 text-blue-600" />
                                            Specializations & Pathways
                                        </h2>
                                        <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-semibold py-1 px-3 w-fit">
                                            {course.subCourses.length} Specializations Available
                                        </Badge>
                                    </div>
                                    <div className="space-y-4">
                                        {course.subCourses.map((sub, idx) => {
                                            const isExpanded = expandedIndex === idx;
                                            return (
                                                <div 
                                                    key={idx} 
                                                    className={`border rounded-2xl overflow-hidden transition-all duration-300 shadow-sm
                                                        ${isExpanded 
                                                            ? "border-blue-500 ring-4 ring-blue-500/5 bg-white" 
                                                            : "border-gray-100 hover:border-gray-300 bg-gray-50/50 hover:bg-white"
                                                        }`}
                                                >
                                                    {/* Accordion Header */}
                                                    <button
                                                        onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                                                        className="w-full flex items-center justify-between p-5 text-left outline-none select-none"
                                                    >
                                                        <div className="flex items-center gap-4 flex-1 min-w-0">
                                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-all
                                                                ${isExpanded 
                                                                    ? "bg-blue-600 text-white scale-105 shadow-md shadow-blue-200" 
                                                                    : "bg-blue-50 text-blue-600"
                                                                }`}
                                                            >
                                                                {String(idx + 1).padStart(2, "0")}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <h4 className={`text-lg font-bold transition-colors truncate
                                                                    ${isExpanded ? "text-blue-600" : "text-gray-900"}`}
                                                                >
                                                                    {sub.name}
                                                                </h4>
                                                                {!isExpanded && (
                                                                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                                                                        <span className="flex items-center gap-1">
                                                                            <Clock className="w-3.5 h-3.5" /> {sub.duration || "N/A"}
                                                                        </span>
                                                                        <span className="flex items-center gap-1">
                                                                            <DollarSign className="w-3.5 h-3.5" /> {sub.fees || "N/A"}
                                                                        </span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className={`p-1.5 rounded-lg border transition-all shrink-0 ml-4
                                                            ${isExpanded 
                                                                ? "border-blue-200 bg-blue-50 text-blue-600 rotate-180" 
                                                                : "border-gray-200 bg-white text-gray-400"
                                                            }`}
                                                        >
                                                            <ChevronDown className="w-4 h-4" />
                                                        </div>
                                                    </button>

                                                    {/* Accordion Content with framer-motion */}
                                                    <AnimatePresence initial={false}>
                                                        {isExpanded && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: "auto", opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                                                className="overflow-hidden"
                                                            >
                                                                <div className="p-5 border-t bg-white space-y-5">
                                                                    {/* Key Stats Grid */}
                                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
                                                                        <div className="flex items-center gap-3">
                                                                            <div className="p-2 rounded-lg bg-amber-50 text-amber-600 shrink-0">
                                                                                <Clock className="w-4 h-4" />
                                                                            </div>
                                                                            <div>
                                                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Duration</p>
                                                                                <p className="text-sm font-semibold text-gray-800">{sub.duration || "N/A"}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex items-center gap-3">
                                                                            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                                                                                <DollarSign className="w-4 h-4" />
                                                                            </div>
                                                                            <div>
                                                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Tuition Fees</p>
                                                                                <p className="text-sm font-semibold text-emerald-700">{sub.fees || "N/A"}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    {/* Subcourse Overview */}
                                                                    <div>
                                                                        <h5 className="font-bold text-gray-900 text-sm mb-1.5 flex items-center gap-1.5">
                                                                            <BookOpen className="w-4 h-4 text-blue-500" /> Focus & Curriculum Overview
                                                                        </h5>
                                                                        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{sub.overview}</p>
                                                                    </div>

                                                                    {/* Career Outcomes */}
                                                                    {sub.careerOutcomes && (
                                                                        <div className="pt-2">
                                                                            <h5 className="font-bold text-gray-900 text-sm mb-2.5 flex items-center gap-1.5">
                                                                                <Briefcase className="w-4 h-4 text-pink-500" /> Career Outcomes & Key Roles
                                                                            </h5>
                                                                            <div className="flex flex-wrap gap-2">
                                                                                {sub.careerOutcomes.split(",").map((outcome, oIdx) => (
                                                                                    <div key={oIdx} className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-50 text-pink-700 border border-pink-100 rounded-full text-xs font-semibold">
                                                                                        <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                                                                                        <span>{outcome.trim()}</span>
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    )}

                                                                    {/* Accordion Action Button */}
                                                                    <div className="flex justify-end pt-3 border-t">
                                                                        <Button
                                                                            onClick={() => {
                                                                                setFormData(prev => ({
                                                                                    ...prev,
                                                                                    message: `I would like to enquire about the ${sub.name} specialization under ${course.title}.`
                                                                                }));
                                                                                const formEl = document.querySelector("form");
                                                                                if (formEl) {
                                                                                    formEl.scrollIntoView({ behavior: "smooth", block: "center" });
                                                                                }
                                                                            }}
                                                                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-blue-200 transition-all hover:-translate-y-0.5"
                                                                        >
                                                                            Enquire For This Path
                                                                            <ArrowRight className="w-3 h-3" />
                                                                        </Button>
                                                                    </div>
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </section>
                            )}

                            {/* Prerequisites */}
                            {course.requirements && (
                                <section id="requirements" className="scroll-mt-[200px] bg-white rounded-3xl shadow-sm border p-6 sm:p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3 border-b pb-4 mb-6">
                                        <GraduationCap className="w-6 h-6 text-amber-500" />
                                        Eligibility & Admission Requirements
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed text-base whitespace-pre-line">
                                        {course.requirements}
                                    </p>
                                </section>
                            )}

                            {/* Subjects Covered */}
                            {course.subjects && course.subjects.length > 0 && (
                                <section id="subjects" className="scroll-mt-[200px] bg-white rounded-3xl shadow-sm border p-6 sm:p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3 border-b pb-4 mb-6">
                                        <BookOpen className="w-6 h-6 text-emerald-600" />
                                        Key Subjects Covered
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {course.subjects.map((subject, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-xl border border-gray-100 hover:bg-emerald-50/20 hover:border-emerald-100 transition-colors">
                                                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                                                <span className="text-sm font-semibold text-gray-800">{subject}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Placement / Opportunities */}
                            {course.opportunities && (
                                <section id="opportunities" className="scroll-mt-[200px] bg-white rounded-3xl shadow-sm border p-6 sm:p-8">
                                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3 border-b pb-4 mb-6">
                                        <Briefcase className="w-6 h-6 text-purple-600" />
                                        Career & Placement Opportunities
                                    </h2>
                                    <p className="text-gray-600 leading-relaxed text-base whitespace-pre-line">
                                        {course.opportunities}
                                    </p>
                                </section>
                            )}
                        </div>

                        {/* Counselor contact form - Column 3 */}
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl shadow-xl p-6 sm:p-8 border border-white/10 relative overflow-hidden sticky top-[190px]">
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold mb-1">Interested in this course?</h3>
                                    <p className="text-blue-200 text-sm mb-6">Get free counseling and find the best universities matching your profile.</p>

                                    {submitSuccess ? (
                                        <div className="text-center py-8 px-4 bg-white/10 backdrop-blur rounded-2xl border border-blue-500/30">
                                            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <CheckCircle className="w-6 h-6 text-white" />
                                            </div>
                                            <h4 className="text-lg font-bold text-white mb-2">Request Submitted!</h4>
                                            <p className="text-blue-100 text-sm">Thank you. An expert academic advisor will call you shortly to assist with university shortlisting and admissions.</p>
                                            <Button
                                                onClick={() => setSubmitSuccess(false)}
                                                className="mt-6 bg-white text-blue-900 hover:bg-blue-50 font-bold"
                                            >
                                                Submit Another Inquiry
                                            </Button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleFormSubmit} className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-semibold uppercase tracking-wider text-blue-200 block">Full Name</label>
                                                <div className="relative">
                                                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                                        <User className="w-4 h-4" />
                                                    </span>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-white/10 focus:bg-white text-white focus:text-gray-950 border border-white/20 focus:border-white rounded-xl py-3 pl-10 pr-4 text-sm font-medium outline-none transition-all placeholder-white/50 focus:placeholder-gray-400"
                                                        placeholder="Your Name"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-semibold uppercase tracking-wider text-blue-200 block">Email Address</label>
                                                <div className="relative">
                                                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                                        <Mail className="w-4 h-4" />
                                                    </span>
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-white/10 focus:bg-white text-white focus:text-gray-950 border border-white/20 focus:border-white rounded-xl py-3 pl-10 pr-4 text-sm font-medium outline-none transition-all placeholder-white/50 focus:placeholder-gray-400"
                                                        placeholder="name@example.com"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-semibold uppercase tracking-wider text-blue-200 block">Phone Number</label>
                                                <div className="relative">
                                                    <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                                        <Phone className="w-4 h-4" />
                                                    </span>
                                                    <input
                                                        type="tel"
                                                        name="phone"
                                                        value={formData.phone}
                                                        onChange={handleInputChange}
                                                        className="w-full bg-white/10 focus:bg-white text-white focus:text-gray-950 border border-white/20 focus:border-white rounded-xl py-3 pl-10 pr-4 text-sm font-medium outline-none transition-all placeholder-white/50 focus:placeholder-gray-400"
                                                        placeholder="Your Mobile Number"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-semibold uppercase tracking-wider text-blue-200 block">Additional Questions</label>
                                                <div className="relative">
                                                    <span className="absolute top-3 left-0 pl-3.5 flex items-start pointer-events-none text-gray-400">
                                                        <MessageSquare className="w-4 h-4" />
                                                    </span>
                                                    <textarea
                                                        name="message"
                                                        value={formData.message}
                                                        onChange={handleInputChange}
                                                        rows={2}
                                                        className="w-full bg-white/10 focus:bg-white text-white focus:text-gray-950 border border-white/20 focus:border-white rounded-xl py-2.5 pl-10 pr-4 text-sm font-medium outline-none transition-all placeholder-white/50 focus:placeholder-gray-400"
                                                        placeholder="Any specific questions?"
                                                    />
                                                </div>
                                            </div>

                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full mt-4 bg-pink-500 hover:bg-pink-600 text-white font-bold h-12 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20"
                                            >
                                                {isSubmitting ? "Submitting..." : "Get Free Guidance"}
                                                <ArrowRight className="w-4 h-4" />
                                            </Button>
                                        </form>
                                    )}
                                </div>
                                <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/10 rounded-full -mr-20 -mt-20 blur-2xl pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
