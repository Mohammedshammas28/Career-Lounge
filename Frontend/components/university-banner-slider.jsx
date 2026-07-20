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
            <div className="w-full min-h-[240px] lg:h-[280px] bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 rounded-none flex items-center justify-center">
                <div className="text-center">
                    <div className="w-10 h-10 border-4 border-purple-400/30 border-t-purple-400 rounded-none animate-spin mx-auto mb-3" />
                    <p className="text-xs text-gray-300">Loading offers...</p>
                </div>
            </div>
        );
    }

    if (error || banners.length === 0) {
        return (
            <div className="w-full min-h-[240px] lg:h-[280px] bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 rounded-none flex items-center justify-center">
                <p className="text-xs text-gray-400">{error || "No offers available"}</p>
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
        <div className="relative w-full min-h-[280px] lg:h-[350px] rounded-none overflow-hidden group">
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
                        <div className="p-4 pl-8 sm:pl-12 lg:p-5 lg:pl-14 text-white flex flex-col justify-center">
                            {/* Top Section */}
                            <div className="space-y-1.5">
                                {/* Featured Badge */}
                                <Badge className="w-fit bg-purple-600/40 text-purple-200 border-purple-400/50 backdrop-blur px-2.5 py-0.5 text-[9px] font-bold tracking-wider rounded-none">
                                    <span className="mr-1.5">🎓</span> FEATURED UNIVERSITY
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
                                <p className="text-sm text-gray-200 leading-relaxed max-w-xl hidden sm:block">
                                    Unlock global opportunities with world-class education, industry-focused courses and exclusive scholarship offers.
                                </p>
                            </div>

                            {/* Middle Section - Features */}
                            <div className="grid grid-cols-3 gap-4 py-3 max-w-lg">
                                {/* Intake */}
                                <div className="space-y-0.5">
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                        <Calendar className="w-3.5 h-3.5 text-purple-400" />
                                        <p className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">Intake</p>
                                    </div>
                                    <p className="text-xs font-bold text-white">{intakeDate}</p>
                                </div>

                                {/* Popular Courses */}
                                <div className="space-y-0.5 border-l border-white/10 pl-4">
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                        <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                                        <p className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">Courses</p>
                                    </div>
                                    <p className="text-xs font-bold text-white truncate">Top Programs</p>
                                </div>

                                {/* Exclusive Offer */}
                                <div className="space-y-0.5 border-l border-white/10 pl-4">
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                        <Tag className="w-3.5 h-3.5 text-purple-400" />
                                        <p className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">Offer</p>
                                    </div>
                                    {currentBanner.offerPercentage && (
                                        <p className="text-xs font-bold text-pink-400">{currentBanner.offerPercentage}</p>
                                    )}
                                </div>
                            </div>

                            {/* Bottom Section - Buttons */}
                            <div className="flex flex-wrap gap-3 mt-1">
                                <Button
                                    onClick={() => handleApplyNow(currentBanner)}
                                    className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold px-5 py-3.5 rounded-none text-xs flex items-center gap-1.5 shadow-lg shadow-pink-500/20 transform transition-transform hover:scale-105"
                                >
                                    Apply Now
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Button>

                                <Button
                                    onClick={handleConsultation}
                                    className="bg-white/5 hover:bg-white/10 text-white font-semibold px-5 py-3.5 rounded-none text-xs border border-white/10 backdrop-blur flex items-center gap-1.5"
                                >
                                    <Play className="w-3 h-3 fill-current" />
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

                            {/* University Logo - top-right over the image */}
                            {uni?.logo && (
                                <div className="absolute top-4 right-4 z-20 bg-white/95 backdrop-blur rounded-none p-2 shadow-xl border border-white/20">
                                    <Image
                                        src={uni.logo}
                                        alt={uni.universityName || "University Logo"}
                                        width={48}
                                        height={48}
                                        className="object-contain"
                                    />
                                </div>
                            )}

                            {/* Premium Offer Card */}
                            <div className="absolute bottom-4 right-4 left-4 lg:left-auto lg:w-80 z-20 bg-gradient-to-br from-purple-600/90 to-pink-600/90 backdrop-blur-xl border border-white/20 rounded-none p-4 shadow-2xl">
                                <div className="flex items-center gap-1.5 mb-2">
                                    <span className="text-base">🔥</span>
                                    <Badge className="bg-white/20 text-white border-white/30 text-[9px] font-bold px-1.5 py-0.5 rounded-none">
                                        LIMITED TIME OFFER
                                    </Badge>
                                </div>

                                <div className="flex items-end justify-between gap-4">
                                    <div>
                                        {currentBanner.offerPercentage && (
                                            <p className="text-2xl lg:text-3xl font-black text-white leading-none">
                                                {currentBanner.offerPercentage}
                                            </p>
                                        )}
                                        <p className="text-[10px] text-purple-100 mt-1 font-medium leading-none">
                                            {currentBanner.offerText || "On Total Tuition Fees"}*
                                        </p>
                                    </div>

                                    {currentBanner.deadlineText && (
                                        <div className="bg-black/20 rounded-none px-3 py-1.5 border border-white/10">
                                            <p className="text-[9px] text-purple-200 font-bold uppercase tracking-tighter">Deadline</p>
                                            <p className="text-sm font-bold text-white leading-none mt-0.5">{currentBanner.deadlineText}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Urgency Message */}
                                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between">
                                    <p className="text-[9px] text-white font-medium italic opacity-90">
                                        *Hurry! Applications closing soon.
                                    </p>
                                    <div className="flex gap-1">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="w-1 h-1 rounded-none bg-white/40 animate-pulse" />
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
                        className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 transition-all duration-300 z-30 opacity-0 group-hover:opacity-100 hover:scale-125"
                        aria-label="Previous offer"
                    >
                        <ChevronLeft className="w-8 h-8 text-white" />
                    </button>

                    <button
                        onClick={handleNext}
                        onMouseEnter={() => setIsAutoPlay(false)}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2 transition-all duration-300 z-30 opacity-0 group-hover:opacity-100 hover:scale-125"
                        aria-label="Next offer"
                    >
                        <ChevronRight className="w-8 h-8 text-white" />
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
                            className={`transition-all duration-300 rounded-none backdrop-blur-md border ${index === currentIndex
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
