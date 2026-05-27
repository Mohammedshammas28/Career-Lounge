"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Bar */}
            <div className="bg-white shadow sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
                    <Link href="/admin" className="flex items-center gap-2 font-bold text-lg">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg" />
                        Admin Panel
                    </Link>

                    <div className="flex gap-4">
                        <Link href="/">
                            <Button variant="outline" size="sm">
                                <ChevronLeft className="w-4 h-4 mr-2" />
                                Back to Site
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Breadcrumb Navigation */}
            <div className="bg-white border-b">
                <div className="max-w-6xl mx-auto px-8 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Link href="/admin" className="hover:text-blue-600">
                            Dashboard
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            {children}
        </div>
    );
}
