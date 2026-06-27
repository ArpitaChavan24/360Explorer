import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/emailService';

export async function POST(request: Request) {
  console.log('--- NEW CONTACT INQUIRY ---');
  try {
    const body = await request.json();
    const { fullName, email, phone, subject, message } = body;

    // Basic Validations
    if (!fullName || fullName.length < 2) return NextResponse.json({ error: 'Full name is required' }, { status: 400 });
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    if (!phone || phone.length < 10) return NextResponse.json({ error: 'Valid phone number is required' }, { status: 400 });
    if (!subject || subject.length < 2) return NextResponse.json({ error: 'Subject is required' }, { status: 400 });
    if (!message || message.length < 10) return NextResponse.json({ error: 'Message must be at least 10 characters' }, { status: 400 });

    console.log('Payload:', { fullName, email, phone, subject });

    const emailResult = await sendContactEmail({
      fullName,
      email,
      phone,
      subject,
      message
    });

    if (emailResult.success) {
      return NextResponse.json({ message: 'Message sent successfully' });
    } else {
      return NextResponse.json({ error: 'Failed to send message. Please try again later.' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('CONTACT API ERROR:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
