import { useState } from "react";
import { AnnouncementBanner } from "./announcement-banner";
import { useBanners } from "./BannerContext";

export default function BannerAdminEditor() {
  const { banners, setBanners, isLoaded } = useBanners();
  const [form, setForm] = useState({ imageUrl: "", title: "", description: "", details: "" });
  const [editIndex, setEditIndex] = useState(null);

  if (!isLoaded) {
    return <div className="text-center py-8 text-muted-foreground">Loading...</div>;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (editIndex !== null) {
      const updated = [...banners];
      updated[editIndex] = form;
      setBanners(updated);
      setEditIndex(null);
    } else {
      setBanners([...banners, form]);
    }
    setForm({ imageUrl: "", title: "", description: "", details: "" });
  }

  function handleEdit(idx) {
    setForm(banners[idx]);
    setEditIndex(idx);
    // Scroll to form
    setTimeout(() => {
      document.querySelector('form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }

  function handleDelete(idx) {
    setBanners(banners.filter((_, i) => i !== idx));
    setForm({ imageUrl: "", title: "", description: "", details: "" });
    setEditIndex(null);
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-background rounded-2xl shadow-xl border border-border mt-8">
      <h2 className="text-3xl font-bold mb-6 text-primary">Banner Admin Editor</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-card rounded-xl shadow p-6 mb-10 border border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL (e.g. /hero-banner.jpg)"
            value={form.imageUrl}
            onChange={handleChange}
            className="w-full border border-border rounded-lg px-4 py-2 bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
            required
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border border-border rounded-lg px-4 py-2 bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-border rounded-lg px-4 py-2 bg-background text-foreground focus:ring-2 focus:ring-primary outline-none md:col-span-2"
            required
          />
        </div>
        <textarea
          name="details"
          placeholder="Details"
          value={form.details}
          onChange={handleChange}
          className="w-full border border-border rounded-lg px-4 py-2 bg-background text-foreground focus:ring-2 focus:ring-primary outline-none min-h-[80px]"
          required
        />
        <div className="flex gap-4 mt-2">
          <button type="submit" className="px-7 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition shadow border border-primary">
            {editIndex !== null ? "Update Banner" : "Add Banner"}
          </button>
          {editIndex !== null && (
            <button type="button" onClick={() => { setForm({ imageUrl: "", title: "", description: "", details: "" }); setEditIndex(null); }} className="px-5 py-2 bg-muted text-foreground rounded-lg border border-border hover:bg-muted-foreground/10 transition">Cancel</button>
          )}
        </div>
      </form>
      <div className="space-y-10">
        {banners.map((banner, idx) => (
          <div key={idx} className="relative border border-border rounded-xl shadow bg-card p-3 md:p-4">
            <AnnouncementBanner
              imageUrl={banner.imageUrl}
              title={banner.title}
              description={banner.description}
              onViewDetails={() => alert(banner.details)}
            />
            <div className="absolute top-3 right-3 flex gap-2 z-10">
              <button onClick={() => handleEdit(idx)} className="px-4 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition shadow border border-primary text-sm">Edit</button>
              <button onClick={() => handleDelete(idx)} className="px-4 py-1.5 bg-destructive text-white rounded-lg hover:bg-destructive/80 transition shadow border border-destructive text-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
