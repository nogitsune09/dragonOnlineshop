'use client';

import 'animate.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import heroImage from '../../../public/assassins-creed.jpeg'; // ایمپورت تصویر از فولدر public

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: Buffer;
}

export default function Home() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // حالت بارگذاری

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true); // شروع بارگذاری
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data.products.slice(-3)); // فقط سه محصول آخر
      setLoading(false); // پایان بارگذاری
    }
    fetchProducts();
  }, []);

  const handleShopNow = () => {
    router.push('/products');
  };

  const createProductUrl = (name: string) => {
    return `/products/${encodeURIComponent(name.replace(/\s+/g, '-'))}`;
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-gray-800 to-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row-reverse items-center justify-between">
          <div className="text-center md:text-right animate__animated animate__fadeInRight">
            <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-4">
              خوش آمدید به فروشگاه ما
            </h1>
            <p className="text-lg md:text-xl text-yellow-200 mb-6">
              این سایت در حال ساخت و توسعه میباشد و در حالت دمو و بر روی سرور تست میباشد . پس در صورت اختلال یا کندی سرعت اتفاقی طبیعی میباشد 
              این سایت با استفاده از NEXTJS و REACT JS  ساخته شده است 
            </p>
            <button
              onClick={handleShopNow}
              className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition duration-300 animate__animated animate__bounceIn"
            >
              خرید کنید
            </button>
          </div>
          <div className="mt-8 md:mt-0 animate__animated animate__fadeInLeft">
            <Image
              src={heroImage}
              alt="Hero Image"
              width={500}
              height={500}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 py-8">
        <h2 className="text-4xl font-bold text-center text-yellow-300 mb-8 animate__animated animate__fadeInDown">
          جدیدترین محصولات
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {loading ? (
            <div className="text-yellow-300">در حال بارگذاری...</div>
          ) : (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg animate__animated animate__fadeInUp text-right transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-700"
              >
                <Image
                  src={`data:image/jpeg;base64,${Buffer.from(product.image).toString('base64')}`}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="rounded-lg mb-4"
                />
                <h3 className="text-2xl font-bold text-yellow-300 mb-2">{product.name}</h3>
                <p className="text-yellow-200 mb-4">
                  {product.description.length > 30 ? `${product.description.slice(0, 30)}...` : product.description}
                </p>
                <p className="text-yellow-400 font-bold mb-4">تومان {product.price}</p>
                <button
                  onClick={() => router.push(createProductUrl(product.name))}
                  className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                  مشاهده جزئیات
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
