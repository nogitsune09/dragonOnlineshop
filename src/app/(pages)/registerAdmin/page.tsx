'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const RegisterAdmin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (adminCode !== '123456') {
      alert('Invalid admin code');
      return;
    }
    try {
      const response = await axios.post('/api/registerAdmin', { username, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert(response.data.message);
      router.push('/adminDashboard');
    } catch (error) {
      alert('Error registering');
    }
  };

  return (
    <main>

    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border rounded shadow" method="POST">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Admin Code:</label>
        <input type="text" value={adminCode} onChange={(e) => setAdminCode(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
      </div>
      <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">Register</button>
    </form>
    </main>
  );
};

export default RegisterAdmin;
