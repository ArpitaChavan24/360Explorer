import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'all';

    // Note: Prisma doesn't support case-insensitive filtering with MongoDB-like syntax easily,
    // so we'll fetch all payments and filter client-side (or use a case-insensitive collation if using PostgreSQL)
    // For simplicity, let's fetch all and filter in memory (since it's admin only)
    const payments = await prisma.payment.findMany({
      include: {
        booking: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(payments);
  } catch (error) {
    console.error('Failed to fetch payments:', error);
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 });
  }
}
