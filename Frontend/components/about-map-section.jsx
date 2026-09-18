"use client";

import { motion } from "framer-motion";
import { WorldMap } from "@/components/ui/world-map";
import { GraduationCap, Award, Plane, Globe2 } from "lucide-react";

export function AboutMapSection() {
  const routes = [
    // India (New Delhi: 28.6139, 77.2090) to UK (London: 51.5074, -0.1278)
    {
      start: { lat: 28.6139, lng: 77.2090, label: "India (New Delhi)" },
      end: { lat: 51.5074, lng: -0.1278, label: "United Kingdom (London)" },
    },
    // India (Mumbai: 19.0760, 72.8777) to Canada (Toronto: 43.6532, -79.3832)
    {
      start: { lat: 19.0760, lng: 72.8777, label: "India (Mumbai)" },
      end: { lat: 43.6532, lng: -79.3832, label: "Canada (Toronto)" },
    },
    // India (New Delhi: 28.6139, 77.2090) to USA (New York: 40.7128, -74.0060)
    {
      start: { lat: 28.6139, lng: 77.2090, label: "India (New Delhi)" },
      end: { lat: 40.7128, lng: -74.0060, label: "USA (New York)" },
    },
    // India (Mumbai: 19.0760, 72.8777) to Australia (Sydney: -33.8688, 151.2093)
    {
      start: { lat: 19.0760, lng: 72.8777, label: "India (Mumbai)" },
      end: { lat: -33.8688, lng: 151.2093, label: "Australia (Sydney)" },
    },
    // India (New Delhi: 28.6139, 77.2090) to Germany (Berlin: 52.5200, 13.4050)
    {
      start: { lat: 28.6139, lng: 77.2090, label: "India (New Delhi)" },
      end: { lat: 52.5200, lng: 13.4050, label: "Germany (Berlin)" },
    },
    // India (New Delhi: 28.6139, 77.2090) to Ireland (Dublin: 53.3498, -6.2603)
    {
      start: { lat: 28.6139, lng: 77.2090, label: "India (New Delhi)" },
      end: { lat: 53.3498, lng: -6.2603, label: "Ireland (Dublin)" },
    },
    // USA (San Francisco) to Australia (Melbourne)
    {
      start: { lat: 37.7749, lng: -122.4194, label: "USA (San Francisco)" },
      end: { lat: -37.8136, lng: 144.9631, label: "Australia (Melbourne)" },
    },
  ];

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-background via-muted/30 to-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Content */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-primary/10 text-primary border border-primary/20 mb-4">
            <Globe2 className="h-3.5 w-3.5" />
            Global Study Network
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
            Our Worldwide{" "}
            <span className="text-primary">
              Educational Footprint
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground font-medium leading-relaxed">
            Bridging students from India to prestigious universities across the United Kingdom, Canada, Australia, the United States, Germany, and Ireland.
          </p>
        </div>

        {/* World Map Container with Glassmorphic Card Border */}
        <div className="relative rounded-3xl border border-border/60 bg-card/60 p-3 sm:p-6 shadow-2xl backdrop-blur-sm overflow-hidden">
          <WorldMap dots={routes} lineColor="#0284c7" />

          {/* Quick Stats Overlay Bar */}
          <div className="mt-6 pt-6 border-t border-border/50 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 rounded-xl bg-background/50 border border-border/30">
              <div className="flex items-center justify-center gap-2 text-primary font-bold text-xl sm:text-2xl">
                <GraduationCap className="h-5 w-5" />
                <span>500+</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Partner Universities</p>
            </div>
            <div className="p-3 rounded-xl bg-background/50 border border-border/30">
              <div className="flex items-center justify-center gap-2 text-primary font-bold text-xl sm:text-2xl">
                <Plane className="h-5 w-5" />
                <span>6+</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Top Countries</p>
            </div>
            <div className="p-3 rounded-xl bg-background/50 border border-border/30">
              <div className="flex items-center justify-center gap-2 text-primary font-bold text-xl sm:text-2xl">
                <Award className="h-5 w-5" />
                <span>98%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Visa Success Rate</p>
            </div>
            <div className="p-3 rounded-xl bg-background/50 border border-border/30">
              <div className="flex items-center justify-center gap-2 text-primary font-bold text-xl sm:text-2xl">
                <Globe2 className="h-5 w-5" />
                <span>1000+</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Students Placed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMapSection;
