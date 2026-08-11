"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Plus, Edit2, Trash2, Upload, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function OffersAdminPage() {
  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [expandedOffer, setExpandedOffer] = useState(null)
  const [form, setForm] = useState({
    title: "",
    highlight: "",
    description: "",
    category: "Education",
    image: "",
    primaryButtonText: "Explore Offer",
    primaryButtonLink: "/services",
    secondaryButtonText: "",
    secondaryButtonLink: "",
    stats: [
      { label: "Achievement 1", value: "100+" },
      { label: "Achievement 2", value: "95%" },
      { label: "Achievement 3", value: "50+" },
    ],
    isActive: true,
  })

  const categories = ["Education", "Career", "Immigration", "Recruitment", "Vacation", "Special Offer"]

  useEffect(() => {
    fetchOffers()
  }, [])

  const fetchOffers = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/offers")
      if (!response.ok) throw new Error("Failed to fetch offers")
      const data = await response.json()
      setOffers(data.offers || [])
      setError(null)
    } catch (err) {
      console.error("Error fetching offers:", err)
      setError("Failed to load offers")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleStatChange = (index, field, value) => {
    const updatedStats = [...form.stats]
    updatedStats[index] = { ...updatedStats[index], [field]: value }
    setForm({ ...form, stats: updatedStats })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.title || !form.description || !form.image || !form.category) {
      setError("Please fill all required fields")
      return
    }

    try {
      setSaving(true)
      let updatedOffers

      if (editingId) {
        updatedOffers = offers.map((offer) =>
          offer._id === editingId ? { ...form, _id: editingId } : offer
        )
      } else {
        const newOffer = {
          ...form,
          _id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        }
        updatedOffers = [...offers, newOffer]
      }

      const response = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offers: updatedOffers }),
      })

      if (!response.ok) throw new Error("Failed to save offers")

      setOffers(updatedOffers)
      resetForm()
      setError(null)
    } catch (err) {
      console.error("Error saving offers:", err)
      setError(err.message || "Failed to save offers")
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (offer) => {
    setForm(offer)
    setEditingId(offer._id)
    setTimeout(() => {
      document.querySelector("form")?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 0)
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this offer?")) return

    try {
      setSaving(true)
      const updatedOffers = offers.filter((offer) => offer._id !== id)
      const response = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offers: updatedOffers }),
      })

      if (!response.ok) throw new Error("Failed to delete offer")

      setOffers(updatedOffers)
      resetForm()
      setError(null)
    } catch (err) {
      console.error("Error deleting offer:", err)
      setError(err.message || "Failed to delete offer")
    } finally {
      setSaving(false)
    }
  }

  const toggleActive = async (id) => {
    try {
      setSaving(true)
      const updatedOffers = offers.map((offer) =>
        offer._id === id ? { ...offer, isActive: !offer.isActive } : offer
      )
      const response = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offers: updatedOffers }),
      })

      if (!response.ok) throw new Error("Failed to toggle offer")
      setOffers(updatedOffers)
    } catch (err) {
      console.error("Error toggling offer:", err)
      setError("Failed to toggle offer status")
    } finally {
      setSaving(false)
    }
  }

  const resetForm = () => {
    setForm({
      title: "",
      highlight: "",
      description: "",
      category: "Education",
      image: "",
      primaryButtonText: "Explore Offer",
      primaryButtonLink: "/services",
      secondaryButtonText: "",
      secondaryButtonLink: "",
      stats: [
        { label: "Achievement 1", value: "100+" },
        { label: "Achievement 2", value: "95%" },
        { label: "Achievement 3", value: "50+" },
      ],
      isActive: true,
    })
    setEditingId(null)
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground">Loading offers...</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl font-bold text-foreground mb-2">Premium Offers Manager</h1>
            <p className="text-muted-foreground mb-8">
              Create and manage stunning offer banners for your homepage
            </p>
          </motion.div>

          {error && (
            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
              {error}
            </div>
          )}

          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-xl shadow-lg p-8 mb-12 space-y-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Plus className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-semibold text-foreground">
                {editingId ? "Edit Offer" : "Create New Offer"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Title <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g., Your Future Starts Here"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
                  required
                />
              </div>

              {/* Highlight */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Highlight Text (appears in gradient)
                </label>
                <input
                  type="text"
                  name="highlight"
                  placeholder="e.g., Study in Top Universities"
                  value={form.highlight}
                  onChange={handleChange}
                  className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Category <span className="text-destructive">*</span>
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description <span className="text-destructive">*</span>
                </label>
                <textarea
                  name="description"
                  placeholder="Detailed offer description..."
                  value={form.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-primary outline-none resize-none"
                  required
                />
              </div>

              {/* Image URL */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Image URL <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  name="image"
                  placeholder="https://images.unsplash.com/..."
                  value={form.image}
                  onChange={handleChange}
                  className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
                  required
                />
                {form.image && (
                  <div className="mt-3 rounded-lg overflow-hidden border border-border h-40">
                    <img
                      src={form.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23e5e7eb' width='100' height='100'/%3E%3C/svg%3E"
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Primary Button */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Primary Button Text
                </label>
                <input
                  type="text"
                  name="primaryButtonText"
                  placeholder="e.g., Explore Offer"
                  value={form.primaryButtonText}
                  onChange={handleChange}
                  className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Primary Button Link
                </label>
                <input
                  type="text"
                  name="primaryButtonLink"
                  placeholder="/services/education"
                  value={form.primaryButtonLink}
                  onChange={handleChange}
                  className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              {/* Secondary Button */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Secondary Button Text
                </label>
                <input
                  type="text"
                  name="secondaryButtonText"
                  placeholder="e.g., Book Consultation"
                  value={form.secondaryButtonText}
                  onChange={handleChange}
                  className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Secondary Button Link
                </label>
                <input
                  type="text"
                  name="secondaryButtonLink"
                  placeholder="/contact"
                  value={form.secondaryButtonLink}
                  onChange={handleChange}
                  className="w-full border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
            </div>

            {/* Stats Section */}
            <div className="border-t border-border pt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Statistics</h3>
              <div className="space-y-4">
                {form.stats.map((stat, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Label (e.g., Success Rate)"
                      value={stat.label}
                      onChange={(e) => handleStatChange(idx, "label", e.target.value)}
                      className="border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Value (e.g., 98%)"
                      value={stat.value}
                      onChange={(e) => handleStatChange(idx, "value", e.target.value)}
                      className="border border-border rounded-lg px-4 py-3 bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Active Toggle */}
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleChange}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm font-medium text-foreground">Active on Homepage</span>
              </label>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              <Button
                type="submit"
                disabled={saving}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-semibold"
              >
                {saving ? "Saving..." : editingId ? "Update Offer" : "Create Offer"}
              </Button>
              {editingId && (
                <Button
                  type="button"
                  onClick={resetForm}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-8 py-3 rounded-lg font-semibold"
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>

          {/* Offers List */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground mb-6">All Offers ({offers.length})</h2>

            {offers.length === 0 ? (
              <div className="text-center py-12 bg-card border border-border rounded-lg">
                <p className="text-muted-foreground">No offers yet. Create your first offer!</p>
              </div>
            ) : (
              offers.map((offer) => (
                <motion.div
                  key={offer._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row gap-6 p-6">
                    {/* Preview */}
                    <div className="w-full md:w-40 flex-shrink-0">
                      <div className="relative h-32 md:h-32 rounded-lg overflow-hidden border border-border bg-muted">
                        <img
                          src={offer.image}
                          alt={offer.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none"
                          }}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-foreground">{offer.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{offer.category}</p>
                        </div>
                        <button
                          onClick={() => toggleActive(offer._id)}
                          disabled={saving}
                          className="p-2 hover:bg-secondary rounded-lg transition"
                        >
                          {offer.isActive ? (
                            <Eye className="w-5 h-5 text-green-500" />
                          ) : (
                            <EyeOff className="w-5 h-5 text-gray-500" />
                          )}
                        </button>
                      </div>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                        {offer.description}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {offer.primaryButtonText}
                        </span>
                        {offer.secondaryButtonText && (
                          <span className="text-xs bg-secondary/10 text-secondary-foreground px-2 py-1 rounded">
                            {offer.secondaryButtonText}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 items-center justify-end md:flex-col md:justify-center">
                      <Button
                        onClick={() => handleEdit(offer)}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-lg flex items-center gap-2"
                        disabled={saving}
                      >
                        <Edit2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Edit</span>
                      </Button>
                      <Button
                        onClick={() => handleDelete(offer._id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90 px-4 py-2 rounded-lg flex items-center gap-2"
                        disabled={saving}
                      >
                        <Trash2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Delete</span>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
