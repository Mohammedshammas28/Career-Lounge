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
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 border border-border rounded-full p-2 shadow hover:bg-primary hover:text-primary-foreground transition z-10 hidden sm:block"
        onClick={prev}
        aria-label="Previous announcement"
      >
        &#8592;
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 border border-border rounded-full p-2 shadow hover:bg-primary hover:text-primary-foreground transition z-10 hidden sm:block"
        onClick={next}
        aria-label="Next announcement"
      >
        &#8594;
      </button>
      {/* Modal for full announcement details */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-card text-card-foreground border border-border rounded-xl shadow-2xl max-w-lg w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            <button
              className="absolute top-3 right-3 text-muted-foreground hover:text-foreground text-2xl font-bold transition-colors"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 pr-6 leading-tight text-foreground">{banners[current].title}</h2>
            <div className="relative w-full h-48 sm:h-56 mb-4 rounded-lg overflow-hidden border border-border">
              <img src={banners[current].imageUrl} alt={banners[current].title} className="w-full h-full object-cover" />
            </div>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 whitespace-pre-wrap leading-relaxed">{banners[current].details}</p>
            <div className="flex justify-end">
              <button
                className="px-5 py-2 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition shadow text-sm"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
            </div>
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
