"use client"

import Link from "next/link"
import { Building2, MapPin, DollarSign, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function JobCard({ job }) {
  if (!job) return null

  return (
    <div className="bg-white dark:bg-card rounded-[1.5rem] p-5 sm:p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-border flex flex-col items-center text-center group h-full">
      {/* Company Logo */}
      <div className="w-full h-24 sm:h-32 flex items-center justify-center mb-4 sm:mb-6">
        {job.logo ? (
          <img
            src={job.logo}
            alt={job.company}
            className="max-h-24 max-w-[80%] object-contain rounded-xl"
          />
        ) : (
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-950/20 rounded-full flex items-center justify-center border border-blue-100 dark:border-blue-900/30">
            <Building2 className="w-8 h-8 text-blue-500" />
          </div>
        )}
      </div>

      {/* Divider (Thin) */}
      <div className="w-full h-px bg-slate-100 dark:bg-border mb-6" />

      {/* Job Title & Company */}
      <h3 className="text-lg font-bold text-slate-900 dark:text-foreground mb-2 min-h-[3rem] line-clamp-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {job.title}
      </h3>
      <p className="text-sm text-slate-600 dark:text-muted-foreground font-semibold mb-4 h-6 truncate w-full">
        {job.company}
      </p>

      {/* Job Type & Category Badges */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/20">
          {job.type || "Full-time"}
        </span>
        {job.category && (
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
            job.category === "Overseas"
              ? "bg-violet-50 dark:bg-violet-950/30 text-violet-600 dark:text-violet-400 border-violet-100 dark:border-violet-900/20"
              : "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/20"
          }`}>
            {job.category === "Overseas" ? "✈️ Overseas" : "🏠 Domestic"}
          </span>
        )}
      </div>

      {/* Job Details Meta */}
      <div className="w-full space-y-2.5 text-left mb-8 mt-auto">
        <div className="flex items-center gap-2.5 text-sm text-slate-500 dark:text-muted-foreground">
          <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0" />
          <span className="truncate">{job.location}</span>
        </div>
        {job.salary && (
          <div className="flex items-center gap-2.5 text-sm text-slate-500 dark:text-muted-foreground">
            <DollarSign className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span className="truncate">{job.salary}</span>
          </div>
        )}
        {job.experience && (
          <div className="flex items-center gap-2.5 text-sm text-slate-500 dark:text-muted-foreground">
            <Clock className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span className="truncate">{job.experience}</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 w-full mt-auto">
        <Link href={`/jobs/${job.slug || job._id}`} className="w-full">
          <Button
            variant="outline"
            className="w-full rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 dark:border-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-950/20 h-11 text-xs font-bold"
          >
            Know More
          </Button>
        </Link>
        <Link 
          href={`/contact?service=${encodeURIComponent(job.category === "Overseas" ? "Overseas Recruitment" : "Domestic Recruitment")}&jobTitle=${encodeURIComponent(job.title)}&company=${encodeURIComponent(job.company)}&sourcePage=${encodeURIComponent("Job Listing - " + job.title)}`} 
          className="w-full"
        >
          <Button
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 dark:shadow-none h-11 text-xs font-bold"
          >
            Apply Now
          </Button>
        </Link>
      </div>
    </div>
  )
}
