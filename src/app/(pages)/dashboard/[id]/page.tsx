'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';

interface User {
  name: string;
  email: string;
  address: string;
  postalCode: string;
  phoneNumber: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/user/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUser(response.data.user);
      } catch (error) {
        router.push('/login');
      }
    };

    fetchUser();
  }, [id, router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="absolute top-4 left-4">
        </div>
      </div>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Address:</strong> {user.address}</p>
      <p><strong>Postal Code:</strong> {user.postalCode}</p>
      <p><strong>Phone Number:</strong> {user.phoneNumber}</p>

      <div className="mt-16 p-4 bg-blue-100 border-l-4 border-blue-500 text-blue-700 text-right" style={{ direction: "rtl" }}>
        <p className="font-bold">توجه :</p>
        <p>این سایت در حال توسعه می‌باشد و اکنون در حالت دمو می‌باشد.</p>
      </div>

      <div className="mt-8 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 text-right" style={{ direction: "rtl" }}>
        <p className="font-bold">توجه :</p>
        <p>در صورت مشکل در API و یا کند شدن سرور، به دلیل کار بر روی آن می‌باشد.</p>
      </div>
    </div>
  );
};

export default Dashboard;
