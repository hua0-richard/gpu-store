import { robotoMono } from "@/app/fonts";

export default function Footer() {
  return (
    <div
      className={`w-full flex flex-col md:flex-row justify-start gap-8 items-start py-16 text-sm ${robotoMono.className}`}
    >
      <div className="w-full md:w-[400px] flex flex-col gap-2">
        <h1 className="px-2 py-2 font-semibold text-zinc-900 dark:text-white">About</h1>
        <hr className="border-border"></hr>
        <div className="group cursor-pointer px-2 py-2 text-zinc-500 transition-all duration-300 hover:tracking-wide hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">Discover</span>
        </div>
        <div className="group cursor-pointer px-2 py-2 text-zinc-500 transition-all duration-300 hover:tracking-wide hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">About</span>
        </div>
        <div className="group cursor-pointer px-2 py-2 text-zinc-500 transition-all duration-300 hover:tracking-wide hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">Company</span>
        </div>
      </div>

      <div className="w-full md:w-[400px] flex flex-col gap-2">
        <h1 className="px-2 py-2 font-semibold text-zinc-900 dark:text-white">Product</h1>
        <hr className="border-border"></hr>
        <div className="group cursor-pointer px-2 py-2 text-zinc-500 transition-all duration-300 hover:tracking-wide hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">Disclaimer</span>
        </div>
      </div>
    </div>
  );
}
