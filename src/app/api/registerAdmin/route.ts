import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '../../../lib/mongodb';
import Admin from '../../models/Admin';

export async function POST(req: Request) {
  await connectToDatabase();

  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();

    return NextResponse.json({ message: 'Registration successful!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error registering' }, { status: 400 });
  }
}
