"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, X } from "lucide-react"
import { motion } from "framer-motion"

export default function SliderAdminPage() {
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    category: "Education",
    backgroundColor: "from-slate-950 to-slate-900",
    glowColor: "purple",
    primaryButtonText: "Explore Programs",
    primaryButtonLink: "/services",
    secondaryButtonText: "",
    secondaryButtonLink: "",
    stats: [
      { label: "Stat 1", value: "500+" },
      { label: "Stat 2", value: "95%" },
      { label: "Stat 3", value: "50+" },
    ],
    floatingCards: [],
    isActive: true,
  })

  const backgroundGradients = [
    "from-slate-950 to-slate-900",
    "from-purple-950 to-slate-900",
    "from-blue-950 to-slate-900",
    "from-cyan-950 to-slate-900",
  ]

  const glowColors = ["purple", "cyan", "pink", "blue", "green"]
  const categories = ["Education", "Career", "Immigration", "Recruitment", "Vacation", "Special Offer"]

  useEffect(() => {
    fetchSlides()
  }, [])

  const fetchSlides = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/slider")
      if (!response.ok) throw new Error("Failed to fetch slides")
      const data = await response.json()
      setSlides(data.slides || [])
      setError(null)
    } catch (err) {
      console.error("Error fetching slides:", err)
      setError("Failed to load slides")
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)

      const slidesToSave = editingId
        ? slides.map((s) => (s._id === editingId ? { ...form, _id: editingId } : s))
        : [...slides, { ...form, _id: Date.now().toString() }]

      const response = await fetch("/api/slider", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slides: slidesToSave }),
      })

      if (!response.ok) throw new Error("Failed to save slide")

      await fetchSlides()
      resetForm()
      setError(null)
    } catch (err) {
      console.error("Error saving slide:", err)
      setError("Failed to save slide")
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (slide) => {
    setForm(slide)
    setEditingId(slide._id)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleDelete = async (slideId) => {
    if (!confirm("Are you sure you want to delete this slide?")) return

    try {
      const slidesToSave = slides.filter((s) => s._id !== slideId)
      const response = await fetch("/api/slider", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slides: slidesToSave }),
      })

      if (!response.ok) throw new Error("Failed to delete slide")
      await fetchSlides()
    } catch (err) {
      console.error("Error deleting slide:", err)
      setError("Failed to delete slide")
    }
  }

  const handleToggleActive = async (slideId) => {
    const updatedSlides = slides.map((s) =>
      s._id === slideId ? { ...s, isActive: !s.isActive } : s
    )

    try {
      const response = await fetch("/api/slider", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slides: updatedSlides }),
      })

      if (!response.ok) throw new Error("Failed to update slide")
      setSlides(updatedSlides)
    } catch (err) {
      console.error("Error updating slide:", err)
      setError("Failed to update slide")
    }
  }

  const resetForm = () => {
    setForm({
      title: "",
      subtitle: "",
      description: "",
      image: "",
      category: "Education",
      backgroundColor: "from-slate-950 to-slate-900",
      glowColor: "purple",
      primaryButtonText: "Explore Programs",
      primaryButtonLink: "/services",
      secondaryButtonText: "",
      secondaryButtonLink: "",
      stats: [
        { label: "Stat 1", value: "500+" },
        { label: "Stat 2", value: "95%" },
        { label: "Stat 3", value: "50+" },
      ],
      floatingCards: [],
      isActive: true,
    })
    setEditingId(null)
  }

  const handleStatChange = (index, field, value) => {
    const newStats = [...form.stats]
    newStats[index] = { ...newStats[index], [field]: value }
    setForm({ ...form, stats: newStats })
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-white mb-2">Slider Manager</h1>
          <p className="text-gray-400 mb-8">Manage hero slider cards and customize each slide</p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
              {error}
            </div>
          )}

          {/* Form Section */}
          <motion.div
            className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-8 mb-12 backdrop-blur-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingId ? "Edit Slide" : "Create New Slide"}
              </h2>
              {editingId && (
                <button
                  onClick={resetForm}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              )}
            </div>

            {/* Title and Subtitle */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Main Title *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g., Transform Your Dreams"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  placeholder="e.g., Into Global Opportunities"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 outline-none transition"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Detailed description of this slide"
                rows="3"
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 outline-none transition resize-none"
              />
            </div>

            {/* Image URL */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Background Image URL
              </label>
              <input
                type="url"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 outline-none transition"
              />
              {form.image && (
                <div className="mt-4 rounded-lg overflow-hidden border border-slate-700 h-40">
                  <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            {/* Category, Colors, Glow */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:border-cyan-500 outline-none transition"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Background Gradient
                </label>
                <select
                  value={form.backgroundColor}
                  onChange={(e) => setForm({ ...form, backgroundColor: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:border-cyan-500 outline-none transition"
                >
                  {backgroundGradients.map((grad) => (
                    <option key={grad} value={grad}>
                      {grad}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Glow Color
                </label>
                <select
                  value={form.glowColor}
                  onChange={(e) => setForm({ ...form, glowColor: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:border-cyan-500 outline-none transition"
                >
                  {glowColors.map((color) => (
                    <option key={color} value={color}>
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Buttons Info */}
            <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-blue-300">
                <strong>💡 Link Types:</strong> Use internal links (e.g., <code className="bg-slate-800 px-2 py-1 rounded">/services</code>) for your website pages, or external links (e.g., <code className="bg-slate-800 px-2 py-1 rounded">https://example.com</code>) for external websites. External links open in a new tab.
              </p>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Primary Button Text
                </label>
                <input
                  type="text"
                  value={form.primaryButtonText}
                  onChange={(e) => setForm({ ...form, primaryButtonText: e.target.value })}
                  placeholder="e.g., Explore Programs"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Primary Button Link
                  <span className="text-xs text-gray-400 ml-2">(Internal: /services | External: https://example.com)</span>
                </label>
                <input
                  type="text"
                  value={form.primaryButtonLink}
                  onChange={(e) => setForm({ ...form, primaryButtonLink: e.target.value })}
                  placeholder="/services or https://example.com"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Secondary Button Text (Optional)
                </label>
                <input
                  type="text"
                  value={form.secondaryButtonText}
                  onChange={(e) => setForm({ ...form, secondaryButtonText: e.target.value })}
                  placeholder="e.g., Book Consultation"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Secondary Button Link
                  <span className="text-xs text-gray-400 ml-2">(Internal: /contact | External: https://example.com)</span>
                </label>
                <input
                  type="text"
                  value={form.secondaryButtonLink}
                  onChange={(e) => setForm({ ...form, secondaryButtonLink: e.target.value })}
                  placeholder="/contact or https://example.com"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 outline-none transition"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Statistics</h3>
              {form.stats.map((stat, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => handleStatChange(index, "label", e.target.value)}
                    placeholder="Stat label"
                    className="px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 outline-none transition"
                  />
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => handleStatChange(index, "value", e.target.value)}
                    placeholder="Stat value (e.g., 500+)"
                    className="px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 outline-none transition"
                  />
                </div>
              ))}
            </div>

            {/* Save Button */}
            <div className="flex gap-4">
              <motion.button
                onClick={handleSave}
                disabled={saving || !form.title}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white font-semibold transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : editingId ? "Update Slide" : "Create Slide"}
              </motion.button>
              {editingId && (
                <motion.button
                  onClick={resetForm}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-semibold transition"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Slides List */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading slides...</p>
            </div>
          ) : (
            <motion.div className="space-y-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Your Slides ({slides.length})</h2>
              </div>

              {slides.length === 0 ? (
                <p className="text-center text-gray-400 py-8">No slides yet. Create your first one!</p>
              ) : (
                slides.map((slide, index) => (
                  <motion.div
                    key={slide._id}
                    className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6 backdrop-blur-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex gap-6">
                      {slide.image && (
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{slide.title}</h3>
                        <p className="text-gray-400 text-sm mb-3">{slide.subtitle}</p>
                        <div className="flex gap-3 flex-wrap">
                          <span className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-gray-300">
                            {slide.category}
                          </span>
                          <span className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-gray-300">
                            {slide.glowColor} glow
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleToggleActive(slide._id)}
                          className={`p-3 rounded-lg transition ${slide.isActive
                              ? "bg-cyan-600/20 text-cyan-400 border border-cyan-500/50"
                              : "bg-slate-700/50 text-gray-400 border border-slate-600"
                            }`}
                          title={slide.isActive ? "Deactivate" : "Activate"}
                        >
                          {slide.isActive ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleEdit(slide)}
                          className="p-3 bg-blue-600/20 text-blue-400 border border-blue-500/50 rounded-lg hover:bg-blue-600/30 transition"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(slide._id)}
                          className="p-3 bg-red-600/20 text-red-400 border border-red-500/50 rounded-lg hover:bg-red-600/30 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
