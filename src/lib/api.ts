export interface Product {
  id: string;
  slug: string;

  name: string;
  description: string;

  price: number;

  image: string;
  hoverImage?: string;

  category: string;

  sizes: string[];

  stock: number;

  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "velvet-lace-set",
    name: "Velvet Lace Set",
    description: "Elegant velvet lace lingerie set designed for comfort and luxury.",
    price: 850000,
    image: "/p1.png",
    hoverImage: "p2.png",
    category: "Lingerie",
    sizes: ["S", "M", "L"],
    stock: 10,
    featured: true,
  },

  {
    id: "2",
    slug: "silk-sleepwear",
    name: "Silk Sleepwear",
    description: "Soft silk sleepwear perfect for a luxurious night.",
    price: 1200000,
    image: "/p2.png",
    hoverImage: "/p1.png",
    category: "Sleepwear",
    sizes: ["M", "L", "XL"],
    stock: 7,
    featured: true,
  },

  {
    id: "3",
    slug: "classic-satin-bodysuit",
    name: "Classic Satin Bodysuit",
    description: "Minimal satin bodysuit with elegant fit and premium fabric.",
    price: 950000,
    image: "/p3.png",
    hoverImage: "/p2.png",
    category: "Bodysuit",
    sizes: ["S", "M", "L"],
    stock: 12,
    featured: false,
  },
];
