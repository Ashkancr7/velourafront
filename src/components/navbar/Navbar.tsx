"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Search, User, Home, Store } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { cn } from "@/lib/utils";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/", label: "صفحه اصلی" },
  { href: "/shop", label: "فروشگاه" },
  { href: "/new-arrivals", label: "جدیدترین‌ها" },
  { href: "/collections", label: "ست‌های خاص" },
  { href: "/about", label: "درباره‌ما" },
  { href: "/contact", label: "ارتباط‌‌ باما" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const cartItems = useCartStore((state) => state.items);

  // هندل کردن مونت شدن کامپوننت و اسکرول صفحه
  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-300",
          isScrolled
            ? "bg-[#FDFBF7]/95 backdrop-blur-md shadow-md border-b border-[#BFA46F]/20"
            : "bg-[#FDFBF7] shadow-sm border-b border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between md:justify-between justify-center">
          {/* Logo */}
          <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
            <Image
              src="/logo1.png"
              alt="Veloura Logo"
              width={150}
              height={60}
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10 text-sm">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative py-2 transition-colors duration-200 group",
                    isActive ? "text-[#BFA46F] font-medium" : "text-gray-600 hover:text-[#BFA46F]"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute bottom-0 right-0 h-[2px] bg-[#BFA46F] transition-all duration-300",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Side Actions (Desktop Only) */}
          <div className="hidden md:flex items-center gap-4 md:gap-5">
            <button className="p-1.5 text-gray-600 hover:text-[#BFA46F] transition-transform hover:scale-110" aria-label="جستجو">
              <Search size={20} strokeWidth={1.5} />
            </button>

            <Link href="/profile" className="p-1.5 text-gray-600 hover:text-[#BFA46F] transition-transform hover:scale-110" aria-label="پروفایل">
              <User size={20} strokeWidth={1.5} />
            </Link>

            <Link
              href="/cart"
              className="relative p-1.5 text-gray-600 hover:text-[#BFA46F] transition-transform hover:scale-110"
              aria-label="سبد خرید"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#BFA46F] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-sm">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

            {/* ===== Modern Full-Width Bottom Navigation (Mobile) ===== */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-50">
        <nav className="bg-white/85 backdrop-blur-xl border-t border-gray-200/50 shadow-[0_-8px_30px_rgb(0,0,0,0.08)] rounded-t-2xl px-6 h-[76px] pb-2 pt-1 flex items-center justify-between w-full">
          
          {/* خانه */}
          <Link href="/" className="relative flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-all duration-300">
            {pathname === "/" && (
              <span className="absolute inset-0 bg-[#BFA46F]/10 rounded-xl transition-all duration-300" />
            )}
            <Home 
              size={22} 
              strokeWidth={pathname === "/" ? 2 : 1.5} 
              className={cn("relative z-10 transition-all duration-300", pathname === "/" ? "text-[#BFA46F] -translate-y-0.5" : "text-gray-400")} 
            />
            <span className={cn("relative z-10 text-[10px] transition-all duration-300", pathname === "/" ? "text-[#BFA46F] font-medium mt-1" : "text-gray-400 opacity-80 mt-0.5")}>
              خانه
            </span>
          </Link>

          {/* فروشگاه */}
          <Link href="/shop" className="relative flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-all duration-300">
            {pathname === "/shop" && (
              <span className="absolute inset-0 bg-[#BFA46F]/10 rounded-xl transition-all duration-300" />
            )}
            <Store 
              size={22} 
              strokeWidth={pathname === "/shop" ? 2 : 1.5} 
              className={cn("relative z-10 transition-all duration-300", pathname === "/shop" ? "text-[#BFA46F] -translate-y-0.5" : "text-gray-400")} 
            />
            <span className={cn("relative z-10 text-[10px] transition-all duration-300", pathname === "/shop" ? "text-[#BFA46F] font-medium mt-1" : "text-gray-400 opacity-80 mt-0.5")}>
              فروشگاه
            </span>
          </Link>

          {/* سبد خرید */}
          <Link href="/cart" className="relative flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-all duration-300">
            {pathname === "/cart" && (
              <span className="absolute inset-0 bg-[#BFA46F]/10 rounded-xl transition-all duration-300" />
            )}
            <div className="relative z-10">
              <ShoppingBag 
                size={22} 
                strokeWidth={pathname === "/cart" ? 2 : 1.5} 
                className={cn("transition-all duration-300", pathname === "/cart" ? "text-[#BFA46F] -translate-y-0.5" : "text-gray-400")} 
              />
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#BFA46F] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-sm">
                  {cartItems.length}
                </span>
              )}
            </div>
            <span className={cn("relative z-10 text-[10px] transition-all duration-300", pathname === "/cart" ? "text-[#BFA46F] font-medium mt-1" : "text-gray-400 opacity-80 mt-0.5")}>
              سبد
            </span>
          </Link>

          {/* پروفایل */}
          <Link href="/profile" className="relative flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-all duration-300">
            {pathname === "/profile" && (
              <span className="absolute inset-0 bg-[#BFA46F]/10 rounded-xl transition-all duration-300" />
            )}
            <User 
              size={22} 
              strokeWidth={pathname === "/profile" ? 2 : 1.5} 
              className={cn("relative z-10 transition-all duration-300", pathname === "/profile" ? "text-[#BFA46F] -translate-y-0.5" : "text-gray-400")} 
            />
            <span className={cn("relative z-10 text-[10px] transition-all duration-300", pathname === "/profile" ? "text-[#BFA46F] font-medium mt-1" : "text-gray-400 opacity-80 mt-0.5")}>
              پروفایل
            </span>
          </Link>

        </nav>
      </div>


    </>
  );
}
