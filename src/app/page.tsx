import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/api";
import ProductCard from "@/components/product/ProductCard";
import { ChevronLeft } from "lucide-react";

const COLLECTIONS = [
  { id: 1, title: "لباس زنانه", image: "/cat1.webp", href: "/shop" },
  { id: 2, title: "لباس زیر", image: "/cat2.webp", href: "/shop" },
  { id: 3, title: "بادی", image: "/cat3.webp", href: "/shop" },
  { id: 4, title: "لباس خواب ", image: "/cat4.webp", href: "/shop" },
];


export default async function HomePage() {

  const products = await getProducts();
  const featured = products ? products.slice(0, 4) : [];

  return (
    <main>
      {/* HERO SECTION */}
      <section className="relative h-[80vh] md:h-[95vh] flex items-center justify-center text-center">
        {/* تصویر پس‌زمینه */}
        <Image
          src="/hero.png"
          alt="Veloura"
          fill
          priority
          className="object-cover object-center"
        />

        {/* گرادیانت حرفه‌ای به جای مشکی تخت */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black/80" />

        <div className="relative z-10 flex flex-col items-center px-5 max-w-4xl pt-10">
          {/* عنوان با فونت ظریف‌تر و فاصله حروف بیشتر */}
          <h1 className="text-5xl md:text-8xl font-light tracking-[0.25em] text-white mb-4 drop-shadow-md">
            Veloura
          </h1>

          {/* خط جداکننده لوکس */}
          <div className="w-16 md:w-64 h-[1px] bg-[#BFA46F] mb-6 md:mb-8 opacity-70"></div>

          {/* متن توضیحات با سایه ملایم برای خوانایی */}
          <p className="text-sm md:text-lg text-gray-200 mb-10 leading-relaxed font-light drop-shadow-md px-4">
            ظرافت، راحتی و اعتماد به نفس در کنار هم.<br className="hidden md:block" />
            مجموعه‌ای از لباس‌های زیر لوکس برای زنانی که به زیبایی جزئیات اهمیت می‌دهند.
          </p>

          {/* دکمه لوکس شیشه‌ای با افکت هاور */}
          <Link
            href="/shop"
            className="group relative rounded-lg inline-flex items-center justify-center px-8 py-3.5 md:px-12 md:py-4 border border-white/60 text-white overflow-hidden transition-all hover:border-[#BFA46F]"
          >
            {/* پس‌زمینه دکمه در حالت هاور */}
            <div className="absolute inset-0 w-0 bg-[#BFA46F] transition-all duration-500 ease-out group-hover:w-full"></div>

            <span className="relative z-10 text-sm md:text-base font-medium tracking-wide transition-colors group-hover:text-white">
              کشف کالکشن
            </span>
          </Link>
        </div>
      </section>

      {/* COLLECTIONS SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="text-center mb-8 md:mb-14">
          <h2 className="text-xl md:text-3xl font-light text-gray-900">
            دسته بندی <span className="text-[#BFA46F] font-medium">محصولات</span>
          </h2>
          <div className="w-16 md:w-48 h-0.5 bg-[#BFA46F] mx-auto mt-3 md:mt-4 rounded-full opacity-50"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-12">
          {COLLECTIONS.map((collection) => (
            <Link
              key={collection.id}
              href={collection.href}
              className="group relative w-36 h-36 md:w-64 md:h-64 overflow-hidden block rounded-full shadow-sm hover:shadow-md transition-all"
            >
              <Image
                src={collection.image}
                alt={`کالکشن ${collection.title}`}
                fill
                sizes="(max-width: 768px) 150px, 250px"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 transition-all duration-300 group-hover:bg-black/40" />

              <div className="absolute inset-0 p-4 flex items-center justify-center text-center">
                <h3 className="text-white text-lg md:text-2xl font-light tracking-wide drop-shadow-md">
                  {collection.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="flex items-end justify-between mb-8 md:mb-14">
          <div>
            <h2 className="text-xl md:text-3xl font-light text-gray-900">
              محصولات <span className="text-[#BFA46F] font-medium">منتخب</span>
            </h2>
            <div className="w-16 md:w-48 h-0.5 bg-[#BFA46F] mt-2 md:mt-3 rounded-full opacity-50"></div>
          </div>

          <Link
  href="/shop"
  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#BFA46F] px-6 py-2.5 text-sm font-semibold text-[#BFA46F] transition-all duration-500"
>
  <span className="absolute inset-0 -translate-x-full bg-[#BFA46F] transition-transform duration-500 group-hover:translate-x-0"></span>

  <span className="relative z-10 transition-colors duration-500 group-hover:text-white">
    مشاهده همه محصولات
  </span>

  <ChevronLeft className="relative z-10 h-4 w-4 transition-all duration-500 group-hover:-translate-x-1 group-hover:text-white" />
</Link>
        </div>

        {/* گرید محصولات - بهینه برای موبایل */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-8 md:gap-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* BRAND STORY SECTION */}
      <section className="bg-[#F8F5F0] py-12 md:py-24">
        <div className="max-w-3xl mx-auto text-center px-5 md:px-6">
          <h2 className="text-xl md:text-3xl font-light text-gray-900 mb-2">
            داستان <span className="text-[#BFA46F] font-medium">Veloura</span>
          </h2>
          <div className="w-16 md:w-48 h-0.5 bg-[#BFA46F] mx-auto mb-6 md:mb-8 rounded-full opacity-50"></div>
          <p className="text-gray-600 leading-relaxed md:leading-loose text-sm md:text-lg font-light">
            Veloura با الهام از زیبایی و ظرافت طراحی شده است. ما باور داریم لباس زیر تنها یک پوشاک نیست، بلکه بخشی از احساس اعتماد به نفس و زیبایی درونی است.
          </p>
        </div>
      </section>
    </main>
  );
}
