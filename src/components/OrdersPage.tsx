import React, { useState } from 'react';
import { FileText, Key, Calendar, Clipboard, Check, Copy, Printer, ShoppingBag, ShieldCheck, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Order } from '../types';

interface OrdersPageProps {
  orders: Order[];
  onBackToCatalog: () => void;
}

export default function OrdersPage({ orders, onBackToCatalog }: OrdersPageProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [printingOrderId, setPrintingOrderId] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const simulateInvoicePrint = (order: Order) => {
    setPrintingOrderId(order.id);
    setTimeout(() => {
      setPrintingOrderId(null);
      // Open window print dialogue
      window.print();
    }, 1500);
  };

  if (orders.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6 text-[#CBD5E1]" id="empty-orders-view">
        <div className="mx-auto h-16 w-16 bg-[#111827] rounded-full flex items-center justify-center text-white/30 border border-white/[0.08]">
          <FileText className="h-8 w-8 text-[#0EA5B7]" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">No Purchased Keys Found</h3>
          <p className="text-xs text-[#94A3B8] mt-2 max-w-[280px] mx-auto leading-relaxed">
            You haven't bought any software licensing keys yet. Go to our catalog to get genuine license keys at extreme discount rates.
          </p>
        </div>
        <button
          onClick={onBackToCatalog}
          className="brand-gradient-btn text-white font-bold text-[10px] uppercase tracking-widest px-6 py-3.5 rounded-xl transition-all duration-200 cursor-pointer shadow-lg"
        >
          Explore Genuine Keys
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8 text-[#CBD5E1]" id="orders-page-layout">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-light text-white tracking-tight">Your Digital Vault</h2>
          <p className="text-xs text-[#94A3B8] mt-0.5">Secure history of purchased software license keys and guides.</p>
        </div>
        
        <div className="bg-[#0EA5B7]/10 text-[#0EA5B7] text-[10px] font-bold px-3 py-1.5 rounded-xl border border-[#0EA5B7]/25 flex items-center space-x-1.5 self-start uppercase tracking-widest">
          <ShieldCheck className="h-4 w-4 text-[#0EA5B7]" />
          <span>Verified Purchase History</span>
        </div>
      </div>

      <div className="space-y-6" id="orders-list">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-[#1E293B] rounded-3xl border border-white/[0.08] shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200 print:shadow-none print:border-none"
            id={`order-container-${order.id}`}
          >
            {/* Header row */}
            <div className="bg-[#111827] border-b border-white/[0.08] px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:bg-white">
              <div className="space-y-1">
                <span className="text-[9px] text-white/30 font-bold uppercase tracking-widest">Order Reference</span>
                <p className="text-xs sm:text-sm font-mono font-medium text-white">
                  ID: <span className="text-[#0EA5B7] font-semibold">{order.id}</span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center text-white/40 text-xs">
                  <Calendar className="h-4 w-4 mr-1.5 shrink-0" />
                  <span className="font-light">{new Date(order.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                </div>

                <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/20 text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
                  {order.status}
                </span>

                <button
                  onClick={() => simulateInvoicePrint(order)}
                  disabled={printingOrderId === order.id}
                  className="bg-[#111827] border border-white/[0.08] hover:bg-white/[0.03] text-white/60 hover:text-white text-[10px] uppercase tracking-widest font-bold py-1.5 px-3 rounded-lg flex items-center space-x-1.5 transition-colors duration-150 cursor-pointer disabled:opacity-50 print:hidden"
                  title="Print Invoice"
                >
                  {printingOrderId === order.id ? (
                    <div className="h-3.5 w-3.5 border-2 border-[#0EA5B7] border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Printer className="h-3.5 w-3.5" />
                  )}
                  <span>Invoice</span>
                </button>
              </div>
            </div>

            {/* Content row (Items + Keys) */}
            <div className="p-6 space-y-6">
              <div className="divide-y divide-white/[0.08]">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-4 first:pt-0 last:pb-0 space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <div>
                        <h4 className="text-sm font-medium text-white leading-snug">{item.title}</h4>
                        <p className="text-[9px] text-[#0EA5B7] font-bold uppercase tracking-widest mt-1">Quantity: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-semibold text-white sm:text-right">
                        ₹{Math.round(item.price * item.quantity)}
                      </span>
                    </div>

                    {/* License key display container */}
                    <div className="space-y-2.5 bg-[#111827]/40 rounded-2xl p-4.5 border border-white/[0.08]">
                      <div className="flex items-center space-x-1.5 mb-2">
                        <Key className="h-4 w-4 text-[#0EA5B7]" />
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest">Your License Keys</span>
                      </div>
                      
                      <div className="space-y-2">
                        {item.licenseKeys.map((key, kIdx) => (
                          <div
                            key={kIdx}
                            className="flex items-center justify-between bg-[#0B1120] border border-white/[0.08] rounded-xl px-4 py-2.5 font-mono text-xs sm:text-sm font-semibold text-white shadow-sm"
                          >
                            <span className="tracking-wide select-all truncate text-white/90">{key}</span>
                            <button
                              onClick={() => copyToClipboard(key)}
                              className="p-1.5 rounded-lg hover:bg-white/[0.03] text-[#0EA5B7] transition-all duration-200 cursor-pointer print:hidden shrink-0 ml-2"
                              title="Copy Key"
                            >
                              {copiedKey === key ? (
                                <Check className="h-4 w-4 text-emerald-400" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Instructions */}
                      <div className="mt-3 text-xs text-[#94A3B8] leading-relaxed pl-1 border-t border-white/[0.08] pt-3">
                        <p className="font-semibold text-white mb-1">Activation instructions:</p>
                        {item.title.toLowerCase().includes('windows') && (
                          <p>Go to Settings &gt; System &gt; Activation &gt; Click Change product key &gt; Input the original 25-character activation retail license code.</p>
                        )}
                        {item.title.toLowerCase().includes('office') && (
                          <p>Visit official portal setup.office.com &gt; Sign in with your original Microsoft Account &gt; Enter the license key &gt; Bind & download setup installer.</p>
                        )}
                        {item.title.toLowerCase().includes('kaspersky') && (
                          <p>Download original Kaspersky Total Security app &gt; Open Licensing &gt; Enter key to register your 365-day subscription protection.</p>
                        )}
                        {!item.title.toLowerCase().includes('windows') && !item.title.toLowerCase().includes('office') && !item.title.toLowerCase().includes('kaspersky') && (
                          <p>Follow standard activation documentation provided in official product guides. Copy your product key to activate.</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Row */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between bg-[#111827] -mx-6 -mb-6 p-6 print:bg-white">
                <div>
                  <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest leading-none">Method of Payment</p>
                  <p className="text-xs font-semibold text-white mt-1.5 uppercase">
                    {order.paymentMethod === 'card' ? 'Credit/Debit Card' : order.paymentMethod === 'upi' ? 'UPI ID' : 'Scan to Pay'}
                  </p>
                </div>
                
                <div className="text-right">
                  <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest leading-none">Total Amount</p>
                  <p className="text-xl font-light text-white mt-1 font-sans font-bold">₹{Math.round(order.totalAmount)}</p>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
