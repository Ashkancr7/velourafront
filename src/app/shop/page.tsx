"use client";

import { useState, useMemo } from "react";
import { products } from "@/lib/api"; // فرض بر اینه که محصولاتت فیلدهای category و price دارن
import ProductCard from "@/components/product/ProductCard";
import { SlidersHorizontal, ArrowDownAZ, ArrowUpZA, Sparkles } from "lucide-react";

// دسته‌بندی‌های تستی (بر اساس دیتای خودت تغییرشون بده)
const CATEGORIES = [
  { label: "همه", value: "All" },
  { label: "لباس زیر (Lingerie)", value: "Lingerie" },
  { label: "لباس خواب", value: "Sleepwear" },
  { label: "بادی‌سوت", value: "Bodysuit" },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest"); // newest, price-asc, price-desc

  // فیلتر و مرتب‌سازی محصولات به صورت داینامیک
  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((product) => {
      if (activeCategory === "All") return true;
      // اینجا با value انگلیسی فیلتر میشه
      return product.category === activeCategory;
    });

    // ... منطق مرتب‌سازی (price-asc و غیره) بدون تغییر می‌مونه چون قیمت‌ها عدد هستن و عالی کار می‌کنن
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeCategory, sortBy]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-24">
      {/* Header */}
      <div className="mb-10 flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-5xl font-light tracking-wide mb-4">
          کالکشن <span className="text-[#BFA46F] font-medium">ولورا</span>
        </h1>
        <div className="w-16 md:w-24 h-[2px] bg-[#BFA46F]/40 mb-6"></div>
        <p className="text-gray-500 max-w-xl mx-auto leading-relaxed font-light text-sm md:text-base px-2">
          مجموعه‌ای بی‌نظیر از لباس‌های زیر لوکس با طراحی اختصاصی؛ ترکیبی از ظرافت، راحتی و زیبایی برای استایل روزمره شما.
        </p>
      </div>

      {/* Filter & Sort Section */}
      <div className="mb-10 space-y-4">
        {/* نوار دسته‌بندی‌ها (اسکرول افقی در موبایل) */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 hide-scrollbar">
          <div className="flex items-center gap-2 text-gray-400 mr-2 md:mr-0 min-w-max">
            <SlidersHorizontal size={18} />
            <span className="text-sm">فیلتر:</span>
          </div>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`min-w-max px-5 py-2 text-sm md:text-base rounded-full border transition-all duration-300 ${activeCategory === cat.value
                  ? "bg-[#BFA46F] text-white border-[#BFA46F] shadow-md shadow-[#BFA46F]/20"
                  : "bg-transparent text-gray-600 border-gray-200 hover:border-[#BFA46F] hover:text-[#BFA46F]"
                }`}
            >
              {cat.label}
            </button>
          ))}

        </div>

        {/* نوار مرتب‌سازی و تعداد محصولات */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50/80 rounded-xl p-4 border border-gray-100 gap-4">
          <div className="text-sm text-gray-500 font-light">
            نمایش <span className="font-medium text-gray-800">{filteredAndSortedProducts.length}</span> محصول
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label htmlFor="sort" className="text-sm text-gray-600 min-w-max">مرتب‌سازی:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-[#BFA46F] focus:border-[#BFA46F] block p-2 outline-none cursor-pointer"
            >
              <option value="newest">جدیدترین‌ها</option>
              <option value="price-asc">ارزان‌ترین</option>
              <option value="price-desc">گران‌ترین</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* حالت خالی (وقتی محصولی تو اون دسته نیست) */
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Sparkles size={48} className="mb-4 opacity-50" />
          <p className="text-lg">محصولی در این دسته‌بندی یافت نشد.</p>
        </div>
      )}
    </main>
  );
}
