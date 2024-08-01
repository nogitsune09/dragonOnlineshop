// pages/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Product from '../../models/Product';
import multer from 'multer';
import { promises as fs } from 'fs';

const upload = multer({ dest: '/tmp' });

export async function POST(req: NextRequest) {
  await connectToDatabase();

  try {
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const image = formData.get('image') as File;

    const imagePath = `/tmp/${image.name}`;
    await fs.writeFile(imagePath, Buffer.from(await image.arrayBuffer()));

    const imageBuffer = await fs.readFile(imagePath);

    const newProduct = new Product({ name, description, price, image: imageBuffer, createdAt: new Date() });
    await newProduct.save();

    return NextResponse.json({ message: 'Product created successfully', product: newProduct }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: `Error creating product: ${error.message}` }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}

export async function GET(req: NextRequest) {
  await connectToDatabase();

  try {
    const products = await Product.find({});
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: `Error fetching products: ${error.message}` }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}
