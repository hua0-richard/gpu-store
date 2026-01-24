"use client";
import Link from "next/link";
import { robotoMono } from "@/app/fonts";
import { ArrowRight } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Navigation() {
  return (
    <NavigationMenu className={robotoMono.className} viewport={false}>
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="block">
          <NavigationMenuTrigger>AMD</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[150px] gap-1 p-1">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/amd/config/mi300x">
                    <div className="font-medium">MI300X</div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/amd/config/mi325x">
                    <div className="font-medium">MI325X</div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/amd/config/mi355x">
                    <div className="font-medium">MI355X</div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/amd/config/mi250x">
                    <div className="font-medium">MI250X</div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/amd">
                    <div className="flex justify-between ">
                      <div className="font-medium">View All</div>
                      <ArrowRight></ArrowRight>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="block">
          <NavigationMenuTrigger>NVIDIA</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[150px] gap-1 p-1">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/nvidia/config/a100">
                    <div className="font-medium">A100</div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/nvidia/config/h100">
                    <div className="font-medium">H100</div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/nvidia/config/h200">
                    <div className="font-medium">H200</div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/nvidia">
                    <div className="flex justify-between ">
                      <div className="font-medium">View All</div>
                      <ArrowRight></ArrowRight>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}