import { Star, ShieldCheck, Gem } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <section className="bg-white py-20 text-center border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
            داستان <span className="text-[#BFA46F] font-medium">ولورا</span>
          </h1>
          <p className="text-gray-600 leading-relaxed md:text-lg">
            ما در ولورا (Veloura) معتقدیم که زیبایی در سادگی و کیفیت نهفته است. 
            هدف ما ارائه محصولاتی است که نه تنها ظاهر شما را زیباتر می‌کنند، بلکه 
            حس اعتماد به نفس و اصالت را به شما هدیه می‌دهند.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Value 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-[#BFA46F]/10 text-[#BFA46F] rounded-full flex items-center justify-center mx-auto mb-6">
              <Gem size={28} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">کیفیت بی‌نظیر</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              استفاده از بهترین متریال‌ها و دقت در جزئیات، تعهد ما برای ارائه محصولاتی ماندگار است.
            </p>
          </div>

          {/* Value 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-[#BFA46F]/10 text-[#BFA46F] rounded-full flex items-center justify-center mx-auto mb-6">
              <Star size={28} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">طراحی اختصاصی</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              هر محصول داستان خودش را دارد و توسط طراحان مجرب ما با عشق خلق شده است.
            </p>
          </div>

          {/* Value 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-[#BFA46F]/10 text-[#BFA46F] rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck size={28} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-3">تضمین اصالت</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              ما اصالت تمام محصولاتمان را تضمین می‌کنیم تا با خیالی آسوده خرید کنید.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
