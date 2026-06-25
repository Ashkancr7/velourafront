// components/product/ProductDetail.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import Toast from "@/components/Toast";
import type { Product } from "@/lib/api";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const sizes = ["S", "M", "L", "XL"];
  
  // شش رنگ پرمیوم و شیک برای برند ولورا
  const colors = [
    { id: "black", hex: "#1A1A1A", name: "مشکی" },
    { id: "white", hex: "#F9F9F9", name: "سفید" },
    { id: "gold", hex: "#BFA46F", name: "طلایی" },
    { id: "nude", hex: "#E8C3B8", name: "نود" },
    { id: "wine", hex: "#6A1E27", name: "زرشکی" },
    { id: "navy", hex: "#2C3E50", name: "سرمه‌ای" },
  ];

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert("رفیق، لطفاً سایز و رنگ رو انتخاب کن!");
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart({ ...product, size: selectedSize, color: selectedColor });
    }

    setShowToast(true);
  };

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <>
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-gray-100 aspect-square relative overflow-hidden rounded-lg">
            <Image
              src={product.image.startsWith("/") ? product.image : `/${product.image}`}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-light mb-3">{product.name}</h1>

            <p className="text-2xl text-[#BFA46F] font-semibold mb-6">
              {product.price.toLocaleString("fa-IR")} تومان
            </p>

            <p className="text-gray-600 leading-7 mb-8">
              این محصول از بهترین متریال طراحی شده تا علاوه بر راحتی، زیبایی و حس
              لوکس بودن را برای شما به ارمغان بیاورد.
            </p>

            {/* Color Selector */}
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-medium">رنگ: {colors.find(c => c.hex === selectedColor)?.name || ""}</h3>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.hex)}
                    title={color.name}
                    className={`w-8 h-8 rounded-full border transition-all duration-200 
                    ${
                      selectedColor === color.hex
                        ? "ring-2 ring-offset-2 ring-[#BFA46F] border-transparent"
                        : "border-gray-300 hover:border-gray-500"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-medium">انتخاب سایز</h3>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-2 border text-sm transition-all duration-200
                    ${
                      selectedSize === size
                        ? "border-[#BFA46F] text-[#BFA46F] bg-[#BFA46F]/10"
                        : "border-gray-300 hover:border-gray-700"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <h3 className="mb-3 text-sm font-medium">تعداد</h3>
              <div className="flex items-center gap-3">
                <button
                  onClick={decreaseQty}
                  className="w-10 h-10 border border-gray-300 hover:border-gray-700 transition-colors flex items-center justify-center text-lg"
                >
                  −
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={increaseQty}
                  className="w-10 h-10 border border-gray-300 hover:border-gray-700 transition-colors flex items-center justify-center text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-[#BFA46F] text-white py-3.5 text-sm font-medium hover:bg-[#a88c55] transition-colors duration-200 mt-auto rounded-lg shadow-sm"
            >
              افزودن به سبد خرید
            </button>

            <p className="text-xs text-gray-400 mt-4 text-center cursor-pointer hover:text-gray-600 transition-colors">
              راهنمای سایزبندی
            </p>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message="محصول با موفقیت به سبد خرید اضافه شد ✓"
          productName={product.name}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}
