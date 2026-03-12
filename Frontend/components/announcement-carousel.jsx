import { useState, useEffect } from "react";
import { AnnouncementBanner } from "@/components/announcement-banner";

const announcements = [
  {
    imageUrl: "/University.jpg",
    title: "Scholarship Opportunity: XYZ University",
    description: "XYZ University is offering full scholarships for 2026 admissions. Apply now to secure your future!",
    details: "XYZ University is pleased to announce a full scholarship program for the academic year 2026. The scholarship covers tuition, accommodation, and a monthly stipend. Eligible students must have a strong academic record and demonstrate leadership potential. For more information and application details, visit the university website or contact our office."
  },
  {
    imageUrl: "image1.png",
    title: "Admissions Open: ABC Institute",
    description: "ABC Institute has opened admissions for 2026. Limited seats available for top courses!",
    details: "ABC Institute is now accepting applications for the 2026 academic year. Explore a variety of undergraduate and postgraduate programs. Early applicants may be eligible for special scholarships. Visit our website for more details."
  },
  {
    imageUrl: "image2.png",
    title: "International Student Exchange Program",
    description: "Apply for our 2026 International Exchange Program and study abroad for a semester!",
    details: "Our International Student Exchange Program offers a unique opportunity to study abroad for one semester at partner universities. Open to all disciplines. Application deadline: June 30, 2026. Contact the international office for more info."
  }
];

export function AnnouncementCarousel() {
  const [current, setCurrent] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const next = () => setCurrent((prev) => (prev + 1) % announcements.length);
  const prev = () => setCurrent((prev) => (prev - 1 + announcements.length) % announcements.length);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full">
      <AnnouncementBanner
        imageUrl={announcements[current].imageUrl}
        title={announcements[current].title}
        description={announcements[current].description}
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
            <h2 className="text-2xl font-bold mb-4">{announcements[current].title}</h2>
            <img src={announcements[current].imageUrl} alt={announcements[current].title} className="w-32 h-32 object-cover rounded mb-4 mx-auto" />
            <p className="text-gray-800 mb-4">{announcements[current].details}</p>
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
        {announcements.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full ${idx === current ? 'bg-primary' : 'bg-border'} transition-all`}
          />
        ))}
      </div>
    </div>
  );
}
