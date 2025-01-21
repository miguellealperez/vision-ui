"use client";

import bg_night from "@/public/assets/background-night.png";
import bg_day from "@/public/assets/background-day.png";

import { atom, useAtomValue } from "jotai";
import { AspectRatio } from "../ui/aspect-ratio";
import { cn } from "@/lib/utils";

export const isDayAtom = atom(false);

export const HeroBackground = ({ children }: { children: React.ReactNode }) => {
  const isDay = useAtomValue(isDayAtom);
  return (
    <AspectRatio
      ratio={2610 / 1468}
      className={cn(
        "relative mx-auto flex max-h-[1468px] max-w-[2610px] items-center justify-center overflow-hidden rounded-[--tile-radius]",
        "after:pointer-events-none after:absolute after:inset-0 after:z-[3] after:overflow-hidden after:rounded-[--tile-radius] after:[box-shadow:inset_0_0_16px_16px_hsl(var(--background))]",
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
    </AspectRatio>
  );
};
