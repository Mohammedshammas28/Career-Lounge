"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Save, RefreshCw, Plus, Trash2, ChevronLeft, Sparkles, Eye, EyeOff } from "lucide-react"

export default function TickerAdminPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("success")

  useEffect(() => {
    fetchTickerData()
  }, [])

  const fetchTickerData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/ticker?t=${Date.now()}`, {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache",
        },
      })
      const data = await response.json()
      setItems(data.items || [])
    } catch (error) {
      console.warn("Error fetching ticker:", error)
      setMessage("Error loading ticker data")
      setMessageType("error")
    } finally {
      setLoading(false)
    }
  }

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      { id: Date.now().toString(), text: "", active: true, isNew: true },
    ])
  }

  const handleRemoveItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleTextChange = (id, newText) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text: newText } : item))
    )
  }

  const handleToggleActive = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, active: !item.active } : item))
    )
  }

  const handleToggleIsNew = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isNew: !item.isNew } : item))
    )
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage("")
    try {
      const response = await fetch("/api/ticker", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setMessage("Ticker updated successfully!")
        setMessageType("success")
        if (data.data?.items) {
          setItems(data.data.items)
        }
        setTimeout(() => setMessage(""), 4000)
      } else {
        setMessage(data.error || "Failed to save ticker")
        setMessageType("error")
      }
    } catch (error) {
      console.warn("Error saving ticker:", error)
      setMessage(error.message || "Error saving ticker")
      setMessageType("error")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-2">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground uppercase tracking-widest text-xs">Loading Ticker Data...</p>
        </div>
      </div>
    )
  }

  const activeItems = items.filter((item) => item.active)

  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/control-panel">
            <Button variant="ghost" size="sm" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Sliding Text Manager</h1>
            <p className="text-muted-foreground">Manage the notifications that scroll below the header.</p>
          </div>
          <Button onClick={handleAddItem} variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Add More Text
          </Button>
        </div>

        <Card className="p-8 border-primary/20 bg-card/50 backdrop-blur-sm shadow-xl">
          <div className="space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-8 border-2 border-dashed border-border rounded-xl">
                <p className="text-muted-foreground">No sliding text items yet. Click "Add More Text" to create one.</p>
              </div>
            ) : (
              items.map((item, index) => (
                <div key={item.id} className="relative group p-4 border border-border/50 rounded-lg bg-background/50 space-y-3">
                  <div className="flex gap-4 items-start">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-semibold text-muted-foreground uppercase">
                          Message #{index + 1}
                        </label>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => handleToggleIsNew(item.id)}
                            className={`text-xs px-2 py-0.5 rounded border transition-colors flex items-center gap-1 ${
                              item.isNew
                                ? "bg-amber-500/10 text-amber-500 border-amber-500/30"
                                : "text-muted-foreground border-border hover:bg-accent"
                            }`}
                            title="Toggle '✨ New' badge"
                          >
                            <Sparkles className="h-3 w-3" />
                            {item.isNew ? "Badge: ✨ New" : "Badge: Standard"}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleToggleActive(item.id)}
                            className={`text-xs px-2 py-0.5 rounded border transition-colors flex items-center gap-1 ${
                              item.active
                                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30"
                                : "bg-muted text-muted-foreground border-border hover:bg-accent"
                            }`}
                            title="Toggle Active status"
                          >
                            {item.active ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                            {item.active ? "Active" : "Hidden"}
                          </button>
                        </div>
                      </div>
                      <Input
                        value={item.text}
                        onChange={(e) => handleTextChange(item.id, e.target.value)}
                        placeholder="Enter sliding text message..."
                        className="bg-background/80"
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mt-6 text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div
                className={`text-sm font-medium ${
                  messageType === "error" ? "text-red-500" : "text-emerald-500"
                }`}
              >
                {message}
              </div>
              <div className="flex gap-4">
                <Button
                  onClick={handleSave}
                  disabled={saving || items.length === 0}
                  className="bg-primary hover:bg-primary/90 gap-2 px-8"
                >
                  {saving ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Live Preview Block */}
        <div className="mt-12 p-6 rounded-xl border border-dashed border-border bg-muted/30">
          <h3 className="text-sm font-semibold mb-4 text-foreground uppercase tracking-wider">Live Preview</h3>
          <div className="bg-gradient-to-r from-primary/20 to-primary/10 border-b border-primary/20 w-full overflow-hidden py-3 rounded-lg">
            <div className="animate-scroll-left flex gap-12 whitespace-nowrap">
              {activeItems.length > 0 ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="flex gap-12">
                    {activeItems.map((item) => (
                      <span key={`${i}-${item.id}`} className="text-sm font-semibold text-primary flex items-center gap-2">
                        {item.isNew ? (
                          <>
                            ✨ New: <span className="text-foreground font-medium">{item.text || "..."}</span>
                          </>
                        ) : (
                          <span className="text-foreground font-medium">{item.text || "..."}</span>
                        )}
                      </span>
                    ))}
                  </div>
                ))
              ) : (
                <span className="text-sm italic text-muted-foreground">No active messages to display</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

