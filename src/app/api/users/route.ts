import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import User from '../../models/User';

export async function GET(req: NextRequest) {
  await connectToDatabase();

  const page = parseInt(req.nextUrl.searchParams.get('page') || '1');
  const limit = parseInt(req.nextUrl.searchParams.get('limit') || '10');
  const skip = (page - 1) * limit;

  try {
    const users = await User.find({}).skip(skip).limit(limit);
    const total = await User.countDocuments({});
    return NextResponse.json({ users, total }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: `Error fetching users: ${error.message}` }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}
