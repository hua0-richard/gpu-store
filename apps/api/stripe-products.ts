import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // apiVersion: "2024-06-20", // optional: pin
});

type GpuModel = {
  vendor: "AMD" | "NVIDIA";
  gpuModel: string;

  // Used by your server to compute dynamic price (cents per GPU-hour)
  gpuHourlyRateCents: number;

  currency?: string;
};

const SEED_TAG = process.env.SEED_TAG ?? "gpu-dynamic-v1";

const GPU_MODELS: GpuModel[] = [
  { vendor: "AMD", gpuModel: "MI300X", gpuHourlyRateCents: 1200 },
  { vendor: "AMD", gpuModel: "MI325X", gpuHourlyRateCents: 1400 },
  { vendor: "AMD", gpuModel: "MI355X", gpuHourlyRateCents: 1600 },
  { vendor: "AMD", gpuModel: "MI250X", gpuHourlyRateCents: 1000 },

  { vendor: "NVIDIA", gpuModel: "A100", gpuHourlyRateCents: 1500 },
  { vendor: "NVIDIA", gpuModel: "H100", gpuHourlyRateCents: 2000 },
  { vendor: "NVIDIA", gpuModel: "H200", gpuHourlyRateCents: 2300 },
];

function modelSku(vendor: string, gpuModel: string) {
  return `${vendor}-${gpuModel}`.toUpperCase(); // e.g. NVIDIA-H100
}

function productName(vendor: string, gpuModel: string) {
  return `${vendor} ${gpuModel} – Compute (Hourly)`;
}

function productDescription(vendor: string, gpuModel: string) {
  return `GPU compute for ${vendor} ${gpuModel}. Price is computed dynamically based on selected GPUs / vCPUs / storage / hours.`;
}

async function findActiveProductBySeedSku(seed: string, sku: string) {
  let startingAfter: string | undefined;

  while (true) {
    const page = await stripe.products.list({ limit: 100, starting_after: startingAfter });

    const hit = page.data.find(
      (p) => p.active && p.metadata?.seed === seed && p.metadata?.sku === sku
    );
    if (hit) return hit;

    if (!page.has_more) return null;
    startingAfter = page.data.at(-1)?.id;
  }
}

async function ensureModelProduct(model: GpuModel) {
  const sku = modelSku(model.vendor, model.gpuModel);

  let product = await findActiveProductBySeedSku(SEED_TAG, sku);

  if (!product) {
    console.log(`Creating product: ${sku}`);
    product = await stripe.products.create({
      name: productName(model.vendor, model.gpuModel),
      description: productDescription(model.vendor, model.gpuModel),
      metadata: {
        seed: SEED_TAG,
        sku,
        vendor: model.vendor,
        gpuModel: model.gpuModel,

        // store your base rate for reference/debug (your app should still be the source of truth)
        gpuHourlyRateCents: String(model.gpuHourlyRateCents),
        pricing: "dynamic",
        unit: "hour",
      },
    });
    console.log(`✅ Product created: ${product.id}`);
  } else {
    console.log(`ℹ️ Product exists: ${sku} -> ${product.id}`);
  }

  return product;
}

async function main() {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error("Missing STRIPE_SECRET_KEY in env.");

  console.log(`Seeding dynamic GPU products (seed=${SEED_TAG})...`);

  for (const model of GPU_MODELS) {
    await ensureModelProduct(model);
  }

  console.log("✅ Done.");
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});