'use client';

import { useState, useEffect } from 'react';
import { FileSpreadsheet, FileText, ArrowLeft, RefreshCcw, CreditCard, Calendar, User, Search } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function AdminPayments() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/payments?status=${filter}`);
      let data = await res.json();
      
      // Filter by status (case-insensitive) if not 'all'
      if (filter !== 'all') {
        data = data.filter((p: any) => p.status?.toLowerCase() === filter.toLowerCase());
      }
      
      // Filter by search if needed
      const filtered = search 
        ? data.filter((p: any) => 
            (p.transactionId?.toLowerCase().includes(search.toLowerCase())) || 
            (p.booking?.bookingId?.toLowerCase().includes(search.toLowerCase())) || 
            (p.booking?.fullName?.toLowerCase().includes(search.toLowerCase()))
          )
        : data;
      
      setPayments(filtered);
    } catch (err) {
      console.error('Failed to fetch payments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [filter, search]);

  const exportToExcel = () => {
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
    const data = payments.map(p => ({
      'Transaction ID': p.transactionId || p.paymentId,
      'Booking ID': p.booking?.bookingId || 'N/A',
      'Customer Name': p.booking?.fullName || 'N/A',
      'Payment Method': p.method || 'N/A',
      'Payment Status': p.status,
      'Amount': p.amount,
      'Currency': p.currency || 'INR',
      'Date': p.paymentDate ? new Date(p.paymentDate).toLocaleDateString() : 'N/A'
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'payments.csv';
    a.click();
  };

  const statusColors: Record<string, string> = {
    successful: 'bg-green-100 text-green-700',
    SUCCESSFUL: 'bg-green-100 text-green-700',
    failed: 'bg-red-100 text-red-700',
    FAILED: 'bg-red-100 text-red-700',
    pending: 'bg-yellow-100 text-yellow-700',
    PENDING: 'bg-yellow-100 text-yellow-700',
    refunded: 'bg-purple-100 text-purple-700'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a 
              href="/admin/bookings" 
              className="p-3 hover:bg-white rounded-lg transition-all text-gray-400 hover:text-[#1A2B3C]"
            >
              <ArrowLeft className="w-5 h-5" />
            </a>
            <div>
              <h1 className="text-4xl font-serif text-[#1A2B3C] tracking-tight">Payment Management</h1>
              <p className="text-gray-400 font-bold text-[10px] tracking-[0.2em] uppercase">Monitor all transactions</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={exportToExcel}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 text-[10px] font-black uppercase tracking-widest text-[#1A2B3C] hover:bg-gray-50 transition-all shadow-sm"
            >
              <FileSpreadsheet className="w-4 h-4 text-green-600" /> Excel
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
          <div className="md:col-span-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search payments..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 text-sm font-medium text-[#1A2B3C] placeholder:text-gray-400 focus:outline-none focus:border-[#D4A373] transition-all"
              />
            </div>
          </div>

          <div className="md:col-span-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-100 text-sm font-medium text-[#1A2B3C] focus:outline-none focus:border-[#D4A373] transition-all"
            >
              <option value="all">All Payments</option>
              <option value="successful">Succeeded</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <div className="md:col-span-2 md:col-start-11">
            <button
              onClick={fetchPayments}
              className="w-full py-3 bg-[#1A2B3C] text-white text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2"
            >
              <RefreshCcw className="w-4 h-4" /> Refresh
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Revenue', value: payments.filter(p => p.status?.toLowerCase() === 'successful').reduce((sum: number, p: any) => sum + (p.inrAmount || p.amount), 0), prefix: '₹', color: 'text-[#D4A373]' },
            { label: 'Succeeded', value: payments.filter(p => p.status?.toLowerCase() === 'successful').length, color: 'text-green-600' },
            { label: 'Pending', value: payments.filter(p => p.status?.toLowerCase() === 'pending').length, color: 'text-yellow-600' },
            { label: 'Failed', value: payments.filter(p => p.status?.toLowerCase() === 'failed').length, color: 'text-red-600' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-8 border border-gray-100 shadow-sm">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
              <p className={`text-3xl font-serif-luxury ${stat.color}`}>{stat.prefix || ''}{stat.value.toLocaleString()}</p>
            </div>
          ))}
        </div>

        {/* Payments Table */}
        <div className="bg-white border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-left">Transaction</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-left">Customer</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-left">Method</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-left">Status</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-left">Amount</th>
                  <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-left">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-8 py-20 text-center">
                      <RefreshCcw className="w-8 h-8 text-[#D4A373] animate-spin mx-auto mb-4" />
                      <p className="text-gray-400 font-bold text-[10px] tracking-widest uppercase">Fetching payments...</p>
                    </td>
                  </tr>
                ) : payments.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-8 py-20 text-center">
                      <p className="text-gray-400 font-bold text-[10px] tracking-widest uppercase">No payments found</p>
                    </td>
                  </tr>
                ) : (
                  payments.map((payment) => (
                    <tr key={payment._id} className="hover:bg-gray-50 transition-all group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-50 rounded-lg">
                            <CreditCard className="w-4 h-4 text-gray-400" />
                          </div>
                          <span className="font-black text-[#1A2B3C] text-xs">{payment.transactionId || payment.paymentId}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="space-y-1">
                          <p className="font-black text-[#1A2B3C] text-xs uppercase">{payment.booking?.fullName || 'N/A'}</p>
                          <p className="text-[10px] text-gray-400 font-medium">{payment.booking?.email || 'N/A'}</p>
                          <p className="text-[9px] text-gray-300 font-medium">Booking: {payment.booking?.bookingId || 'N/A'}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="font-medium text-gray-600 text-xs">{payment.method || 'N/A'}</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-full ${statusColors[payment.status]}`}>
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="space-y-1">
                          <p className="font-serif-luxury text-[#1A2B3C] text-sm">{payment.currency || 'INR'} {payment.amount.toLocaleString()}</p>
                          {payment.inrAmount && <p className="text-[10px] text-gray-400 font-medium">₹{payment.inrAmount.toLocaleString('en-IN')}</p>}
                          {payment.usdAmount && <p className="text-[10px] text-gray-400 font-medium">${payment.usdAmount.toLocaleString()}</p>}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-gray-500 text-xs">
                          <Calendar className="w-3 h-3" />
                          {payment.paymentDate ? new Date(payment.paymentDate).toLocaleDateString() : 'N/A'}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
