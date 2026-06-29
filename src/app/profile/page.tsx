"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

interface User {
  first_name: string;
  email: string;
  username: string;
}

interface Order {
  id: number;
  created_at: string;
  total_amount: number | string;
  total_items_count: number;
  status: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.theveloura.ir";

  const handleLogout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    router.push("/login");
  }, [router]);

  // این تابع جادویی ریکوئست‌ها رو می‌فرسته و اگه توکن منقضی شده بود، خودش رفرشش می‌کنه
  const fetchWithAuth = useCallback(async (url: string) => {
    let token = localStorage.getItem("accessToken");
    
    let res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // اگه توکن دسترسی منقضی شده بود (خطای 401)
    if (res.status === 401) {
      const refreshToken = localStorage.getItem("refreshToken");
      
      if (refreshToken) {
        try {
          // درخواست به اندپوینت رفرش توکن (ممکنه آدرسش تو بک‌‌اندت کمی متفاوت باشه، چکش کن)
          const refreshRes = await fetch(`${API_BASE_URL}/api/token/refresh/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: refreshToken }),
          });

          if (refreshRes.ok) {
            const data = await refreshRes.json();
            // توکن جدید رو ذخیره می‌کنیم
            localStorage.setItem("accessToken", data.access);
            token = data.access;
            
            // درخواست اصلی رو دوباره با توکن جدید می‌فرستیم
            res = await fetch(url, {
              headers: { Authorization: `Bearer ${token}` },
            });
          } else {
            // رفرش توکن هم منقضی شده، پس کلا باید لاگین کنه
            handleLogout();
          }
        } catch (err) {
          handleLogout();
        }
      } else {
        handleLogout();
      }
    }
    return res;
  }, [API_BASE_URL, handleLogout]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          router.push("/login");
          return;
        }

        // حالا به جای fetch معمولی، از تابع fetchWithAuth خودمون استفاده می‌کنیم
        const [userRes, ordersRes] = await Promise.all([
          fetchWithAuth(`${API_BASE_URL}/api/users/me/`),
          fetchWithAuth(`${API_BASE_URL}/api/orders/my-orders/`),
        ]);

        // اگه بعد از تلاش برای رفرش توکن بازم اوکی نبود
        if (!userRes.ok) {
           if (userRes.status === 401) return; // تو تابع هندل شده و داره میره به لاگین
           throw new Error("خطا در دریافت اطلاعات پروفایل");
        }

        const userData = await userRes.json();
        setUser(userData);

        if (ordersRes.ok) {
          const ordersData = await ordersRes.json();
          setOrders(ordersData);
        }
      } catch (err) {
        console.error(err);
        setError("مشکلی در بارگذاری اطلاعات پیش آمد. لطفا دوباره تلاش کنید.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [router, fetchWithAuth]);

  const formatJalaliDate = (dateString: string) => {
    try {
      return new Intl.DateTimeFormat("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(dateString));
    } catch {
      return "تاریخ نامشخص";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'پرداخت شده';
      case 'pending': return 'در انتظار پرداخت';
      case 'failed': return 'ناموفق';
      case 'canceled': return 'لغو شده';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-[#BFA46F] font-bold">در حال بارگذاری...</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-8 text-red-500 font-bold">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 " dir="rtl">
      {/* هدر پروفایل */}
      <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 mb-8 relative">
        <button
          onClick={handleLogout}
          className="absolute top-6 left-6 text-sm text-red-500 hover:text-white hover:bg-red-500 px-4 py-2 rounded-lg transition-all border border-red-200"
        >
          خروج
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          سلام، {user?.first_name || "کاربر گرامی"}
        </h1>
        <p className="text-gray-500" dir="ltr">{user?.email}</p>
        <p className="text-sm text-gray-400 mt-1">نام کاربری: {user?.username}</p>
      </section>

      {/* بخش سفارشات */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">سفارش‌های من</h2>

        {orders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm font-medium text-gray-600">
                    کد: VEL-{order.id}
                  </span>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    order.status === 'paid' ? 'bg-green-50 text-green-700' :
                    order.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                    'bg-red-50 text-red-700'
                  }`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>{formatJalaliDate(order.created_at)}</span>
                  <span>{order.total_items_count} کالا</span>
                </div>

                <div className="text-[#BFA46F] font-bold text-lg border-t border-gray-100 pt-3 text-left">
                  {Number(order.total_amount).toLocaleString("fa-IR")} تومان
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
            <p className="text-gray-500">هنوز سفارشی ثبت نکرده‌اید. 🛒</p>
          </div>
        )}
      </section>
    </div>
  );
}
