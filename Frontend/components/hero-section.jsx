"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { Globe } from "@/components/ui/cobe-globe"

const globeMarkers = [
  { id: "london", location: [51.5074, -0.1278], label: "London" },
  { id: "nyc", location: [40.7128, -74.006], label: "New York" },
  { id: "sf", location: [37.7595, -122.4367], label: "San Francisco" },
  { id: "toronto", location: [43.6532, -79.3832], label: "Toronto" },
  { id: "berlin", location: [52.52, 13.405], label: "Berlin" },
  { id: "dubai", location: [25.2048, 55.2708], label: "Dubai" },
  { id: "singapore", location: [1.3521, 103.8198], label: "Singapore" },
  { id: "sydney", location: [-33.8688, 151.2093], label: "Sydney" },
  { id: "tokyo", location: [35.6762, 139.6503], label: "Tokyo" },
  { id: "mumbai", location: [19.076, 72.8777], label: "Mumbai" },
]

const globeArcs = [
  {
    id: "mumbai-london",
    from: [19.076, 72.8777],
    to: [51.5074, -0.1278],
    label: "Mumbai → London",
  },
  {
    id: "nyc-london",
    from: [40.7128, -74.006],
    to: [51.5074, -0.1278],
    label: "NYC → London",
  },
  {
    id: "sf-tokyo",
    from: [37.7595, -122.4367],
    to: [35.6762, 139.6503],
    label: "SF → Tokyo",
  },
  {
    id: "dubai-toronto",
    from: [25.2048, 55.2708],
    to: [43.6532, -79.3832],
    label: "Dubai → Toronto",
  },
  {
    id: "singapore-sydney",
    from: [1.3521, 103.8198],
    to: [-33.8688, 151.2093],
    label: "Singapore → Sydney",
  },
]

export function HeroSection() {

  return (
    <section className="relative min-h-[560px] lg:min-h-[620px] flex items-center justify-center pt-16 pb-12 overflow-hidden bg-[#060816] text-white">
      {/* Ambient background lighting and subtle gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16 w-full">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left Column - Hero Content */}
          <div className="text-center lg:text-left">
            <p className="text-primary font-medium tracking-wide uppercase text-sm mb-4 animate-slideInLeft" style={{ animation: 'slideInLeft 0.6s ease-out 0.1s both' }}>
              Your Career Partner
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[3.2rem] text-balance animate-slideInLeft leading-tight" style={{ animation: 'slideInLeft 0.6s ease-out 0.2s both' }}>
              Where ambition meets{" "}
              <span className="text-primary inline-block animate-float">opportunity</span>
            </h1>
            <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-200 max-w-xl mx-auto lg:mx-0 animate-slideInLeft" style={{ animation: 'fadeInUp 0.6s ease-out 0.3s both' }}>
              We help professionals navigate their career journey with expert coaching,
              strategic guidance, and personalized support. Transform your potential into success.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start animate-slideInLeft" style={{ animation: 'fadeInUp 0.6s ease-out 0.4s both' }}>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 transition-all hover:shadow-lg hover:scale-105"
                >
                  Start Your Journey
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-gray-400 text-foreground bg-white/80 dark:bg-transparent hover:bg-gray-100 dark:hover:bg-secondary transition-all hover:shadow-lg hover:scale-105">
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-5 border-t border-white/20 pt-5 animate-slideInLeft" style={{ animation: 'fadeInUp 0.6s ease-out 0.5s both' }}>
              <div className="transition-all hover:scale-105 hover:text-primary">
                <p className="text-lg sm:text-xl font-bold text-primary">500+</p>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">Careers Launched</p>
              </div>
              <div className="transition-all hover:scale-105 hover:text-primary">
                <p className="text-lg sm:text-xl font-bold text-primary">95%</p>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">Success Rate</p>
              </div>
              <div className="transition-all hover:scale-105 hover:text-primary">
                <p className="text-lg sm:text-xl font-bold text-primary">50+</p>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">Partners</p>
              </div>
            </div>
          </div>

          {/* Right Column - 3D Interactive Globe */}
          <div className="relative flex items-center justify-center w-full aspect-square max-w-[480px] lg:max-w-[560px] mx-auto animate-slideInRight" style={{ animation: 'slideInRight 0.6s ease-out 0.2s both' }}>
            <div className="absolute -inset-6 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative w-full h-full flex items-center justify-center">
              <Globe
                className="w-full h-full"
                markers={globeMarkers}
                arcs={globeArcs}
                dark={1}
                baseColor={[0.16, 0.22, 0.4]}
                markerColor={[0.25, 0.7, 1]}
                glowColor={[0.15, 0.35, 0.85]}
                arcColor={[0.3, 0.65, 1]}
                markerSize={0.028}
                markerElevation={0.015}
                arcWidth={0.6}
                arcHeight={0.28}
                speed={0.003}
                theta={0.2}
                diffuse={1.2}
                mapBrightness={6}
                mapSamples={16000}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
