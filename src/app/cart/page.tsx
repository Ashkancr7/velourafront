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

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-24 text-center">
        <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-gray-300" />
        <h1 className="text-2xl font-light mb-4">سبد خرید شما خالی است</h1>
        <p className="text-gray-600 mb-8">برای شروع خرید به صفحه محصولات بروید</p>
        <button
          onClick={() => router.push("/")}
          className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          بازگشت به فروشگاه
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-light mb-10 flex items-center gap-3">
        <ShoppingBag className="w-8 h-8" />
        سبد خرید ({totalItems} محصول)
      </h1>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              // آپدیت key با در نظر گرفتن رنگ
              key={`${item.id}-${item.size || 'no-size'}-${item.color || 'no-color'}`}
              className="flex gap-6 border rounded-xl p-6 bg-white hover:shadow-md transition"
            >
              <div className="relative w-32 h-32 bg-gray-100 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                <Image
                  src={item.image || "/images/placeholder.jpg"}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">{item.name}</h3>
                    <div className="flex items-center gap-3">
                      {item.size && (
                        <span className="inline-block px-3 py-1 bg-gray-100 rounded text-sm text-gray-600">
                          سایز {item.size}
                        </span>
                      )}
                      {/* نمایش رنگ انتخابی */}
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
                    // ارسال رنگ به تابع حذف
                    onClick={() => removeFromCart(item.id, item.size, item.color)}
                    className="text-red-500 hover:text-red-700 transition"
                    aria-label="حذف محصول"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 border rounded-lg">
                    <button
                      // ارسال رنگ
                      onClick={() => decreaseQty(item.id, item.size, item.color)}
                      disabled={item.quantity <= 1}
                      className="p-2 hover:bg-gray-100 transition disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="کاهش تعداد"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      // ارسال رنگ
                      onClick={() => increaseQty(item.id, item.size, item.color)}
                      className="p-2 hover:bg-gray-100 transition"
                      aria-label="افزایش تعداد"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  <div className="text-left">
                    <p className="text-xl font-bold text-[#BFA46F]">
                      {(item.price * item.quantity).toLocaleString("fa-IR")} تومان
                    </p>
                    {item.quantity > 1 && (
                      <p className="text-sm text-gray-500">
                        {item.price.toLocaleString("fa-IR")} × {item.quantity}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="border border-gray-100 rounded-xl p-6 bg-gray-50/50 sticky top-24 shadow-sm">
            <h2 className="text-lg font-medium mb-6">خلاصه سفارش</h2>
            
            <div className="space-y-3 text-sm mb-6 pb-6 border-b border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-600">تعداد کل محصولات</span>
                <span className="font-medium">{totalItems} عدد</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">جمع کل</span>
                <span className="font-medium">{total.toLocaleString("fa-IR")} تومان</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>مبلغ قابل پرداخت</span>
                <span className="text-[#BFA46F]">
                  {total.toLocaleString("fa-IR")} تومان
                </span>
              </div>
            </div>

            <button
              onClick={() => router.push("/checkout")}
              className="w-full bg-gray-900 text-white py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#BFA46F] transition-colors duration-300 active:scale-[0.98] font-medium"
            >
              ادامه فرایند خرید
              <ArrowLeft size={18} />
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              با تکمیل خرید، قوانین و مقررات را می‌پذیرید
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
