import { NextResponse } from 'next/server';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import prisma from '@/lib/prisma';
import { sendBookingEmail } from '@/lib/emailService';
import { appendPaymentToExcel } from '@/lib/excelService';

// Validate Razorpay env variables
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

if (!RAZORPAY_KEY_SECRET) {
  throw new Error('Please define RAZORPAY_KEY_SECRET environment variable');
}

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID || '',
  key_secret: RAZORPAY_KEY_SECRET,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature 
    } = body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET as string)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Fetch payment details from Razorpay
      const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
      const paymentMethod = paymentDetails.method || 'unknown';

      const ticketNumber = `TKT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

      // Use transaction to ensure all updates are atomic
      const updatedBooking = await prisma.$transaction(async (tx) => {
        const booking = await tx.booking.update({
          where: { razorpayOrderId: razorpay_order_id },
          data: {
            status: 'confirmed',
            paymentStatus: 'paid',
            paymentId: razorpay_payment_id,
            paymentDate: new Date(),
            transactionId: razorpay_payment_id,
            invoiceNumber: `INV-${Date.now()}`,
            payment: {
              update: {
                status: 'successful',
                paymentId: razorpay_payment_id,
                transactionId: razorpay_payment_id,
                paymentDate: new Date(),
                method: paymentMethod
              }
            },
            ticket: {
              create: {
                ticketNumber,
                status: 'active'
              }
            }
          },
          include: {
            payment: true,
            ticket: true
          }
        });
        return booking;
      });

      // Append payment to Excel
      if (updatedBooking.payment) {
        await appendPaymentToExcel(updatedBooking.payment, updatedBooking);
      }

      // Send confirmation email
      try {
        await sendBookingEmail({
          email: updatedBooking.email,
          fullName: updatedBooking.fullName,
          bookingId: updatedBooking.bookingId,
          ticketNumber: ticketNumber,
          packageName: updatedBooking.packageName,
          travelDate: updatedBooking.travelDate.toISOString(),
          paymentAmount: updatedBooking.payment?.amount || 0,
          currency: updatedBooking.payment?.currency || 'INR',
          transactionId: razorpay_payment_id
        });
      } catch (emailError) {
        console.error('⚠️  Failed to send confirmation email:', emailError);
        // Don't fail the whole payment verification just because email failed
      }

      return NextResponse.json({ 
        message: "Payment verified successfully", 
        bookingId: updatedBooking.bookingId,
        ticketNumber: updatedBooking.ticket?.ticketNumber
      }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Error verifying payment:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
