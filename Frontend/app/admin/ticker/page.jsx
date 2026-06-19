"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Save, RefreshCw, Plus, Trash2, ChevronLeft } from "lucide-react"

export default function TickerAdminPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetchTickerData()
  }, [])

  const fetchTickerData = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/ticker", { headers: { "Cache-Control": "no-cache" } })
      const data = await response.json()
      setItems(data.items || [])
    } catch (error) {
      console.error("Error fetching ticker:", error)
      setMessage("Error loading ticker data")
    } finally {
      setLoading(false)
    }
  }

  const handleAddItem = () => {
    const updatedItems = items.map((item) => ({ ...item, isNew: false }))
    setItems([...updatedItems, { id: Date.now().toString(), text: "", active: true, isNew: true }])
  }

  const handleRemoveItem = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handleTextChange = (id, newText) => {
    setItems(items.map(item => item.id === id ? { ...item, text: newText } : item))
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

      if (response.ok) {
        setMessage("Ticker updated successfully!")
        setTimeout(() => setMessage(""), 3000)
      } else {
        setMessage(data.error || "Failed to save ticker")
      }
    } catch (error) {
      console.error("Error saving ticker:", error)
      setMessage("Error saving ticker")
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

  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin">
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
                <p className="text-muted-foreground">No sliding text items yet. Click "Add More" to create one.</p>
              </div>
            ) : (
              items.map((item, index) => (
                <div key={item.id} className="relative group">
                  <div className="flex gap-4 items-start">
                    <div className="flex-1">
                      <label className="block text-xs font-semibold text-muted-foreground uppercase mb-1">
                        Message #{index + 1}
                      </label>
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
                      className="mt-5 text-destructive hover:text-destructive/80 hover:bg-destructive/10"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="text-sm font-medium text-emerald-500">
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
              {items.length > 0 ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="flex gap-12">
                    {items.map((item) => (
                      <span key={item.id} className="text-sm font-semibold text-primary flex items-center gap-2">
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
                <span className="text-sm italic text-muted-foreground">No messages to display</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
