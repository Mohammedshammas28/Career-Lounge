import Image from "next/image";

export function AnnouncementBanner({ imageUrl, title, description, onViewDetails }) {
  return (
    <div className="w-full h-auto md:h-[28rem] flex flex-col md:flex-row rounded-lg overflow-hidden shadow-lg relative border border-border bg-card">
      {/* Left: Image with angled overlay */}
      <div className="w-full md:w-1/2 h-56 sm:h-64 md:h-full relative flex-shrink-0">
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
      <div className="w-full md:w-1/2 h-auto md:h-full bg-background flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-12 relative border-t md:border-t-0 md:border-l border-border pb-12 md:pb-12">
        <div className="mb-1">
          <span className="text-primary font-semibold text-xs tracking-widest uppercase">Announcement</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 leading-tight drop-shadow-sm">{title}</h3>
        <div className="text-muted-foreground text-xs sm:text-sm mb-4 max-w-md line-clamp-4 md:line-clamp-none">{description}</div>
        <button
          className="inline-block px-5 py-2 bg-primary text-primary-foreground font-semibold rounded hover:bg-primary/90 transition text-sm w-max shadow border border-primary"
          onClick={onViewDetails}
        >
          View Details
        </button>
        {/* Decorative dots and info row (optional, for extra polish) */}
        <div className="absolute bottom-3 left-6 hidden sm:flex items-center gap-4 text-muted-foreground text-xs opacity-80">
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


