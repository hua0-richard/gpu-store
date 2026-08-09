import * as React from "react";

import { cn } from "@/lib/utils";

/** Horizontal rhythm every element on the page aligns to. */
export const GUTTER = "px-6 md:px-10";

export function Container({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl", GUTTER, className)}
      {...props}
    />
  );
}

/**
 * The content column. Its vertical rules run the full height of the page and
 * act as the reference edges for every section, grid, and table inside it.
 */
export function Frame({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-6xl flex-1 flex-col border-border md:border-x",
        className,
      )}
      {...props}
    />
  );
}

/** A grid whose cells are separated by exact hairlines, wrapping included. */
export function CellGrid({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("grid gap-px bg-border", className)} {...props} />;
}

/**
 * A cell inside CellGrid. Padding matches GUTTER exactly so cell content lines
 * up with the frame's edges no matter how many columns a row wraps into.
 */
export const CELL = "bg-background py-7 md:py-9 " + GUTTER;

export function Cell({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn(CELL, className)} {...props} />;
}
