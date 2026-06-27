import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const id = searchParams.get('id');

    if (id) {
      const adventure = await prisma.adventure.findUnique({
        where: { id },
        include: { itinerary: true }
      });
      if (!adventure) {
        return NextResponse.json({ error: 'Adventure not found' }, { status: 404 });
      }
      return NextResponse.json(adventure);
    }

    let where: any = {};
    if (category) {
      where.category = {
        contains: category,
        mode: 'insensitive'
      };
    }

    const adventures = await prisma.adventure.findMany({
      where,
      include: { itinerary: true }
    });
    return NextResponse.json(adventures);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
