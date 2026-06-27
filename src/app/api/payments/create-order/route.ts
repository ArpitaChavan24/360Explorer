import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import prisma from '@/lib/prisma';
import { appendBookingToExcel } from '@/lib/excelService';

// Validate Razorpay env variables
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
  throw new Error('Please define RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables');
}

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

export async function POST(request: Request) {
    console.log('!!! INTERNAL NEXT.JS ROUTE HIT !!!');
    try {
    const body = await request.json();
    const { 
      amount, 
      currency: requestedCurrency,
      packageId, 
      packageName,
      destination,
      fullName,
      email,
      phone,
      travelDate,
      travelersCount,
      address,
      city,
      state,
      country,
      pincode,
      specialRequests
    } = body;

    const INR_TO_USD_RATE = 95.59;
    let currency = requestedCurrency || 'INR';
    let chargedAmount = amount;
    let inrAmount = amount;
    let usdAmount = amount;

    if (currency === 'USD') {
      usdAmount = amount;
      inrAmount = Math.round(amount * INR_TO_USD_RATE);
    } else {
      inrAmount = amount;
      usdAmount = Math.round(amount / INR_TO_USD_RATE);
    }

    console.log('Processing Amount:', `${currency} ${chargedAmount.toLocaleString(currency === 'INR' ? 'en-IN' : 'en-US')}`);
    console.log('Internal Conversion:', `USD: ${usdAmount}, INR: ${inrAmount}`);

    // Validations
    if (!fullName || fullName.length < 2) return NextResponse.json({ error: 'Full name is required' }, { status: 400 });
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    if (!phone || phone.length < 10) return NextResponse.json({ error: 'Valid phone number is required' }, { status: 400 });
    if (!address || address.length < 5) return NextResponse.json({ error: 'Valid street address is required' }, { status: 400 });
    if (!city) return NextResponse.json({ error: 'City is required' }, { status: 400 });
    if (!state) return NextResponse.json({ error: 'State is required' }, { status: 400 });
    if (!pincode || !/^\d{6}$/.test(pincode)) return NextResponse.json({ error: 'Valid 6-digit pincode is required' }, { status: 400 });
    if (!country) return NextResponse.json({ error: 'Country is required' }, { status: 400 });

    if (currency === 'INR' && chargedAmount > 8500000) {
      return NextResponse.json({ error: 'Payment amount exceeds maximum limit of 85,00,000 Rupees' }, { status: 400 });
    }

    const options: any = {
      amount: Math.round(chargedAmount * 100), // Razorpay requires amount in smallest unit
      currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
      notes: {
        customer_name: fullName,
        customer_email: email,
        customer_country: country,
        original_amount: amount,
        original_currency: currency,
        usd_amount: usdAmount,
        inr_amount: inrAmount,
        is_international: currency === 'USD'
      }
    };

    const order: any = await razorpay.orders.create(options);

    // Get IP Address
    const ip = request.headers.get('x-forwarded-for') || 'unknown';

    // Create a pending booking in the database
    const bookingId = `WT-${Math.floor(100000 + Math.random() * 900000)}`;
    const newBooking = await prisma.booking.create({
      data: {
        fullName,
        email,
        phone,
        address,
        city,
        state,
        country,
        pincode,
        bookingId,
        razorpayOrderId: order.id,
        packageId,
        packageName,
        packagePrice: amount / travelersCount,
        destination,
        travelersCount,
        travelDate: new Date(travelDate),
        specialRequests,
        status: 'pending',
        paymentAmount: chargedAmount,
        paymentStatus: 'unpaid',
        paymentGateway: 'Razorpay',
        ipAddress: ip,
        payment: {
          create: {
            gatewayOrderId: order.id,
            amount: chargedAmount,
            currency: currency,
            status: 'pending',
            usdAmount: usdAmount,
            inrAmount: inrAmount
          }
        }
      },
      include: {
        payment: true
      }
    });

    // Append the booking to Excel
    await appendBookingToExcel(newBooking);

    return NextResponse.json({ 
      orderId: order.id, 
      amount: order.amount, 
      currency: order.currency,
      bookingId: newBooking.bookingId,
      razorpayKeyId: RAZORPAY_KEY_ID
    });
  } catch (error: any) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
