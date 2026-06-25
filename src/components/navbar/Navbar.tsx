"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, Search, User } from "lucide-react";
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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

  // بستن دراور هنگام تغییر مسیر و قفل کردن اسکرول صفحه وقتی دراور بازه
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  // جلوگیری از اسکرول خوردن بدنه سایت وقتی منوی موبایل بازه
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

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
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
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

          {/* Right Side Actions */}
          <div className="flex items-center gap-4 md:gap-5">
            <button className="hidden md:block p-1.5 text-gray-600 hover:text-[#BFA46F] transition-transform hover:scale-110" aria-label="جستجو">
              <Search size={20} strokeWidth={1.5} />
            </button>

            <Link href="/profile" className="hidden md:block p-1.5 text-gray-600 hover:text-[#BFA46F] transition-transform hover:scale-110" aria-label="پروفایل">
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="md:hidden p-1.5 text-gray-600 hover:text-[#BFA46F] transition-colors"
              aria-label="منو"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* ===== Drawer (Mobile) ===== */}
      {/* دراور رو از هدر آوردیم بیرون تا مشکل اسکرول و محو شدن حل بشه */}
      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden pointer-events-none transition-opacity duration-300",
          isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0"
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsDrawerOpen(false)}
        />

        {/* Drawer Panel */}
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-72 bg-white shadow-2xl flex flex-col",
            "transform transition-transform duration-300 ease-in-out",
            isDrawerOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex justify-between items-center px-6 h-16 border-b border-gray-100 bg-gray-50/50">
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
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 text-gray-500 hover:text-red-500 transition-colors bg-white rounded-full shadow-sm"
            >
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <nav className="flex flex-col px-6 py-4 text-sm font-medium">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "py-4 border-b border-gray-50 transition-colors flex items-center gap-2",
                      isActive
                        ? "text-[#BFA46F]"
                        : "text-gray-700 hover:text-[#BFA46F] hover:pl-2"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Mobile Footer Actions */}
          <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-around">
            <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-[#BFA46F]">
              <Search size={20} strokeWidth={1.5} />
              <span className="text-[10px]">جستجو</span>
            </button>
            <Link href="/profile" className="flex flex-col items-center gap-1 text-gray-500 hover:text-[#BFA46F]">
              <User size={20} strokeWidth={1.5} />
              <span className="text-[10px]">پروفایل</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
