//src/app/api/login/route.ts

import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectToDatabase from '../../../lib/mongodb';
import User from '../../models/User';

const SECRET_KEY =  'your_secret_key';

export async function POST(req: Request) {
  await connectToDatabase();

  const { email, phoneNumber, password } = await req.json();

  if ((!email && !phoneNumber) || !password) {
    return NextResponse.json({ error: 'Email or phone number and password are required' }, { status: 400 });
  }

  try {
    const user = await User.findOne(email ? { email } : { phoneNumber });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

    return NextResponse.json({ message: 'Login successful!', token, userId: user._id }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error logging in' }, { status: 400 });
  }
}
