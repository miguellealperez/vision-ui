"use client";

import bg_night from "@/public/assets/background-night.png";
import bg_day from "@/public/assets/background-day.png";

import { atom, useAtomValue } from "jotai";
import { cn } from "@/lib/utils";

export const isDayAtom = atom(false);

export const HeroBackground = ({ children }: { children: React.ReactNode }) => {
  const isDay = useAtomValue(isDayAtom);
  return (
    <div
      className={cn(
        "h-dvh w-full",
        "relative mx-auto flex items-center justify-center overflow-hidden rounded-[--tile-radius]",
        "after:pointer-events-none after:absolute after:inset-0 after:z-[3] after:overflow-hidden after:rounded-[--tile-radius] after:[box-shadow:inset_0_0_16px_16px_hsl(var(--background))]",
        "px-4 py-1 sm:px-8 md:px-12 lg:px-16",
      )}
      style={{
        backgroundImage: `url(${isDay ? bg_day.src : bg_night.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transition: "background-image 5s ease-in-out",
      }}
      data-vision-os-ui
    >
      {children}
    </div>
  );
};
