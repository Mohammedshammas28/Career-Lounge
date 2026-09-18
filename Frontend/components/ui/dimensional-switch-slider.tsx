// Career Lounge University Banner Slider — Sliding Carousel
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Sparkles } from "lucide-react";
import Link from "next/link";

export type SlideItem = {
  image: string;
  text: string;
  subText?: string;
  tag?: string;
  offerPercentage?: string;
  offerText?: string;
  deadlineText?: string;
  buttonText?: string;
  logo?: string;
  universityName?: string;
  href?: string;
  onApply?: () => void;
};

type CSSLength = string | number;

const DEFAULT_BANNER_ITEMS: SlideItem[] = [
  {
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1400&fit=crop",
    text: "University of Melbourne",
    subText: "Up to 50% Tuition Scholarship for High-Achieving International Students",
    tag: "FEATURED SCHOLARSHIP",
    offerPercentage: "50% OFF",
    offerText: "On Total Tuition Fees",
    deadlineText: "July 31, 2027",
    buttonText: "Apply Now",
    logo: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=200&h=200&fit=crop",
    href: "/contact?service=Overseas+Education",
  },
  {
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1400&fit=crop",
    text: "National University of Singapore",
    subText: "Asia's Top Ranked Institution • Direct Entry & STEM Grants Available",
    tag: "TOP RANKED GLOBAL",
    offerPercentage: "100% AID",
    offerText: "Merit Grants & Living Stipend",
    deadlineText: "Oct 15, 2026",
    buttonText: "Explore Admissions",
    logo: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=200&h=200&fit=crop",
    href: "/contact?service=Overseas+Education",
  },
  {
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=1400&fit=crop",
    text: "University of Oxford",
    subText: "World-Class Excellence in Law, Medicine, Humanities & Computer Science",
    tag: "IVY & RUSSELL GROUP",
    offerPercentage: "EXCLUSIVE",
    offerText: "Full Fellowship Opportunities",
    deadlineText: "Nov 30, 2026",
    buttonText: "Apply With Guidance",
    logo: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=200&h=200&fit=crop",
    href: "/contact?service=Overseas+Education",
  },
  {
    image: "https://images.unsplash.com/photo-1526976668912-1a811878dd37?q=80&w=1400&fit=crop",
    text: "University of Toronto",
    subText: "Study in Canada with Post-Graduation Work Permits & Co-op Programs",
    tag: "WORK & STUDY",
    offerPercentage: "$25,000 CAD",
    offerText: "International Scholar Award",
    deadlineText: "Jan 15, 2027",
    buttonText: "Check Eligibility",
    logo: "https://images.unsplash.com/photo-1526976668912-1a811878dd37?q=80&w=200&h=200&fit=crop",
    href: "/contact?service=Overseas+Education",
  },
];

export interface DimensionalSwitchSliderProps {
  items?: SlideItem[];
  infinite?: boolean;
  ease?: string;
  textColor?: string;
  cardClassName?: string;
  cardWidth?: string | number;
  cardHeight?: string | number;
  direction?: "horizontal" | "vertical";
  textSize?: string | number;
  cardBorderRadius?: string | number;
  autoplay?: boolean;
  autoplayDelay?: number;
  onApply?: (item: SlideItem) => void;
}

export const DimensionalSwitchSlider = ({
  items: userItems,
  infinite = true,
  cardClassName = "w-full max-w-none h-[380px] sm:h-[430px] lg:h-[480px]",
  autoplay = true,
  autoplayDelay = 3800,
  onApply,
}: DimensionalSwitchSliderProps = {}) => {
  const items = useMemo(() => {
    if (userItems && userItems.length > 0) return userItems;
    return DEFAULT_BANNER_ITEMS;
  }, [userItems]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isHoveredRef = useRef(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      const clamped = infinite
        ? ((index % items.length) + items.length) % items.length
        : Math.max(0, Math.min(index, items.length - 1));
      if (!infinite && (clamped < 0 || clamped >= items.length)) return;
      setIsTransitioning(true);
      setCurrentIndex(clamped);
      setTimeout(() => setIsTransitioning(false), 650);
    },
    [infinite, isTransitioning, items.length]
  );

  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  // Autoplay
  useEffect(() => {
    if (!autoplay || autoplayDelay <= 0 || items.length <= 1) return;
    autoplayRef.current = setInterval(() => {
      if (!isHoveredRef.current) goNext();
    }, autoplayDelay);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [autoplay, autoplayDelay, goNext, items.length]);

  const goToIndex = (idx: number) => goTo(idx);

  const handleAction = (item: SlideItem) => {
    if (item.onApply) {
      item.onApply();
    } else if (onApply) {
      onApply(item);
    }
  };

  const renderCardFaceContent = (item: SlideItem, isFaceActive: boolean) => {
    return (
      <div className="relative w-full h-full">
        {/* Background Image with zoom */}
        <img
          src={item.image}
          className="w-full h-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-105"
          alt={item.text}
        />

        {/* Multi-stage High-End Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80" />

        {/* Top Floating Badges */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between z-10 pointer-events-none">
          {item.tag && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-amber-300 text-[10px] sm:text-xs font-bold tracking-wider uppercase shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{item.tag}</span>
            </div>
          )}

          {item.logo && (
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/95 p-1.5 shadow-xl border border-white/30 backdrop-blur-md overflow-hidden flex items-center justify-center">
              <img
                src={item.logo}
                alt={item.universityName || item.text}
                className="w-full h-full object-contain"
              />
            </div>
          )}
        </div>

        {/* Bottom Offer & Info Panel */}
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-white/[0.08] border border-white/20 backdrop-blur-xl shadow-2xl">
          <div className="space-y-1 max-w-lg">
            {item.offerPercentage && (
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs sm:text-sm font-black tracking-tight shadow-sm">
                  {item.offerPercentage}
                </span>
                <span className="text-xs sm:text-sm text-gray-200 font-medium">
                  {item.offerText || "Scholarship Offer"}
                </span>
              </div>
            )}

            {item.deadlineText && (
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-300 font-medium pt-0.5">
                <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>Deadline: {item.deadlineText}</span>
              </div>
            )}
          </div>

          {/* Action Button */}
          {item.href ? (
            <Link
              href={item.href}
              onClick={() => handleAction(item)}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-orange-500/25 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shrink-0"
            >
              <span>{item.buttonText || "Apply Now"}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => handleAction(item)}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-orange-500/25 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shrink-0"
            >
              <span>{item.buttonText || "Apply Now"}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className="relative w-full flex flex-col items-center"
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
    >
      {/* Slide Track */}
      <div className={`relative overflow-hidden w-full ${cardClassName}`}>
        {/* Slides strip */}
        <div
          className="flex h-full"
          style={{
            width: `${items.length * 100}%`,
            transform: `translateX(-${(currentIndex * 100) / items.length}%)`,
            transition: isTransitioning ? "transform 0.65s cubic-bezier(0.77,0,0.18,1)" : "none",
          }}
        >
          {items.map((item, idx) => (
            <div
              key={`slide-${item.text}-${idx}`}
              className="relative h-full flex-shrink-0"
              style={{ width: `${100 / items.length}%` }}
            >
              {/* Background Image */}
              <img
                src={item.image}
                className="w-full h-full object-cover select-none"
                alt={item.text}
                draggable={false}
              />

              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/25" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80" />

              {/* Top badges */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between z-10 pointer-events-none">
                {item.tag && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-amber-300 text-[10px] sm:text-xs font-bold tracking-wider uppercase shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{item.tag}</span>
                  </div>
                )}
                {item.logo && (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/95 p-1.5 shadow-xl border border-white/30 backdrop-blur-md overflow-hidden flex items-center justify-center">
                    <img
                      src={item.logo}
                      alt={item.universityName || item.text}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Center title + subtitle */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-6 text-center">
                <h2 className="font-extrabold tracking-tight text-white text-2xl sm:text-4xl lg:text-5xl drop-shadow-md">
                  {item.text}
                </h2>
                {item.subText && (
                  <p className="mt-2 text-xs sm:text-base text-gray-200/90 font-medium line-clamp-2 max-w-2xl mx-auto drop-shadow-sm">
                    {item.subText}
                  </p>
                )}
              </div>

              {/* Bottom offer panel */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-white/[0.08] border border-white/20 backdrop-blur-xl shadow-2xl">
                <div className="space-y-1 max-w-lg">
                  {item.offerPercentage && (
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs sm:text-sm font-black tracking-tight shadow-sm">
                        {item.offerPercentage}
                      </span>
                      <span className="text-xs sm:text-sm text-gray-200 font-medium">
                        {item.offerText || "Scholarship Offer"}
                      </span>
                    </div>
                  )}
                  {item.deadlineText && (
                    <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-gray-300 font-medium pt-0.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>Deadline: {item.deadlineText}</span>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                {item.href ? (
                  <Link
                    href={item.href}
                    onClick={() => handleAction(item)}
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-orange-500/25 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shrink-0"
                  >
                    <span>{item.buttonText || "Apply Now"}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleAction(item)}
                    className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-orange-500/25 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shrink-0"
                  >
                    <span>{item.buttonText || "Apply Now"}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Arrow Buttons */}
        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous University"
              disabled={!infinite && currentIndex === 0}
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all duration-300 hover:bg-orange-500 hover:border-orange-400 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed shadow-xl"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next University"
              disabled={!infinite && currentIndex === items.length - 1}
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-all duration-300 hover:bg-orange-500 hover:border-orange-400 hover:scale-110 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed shadow-xl"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Dot Indicators */}
      {items.length > 1 && (
        <div className="flex items-center gap-2 mt-4 z-30">
          {items.map((item, idx) => (
            <button
              key={`dot-${item.text}-${idx}`}
              type="button"
              onClick={() => goToIndex(idx)}
              aria-label={`Go to ${item.text}`}
              aria-current={idx === currentIndex}
              className={`h-2 rounded-full transition-all duration-300 ease-in-out ${
                idx === currentIndex
                  ? "w-8 bg-gradient-to-r from-orange-500 to-amber-500 shadow-md shadow-orange-500/30"
                  : "w-2 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DimensionalSwitchSlider;
