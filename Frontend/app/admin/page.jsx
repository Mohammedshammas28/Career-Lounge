"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Book, 
  Image as ImageIcon, 
  Type, 
  BookOpen, 
  Briefcase, 
  Sparkles, 
  Inbox, 
  GraduationCap, 
  LayoutGrid, 
  AlertCircle, 
  RefreshCw, 
  LogOut, 
  ArrowUpRight,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    universities: 0,
    banners: 0,
    courses: 0,
    jobs: 0,
    leads: 0,
  });
  const [loading, setLoading] = useState(true);
  const [errorState, setErrorState] = useState(false);

  async function fetchStats() {
    setLoading(true);
    setErrorState(false);
    try {
      const [uniRes, bannerRes, courseRes, jobRes, leadRes] = await Promise.all([
        fetch("/api/universities").then(r => r.json()).catch(() => ({ success: false })),
        fetch("/api/banners").then(r => r.json()).catch(() => ({ success: false })),
        fetch("/api/courses").then(r => r.json()).catch(() => ({ success: false })),
        fetch("/api/jobs").then(r => r.json()).catch(() => ({ success: false })),
        fetch("/api/leads").then(r => r.json()).catch(() => [])
      ]);

      setStats({
        universities: uniRes.success ? (uniRes.data?.length || 0) : 0,
        banners: bannerRes.success ? (bannerRes.data?.length || 0) : 0,
        courses: courseRes.success ? (courseRes.data?.length || 0) : 0,
        jobs: jobRes.success ? (jobRes.data?.length || 0) : 0,
        leads: Array.isArray(leadRes) ? leadRes.length : 0,
      });
    } catch (err) {
      console.error("Error fetching admin stats:", err);
      setErrorState(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  const sections = [
    {
      title: "🏫 Academics & Institutions",
      description: "Manage partner colleges, program catalogs, and intakes.",
      color: "from-blue-600/10 to-indigo-600/5 border-blue-200/50 dark:border-blue-900/30",
      iconColor: "text-blue-600 bg-blue-50 dark:bg-blue-950/50",
      items: [
        {
          name: "Universities",
          description: "Manage college details, intake terms, fee configurations, and photo galleries.",
          path: "/admin/universities",
          count: stats.universities,
          icon: GraduationCap,
        },
        {
          name: "Courses Offered",
          description: "Manage specific fields, dynamic syllabi, prerequisites, and featured courses.",
          path: "/admin/courses",
          count: stats.courses,
          icon: BookOpen,
        }
      ]
    },
    {
      title: "💼 Career Opportunities",
      description: "Administer listings for local and overseas recruitment drives.",
      color: "from-emerald-600/10 to-teal-600/5 border-emerald-200/50 dark:border-emerald-900/30",
      iconColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50",
      items: [
        {
          name: "Job Roles",
          description: "Create or archive job roles, configure salaries, company logos, and requirements.",
          path: "/admin/jobs",
          count: stats.jobs,
          icon: Briefcase,
        }
      ]
    },
    {
      title: "📨 Engagement & CRM Leads",
      description: "Respond to user inquiries, consultations, and job applications.",
      color: "from-rose-600/10 to-orange-600/5 border-rose-200/50 dark:border-rose-900/30",
      iconColor: "text-rose-600 bg-rose-50 dark:bg-rose-950/50",
      items: [
        {
          name: "Leads Inbox",
          description: "Monitor admissions interest, contact submissions, and active job applicants.",
          path: "/admin/leads",
          count: stats.leads,
          icon: Inbox,
          highlight: true,
        }
      ]
    },
    {
      title: "📢 Marketing & Promotions",
      description: "Control promotional banners, ticker notifications, and layout elements.",
      color: "from-violet-600/10 to-purple-600/5 border-violet-200/50 dark:border-violet-900/30",
      iconColor: "text-violet-600 bg-violet-50 dark:bg-violet-950/50",
      items: [
        {
          name: "Dynamic Banners",
          description: "Manage high-impact offer sliders referencing university parameters dynamically.",
          path: "/admin/banners",
          count: stats.banners,
          icon: ImageIcon,
        },
        {
          name: "Home Page Cards",
          description: "Manage grids for career guidance, test preparations, and key destinations.",
          path: "/admin/homepage-cards",
          icon: Sparkles,
        },
        {
          name: "Notification Ticker",
          description: "Update the global sliding header ticker text running on the front-end.",
          path: "/admin/ticker",
          icon: Type,
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-50 pb-20">
      
      {/* Light Clean Header Banner */}
      <div className="relative overflow-hidden bg-white text-slate-900 py-10 px-6 lg:px-8 border-b border-slate-200 shadow-sm">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.06),_transparent_45%)]" />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                Control Center
              </span>
              {loading && <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />}
            </div>
            <h1 className="text-3xl font-black tracking-tight mt-2 text-slate-900">
              Admin Portal
            </h1>
            <p className="text-slate-500 mt-1.5 text-xs sm:text-sm">
              System dashboard to configure settings, database profiles, and review client communication logs.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <Button 
              onClick={fetchStats}
              variant="outline" 
              className="bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 shadow-sm rounded-xl text-xs"
            >
              <RefreshCw className="mr-2 h-3.5 w-3.5" />
              Refresh System
            </Button>
            <Button 
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white border-0 shadow-sm rounded-xl text-xs"
            >
              <LogOut className="mr-2 h-3.5 w-3.5" />
              Logout Session
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 mt-10">
        
        {/* Real-time System Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          {[
            { label: "Universities", val: stats.universities, icon: GraduationCap, color: "text-blue-500 bg-blue-500/10" },
            { label: "Active Offers", val: stats.banners, icon: ImageIcon, color: "text-purple-500 bg-purple-500/10" },
            { label: "Courses", val: stats.courses, icon: BookOpen, color: "text-rose-500 bg-rose-500/10" },
            { label: "Job Positions", val: stats.jobs, icon: Briefcase, color: "text-emerald-500 bg-emerald-500/10" },
            { label: "CRM Leads Inbox", val: stats.leads, icon: Inbox, color: "text-amber-500 bg-amber-500/10", glow: stats.leads > 0 }
          ].map((m, idx) => (
            <div 
              key={idx} 
              className={`relative overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/60 dark:border-zinc-800/60 p-5 shadow-sm transition hover:shadow-md ${
                m.glow ? 'ring-2 ring-amber-500/30 border-amber-300 dark:border-amber-700/50' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{m.label}</span>
                <div className={`p-2 rounded-lg ${m.color}`}>
                  <m.icon className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2 mt-4">
                <span className="text-2xl font-black tracking-tight">{loading ? "..." : m.val}</span>
                <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3 text-emerald-500" />
                  Live
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Sorted Categories Panel */}
        <div className="space-y-12">
          {sections.map((sect, sIdx) => (
            <section key={sIdx} className="space-y-4">
              <div>
                <h2 className="text-lg font-bold tracking-tight text-slate-800 dark:text-zinc-100">
                  {sect.title}
                </h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                  {sect.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sect.items.map((card, cIdx) => (
                  <Link href={card.path} key={cIdx} className="group">
                    <div className={`relative flex flex-col justify-between h-full rounded-2xl border bg-gradient-to-r p-6 shadow-sm cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-zinc-900 bg-white ${sect.color} ${
                      card.highlight ? 'ring-1 ring-rose-500/20 border-rose-300/40 hover:border-rose-400 dark:hover:border-rose-800' : 'border-slate-200/70 hover:border-slate-300 dark:border-zinc-800/80 dark:hover:border-zinc-700'
                    }`}>
                      <div>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {card.name}
                              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </h3>
                            <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed pr-8">
                              {card.description}
                            </p>
                          </div>
                          
                          <div className={`p-2.5 rounded-xl transition ${sect.iconColor}`}>
                            <card.icon className="w-5 h-5" />
                          </div>
                        </div>
                      </div>

                      {card.count !== undefined && (
                        <div className="mt-5 flex items-center justify-between border-t border-slate-100 dark:border-zinc-800/70 pt-4">
                          <span className="text-xs text-slate-500">Record entries</span>
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300">
                            {loading ? "..." : `${card.count} configured`}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Database Checklist Guide */}
        <div className="mt-14 bg-blue-900/5 dark:bg-zinc-900/30 rounded-2xl p-6 border border-blue-500/10">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300">
                Administrative Workflows Checklist
              </h3>
              <p className="text-xs text-blue-700/80 dark:text-blue-400/70 mt-1">
                For optimal page connection across the Career Lounge platform, keep these principles in mind:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-xs text-blue-800/90 dark:text-blue-400/90 mt-4 list-decimal pl-4">
                <li>
                  <strong>Add Universities First:</strong> Store academic data before linking banners. Banners dynamically pull images and courses from the university ID.
                </li>
                <li>
                  <strong>Use Valid Images:</strong> Always provide absolute URLs for university logos, banner graphics, and media galleries.
                </li>
                <li>
                  <strong>Normalize Deadlines:</strong> Setup correct Intake schedules to let the site automatically alert users about registration timeframes.
                </li>
                <li>
                  <strong>Review CRM Leads:</strong> Regularly inspect the Leads inbox to clear verification files and respond to consultation queries.
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
