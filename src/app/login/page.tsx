"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    // تغییر نام state از email به username
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
console.log("در حال ارسال این دیتا به سرور:", JSON.stringify({ username, password }));
        try {
            const res = await fetch("https://api.theveloura.ir/api/login/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username, // ارسال نام کاربری به جای ایمیل
                    password: password
                }),
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem("accessToken", data.access);
                if (data.refresh) localStorage.setItem("refreshToken", data.refresh);
                router.push("/profile");
            } else {
                // نمایش پیام خطای مناسب‌تر
                setError("نام کاربری یا رمز عبور اشتباه است.");
            }
        } catch (err) {
            setError("خطا در ارتباط با سرور!");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">ورود به ولورا</h1>

                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        {/* تغییر لیبل به نام کاربری */}
                        <label className="block text-sm text-gray-600 mb-1">نام کاربری</label>
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
                        className="w-full bg-[#BFA46F] text-white py-2.5 rounded-xl hover:bg-[#a88e5b] transition-colors font-medium"
                    >
                        ورود
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    حساب کاربری ندارید؟{" "}
                    <Link href="/register" className="text-[#BFA46F] hover:underline">
                        ثبت‌نام کنید
                    </Link>
                </p>
            </div>
        </div>
    );
}
