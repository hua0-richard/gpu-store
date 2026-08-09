"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

const OPTIONS = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

export function ThemeSwitch({ size = "md" }: { size?: "sm" | "md" }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // The resolved theme is only known on the client, so nothing is marked
  // active until then rather than briefly highlighting the wrong option.
  useEffect(() => setMounted(true), []);

  const compact = size === "sm";

  return (
    <div
      role="group"
      aria-label="Theme"
      className={cn(
        "inline-flex items-center rounded-full border border-border p-0.5",
        compact ? "gap-0" : "gap-0.5",
      )}
    >
      {OPTIONS.map((option) => {
        const active = mounted && theme === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setTheme(option.value)}
            aria-label={option.label}
            aria-pressed={active}
            className={cn(
              "flex items-center justify-center rounded-full transition-colors",
              compact ? "size-[22px]" : "size-6",
              active
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <option.icon className={compact ? "size-3" : "size-3.5"} />
          </button>
        );
      })}
    </div>
  );
}
