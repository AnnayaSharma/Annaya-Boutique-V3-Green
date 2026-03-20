import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { ProductModel } from '@/lib/models/Product';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    await connectDB();
    const products = await ProductModel.find().sort({ createdAt: -1 }).lean();

    // Normalise _id → id for every document
    const serialised = products.map((p: any) => ({
      ...p,
      id: p._id.toString(),
      _id: undefined,
      __v: undefined,
      createdAt: p.createdAt?.toISOString?.() ?? null,
      updatedAt: p.updatedAt?.toISOString?.() ?? null,
    }));

    return NextResponse.json(serialised);
  } catch (error) {
    console.error('[GET /api/products]', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
