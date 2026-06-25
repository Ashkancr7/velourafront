// app/checkout/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useCheckoutStore } from "@/store/checkoutStore";
import { MapPin, ShoppingBag, ArrowRight, CreditCard } from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  const { shippingAddress, setShippingAddress } = useCheckoutStore();

  const [formData, setFormData] = useState({
    fullName: shippingAddress?.fullName || "",
    phone: shippingAddress?.phone || "",
    province: shippingAddress?.province || "",
    city: shippingAddress?.city || "",
    address: shippingAddress?.address || "",
    postalCode: shippingAddress?.postalCode || "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setIsMounted(true);
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items.length, router]);

  if (!isMounted) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "نام و نام خانوادگی الزامی است";
    if (!formData.phone.trim()) newErrors.phone = "شماره تماس الزامی است";
    else if (!/^09\d{9}$/.test(formData.phone)) newErrors.phone = "شماره موبایل معتبر نیست";
    if (!formData.province.trim()) newErrors.province = "استان الزامی است";
    if (!formData.city.trim()) newErrors.city = "شهر الزامی است";
    if (!formData.address.trim()) newErrors.address = "آدرس الزامی است";
    if (!formData.postalCode.trim()) newErrors.postalCode = "کد پستی الزامی است";
    else if (!/^\d{10}$/.test(formData.postalCode)) newErrors.postalCode = "کد پستی باید ۱۰ رقم باشه";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setShippingAddress(formData);
      router.push("/payment");
    }
  };

  const shippingCost = total > 500000 ? 0 : 30000;
  const finalTotal = total + shippingCost;

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-light mb-10 flex items-center gap-3">
        <MapPin className="w-8 h-8" />
        تکمیل اطلاعات ارسال
      </h1>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* فرم آدرس */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border rounded-xl p-8 bg-white shadow-sm">
              <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
                <MapPin size={20} className="text-[#BFA46F]" />
                اطلاعات گیرنده
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* نام و نام خانوادگی */}
                <div>
                  <label className="block text-sm font-medium mb-2">نام و نام خانوادگی *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#BFA46F]/20 focus:border-[#BFA46F] outline-none transition bg-gray-50 focus:bg-white ${
                      errors.fullName ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="علی احمدی"
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                {/* شماره تماس */}
                <div>
                  <label className="block text-sm font-medium mb-2">شماره تماس *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#BFA46F]/20 focus:border-[#BFA46F] outline-none transition bg-gray-50 focus:bg-white ${
                      errors.phone ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="09123456789"
                    dir="ltr"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                {/* استان */}
                <div>
                  <label className="block text-sm font-medium mb-2">استان *</label>
                  <input
                    type="text"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#BFA46F]/20 focus:border-[#BFA46F] outline-none transition bg-gray-50 focus:bg-white ${
                      errors.province ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="تهران"
                  />
                  {errors.province && <p className="text-red-500 text-sm mt-1">{errors.province}</p>}
                </div>

                {/* شهر */}
                <div>
                  <label className="block text-sm font-medium mb-2">شهر *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#BFA46F]/20 focus:border-[#BFA46F] outline-none transition bg-gray-50 focus:bg-white ${
                      errors.city ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="تهران"
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>

                {/* کد پستی */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">کد پستی (۱۰ رقم بدون خط تیره) *</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    maxLength={10}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#BFA46F]/20 focus:border-[#BFA46F] outline-none transition bg-gray-50 focus:bg-white ${
                      errors.postalCode ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="1234567890"
                    dir="ltr"
                  />
                  {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                </div>

                {/* آدرس */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">آدرس کامل *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#BFA46F]/20 focus:border-[#BFA46F] outline-none transition resize-none bg-gray-50 focus:bg-white ${
                      errors.address ? "border-red-500" : "border-gray-200"
                    }`}
                    placeholder="خیابان، کوچه، پلاک، واحد"
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-8 py-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition flex items-center gap-2 font-medium"
              >
                <ArrowRight size={18} />
                بازگشت
              </button>
              <button
                type="submit"
                className="flex-1 bg-gray-900 text-white py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-[#BFA46F] transition-colors duration-300 font-medium"
              >
                ادامه و پرداخت
                <CreditCard size={18} />
              </button>
            </div>
          </form>
        </div>

        {/* خلاصه سفارش */}
        <div className="lg:col-span-1">
          <div className="border border-gray-100 rounded-xl p-6 bg-white shadow-sm sticky top-24">
            <h2 className="text-lg font-medium mb-6 flex items-center gap-2 border-b border-gray-100 pb-4">
              <ShoppingBag size={20} className="text-[#BFA46F]" />
              خلاصه سفارش
            </h2>

            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div
                  // آپدیت key برای در نظر گرفتن رنگ
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex items-center gap-3 text-sm"
                >
                  <div className="relative w-16 h-16 bg-gray-50 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                    <Image
                      src={item.image || "/images/placeholder.jpg"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium line-clamp-1 mb-1">{item.name}</p>
                    
                    {/* نمایش سایز و دایره رنگ */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      {item.size && <span>سایز: {item.size}</span>}
                      {item.size && item.color && <span className="w-1 h-1 rounded-full bg-gray-300" />}
                      {item.color && (
                        <div className="flex items-center gap-1">
                          <span>رنگ:</span>
                          <span 
                            className="w-3 h-3 rounded-full border border-gray-200"
                            style={{ backgroundColor: item.color }}
                          />
                        </div>
                      )}
                    </div>

                    <p className="text-gray-600 text-xs font-medium">
                      {item.quantity} عدد × {item.price.toLocaleString("fa-IR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4 text-sm border-t border-gray-100 pt-6">
              <div className="flex justify-between text-gray-600">
                <span>جمع کالاها</span>
                <span>{total.toLocaleString("fa-IR")} تومان</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>هزینه ارسال</span>
                <span className={shippingCost === 0 ? "text-green-600 font-medium" : ""}>
                  {shippingCost === 0
                    ? "رایگان"
                    : `${shippingCost.toLocaleString("fa-IR")} تومان`}
                </span>
              </div>
              {total < 500000 && (
                <p className="text-xs text-center text-[#BFA46F] bg-[#BFA46F]/10 p-2.5 rounded-lg">
                  با خرید {(500000 - total).toLocaleString("fa-IR")} تومان دیگه، ارسال رایگان میشه!
                </p>
              )}
              <div className="flex justify-between border-t border-gray-100 pt-4 text-base font-medium">
                <span>مبلغ قابل پرداخت</span>
                <span className="text-[#BFA46F]">
                  {finalTotal.toLocaleString("fa-IR")} تومان
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
