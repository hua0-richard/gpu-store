import { robotoMono } from "@/app/fonts";

export default function Footer() {
  return (
    <div
      className={`w-full flex flex-col md:flex-row justify-start gap-8 items-start py-16 text-sm ${robotoMono.className}`}
    >
      <div className="w-full md:w-[400px] flex flex-col gap-2">
        <h1 className="px-2 py-2 font-semibold">About</h1>
        <hr className="border-border"></hr>
        <div className="px-2 py-2 hover:bg-primary hover:text-secondary">
          Discover
        </div>
        <div className="px-2 py-2 hover:bg-primary hover:text-secondary">
          About
        </div>
        <div className="px-2 py-2 hover:bg-primary hover:text-secondary">
          Company
        </div>
      </div>

      <div className="w-full md:w-[400px] flex flex-col gap-2">
        <h1 className="px-2 py-2 font-semibold">Product</h1>
        <hr className="border-border"></hr>
        <div className="px-2 py-2 hover:bg-primary hover:text-secondary">
          Disclaimer
        </div>
      </div>
    </div>
  );
}
