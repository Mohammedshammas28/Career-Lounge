"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [tickerItems, setTickerItems] = useState([])

  useEffect(() => {
    const fetchTicker = async () => {
      try {
        const origin = typeof window !== "undefined" ? window.location.origin : ""
        const url = `${origin}/api/ticker`
        const response = await fetch(url, {
          cache: "no-store",
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
          }
        })
        if (!response.ok) {
          console.error("Ticker fetch returned non-OK status:", response.status, response.statusText)
          return
        }
        const data = await response.json()
        if (data.items) {
          setTickerItems(data.items.filter(item => item.active))
        } else if (data.text) {
          // Fallback for transition
          setTickerItems([{ id: "1", text: data.text, active: true, isNew: false }])
        }
      } catch (error) {
        console.error("Error fetching ticker:", error)
      }
    }
    fetchTicker()

    // Auto-refresh ticker data every 30 seconds
    const interval = setInterval(fetchTicker, 30000)
    return () => clearInterval(interval)
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black backdrop-blur-md border-b border-border animate-fadeIn">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8 bg-white dark:bg-black">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 transition-transform hover:scale-105 group">
            <img
              src="/Careerlounge logo (1).png"
              alt="Career Lounge Logo"
              className="h-12 w-auto"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-10">
          {navItems.map((item, index) => {
            if (item.name === "Services") {
              return (
                <DropdownMenu key="Services" open={servicesOpen} onOpenChange={setServicesOpen}>
                  <DropdownMenuTrigger
                    asChild
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <button
                      style={{
                        animation: `slideInLeft 0.5s ease-out ${index * 0.1}s both`,
                      }}
                      className="relative text-sm font-medium text-muted-foreground transition-all hover:text-primary hover:scale-110 group after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-primary after:transition-all hover:after:w-full cursor-pointer select-none flex items-center gap-1"
                    >
                      <span className="relative group-hover:animate-glow">Services</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-64 overflow-visible"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    {/* Career Counselling with Submenu */}
                    <div className="relative group">
                      <button
                        className="w-full flex items-center justify-between rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-accent transition-colors"
                      >
                        <span>Career Counselling</span>
                        <ChevronDown className="h-4 w-4 group-hover:rotate-90 transition-transform" />
                      </button>

                      {/* Right-side Submenu */}
                      <div
                        className="absolute left-full top-0 ml-2 w-56 bg-popover border border-border rounded-md shadow-lg p-1 z-[100] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                      >
                        <Link
                          href="/services/career-counselling/overview"
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors block w-full text-left"
                        >
                          Overview
                        </Link>
                        <Link
                          href="/services/career-counselling/test-preparation"
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors block w-full text-left"
                        >
                          Test Preparation
                        </Link>
                        <Link
                          href="/services/career-counselling/language-training"
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors block w-full text-left"
                        >
                          Language Training
                        </Link>
                      </div>
                    </div>

                    <DropdownMenuSeparator />

                    {/* Educational Consultancy with Submenu */}
                    <div className="relative group">
                      <button
                        className="w-full flex items-center justify-between rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-accent transition-colors"
                      >
                        <span>Educational Consultancy</span>
                        <ChevronDown className="h-4 w-4 group-hover:rotate-90 transition-transform" />
                      </button>

                      {/* Right-side Submenu - Always rendered, shown on hover */}
                      <div
                        className="absolute left-full top-0 ml-2 w-56 bg-popover border border-border rounded-md shadow-lg p-1 z-[100] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                      >
                        <Link
                          href="/services/educational-consultancy/domestic"
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors block w-full text-left"
                        >
                          Domestic Education
                        </Link>
                        <Link
                          href="/services/educational-consultancy/overseas"
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground hover:bg-accent transition-colors block w-full text-left"
                        >
                          Overseas Education
                        </Link>
                      </div>
                    </div>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/services/immigration">Immigration</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/services/recruitment">Recruitment</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }
            return (
              <Link
                key={item.name}
                href={item.href}
                style={{
                  animation: `slideInLeft 0.5s ease-out ${index * 0.1}s both`,
                }}
                className="relative text-sm font-medium text-muted-foreground transition-all hover:text-primary hover:scale-110 group after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-primary after:to-primary after:transition-all hover:after:w-full"
              >
                <span className="relative group-hover:animate-glow">{item.name}</span>
              </Link>
            );
          })}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4 lg:items-center">
          <ThemeToggle />
          <Link href="/contact">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:shadow-lg hover:scale-105">
              Get Started
            </Button>
          </Link>
        </div>

      </nav>
      {/* Animated notification banner moved below navbar */}
      <div className="bg-gradient-to-r from-primary/20 to-primary/10 border-b border-primary/20 w-full overflow-hidden py-2">
        <div className="animate-scroll-left flex gap-12 whitespace-nowrap">
          {tickerItems.length > 0 ? (
            // Duplicate the items logic to ensure smooth infinite scroll
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="flex gap-12 items-center">
                {tickerItems.map((item) => (
                  <span key={`${i}-${item.id}`} className="text-sm font-semibold text-primary flex items-center gap-2 shrink-0">
                    {item.isNew ? (
                      <>
                        ✨ New: <span className="text-foreground font-medium">{item.text}</span>
                      </>
                    ) : (
                      <span className="text-foreground font-medium">{item.text}</span>
                    )}
                  </span>
                ))}
              </div>
            ))
          ) : (
            <span className="text-sm font-semibold text-primary flex items-center gap-2 shrink-0">
              ✨ New: <span className="text-foreground font-medium">Study In Abroad Programs - Explore Global Opportunities</span>
            </span>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <nav className="lg:hidden fixed top-16 left-0 right-0 z-50 bg-white dark:bg-black px-6 py-6 border-b border-border max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-foreground">Menu</h2>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-foreground hover:bg-secondary transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="space-y-1">
              {navItems.map((item) => {
                if (item.name === "Services") {
                  return (
                    <div key="Services" className="">
                      <details className="group">
                        <summary className="block rounded-lg px-4 py-3 text-base font-semibold text-foreground hover:bg-secondary/50 transition-all cursor-pointer select-none">
                          Services
                        </summary>
                        <div className="pl-6 flex flex-col gap-1 mt-1 border-l border-border/40 ml-4">
                          {/* Career Counselling Group */}
                          <div className="py-1">
                            <span className="block px-2 py-1 text-xs font-semibold text-muted-foreground uppercase">Career Counselling</span>
                            <div className="pl-2 flex flex-col gap-0.5 mt-1">
                              <Link href="/services/career-counselling/overview" className="block rounded-lg px-2 py-2 text-sm text-foreground hover:bg-secondary/50 transition-all" onClick={() => setMobileMenuOpen(false)}>
                                Overview
                              </Link>
                              <Link href="/services/career-counselling/test-preparation" className="block rounded-lg px-2 py-2 text-sm text-foreground hover:bg-secondary/50 transition-all" onClick={() => setMobileMenuOpen(false)}>
                                Test Preparation
                              </Link>
                              <Link href="/services/career-counselling/language-training" className="block rounded-lg px-2 py-2 text-sm text-foreground hover:bg-secondary/50 transition-all" onClick={() => setMobileMenuOpen(false)}>
                                Language Training
                              </Link>
                            </div>
                          </div>

                          {/* Educational Consultancy Group */}
                          <div className="py-1 border-t border-border/20 mt-1">
                            <span className="block px-2 py-1 text-xs font-semibold text-muted-foreground uppercase">Educational Consultancy</span>
                            <div className="pl-2 flex flex-col gap-0.5 mt-1">
                              <Link href="/services/educational-consultancy/domestic" className="block rounded-lg px-2 py-2 text-sm text-foreground hover:bg-secondary/50 transition-all" onClick={() => setMobileMenuOpen(false)}>
                                Domestic Education
                              </Link>
                              <Link href="/services/educational-consultancy/overseas" className="block rounded-lg px-2 py-2 text-sm text-foreground hover:bg-secondary/50 transition-all" onClick={() => setMobileMenuOpen(false)}>
                                Overseas Education
                              </Link>
                            </div>
                          </div>

                          {/* Immigration */}
                          <Link href="/services/immigration" className="block rounded-lg px-2 py-2 text-sm font-medium text-foreground hover:bg-secondary/50 border-t border-border/20 mt-1 pt-2 transition-all" onClick={() => setMobileMenuOpen(false)}>
                            Immigration
                          </Link>

                          {/* Recruitment */}
                          <Link href="/services/recruitment" className="block rounded-lg px-2 py-2 text-sm font-medium text-foreground hover:bg-secondary/50 transition-all" onClick={() => setMobileMenuOpen(false)}>
                            Recruitment
                          </Link>
                        </div>
                      </details>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-lg px-4 py-3 text-base font-semibold text-foreground hover:bg-secondary/50 transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
            <div className="py-6 border-t border-border mt-6">
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        </>
      )}
    </header>
  )
}
