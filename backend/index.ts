import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import prisma from './prisma';
import { sendBookingEmail, sendContactEmail } from './emailService';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import * as XLSX from 'xlsx';
import { appendBookingToExcel, appendPaymentToExcel } from './excelService';

console.log('--- BACKEND SERVER INITIALIZING (v2.0) ---');
console.log('Timestamp:', new Date().toLocaleString());
console.log('Working Directory:', process.cwd());
console.log('Excel Directory:', path.resolve(__dirname, 'exports'));

const envResult = dotenv.config();
if (envResult.error) {
  console.error('CRITICAL: Failed to load .env file:', envResult.error);
} else {
  console.log('.env file loaded successfully');
}

console.log('Razorpay Key ID Status:', process.env.RAZORPAY_KEY_ID ? 'Configured (starts with ' + process.env.RAZORPAY_KEY_ID.substring(0, 8) + '...)' : 'MISSING');
console.log('Razorpay Key Secret Status:', process.env.RAZORPAY_KEY_SECRET ? 'Configured' : 'MISSING');

const app = express();
const PORT = 5001; // Standalone backend port

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    // Allow any localhost or 127.0.0.1 origin
    if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true
}));

// Add a global logger to see EVERY request
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
  next();
});

app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// --- CONTACT FORM API ---
app.post('/api/contact', async (req, res) => {
  console.log('--- NEW CONTACT INQUIRY ---');
  try {
    const { fullName, email, phone, subject, message } = req.body;

    // Basic Validations
    if (!fullName || fullName.length < 2) return res.status(400).json({ error: 'Full name is required' });
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ error: 'Valid email is required' });
    if (!phone || phone.length < 10) return res.status(400).json({ error: 'Valid phone number is required' });
    if (!subject || subject.length < 2) return res.status(400).json({ error: 'Subject is required' });
    if (!message || message.length < 10) return res.status(400).json({ error: 'Message must be at least 10 characters' });

    console.log('Payload:', { fullName, email, phone, subject });

    const emailResult = await sendContactEmail({
      fullName,
      email,
      phone,
      subject,
      message
    });

    if (emailResult.success) {
      res.json({ message: 'Message sent successfully' });
    } else {
      res.status(500).json({ error: 'Failed to send message. Please try again later.' });
    }
  } catch (error: any) {
    console.error('CONTACT API ERROR:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

// Middleware for JWT Authentication
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// --- AUTH ENDPOINTS ---
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.password) return res.status(401).json({ error: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET as string);
    res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- ADVENTURES ---
app.get('/api/adventures', async (req, res) => {
  try {
    const { category, id } = req.query;
    if (id) {
      const adventure = await prisma.adventure.findUnique({
        where: { id: id as string },
        include: { itinerary: true }
      });
      if (!adventure) return res.status(404).json({ error: 'Adventure not found' });
      return res.json(adventure);
    }
    let where: any = {};
    if (category) where.category = { contains: category as string, mode: 'insensitive' };
    const adventures = await prisma.adventure.findMany({ where, include: { itinerary: true } });
    res.json(adventures);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- PAYMENTS & BOOKINGS ---
const INR_TO_USD_RATE = 95.59; // 1 USD = 95.59 INR (Updated rate)

app.post('/api/payments/create-order', async (req, res) => {
  console.log('--- NEW ORDER REQUEST ---');
  try {
    const { 
      amount, packageId, packageName, destination,
      fullName, email, phone, travelDate, travelersCount,
      address, city, state, country, pincode, specialRequests
    } = req.body;

    // Determine Currency and Amount based on Country
    let currency = 'INR';
    let chargedAmount = amount;

    const isDomestic = !country || country.trim().toLowerCase() === 'india';
    
    if (!isDomestic) {
      currency = 'USD';
      chargedAmount = Math.round(amount / INR_TO_USD_RATE);
      console.log(`International user detected from ${country}. Converting ₹${amount} to $${chargedAmount}`);
    } else {
      console.log(`Domestic user detected from ${country || 'India'}. Using INR ₹${amount}`);
    }

    console.log('Payload:', { 
      originalAmount: `₹${amount.toLocaleString('en-IN')}`,
      chargedAmount: `${currency} ${chargedAmount.toLocaleString(currency === 'INR' ? 'en-IN' : 'en-US')}`,
      packageId, 
      packageName, 
      fullName, 
      email, 
      travelersCount 
    });

    // Validations
    if (!fullName || fullName.length < 2) return res.status(400).json({ error: 'Full name is required' });
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ error: 'Valid email is required' });
    if (!phone || phone.length < 10) return res.status(400).json({ error: 'Valid phone number is required' });
    if (!address || address.length < 5) return res.status(400).json({ error: 'Valid street address is required' });
    if (!city) return res.status(400).json({ error: 'City is required' });
    if (!state) return res.status(400).json({ error: 'State is required' });
    if (!pincode || !/^\d{6}$/.test(pincode)) return res.status(400).json({ error: 'Valid 6-digit pincode is required' });
    if (!country) return res.status(400).json({ error: 'Country is required' });

    if (!process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID === 'your_razorpay_key_id') {
      console.error('ERROR: Razorpay keys not configured in .env');
      return res.status(400).json({ error: 'Razorpay keys not configured' });
    }

    if (!chargedAmount || isNaN(chargedAmount) || chargedAmount <= 0) {
      console.error('ERROR: Invalid amount:', chargedAmount);
      return res.status(400).json({ error: 'Invalid payment amount' });
    }

    // Limit check in respective currency
    const maxLimitINR = 8500000;
    const currentAmountInINR = currency === 'INR' ? chargedAmount : chargedAmount * INR_TO_USD_RATE;
    
    if (currentAmountInINR > maxLimitINR) {
      console.error('ERROR: Amount exceeds maximum limit:', currentAmountInINR);
      return res.status(400).json({ error: 'Payment amount exceeds maximum limit of 85,00,000 Rupees' });
    }

    if (!travelersCount || travelersCount <= 0) {
      console.error('ERROR: Invalid travelersCount:', travelersCount);
      return res.status(400).json({ error: 'Invalid number of travelers' });
    }

    const options: any = {
      amount: Math.round(chargedAmount * 100), // Razorpay requires amount in smallest unit
      currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1, // Explicitly enable auto-capture
      notes: {
        customer_name: fullName,
        customer_email: email,
        customer_country: country,
        original_amount_inr: amount,
        is_international: !isDomestic,
        billing_address: `${address}, ${city}, ${state}, ${pincode}, ${country}`
      }
    };

    console.log('Creating Razorpay Order with options:', options);
    let order: any;
    try {
      order = await razorpay.orders.create(options);
    } catch (rzpError: any) {
      console.error('--- RAZORPAY DETAILED ERROR ---');
      console.error('Status Code:', rzpError.statusCode);
      console.error('Error Body:', JSON.stringify(rzpError.error, null, 2));
      console.error('Message:', rzpError.message);
      
      return res.status(500).json({ 
        error: 'Razorpay API Error', 
        details: rzpError.error?.description || rzpError.message,
        hint: 'Check your internet connection and verify your RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env.'
      });
    }
    console.log('Razorpay Order Created:', order.id);

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const bookingId = `WT-${Math.floor(100000 + Math.random() * 900000)}`;

    // 1. Create User if not exists
    console.log('Checking/Creating User for email:', email);
    let user;
    try {
      user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        user = await prisma.user.create({ data: { name: fullName, email, mobile: phone } });
        console.log('New User Created:', user.id);
      }
    } catch (userError: any) {
      console.error('DATABASE ERROR (User Check/Create):', userError);
      return res.status(500).json({ 
        error: 'Database User Error', 
        details: userError.message,
        hint: 'Prisma could not connect to your database. Ensure PostgreSQL is running.'
      });
    }

    // 2. Create Booking and Payment record
    console.log('Creating Booking record in Database...');
    let booking;
    try {
      booking = await prisma.booking.create({
        data: {
          bookingId, userId: user.id,
          packageId, packageName, 
          packagePrice: amount / travelersCount, // Keep original package price for reference
          destination: destination || 'Unknown',
          travelDate: new Date(travelDate), travelersCount,
          fullName, email, phone, address, city, state, country, pincode, specialRequests,
          status: 'pending',
          payment: {
            create: {
              gatewayOrderId: order.id,
              amount: chargedAmount, // Store the actual amount charged
              currency: currency, // Store the actual currency used
              status: 'pending'
            }
          },
          auditLogs: {
            create: { action: 'payment_created', details: `Razorpay order created: ${order.id} (${currency} ${chargedAmount})`, ipAddress: String(ip) }
          }
        }
      });
    } catch (dbError: any) {
      console.error('DATABASE ERROR (Booking Create):', dbError);
      return res.status(500).json({ 
        error: 'Database Error', 
        details: dbError.message,
        hint: 'Check if your PostgreSQL database is running and the DATABASE_URL in .env is correct.'
      });
    }
    console.log('Booking Created Successfully:', booking.bookingId);

    res.json({ 
      orderId: order.id, 
      amount: order.amount, 
      currency: order.currency,
      bookingId: booking.bookingId,
      razorpayKeyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (error: any) {
    console.error('--- RAZORPAY ORDER CREATION ERROR ---');
    console.error('Error Name:', error.name);
    console.error('Error Message:', error.message);
    console.error('Error Stack:', error.stack);
    res.status(500).json({ error: error.message || 'Internal Server Error during order creation' });
  }
});

app.post('/api/payments/verify', async (req, res) => {
  console.log('--- PAYMENT VERIFICATION ATTEMPT ---');
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    console.log('Order ID:', razorpay_order_id);
    console.log('Payment ID:', razorpay_payment_id);
    console.log('Signature:', razorpay_signature);

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(sign.toString())
      .digest("hex");

    console.log('Expected Signature:', expectedSign);
    const isVerified = razorpay_signature === expectedSign;
    console.log('Verification Result:', isVerified ? 'SUCCESS' : 'FAILED');

    if (isVerified) {
      // Fetch actual payment details from Razorpay to get the method (card, upi, etc.)
      console.log('[RAZORPAY] Fetching payment details for:', razorpay_payment_id);
      const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
      console.log('[RAZORPAY] Payment details fetched:', JSON.stringify(paymentDetails, null, 2));
      const paymentMethod = paymentDetails.method || 'unknown'; // e.g., 'card', 'upi', 'netbanking'

      const ticketNumber = `TKT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      
      const paymentRecord = await prisma.payment.findUnique({
        where: { gatewayOrderId: razorpay_order_id }
      });

      if (!paymentRecord) return res.status(404).json({ error: 'Order not found' });

      // Use a transaction to ensure everything is saved or nothing is
      const result = await prisma.$transaction(async (tx) => {
        const updatedBooking = await tx.booking.update({
          where: { id: paymentRecord.bookingId },
          data: { 
            status: 'confirmed',
            payment: {
              update: {
                status: 'successful',
                paymentId: razorpay_payment_id,
                transactionId: razorpay_payment_id,
                paymentDate: new Date(),
                method: paymentMethod, // Store the actual method
              }
            },
            ticket: {
              create: { ticketNumber, status: 'active' }
            },
            auditLogs: {
              create: { action: 'payment_success', details: `Payment verified (${paymentMethod}): ${razorpay_payment_id}` }
            }
          },
          include: { payment: true, ticket: true }
        });

        return updatedBooking;
      });

      // Append to Excel Files Automatically
      try {
        await appendBookingToExcel(result);
        if (result.payment) {
          await appendPaymentToExcel(result.payment, result);
        }
      } catch (excelErr) {
        console.error('Failed to update Excel logs:', excelErr);
      }

      // Send confirmation email
      try {
        await sendBookingEmail({
          email: result.email,
          fullName: result.fullName,
          bookingId: result.bookingId,
          ticketNumber,
          packageName: result.packageName,
          travelDate: result.travelDate,
          paymentAmount: result.payment?.amount,
          currency: result.payment?.currency,
          transactionId: razorpay_payment_id
        });
      } catch (mailError) {
        console.error('CRITICAL: Email sending failed:', mailError);
      }

      res.json({ message: "Payment verified successfully", bookingId: result.bookingId, ticketNumber });
    } else {
      res.status(400).json({ error: "Invalid signature" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- RAZORPAY WEBHOOK ---
app.post('/api/webhooks/razorpay', async (req, res) => {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers['x-razorpay-signature'] as string;

  const shasum = crypto.createHmac('sha256', secret!);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest('hex');

  if (signature === digest) {
    const event = req.body.event;
    const payload = req.body.payload.payment.entity;

    if (event === 'payment.captured') {
      // Handle delayed capture or other scenarios
      console.log('Payment Captured via Webhook:', payload.id);
    } else if (event === 'payment.failed') {
      await prisma.payment.updateMany({
        where: { gatewayOrderId: payload.order_id },
        data: { status: 'failed' }
      });
    }
    res.json({ status: 'ok' });
  } else {
    res.status(400).send('Invalid signature');
  }
});

// --- ADMIN ENDPOINTS ---
app.get('/api/admin/bookings', async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: { payment: true, ticket: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(bookings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/payments', async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      include: { booking: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(payments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/customers', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { _count: { select: { bookings: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/recent-transactions', async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({
      take: 10,
      include: { booking: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(payments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/stats', authenticateToken, async (req, res) => {
  try {
    const totalBookings = await prisma.booking.count();
    const successfulPayments = await prisma.payment.aggregate({
      where: { status: 'successful' },
      _sum: { amount: true },
      _count: true
    });
    const pendingPayments = await prisma.payment.count({ where: { status: 'pending' } });
    const failedPayments = await prisma.payment.count({ where: { status: 'failed' } });

    res.json({
      totalBookings,
      totalRevenue: successfulPayments._sum.amount || 0,
      successfulCount: successfulPayments._count,
      pendingCount: pendingPayments,
      failedCount: failedPayments
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/bookings', authenticateToken, async (req, res) => {
  try {
    const { status, search } = req.query;
    let where: any = {};
    if (status && status !== 'all') where.status = status;
    if (search) {
      where.OR = [
        { bookingId: { contains: search as string, mode: 'insensitive' } },
        { fullName: { contains: search as string, mode: 'insensitive' } },
        { email: { contains: search as string, mode: 'insensitive' } },
      ];
    }
    const bookings = await prisma.booking.findMany({ 
      where, 
      include: { payment: true, ticket: true },
      orderBy: { createdAt: 'desc' } 
    });
    res.json(bookings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/admin/export/bookings', authenticateToken, async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: { payment: true, ticket: true }
    });

    const data = bookings.map(b => ({
      'Booking ID': b.bookingId,
      'Customer Name': b.fullName,
      'Email': b.email,
      'Phone': b.phone,
      'Package': b.packageName,
      'Destination': b.destination,
      'Travel Date': b.travelDate.toLocaleDateString(),
      'Status': b.status,
      'Amount': b.payment?.amount || 0,
      'Payment Status': b.payment?.status || 'N/A',
      'Ticket Number': b.ticket?.ticketNumber || 'N/A'
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Bookings');
    
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=bookings.xlsx');
    res.send(buffer);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// --- SEEDING ---
app.get('/api/seed', async (req, res) => {
  try {
    // Basic seed logic
    res.json({ message: 'Use the seed script for production' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
