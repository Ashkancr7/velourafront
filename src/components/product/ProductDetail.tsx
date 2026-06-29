// components/product/ProductDetail.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import Toast from "@/components/Toast";
import type { Product } from "@/types/api";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  
  const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);
  const [selectedColorId, setSelectedColorId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  // استخراج رنگ‌های یکتا
  const availableColors = useMemo(() => {
    if (!product?.variants) return [];
    const colorsMap = new Map();
    product.variants.forEach((v) => colorsMap.set(v.color.id, v.color));
    return Array.from(colorsMap.values());
  }, [product]);

  // استخراج سایزهای یکتا
  const availableSizes = useMemo(() => {
    if (!product?.variants) return [];
    const sizesMap = new Map();
    product.variants.forEach((v) => sizesMap.set(v.size.id, v.size));
    return Array.from(sizesMap.values());
  }, [product]);

  // 🔥 پیدا کردن تنوع انتخاب شده در همون لحظه
  const currentVariant = useMemo(() => {
    if (!selectedColorId || !selectedSizeId || !product?.variants) return null;
    return product.variants.find(
      (v) => v.color.id === selectedColorId && v.size.id === selectedSizeId
    );
  }, [selectedColorId, selectedSizeId, product]);

  // وقتی سایز یا رنگ عوض شد، تعداد رو برگردون رو ۱ که باگ نخوره
  useEffect(() => {
    setQuantity(1);
  }, [selectedColorId, selectedSizeId]);

  const handleAddToCart = () => {
    if (!selectedSizeId || !selectedColorId) {
      alert("رفیق، لطفاً سایز و رنگ رو انتخاب کن!");
      return;
    }

    if (!currentVariant || currentVariant.stock < quantity) {
      alert("متاسفانه از این ترکیب رنگ و سایز به تعداد کافی موجود نیست!");
      return;
    }

    const colorObj = availableColors.find(c => c.id === selectedColorId);
    const sizeObj = availableSizes.find(s => s.id === selectedSizeId);

    for (let i = 0; i < quantity; i++) {
      addToCart({ 
        ...product, 
        size: sizeObj?.name, 
        color: colorObj?.color_code,
        variantId: currentVariant.id 
      });
    }

    setShowToast(true);
  };

  // 🔥 محدود کردن افزایش تعداد به اندازه موجودی انبار
  const increaseQty = () => {
    if (!selectedColorId || !selectedSizeId) {
      alert("اول رنگ و سایز رو انتخاب کن!");
      return;
    }
    if (currentVariant && quantity < currentVariant.stock) {
      setQuantity((q) => q + 1);
    } else {
      alert("موجودی انبارمون برای این ترکیب بیشتر از این نیست رفیق! 😅");
    }
  };

  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const selectedColorName = availableColors.find(c => c.id === selectedColorId)?.name || "";

  return (
    <>
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-gray-100 aspect-square relative overflow-hidden rounded-lg">
            <Image
              src={product.image}
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
              {Number(product.price).toLocaleString("fa-IR")} تومان
            </p>

            <p className="text-gray-600 leading-7 mb-8">
              {product.description || "این محصول از بهترین متریال طراحی شده تا علاوه بر راحتی، زیبایی و حس لوکس بودن را برای شما به ارمغان بیاورد."}
            </p>

            {/* Color Selector */}
            {availableColors.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-3 text-sm font-medium">رنگ: <span className="text-gray-600 font-normal">{selectedColorName}</span></h3>
                <div className="flex gap-3">
                  {availableColors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColorId(color.id)}
                      title={color.name}
                      className={`w-8 h-8 rounded-full border transition-all duration-200 
                      ${
                        selectedColorId === color.id
                          ? "ring-2 ring-offset-2 ring-[#BFA46F] border-transparent"
                          : "border-gray-300 hover:border-gray-500"
                      }`}
                      style={{ backgroundColor: color.color_code }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {availableSizes.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-3 text-sm font-medium">انتخاب سایز</h3>
                <div className="flex gap-3">
                  {availableSizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSizeId(size.id)}
                      className={`px-5 py-2 border text-sm transition-all duration-200 rounded-md
                      ${
                        selectedSizeId === size.id
                          ? "border-[#BFA46F] text-[#BFA46F] bg-[#BFA46F]/10"
                          : "border-gray-300 hover:border-gray-700"
                      }`}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Stock Info */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-3">
                <h3 className="text-sm font-medium">تعداد</h3>
                {/* 🔥 نمایش زنده موجودی! */}
                {selectedColorId && selectedSizeId && (
                  <span className={`text-xs px-2 py-1 rounded-md font-medium ${
                    currentVariant && currentVariant.stock > 0 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {currentVariant 
                      ? currentVariant.stock > 0 
                        ? `موجودی: ${currentVariant.stock.toLocaleString("fa-IR")} عدد` 
                        : "ناموجود در این رنگ و سایز 😔"
                      : "ناموجود در این رنگ و سایز 😔"}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={decreaseQty}
                  className="w-10 h-10 border border-gray-300 rounded-md hover:border-gray-700 transition-colors flex items-center justify-center text-lg"
                >
                  −
                </button>
                <span className="w-12 text-center font-medium">{quantity.toLocaleString("fa-IR")}</span>
                <button
                  onClick={increaseQty}
                  className="w-10 h-10 border border-gray-300 rounded-md hover:border-gray-700 transition-colors flex items-center justify-center text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={currentVariant?.stock === 0}
              className={`w-full py-3.5 text-sm font-medium transition-colors duration-200 mt-auto rounded-lg shadow-sm
                ${currentVariant?.stock === 0 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-[#BFA46F] text-white hover:bg-[#a88c55]'
                }`}
            >
              {currentVariant?.stock === 0 ? 'ناموجود' : 'افزودن به سبد خرید'}
            </button>
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
