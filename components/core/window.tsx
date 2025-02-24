"use client";

import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion, MotionValue } from "motion/react";
import { useScroll } from "motion/react";
import React, { RefObject, useId, useImperativeHandle, useRef } from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";
import { useResizeObserver } from "@/hooks/use-resize-observer";
import { useRouter } from "next/navigation";
import { XIcon } from "lucide-react";

type GlassThickness =
  | "none"
  | "thinnest"
  | "thinner"
  | "thin"
  | "normal"
  | "thick"
  | "thicker"
  | "thickest";

type WindowControlsProps =
  | boolean
  | {
      /**
       * The URL used when clicking the close button.
       * @default `router.back()`
       */
      href?: string;
    };

interface WindowApiProps {
  /**
   * Wrap content in a scroll area.
   *
   * You can use `useWindow` to get the scroll position of the window in the children.
   * @default false
   */
  scroll?: boolean;
  /**
   * The thickness of the glass effect.
   * @default "normal"
   */
  thickness?: GlassThickness;
  /**
   * The controls to display in the window.
   * @default false
   */
  controls?: WindowControlsProps;
  /**
   * The root className for the window wrapper.
   */
  rootClassName?: string;
}

interface WindowProps extends HTMLMotionProps<"div">, WindowApiProps {
  children: React.ReactNode;
}

export const getThickness = (thickness: GlassThickness) => {
  switch (thickness) {
    case "thinnest":
      return 24;
    case "thinner":
      return 32;
    case "thin":
      return 42;
    case "normal":
      return 48;
    case "thick":
      return 64;
    case "thicker":
      return 72;
    case "thickest":
      return 96;
    default:
      return 24;
  }
};

export const getRings = (thickness: GlassThickness) => {
  switch (thickness) {
    case "thinnest":
      return "0px 3px 6.5px 0px rgba(0, 0, 0, 0.05), -0.25px 0.35px 0.15px -1.5px rgba(255, 255, 255, 0.15) inset, 0px 0.35px 2px 0px rgba(255, 255, 255, 0.15) inset";
    case "thinner":
      return "0px 4px 8px 0px rgba(0, 0, 0, 0.05), -0.35px 0.55px 0.25px -1.5px rgba(255, 255, 255, 0.2) inset, 0px 0.55px 2px 0px rgba(255, 255, 255, 0.2) inset";
    case "thin":
      return "0px 6px 10px 0px rgba(0, 0, 0, 0.05), -0.45px 0.75px 0.35px -1.5px rgba(255, 255, 255, 0.25) inset, 0px 0.75px 2px 0px rgba(255, 255, 255, 0.25) inset";
    case "normal":
      return "0px 8px 12px 0px rgba(0, 0, 0, 0.05), -0.55px 1px 0.45px -1.5px rgba(255, 255, 255, 0.3) inset, 0px 1px 2px 0px rgba(255, 255, 255, 0.3) inset";
    case "thick":
      return "0px 12px 16px 0px rgba(0, 0, 0, 0.05), -0.65px 1.25px 0.65px -1.5px rgba(255, 255, 255, 0.35) inset, 0px 1.25px 2px 0px rgba(255, 255, 255, 0.35) inset";
    case "thicker":
      return "0px 18px 22px 0px rgba(0, 0, 0, 0.05), -0.75px 1.75px 0.75px -1.5px rgba(255, 255, 255, 0.35) inset, 0px 1.75px 6px 0px rgba(255, 255, 255, 0.35) inset";
    case "thickest":
      return "0px 24px 28px 0px rgba(0, 0, 0, 0.05), -0.85px 1.85px 0.85px -1.5px rgba(255, 255, 255, 0.35) inset, 0px 1.85px 6px 0px rgba(255, 255, 255, 0.35) inset";
    default:
      return "0px 3px 6.5px 0px rgba(0, 0, 0, 0.05), -0.25px 0.35px 0.15px -1.5px rgba(255, 255, 255, 0.15) inset, 0px 0.35px 2px 0px rgba(255, 255, 255, 0.15) inset";
  }
};

export const getHighlightStroke = (thickness: GlassThickness) => {
  switch (thickness) {
    case "thinnest":
      return "[--mask-stroke:0.75px]";
    case "thinner":
      return "[--mask-stroke:1px]";
    case "thin":
      return "[--mask-stroke:1.25px]";
    case "normal":
      return "[--mask-stroke:1.5px]";
    case "thick":
      return "[--mask-stroke:1.75px]";
    case "thicker":
      return "[--mask-stroke:1.85px]";
    case "thickest":
      return "[--mask-stroke:1.9px]";
    default:
      return "[--mask-stroke:0.75px]";
  }
};

const getHighlightOpacity = (thickness: GlassThickness) => {
  switch (thickness) {
    case "thinnest":
      return 0.15;
    case "thinner":
      return 0.175;
    case "thin":
      return 0.2;
    case "normal":
      return 0.225;
    case "thick":
      return 0.25;
    case "thicker":
      return 0.275;
    case "thickest":
      return 0.3;
    default:
      return 0.15;
  }
};

const CONSTANTS = {
  SATURATION: 1.5,
  VAR_RADIUS: "[--radius:34px]",
  VAR_DIAMETER: "[--diameter:68px]",
};

const maskComposite = [
  "exclude",
  "intersect",
  "subtract",
  "intersect",
  "subtract",
  "add",
];

const defaultHighlightStyle = {
  borderRadius: `var(--radius)`,
  maskSize: "100% 100%",
  WebkitMaskSize: "100% 100%",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
};

const leftTopHighlight =
  "conic-gradient(from 270deg at var(--radius) var(--radius), transparent 0deg, white 45deg, transparent 170deg), transparent";
const leftTopMaskImage = [
  "linear-gradient(to right, black, black)",
  "linear-gradient(to right, transparent var(--mask-stroke), black calc(var(--mask-stroke) * 2))",
  "linear-gradient(to bottom, transparent var(--mask-stroke), black calc(var(--mask-stroke) * 2))",
  "linear-gradient(to right, black calc(var(--radius) - var(--mask-stroke)), transparent var(--radius))",
  "linear-gradient(to bottom, black calc(var(--radius) - var(--mask-stroke)), transparent var(--radius))",
  "radial-gradient(var(--diameter) var(--diameter) at var(--radius) var(--radius), black var(--mask-inner-distance), transparent var(--mask-outer-distance))",
];
const leftTopHighlightStyle = {
  background: leftTopHighlight,
  maskImage: leftTopMaskImage.join(", "),
  maskComposite: maskComposite.join(", "),
  ...defaultHighlightStyle,
};

const rightBottomHighlight =
  "conic-gradient(from 60deg at var(--radius) var(--radius), transparent 0deg, white 65deg, transparent 160deg), transparent";
const rightBottomMaskImage = [
  "linear-gradient(to left, black, black)",
  "linear-gradient(to left, transparent var(--mask-stroke), black calc(var(--mask-stroke) * 2))",
  "linear-gradient(to top, transparent var(--mask-stroke), black calc(var(--mask-stroke) * 2))",
  "linear-gradient(to left, black calc(var(--radius) - var(--mask-stroke)), transparent var(--radius))",
  "linear-gradient(to top, black calc(var(--radius) - var(--mask-stroke)), transparent var(--radius))",
  "radial-gradient(var(--diameter) var(--diameter) at calc(100% - var(--radius)) calc(100% - var(--radius)), black var(--mask-inner-distance), transparent var(--mask-outer-distance))",
];
const rightBottomHighlightStyle = {
  background: rightBottomHighlight,
  maskImage: rightBottomMaskImage.join(", "),
  maskComposite: maskComposite.join(", "),
  ...defaultHighlightStyle,
};

const WindowContext = React.createContext<{
  scrollY: MotionValue<number>;
  width: number | undefined;
  height: number | undefined;
  windowId: string;
}>({
  scrollY: new MotionValue(),
  width: 0,
  height: 0,
  windowId: "",
});

const useWindow = () => {
  const context = React.useContext(WindowContext);
  if (!context) {
    throw new Error("useWindowContext must be used within a WindowContext");
  }
  return context;
};

const Window = React.forwardRef<HTMLDivElement, WindowProps>(
  (
    {
      children,
      className,
      rootClassName,
      thickness,
      style,
      scroll = false,
      controls = false,
      ...props
    }: WindowProps,
    ref,
  ) => {
    const windowId = useId();
    const localRef = useRef<HTMLDivElement>(null);
    // strip out *-h-*, h-* classes classes
    const scrollWindowRegex =
      /-h-.*|h-.*|^max-h-.*|^min-h-.*|^h-.*|h-.*|max-h-.*|min-h-.*/g;
    const scrollWindowClassesName =
      className?.match(scrollWindowRegex)?.join(" ") || "";
    const restClassesName = className?.replace(scrollWindowRegex, "") || "";
    // get rounded-* classes
    const roundedRegex = /rounded-.*|^rounded/g;
    const roundedClassesName = className?.match(roundedRegex)?.join(" ") || "";

    useImperativeHandle(ref, () => localRef.current!);

    const { scrollY } = useScroll({
      container: scroll ? localRef : undefined,
      layoutEffect: false,
    });
    const { width, height } = useResizeObserver({
      ref: localRef as RefObject<HTMLDivElement>,
    });

    return (
      <WindowContext.Provider value={{ scrollY, width, height, windowId }}>
        <motion.div
          key={`${windowId}-wrapper`}
          className={cn(
            "relative flex flex-col items-center justify-center",
            rootClassName,
          )}
        >
          <motion.div
            className={cn(
              "relative overflow-hidden",
              "before:absolute before:inset-0 before:z-[-1] before:rounded-[var(--radius)] before:bg-[#808080] before:bg-opacity-30",
              "min-h-[64px] min-w-[64px]",
              CONSTANTS.VAR_DIAMETER,
              CONSTANTS.VAR_RADIUS,
              restClassesName,
              !scroll && scrollWindowClassesName,
            )}
            style={{
              backdropFilter:
                thickness === "none"
                  ? "none"
                  : `saturate(${CONSTANTS.SATURATION}) blur(${getThickness(thickness || "normal")}px) brightness(0.85)`,
              WebkitBackdropFilter:
                thickness === "none"
                  ? "none"
                  : `saturate(${CONSTANTS.SATURATION}) blur(${getThickness(thickness || "normal")}px) brightness(0.85)`,
              borderRadius: `var(--radius)`,
              ...style,
            }}
            {...props}
          >
            {/* HIGHLIGHTRINGS */}
            <motion.div
              className="pointer-events-none absolute inset-x-0 z-40 h-full w-full"
              style={{
                boxShadow: getRings(thickness || "normal"),
                borderRadius: `var(--radius)`,
                top: 0,
              }}
              aria-hidden
            />
            <motion.div
              className={cn(
                getHighlightStroke(thickness || "normal"),
                "pointer-events-none absolute inset-[-0.75px] z-40",
                "[--mask-inner-distance:calc(50%-var(--mask-stroke)-var(--mask-stroke))] [--mask-outer-distance:calc(50%-var(--mask-stroke))]",
              )}
              style={{
                ...leftTopHighlightStyle,
                opacity: getHighlightOpacity(thickness || "normal") + 0.35,
              }}
              aria-hidden="true"
            />
            <motion.div
              className={cn(
                getHighlightStroke(thickness || "normal"),
                "pointer-events-none absolute inset-[-0.25px] z-40",
                "[--mask-inner-distance:calc(50%-var(--mask-stroke)-var(--mask-stroke))] [--mask-outer-distance:calc(50%-var(--mask-stroke))]",
              )}
              style={{
                ...rightBottomHighlightStyle,
                opacity: getHighlightOpacity(thickness || "normal") - 0.05,
              }}
              aria-hidden="true"
            />
            {scroll ? (
              <ScrollAreaPrimitive.Root
                className={cn("relative", scrollWindowClassesName)}
              >
                <ScrollAreaPrimitive.Viewport
                  className={cn(
                    "h-full w-full",
                    roundedClassesName.length > 0
                      ? roundedClassesName
                      : `rounded-[var(--radius)]`,
                    {
                      "!overflow-visible": scrollWindowClassesName.length === 0,
                    },
                  )}
                  ref={localRef}
                >
                  {children}
                </ScrollAreaPrimitive.Viewport>
                <ScrollBar />
                <ScrollAreaPrimitive.Corner />
              </ScrollAreaPrimitive.Root>
            ) : (
              children
            )}
          </motion.div>
          {controls && (
            <WindowControls
              href={typeof controls === "object" ? controls.href : undefined}
            />
          )}
        </motion.div>
      </WindowContext.Provider>
    );
  },
);

Window.displayName = "Window";

const WindowControls = ({ href }: { href?: string }) => {
  const router = useRouter();
  return (
    <motion.div
      className="group/controls absolute inset-x-0 bottom-[var(--window-controls-bottom,-37px)] z-50 mx-auto inline-flex h-[37px] w-[212px] shrink-0 items-center justify-start gap-4 pb-px pr-[28px] pt-[22px]"
      layout
      layoutId="navigation-bar"
    >
      <button
        onClick={() => (href ? router.push(href) : router.back())}
        className={cn(
          "h-[37px] w-[37px]",
          "group/close-btn",
          "peer/close-btn",
          "flex items-center justify-center",
        )}
      >
        <span
          className={cn(
            "pointer-events-none",
            "size-3.5 rounded-[100px] bg-white/30 backdrop-blur-[20px]",
            "transition-all duration-300",
            "flex items-center justify-center",
            "group-hover/close-btn:size-6 group-hover/close-btn:bg-white/100",
            "group-active/close-btn:size-4 group-active/close-btn:bg-white/100",
          )}
        >
          <XIcon className="size-3.5 text-[#333] opacity-0 group-hover/close-btn:size-3 group-hover/close-btn:opacity-100" />
        </span>
      </button>
      <div
        className={cn(
          "relative h-3.5 w-[136px] rounded-[100px] bg-white/30 backdrop-blur-[20px]",
          "transition-all duration-300",
          "peer-hover/close-btn:ml-[10px] peer-hover/close-btn:w-[126px] peer-hover/close-btn:bg-white/50",
        )}
      ></div>
    </motion.div>
  );
};

export { Window, WindowControls, useWindow };
export type { WindowProps, WindowApiProps, GlassThickness };
