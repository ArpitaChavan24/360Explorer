import nodemailer from 'nodemailer';

const getTransporter = async () => {
  const hasSmtp = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;
  let isUsingTestAccount = false;
  let transporter;

  if (hasSmtp) {
    console.log('📧 Using REAL SMTP configuration');
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  } else {
    console.log('📧 SMTP not configured, using Ethereal test account');
    isUsingTestAccount = true;
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
  }

  return { transporter, isUsingTestAccount };
};

export const sendBookingEmail = async (bookingData: {
  email: string;
  fullName: string;
  bookingId: string;
  ticketNumber: string;
  packageName: string;
  travelDate: string;
  paymentAmount: number;
  currency?: string;
  transactionId: string;
}) => {
  const { 
    email, 
    fullName, 
    bookingId, 
    ticketNumber, 
    packageName, 
    travelDate, 
    paymentAmount, 
    currency = 'INR',
    transactionId 
  } = bookingData;

  console.log('📧 Preparing to send REAL confirmation email to:', email);
  console.log('📧 Booking details:', { bookingId, ticketNumber, packageName });

  try {
    const { transporter, isUsingTestAccount } = await getTransporter();

    const formattedAmount = `${currency} ${paymentAmount.toLocaleString(currency === 'INR' ? 'en-IN' : 'en-US')}`;

    const mailOptions = {
      from: `"360 Explorers" <${process.env.SMTP_USER || 'noreply@360explorers.com'}>`,
      to: email,
      subject: `Expedition Confirmed - ${bookingId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #1A2B3C; text-align: center;">Expedition Confirmed!</h2>
          <p>Dear ${fullName},</p>
          <p>Your journey with 360 Explorers is officially secured. Here are your booking details:</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; border: 1px solid #eee;"><strong>Booking ID</strong></td>
              <td style="padding: 10px; border: 1px solid #eee;">${bookingId}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #eee;"><strong>Ticket Number</strong></td>
              <td style="padding: 10px; border: 1px solid #eee;">${ticketNumber}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; border: 1px solid #eee;"><strong>Package</strong></td>
              <td style="padding: 10px; border: 1px solid #eee;">${packageName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #eee;"><strong>Travel Date</strong></td>
              <td style="padding: 10px; border: 1px solid #eee;">${new Date(travelDate).toLocaleDateString()}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; border: 1px solid #eee;"><strong>Amount Paid</strong></td>
              <td style="padding: 10px; border: 1px solid #eee;">${formattedAmount}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #eee;"><strong>Transaction ID</strong></td>
              <td style="padding: 10px; border: 1px solid #eee;">${transactionId}</td>
            </tr>
          </table>
          
          <p style="margin-top: 30px;">You can download your ticket and receipt from your dashboard.</p>
          <p>If you have any questions, please contact our support at support@360explorers.com.</p>
          
          <div style="margin-top: 40px; text-align: center; font-size: 12px; color: #888;">
            <p>&copy; 2026 360 Explorers. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    console.log('📧 Sending email...');
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Email sent successfully to:', email);
    
    if (isUsingTestAccount) {
      console.log('📧 Preview URL:', nodemailer.getTestMessageUrl(info));
      console.log('📧 Open this URL in your browser to see the email!');
    } else {
      console.log('📧 Email delivered to recipient inbox!');
    }
    
    return { 
      success: true, 
      messageId: info.messageId, 
      previewUrl: isUsingTestAccount ? nodemailer.getTestMessageUrl(info) : null 
    };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return { success: false, error };
  }
};

export const sendContactEmail = async (contactData: {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) => {
  const { fullName, email, phone, subject, message } = contactData;

  try {
    const { transporter, isUsingTestAccount } = await getTransporter();

    const mailOptions = {
      from: `"360 Explorers Contact" <${process.env.SMTP_USER || 'noreply@360explorers.com'}>`,
      to: process.env.SMTP_USER, // Send to the owner
      subject: `New Contact Inquiry: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #1A2B3C; text-align: center;">New Contact Inquiry</h2>
          <p>You have received a new message from your website contact form.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; border: 1px solid #eee;"><strong>Full Name</strong></td>
              <td style="padding: 10px; border: 1px solid #eee;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #eee;"><strong>Email</strong></td>
              <td style="padding: 10px; border: 1px solid #eee;">${email}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; border: 1px solid #eee;"><strong>Phone</strong></td>
              <td style="padding: 10px; border: 1px solid #eee;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #eee;"><strong>Subject</strong></td>
              <td style="padding: 10px; border: 1px solid #eee;">${subject}</td>
            </tr>
            <tr style="background-color: #f9f9f9;">
              <td style="padding: 10px; border: 1px solid #eee;"><strong>Message</strong></td>
              <td style="padding: 10px; border: 1px solid #eee;">${message}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #eee;"><strong>Submitted At</strong></td>
              <td style="padding: 10px; border: 1px solid #eee;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
        </div>
      `,
    };

    console.log('📧 Sending contact email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Contact email sent successfully');
    
    if (isUsingTestAccount) {
      console.log('📧 Preview URL:', nodemailer.getTestMessageUrl(info));
    }

    return { success: true };
  } catch (error) {
    console.error('❌ Error sending contact email:', error);
    return { success: false, error };
  }
};
