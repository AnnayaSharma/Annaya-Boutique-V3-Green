import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { ProductModel } from '@/lib/models/Product';

interface Params {
  params: Promise<{ slug: string }>;
}

export async function GET(_req: Request, { params }: Params) {
  const { slug } = await params;

  try {
    await connectDB();
    const product = await ProductModel.findOne({ slug }).lean() as any;

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    const serialised = {
      ...product,
      id: product._id.toString(),
      _id: undefined,
      __v: undefined,
      createdAt: product.createdAt?.toISOString?.() ?? null,
      updatedAt: product.updatedAt?.toISOString?.() ?? null,
    };

    return NextResponse.json(serialised);
  } catch (error) {
    console.error(`[GET /api/products/${slug}]`, error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
