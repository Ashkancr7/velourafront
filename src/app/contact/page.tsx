import { MapPin, Phone, Mail, Clock } from "lucide-react";

// اطلاعات تماس را جدا می‌کنیم تا مدیریت آن‌ها آسان باشد
const CONTACT_DETAILS = [
  {
    id: 1,
    icon: MapPin,
    title: "آدرس فروشگاه",
    value: "ما آنلاین شاپیم آدرس ما توی قلب زیبای شماست",
  },
  {
    id: 2,
    icon: Phone,
    title: "تلفن",
    value: "+98 991 061 6048",
    isDirLtr: true, // برای شماره تلفن‌ها که نیاز به جهت‌گیری چپ به راست دارند
  },
  {
    id: 3,
    icon: Mail,
    title: "ایمیل",
    value: "support@veloura.com",
    isDirLtr: true,
  },
  {
    id: 4,
    icon: Clock,
    title: "ساعات کاری",
    value: "شنبه تا پنجشنبه: ۱۰ صبح تا ۹ شب",
  },
];

// استایل‌های مشترک برای فرم تا کد تمیزتر بماند
const INPUT_CLASSES = "w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#BFA46F] focus:ring-1 focus:ring-[#BFA46F] outline-none transition-all bg-gray-50 focus:bg-white";

export default function ContactPage() {
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Form submitted");
  // };

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
          
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2 bg-gray-900 text-white p-10 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-medium mb-8 text-[#BFA46F]">اطلاعات تماس</h2>
              <div className="space-y-8">
                {CONTACT_DETAILS.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <item.icon className="text-[#BFA46F] mt-1 shrink-0" size={24} strokeWidth={1.5} />
                    <div>
                      <h4 className="font-medium mb-1">{item.title}</h4>
                      <p className={`text-gray-400 text-sm leading-relaxed ${item.isDirLtr ? 'ltr' : ''}`} dir={item.isDirLtr ? 'ltr' : undefined}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 p-10 md:p-12">
            <h2 className="text-2xl font-medium text-gray-900 mb-8">ارسال پیام</h2>
            <form  className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">نام و نام خانوادگی</label>
                  <input type="text" id="name" className={INPUT_CLASSES} placeholder="مثال: علی رضایی" required />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">ایمیل</label>
                  <input type="email" id="email" className={`${INPUT_CLASSES} ltr`} placeholder="example@mail.com" required />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-gray-700">موضوع پیام</label>
                <input type="text" id="subject" className={INPUT_CLASSES} placeholder="درباره چه چیزی می‌خواهید صحبت کنید؟" />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">متن پیام</label>
                <textarea id="message" rows={5} className={`${INPUT_CLASSES} resize-none`} placeholder="پیام خود را اینجا بنویسید..." required></textarea>
              </div>

              <button 
                type="submit" 
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