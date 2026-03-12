"use client";

import { createContext, useContext, useState, useEffect } from "react";

const BannerContext = createContext();

export function BannerProvider({ children }) {
  const [banners, setBanners] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load banners from localStorage on mount
  useEffect(() => {
    const savedBanners = localStorage.getItem("careerLoungeBanners");
    if (savedBanners) {
      try {
        setBanners(JSON.parse(savedBanners));
      } catch (error) {
        console.error("Failed to parse saved banners:", error);
        // Set default banners if parsing fails
        const defaultBanners = [
          {
            imageUrl: "/hero-banner.jpg",
            title: "Scholarship Opportunity: XYZ University",
            description: "XYZ University is offering full scholarships for 2026 admissions. Apply now to secure your future!",
            details: "XYZ University is pleased to announce a full scholarship program for the academic year 2026. The scholarship covers tuition, accommodation, and a monthly stipend. Eligible students must have a strong academic record and demonstrate leadership potential."
          }
        ];
        setBanners(defaultBanners);
        localStorage.setItem("careerLoungeBanners", JSON.stringify(defaultBanners));
      }
    } else {
      // Set default banners if none exist
      const defaultBanners = [
        {
          imageUrl: "/hero-banner.jpg",
          title: "Scholarship Opportunity: XYZ University",
          description: "XYZ University is offering full scholarships for 2026 admissions. Apply now to secure your future!",
          details: "XYZ University is pleased to announce a full scholarship program for the academic year 2026. The scholarship covers tuition, accommodation, and a monthly stipend. Eligible students must have a strong academic record and demonstrate leadership potential."
        }
      ];
      setBanners(defaultBanners);
      localStorage.setItem("careerLoungeBanners", JSON.stringify(defaultBanners));
    }
    setIsLoaded(true);
  }, []);

  // Save banners to localStorage whenever they change
  const updateBanners = (newBanners) => {
    setBanners(newBanners);
    localStorage.setItem("careerLoungeBanners", JSON.stringify(newBanners));
  };

  return (
    <BannerContext.Provider value={{ banners, setBanners: updateBanners, isLoaded }}>
      {children}
    </BannerContext.Provider>
  );
}

export function useBanners() {
  const context = useContext(BannerContext);
  if (!context) {
    throw new Error("useBanners must be used within BannerProvider");
  }
  return context;
}
