"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const isLoginPage = pathname === "/admin/login";

    async function handleLogout() {
        await fetch("/api/admin/logout", { method: "POST" });
        router.replace("/admin/login");
        router.refresh();
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {!isLoginPage ? (
                <>
                    {/* Navigation Bar */}
                    <div className="sticky top-0 z-50 bg-white shadow">
                        <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4">
                            <Link href="/admin" className="flex items-center gap-2 text-lg font-bold">
                                <div className="h-8 w-8 rounded-lg bg-blue-600" />
                                Admin Panel
                            </Link>

                            <div className="flex gap-3">
                                <Button variant="outline" size="sm" onClick={handleLogout}>
                                    Logout
                                </Button>
                                <Link href="/">
                                    <Button variant="outline" size="sm">
                                        <ChevronLeft className="mr-2 h-4 w-4" />
                                        Back to Site
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>


                </>
            ) : null}

            {/* Main Content */}
            {children}
        </div>
    );
}
