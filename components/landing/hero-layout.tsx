"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import React from "react";
import heroImage from "@/public/assets/hero-background.png";
import Image from "next/image";

export const HeroLayout = ({ children }: { children: React.ReactNode }) => {
  const isTablet = useMediaQuery("(min-width: 640px)");
  const canRotate = useMediaQuery("(orientation: portrait)");

  if (!isTablet)
    return (
      <div className="h-full w-full">
        <Image src={heroImage} alt="hero" />
        {canRotate ? (
          <p className="text-sm text-muted-foreground">
            Try rotating your device to landscape
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Use a larger screen to interact
          </p>
        )}
      </div>
    );
  return <div>{children}</div>;
};
