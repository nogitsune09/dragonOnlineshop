'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, products]);

  const handleViewProduct = (name: string) => {
    const title = name.replace(/\s+/g, '-');
    router.push(`/products/${title}`);
  };

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black text-yellow-200 p-4" dir="rtl">
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="جستجو بر اساس عنوان..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-300"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {filteredProducts.map((product) => (
          <div key={product._id} className="max-w-xs rounded overflow-hidden shadow-lg p-4 bg-gray-800 hover:bg-gray-700 transition duration-300 transform hover:scale-105 hover:shadow-2xl">
            <img className="w-full h-48 object-cover rounded-lg" src={`data:image/jpeg;base64,${Buffer.from(product.image).toString('base64')}`} alt={product.name} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2 text-yellow-300">{product.name}</div>
              <p className="text-yellow-200 text-base">{truncateDescription(product.description, 30)}</p>
              <p className="text-yellow-400 text-lg font-semibold">تومان {product.price.toFixed(2)}</p>
              <button
                onClick={() => handleViewProduct(product.name)}
                className="mt-4 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded transition duration-300"
              >
                مشاهده
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
