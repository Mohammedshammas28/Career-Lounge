"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import DimensionalSwitchSlider, { SlideItem } from "@/components/ui/dimensional-switch-slider";

export default function PremiumOfferSlider() {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    const fetchBanners = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/banners");
        const result = await response.json();

        if (isMounted && result.success && Array.isArray(result.data)) {
          const activeBanners = result.data.filter((b) => b.active !== false);
          setBanners(activeBanners);
        }
      } catch (err) {
        console.warn("Could not load dynamic banners, using high-impact fallback showcase:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchBanners();
    return () => {
      isMounted = false;
    };
  }, []);

  const slideItems = useMemo(() => {
    if (!banners || banners.length === 0) return undefined;

    return banners.map((b) => {
      const uni = b.university;
      const uniName = uni?.universityName || b.heading || "Featured University";
      const image =
        b.customBannerImage ||
        uni?.bannerImage ||
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1400&fit=crop";

      const href = uni?.slug
        ? `/university/${uni.slug}`
        : "/contact?service=Overseas+Education";

      return {
        image,
        text: uniName,
        subText:
          b.subHeading ||
          "Unlock global opportunities with world-class education, industry-focused courses and exclusive scholarship offers.",
        tag: b.tagText || "FEATURED SCHOLARSHIP",
        offerPercentage: b.offerPercentage || "50% OFF",
        offerText: b.offerText || "On Total Tuition Fees",
        deadlineText: b.deadlineText || "Admissions Closing Soon",
        buttonText: b.buttonText || "Apply Now",
        logo: uni?.logo,
        universityName: uniName,
        href,
        onApply: () => {
          router.push(href);
        },
      };
    });
  }, [banners, router]);

  return (
    <section className="py-12 sm:py-16 bg-background relative overflow-hidden">
      {/* Section Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.35em] text-primary">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Featured Universities &amp; Scholarships</span>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Top-Ranked Global Institutions
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground">
          Unlock international study pathways with world-class faculty, accredited degrees, and exclusive tuition grants.
        </p>
      </div>

      <div className="w-full px-0 relative z-10">
        {/* 3D Dimensional Switch Banner Slider */}
        <DimensionalSwitchSlider
          items={slideItems}
          infinite
          direction="horizontal"
          autoplay
          autoplayDelay={3800}
          cardClassName="w-full max-w-none h-[380px] sm:h-[430px] lg:h-[480px]"
          textSize={36}
          onApply={(item) => {
            if (item.href) router.push(item.href);
          }}
        />
      </div>
    </section>
  );
}
