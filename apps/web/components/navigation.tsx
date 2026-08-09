"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const VENDORS = [
  {
    label: "NVIDIA",
    href: "/nvidia",
    basePath: "/nvidia/config",
    items: [
      { id: "a100", name: "A100", memory: "80GB HBM2e" },
      { id: "h100", name: "H100", memory: "80GB HBM3" },
      { id: "h200", name: "H200", memory: "141GB HBM3e" },
    ],
  },
  {
    label: "AMD",
    href: "/amd",
    basePath: "/amd/config",
    items: [
      { id: "mi250x", name: "MI250X", memory: "128GB HBM3" },
      { id: "mi300x", name: "MI300X", memory: "192GB HBM3" },
      { id: "mi325x", name: "MI325X", memory: "256GB HBM3E" },
      { id: "mi355x", name: "MI355X", memory: "288GB HBM3E" },
    ],
  },
];

const linkClass =
  "flex h-8 items-center rounded-md px-2.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground";

const triggerClass =
  "h-8 bg-transparent px-2.5 text-[13px] font-normal text-muted-foreground hover:bg-transparent hover:text-foreground focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:text-foreground data-[state=open]:hover:bg-transparent";

export function Navigation({ showClusters }: { showClusters?: boolean }) {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList className="gap-0">
        <NavigationMenuItem>
          <NavigationMenuTrigger className={triggerClass}>
            GPUs
          </NavigationMenuTrigger>
          <NavigationMenuContent className="p-0">
            <div className="grid w-[440px] grid-cols-2">
              {VENDORS.map((vendor, index) => (
                <div
                  key={vendor.label}
                  className={cn(
                    "flex flex-col p-1.5",
                    index > 0 && "border-l border-border",
                  )}
                >
                  <p className="eyebrow px-2 pb-1.5 pt-2">{vendor.label}</p>
                  <ul>
                    {vendor.items.map((item) => (
                      <li key={item.id}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={`${vendor.basePath}/${item.id}`}
                            className="flex-row items-center justify-between gap-6 px-2 py-1.5 text-[13px]"
                          >
                            <span>{item.name}</span>
                            <span className="font-mono text-[11px] text-muted-foreground">
                              {item.memory}
                            </span>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto border-t border-border pt-1.5">
                    <NavigationMenuLink asChild>
                      <Link
                        href={vendor.href}
                        className="group/all flex-row items-center justify-between px-2 py-1.5 text-[13px] text-muted-foreground"
                      >
                        All {vendor.label}
                        <ArrowRight className="size-3 transition-transform group-hover/all:translate-x-0.5" />
                      </Link>
                    </NavigationMenuLink>
                  </div>
                </div>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href="/#pricing" className={linkClass}>
              Pricing
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {showClusters && (
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/dashboard" className={linkClass}>
                Clusters
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
