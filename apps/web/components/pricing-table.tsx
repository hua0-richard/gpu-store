import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const GPUS = [
  {
    model: "NVIDIA A100",
    vram: "80GB HBM2e",
    architecture: "Ampere",
    price: "$3.50",
    href: "/nvidia/config/a100",
  },
  {
    model: "NVIDIA H100",
    vram: "80GB HBM3",
    architecture: "Hopper",
    price: "$4.75",
    href: "/nvidia/config/h100",
  },
  {
    model: "NVIDIA H200",
    vram: "141GB HBM3e",
    architecture: "Hopper",
    price: "$5.50",
    href: "/nvidia/config/h200",
  },
  {
    model: "AMD MI250X",
    vram: "128GB HBM3",
    architecture: "CDNA3",
    price: "$2.50",
    href: "/amd/config/mi250x",
  },
  {
    model: "AMD MI300X",
    vram: "192GB HBM3",
    architecture: "CDNA3",
    price: "$3.75",
    href: "/amd/config/mi300x",
  },
  {
    model: "AMD MI325X",
    vram: "256GB HBM3E",
    architecture: "CDNA3",
    price: "$4.50",
    href: "/amd/config/mi325x",
  },
  {
    model: "AMD MI355X",
    vram: "288GB HBM3E",
    architecture: "CDNA4",
    price: "$6.00",
    href: "/amd/config/mi355x",
  },
];

const FIRST = "pl-6 pr-4 md:pl-10";
const LAST = "pl-4 pr-6 md:pr-10";

export function PricingTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-border hover:bg-transparent">
          <TableHead className={`eyebrow h-11 font-normal ${FIRST}`}>
            Model
          </TableHead>
          <TableHead className="eyebrow h-11 px-4 font-normal">
            Memory
          </TableHead>
          <TableHead className="eyebrow hidden h-11 px-4 font-normal sm:table-cell">
            Architecture
          </TableHead>
          <TableHead className={`eyebrow h-11 text-right font-normal ${LAST}`}>
            Per hour
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {GPUS.map((gpu) => (
          <TableRow key={gpu.model} className="group border-border">
            <TableCell className={`py-4 text-[14px] ${FIRST}`}>
              <Link
                href={gpu.href}
                className="inline-flex items-center gap-2 transition-colors"
              >
                {gpu.model}
                <ArrowRight className="size-3 -translate-x-1 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
            </TableCell>
            <TableCell className="px-4 py-4 font-mono text-[13px] text-muted-foreground">
              {gpu.vram}
            </TableCell>
            <TableCell className="hidden px-4 py-4 text-[13px] text-muted-foreground sm:table-cell">
              {gpu.architecture}
            </TableCell>
            <TableCell
              className={`py-4 text-right font-mono text-[14px] ${LAST}`}
            >
              {gpu.price}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
