"use client";

export const dynamic = 'force-dynamic';

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Shield, Loader2, LockKeyhole, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function AdminLoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const from = searchParams.get("from");
        if (from) {
            setError("");
        }
    }, [searchParams]);

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await fetch("/api/admin/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const result = await response.json().catch(() => ({}));
                throw new Error(result.message || "Login failed");
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
        <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_35%),linear-gradient(180deg,#f8fbff_0%,#eef5ff_55%,#eaf2ff_100%)] px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center justify-center">
                <div className="grid w-full overflow-hidden rounded-[32px] border border-blue-200/70 bg-white/90 shadow-[0_30px_80px_rgba(30,64,175,0.12)] backdrop-blur md:grid-cols-[1.1fr_0.9fr]">
                    <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-sky-500 px-8 py-10 text-white sm:px-10 sm:py-12">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.24),_transparent_28%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.16),_transparent_26%)]" />
                        <div className="relative z-10 flex h-full flex-col justify-between gap-10">
                            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/90">
                                <Shield className="h-4 w-4" />
                                Admin Access Only
                            </div>

                            <div className="space-y-5">
                                <h1 className="max-w-md text-4xl font-black tracking-tight sm:text-5xl">
                                    Secure the admin panel before editing content.
                                </h1>
                                <p className="max-w-md text-sm leading-7 text-white/85 sm:text-base">
                                    Use the admin credentials to manage universities, banners, and sliding text. Public visitors will be redirected away from the dashboard.
                                </p>
                            </div>

                            <div className="grid gap-3 text-sm text-white/85">
                                <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
                                    Protected routes: universities, banners, ticker, and dashboard
                                </div>
                                <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3">
                                    Session cookie is required to continue
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="px-6 py-10 sm:px-8 sm:py-12 lg:px-10">
                        <div className="mx-auto max-w-md">
                            <div className="mb-8 flex items-center gap-3 text-blue-700">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                                    <LockKeyhole className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-blue-500">
                                        Login Portal
                                    </p>
                                    <h2 className="text-2xl font-bold text-slate-900">
                                        Admin Sign In
                                    </h2>
                                </div>
                            </div>

                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <label htmlFor="username" className="text-sm font-medium text-slate-700">
                                        Username
                                    </label>
                                    <Input
                                        id="username"
                                        value={username}
                                        onChange={(event) => setUsername(event.target.value)}
                                        placeholder="Enter admin username"
                                        autoComplete="username"
                                        className="h-12 rounded-2xl border-slate-200 bg-slate-50 px-4 text-slate-900 shadow-sm focus-visible:ring-blue-500"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="password" className="text-sm font-medium text-slate-700">
                                        Password
                                    </label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        placeholder="Enter admin password"
                                        autoComplete="current-password"
                                        className="h-12 rounded-2xl border-slate-200 bg-slate-50 px-4 text-slate-900 shadow-sm focus-visible:ring-blue-500"
                                    />
                                </div>

                                {error ? (
                                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                        {error}
                                    </div>
                                ) : null}

                                <Button
                                    type="submit"
                                    className="h-12 w-full rounded-2xl bg-blue-600 text-base font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <span className="inline-flex items-center gap-2">
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Signing in
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-2">
                                            Continue to dashboard
                                            <ArrowRight className="h-4 w-4" />
                                        </span>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

export default function AdminLoginPage() {
    return (
        <Suspense fallback={
            <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_35%),linear-gradient(180deg,#f8fbff_0%,#eef5ff_55%,#eaf2ff_100%)] flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </main>
        }>
            <AdminLoginForm />
        </Suspense>
    );
}
