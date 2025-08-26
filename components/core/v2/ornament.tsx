"use client";

import { Tabs as TabsPrimitive } from "radix-ui";
import * as React from "react";
import { cn } from "@/lib/utils";
import { type GlassThickness, Material } from "./material";
import { Text } from "./text";

export type OrnamentScreenProps = {
  name: string;
  title?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
};

export type OrnamentProps = {
  defaultScreen?: string;
  onChange?: (name: string) => void;
  orientation?: "horizontal" | "vertical";
  material?: boolean | { thickness?: GlassThickness };
  className?: string;
  contentClassName?: string;
};

const Screen = (_props: OrnamentScreenProps) => null;

const OrnamentComponent = ({
  children,
  defaultScreen,
  onChange,
  orientation = "vertical",
  material = true,
  className,
  contentClassName,
}: React.PropsWithChildren<OrnamentProps>) => {
  const screens = React.Children.toArray(children).filter(
    Boolean,
  ) as React.ReactElement<OrnamentScreenProps>[];
  const names = screens.map((s) => s.props.name);
  const [value, setValue] = React.useState<string>(defaultScreen || names[0]);

  const body = (
    <TabsPrimitive.Root
      value={value}
      onValueChange={(v) => {
        setValue(v);
        onChange?.(v);
      }}
      orientation={orientation}
      className={cn("relative grid h-full w-full flex-1", className)}
    >
      <TabsPrimitive.List asChild>
        <div
          className={cn(
            "z-[42] mx-auto flex items-center justify-start gap-2 p-2",
            orientation === "vertical" ? "flex-col" : "flex-row",
          )}
          role="tablist"
        >
          {screens.map((s) => (
            <TabsPrimitive.Trigger
              key={s.props.name}
              value={s.props.name}
              asChild
            >
              <button
                className={cn(
                  "flex w-full items-center gap-2 rounded-full px-3 py-2 text-white/80 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
                )}
                aria-label={s.props.title || s.props.name}
                type="button"
              >
                {s.props.icon && (
                  <span className="size-6" aria-hidden>
                    {s.props.icon}
                  </span>
                )}
                <Text asChild>
                  <span className="text-sm font-medium">
                    {s.props.title || s.props.name}
                  </span>
                </Text>
              </button>
            </TabsPrimitive.Trigger>
          ))}
        </div>
      </TabsPrimitive.List>
      <TabsPrimitive.Content value={value} asChild>
        <div className={cn("relative order-2 w-full", contentClassName)}>
          {screens.find((s) => s.props.name === value)?.props.children}
        </div>
      </TabsPrimitive.Content>
    </TabsPrimitive.Root>
  );

  if (material) {
    const thickness =
      typeof material === "object" ? material.thickness : "normal";
    return <Material thickness={thickness}>{body}</Material>;
  }
  return body;
};

const Ornament = Object.assign(OrnamentComponent, {
  Screen: Screen,
});

export { Ornament };
