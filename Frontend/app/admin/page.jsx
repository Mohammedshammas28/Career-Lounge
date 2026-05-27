"use client";

import Link from "next/link";
import { Book, Image, Type } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage universities and banners</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Universities Card */}
          <Link href="/admin/universities">
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-8 cursor-pointer h-full">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Universities
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Add, edit, and manage university information. Store all university data including courses, intakes, and images.
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Book className="w-6 h-6 text-blue-600" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" className="w-full">
                  Manage Universities
                </Button>
              </div>
            </div>
          </Link>

          {/* Banners Card */}
          <Link href="/admin/banners">
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-8 cursor-pointer h-full">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Banners
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Create offer banners by selecting universities. Add offer text, deadlines, and customize appearance.
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <Image className="w-6 h-6 text-green-600" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" className="w-full">
                  Manage Banners
                </Button>
              </div>
            </div>
          </Link>

          {/* Ticker Card */}
          <Link href="/admin/ticker">
            <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-8 cursor-pointer h-full">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Sliding Text
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Update the notification text that scrolls below the header.
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Type className="w-6 h-6 text-purple-600" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" className="w-full">
                  Manage Ticker
                </Button>
              </div>
            </div>
          </Link>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            How It Works
          </h3>
          <ol className="space-y-3 text-blue-800">
            <li className="flex gap-3">
              <span className="font-bold">1.</span>
              <span>Add university information once (name, country, courses, intakes, images)</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">2.</span>
              <span>Create banners by selecting universities from the list</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">3.</span>
              <span>Add offer-specific details (offer text, deadline, button text)</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">4.</span>
              <span>Banners automatically fetch university data (country, courses, images)</span>
            </li>
            <li className="flex gap-3">
              <span className="font-bold">5.</span>
              <span>Update university info once, all banners update automatically</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
