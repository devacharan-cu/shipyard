// app/data/reviews.ts
// Customer reviews for each product. Only the lazily loaded Reviews panel
// imports this file, so none of it ships in a product page's first load.
import { products, type Product } from "./products";

export interface Review {
  id: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  date: string; // ISO date, e.g. "2026-03-14"
  verified: boolean;
  helpful: number;
}

const authors = [
  "Aarav S.", "Priya M.", "Rohan K.", "Ananya R.", "Kabir P.", "Meera J.",
  "Vikram T.", "Isha D.", "Arjun N.", "Diya L.", "Karan B.", "Sneha V.",
  "Aditya G.", "Nisha F.", "Rahul C.", "Tara H.", "Dev A.", "Riya Q.",
];

const byCategory: Record<Product["category"], { title: string; body: string }[]> = {
  Sneakers: [
    { title: "Comfortable from day one", body: "No break-in period at all. I wore them for a full day of walking and my feet felt great." },
    { title: "Great grip", body: "Traction is excellent on wet pavement and loose gravel. I feel confident on every run." },
    { title: "Runs a little small", body: "Love the shoe, but I had to size up half a size. Check the size chart before ordering." },
    { title: "Light and breathable", body: "My feet stay cool even in hot weather. The upper breathes really well." },
    { title: "Solid cushioning", body: "Enough bounce for long runs without feeling mushy. My knees thank me." },
    { title: "Sole wore out quickly", body: "Comfortable, but the outsole showed wear after a couple of months of daily use." },
  ],
  Audio: [
    { title: "Punchy, clean sound", body: "Bass is deep without drowning the vocals. Easily the best audio I have owned at this price." },
    { title: "Battery lasts forever", body: "I charge it maybe once a week. The quoted battery life is honest." },
    { title: "Noise cancelling works", body: "Blocks out the train and office chatter. I can actually focus now." },
    { title: "Pairing is quick", body: "Connected to my phone and laptop in seconds and switches between them smoothly." },
    { title: "Fit could be better", body: "Sound is great but the fit gets uncomfortable after a couple of hours." },
    { title: "App is clunky", body: "The hardware is excellent, the companion app less so. EQ settings are hard to find." },
  ],
  Wearables: [
    { title: "Accurate tracking", body: "Step count and heart rate match my chest strap closely. Very impressed." },
    { title: "Sleep insights are useful", body: "The sleep breakdown helped me fix my bedtime routine. I feel more rested." },
    { title: "Battery as advertised", body: "Easily lasts the full week with all tracking turned on." },
    { title: "Comfortable to wear 24/7", body: "So light I forget I am wearing it, even while sleeping." },
    { title: "Strap irritates a bit", body: "Works perfectly but the strap made my wrist itchy during workouts." },
    { title: "GPS takes a moment", body: "Takes about 30 seconds to lock GPS, after that it is spot on." },
  ],
  Gadgets: [
    { title: "Charges everything", body: "Topped up my laptop, phone, and earbuds on one charge during a long trip." },
    { title: "Built like a tank", body: "Dropped it twice already and it still looks and works like new." },
    { title: "Fast charging is real", body: "My phone goes from 10% to 60% in about half an hour." },
    { title: "A bit heavy", body: "Does the job well, but it is heavier than I expected for daily carry." },
    { title: "Handy display", body: "The charge readout is accurate, so I always know how much is left." },
    { title: "Great value", body: "Does everything the expensive brands do for a fraction of the price." },
  ],
};

// Small deterministic PRNG so every build produces the same reviews.
function seededRandom(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}

// Fisher-Yates shuffle driven by the seeded PRNG.
function shuffle<T>(items: T[], rand: () => number): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Every review for a product uses a different template and a different author.
function buildReviews(product: Product): Review[] {
  const rand = seededRandom(product.id);
  const templates = shuffle(byCategory[product.category], rand);
  const people = shuffle(authors, rand);

  return templates.map((template, i) => {
    const negative = /small|wore|fit|clunky|irritates|heavy|moment/i.test(template.title);
    const rating = (negative ? 2 + Math.floor(rand() * 2) : 4 + Math.floor(rand() * 2)) as Review["rating"];
    const month = String(1 + Math.floor(rand() * 10)).padStart(2, "0");
    const day = String(1 + Math.floor(rand() * 28)).padStart(2, "0");

    return {
      id: `${product.id}-${i}`,
      author: people[i],
      rating,
      title: template.title,
      body: template.body,
      date: `2026-${month}-${day}`,
      verified: rand() > 0.25,
      helpful: Math.floor(rand() * 40),
    };
  });
}

const reviewsByProduct: Record<string, Review[]> = Object.fromEntries(
  products.map((product) => [product.id, buildReviews(product)]),
);

export function getReviews(productId: string): Review[] {
  return reviewsByProduct[productId] ?? [];
}
