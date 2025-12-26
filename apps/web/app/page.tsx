import Image from "next/image";
import { ModeToggle } from "@/components/theme-toggle";
import { ProductCard } from "@/components/product-card";
import { NavigationMenuDemo } from "@/components/navigation";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen min-w-screen items-center justify-start bg-zinc-50 font-sans dark:bg-black">
      <main className="flex h-screen w-full flex-col items-start justify-start bg-white dark:bg-black sm:items-start">
        <div className="flex w-full flex items-center justify-between py-16 px-16">
          <NavigationMenuDemo></NavigationMenuDemo>
          <ModeToggle></ModeToggle>
        </div>
        <div className="px-16">
          <h1 className="mt-10 text-4xl font-bold text-gray-900 dark:text-gray-100">GPU-accelerated infrastructure for training, inference, and scale.</h1>
        </div>
        <div className="px-16">
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Build, deploy, and manage your AI applications with ease using our cutting-edge GPU solutions.</p>
        </div>
        <div className="w-full flex justify-start items-center gap-6 mt-10 px-16 pb-16">
          <ProductCard></ProductCard>
          <ProductCard></ProductCard>
        </div>
          <div className="w-screen h-full flex bg-primary text-primary">Dos</div>
          <div className="w-screen h-full flex bg-secondary text-primary">Explore our state of the art gpus</div>
          <div className="w-screen h-full flex bg-secondary text-primary">footer</div>
      </main>
    </div>
  );
}
