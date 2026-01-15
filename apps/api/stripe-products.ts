import Stripe from "stripe";
import "dotenv/config";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
});

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

type ProductInput = {
  name: string;
  description?: string;
  unitAmountCents: number;
  currency?: string;
  metadata?: Record<string, string>;
};

async function createProductWithPrice(input: ProductInput) {
  console.log(`Creating product: ${input.name}`);

  const product = await stripe.products.create({
    name: input.name,
    description: input.description,
    metadata: input.metadata,
  });

  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: input.unitAmountCents,
    currency: (input.currency ?? "usd").toLowerCase(),
  });

  console.log("✅ Created");
  console.log("  Product:", product.id);
  console.log("  Price:  ", price.id);

  return { productId: product.id, priceId: price.id };
}

const PRODUCTS: ProductInput[] = [
  {
    name: "GPU Credits – 100",
    description: "100 GPU compute credits",
    unitAmountCents: 1000,
    currency: "usd",
    metadata: { credits: "100", sku: "GPU-100" },
  },
  {
    name: "GPU Credits – 500",
    description: "500 GPU compute credits",
    unitAmountCents: 4500,
    currency: "usd",
    metadata: { credits: "500", sku: "GPU-500" },
  },
  {
    name: "GPU Credits – 1000",
    description: "1000 GPU compute credits",
    unitAmountCents: 8000,
    currency: "usd",
    metadata: { credits: "1000", sku: "GPU-1000" },
  },
];

async function main() {
  for (const product of PRODUCTS) {
    await createProductWithPrice(product);
  }

  console.log("\n🎉 Stripe product seeding complete");
}

main().catch((err) => {
  console.error("Error creating Stripe products");
  console.error(err);
  process.exit(1);
});
