//src/app/api/loginAdmin/route.ts


import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectToDatabase from '../../../lib/mongodb';
import Admin from '../../models/Admin';

const SECRET_KEY =  'your_secret_key';

export async function POST(req: Request) {
  await connectToDatabase();

  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
  }

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
    }

    // Create JWT token
    const token = jwt.sign({ adminId: admin._id }, SECRET_KEY, { expiresIn: '1h' });

    return NextResponse.json({ message: 'Login successful!', token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error logging in' }, { status: 400 });
  }
}
