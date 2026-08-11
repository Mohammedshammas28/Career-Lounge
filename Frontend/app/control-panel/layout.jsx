"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
    ChevronLeft,
    LogOut,
    GraduationCap,
    BookOpen,
    Briefcase,
    Inbox,
    Image as ImageIcon,
    Sparkles,
    Type,
    LayoutGrid,
    Menu,
    X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
    { label: "Dashboard", href: "/control-panel", icon: LayoutGrid },
    { label: "Universities", href: "/control-panel/universities", icon: GraduationCap },
    { label: "Courses", href: "/control-panel/courses", icon: BookOpen },
    { label: "Jobs", href: "/control-panel/jobs", icon: Briefcase },
    { label: "Leads", href: "/control-panel/leads", icon: Inbox },
    { label: "Banners", href: "/control-panel/banners", icon: ImageIcon },
    { label: "Home Cards", href: "/control-panel/homepage-cards", icon: Sparkles },
    { label: "Ticker", href: "/control-panel/ticker", icon: Type },
];

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const isLoginPage = pathname === "/control-panel/login" || pathname === "/admin/login";
    const [sidebarOpen, setSidebarOpen] = useState(false);

    async function handleLogout() {
        await fetch("/api/admin/logout", { method: "POST" });
        router.replace("/control-panel/login");
        router.refresh();
    }

    if (isLoginPage) {
        return <div className="min-h-screen bg-white">{children}</div>;
    }

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans antialiased text-slate-800">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-50 bg-white border-b border-slate-200/80 shadow-xs backdrop-blur-md">
                <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 lg:px-8 py-3 gap-4">
                    {/* Left: Logo & Mobile Toggle */}
                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            className="xl:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 focus:outline-none"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            aria-label="Toggle menu"
                        >
                            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>

                        <Link href="/control-panel" className="flex items-center gap-3 group">
                            <img
                                src="/Careerlounge logo (1).png"
                                alt="Career Lounge Logo"
                                className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
                            />
                            <span className="text-slate-800 font-black text-sm sm:text-base border-l border-slate-200 pl-3 hidden sm:inline-block tracking-tight">
                                Control Panel
                            </span>
                        </Link>
                    </div>

                    {/* Center: Navigation Pills (Desktop) */}
                    <nav className="hidden xl:flex items-center gap-1 overflow-x-auto py-0.5 scrollbar-none">
                        {NAV_LINKS.map((link) => {
                            const Icon = link.icon;
                            const isActive =
                                link.href === "/control-panel"
                                    ? pathname === "/control-panel"
                                    : pathname.startsWith(link.href);
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 whitespace-nowrap ${
                                        isActive
                                            ? "bg-blue-600 text-white shadow-xs font-semibold"
                                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                    }`}
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2.5 shrink-0">
                        <Link href="/">
                            <Button
                                variant="outline"
                                size="sm"
                                className="h-8 px-3 text-xs font-semibold border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-lg shadow-2xs"
                            >
                                <ChevronLeft className="mr-1 h-3.5 w-3.5 text-slate-500" />
                                Back to Site
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleLogout}
                            className="h-8 px-3 text-xs font-semibold border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 rounded-lg shadow-2xs"
                        >
                            <LogOut className="mr-1.5 h-3.5 w-3.5" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Drawer */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs xl:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-slate-200 shadow-2xl transform transition-transform duration-300 ease-in-out xl:hidden ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between p-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                        <img src="/Careerlounge logo (1).png" alt="Logo" className="h-7 w-auto" />
                        <span className="font-extrabold text-slate-800 text-xs">Control Panel</span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <nav className="p-3 space-y-1 overflow-y-auto">
                    {NAV_LINKS.map((link) => {
                        const Icon = link.icon;
                        const isActive =
                            link.href === "/control-panel"
                                ? pathname === "/control-panel"
                                : pathname.startsWith(link.href);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                    isActive
                                        ? "bg-blue-600 text-white shadow-sm"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                }`}
                            >
                                <Icon className="w-4 h-4 shrink-0" />
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100 bg-slate-50/50">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200/60 transition"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout Session
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 w-full">
                {children}
            </main>
        </div>
    );
}
