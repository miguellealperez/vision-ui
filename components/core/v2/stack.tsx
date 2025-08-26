"use client";

import { XIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import * as React from "react";
import { cn } from "@/lib/utils";
import { type GlassThickness, Material } from "./material";
import { Text } from "./text";

// Utility function to check if a route matches a dynamic pattern
const matchesDynamicPattern = (route: string, pattern: string): boolean => {
  // If pattern doesn't contain brackets, do exact match
  if (!pattern.includes("[") && !pattern.includes("]")) {
    return route === pattern;
  }

  // For dynamic patterns like [details], match any route that isn't explicitly defined
  // Remove brackets from pattern to get the base name
  const basePattern = pattern.replace(/[[\]]/g, "");

  // Dynamic patterns should match any route except:
  // 1. The base pattern name itself (e.g., "details" shouldn't match "[details]")
  // 2. Routes that contain slashes (nested routes)
  // 3. Routes that are explicitly defined elsewhere
  return route !== basePattern && !route.includes("/");
};

type HeaderOptions = {
  title?: string;
  headerShown?: boolean;
  headerLeft?: React.ReactNode | (() => React.ReactNode);
  headerRight?: React.ReactNode | (() => React.ReactNode);
  className?: string;
};

export type StackScreenProps = {
  name: string;
  options?: HeaderOptions;
};

export type StackProps = React.HTMLAttributes<HTMLDivElement> & {
  material?: boolean | { thickness?: GlassThickness };
};

type StackApi = {
  options: Record<string, HeaderOptions>;
  setScreenOptions: (screenName: string, options: HeaderOptions) => void;
};

const StackContext = React.createContext<StackApi | null>(null);

function useStack() {
  const ctx = React.useContext(StackContext);
  if (!ctx) throw new Error("useStack must be used within <Stack>");
  return { ...ctx };
}

const Header = ({
  options: screenOptions,
}: {
  options?: Record<string, HeaderOptions>;
}) => {
  const { options: stackOptions } = useStack();
  const currentRoute = useSelectedLayoutSegment() || "index";
  const mergedOptions = { ...stackOptions, ...screenOptions };

  // Find the matching options for the current route
  const findMatchingOptions = (route: string): HeaderOptions | undefined => {
    let matchingOptions: HeaderOptions | undefined;
    for (const [pattern, patternOptions] of Object.entries(mergedOptions)) {
      if (matchesDynamicPattern(route, pattern)) {
        matchingOptions = patternOptions;
      }
    }
    // First, try exact match
    if (mergedOptions[route]) {
      matchingOptions = mergedOptions[route];
    }

    return matchingOptions;
  };

  const headerOptions = findMatchingOptions(currentRoute);
  console.log(currentRoute, headerOptions);

  if (headerOptions?.headerShown === false) return null;

  const Left =
    typeof headerOptions?.headerLeft === "function"
      ? headerOptions?.headerLeft()
      : headerOptions?.headerLeft;
  const Right =
    typeof headerOptions?.headerRight === "function"
      ? headerOptions?.headerRight()
      : headerOptions?.headerRight;
  return (
    <div
      className={cn(
        "relative z-10 flex items-center justify-between px-4 py-3",
        headerOptions?.className,
      )}
    >
      <div className="flex min-w-[64px] items-center justify-start">{Left}</div>
      <div className="flex-1 text-center">
        <Text size="largeTitle">{headerOptions?.title || currentRoute}</Text>
      </div>
      <div className="flex min-w-[64px] items-center justify-end">{Right}</div>
    </div>
  );
};

const WindowControls = () => {
  return (
    <motion.div
      className="group/controls absolute inset-x-0 bottom-[-37px] z-50 mx-auto inline-flex h-[37px] w-[212px] shrink-0 items-center justify-start gap-4 pt-[22px] pr-[28px] pb-px"
      layout
      layoutId="navigation-bar"
      role="toolbar"
      aria-label="Window controls"
    >
      <Link
        href="/"
        className={cn(
          "h-[37px] w-[37px]",
          "group/close-btn",
          "peer/close-btn",
          "flex items-center justify-center",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
          "rounded-full",
        )}
        aria-label="Close window"
        title="Go to home"
      >
        <span
          className={cn(
            "pointer-events-none",
            "size-3.5 rounded-[100px] bg-white/30 backdrop-blur-[20px]",
            "transition-all duration-300",
            "flex items-center justify-center",
            "group-hover/close-btn:size-6 group-hover/close-btn:bg-white/100",
            "group-active/close-btn:size-4 group-active/close-btn:bg-white/100",
            "group-focus-visible/close-btn:size-6 group-focus-visible/close-btn:bg-white/100",
          )}
        >
          <XIcon className="size-3.5 text-[#333] opacity-0 group-hover/close-btn:size-3 group-hover/close-btn:opacity-100 group-focus-visible/close-btn:size-3 group-focus-visible/close-btn:opacity-100" />
        </span>
      </Link>
      <div
        className={cn(
          "relative h-3.5 w-[136px] rounded-[100px] bg-white/30 backdrop-blur-[20px]",
          "transition-all duration-300",
          "peer-hover/close-btn:ml-[10px] peer-hover/close-btn:w-[126px] peer-hover/close-btn:bg-white/50",
          "peer-focus-visible/close-btn:ml-[10px] peer-focus-visible/close-btn:w-[126px] peer-focus-visible/close-btn:bg-white/50",
        )}
        aria-hidden="true"
      ></div>
    </motion.div>
  );
};

const Screen = ({ name, options }: StackScreenProps) => {
  const { setScreenOptions } = useStack();

  React.useEffect(() => {
    if (options) {
      setScreenOptions(name, options);
    }
  }, [name, options, setScreenOptions]);

  return null;
};

const StackComponent = ({
  children,
  className,
  material = true,
  style,
  ...rest
}: StackProps) => {
  const [mergedOptions, setMergedOptions] = React.useState<
    Record<string, HeaderOptions>
  >({});

  const content = (
    <div className={cn("flex flex-col", className)} style={style} {...rest}>
      <Header options={mergedOptions} />
      <div className="relative flex-1">{children}</div>
    </div>
  );

  const thickness =
    typeof material === "object" ? material.thickness : "normal";

  const setScreenOptionsHandler = React.useCallback(
    (screenName: string, options: HeaderOptions) => {
      setMergedOptions((prev) => ({
        ...prev,
        [screenName]: { ...prev[screenName], ...options },
      }));
    },
    [],
  );

  return (
    <StackContext.Provider
      value={{
        options: mergedOptions,
        setScreenOptions: setScreenOptionsHandler,
      }}
    >
      <div className="relative">
        {material ? (
          <Material thickness={thickness || "normal"}>{content}</Material>
        ) : (
          content
        )}
        <WindowControls />
      </div>
    </StackContext.Provider>
  );
};

const Stack = Object.assign(StackComponent, {
  Screen: Screen,
  Header: Header,
});

export { Stack, useStack };
