"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Search, MapPin, Globe, BookOpen, Users, TrendingUp, Filter, ArrowRight, ExternalLink } from "lucide-react";
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

export default function UniversitiesPage() {
  const [universities, setUniversities] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);
  const [coursesList, setCoursesList] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/universities");
        const result = await response.json();

        if (result.success) {
          setUniversities(result.data);
          setFilteredUniversities(result.data);

          const uniqueCountries = [
            ...new Set(result.data.map((uni) => uni.country)),
          ].filter(Boolean);
          setCountries(uniqueCountries.sort());

          // Fetch courses for the filter (Priority 1)
          let fetchedCourses = [];
          try {
            const coursesRes = await fetch("/api/courses");
            const coursesResult = await coursesRes.json();
            if (coursesResult.success && coursesResult.data?.length > 0) {
              fetchedCourses = coursesResult.data.map(c => c.courseName).filter(Boolean);
            }
          } catch (cErr) {
            console.error("Error fetching courses for filter:", cErr);
          }

          if (fetchedCourses.length > 0) {
            setCoursesList(fetchedCourses.sort());
          } else {
            // Fallback (Priority 2): Extract unique course names from universities' coursesOffered
            const allCourses = result.data.flatMap((uni) => uni.coursesOffered || []);
            const uniqueCourses = [...new Set(allCourses)].filter(Boolean).sort();
            setCoursesList(uniqueCourses);
          }
        } else {
          setError("Failed to load universities");
        }
      } catch (err) {
        console.error("Error fetching universities:", err);
        setError("Error loading universities");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUniversities();
  }, []);

  useEffect(() => {
    const countryParam = searchParams.get("country");
    const courseParam = searchParams.get("course");
    const categoryParam = searchParams.get("category");
    if (countryParam) {
      setSelectedCountry(countryParam);
    }
    if (courseParam) {
      setSelectedCourse(courseParam);
    }
    if (categoryParam) {
      const cat = categoryParam.toLowerCase();
      if (cat === "domestic") {
        setSelectedCategory("Domestic");
      } else if (cat === "overseas") {
        setSelectedCategory("Overseas");
      } else {
        setSelectedCategory("All");
      }
    }
  }, [searchParams]);

  useEffect(() => {
    let filtered = universities;

    if (searchQuery) {
      filtered = filtered.filter(
        (uni) =>
          uni.universityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          uni.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          uni.country?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter(
        (uni) => (uni.category || "Domestic") === selectedCategory
      );
    }

    if (selectedCountry && selectedCountry !== "All Countries") {
      filtered = filtered.filter((uni) => {
        const universityCountry = (uni.country || "").toLowerCase();
        const selected = selectedCountry.toLowerCase();
        return (
          universityCountry === selected ||
          universityCountry.includes(selected) ||
          selected.includes(universityCountry)
        );
      });
    }

    if (selectedCourse && selectedCourse !== "All Courses") {
      filtered = filtered.filter((uni) => {
        // 1. Check in coursesOffered array (which may be broad categories)
        const hasInOffered = (uni.coursesOffered || []).some(
          (c) => c.toLowerCase() === selectedCourse.toLowerCase()
        );
        if (hasInOffered) return true;

        // 2. Fallback: Check inside detailed courses array by mapping name to categories
        const hasInCourses = (uni.courses || []).some((c) => {
          const name = (c.courseName || "").toLowerCase();
          const selected = selectedCourse.toLowerCase();

          if (name.includes(selected)) return true;

          if (selected === "management" && (name.includes("mba") || name.includes("business") || name.includes("management"))) return true;
          if (selected === "science" && (name.includes("computer") || name.includes("data") || name.includes("cyber") || name.includes("science") || name.includes("information technology") || name.includes("it"))) return true;
          if (selected === "allied health" && (name.includes("nursing") || name.includes("physiotherapy") || name.includes("therapy") || name.includes("health"))) return true;
          if (selected === "medicine" && (name.includes("medicine") || name.includes("surgery") || name.includes("dental") || name.includes("mbbs") || name.includes("bds"))) return true;
          if (selected === "commerce" && (name.includes("accounting") || name.includes("finance") || name.includes("banking") || name.includes("commerce"))) return true;

          return false;
        });

        return hasInCourses;
      });
    }

    setFilteredUniversities(filtered);
  }, [searchQuery, selectedCategory, selectedCountry, selectedCourse, universities]);

  const handleViewDetails = (slug) => {
    router.push(`/university/${slug}`);
  };

<<<<<<< HEAD
  const handleApplyNow = (slug) => {
    router.push(`/contact?university=${slug}`);
  };

  const getFilteredCountries = () => {
    let list = universities;
    if (selectedCategory && selectedCategory !== "All") {
      list = list.filter(uni => (uni.category || "Domestic") === selectedCategory);
    }
    const uniqueCountries = [
      ...new Set(list.map((uni) => uni.country)),
    ].filter(Boolean);
    return uniqueCountries.sort();
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setSelectedCountry("All Countries");
  };

=======
>>>>>>> 923b55307a620e1e98aab32b32e682fe0c5f6709
  const getLogo = (uni) => {
    if (!uni) return null;
    // Prioritize the logo from database if available
    if (uni.logo) return uni.logo;

    const name = uni.universityName.toLowerCase();
    if (name.includes("melbourne")) return "/melbourne-logo.jpg";
    if (name.includes("arizona state") || name.includes("asu")) return "/logos/asu.png";
    if (name.includes("birmingham")) return "/logos/birmingham.png";
    return null;
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section with Wave */}
      <section className="relative pt-32 pb-48 bg-[#1e2235] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-xl md:text-3xl font-medium max-w-4xl mx-auto leading-relaxed mb-10"
          >
            Choose a university that fuels your passion & purpose and that quenches your academic & career pursuits.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button className="bg-[#f07b4e] hover:bg-[#d96b40] text-white px-8 py-6 rounded-xl text-lg font-bold shadow-lg shadow-orange-900/20 transition-all hover:-translate-y-1">
              Talk to an Expert
            </Button>
          </motion.div>
        </div>

        {/* Decorative Stars/Sparkles */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/20 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white/10 rounded-full animate-bounce" />
        <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-white/30 rounded-full animate-pulse" />

        {/* Wave Background Attachment */}
        <div className="absolute bottom-0 left-0 right-0 h-32 w-full bg-white transition-all overflow-hidden" style={{ borderRadius: '50% 50% 0 0 / 100% 100% 0 0' }}></div>
      </section>

      <div className="relative -mt-32 pb-20 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Filters Row: Country + Course */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 mb-8">
            <h3 className="text-xl font-bold text-slate-800 text-center mb-5">Filter Universities</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Country Filter */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Study Destination</label>
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="w-full h-12 bg-white border-slate-200 rounded-xl shadow-sm text-base text-slate-700 px-4 focus:ring-4 focus:ring-blue-500/10">
                    <SelectValue placeholder="All Countries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Countries">All Countries</SelectItem>
                    {getFilteredCountries().map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Course Offered Filter */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">Course / Discipline</label>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger className="w-full h-12 bg-white border-slate-200 rounded-xl shadow-sm text-base text-slate-700 px-4 focus:ring-4 focus:ring-blue-500/10">
                    <SelectValue placeholder="All Courses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Courses">All Courses</SelectItem>
                    {coursesList.map((course) => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex gap-3 justify-center mb-12 flex-wrap">
            {["All", "Domestic", "Overseas"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold border transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? cat === "Overseas"
                      ? "bg-violet-600 text-white border-violet-600 shadow-md shadow-violet-200"
                      : cat === "Domestic"
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200"
                      : "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-sm"
                }`}
              >
                {cat === "Domestic" ? "🏠 Domestic" : cat === "Overseas" ? "✈️ Overseas" : "All Universities"}
              </button>
            ))}
          </div>

          {/* Results Summary and Search Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <h4 className="text-slate-500 font-medium">
              Showing <span className="text-slate-900 font-bold">{selectedCategory === "All" ? "All" : selectedCategory}</span> Universities in <span className="text-slate-900 font-bold">{selectedCountry}</span>
            </h4>

            <div className="relative w-full sm:w-96 group">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10 group-focus-within:text-blue-500 transition-colors" />
              <Input
                placeholder="Search Universities"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-11 h-12 bg-white border-slate-100 rounded-xl shadow-sm focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* Content Grid */}
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-32">
                <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4" />
                <p className="text-slate-600 font-medium">Fetching best universities...</p>
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
            ) : filteredUniversities.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-20 text-center shadow-sm border border-slate-100"
              >
                <Search className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">No Results Found</h3>
                <p className="text-slate-500">Try adjusting your filters or search keywords.</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredUniversities.map((uni, index) => (
                  <motion.div
                    layout
                    key={uni._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-[1.5rem] p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col items-center text-center group"
                  >
                    {/* University Logo */}
                    <div className="w-full h-32 flex items-center justify-center mb-6">
                      {getLogo(uni) ? (
                        <img
                          src={getLogo(uni)}
                          alt={uni.universityName}
                          className="max-h-24 max-w-[80%] object-contain"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                          <Globe className="w-8 h-8 text-slate-300" />
                        </div>
                      )}
                    </div>

                    {/* Divider (Thin) */}
                    <div className="w-full h-px bg-slate-100 mb-6" />

                    {/* Name & Location */}
                    <h3 className="text-lg font-bold text-slate-900 mb-2 min-h-[3rem] line-clamp-2 leading-tight">
                      {uni.universityName}
                    </h3>
                    <p className="text-sm text-slate-600 font-medium mb-4 h-10 line-clamp-2">
                      {uni.city && `${uni.city}, `}{uni.country}
                    </p>

                    {/* Website */}
                    <p className="text-[12px] text-slate-500 font-medium mb-8 truncate w-full">
                      {uni.website ? uni.website.replace(/^https?:\/\/(www\.)?/, "") : "No website available"}
                    </p>

                    {/* Action Buttons */}
                    <div className="w-full mt-auto">
                      <Button
                        variant="outline"
                        onClick={() => handleViewDetails(uni.slug)}
                        className="rounded-xl border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 h-11 text-xs font-bold w-full"
                      >
                        Know More
                      </Button>
                    </div>
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
