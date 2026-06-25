"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/api";
import { useCartStore } from "@/store/cartStore";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);

  const imageSrc = product.image?.startsWith("/") ? product.image : `/${product.image || "placeholder.png"}`;
  const hoverImageSrc = product.hoverImage?.startsWith("/") ? product.hoverImage : `/${product.hoverImage}`;

  return (
    <div className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-[#BFA46F]/15 hover:border-[#BFA46F]/20">
      
      <Link href={`/product/${product.slug}`} className="block relative">
        <div className="aspect-square overflow-hidden bg-gray-50 relative">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {product.hoverImage && (
            <Image
              src={hoverImageSrc}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-opacity duration-700 opacity-0 group-hover:opacity-100"
            />
          )}

          {/* دکمه افزودن به سبد با استایل جدید */}
          {/* <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/90 backdrop-blur-md translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
              className="w-full bg-[#BFA46F] text-white py-2.5 rounded-xl text-sm font-medium hover:bg-[#a88c55] hover:shadow-lg hover:shadow-[#BFA46F]/30 transition-all duration-300"
            >
              افزودن سریع به سبد
            </button>
          </div> */}
        </div>
      </Link>

      <div className="p-5 text-right">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-base font-medium mb-2 text-gray-800 group-hover:text-[#BFA46F] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-[#BFA46F] font-semibold text-sm">
          {product.price.toLocaleString("fa-IR")} تومان
        </p>
      </div>
    </div>
  );
}
