"use client";

import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";
import type * as React from "react";
import { cn } from "@/lib/utils";
import { type GlassThickness, Material, type MaterialProps } from "./material";

export type ViewProps = React.HTMLAttributes<HTMLDivElement> & {
  material?: boolean | { thickness?: GlassThickness };
};

function View({
  className,
  style,
  material = false,
  children,
  ...rest
}: ViewProps) {
  if (material) {
    const thickness =
      typeof material === "object" ? material.thickness : "normal";
    return (
      <Material
        thickness={thickness}
        className={cn(className)}
        style={style}
        {...(rest as MaterialProps)}
      >
        {children}
      </Material>
    );
  }
  return (
    <div className={cn(className)} style={style} {...rest}>
      {children}
    </div>
  );
}

export type ScrollViewProps = React.ComponentPropsWithoutRef<
  typeof ScrollAreaPrimitive.Root
> & {
  contentProps?: React.ComponentPropsWithoutRef<
    typeof ScrollAreaPrimitive.Viewport
  >;
  material?: boolean | { thickness?: GlassThickness };
  className?: string;
  contentClassName?: string;
};

function ScrollView({
  className,
  children,
  contentProps,
  material = true,
  contentClassName,
  ...rest
}: ScrollViewProps) {
  const body = (
    <ScrollAreaPrimitive.Root className={cn("relative", className)} {...rest}>
      <ScrollAreaPrimitive.Viewport
        className={cn("h-full w-full rounded-[inherit]", contentClassName)}
        {...contentProps}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollAreaPrimitive.Scrollbar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );

  if (material) {
    const thickness =
      typeof material === "object" ? material.thickness : "normal";
    return (
      <Material thickness={thickness} className={cn("[--radius:34px]")}>
        {body}
      </Material>
    );
  }
  return body;
}

export { View, ScrollView };
