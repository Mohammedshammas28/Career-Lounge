"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Trash2, Plus, UploadCloud } from "lucide-react"

export default function BannerAdminPage() {
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [uploadingByIndex, setUploadingByIndex] = useState({})
  const [uploadError, setUploadError] = useState("")

  useEffect(() => {
    fetchBannerData()
  }, [])

  const fetchBannerData = async () => {
    try {
      const response = await fetch("/api/banner")
      const data = await response.json()
      setSlides(data.slides || [])
    } catch (error) {
      console.error("Error fetching banner:", error)
      setMessage("Error loading banner data")
    } finally {
      setLoading(false)
    }
  }

  const handleSlideChange = (idx, field, value) => {
    const newSlides = [...slides]
    newSlides[idx] = { ...newSlides[idx], [field]: value }
    setSlides(newSlides)
  }

  const handleAddSlide = () => {
    const newSlide = {
      id: Math.max(...slides.map(s => s.id), 0) + 1,
      image: "",
      title: "",
      description: "",
      ctaText: "Learn More",
      ctaLink: "/",
    }
    setSlides([...slides, newSlide])
  }

  const handleDeleteSlide = (idx) => {
    setSlides(slides.filter((_, i) => i !== idx))
  }

  const uploadSlideImage = async (file, idx) => {
    if (!file) return

    setUploadError("")
    setUploadingByIndex((prev) => ({ ...prev, [idx]: true }))

    try {
      const body = new FormData()
      body.append("file", file)
      body.append("folder", "banner")

      const response = await fetch("/api/upload-image", {
        method: "POST",
        body,
      })

      const result = await response.json()
      if (!response.ok || !result.url) {
        throw new Error(result.error || "Upload failed")
      }

      handleSlideChange(idx, "image", result.url)
    } catch (error) {
      console.error("Banner image upload failed:", error)
      setUploadError(error.message || "Could not upload image")
    } finally {
      setUploadingByIndex((prev) => ({ ...prev, [idx]: false }))
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch("/api/banner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slides }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage("Banner updated successfully!")
        setTimeout(() => setMessage(""), 3000)
      } else {
        setMessage(data.error || "Failed to save banner")
      }
    } catch (error) {
      console.error("Error saving banner:", error)
      setMessage("Error saving banner")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center h-96">
          <p>Loading...</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Banner Manager</h1>
          <p className="text-muted-foreground mb-8">Edit and manage your home page banner slides</p>

          {message && (
            <div className={`p-4 rounded-lg mb-6 ${message.includes("successfully") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
              {message}
            </div>
          )}

          <div className="space-y-6">
            {slides.map((slide, idx) => (
              <Card key={slide.id} className="p-6 space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Slide {idx + 1}</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteSlide(idx)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Image</label>
                  <input
                    id={`banner-upload-${idx}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => uploadSlideImage(e.target.files?.[0], idx)}
                  />
                  <div
                    className="w-full rounded-lg border-2 border-dashed border-border bg-muted/40 p-4 text-center"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault()
                      uploadSlideImage(e.dataTransfer.files?.[0], idx)
                    }}
                  >
                    <UploadCloud className="w-5 h-5 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Drop image here</p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById(`banner-upload-${idx}`)?.click()}
                      disabled={Boolean(uploadingByIndex[idx])}
                    >
                      {uploadingByIndex[idx] ? "Uploading..." : "Browse Image"}
                    </Button>
                  </div>
                  {slide.image && (
                    <div className="mt-3">
                      <img
                        src={slide.image}
                        alt={`Slide ${idx + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                </div>

                {/* Title */}
                <div>

                  {uploadError && (
                    <p className="text-sm font-medium text-red-600">{uploadError}</p>
                  )}
                  <label className="block text-sm font-medium text-foreground mb-2">Title</label>
                  <Input
                    type="text"
                    placeholder="Slide title"
                    value={slide.title}
                    onChange={(e) => handleSlideChange(idx, "title", e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                  <Textarea
                    placeholder="Slide description"
                    value={slide.description}
                    onChange={(e) => handleSlideChange(idx, "description", e.target.value)}
                    className="w-full h-24"
                  />
                </div>

                {/* CTA Text */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Call-to-Action Text</label>
                  <Input
                    type="text"
                    placeholder="e.g., Get Started, Learn More"
                    value={slide.ctaText}
                    onChange={(e) => handleSlideChange(idx, "ctaText", e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* CTA Link */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Call-to-Action Link</label>
                  <Input
                    type="text"
                    placeholder="/services/career-counselling"
                    value={slide.ctaLink}
                    onChange={(e) => handleSlideChange(idx, "ctaLink", e.target.value)}
                    className="w-full"
                  />
                </div>
              </Card>
            ))}

            {/* Add New Slide Button */}
            <Button
              onClick={handleAddSlide}
              variant="outline"
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Slide
            </Button>

            {/* Save Button */}
            <Button
              onClick={handleSave}
              disabled={saving}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
