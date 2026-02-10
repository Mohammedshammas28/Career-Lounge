"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Process", href: "#process" },
    { name: "Contact", href: "#contact" },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border animate-fadeIn">
      {/* Animated notification banner */}
      <div className="bg-gradient-to-r from-primary/20 to-primary/10 border-b border-primary/20 w-full overflow-hidden py-2">
        <div className="animate-scroll-left flex gap-8">
          <span className="text-sm font-semibold text-primary flex items-center gap-2 shrink-0">✨ New: <span className="text-foreground font-medium">Study In Abroad Programs - Explore Global Opportunities</span></span>
          <span className="text-sm font-semibold text-primary flex items-center gap-2 shrink-0">✨ New: <span className="text-foreground font-medium">Study In Abroad Programs - Explore Global Opportunities</span></span>
          <span className="text-sm font-semibold text-primary flex items-center gap-2 shrink-0">✨ New: <span className="text-foreground font-medium">Study In Abroad Programs - Explore Global Opportunities</span></span>
        </div>
      </div>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 transition-transform hover:scale-105 group">
            <span className="text-2xl font-bold tracking-tight text-foreground group-hover:animate-wave">
              Career<span className="text-primary animate-glow ml-1 inline-block">Lounge</span>
            </span>
          </Link>
        </div>
        <div className="flex lg:hidden gap-2 items-center">
          <ThemeToggle />
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground transition-all hover:bg-secondary hover:scale-110"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-10">
          {navItems.map((item, index) => (
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
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-4 lg:items-center">
          <ThemeToggle />
          <Link href="#contact">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all hover:shadow-lg hover:scale-105">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <>
          <div 
            className="lg:hidden fixed inset-0 z-40 bg-black/50" 
            onClick={() => setMobileMenuOpen(false)} 
          />
          <nav className="lg:hidden fixed top-16 left-0 right-0 z-50 bg-background px-6 py-6 border-b border-border max-h-[calc(100vh-4rem)] overflow-y-auto">
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
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-lg px-4 py-3 text-base font-semibold text-foreground hover:bg-secondary/50 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="py-6 border-t border-border mt-6">
              <Link href="#contact" onClick={() => setMobileMenuOpen(false)}>
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
