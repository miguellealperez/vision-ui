/** biome-ignore-all lint/a11y/useSemanticElements: <explanation> */
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "./scrollview";

type FlashListRenderItem<T> = (info: {
  item: T;
  index: number;
}) => React.ReactNode;

type FlashListProps<T> = {
  data: T[];
  renderItem: FlashListRenderItem<T>;
  keyExtractor?: (item: T, index: number) => string;
  ListHeaderComponent?: React.ReactNode | (() => React.ReactNode);
  ListFooterComponent?: React.ReactNode | (() => React.ReactNode);
  contentContainerClassName?: string;
  className?: string;
  estimatedItemSize?: number;
  onEndReached?: () => void;
  onEndReachedThreshold?: number; // 0..1 of remaining distance
  horizontal?: boolean;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
};

/** We might use a virtualized list in the future */
function FlashListInner<T>({
  data,
  renderItem,
  keyExtractor,
  ListHeaderComponent,
  ListFooterComponent,
  contentContainerClassName,
  className,
  onEndReached,
  onEndReachedThreshold = 0.1,
  horizontal = false,
  onScroll,
  ...props
}: FlashListProps<T>) {
  const endReachedRef = React.useRef(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    onScroll?.(e);
    const el = e.currentTarget;
    if (horizontal) {
      const remaining = el.scrollWidth - el.clientWidth - el.scrollLeft;
      if (
        !endReachedRef.current &&
        remaining <= el.clientWidth * onEndReachedThreshold
      ) {
        endReachedRef.current = true;
        onEndReached?.();
      }
      if (remaining > el.clientWidth * onEndReachedThreshold)
        endReachedRef.current = false;
    } else {
      const remaining = el.scrollHeight - el.clientHeight - el.scrollTop;
      if (
        !endReachedRef.current &&
        remaining <= el.clientHeight * onEndReachedThreshold
      ) {
        endReachedRef.current = true;
        onEndReached?.();
      }
      if (remaining > el.clientHeight * onEndReachedThreshold)
        endReachedRef.current = false;
    }
  };

  const header =
    typeof ListHeaderComponent === "function"
      ? ListHeaderComponent()
      : ListHeaderComponent;
  const footer =
    typeof ListFooterComponent === "function"
      ? ListFooterComponent()
      : ListFooterComponent;

  return (
    <ScrollAreaRoot
      className={cn(horizontal ? "flex-row" : "flex-col", className)}
      onScroll={handleScroll}
      role="list"
      {...props}
    >
      {header}
      <ScrollAreaViewport
        className={cn("h-[400px]", contentContainerClassName)}
      >
        {data.map((item, index) => (
          <div
            key={
              keyExtractor
                ? keyExtractor(item, index)
                : String((item as unknown as { id?: string }).id ?? index)
            }
            role="listitem"
          >
            {renderItem({ item, index })}
          </div>
        ))}
      </ScrollAreaViewport>
      {footer}
      <ScrollAreaScrollbar className={cn(className)}>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollAreaRoot>
  );
}

export const FlashList = React.memo(FlashListInner) as typeof FlashListInner;
export type { FlashListRenderItem, FlashListProps };
