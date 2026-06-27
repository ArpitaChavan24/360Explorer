'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Download, Printer, FileText, 
  MoreVertical, CheckCircle, Clock, XCircle, 
  RefreshCcw, Eye, ChevronRight, Package,
  FileSpreadsheet, FileJson
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const AdminBookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch stats');
    }
  };

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/bookings?status=${filter}&search=${search}`);
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  const fetchPayments = async () => {
    try {
      const res = await fetch(`/api/admin/payments?status=${filter}`);
      const data = await res.json();
      setPayments(data);
    } catch (err) {
      console.error('Failed to fetch payments');
    }
  };

  useEffect(() => {
    fetchStats();
    fetchBookings();
    fetchPayments();
  }, [filter, search]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        fetchBookings();
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const exportToExcel = async () => {
    // Create a simple export using the existing bookings data
    try {
      const data = bookings.map(b => ({
        'Booking ID': b.bookingId,
        'Customer Name': b.fullName,
        'Email': b.email,
        'Phone': b.phone,
        'Package': b.packageName,
        'Destination': b.destination,
        'Travel Date': new Date(b.travelDate).toLocaleDateString(),
        'Status': b.status,
        'Amount': b.payment?.amount || b.paymentAmount || 0,
        'Payment Status': b.payment?.status || 'N/A',
        'Ticket Number': b.ticket?.ticketNumber || 'N/A'
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Bookings');
      XLSX.writeFile(workbook, 'bookings.xlsx');
    } catch (err) {
      console.error('Export failed');
    }
  };

  const exportPaymentsToExcel = async () => {
    try {
      const data = payments.map(p => ({
        'Transaction ID': p.transactionId || p.paymentId,
        'Booking ID': p.booking?.bookingId || 'N/A',
        'Customer Name': p.booking?.fullName || 'N/A',
        'Payment Method': p.method || 'N/A',
        'Payment Status': p.status,
        'Amount': p.amount,
        'Currency': p.currency || 'INR',
        'USD Amount': p.usdAmount || 0,
        'INR Amount': p.inrAmount || 0,
        'Date': p.paymentDate ? new Date(p.paymentDate).toLocaleDateString() : 'N/A'
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Payments');
      XLSX.writeFile(workbook, 'payments.xlsx');
    } catch (err) {
      console.error('Payment export failed');
    }
  };

  const exportToCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(bookings);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `Bookings_Export_${new Date().toLocaleDateString()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generatePDF = (booking: any) => {
    const doc = new jsPDF() as any;
    doc.setFontSize(20);
    doc.text("INVOICE - 360 Explorer", 20, 20);
    doc.setFontSize(10);
    doc.text(`Invoice Number: ${booking.invoiceNumber || 'N/A'}`, 20, 30);
    doc.text(`Booking ID: ${booking.bookingId}`, 20, 35);
    doc.text(`Date: ${new Date(booking.createdAt).toLocaleDateString()}`, 20, 40);

    doc.autoTable({
      startY: 50,
      head: [['Item', 'Details']],
      body: [
        ['Customer Name', booking.fullName],
        ['Email', booking.email],
        ['Phone', booking.phone],
        ['Package', booking.packageName],
        ['Travel Date', new Date(booking.travelDate).toLocaleDateString()],
        ['Explorers', booking.travelersCount],
        ['Total Amount', `INR ${booking.paymentAmount}`],
        ['Status', booking.status.toUpperCase()],
      ],
    });

    doc.save(`Invoice_${booking.bookingId}.pdf`);
  };

  const statusColors: any = {
    pending: 'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-blue-700',
    confirmed: 'bg-green-100 text-green-700',
    completed: 'bg-gray-100 text-gray-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard label="Total Revenue" value={`₹${stats?.totalRevenue.toLocaleString('en-IN') || 0}`} icon={<Package className="text-green-500" />} />
          <StatCard label="Total Bookings" value={stats?.totalBookings || 0} icon={<CheckCircle className="text-blue-500" />} />
          <StatCard label="Pending" value={stats?.pendingCount || 0} icon={<Clock className="text-yellow-500" />} />
          <StatCard label="Failed" value={stats?.failedCount || 0} icon={<XCircle className="text-red-500" />} />
        </div>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-serif-luxury text-[#1A2B3C] tracking-tight">Booking Management</h1>
              <a 
                href="/admin/payments" 
                className="px-4 py-2 bg-gray-100 text-[10px] font-black uppercase tracking-widest text-[#1A2B3C] hover:bg-gray-200 transition-all"
              >
                Go to Payments →
              </a>
            </div>
            <p className="text-gray-400 font-bold text-[10px] tracking-[0.2em] uppercase">Monitor and manage all expeditions</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={exportToExcel}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 text-[10px] font-black uppercase tracking-widest text-[#1A2B3C] hover:bg-gray-50 transition-all shadow-sm"
            >
              <FileSpreadsheet className="w-4 h-4 text-green-600" /> Bookings Excel
            </button>
            <button 
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 text-[10px] font-black uppercase tracking-widest text-[#1A2B3C] hover:bg-gray-50 transition-all shadow-sm"
            >
              <FileText className="w-4 h-4 text-blue-600" /> CSV
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by ID, Name or Email..."
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-100 text-sm font-medium outline-none focus:border-[#D4A373] transition-all shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="md:col-span-8 flex flex-wrap items-center gap-2">
            {['all', 'pending', 'processing', 'confirmed', 'completed', 'cancelled'].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-6 py-4 text-[9px] font-black uppercase tracking-widest transition-all border ${
                  filter === s ? 'bg-[#1A2B3C] border-[#1A2B3C] text-white' : 'bg-white border-gray-100 text-gray-400 hover:border-[#D4A373]'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-100 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Booking ID</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Expedition</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <RefreshCcw className="w-8 h-8 text-[#D4A373] animate-spin mx-auto mb-4" />
                    <p className="text-gray-400 font-bold text-[10px] tracking-widest uppercase">Fetching data...</p>
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                    <p className="text-gray-400 font-bold text-[10px] tracking-widest uppercase">No bookings found</p>
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50 transition-all group">
                    <td className="px-8 py-6">
                      <span className="font-black text-[#1A2B3C] text-xs">{booking.bookingId}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <p className="font-black text-[#1A2B3C] text-xs uppercase">{booking.fullName}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{booking.email}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="space-y-1">
                        <p className="font-black text-[#1A2B3C] text-xs uppercase">{booking.packageName}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{new Date(booking.travelDate).toLocaleDateString()}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-full ${statusColors[booking.status]}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="font-serif-luxury text-[#1A2B3C]">₹{booking.paymentAmount?.toLocaleString('en-IN')}</span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => setSelectedBooking(booking)}
                          className="p-2 hover:bg-white rounded-lg transition-all text-gray-400 hover:text-[#1A2B3C]"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => generatePDF(booking)}
                          className="p-2 hover:bg-white rounded-lg transition-all text-gray-400 hover:text-[#D4A373]"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                        <div className="relative group/actions">
                          <button className="p-2 hover:bg-white rounded-lg transition-all text-gray-400 hover:text-[#1A2B3C]">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 shadow-xl hidden group-hover/actions:block z-20">
                            {['processing', 'confirmed', 'completed', 'cancelled'].map((st) => (
                              <button
                                key={st}
                                onClick={() => updateStatus(booking._id, st)}
                                className="w-full px-4 py-3 text-left text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-[#1A2B3C] hover:bg-gray-50 transition-all"
                              >
                                Mark as {st}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Details Modal */}
      <AnimatePresence>
        {selectedBooking && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100"
            >
              <div className="p-10 space-y-12">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-serif-luxury text-[#1A2B3C] tracking-tight">Expedition Dossier</h2>
                  <button onClick={() => setSelectedBooking(null)} className="text-gray-400 hover:text-[#1A2B3C]">
                    <XCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="space-y-6">
                    <p className="text-[10px] font-black text-[#D4A373] uppercase tracking-[0.2em] border-b border-gray-100 pb-2">Explorer Information</p>
                    <div className="space-y-4">
                      <DetailRow label="Full Name" value={selectedBooking.fullName} />
                      <DetailRow label="Email" value={selectedBooking.email} />
                      <DetailRow label="Phone" value={selectedBooking.phone} />
                      <DetailRow label="Address" value={`${selectedBooking.address}, ${selectedBooking.city}, ${selectedBooking.state}, ${selectedBooking.pincode}`} />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <p className="text-[10px] font-black text-[#D4A373] uppercase tracking-[0.2em] border-b border-gray-100 pb-2">Booking Logistics</p>
                    <div className="space-y-4">
                      <DetailRow label="Package" value={selectedBooking.packageName} />
                      <DetailRow label="Explorers" value={selectedBooking.travelersCount} />
                      <DetailRow label="Travel Date" value={new Date(selectedBooking.travelDate).toLocaleDateString()} />
                      <DetailRow label="Special Requests" value={selectedBooking.specialRequests || 'None'} />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <p className="text-[10px] font-black text-[#D4A373] uppercase tracking-[0.2em] border-b border-gray-100 pb-2">Financial Status</p>
                    <div className="space-y-4">
                      <DetailRow label="Payment ID" value={selectedBooking.paymentId || 'Pending'} />
                      <DetailRow label="Gateway" value={selectedBooking.paymentGateway} />
                      <DetailRow label="Charged Amount" value={`${selectedBooking.payment?.currency || 'INR'} ${selectedBooking.paymentAmount?.toLocaleString()}`} />
                      {selectedBooking.payment?.usdAmount && <DetailRow label="USD Equivalent" value={`$${selectedBooking.payment.usdAmount.toLocaleString()}`} />}
                      {selectedBooking.payment?.inrAmount && <DetailRow label="INR Equivalent" value={`₹${selectedBooking.payment.inrAmount.toLocaleString('en-IN')}`} />}
                      <DetailRow label="Payment Date" value={selectedBooking.paymentDate ? new Date(selectedBooking.paymentDate).toLocaleDateString() : 'N/A'} />
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-100 flex justify-between items-center">
                   <div className="flex items-center gap-4">
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Current Status:</span>
                      <span className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest rounded-full ${statusColors[selectedBooking.status]}`}>
                        {selectedBooking.status}
                      </span>
                   </div>
                   <button 
                    onClick={() => generatePDF(selectedBooking)}
                    className="bg-[#1A2B3C] text-white px-8 py-4 text-[9px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl flex items-center gap-3"
                   >
                     <Download className="w-4 h-4" /> Download Dossier
                   </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DetailRow = ({ label, value }: { label: string, value: any }) => (
  <div className="space-y-1">
    <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest">{label}</p>
    <p className="text-xs font-black text-[#1A2B3C] uppercase">{value}</p>
  </div>
);

const StatCard = ({ label, value, icon }: { label: string, value: any, icon: any }) => (
  <div className="bg-white border border-gray-100 p-8 space-y-4 shadow-sm">
    <div className="flex items-center justify-between">
      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
      {icon}
    </div>
    <p className="text-2xl font-serif-luxury text-[#1A2B3C]">{value}</p>
  </div>
);

export default AdminBookings;
