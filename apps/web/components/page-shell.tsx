import * as React from "react";

import Footer from "@/components/footer";
import NavigationBar from "@/components/navigation-bar";
import { Frame, GUTTER } from "@/components/layout";
import { cn } from "@/lib/utils";

export function PageShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavigationBar />
      <Frame>
        <main className={cn("flex-1 py-14 md:py-20", GUTTER, className)}>
          {children}
        </main>
        <Footer />
      </Frame>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-12 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
      <div className="space-y-2.5">
        <h1 className="text-subtitle">{title}</h1>
        {description && (
          <div className="text-[15px] leading-relaxed text-muted-foreground">
            {description}
          </div>
        )}
      </div>
      {action}
    </div>
  );
}
