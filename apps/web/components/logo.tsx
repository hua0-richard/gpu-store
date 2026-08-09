import Link from "next/link";

import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("size-5", className)}
    >
      <rect
        x="2.75"
        y="2.75"
        width="18.5"
        height="18.5"
        rx="5.25"
        stroke="currentColor"
        strokeOpacity="0.3"
        strokeWidth="1.5"
      />
      <rect
        x="7.75"
        y="7.75"
        width="8.5"
        height="8.5"
        rx="1.5"
        transform="rotate(45 12 12)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="1.75" fill="currentColor" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 text-foreground transition-opacity hover:opacity-70",
        className,
      )}
    >
      <LogoMark />
      <span className="text-[15px] font-medium tracking-[-0.03em]">tensor</span>
    </Link>
  );
}
