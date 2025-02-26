"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";
import { Environment } from "./data";
import { motion, AnimatePresence } from "motion/react";

function EnvironmentProvider({
  environment,
  children,
}: {
  environment: Environment;
  children: React.ReactNode;
}) {
  const previousEnvironment = useRef<Environment | null>(environment);

  useEffect(() => {
    previousEnvironment.current = environment;
  }, [environment]);

  return (
    <div
      className={cn(
        "h-dvh w-full",
        "relative isolate mx-auto flex items-center justify-center overflow-hidden rounded-[--tile-radius]",
        "after:pointer-events-none after:absolute after:inset-0 after:z-[3] after:overflow-hidden after:rounded-[--tile-radius] after:bg-black/10 after:[box-shadow:inset_0_0_16px_16px_hsl(var(--background))]",
        "px-4 py-1 sm:px-8 md:px-12 lg:px-16",
      )}
      data-vision-os-ui
    >
      <AnimatePresence>
        {previousEnvironment.current && (
          <motion.div
            key={`bg-${previousEnvironment.current.id}-background`}
            className="absolute inset-0 z-[-1]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            style={{
              backgroundImage: `url(${previousEnvironment.current?.background.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        )}

        {/* Current background with mask effect */}
        <motion.div
          key={`bg-${environment.id}`}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${environment.background.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            maskImage: "radial-gradient(circle, black 10%, transparent 15%)",
            WebkitMaskImage:
              "radial-gradient(circle, black 10%, transparent 15%)",
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskOrigin: "center",
            WebkitMaskOrigin: "center",
            maskPosition: "center",
            WebkitMaskPosition: "center",
          }}
          initial={{
            WebkitMaskSize: "100vw 100vh",
            maskSize: "100vw 100vh",
            opacity: 0,
          }}
          animate={{
            WebkitMaskSize: "1200vw 1200vh",
            maskSize: "1200vw 1200vh",
            opacity: 1,
          }}
          transition={{
            type: "spring",
            bounce: 0,
            duration: 3.5,
          }}
        />
      </AnimatePresence>

      {children}
    </div>
  );
}

export default EnvironmentProvider;
