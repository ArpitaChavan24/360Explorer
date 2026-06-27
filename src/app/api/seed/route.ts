import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { adventures } from '@/data/adventures';

export async function GET() {
  try {
    // Clear existing data
    // Delete itinerary items first due to foreign key constraints
    await prisma.itineraryItem.deleteMany({});
    await prisma.adventure.deleteMany({});
    
    // Insert initial data
    for (const adventure of adventures) {
      await prisma.adventure.create({
        data: {
          id: adventure.id,
          title: adventure.title,
          price: adventure.price,
          location: adventure.location,
          rating: adventure.rating,
          image: adventure.image,
          description: adventure.description,
          duration: adventure.duration,
          difficulty: adventure.difficulty,
          category: adventure.category,
          highlights: adventure.highlights,
          itinerary: {
            create: adventure.itinerary.map(item => ({
              day: typeof item.day === 'string' ? parseInt(item.day) : item.day,
              title: item.title,
              description: item.description
            }))
          }
        }
      });
    }
    
    return NextResponse.json({ message: 'Database seeded successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Seeding error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
