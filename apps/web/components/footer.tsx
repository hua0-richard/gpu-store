import Link from "next/link";

import { LogoMark } from "@/components/logo";
import { GUTTER } from "@/components/layout";

const SECTIONS = [
  {
    title: "Compute",
    links: [
      { label: "NVIDIA", href: "/nvidia" },
      { label: "AMD", href: "/amd" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Status", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "Support", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={`border-t border-border py-14 md:py-16 ${GUTTER}`}>
      <div className="flex flex-col gap-12 md:flex-row md:justify-between">
        <div className="max-w-[15rem] space-y-3">
          <div className="flex items-center gap-2">
            <LogoMark />
            <span className="text-[15px] font-medium tracking-[-0.03em]">
              tensor
            </span>
          </div>
          <p className="text-[13px] leading-relaxed text-muted-foreground">
            GPU compute for training, inference, and everything in between.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-10 gap-y-10 sm:grid-cols-3 md:gap-x-20">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="eyebrow">{section.title}</h2>
              <ul className="mt-4 space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 flex items-center justify-between gap-4 border-t border-border pt-6">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Tensor
        </p>
        <p className="text-xs text-muted-foreground">
          Demo project — not a real compute provider.
        </p>
      </div>
    </footer>
  );
}
