// app/data/products.ts

// The shape of one product. Everything in the app is typed against this.
export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  category: "Sneakers" | "Audio" | "Wearables" | "Gadgets";
  emoji: string;
  accent: string; // card art background color
  image: string; // photo in public/products/, e.g. "/products/wave-runner.jpg"
  description: string;
  specs: string[];
}

export const products: Product[] = [
  {
    id: "wave-runner",
    name: "Wave Runner",
    tagline: "Everyday running sneakers built for long miles.",
    price: 129,
    category: "Sneakers",
    emoji: "👟",
    accent: "#6c8cff",
    image: "/products/wave-runner.jpg",
    description:
      "A lightweight daily trainer with a springy foam midsole and a breathable knit upper.",
    specs: ["Knit upper", "Foam midsole", "320g per shoe", "Unisex sizing"],
  },
  {
    id: "trail-blazer",
    name: "Trail Blazer",
    tagline: "Grippy trail shoes for mud, rock, and root.",
    price: 149,
    category: "Sneakers",
    emoji: "🥾",
    accent: "#4fb286",
    image: "/products/trail-blazer.jpg",
    description:
      "Aggressive 5mm lugs, a rock plate, and a water-resistant upper keep you steady off-road.",
    specs: ["5mm lugs", "Rock plate", "Water-resistant upper", "Gusseted tongue"],
  },
  {
    id: "pulse-buds",
    name: "Pulse Buds",
    tagline: "Wireless earbuds with deep, clean bass.",
    price: 89,
    category: "Audio",
    emoji: "🎧",
    accent: "#a06cff",
    image: "/products/pulse-buds.jpg",
    description:
      "Compact earbuds with active noise cancellation and an eight-hour battery.",
    specs: ["Active noise cancel", "8h battery", "USB-C case", "IPX4 sweatproof"],
  },
  {
    id: "boom-cube",
    name: "Boom Cube",
    tagline: "A pocket speaker that fills the room.",
    price: 59,
    category: "Audio",
    emoji: "🔊",
    accent: "#ff8a5c",
    image: "/products/boom-cube.jpg",
    description:
      "A palm-sized Bluetooth speaker with 360° sound, a 12-hour battery, and a rugged shell.",
    specs: ["360° sound", "12h battery", "Bluetooth 5.3", "IP67 waterproof"],
  },
  {
    id: "stride-watch",
    name: "Stride Watch",
    tagline: "GPS smartwatch that tracks every step and lap.",
    price: 199,
    category: "Wearables",
    emoji: "⌚",
    accent: "#ff6c9a",
    image: "/products/stride-watch.jpg",
    description:
      "Built-in GPS, heart-rate tracking, and a bright always-on display in a light aluminium case.",
    specs: ["Built-in GPS", "Heart-rate sensor", "7-day battery", "50m water resistant"],
  },
  {
    id: "focus-band",
    name: "Focus Band",
    tagline: "A slim fitness band for sleep and recovery.",
    price: 69,
    category: "Wearables",
    emoji: "📿",
    accent: "#3fc1c9",
    image: "/products/focus-band.jpg",
    description:
      "A screenless band that tracks sleep stages, recovery, and daily strain with gentle haptic nudges.",
    specs: ["Sleep staging", "Recovery score", "10-day battery", "Silicone strap"],
  },
  {
    id: "volt-pack",
    name: "Volt Pack",
    tagline: "Fast-charging power bank for long days out.",
    price: 49,
    category: "Gadgets",
    emoji: "🔋",
    accent: "#f5b942",
    image: "/products/volt-pack.jpg",
    description:
      "A 20,000mAh power bank with 65W USB-C output, enough to top up a laptop on the go.",
    specs: ["20,000mAh", "65W USB-C PD", "2 USB-C + 1 USB-A", "LED charge display"],
  },
  {
    id: "echo-max",
    name: "Echo Max",
    tagline: "Over-ear headphones for deep focus and long flights.",
    price: 249,
    category: "Audio",
    emoji: "🎧",
    accent: "#c9a27e",
    image: "/products/echo-max.jpg",
    description:
      "Plush over-ear headphones with adaptive noise cancelling, rich detailed sound, and a 30-hour battery.",
    specs: ["Adaptive noise cancel", "30h battery", "Fold-flat design", "Multipoint Bluetooth"],
  },
];

// Helper: look up one product by its id. Returns undefined if not found.
export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
