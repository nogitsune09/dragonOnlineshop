

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectToDatabase from '../../../../lib/mongodb';
import User from '../../../models/User';

const SECRET_KEY =  'your_secret_key';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  await connectToDatabase();

  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: string };
    if (decoded.userId !== params.id) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 403 });
    }

    const user = await User.findById(params.id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching user' }, { status: 400 });
  }
}
