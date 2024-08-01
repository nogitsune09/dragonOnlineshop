'use client';

import 'animate.css';
import React, { useState } from 'react';

export default function AboutPage() {
  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black text-yellow-200 flex flex-col items-center justify-center p-8" style={{direction:"rtl"}}>
      <div className="container mx-auto px-4 py-8 text-right">
        <h1 className="text-5xl font-bold text-center mb-8 animate__animated animate__fadeInDown">
          درباره ما
        </h1>
        <p className="text-lg text-center mb-6 animate__animated animate__fadeInUp" style={{direction:"rtl"}}>
          این سایت با استفاده از <span className="text-yellow-400">Next.js 14</span> و <span className="text-yellow-400">React.js</span> و <span className="text-yellow-400">MongoDB</span> ساخته شده است.
        </p>
        <p className="text-lg text-center mb-6 animate__animated animate__fadeInUp" style={{direction:"rtl"}}>
          Next.js یک فریمورک قدرتمند برای ساخت برنامه‌های وب مدرن است که امکاناتی مانند رندرینگ سمت سرور، تولید صفحات استاتیک و پشتیبانی از API را فراهم می‌کند. استفاده از Next.js باعث بهبود عملکرد و سئو سایت می‌شود.
        </p>
        <p className="text-lg text-center mb-6 animate__animated animate__fadeInUp" style={{direction:"rtl"}}>
          با استفاده از MongoDB، ما می‌توانیم داده‌ها را به صورت انعطاف‌پذیر و مقیاس‌پذیر ذخیره کنیم و به راحتی به آن‌ها دسترسی داشته باشیم.
        </p>
        {showMore && (
          <div className="animate__animated animate__fadeInUp">
            <p className="text-lg text-center mb-6" style={{direction:"rtl"}}>
              React.js به ما امکان می‌دهد تا رابط‌های کاربری پویا و تعاملی بسازیم. با استفاده از کامپوننت‌ها، می‌توانیم کدهای خود را به بخش‌های کوچکتر و قابل استفاده مجدد تقسیم کنیم.
            </p>
            <p className="text-lg text-center mb-6" style={{direction:"rtl"}}>
              Next.js همچنین از قابلیت‌های پیشرفته‌ای مانند رندرینگ سمت سرور و تولید صفحات استاتیک پشتیبانی می‌کند که باعث بهبود عملکرد و تجربه کاربری می‌شود.
            </p>
          </div>
        )}
        {!showMore && (
          <div className="flex justify-center mt-8 animate__animated animate__fadeInUp">
            <button
              onClick={handleShowMore}
              className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              بیشتر بدانید
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
