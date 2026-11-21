export type CategoryId = "matcha" | "coffee" | "more";
export type ServeId = "iced" | "hot";

export interface MenuItem {
  id: string;
  name: string;
  blurb: string;
  price: number;
  category: CategoryId;
  tags: string[];
  badge?: string;
  serves: ServeId[];
  milk: boolean;
  addOns: string[];
  tone: string;
  big?: boolean;
}

export interface CartLine {
  key: string;
  itemId: string;
  name: string;
  unitPrice: number;
  qty: number;
  size: string;
  serve: string;
  milk: string;
  sweetness: string;
  addOns: string[];
}

export const STORE = {
  shortName: "MA CHA",
  fullName: "MA CHA (Coffee and Matcha takeaway)",
  addressLine1: "Blk 302 Ubi Ave 1, #01-79",
  addressLine2: "Singapore 400302",
  phoneDisplay: "+65 8748 3589",
  phoneTel: "+6587483589",
  whatsapp: "6587483589",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=MA+CHA+Coffee+and+Matcha+takeaway+302+Ubi+Ave+1+Singapore+400302",
  reviewsUrl:
    "https://www.google.com/maps/search/?api=1&query=MA+CHA+Coffee+and+Matcha+takeaway+302+Ubi+Ave+1+Singapore+400302",
  rating: 4.9,
  reviewCount: 40,
  fromPrice: 4.9,
  mrt: "2 min walk from Ubi MRT, Exit A",
  note: "A tiny counter inside an old-school fruit shop.",
} as const;

export interface TradingDay {
  index: number;
  day: string;
  short: string;
  open: number;
  close: number;
  label: string;
}

/** Index matches JavaScript Date#getDay(): 0 = Sunday. */
export const HOURS: TradingDay[] = [
  { index: 0, day: "Sunday", short: "Sun", open: 600, close: 990, label: "10:00 – 16:30" },
  { index: 1, day: "Monday", short: "Mon", open: 600, close: 1080, label: "10:00 – 18:00" },
  { index: 2, day: "Tuesday", short: "Tue", open: 600, close: 1080, label: "10:00 – 18:00" },
  { index: 3, day: "Wednesday", short: "Wed", open: 600, close: 1080, label: "10:00 – 18:00" },
  { index: 4, day: "Thursday", short: "Thu", open: 600, close: 1080, label: "10:00 – 18:00" },
  { index: 5, day: "Friday", short: "Fri", open: 600, close: 1080, label: "10:00 – 18:00" },
  { index: 6, day: "Saturday", short: "Sat", open: 600, close: 1080, label: "10:00 – 18:00" },
];

export const CATEGORIES: { id: CategoryId | "all"; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "matcha", label: "Matcha" },
  { id: "coffee", label: "Coffee" },
  { id: "more", label: "Not coffee" },
];

export const SIZES = [
  { id: "regular", label: "Regular", price: 0, note: "the usual" },
  { id: "upsize", label: "Upsize", price: 1, note: "+ $1.00, more of everything" },
] as const;

export const SERVES: { id: ServeId; label: string }[] = [
  { id: "iced", label: "Iced" },
  { id: "hot", label: "Hot" },
];

export const MILKS = [
  { id: "fresh", label: "Fresh milk", price: 0 },
  { id: "oat", label: "Oat milk", price: 1 },
  { id: "none", label: "No milk", price: 0 },
] as const;

export const SWEETNESS = [
  { id: "100", label: "100%" },
  { id: "75", label: "75%" },
  { id: "50", label: "50%" },
  { id: "25", label: "25%" },
  { id: "0", label: "0%" },
] as const;

export const ADD_ONS = [
  { id: "cold-foam", label: "Sea salt cold foam", price: 1, note: "+ $1.00" },
  { id: "extra-matcha", label: "Extra matcha shot", price: 1.5, note: "+ $1.50" },
  { id: "less-ice", label: "Less ice", price: 0, note: "no charge" },
] as const;

const ALL_ADDONS = ["cold-foam", "extra-matcha", "less-ice"];

export const MENU: MenuItem[] = [
  {
    id: "sea-salt-cold-foam",
    name: "Sea Salt Cold Foam MA CHA",
    blurb:
      "Our signature. Stone-ground Uji matcha, cold milk and a savoury sea-salt cloud poured over the top.",
    price: 6.5,
    category: "matcha",
    tags: ["Iced", "Cold foam", "Signature"],
    badge: "House favourite",
    serves: ["iced"],
    milk: true,
    addOns: ALL_ADDONS,
    tone: "#7f9a4a",
  },
  {
    id: "ma-cha-latte",
    name: "MA CHA Latte",
    blurb:
      "Smooth, earthy Uji matcha whisked to order with milk. Iced or hot, however you take it.",
    price: 5.9,
    category: "matcha",
    tags: ["Iced / hot", "Everyday"],
    serves: ["iced", "hot"],
    milk: true,
    addOns: ALL_ADDONS,
    tone: "#8ca452",
  },
  {
    id: "strawberry-ma-cha",
    name: "Strawberry MA CHA",
    blurb:
      "Real strawberry purée under a slow green pour. Fruity, creamy and quietly addictive.",
    price: 6.5,
    category: "matcha",
    tags: ["Iced", "Fruit-forward"],
    badge: "Neighbourhood pick",
    serves: ["iced"],
    milk: true,
    addOns: ALL_ADDONS,
    tone: "#bf4a59",
  },
  {
    id: "mango-ma-cha",
    name: "Mango MA CHA",
    blurb:
      "A generous spoon of mango purée, cold milk and matcha. Sunshine in a takeaway cup.",
    price: 6.5,
    category: "matcha",
    tags: ["Iced", "Fruit-forward"],
    serves: ["iced"],
    milk: true,
    addOns: ALL_ADDONS,
    tone: "#e2a83e",
  },
  {
    id: "earl-grey-ma-cha",
    name: "Earl Grey MA CHA",
    blurb:
      "Brewed earl grey meets matcha — bergamot, milk and a soft tea lift in every sip.",
    price: 6.5,
    category: "matcha",
    tags: ["Iced / hot", "Tea-forward"],
    serves: ["iced", "hot"],
    milk: true,
    addOns: ALL_ADDONS,
    tone: "#9a8fa8",
  },
  {
    id: "banana-pudding-ma-cha",
    name: "Banana Pudding MA CHA",
    blurb:
      "Banana pudding folded through matcha and milk. Some call it dessert. They are right.",
    price: 7.5,
    category: "matcha",
    tags: ["Iced", "Big cup"],
    serves: ["iced"],
    milk: true,
    addOns: ALL_ADDONS,
    tone: "#e0c56e",
    big: true,
  },
  {
    id: "tiramisu-ma-cha",
    name: "Tiramisu MA CHA",
    blurb:
      "Cocoa-dusted, tiramisu-inspired layers over matcha and milk. Worth the extra napkin.",
    price: 7.5,
    category: "matcha",
    tags: ["Iced", "Treat"],
    serves: ["iced"],
    milk: true,
    addOns: ALL_ADDONS,
    tone: "#a58b6a",
    big: true,
  },
  {
    id: "matcha-usucha",
    name: "Matcha Usucha",
    blurb:
      "Just matcha and water, whisked until frothy. The purist's order — and our lowest price.",
    price: 4.9,
    category: "matcha",
    tags: ["Iced / hot", "From $4.90"],
    serves: ["iced", "hot"],
    milk: false,
    addOns: ["extra-matcha", "less-ice"],
    tone: "#6d8a3c",
  },
  {
    id: "hojicha-latte",
    name: "Hojicha Latte",
    blurb:
      "Roasted green tea, nutty and mellow. The lower-caffeine crowd-pleaser.",
    price: 5.9,
    category: "matcha",
    tags: ["Iced / hot", "Low caffeine"],
    serves: ["iced", "hot"],
    milk: true,
    addOns: ALL_ADDONS,
    tone: "#a5714c",
  },
  {
    id: "chocolate-matcha",
    name: "Chocolate MA CHA",
    blurb:
      "Dark chocolate and matcha together. As bitter or as sweet as you ask us to make it.",
    price: 6.5,
    category: "matcha",
    tags: ["Iced / hot", "Not too sweet"],
    serves: ["iced", "hot"],
    milk: true,
    addOns: ALL_ADDONS,
    tone: "#6b4b3a",
  },
  {
    id: "ma-cha-kopi",
    name: "MA CHA Kopi",
    blurb:
      "Espresso and milk, sweet by neighbourhood default. Ask and we'll happily dial it back.",
    price: 4.9,
    category: "coffee",
    tags: ["Iced / hot", "Sweet-ish"],
    serves: ["iced", "hot"],
    milk: true,
    addOns: ["extra-matcha", "less-ice"],
    tone: "#7b5233",
  },
  {
    id: "long-black",
    name: "Long Black",
    blurb: "Double espresso, long and clean. No fuss, no foam, no fiddle.",
    price: 4.5,
    category: "coffee",
    tags: ["Iced / hot", "Strong"],
    serves: ["iced", "hot"],
    milk: false,
    addOns: ["less-ice"],
    tone: "#3f3026",
  },
  {
    id: "hazelnut-latte",
    name: "Hazelnut Latte",
    blurb: "Hazelnut, espresso and milk. A warm, nutty regular for the office run.",
    price: 5.5,
    category: "coffee",
    tags: ["Iced / hot", "Sweet-ish"],
    serves: ["iced", "hot"],
    milk: true,
    addOns: ALL_ADDONS,
    tone: "#b08959",
  },
  {
    id: "caramel-latte",
    name: "Caramel Latte",
    blurb: "Caramel and espresso with cold milk or steamed. A quiet little classic.",
    price: 5.5,
    category: "coffee",
    tags: ["Iced / hot", "Sweet-ish"],
    serves: ["iced", "hot"],
    milk: true,
    addOns: ALL_ADDONS,
    tone: "#c8913f",
  },
  {
    id: "dark-chocolate",
    name: "Dark Chocolate",
    blurb: "Proper dark chocolate, steamed or over ice. For the non-coffee people.",
    price: 5.5,
    category: "more",
    tags: ["Iced / hot", "No coffee"],
    serves: ["iced", "hot"],
    milk: true,
    addOns: ALL_ADDONS,
    tone: "#5b4034",
  },
  {
    id: "strawberry-milk",
    name: "Strawberry Milk",
    blurb: "Real strawberry purée and cold milk. Simple, cold, happy. Zero caffeine.",
    price: 5,
    category: "more",
    tags: ["Iced", "Caffeine-free"],
    serves: ["iced"],
    milk: true,
    addOns: ["less-ice"],
    tone: "#c96a76",
  },
];

export const FEATURED_IDS = ["sea-salt-cold-foam", "strawberry-ma-cha", "ma-cha-kopi"];

export const IMAGES = {
  hero: "https://images.pexels.com/photos/40865373/pexels-photo-40865373.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=900",
  seaSalt:
    "https://images.pexels.com/photos/37745284/pexels-photo-37745284.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
  strawberry:
    "https://images.pexels.com/photos/34491288/pexels-photo-34491288.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
  kopi: "https://images.pexels.com/photos/14283304/pexels-photo-14283304.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
  fruitShop:
    "https://images.pexels.com/photos/7618446/pexels-photo-7618446.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=900",
  whisk:
    "https://images.pexels.com/photos/8474184/pexels-photo-8474184.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=700&w=600",
  matchaHand:
    "https://images.pexels.com/photos/25686158/pexels-photo-25686158.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
  cafe:
    "https://images.pexels.com/photos/29156485/pexels-photo-29156485.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
  pour:
    "https://images.pexels.com/photos/8134134/pexels-photo-8134134.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=700",
};

export function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}

export function findItem(id: string): MenuItem | undefined {
  return MENU.find((item) => item.id === id);
}
