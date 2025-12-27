import { robotoMono } from "@/app/fonts";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const gpus = [
  {
    gpu: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    gpu: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    gpu: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    gpu: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    gpu: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    gpu: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export function TableDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] font-xl"></TableHead>
          <TableHead className="text-2xl my-8">VRAM</TableHead>
          <TableHead className="text-2xl">vCPU</TableHead>
          <TableHead className="text-2xl text-right">RAM</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {gpus.map((gpu) => (
          <TableRow key={gpu.gpu} className={`pb-8 ${robotoMono.className}`}>
            <TableCell className="text-2xl font-semibold py-8 w-[200px]">
              {gpu.gpu}
            </TableCell>
            <TableCell>{gpu.paymentStatus}</TableCell>
            <TableCell>{gpu.paymentMethod}</TableCell>
            <TableCell>{gpu.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
