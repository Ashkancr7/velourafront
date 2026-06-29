"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [username, setUsername] = useState(""); // اینجا ایمیل یا شماره موبایل دریافت میشه
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://api.theveloura.ir/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username: username, // اینجا شماره یا ایمیل ارسال میشه
          password: password,
          first_name: name 
        }),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        const data = await res.json();
        // چک کردن برای نمایش خطای دقیق‌تر
        setError(data.username ? "این نام کاربری قبلاً ثبت شده است." : "خطایی در ثبت‌نام رخ داد.");
      }
    } catch (err) {
      setError("خطا در ارتباط با سرور!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">ثبت‌نام در ولورا</h1>
        
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">نام و نام خانوادگی</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-[#BFA46F] focus:ring-1 focus:ring-[#BFA46F]"
              required
            />
          </div>
          <div>
            {/* تغییر لیبل و نوع اینپوت به text برای اینکه هم شماره و هم ایمیل قبول کنه */}
            <label className="block text-sm text-gray-600 mb-1">نام کاربری (شماره تلفن)</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-[#BFA46F] focus:ring-1 focus:ring-[#BFA46F]"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">رمز عبور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:border-[#BFA46F] focus:ring-1 focus:ring-[#BFA46F]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2.5 rounded-xl hover:bg-gray-800 transition-colors font-medium"
          >
            عضویت
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          قبلاً ثبت‌نام کرده‌اید؟{" "}
          <Link href="/login" className="text-[#BFA46F] hover:underline">
            وارد شوید
          </Link>
        </p>
      </div>
    </div>
  );
}