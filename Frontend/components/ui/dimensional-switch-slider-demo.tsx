"use client";

import DimensionalSwitchSlider from "@/components/ui/dimensional-switch-slider";

export default function DimensionalSwitchSliderDemo() {
  return (
    <div className="w-full h-screen bg-neutral-950 flex items-center justify-center">
      <DimensionalSwitchSlider
        infinite
        direction="horizontal"
        autoplay
        autoplayDelay={2600}
        textColor="#ffffff"
        textSize={84}
        cardWidth={680}
        cardHeight={460}
        cardBorderRadius={16}
      />
    </div>
  );
}
