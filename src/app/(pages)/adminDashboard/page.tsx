'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import CreateProduct from '../../components/CreateProduct';
import UpdateProduct from '../../components/UpdateProduct';

interface Admin {
  username: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
}

const AdminDashboard = () => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const router = useRouter();
  const usersPerPage = 10;

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/admin', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setAdmin(response.data.admin);
      } catch (error) {
        router.push('/loginAdmin');
      }
    };

    const fetchUsers = async (page: number) => {
      try {
        const response = await axios.get(`/api/users?page=${page}&limit=${usersPerPage}`);
        setUsers(response.data.users);
        setTotalPages(Math.ceil(response.data.total / usersPerPage));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchAdmin();
    fetchUsers(currentPage);
  }, [router, currentPage]);

  if (!admin) {
    return <div>Loading...</div>;
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await axios.delete(`/api/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4 border rounded shadow-lg bg-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      </div>
      <p className="text-lg"><strong>Username:</strong> {admin.username}</p>
      
      {/* Buttons to toggle forms */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {showCreateForm ? 'بستن فرم ساخت' : 'ساخت محصول'}
        </button>
        <button
          onClick={() => setShowUpdateForm(!showUpdateForm)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          {showUpdateForm ? 'بستن فرم به‌روزرسانی' : 'به‌روزرسانی محصول'}
        </button>
      </div>

      {/* Section for creating products */}
      {showCreateForm && (
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">ساخت محصولات</h2>
          <CreateProduct />
        </section>
      )}

      {/* Section for updating products */}
      {showUpdateForm && (
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">به‌روزرسانی محصولات</h2>
          <UpdateProduct />
        </section>
      )}

      {/* Section for displaying users */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">لیست کاربران</h2>
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user._id} className="flex justify-between items-center bg-gray-100 p-4 rounded shadow">
              <div>
                <h3 className="text-lg font-bold">{user.name}</h3>
                <p>{user.email}</p>
                <p>{user.phoneNumber}</p>
              </div>
              <button
                onClick={() => handleDeleteUser(user._id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                حذف
              </button>
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
