'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`/api/products/${id}`);
          setProduct(response.data.product);
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center text-yellow-300">محصول یافت نشد</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black text-yellow-200 p-6" dir="rtl">
      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition duration-300">
        <img className="w-full h-64 object-cover rounded-t-lg" src={`data:image/jpeg;base64,${Buffer.from(product.image).toString('base64')}`} alt={product.name} />
        <div className="p-6">
          <h1 className="text-4xl font-bold text-yellow-300 mb-4">{product.name}</h1>
          <p className="text-2xl text-yellow-400 font-semibold mb-4">تومان {product.price.toFixed(2)}</p>
          <p className="text-yellow-200 text-lg">{product.description}</p>
          <button className="mt-6 bg-red-600 hover:bg-red-800 text-white px-6 py-2 rounded-lg shadow transition duration-300">
            افزودن به سبد خرید
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
