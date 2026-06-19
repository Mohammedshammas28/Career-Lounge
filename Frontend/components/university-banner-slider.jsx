"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Calendar, BookOpen, Tag, Award, Globe, Users, Shield, ArrowRight, Play } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function PremiumOfferSlider() {
    const [banners, setBanners] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const [direction, setDirection] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("/api/banners");
                const result = await response.json();

                if (result.success) {
                    const activeBanners = result.data.filter((b) => b.active);
                    setBanners(activeBanners);
                } else {
                    setError("Failed to fetch banners");
                }
            } catch (err) {
                console.error("Error fetching banners:", err);
                setError("Error loading banners");
            } finally {
                setIsLoading(false);
            }
        };

        fetchBanners();
    }, []);

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, [banners.length]);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    }, [banners.length]);

    useEffect(() => {
        if (!isAutoPlay || banners.length <= 1) return;

        const timer = setInterval(() => {
            nextSlide();
        }, 3000); // Increased speed to 3s

        return () => clearInterval(timer);
    }, [isAutoPlay, banners.length, nextSlide]);

    const handlePrevious = () => {
        prevSlide();
        setIsAutoPlay(false);
        setTimeout(() => setIsAutoPlay(true), 15000);
    };

    const handleNext = () => {
        nextSlide();
        setIsAutoPlay(false);
        setTimeout(() => setIsAutoPlay(true), 15000);
    };

    const handleGoToSlide = (index) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
        setIsAutoPlay(false);
        setTimeout(() => setIsAutoPlay(true), 15000);
    };

    const handleApplyNow = (banner) => {
        if (banner.university?.slug) {
            router.push(`/university/${banner.university.slug}`);
        }
    };

    const handleConsultation = () => {
        router.push("/contact?service=Overseas Education");
    };

    if (isLoading) {
        return (
            <div className="w-full min-h-[380px] bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-300">Loading offers...</p>
                </div>
            </div>
        );
    }

    if (error || banners.length === 0) {
        return (
            <div className="w-full min-h-[380px] bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 rounded-2xl flex items-center justify-center">
                <p className="text-gray-400">{error || "No offers available"}</p>
            </div>
        );
    }

    const currentBanner = banners[currentIndex];
    const uni = currentBanner.university;
    const latestIntake = uni?.intakes?.[0];
    const intakeDate = latestIntake?.intakeName || "Coming Soon";
    const topCourses = uni?.courses?.slice(0, 4) || [];

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    return (
        <div className="relative w-full min-h-[380px] lg:h-[420px] rounded-2xl overflow-hidden group">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 32 },
                        opacity: { duration: 0.2 }
                    }}
                    className="absolute inset-0"
                >
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-blue-950 to-purple-950" />

                    {/* Main Grid Layout */}
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 h-full">
                        {/* LEFT SIDE - Details */}
                        <div className="p-6 lg:p-10 text-white flex flex-col justify-center">
                            {/* Top Section */}
                            <div className="space-y-4">
                                {/* Featured Badge */}
                                <Badge className="w-fit bg-purple-600/40 text-purple-200 border-purple-400/50 backdrop-blur px-3 py-1 text-[10px] font-bold tracking-wider">
                                    <span className="mr-2">🎓</span> FEATURED UNIVERSITY
                                </Badge>

                                {/* Headline */}
                                <div>
                                    <h1 className="text-2xl lg:text-3xl xl:text-4xl font-extrabold leading-tight">
                                        Study at Top Ranked{" "}
                                        <span className="bg-gradient-to-r from-purple-300 via-pink-400 to-purple-300 bg-clip-text text-transparent">
                                            University
                                        </span>{" "}
                                        Abroad
                                    </h1>
                                </div>

                                {/* Subtitle */}
                                <p className="text-sm text-gray-300 leading-relaxed max-w-lg">
                                    Unlock global opportunities with world-class education, industry-focused courses and exclusive scholarship offers.
                                </p>
                            </div>

                            {/* Middle Section - Features */}
                            <div className="grid grid-cols-3 gap-6 py-6 max-w-lg">
                                {/* Intake */}
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Calendar className="w-4 h-4 text-purple-400" />
                                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Intake</p>
                                    </div>
                                    <p className="text-sm font-bold text-white">{intakeDate}</p>
                                </div>

                                {/* Popular Courses */}
                                <div className="space-y-1 border-l border-white/10 pl-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        <BookOpen className="w-4 h-4 text-purple-400" />
                                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Courses</p>
                                    </div>
                                    <p className="text-sm font-bold text-white truncate">Top Programs</p>
                                </div>

                                {/* Exclusive Offer */}
                                <div className="space-y-1 border-l border-white/10 pl-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Tag className="w-4 h-4 text-purple-400" />
                                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Offer</p>
                                    </div>
                                    {currentBanner.offerPercentage && (
                                        <p className="text-sm font-bold text-pink-400">{currentBanner.offerPercentage}</p>
                                    )}
                                </div>
                            </div>

                            {/* Bottom Section - Buttons */}
                            <div className="flex flex-wrap gap-4 mt-2">
                                <Button
                                    onClick={() => handleApplyNow(currentBanner)}
                                    className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold px-6 py-5 rounded-full text-sm flex items-center gap-2 shadow-lg shadow-pink-500/20 transform transition-transform hover:scale-105"
                                >
                                    Apply Now
                                    <ArrowRight className="w-4 h-4" />
                                </Button>

                                <Button
                                    onClick={handleConsultation}
                                    className="bg-white/5 hover:bg-white/10 text-white font-semibold px-6 py-5 rounded-full text-sm border border-white/10 backdrop-blur flex items-center gap-2"
                                >
                                    <Play className="w-4 h-4 fill-current" />
                                    Book Expert
                                </Button>
                            </div>
                        </div>

                        {/* RIGHT SIDE - Image & Offer Card */}
                        <div className="relative h-full overflow-hidden hidden lg:block">
                            {/* University Image */}
                            {(currentBanner.customBannerImage || uni?.bannerImage) && (
                                <>
                                    <Image
                                        src={currentBanner.customBannerImage || uni?.bannerImage}
                                        alt={uni?.universityName || currentBanner.offerText || "University Banner"}
                                        fill
                                        className="object-cover"
                                    />
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-purple-950/80" />
                                    <div className="absolute inset-0 bg-black/10" />
                                </>
                            )}

                            {/* University Logo */}
                            {uni?.logo && (
                                <div className="absolute top-6 right-6 z-20 bg-white/95 backdrop-blur rounded-xl p-3 shadow-xl border border-white/20">
                                    <Image
                                        src={uni.logo}
                                        alt={uni.universityName || "University Logo"}
                                        width={60}
                                        height={60}
                                        className="object-contain"
                                    />
                                </div>
                            )}

                            {/* Premium Offer Card */}
                            <div className="absolute bottom-6 right-6 left-6 lg:left-12 z-20 bg-gradient-to-br from-purple-600/90 to-pink-600/90 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xl">🔥</span>
                                    <Badge className="bg-white/20 text-white border-white/30 text-[10px] font-bold px-2 py-0.5">
                                        LIMITED TIME OFFER
                                    </Badge>
                                </div>

                                <div className="flex items-end justify-between gap-4">
                                    <div>
                                        {currentBanner.offerPercentage && (
                                            <p className="text-4xl lg:text-5xl font-black text-white leading-none">
                                                {currentBanner.offerPercentage}
                                            </p>
                                        )}
                                        <p className="text-xs text-purple-100 mt-2 font-medium">
                                            {currentBanner.offerText || "On Total Tuition Fees"}*
                                        </p>
                                    </div>

                                    {currentBanner.deadlineText && (
                                        <div className="bg-black/20 rounded-lg px-4 py-2 border border-white/10">
                                            <p className="text-[10px] text-purple-200 font-bold uppercase tracking-tighter">Deadline</p>
                                            <p className="text-lg font-bold text-white leading-none mt-1">{currentBanner.deadlineText}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Urgency Message */}
                                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                                    <p className="text-[10px] text-white font-medium italic opacity-90">
                                        *Hurry! Applications closing soon.
                                    </p>
                                    <div className="flex gap-1">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="w-1 h-1 rounded-full bg-white/40 animate-pulse" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            {banners.length > 1 && (
                <>
                    <button
                        onClick={handlePrevious}
                        onMouseEnter={() => setIsAutoPlay(false)}
                        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 p-3 rounded-full transition-all duration-300 z-30 opacity-0 group-hover:opacity-100 hover:scale-110"
                        aria-label="Previous offer"
                    >
                        <ChevronLeft className="w-5 h-5 text-white" />
                    </button>

                    <button
                        onClick={handleNext}
                        onMouseEnter={() => setIsAutoPlay(false)}
                        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 p-3 rounded-full transition-all duration-300 z-30 opacity-0 group-hover:opacity-100 hover:scale-110"
                        aria-label="Next offer"
                    >
                        <ChevronRight className="w-5 h-5 text-white" />
                    </button>
                </>
            )}

            {/* Dot Indicators */}
            {banners.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                    {banners.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleGoToSlide(index)}
                            className={`transition-all duration-300 rounded-full backdrop-blur-md border ${index === currentIndex
                                ? "bg-white/60 border-white/80 w-8 h-1.5"
                                : "bg-white/20 border-white/30 w-1.5 h-1.5 hover:bg-white/40"
                                }`}
                            aria-label={`Go to offer ${index + 1}`}
                        />
                    ))}
                </div>
            )}


        </div>
    );
}
