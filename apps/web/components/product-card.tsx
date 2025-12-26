"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function ProductCard() {
  return (
    <Card
      className="max-w-600 w-100 flex-col justify-between items-end h-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-lg"
      style={{ backgroundImage: "url('/hpc-press-hgx-h100-1600x900.jpg')" }}
    >
      <CardContent className="flex items-center justify-center"></CardContent>
      <CardFooter>
        <Button><SearchIcon></SearchIcon></Button>
      </CardFooter>
    </Card>
  );
}
