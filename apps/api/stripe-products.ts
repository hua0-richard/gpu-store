// seed-stripe-gpu-hourly.ts
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
});

type ProductInput = {
  vendor: "AMD" | "NVIDIA";
  gpuModel: string;
  hourlyRateCents: number;
  currency?: string;
};

const GPU_HOURLY: ProductInput[] = [
  { vendor: "AMD", gpuModel: "MI300X", hourlyRateCents: 1200 },
  { vendor: "AMD", gpuModel: "MI325X", hourlyRateCents: 1400 },
  { vendor: "AMD", gpuModel: "MI355X", hourlyRateCents: 1600 },
  { vendor: "AMD", gpuModel: "MI250X", hourlyRateCents: 1000 },

  { vendor: "NVIDIA", gpuModel: "A100", hourlyRateCents: 1500 },
  { vendor: "NVIDIA", gpuModel: "H100", hourlyRateCents: 2000 },
  { vendor: "NVIDIA", gpuModel: "H200", hourlyRateCents: 2300 },
];

function skuFor(vendor: string, gpuModel: string) {
  return `${vendor}-${gpuModel}`.toUpperCase(); // e.g. NVIDIA-H100
}

function productName(vendor: string, gpuModel: string) {
  return `${vendor} ${gpuModel} – GPU Hour`;
}

function productDescription(vendor: string, gpuModel: string) {
  return `1 hour of GPU compute on ${vendor} ${gpuModel}. (Adjust quantity for hours.)`;
}

async function findActiveProductBySku(sku: string) {
  let startingAfter: string | undefined;

  while (true) {
    const page = await stripe.products.list({ limit: 100, starting_after: startingAfter });
    const hit = page.data.find((p) => p.active && p.metadata?.sku === sku);
    if (hit) return hit;

    if (!page.has_more) return null;
    startingAfter = page.data.at(-1)?.id;
  }
}

async function findActiveHourlyPrice(productId: string, currency: string) {
  let startingAfter: string | undefined;

  while (true) {
    const page = await stripe.prices.list({
      limit: 100,
      product: productId,
      starting_after: startingAfter,
      active: true,
    });

    const hit = page.data.find(
      (pr) =>
        pr.active &&
        pr.type === "one_time" &&
        pr.currency === currency &&
        pr.metadata?.unit === "hour"
    );

    if (hit) return hit;

    if (!page.has_more) return null;
    startingAfter = page.data.at(-1)?.id;
  }
}

async function createProductWithHourlyPrice(input: ProductInput) {
  const currency = (input.currency ?? "usd").toLowerCase();
  const sku = skuFor(input.vendor, input.gpuModel);

  console.log(`\n=== ${input.vendor} ${input.gpuModel} ===`);
  console.log(`SKU: ${sku}`);

  let product = await findActiveProductBySku(sku);

  if (!product) {
    console.log("Creating product...");
    product = await stripe.products.create({
      name: productName(input.vendor, input.gpuModel),
      description: productDescription(input.vendor, input.gpuModel),
      metadata: {
        sku,
        vendor: input.vendor,
        gpuModel: input.gpuModel,
        unit: "hour",
      },
    });
    console.log("✅ Product created:", product.id);
  } else {
    console.log("ℹ️ Product exists:", product.id);
  }

  const existingPrice = await findActiveHourlyPrice(product.id, currency);

  if (existingPrice) {
    const existingAmount = existingPrice.unit_amount ?? undefined;

    if (existingAmount !== input.hourlyRateCents) {
      console.log(
        `⚠️ Hourly price exists but amount differs (existing ${existingAmount} vs desired ${input.hourlyRateCents}).`
      );
      console.log("Deactivating old price and creating a new one...");

      await stripe.prices.update(existingPrice.id, { active: false });

      const newPrice = await stripe.prices.create({
        product: product.id,
        unit_amount: input.hourlyRateCents,
        currency,
        metadata: {
          unit: "hour",
          sku: `${sku}-HOUR`,
        },
      });

      console.log("✅ New hourly price created:", newPrice.id);
      return { productId: product.id, priceId: newPrice.id };
    }

    console.log("ℹ️ Hourly price exists:", existingPrice.id);
    return { productId: product.id, priceId: existingPrice.id };
  }

  console.log("Creating hourly price...");
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: input.hourlyRateCents,
    currency,
    metadata: {
      unit: "hour",
      sku: `${sku}-HOUR`,
    },
  });

  console.log("✅ Hourly price created:", price.id);

  return { productId: product.id, priceId: price.id };
}

async function main() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing STRIPE_SECRET_KEY in env.");
  }

  console.log("Seeding Stripe GPU hourly products + prices...");

  for (const input of GPU_HOURLY) {
    await createProductWithHourlyPrice(input);
  }

  console.log("\n✅ Done.");
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});