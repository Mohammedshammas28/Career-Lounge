"use client";

export const dynamic = 'force-dynamic';

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, LockKeyhole, ArrowRight, Eye, EyeOff } from "lucide-react";

function AdminLoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const from = searchParams.get("from");
        if (from) setError("");
    }, [searchParams]);

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const result = await response.json().catch(() => ({}));
                throw new Error(result.message || "Invalid credentials");
            }

            const fromPath = searchParams.get("from");
            const destination = fromPath && fromPath.startsWith("/admin") ? fromPath : "/admin";
            router.replace(destination);
            router.refresh();
        } catch (loginError) {
            setError(loginError.message || "Unable to log in");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="min-h-screen relative flex items-center justify-center overflow-hidden bg-slate-50">
            {/* Soft decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-purple-100/60 blur-[120px]" />
                <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-blue-100/60 blur-[120px]" />
            </div>

            {/* Login Card */}
            <div className="relative z-10 w-full max-w-md mx-auto px-4">
                <div className="rounded-2xl border border-slate-200/80 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 sm:p-10">

                    {/* Logo + Icon */}
                    <div className="flex flex-col items-center mb-8 text-center">
                        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 mb-4 shadow-lg shadow-purple-500/20">
                            <LockKeyhole className="h-7 w-7 text-white" />
                        </div>
                        <img
                            src="/Careerlounge logo (1).png"
                            alt="Career Lounge"
                            className="h-8 w-auto mb-3 object-contain"
                            onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        <p className="text-xs font-bold uppercase tracking-widest text-purple-600 mb-1">
                            Admin Portal
                        </p>
                        <h1 className="text-2xl font-black text-slate-800">
                            Sign in to Dashboard
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Enter your credentials to continue
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Username */}
                        <div className="space-y-2">
                            <label htmlFor="username" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="admin"
                                autoComplete="username"
                                required
                                className="w-full h-12 px-4 rounded-xl border border-slate-200 text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all bg-slate-50/50"
                            />
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••"
                                    autoComplete="current-password"
                                    required
                                    className="w-full h-12 px-4 pr-12 rounded-xl border border-slate-200 text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all bg-slate-50/50"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div className="flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                                <span>⚠️</span>
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="relative w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-sm font-bold text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:from-purple-500 hover:to-blue-500 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 overflow-hidden group"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Authenticating...
                                </>
                            ) : (
                                <>
                                    Access Dashboard
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="mt-6 text-center text-[11px] text-slate-400">
                        Protected by session authentication · Career Lounge Admin
                    </p>
                </div>
            </div>
        </main>
    );
}

export default function AdminLoginPage() {
    return (
        <Suspense fallback={
            <main className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                    <p className="text-slate-500 text-sm">Loading...</p>
                </div>
            </main>
        }>
            <AdminLoginForm />
        </Suspense>
    );
}
