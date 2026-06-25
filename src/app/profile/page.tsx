import { User, ShoppingBag, MapPin, Heart, Settings, LogOut, Edit2, ChevronLeft } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-900">
            حساب <span className="text-[#BFA46F] font-medium">کاربری</span>
          </h1>
          <p className="text-gray-500 mt-2">خوش آمدید، علی عزیز!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-[#BFA46F]/10 text-[#BFA46F] rounded-full flex items-center justify-center">
                  <User size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">علی رضایی</h3>
                  <p className="text-sm text-gray-500" dir="ltr">0912 345 6789</p>
                </div>
              </div>
              
              <nav className="p-4 space-y-1">
                <a href="#" className="flex items-center justify-between p-3 rounded-xl bg-gray-50 text-[#BFA46F] font-medium transition-colors">
                  <div className="flex items-center gap-3">
                    <User size={20} strokeWidth={1.5} />
                    <span>اطلاعات حساب</span>
                  </div>
                </a>
                <a href="#" className="flex items-center justify-between p-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                  <div className="flex items-center gap-3">
                    <ShoppingBag size={20} strokeWidth={1.5} />
                    <span>سفارش‌های من</span>
                  </div>
                </a>
                <a href="#" className="flex items-center justify-between p-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                  <div className="flex items-center gap-3">
                    <Heart size={20} strokeWidth={1.5} />
                    <span>علاقه‌مندی‌ها</span>
                  </div>
                </a>
                <a href="#" className="flex items-center justify-between p-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                  <div className="flex items-center gap-3">
                    <MapPin size={20} strokeWidth={1.5} />
                    <span>آدرس‌ها</span>
                  </div>
                </a>
                <a href="#" className="flex items-center justify-between p-3 rounded-xl text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
                  <div className="flex items-center gap-3">
                    <Settings size={20} strokeWidth={1.5} />
                    <span>تنظیمات</span>
                  </div>
                </a>
                <div className="pt-4 mt-4 border-t border-gray-100">
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors">
                    <LogOut size={20} strokeWidth={1.5} />
                    <span>خروج از حساب</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            
            {/* Personal Info Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium text-gray-900">اطلاعات شخصی</h2>
                <button className="flex items-center gap-2 text-sm text-[#BFA46F] hover:text-gray-900 transition-colors">
                  <Edit2 size={16} strokeWidth={1.5} />
                  <span>ویرایش</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">نام و نام خانوادگی</p>
                  <p className="font-medium text-gray-900">علی رضایی</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">شماره موبایل</p>
                  <p className="font-medium text-gray-900" dir="ltr">+98 912 345 6789</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">ایمیل</p>
                  <p className="font-medium text-gray-900">ali.rezaei@example.com</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">تاریخ عضویت</p>
                  <p className="font-medium text-gray-900">۱۵ اردیبهشت ۱۴۰۵</p>
                </div>
              </div>
            </div>

            {/* Recent Orders Snapshot */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-medium text-gray-900">آخرین سفارش‌ها</h2>
                <a href="#" className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#BFA46F] transition-colors">
                  <span>مشاهده همه</span>
                  <ChevronLeft size={16} strokeWidth={1.5} />
                </a>
              </div>
              
              <div className="space-y-4">
                {/* Order Item */}
                <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-[#BFA46F]/30 transition-colors gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <ShoppingBag size={20} className="text-gray-500" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 mb-1">سفارش #VL-8439</p>
                      <p className="text-sm text-gray-500">۳ تیر ۱۴۰۵</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:gap-8">
                    <div className="text-right">
                      <p className="text-sm text-gray-500 mb-1">مبلغ کل</p>
                      <p className="font-medium text-gray-900">۲,۴۵۰,۰۰۰ تومان</p>
                    </div>
                    <span className="px-3 py-1 bg-green-50 text-green-600 text-sm font-medium rounded-full">
                      تحویل شده
                    </span>
                  </div>
                </div>

                {/* Order Item 2 */}
                <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-[#BFA46F]/30 transition-colors gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <ShoppingBag size={20} className="text-gray-500" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 mb-1">سفارش #VL-8440</p>
                      <p className="text-sm text-gray-500">۱ تیر ۱۴۰۵</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:gap-8">
                    <div className="text-right">
                      <p className="text-sm text-gray-500 mb-1">مبلغ کل</p>
                      <p className="font-medium text-gray-900">۱,۲۰۰,۰۰۰ تومان</p>
                    </div>
                    <span className="px-3 py-1 bg-[#BFA46F]/10 text-[#BFA46F] text-sm font-medium rounded-full">
                      در حال پردازش
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
