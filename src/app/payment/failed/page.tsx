import Link from 'next/link';

export default function PaymentFailedPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        {/* آیکون ضربدر قرمز */}
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-2">پرداخت ناموفق بود!</h1>
        <p className="text-gray-500 mb-6">
          {searchParams.error ? searchParams.error : 'متأسفانه در فرآیند پرداخت مشکلی پیش آمد یا پرداخت توسط شما لغو شد.'}
        </p>

        <div className="flex flex-col gap-3">
          <Link 
            href="/cart" 
            className="w-full bg-red-500 text-white py-3 rounded-xl font-medium hover:bg-red-600 transition-colors"
          >
            تلاش مجدد برای پرداخت
          </Link>
          <Link 
            href="/" 
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  );
}
