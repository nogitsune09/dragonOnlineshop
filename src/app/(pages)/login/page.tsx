'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '../../../context/AuthContext';

const Login = () => {
  const [isEmailLogin, setIsEmailLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', isEmailLogin ? { email, password } : { phoneNumber, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setMessage(response.data.message);
      setMessageType('success');
      localStorage.setItem('token', response.data.token);
      login(response.data.userId); // ارسال userId به login
      setTimeout(() => {
        router.push(`/dashboard/${response.data.userId}`);
      }, 2000); // 2 seconds delay before redirecting
    } catch (error) {
      setMessage('Error logging in');
      setMessageType('error');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">{isEmailLogin ? 'Email:' : 'Phone Number:'}</label>
          {isEmailLogin ? (
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white" />
          ) : (
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white" />
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white" />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300">Login</button>
        <button type="button" onClick={() => setIsEmailLogin(!isEmailLogin)} className="w-full mt-4 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300">
          {isEmailLogin ? 'Login with Phone Number' : 'Login with Email'}
        </button>
      </form>
      {message && (
        <div className={`mt-4 p-4 rounded ${messageType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Login;
