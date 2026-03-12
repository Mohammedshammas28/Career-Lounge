import Image from "next/image";
import PropTypes from "prop-types";

export function AnnouncementBanner({ imageUrl, title, description, onViewDetails }) {
  return (
    <div className="w-full h-[28rem] flex rounded-lg overflow-hidden shadow-lg relative border border-border bg-card">
      {/* Left: Image with angled overlay */}
      <div className="w-1/2 h-full relative flex-shrink-0">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover w-full h-full"
          priority
        />
        {/* Diagonal overlay for subtle effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(120deg, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.0) 100%)'
          }}
        />
        {/* Logo placeholder (top left) */}
        <div className="absolute top-4 left-4 z-10">
          <span className="text-white font-bold text-lg tracking-tight">Career<span className="text-primary ml-1">Lounge</span></span>
        </div>
      </div>
      {/* Right: Content */}
      <div className="w-1/2 h-full bg-background flex flex-col justify-center px-10 py-12 relative border-l border-border">
        <div className="mb-1">
          <span className="text-primary font-semibold text-xs tracking-widest uppercase">Announcement</span>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2 leading-tight drop-shadow-sm">{title}</h3>
        <div className="text-muted-foreground text-sm mb-4 max-w-md">{description}</div>
        <button
          className="inline-block px-5 py-2 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition text-sm w-max shadow border border-primary"
          onClick={onViewDetails}
        >
          View Details
        </button>
        {/* Decorative dots and info row (optional, for extra polish) */}
        <div className="absolute bottom-3 left-6 flex items-center gap-4 text-muted-foreground text-xs opacity-80">
          <span className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-primary rounded-full inline-block" />
            <span className="w-1.5 h-1.5 bg-primary rounded-full inline-block" />
            <span className="w-1.5 h-1.5 bg-primary rounded-full inline-block" />
          </span>
          <span>www.careerlounge.org</span>
          <span>info@careerlounge.org</span>
        </div>
      </div>
    </div>
  );
}

AnnouncementBanner.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onViewDetails: PropTypes.func.isRequired,
};
