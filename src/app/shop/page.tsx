"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiShoppingCart } from "react-icons/fi";
import { SearchX } from "lucide-react";

import { Product } from '@/types/api';
import { getProducts, getCategories } from '@/lib/api';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<{ id: string | number, name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories()
        ]);

        setProducts(productsData);
        setCategories(categoriesData);

      } catch (error) {
        console.error("خطا در دریافت اطلاعات:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((product: Product) => {
      if (activeCategory === "All") return true;
      return product.category?.name === activeCategory;
    });

    if (sortBy === "price-asc") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return result;
  }, [activeCategory, sortBy, products]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div className="space-y-3">
            <div className="h-7 w-52 rounded-md bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-28 rounded bg-zinc-100 dark:bg-zinc-700" />
          </div>

          <div className="h-10 w-36 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
  {Array.from({ length: 8 }).map((_, i) => (
    <div
      key={i}
      className="animate-pulse rounded-2xl border border-gray-100 bg-white p-2.5 sm:p-4"
    >
      {/* Image */}
      <div className="relative w-full h-40 sm:h-64 rounded-xl bg-gray-200 overflow-hidden">
  <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
</div>

      {/* Content */}
      <div className="mt-3 space-y-2">
        <div className="h-3 w-14 rounded bg-gray-200" />

        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-3/4 rounded bg-gray-200" />

        <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="h-5 w-24 rounded bg-gray-200" />
          <div className="h-8 w-8 rounded-full bg-gray-200" />
        </div>
      </div>
    </div>
  ))}
</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl pt-8">
      <h1 className="text-3xl font-bold mb-8 text-right text-gray-800 border-r-4 border-[#BFA46F] pr-4">فروشگاه ولورا</h1>

      {/* کانتینر اصلی: سایدبار + گرید محصولات */}
      <div className="flex flex-col lg:flex-row gap-8">

        {/* ===================== سایدبار دسته‌بندی‌ها ===================== */}
        <aside className="w-full lg:w-1/4 xl:w-1/5 shrink-0">
          <div className="lg:sticky lg:top-24 bg-white p-4 lg:p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4 text-gray-800 hidden lg:block border-b pb-3">دسته‌بندی محصولات</h3>

            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 hide-scrollbar">
              {/* دکمه "همه" */}
              <button
                onClick={() => setActiveCategory("All")}
                className={`text-right px-5 py-3 rounded-xl transition-all font-medium whitespace-nowrap lg:whitespace-normal flex items-center justify-between ${activeCategory === "All"
                  ? "bg-[#BFA46F] text-white shadow-md"
                  : "bg-gray-50 lg:bg-transparent text-gray-600 hover:bg-[#BFA46F]/10 hover:text-[#BFA46F]"
                  }`}
              >
                <span>همه محصولات</span>
                {activeCategory === "All" && <span className="hidden lg:block w-2 h-2 rounded-full bg-white"></span>}
              </button>

              {/* رندر داینامیک دسته‌بندی‌ها */}
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`text-right px-5 py-3 rounded-xl transition-all font-medium whitespace-nowrap lg:whitespace-normal flex items-center justify-between ${activeCategory === cat.name
                    ? "bg-[#BFA46F] text-white shadow-md"
                    : "bg-gray-50 lg:bg-transparent text-gray-600 hover:bg-[#BFA46F]/10 hover:text-[#BFA46F]"
                    }`}
                >
                  <span>{cat.name}</span>
                  {activeCategory === cat.name && <span className="hidden lg:block w-2 h-2 rounded-full bg-white"></span>}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* ===================== بخش اصلی محتوا (مرتب‌سازی و محصولات) ===================== */}
        <main className="flex-1 w-full">

          {/* نوار بالایی (مرتب‌سازی و تعداد محصولات) */}
          <div className="flex flex-row justify-between items-center mb-6 bg-white p-3 lg:p-4 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-sm hidden sm:block font-medium">
              نمایش <span className="text-[#BFA46F] font-bold">{filteredAndSortedProducts.length}</span> محصول
            </p>

            <div className="w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-64 p-2.5 border border-gray-200 rounded-xl outline-none focus:border-[#BFA46F] focus:ring-1 focus:ring-[#BFA46F] bg-gray-50 text-gray-700 cursor-pointer transition-all text-sm font-medium"
              >
                <option value="default">مرتب‌سازی پیش‌فرض</option>
                <option value="price-asc">ارزان‌ترین به گران‌ترین</option>
                <option value="price-desc">گران‌ترین به ارزان‌ترین</option>
              </select>
            </div>
          </div>


          {/* گرید محصولات */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {filteredAndSortedProducts.length > 0 ? (
              filteredAndSortedProducts.map((product) => (
                <Link href={`/product/${product.slug || product.id}`} key={product.id}>
                  {/* پدینگ و حاشیه‌ها تو گوشی کمتر (p-2.5) و تو دسکتاپ بیشتر (sm:p-4) تنظیم شد */}
                  <div className="bg-white border border-gray-100 rounded-2xl p-2.5 sm:p-4 cursor-pointer hover:shadow-xl hover:border-[#BFA46F]/30 hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">

                    {/* ارتفاع عکس تو گوشی کمتر (h-40) و تو دسکتاپ بیشتر (sm:h-64) */}
                    <div className="relative w-full h-40 sm:h-64 mb-2 sm:mb-4 overflow-hidden rounded-xl bg-gray-50 shrink-0">
                      <Image
                        src={product.image || "/placeholder.png"}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    <div className="space-y-1 sm:space-y-2 flex flex-col flex-1 justify-between">
                      <div>
                        {/* سایز فونت‌ها برای گوشی بهینه شد */}
                        <p className="text-gray-400 text-[10px] sm:text-xs font-medium mb-1">{product.category?.name}</p>
                        <h2 className="font-semibold text-gray-800 text-xs sm:text-sm leading-snug line-clamp-2">{product.name}</h2>
                      </div>

                      <div className="pt-2 sm:pt-3 border-t border-gray-50 mt-auto flex justify-between items-center">
                        <div className="flex items-center gap-1">

                          <p className="text-xl font-extrabold text-[#BFA46F]">
                            {Number(product.price).toLocaleString("fa-IR")}
                          </p>

                          <span className="text-xs text-gray-400">
                            تومان
                          </span>

                        </div>
                        <FiShoppingCart className="text-lg sm:text-xl text-[#BFA46F] cursor-pointer hover:text-[#a88d5c] transition-colors" />

                      </div>
                    </div>

                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center rounded-3xl border border-dashed border-[#BFA46F]/30 bg-gradient-to-b from-[#FFFDF8] to-white py-20 px-6 text-center">

                {/* آیکون */}
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#BFA46F]/10 mb-6">
                  <SearchX className="h-10 w-10 text-[#BFA46F]" />
                </div>

                {/* عنوان */}
                <h3 className="text-2xl font-bold text-gray-800">
                  محصولی پیدا نشد
                </h3>

                {/* توضیح */}
                <p className="mt-3 max-w-md text-sm sm:text-base leading-7 text-gray-500">
                  هنوز محصولی برای این دسته‌بندی ثبت نشده است. می‌توانید همه محصولات را مشاهده کنید یا دسته‌بندی دیگری را انتخاب نمایید.

                </p>

                {/* دکمه */}
                <button
                  onClick={() => setActiveCategory("All")}
                  className="group mt-8 inline-flex items-center gap-2 rounded-full bg-[#BFA46F] px-7 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-[#a88d5b] hover:shadow-xl"
                >
                  مشاهده همه محصولات

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

              </div>
            )}
          </div>


        </main>
      </div>
    </div>
  );
}
