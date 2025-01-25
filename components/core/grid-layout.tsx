"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
  useId,
} from "react";
import {
  animate,
  motion,
  MotionValue,
  PanInfo,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from "motion/react";
import { atom, useAtomValue } from "jotai";

import { Window } from "./window";
import { cn } from "@/lib/utils";
import useWindowSize from "@/hooks/use-window-size";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { useRouter } from "next/navigation";

// ------------------------------------------------------------------
// 1. CONTEXT SETUP
// ------------------------------------------------------------------

/** The shape of the data we'll put in context */
interface HoneycombContextValue {
  debug: boolean;
  scrollX: MotionValue<number>;
  pageWidth: number;
  itemSize: number;
  labelSize: number;
  gutter: number;
  verticalSpacing: number;
  /**
   * Used for exit transition when clicking on a href
   */
  animateOverwrite: boolean;
  setAnimateOverwrite: (value: boolean) => void;
}

/** Create the context object (and a safe hook to consume it). */
const HoneycombContext = createContext<HoneycombContextValue | undefined>(
  undefined,
);

function useHoneycombContext() {
  const value = useContext(HoneycombContext);
  if (!value) {
    throw new Error(
      "useHoneycombContext must be used within a HoneycombProvider.",
    );
  }
  return value;
}

/** Wrap children in this provider once at the top of your layout. */
function HoneycombProvider({
  value,
  children,
}: {
  value: HoneycombContextValue;
  children: ReactNode;
}) {
  return (
    <HoneycombContext.Provider value={value}>
      {children}
    </HoneycombContext.Provider>
  );
}

// ------------------------------------------------------------------
// 2. MAIN HONEYCOMB LAYOUT
// ------------------------------------------------------------------

export interface HoneycombItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  background?: React.ReactNode;
  href?: string;
}

interface HoneycombLayoutProps {
  items: HoneycombItem[];
}

// Hard-coded debug atom for demonstration
const debugModeAtom = atom(false);

// Some sizing constants
const ITEM_SIZE = 96; // icon diameter
const LABEL_SIZE = 28;
const GUTTER = 48;
const PAGE_GUTTER = ITEM_SIZE * 2 + GUTTER; // spacing between pages
const MAX_CONTAINER_WIDTH = 1024 - PAGE_GUTTER;
const ORNAMENT_WIDTH = 68 + 16 * 2 + 1 * 16; // example offset
const GRID_VERTICAL_SPACING_FACTOR = {
  condensed: 0.9,
  default: 1.4,
};

const DEBUG_CLASSNAMES = [
  "after:absolute",
  "after:left-0",
  "after:top-0",
  "after:z-40",
  "after:text-xs",
  "after:p-2",
  "after:shadow-md",
  "after:tabular-nums",
  "outline",
];

export function HoneycombLayout({ items }: HoneycombLayoutProps) {
  const [animateOverwrite, setAnimateOverwrite] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const DEBUG = useAtomValue(debugModeAtom);
  const { width = 600, height = 600 } = useWindowSize();

  // Motion values
  const x = useMotionValue(0);

  // Condensed or normal spacing based on window size
  const isCondensedWidth = width <= 896;
  const isCondensedHeight = height <= 460;
  const verticalSpacing = isCondensedHeight
    ? GRID_VERTICAL_SPACING_FACTOR.condensed
    : GRID_VERTICAL_SPACING_FACTOR.default;

  // Container width
  let containerWidth = Math.min(width, MAX_CONTAINER_WIDTH);
  if (isCondensedWidth) {
    containerWidth = containerWidth - ORNAMENT_WIDTH;
  }

  // Limit the number of columns
  const maxCols = Math.min(
    Math.floor((containerWidth - ITEM_SIZE) / (ITEM_SIZE + GUTTER)),
    4,
  );
  // items per page (3 rows with an extra middle cell => maxCols*3 + 1)
  const itemsPerPage = maxCols * 3 + 1;

  // Break items into pages
  const pages: HoneycombItem[][] = [];
  for (let i = 0; i < items.length; i += itemsPerPage) {
    pages.push(items.slice(i, i + itemsPerPage));
  }

  // Calculate actual page width
  const rawPageWidth = maxCols * (ITEM_SIZE + GUTTER) + PAGE_GUTTER;
  // "padding" keeps pages from overshooting container width
  const padding = Math.max(
    0,
    containerWidth - rawPageWidth - ITEM_SIZE + PAGE_GUTTER,
  );
  const pageWidth = rawPageWidth - padding;

  // Debug logging when x changes
  useMotionValueEvent(x, "change", (latest) => {
    if (DEBUG && containerRef.current) {
      containerRef.current.setAttribute(
        "data-debug",
        `View(${containerWidth}px) • ${Math.round(latest)}px`,
      );
    }
  });

  function onDragEnd(_event: any, info: PanInfo) {
    const currentX = x.get();
    const rawPageIndex = -currentX / pageWidth;
    const nearestPage = Math.round(rawPageIndex);
    const clampedPage = Math.max(0, Math.min(nearestPage, pages.length - 1));
    const finalX = -clampedPage * pageWidth;
    // Animate to final
    animate(x, finalX, { type: "spring", stiffness: 90, damping: 18 });
  }

  // Reset x on unmount
  useEffect(() => {
    return () => x.set(0);
  }, [x]);

  const providerValue: HoneycombContextValue = {
    debug: DEBUG,
    scrollX: x,
    pageWidth,
    itemSize: ITEM_SIZE,
    labelSize: LABEL_SIZE,
    gutter: GUTTER,
    verticalSpacing,
    animateOverwrite,
    setAnimateOverwrite,
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: containerWidth,
        height: (ITEM_SIZE + LABEL_SIZE) * 3 + GUTTER * verticalSpacing,
        marginLeft: "auto",
        marginRight: "auto",
        overflow: "visible",
        position: "relative",
        paddingLeft: padding / 2,
        paddingRight: padding / 2,
      }}
      data-debug={`View(${containerWidth}px) • 0px`}
      className={cn(
        DEBUG && [
          ...DEBUG_CLASSNAMES,
          "outline-yellow-500",
          "after:content-[attr(data-debug)]",
          "after:absolute after:left-0 after:top-0 after:z-40",
          "after:bg-yellow-500 after:p-2 after:text-xs after:text-yellow-900",
        ],
      )}
    >
      <motion.div
        ref={innerRef}
        drag="x"
        dragConstraints={{
          left: Math.min(-pageWidth * (pages.length - 1), 0),
          right: 0,
        }}
        dragElastic={0.25}
        onDragEnd={onDragEnd}
        data-debug={`Drag Constraints • Left: ${Math.min(
          -pageWidth * (pages.length - 1),
          0,
        )}px, Right: 0px • padding: ${padding}px`}
        className={cn(
          "relative h-full",
          DEBUG && [
            ...DEBUG_CLASSNAMES,
            "outline-sky-500",
            "after:content-[attr(data-debug)]",
            "after:absolute after:left-0 after:top-[2rem] after:z-[41]",
            "after:bg-sky-500 after:p-2 after:text-xs after:text-sky-950",
          ],
        )}
        style={{
          x,
          touchAction: "none",
          userSelect: "none",
        }}
      >
        <HoneycombProvider value={providerValue}>
          {pages.map((pageItems, pageIndex) => {
            const pageOffset = pageIndex * pageWidth;
            return (
              <PageContent
                key={pageIndex}
                pageItems={pageItems}
                pageIndex={pageIndex}
                pageOffset={pageOffset}
              />
            );
          })}
        </HoneycombProvider>
      </motion.div>
    </div>
  );
}

// ------------------------------------------------------------------
// 3. PAGE (contains 3 rows of HoneycombCell)
// ------------------------------------------------------------------

const pageVariants = {
  hidden: {
    scale: 0.93,
  },
  visible: {
    scale: 1,
    transition: {
      delay: 0.2,
      type: "spring",
      stiffness: 80,
      damping: 18,
      mass: 1.2,
    },
  },
  zoomOut: {
    scale: 1.08,
  },
};

function PageContent({
  pageItems,
  pageIndex,
  pageOffset,
}: {
  pageItems: HoneycombItem[];
  pageIndex: number;
  pageOffset: number;
}) {
  const isMounted = useIsMounted();
  const [show, setShow] = useState(false);
  const { debug, pageWidth, itemSize, gutter, animateOverwrite } =
    useHoneycombContext();

  // We figure out how many columns we can have by seeing how many fits into a single page
  // For consistency, we re-derive it from (pageWidth - PAGE_GUTTER) / (itemSize+gutter) or so.
  // Or you might pass `maxCols` in context if that’s simpler.
  // For brevity, let's just guess 4 columns from the original logic:
  const maxCols = Math.min(
    Math.floor((pageWidth - 96) / (itemSize + gutter)),
    4,
  );

  useEffect(() => {
    if (isMounted()) setShow(true);
  }, [isMounted]);

  if (!show) return null;

  return (
    <motion.div
      key={pageIndex}
      style={{
        position: "absolute",
        top: 0,
        left: pageOffset,
        width: pageWidth,
        height: "100%",
      }}
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit={animateOverwrite ? "zoomOut" : "hidden"}
      transition={{
        duration: 1,
        type: "spring",
        bounce: 0,
      }}
      data-debug={`Page ${pageIndex}: ${pageWidth}px`}
      className={cn(
        debug && [
          ...DEBUG_CLASSNAMES,
          "outline-green-500",
          "after:content-[attr(data-debug)]",
          "after:absolute after:left-0 after:top-[-2rem]",
          "after:bg-green-500 after:p-2 after:text-xs after:text-green-900",
        ],
      )}
    >
      <motion.ul
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {pageItems.map((item, i) => {
          // Row-col math. (Same as your original code)
          let row: number;
          let col: number;
          if (i < maxCols) {
            row = 0;
            col = i;
          } else if (i < maxCols * 2 + 1) {
            row = 1;
            col = i - maxCols;
          } else {
            row = 2;
            col = i - maxCols * 2 - 1;
          }

          return (
            <HoneycombCell
              key={item.id}
              item={item}
              index={i}
              row={row}
              col={col}
              maxCols={maxCols}
              pageOffset={pageOffset}
            />
          );
        })}
      </motion.ul>
    </motion.div>
  );
}

// ------------------------------------------------------------------
// 4. CELL (single circular icon + label)
// ------------------------------------------------------------------

const tapVariants = {
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      bounce: 0,
    },
  },
  tap: {
    scale: 0.9,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 8,
      mass: 0.1,
    },
  },
};

const cellXclassName = {
  "-4": "[--cell-x:-4px]",
  "-3": "[--cell-x:-3px]",
  "-2": "[--cell-x:-2px]",
  "-1": "[--cell-x:-1px]",
  "0": "[--cell-x:0px]",
  "1": "[--cell-x:1px]",
  "2": "[--cell-x:2px]",
  "3": "[--cell-x:3px]",
  "4": "[--cell-x:4px]",
};

const cellYclassName = {
  "-2": "[--cell-y:-2px]",
  "0": "[--cell-y:0px]",
  "2": "[--cell-y:2px]",
};

function HoneycombCell({
  item,
  row,
  col,
  maxCols,
  pageOffset,
}: {
  item: HoneycombItem;
  row: number;
  col: number;
  maxCols: number;
  pageOffset: number;
  index: number;
}) {
  const {
    debug,
    scrollX,
    pageWidth,
    itemSize,
    gutter,
    labelSize,
    verticalSpacing,
    animateOverwrite,
    setAnimateOverwrite,
  } = useHoneycombContext();

  const id = useId();
  const router = useRouter();

  const [isMouseDown, setIsMouseDown] = useState(false);

  // Some geometry
  const halfOffset = (itemSize + gutter) / 2;
  let cellX =
    row === 1
      ? col * (itemSize + gutter)
      : halfOffset + col * (itemSize + gutter);
  const cellY = row * (itemSize + gutter * verticalSpacing);

  // 1) Opacity + scale transforms based on how far the page is from center
  const inputRange = [
    -cellX - pageOffset + pageWidth,
    -cellX - pageOffset + pageWidth - itemSize,
    -cellX - pageOffset,
    -cellX - itemSize - pageOffset,
  ];
  const opacity = useTransform(scrollX, inputRange, [0, 1, 1, 0]);
  const scale = useTransform(scrollX, inputRange, [0.75, 1, 1, 0.75]);
  const filter = useTransform(scrollX, inputRange, [
    "blur(16px)",
    "blur(0px)",
    "blur(0px)",
    "blur(16px)",
  ]);

  // 2) Middle row parallax effect
  const middleRowParallax = useTransform(
    scrollX,
    [-pageOffset - pageWidth, -pageOffset, -pageOffset + pageWidth],
    [-itemSize * 0.7, 0, itemSize * 0.7],
  );

  // 3) "Center-out" reveal offsets for the first page
  const orderX = 2 * col - maxCols + (row !== 1 ? 1 : 0);
  const orderY = (row - 1) * 2;
  const startX =
    ITEM_SIZE *
    -(orderX / maxCols) *
    0.1 *
    (Math.abs(row - 1) + Math.abs(col - 2));
  const startY = -(itemSize / 3) * (row - 1);
  const wrapperVariants = {
    initialFirstPage: { x: startX, y: startY, filter: "blur(16px)" },
    initialOtherPages: { scale: 1, filter: "blur(0px)" },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: 0.15 + 0.1 * (Math.abs(row - 1) + Math.abs(col - 2)),
        type: "spring",
        duration: 1.2,
        bounce: 0,
      },
    },
    exit: {
      x: startX,
      y: startY,
      filter: "blur(16px)",
      transition: {
        duration: 0.5,
      },
    },
    zoomOut: {
      x: -startX,
      y: -startY,
      filter: "blur(16px)",
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const isOnFirstPage = pageOffset === 0;

  return (
    <motion.li
      style={{
        position: "absolute",
        left: cellX,
        top: cellY,
        x: row === 1 ? middleRowParallax : 0,
        scale,
      }}
      initial={isOnFirstPage ? "initialFirstPage" : "initialOtherPages"}
      animate={
        animateOverwrite ? "zoomOut" : isOnFirstPage ? "animate" : undefined
      }
      exit="exit"
      variants={wrapperVariants}
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
      onMouseLeave={() => setIsMouseDown(false)}
      className={cn("group/cell", debug && ["outline", "outline-pink-500"])}
      onClick={() => {
        if (item.href) {
          const href = item.href;
          setTimeout(() => {
            setAnimateOverwrite(true);
            router.push(href, {
              scroll: false,
            });
          }, 200);
        }
      }}
    >
      {/* Icon bubble */}
      <motion.div
        variants={tapVariants}
        animate={isMouseDown ? "tap" : undefined}
        whileHover={isMouseDown ? undefined : "hover"}
        transition={tapVariants.hover.transition}
        className={cn(
          "group/icon",
          cellXclassName[orderX.toString() as keyof typeof cellXclassName],
          cellYclassName[orderY.toString() as keyof typeof cellYclassName],
        )}
      >
        <Window
          className="rounded-full backdrop-blur [--diameter:96px] [--radius:48px] before:rounded-full"
          thickness="none"
          style={{
            width: itemSize,
            height: itemSize,
            opacity,
            filter,
          }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-full">
            {debug && (
              <span className="absolute inset-0 flex h-full w-full items-center justify-center rounded-full bg-black/50 text-center font-mono text-xs font-light tabular-nums text-white/85">
                {Math.round(cellX)},{Math.round(cellY)}
                <br />
                row:{row} col:{col}
                {isMouseDown ? " 👆" : ""}
              </span>
            )}
            {item.background && (
              <div className={"pointer-events-none absolute inset-0"}>
                {item.background}
                <div
                  className={cn(
                    "absolute inset-0 z-10 bg-white/5 opacity-0 transition-opacity",
                    "bg-blend-overlay",
                    "group-hover/cell:opacity-100",
                  )}
                />
              </div>
            )}
            {item.icon && (
              <div className="absolute inset-0 z-[11]">{item.icon}</div>
            )}
          </div>
        </Window>
      </motion.div>

      {/* Label */}
      <motion.div
        className="pointer-events-none flex items-center justify-center text-center text-xs text-white/30 transition-colors group-hover/cell:text-white/70"
        style={{
          height: labelSize,
          width: itemSize,
          opacity,
          filter,
        }}
        whileHover={{
          opacity: 1,
        }}
      >
        {item.label}
      </motion.div>
    </motion.li>
  );
}

export const honeycombIconClassName = cn(
  "object-contain p-3 transition-all duration-300 pointer-events-none touch-none",
  "translate-y-0 translate-x-0 group-hover/cell:!translate-y-[var(--cell-y,-1px)] group-hover/cell:!translate-x-[var(--cell-x,-1px)]",
  "[filter:drop-shadow(0px_0px_1px_rgba(12,12,12,0))] group-hover/cell:[filter:drop-shadow(calc(var(--cell-x,-1px)*-1.5)_calc(var(--cell-y,-1px)*-1.5)_1px_rgba(0,0,0,0.33))]",
);
