'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

const LogOutButton = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      // Clear the token from localStorage
      localStorage.removeItem('token');
      // Update auth context
      logout();
      // Redirect to home page
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <button 
      onClick={handleLogout} 
      className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105"
    >
      خروج
    </button>
  );
};

export default LogOutButton;
