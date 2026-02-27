"use client";
"use client";
import React, { useRef, useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const banners = [
  {
    image: "/image.png",
    title: "Welcome to Career Lounge",
    description: "Empowering your career journey with expert guidance."
  },
  {
    image: "/image1.png",
    title: "Career Growth",
    description: "Unlock your potential with our services."
  },
  {
    image: "/image2.png",
    title: "Success Stories",
    description: "See how we’ve helped others achieve their dreams."
  }
];

export function SlidingBanner() {
  const [intervalMs, setIntervalMs] = useState(1500);
  const timerRef = useRef(null);

  useEffect(() => {
    // After 15 seconds, slow down to 5s per image
    timerRef.current = setTimeout(() => {
      setIntervalMs(5000);
    }, 15000);
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <div className="w-full flex justify-center items-center py-10 px-6 rounded-lg mb-12" style={{height: '700px', minHeight: '500px'}}>
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={intervalMs}
        className="w-full"
        style={{maxWidth: '900px', width: '100%', height: '100%'}}
      >
        {banners.map((banner, idx) => (
          <div key={idx} style={{height: '700px'}} className="flex flex-row w-full h-full items-center justify-center gap-8 bg-white/80 rounded-lg shadow-lg p-8">
            <div className="flex-1 flex justify-center items-center h-full">
              <img
                src={banner.image}
                alt={banner.title}
                className="object-cover rounded-lg shadow-lg"
                style={{width: '100%', maxWidth: '400px', height: '500px', objectFit: 'cover'}}
              />
            </div>
            <div className="flex-1 flex flex-col justify-center items-start h-full p-8">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">{banner.title}</h2>
              <p className="text-xl text-gray-700">{banner.description}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
