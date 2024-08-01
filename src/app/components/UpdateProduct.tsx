import { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: Buffer;
}

const UpdateProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price.toString());
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    if (image) {
      formData.append('image', image);
    }

    try {
      const title = selectedProduct?.name.replace(/ /g, '-');
      const response = await axios.put(`/api/products/${title}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Product updated successfully');
      console.log('Product updated:', response.data);
      fetchProducts();
    } catch (error) {
      setMessage('Error updating product');
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async (productName: string) => {
    try {
      const title = productName.replace(/ /g, '-');
      await axios.delete(`/api/products/${title}`);
      setMessage('Product deleted successfully');
      setProducts(products.filter(product => product.name !== productName));
    } catch (error) {
      setMessage('Error deleting product');
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Update or Delete Products</h2>
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product._id} className="flex justify-between items-center bg-gray-100 p-4 rounded shadow">
            <div>
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p>{product.description}</p>
              <p className="text-gray-600">Price: {product.price}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleSelectProduct(product)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.name)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {selectedProduct && (
        <form onSubmit={handleUpdate} className="space-y-4 mt-8 bg-white p-4 rounded shadow-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image:</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Product
          </button>
          {message && <p className={`mt-4 ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
        </form>
      )}
    </div>
  );
};

export default UpdateProduct;
