"use client";
import Link from "next/link";
import { robotoMono } from "@/app/fonts";
import { ArrowRight } from "lucide-react";

// import { useIsMobile } from "@/hooks/use-mobile"
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
  //  const isMobile = useIsMobile()
  // const isMobile = false;

  return (
    <NavigationMenu className={robotoMono.className}>
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>AMD</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[150px] gap-1 p-1">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">MI300X</div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">MI325X</div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">MI355X</div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">MI250X</div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">
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
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>NVIDIA</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[150px] gap-1 p-1">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">A100</div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">H100</div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">
                    <div className="font-medium">H200</div>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#">
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