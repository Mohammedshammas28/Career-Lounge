"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Briefcase,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobCard } from "@/components/job-card";

const JOB_TYPES = ["All Types", "Full-time", "Part-time", "Contract", "Remote", "Internship"];

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/jobs");
        const result = await response.json();

        if (result.success) {
          setJobs(result.data);
          setFilteredJobs(result.data);
        } else {
          setError("Failed to load jobs");
        }
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("Error loading jobs");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    let filtered = jobs;

    if (searchQuery) {
      filtered = filtered.filter(
        (job) =>
          job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          job.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedType && selectedType !== "All Types") {
      filtered = filtered.filter(
        (job) => (job.type || "").toLowerCase() === selectedType.toLowerCase()
      );
    }

    setFilteredJobs(filtered);
  }, [searchQuery, selectedType, jobs]);

  const handleViewDetails = (slug) => {
    router.push(`/jobs/${slug}`);
  };

  const handleApplyNow = (slug) => {
    router.push(`/contact?job=${slug}`);
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-48 bg-[#1a1f35] overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/6 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-blue-400/30 rounded-full animate-bounce" />
        <div className="absolute top-1/4 left-1/3 w-1 h-1 bg-white/20 rounded-full animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-blue-300/40 rounded-full animate-pulse" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Briefcase className="w-4 h-4" />
              Job Opportunities
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white text-3xl md:text-5xl font-bold max-w-4xl mx-auto leading-tight mb-6"
          >
            Find Your{" "}
            <span className="text-blue-400">Dream Career</span>{" "}
            Opportunity
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-300 text-lg max-w-2xl mx-auto mb-10"
          >
            Browse exclusive job listings across the Gulf region and beyond. Let us connect you with the role that aligns with your skills and aspirations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              onClick={() => router.push("/contact")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl text-lg font-bold shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-1"
            >
              Talk to a Recruiter
            </Button>
          </motion.div>
        </div>

        {/* Wave */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 w-full bg-white transition-all overflow-hidden"
          style={{ borderRadius: "50% 50% 0 0 / 100% 100% 0 0" }}
        />
      </section>

      <div className="relative -mt-32 pb-20 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filter Card */}
          <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 mb-16">
            <h3 className="text-2xl font-bold text-slate-800 text-center mb-6">Filter by Job Type</h3>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full h-16 bg-white border-slate-200 rounded-xl shadow-sm text-lg text-slate-700 px-6 focus:ring-4 focus:ring-blue-500/10">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                {JOB_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <h4 className="text-slate-500 font-medium">
              Showing Results for{" "}
              <span className="text-slate-900 font-bold">{selectedType}</span>
              {searchQuery && (
                <span className="ml-1 text-slate-500">
                  {" "}matching &quot;<span className="text-blue-600">{searchQuery}</span>&quot;
                </span>
              )}
            </h4>

            <div className="relative w-full sm:w-96 group">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10 group-focus-within:text-blue-500 transition-colors" />
              <Input
                placeholder="Search jobs, companies, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-11 h-12 bg-white border-slate-100 rounded-xl shadow-sm focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Jobs Grid */}
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-32">
                <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin mb-4" />
                <p className="text-slate-600 font-medium">Finding best opportunities...</p>
              </div>
            ) : error ? (
              <div className="bg-red-50 text-red-600 p-8 rounded-2xl text-center border border-red-100">
                <p>{error}</p>
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="mt-4 border-red-200 hover:bg-red-100"
                >
                  Retry Loading
                </Button>
              </div>
            ) : filteredJobs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-20 text-center shadow-sm border border-slate-100"
              >
                <Briefcase className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">No Jobs Found</h3>
                <p className="text-slate-500">Try adjusting your filters or search keywords.</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredJobs.map((job, index) => (
                  <motion.div
                    layout
                    key={job._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="h-full"
                  >
                    <JobCard job={job} />
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </main>
  );
}
