import { useState, useEffect } from "react";
import { AnnouncementBanner } from "@/components/announcement-banner";
import { useBanners } from "@/components/BannerContext";

export function AnnouncementCarousel() {
  const { banners, isLoaded } = useBanners();
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  // Auto-slide every 5 seconds - must be called before early return
  useEffect(() => {
    if (!banners || banners.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  if (!isLoaded || !banners || banners.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">Loading banners...</div>;
  }

  const next = () => setCurrent((prev) => (prev + 1) % banners.length);
  const prev = () => setCurrent((prev) => (prev - 1 + banners.length) % banners.length);

  return (
    <div className="relative w-full">
      <AnnouncementBanner
        imageUrl={banners[current].imageUrl}
        title={banners[current].title}
        description={banners[current].description}
        onViewDetails={() => setModalOpen(true)}
      />
      {/* Carousel Controls */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 border border-border rounded-full p-2 shadow hover:bg-primary hover:text-primary-foreground transition z-10"
        onClick={prev}
        aria-label="Previous announcement"
      >
        &#8592;
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 border border-border rounded-full p-2 shadow hover:bg-primary hover:text-primary-foreground transition z-10"
        onClick={next}
        aria-label="Next announcement"
      >
        &#8594;
      </button>
      {/* Modal for full announcement details */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-8 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{banners[current].title}</h2>
            <img src={banners[current].imageUrl} alt={banners[current].title} className="w-32 h-32 object-cover rounded mb-4 mx-auto" />
            <p className="text-gray-800 mb-4">{banners[current].details}</p>
            <button
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {banners.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full ${idx === current ? 'bg-primary' : 'bg-border'} transition-all`}
          />
        ))}
      </div>
    </div>
  );
}
