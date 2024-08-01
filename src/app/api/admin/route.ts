//src/app/api/admin/[id]/route.ts


import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectToDatabase from '../../..//lib/mongodb';
import Admin from '../../models/Admin';

const SECRET_KEY =  'your_secret_key';

export async function GET(req: Request) {
  await connectToDatabase();

  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Admin not authenticated' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { adminId: string };

    const admin = await Admin.findById(decoded.adminId);
    if (!admin) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    }

    return NextResponse.json({ admin }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching admin' }, { status: 400 });
  }
}
