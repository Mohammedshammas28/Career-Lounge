"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { MapPin, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

export function UniversitiesGrid({ limit = null, showViewAll = true }) {
  const [universities, setUniversities] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/universities", {
          headers: {
            "Cache-Control": "no-cache",
            "Pragma": "no-cache",
            "Expires": "0",
          },
        })

        if (!response.ok) {
          setIsLoading(false)
          return
        }


        const result = await response.json()
        let data = result.data || result.universities || []

        // Limit results if specified
        if (limit) {
          data = data.slice(0, limit)
        }

        setUniversities(data)
      } catch (err) {
        console.error("Error fetching universities:", err)
        setError("Failed to load universities")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUniversities()
  }, [limit])

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{error}</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-border overflow-hidden">
            <Skeleton className="h-48 w-full" />
            <div className="p-6 space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex gap-2 pt-4">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 flex-1" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!universities.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No universities available at the moment.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {universities.map((university) => (
          <Link key={university.slug || university._id} href={`/services/educational-consultancy/overseas/universities/${university.slug || university._id}`}>
            <div className="group rounded-lg border border-border hover:border-primary/50 transition-all hover:shadow-lg overflow-hidden bg-background h-full cursor-pointer flex flex-col">
              {/* Banner Image */}
              <div className="relative h-48 bg-gradient-to-br from-secondary/30 to-secondary/10 overflow-hidden">
                {university.bannerImage ? (
                  <img
                    src={university.bannerImage}
                    alt={university.universityName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/10">
                    <Globe className="w-12 h-12 text-primary/40" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                {/* Logo & Name Section */}
                <div className="flex items-start gap-3 mb-3">
                  {university.logo && (
                    <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-lg flex items-center justify-center overflow-hidden">
                      <img
                        src={university.logo}
                        alt={`${university.universityName} logo`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {university.universityName}
                    </h3>
                  </div>
                </div>

                {/* Location */}
                {(university.city || university.country) && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="line-clamp-1">
                      {[university.city, university.country].filter(Boolean).join(", ")}
                    </span>
                  </div>
                )}

                {/* Overview */}
                {university.overview && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {university.overview}
                  </p>
                )}

                {/* Ranking Card */}
                {university.ranking && (
                  <div className="mb-4">
                    <div className="inline-flex items-center rounded-md border-2 border-blue-700 bg-blue-50 px-3 py-2">
                      <span className="text-sm font-bold text-blue-800">#{String(university.ranking).replace(/\D/g, "") || university.ranking}</span>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 mt-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                    }}
                  >
                    View Details
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 text-xs bg-blue-600 hover:bg-blue-700"
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                    }}
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View All Link */}
      {showViewAll && universities.length > 0 && (
        <div className="flex justify-center mt-8">
          <Link href="/services/educational-consultancy/overseas/universities">
            <Button variant="outline" className="gap-2">
              View All Universities
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </Link>
        </div>
      )}
    </>
  )
}
