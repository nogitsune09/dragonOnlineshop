'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa';
import 'animate.css';
import LogOutButton from '../LogOutButton';
import { useAuth } from '../../../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, userId } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-black p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-orange-400 text-2xl font-bold">لوگو</div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-orange-400 focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <div className={`hidden md:flex md:space-x-6`}>
          <Link href="/" className="text-orange-400 hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-105">خانه</Link>
          <Link href="/products" className="text-orange-400 hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-105">محصولات</Link>
          <Link href="/about" className="text-orange-400 hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-105">درباره ما</Link>
          {isLoggedIn ? (
            <>
              <Link href={`/dashboard/${userId}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105">داشبورد</button>
              </Link>
              <LogOutButton />
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105">ورود</button>
              </Link>
              <Link href="/register">
                <button className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105">ثبت نام</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-4 space-y-4 animate__animated animate__fadeIn">
          <Link href="/" className="block text-orange-400 hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-105" onClick={toggleMenu}>خانه</Link>
          <Link href="/products" className="block text-orange-400 hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-105" onClick={toggleMenu}>محصولات</Link>
          <Link href="/about" className="block text-orange-400 hover:text-yellow-300 transition duration-300 ease-in-out transform hover:scale-105" onClick={toggleMenu}>درباره ما</Link>
          {isLoggedIn ? (
            <>
              <Link href={`/dashboard/${userId}`}>
                <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105" onClick={toggleMenu}>داشبورد</button>
              </Link>
              <LogOutButton />
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="w-full bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105" onClick={toggleMenu}>ورود</button>
              </Link>
              <Link href="/register">
                <button className="w-full bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition duration-300 ease-in-out transform hover:scale-105" onClick={toggleMenu}>ثبت نام</button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
