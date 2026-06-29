// app/cart/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import Image from "next/image";

export default function CartPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const total = items.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <ShoppingBag className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 text-gray-300" />
        <h1 className="text-xl sm:text-2xl font-light mb-4">سبد خرید شما خالی است</h1>
        <p className="text-gray-600 mb-8 text-sm sm:text-base">برای شروع خرید به صفحه محصولات بروید</p>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 sm:px-8 bg-black text-white rounded-lg hover:bg-gray-800 transition text-sm sm:text-base"
        >
          بازگشت به فروشگاه
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16 overflow-x-hidden">
      <h1 className="text-2xl sm:text-3xl font-light mb-8 sm:mb-10 flex items-center gap-3">
        <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8" />
        سبد خرید ({totalItems} محصول)
      </h1>

      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.size || 'no-size'}-${item.color || 'no-color'}`}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 border rounded-xl p-4 sm:p-6 bg-white hover:shadow-md transition"
            >
              {/* عکس تو موبایل کوچیکتر میشه و میاد وسط یا راست */}
              <div className="flex gap-4 sm:contents">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                  <Image
                    src={item.image || "/images/placeholder.jpg"}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* تیتر و سطل زباله برای حالت موبایل که میره کنار عکس */}
                <div className="flex-1 sm:hidden">
                  <div className="flex justify-between items-start">
                    <h3 className="text-base font-medium line-clamp-2">{item.name}</h3>
                    <button
                      onClick={() => removeFromCart(item.id, item.size, item.color)}
                      className="text-red-500 hover:text-red-700 transition p-1"
                      aria-label="حذف محصول"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="hidden sm:flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">{item.name}</h3>
                    <div className="flex flex-wrap items-center gap-3">
                      {item.size && (
                        <span className="inline-block px-3 py-1 bg-gray-100 rounded text-sm text-gray-600">
                          سایز {item.size}
                        </span>
                      )}
                      {item.color && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>رنگ:</span>
                          <span
                            className="w-4 h-4 rounded-full border border-gray-200 shadow-sm"
                            style={{ backgroundColor: item.color }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id, item.size, item.color)}
                    className="text-red-500 hover:text-red-700 transition"
                    aria-label="حذف محصول"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                {/* ویژگی‌های سایز و رنگ برای موبایل */}
                <div className="sm:hidden flex flex-wrap items-center gap-2 mb-4">
                  {item.size && (
                    <span className="inline-block px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
                      سایز {item.size}
                    </span>
                  )}
                  {item.color && (
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <span>رنگ:</span>
                      <span
                        className="w-3 h-3 rounded-full border border-gray-200 shadow-sm"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  )}
                </div>

                {/* قیمت و دکمه‌ها که تو موبایل روی هم قرار میگیرن (wrap میشن) */}
                <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
                  {/* <div className="flex items-center gap-2 sm:gap-3 border rounded-lg bg-gray-50/50">
                    <button
                      onClick={() => decreaseQty(item.id, item.size, item.color)}
                      disabled={item.quantity <= 1}
                      className="p-1.5 sm:p-2 hover:bg-gray-100 transition disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="کاهش تعداد"
                    >
                      <Minus size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>
                    <span className="w-6 sm:w-8 text-center font-medium text-sm sm:text-base">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQty(item.id, item.size, item.color)}
                      className="p-1.5 sm:p-2 hover:bg-gray-100 transition"
                      aria-label="افزایش تعداد"
                    >
                      <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
                    </button>
                  </div> */}

                  <div className="text-left">
                    <p className="text-lg sm:text-xl font-bold text-[#BFA46F]">
                      {/* اینجا تبدیل به عدد را انجام دهید */}
                      {(Number(item.price) * Number(item.quantity)).toLocaleString("fa-IR")} تومان
                    </p>

                    {item.quantity > 1 && (
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {/* اینجا هم همینطور */}
                        {Number(item.price).toLocaleString("fa-IR")} × {item.quantity.toLocaleString("fa-IR")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* سایدبار خلاصه سفارش */}
        <div className="lg:col-span-1 mt-4 lg:mt-0">
          <div className="border border-gray-100 rounded-xl p-5 sm:p-6 bg-gray-50/50 sticky top-24 shadow-sm">
            <h2 className="text-lg font-medium mb-5 sm:mb-6">خلاصه سفارش</h2>

            <div className="space-y-3 text-sm mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-600">تعداد کل محصولات</span>
                <span className="font-medium">{totalItems.toLocaleString("fa-IR")} عدد</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">جمع کل</span>
                <span className="font-medium">{total.toLocaleString("fa-IR")} تومان</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-lg font-bold">
                <span className="text-base sm:text-lg">مبلغ قابل پرداخت</span>
                <span className="text-[#BFA46F]">
                  {total.toLocaleString("fa-IR")} تومان
                </span>
              </div>
            </div>

            <button
              onClick={() => router.push("/checkout")}
              className="w-full bg-gray-900 text-white py-3.5 sm:py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#BFA46F] transition-colors duration-300 active:scale-[0.98] font-medium text-sm sm:text-base"
            >
              ادامه فرایند خرید
              <ArrowLeft size={18} />
            </button>

            <p className="text-[11px] sm:text-xs text-gray-500 text-center mt-4">
              با تکمیل خرید، قوانین و مقررات را می‌پذیرید
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
