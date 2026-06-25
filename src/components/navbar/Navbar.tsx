"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Search, User, Home, Store } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { cn } from "@/lib/utils";
import Image from "next/image";

const NAV_LINKS = [
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

      {/* ===== Bottom Navigation (Mobile) ===== */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 px-2 pb-safe shadow-[0_-4px_15px_rgba(0,0,0,0.05)]">
        <div className="flex items-center justify-around h-16">
          
          {/* خانه */}
          <Link href="/" className="flex flex-col items-center gap-1 p-2 w-16">
            <Home 
              size={22} 
              strokeWidth={pathname === "/" ? 2 : 1.5} 
              className={pathname === "/" ? "text-[#BFA46F]" : "text-gray-500"} 
            />
            <span className={cn("text-[10px]", pathname === "/" ? "text-[#BFA46F] font-medium" : "text-gray-500")}>
              خانه
            </span>
          </Link>

          {/* فروشگاه */}
          <Link href="/shop" className="flex flex-col items-center gap-1 p-2 w-16">
            <Store 
              size={22} 
              strokeWidth={pathname === "/shop" ? 2 : 1.5} 
              className={pathname === "/shop" ? "text-[#BFA46F]" : "text-gray-500"} 
            />
            <span className={cn("text-[10px]", pathname === "/shop" ? "text-[#BFA46F] font-medium" : "text-gray-500")}>
              فروشگاه
            </span>
          </Link>

          {/* سبد خرید */}
          <Link href="/cart" className="flex flex-col items-center gap-1 p-2 w-16 relative">
            <div className="relative">
              <ShoppingBag 
                size={22} 
                strokeWidth={pathname === "/cart" ? 2 : 1.5} 
                className={pathname === "/cart" ? "text-[#BFA46F]" : "text-gray-500"} 
              />
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#BFA46F] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-sm">
                  {cartItems.length}
                </span>
              )}
            </div>
            <span className={cn("text-[10px]", pathname === "/cart" ? "text-[#BFA46F] font-medium" : "text-gray-500")}>
              سبد
            </span>
          </Link>

          {/* پروفایل */}
          <Link href="/profile" className="flex flex-col items-center gap-1 p-2 w-16">
            <User 
              size={22} 
              strokeWidth={pathname === "/profile" ? 2 : 1.5} 
              className={pathname === "/profile" ? "text-[#BFA46F]" : "text-gray-500"} 
            />
            <span className={cn("text-[10px]", pathname === "/profile" ? "text-[#BFA46F] font-medium" : "text-gray-500")}>
              پروفایل
            </span>
          </Link>

        </div>
      </nav>
    </>
  );
}
