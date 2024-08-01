import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '../../../lib/mongodb';
import User from '../../models/User';

export async function POST(req: Request) {
  await connectToDatabase();

  const { name, email, password, address, postalCode, phoneNumber } = await req.json();

  if (!name || !email || !password || !address || !postalCode || !phoneNumber) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  try {
    // Check if email or phone number already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    if (existingUser) {
      return NextResponse.json({ error: 'Email or phone number already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, address, postalCode, phoneNumber });
    await user.save();
    return NextResponse.json({ message: 'User registered successfully!', userId: user._id }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error registering user' }, { status: 400 });
  }
}
