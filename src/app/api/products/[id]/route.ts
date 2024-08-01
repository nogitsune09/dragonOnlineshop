import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Product from '../../../models/Product';
import { promises as fs } from 'fs';
import multer from 'multer';

const upload = multer({ dest: '/tmp' });

export async function GET(req: NextRequest) {
  await connectToDatabase();

  const id = decodeURIComponent(req.nextUrl.pathname.split('/').pop() || '');
  const title = id.replace(/-/g, ' ');

  try {
    const product = await Product.findOne({ name: title });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: `Error fetching product: ${error.message}` }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}

export async function PUT(req: NextRequest) {
  await connectToDatabase();

  const id = decodeURIComponent(req.nextUrl.pathname.split('/').pop() || '');
  const title = id.replace(/-/g, ' ');

  try {
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = parseFloat(formData.get('price') as string);
    const image = formData.get('image') as File;

    const updateData: any = { name, description, price };

    if (image) {
      const imagePath = `/tmp/${image.name}`;
      await fs.writeFile(imagePath, Buffer.from(await image.arrayBuffer()));
      const imageBuffer = await fs.readFile(imagePath);
      updateData.image = imageBuffer;
    }

    const updatedProduct = await Product.findOneAndUpdate({ name: title }, updateData, { new: true });

    return NextResponse.json({ message: 'Product updated successfully', product: updatedProduct }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: `Error updating product: ${error.message}` }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}

export async function DELETE(req: NextRequest) {
  await connectToDatabase();

  const id = decodeURIComponent(req.nextUrl.pathname.split('/').pop() || '');
  const title = id.replace(/-/g, ' ');

  try {
    await Product.findOneAndDelete({ name: title });
    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: `Error deleting product: ${error.message}` }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}
