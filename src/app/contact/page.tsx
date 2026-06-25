import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            با ما در <span className="text-[#BFA46F] font-medium">ارتباط</span> باشید
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            سوالی دارید یا نیاز به راهنمایی هست؟ فرم زیر را پر کنید یا از طریق راه‌های ارتباطی با ما تماس بگیرید.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          
          {/* Contact Info (Right Side) */}
          <div className="lg:col-span-2 bg-gray-900 text-white p-10 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-medium mb-8 text-[#BFA46F]">اطلاعات تماس</h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin className="text-[#BFA46F] mt-1" size={24} strokeWidth={1.5} />
                  <div>
                    <h4 className="font-medium mb-1">آدرس فروشگاه</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      تهران، خیابان ولیعصر، بالاتر از میدان ونک، مجتمع تجاری ولورا، طبقه همکف، پلاک ۱۲
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="text-[#BFA46F] mt-1" size={24} strokeWidth={1.5} />
                  <div>
                    <h4 className="font-medium mb-1">تلفن</h4>
                    <p className="text-gray-400 text-sm" dir="ltr">+98 21 1234 5678</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="text-[#BFA46F] mt-1" size={24} strokeWidth={1.5} />
                  <div>
                    <h4 className="font-medium mb-1">ایمیل</h4>
                    <p className="text-gray-400 text-sm">support@veloura.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="text-[#BFA46F] mt-1" size={24} strokeWidth={1.5} />
                  <div>
                    <h4 className="font-medium mb-1">ساعات کاری</h4>
                    <p className="text-gray-400 text-sm">شنبه تا پنجشنبه: ۱۰ صبح تا ۹ شب</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (Left Side) */}
          <div className="lg:col-span-3 p-10 md:p-12">
            <h2 className="text-2xl font-medium text-gray-900 mb-8">ارسال پیام</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">نام و نام خانوادگی</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#BFA46F] focus:ring-1 focus:ring-[#BFA46F] outline-none transition-all bg-gray-50 focus:bg-white"
                    placeholder="مثال: علی رضایی"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">ایمیل</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#BFA46F] focus:ring-1 focus:ring-[#BFA46F] outline-none transition-all bg-gray-50 focus:bg-white text-left"
                    placeholder="example@mail.com"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-gray-700">موضوع پیام</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#BFA46F] focus:ring-1 focus:ring-[#BFA46F] outline-none transition-all bg-gray-50 focus:bg-white"
                  placeholder="درباره چه چیزی می‌خواهید صحبت کنید؟"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">متن پیام</label>
                <textarea 
                  id="message" 
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#BFA46F] focus:ring-1 focus:ring-[#BFA46F] outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                  placeholder="پیام خود را اینجا بنویسید..."
                ></textarea>
              </div>

              <button 
                type="button" 
                className="w-full md:w-auto px-8 py-3 bg-gray-900 hover:bg-[#BFA46F] text-white rounded-xl font-medium transition-colors duration-300"
              >
                ارسال پیام
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
