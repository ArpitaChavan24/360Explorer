import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';

// The exports directory will be in the project root (d:\360-Explorers-main\backend\exports)
const EXCEL_DIR = path.resolve(process.cwd(), 'backend', 'exports');

if (!fs.existsSync(EXCEL_DIR)) {
  fs.mkdirSync(EXCEL_DIR, { recursive: true });
}

const BOOKINGS_FILE = path.join(EXCEL_DIR, 'bookings.xlsx');
const PAYMENTS_FILE = path.join(EXCEL_DIR, 'payments.xlsx');

export const appendBookingToExcel = async (booking: any) => {
  console.log('--- [EXCEL] ATTEMPTING TO LOG BOOKING ---');
  console.log('Booking ID:', booking.bookingId);
  try {
    let workbook = new ExcelJS.Workbook();
    let worksheet;

    if (fs.existsSync(BOOKINGS_FILE)) {
      console.log('[EXCEL] File exists, reading:', BOOKINGS_FILE);
      try {
        await workbook.xlsx.readFile(BOOKINGS_FILE);
        worksheet = workbook.getWorksheet('Bookings');
        
        if (worksheet) {
          console.log('[EXCEL] Found existing worksheet "Bookings", re-mapping columns...');
          // ALWAYS map columns so addRow({key: value}) works
          worksheet.columns = [
            { header: 'Booking ID', key: 'bookingId', width: 20 },
            { header: 'Customer Name', key: 'fullName', width: 25 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Phone', key: 'phone', width: 15 },
            { header: 'Destination', key: 'destination', width: 20 },
            { header: 'Street Address', key: 'address', width: 30 },
            { header: 'City', key: 'city', width: 15 },
            { header: 'State', key: 'state', width: 15 },
            { header: 'Pincode', key: 'pincode', width: 10 },
            { header: 'Country', key: 'country', width: 15 },
            { header: 'Travel Date', key: 'travelDate', width: 15 },
            { header: 'Number of Tickets', key: 'travelersCount', width: 15 },
            { header: 'Total Amount', key: 'amount', width: 15 },
            { header: 'Currency', key: 'currency', width: 10 },
            { header: 'USD Amount', key: 'usdAmount', width: 15 },
            { header: 'INR Amount', key: 'inrAmount', width: 15 },
            { header: 'Booking Status', key: 'status', width: 15 },
            { header: 'Created Date', key: 'createdAt', width: 20 }
          ];
        }
      } catch (readErr) {
        console.error('[EXCEL] Error reading file (is it open in Excel?):', readErr);
        throw readErr;
      }
    } 
    
    if (!worksheet) {
      console.log('[EXCEL] Creating brand new bookings workbook/worksheet...');
      worksheet = workbook.addWorksheet('Bookings');
      worksheet.columns = [
        { header: 'Booking ID', key: 'bookingId', width: 20 },
        { header: 'Customer Name', key: 'fullName', width: 25 },
        { header: 'Email', key: 'email', width: 30 },
        { header: 'Phone', key: 'phone', width: 15 },
        { header: 'Destination', key: 'destination', width: 20 },
        { header: 'Street Address', key: 'address', width: 30 },
        { header: 'City', key: 'city', width: 15 },
        { header: 'State', key: 'state', width: 15 },
        { header: 'Pincode', key: 'pincode', width: 10 },
        { header: 'Country', key: 'country', width: 15 },
        { header: 'Travel Date', key: 'travelDate', width: 15 },
        { header: 'Number of Tickets', key: 'travelersCount', width: 15 },
        { header: 'Total Amount', key: 'amount', width: 15 },
        { header: 'Currency', key: 'currency', width: 10 },
        { header: 'USD Amount', key: 'usdAmount', width: 15 },
        { header: 'INR Amount', key: 'inrAmount', width: 15 },
        { header: 'Booking Status', key: 'status', width: 15 },
        { header: 'Created Date', key: 'createdAt', width: 20 }
      ];
    }

    // Get payment details from the booking (if available)
    const payment = booking.payment || {};
    
    const rowData = {
      bookingId: booking.bookingId,
      fullName: booking.fullName,
      email: booking.email,
      phone: booking.phone,
      destination: booking.destination,
      address: booking.address || 'N/A',
      city: booking.city || 'N/A',
      state: booking.state || 'N/A',
      pincode: booking.pincode || 'N/A',
      country: booking.country || 'N/A',
      travelDate: booking.travelDate ? new Date(booking.travelDate).toLocaleDateString() : 'N/A',
      travelersCount: booking.travelersCount,
      amount: payment.amount || booking.paymentAmount || 0,
      currency: payment.currency || 'INR',
      usdAmount: payment.usdAmount || 0,
      inrAmount: payment.inrAmount || 0,
      status: booking.status,
      createdAt: new Date().toLocaleString()
    };

    console.log('[EXCEL] Adding row:', rowData);
    worksheet.addRow(rowData);

    await workbook.xlsx.writeFile(BOOKINGS_FILE);
    console.log('[EXCEL] SUCCESS: Booking file saved at:', path.resolve(BOOKINGS_FILE));
  } catch (err) {
    console.error('--- [EXCEL] CRITICAL ERROR (Booking) ---');
    console.error('Error Details:', err);
    console.log('HINT: Please make sure the Excel file is CLOSED before performing a booking.');
  }
};

export const appendPaymentToExcel = async (payment: any, booking: any) => {
  console.log('--- [EXCEL] ATTEMPTING TO LOG PAYMENT ---');
  console.log('Transaction ID:', payment.transactionId || payment.paymentId);
  try {
    let workbook = new ExcelJS.Workbook();
    let worksheet;

    if (fs.existsSync(PAYMENTS_FILE)) {
      console.log('[EXCEL] File exists, reading:', PAYMENTS_FILE);
      try {
        await workbook.xlsx.readFile(PAYMENTS_FILE);
        worksheet = workbook.getWorksheet('Payments');
        
        if (worksheet) {
          console.log('[EXCEL] Found existing worksheet "Payments", re-mapping columns...');
          worksheet.columns = [
            { header: 'Transaction ID', key: 'transactionId', width: 25 },
            { header: 'Booking ID', key: 'bookingId', width: 20 },
            { header: 'Customer Name', key: 'fullName', width: 25 },
            { header: 'Payment Method', key: 'method', width: 15 },
            { header: 'Payment Status', key: 'status', width: 15 },
            { header: 'Amount', key: 'amount', width: 15 },
            { header: 'Currency', key: 'currency', width: 10 },
            { header: 'USD Amount', key: 'usdAmount', width: 15 },
            { header: 'INR Amount', key: 'inrAmount', width: 15 },
            { header: 'Date', key: 'date', width: 20 }
          ];
        }
      } catch (readErr) {
        console.error('[EXCEL] Error reading file (is it open in Excel?):', readErr);
        throw readErr;
      }
    } 
    
    if (!worksheet) {
      console.log('[EXCEL] Creating brand new payments worksheet...');
      worksheet = workbook.addWorksheet('Payments');
      worksheet.columns = [
        { header: 'Transaction ID', key: 'transactionId', width: 25 },
        { header: 'Booking ID', key: 'bookingId', width: 20 },
        { header: 'Customer Name', key: 'fullName', width: 25 },
        { header: 'Payment Method', key: 'method', width: 15 },
        { header: 'Payment Status', key: 'status', width: 15 },
        { header: 'Amount', key: 'amount', width: 15 },
        { header: 'Currency', key: 'currency', width: 10 },
        { header: 'USD Amount', key: 'usdAmount', width: 15 },
        { header: 'INR Amount', key: 'inrAmount', width: 15 },
        { header: 'Date', key: 'date', width: 20 }
      ];
    }

    const rowData = {
      transactionId: payment.transactionId || payment.paymentId,
      bookingId: booking.bookingId,
      fullName: booking.fullName,
      method: payment.method || 'N/A',
      status: payment.status,
      amount: payment.amount,
      currency: payment.currency || 'INR',
      usdAmount: payment.usdAmount || 0,
      inrAmount: payment.inrAmount || 0,
      date: new Date().toLocaleString()
    };

    console.log('[EXCEL] Adding row:', rowData);
    worksheet.addRow(rowData);

    await workbook.xlsx.writeFile(PAYMENTS_FILE);
    console.log('[EXCEL] SUCCESS: Payment file saved at:', path.resolve(PAYMENTS_FILE));
  } catch (err) {
    console.error('--- [EXCEL] CRITICAL ERROR (Payment) ---');
    console.error('Error Details:', err);
    console.log('HINT: Please make sure the Excel file is CLOSED before performing a booking.');
  }
};
