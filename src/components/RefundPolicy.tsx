import React from 'react';
import { RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function RefundPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-xl p-8 shadow-xl text-slate-600"
      >
        <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-slate-100">
          <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
            <RefreshCw className="w-8 h-8 text-emerald-500" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Refund Policy</h1>
            <p className="text-slate-500 mt-1">Last updated: September 2026</p>
          </div>
        </div>

        <div className="space-y-8 text-sm leading-relaxed">
          
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-blue-800">Due to the digital nature of the products we sell (license keys), we have a strict policy regarding refunds. Please read carefully before making a purchase.</p>
          </div>

          <section>
            <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2 mb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>1. Eligible Scenarios for Refunds</span>
            </h2>
            <p className="mb-3">We will issue a refund or replacement under the following conditions:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong className="text-slate-900">Defective Key:</strong> The license key provided is invalid, already in use, or cannot be activated (must be reported within 14 days of purchase with unedited screenshots of the error).</li>
              <li><strong className="text-slate-900">Non-Delivery:</strong> You did not receive the product key via email or on your dashboard within 24 hours of successful payment.</li>
              <li><strong className="text-slate-900">Wrong Item Delivered:</strong> You received a key for a completely different product than what was ordered.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2 mb-3">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span>2. Non-Refundable Scenarios</span>
            </h2>
            <p className="mb-3">We cannot process refunds in the following situations:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>You purchased the wrong edition of a product (e.g., Windows 10 Home instead of Pro) and the key has already been delivered/viewed.</li>
              <li>Your computer does not meet the minimum system requirements for the software.</li>
              <li>You changed your mind after the key was revealed or sent to you.</li>
              <li>The software publisher disabled the key due to a violation of their Terms of Service on your part.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. How to Request a Refund</h2>
            <p className="text-slate-600 mb-3">To initiate a refund or replacement request, please visit the Support Center page or contact our team via WhatsApp.</p>
            <p className="text-slate-600">You will need to provide your Order ID, the email address used for the purchase, and screenshots demonstrating any errors encountered during activation.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Processing Time</h2>
            <p className="text-slate-600">Once approved, we will process the refund to your original payment method. Depending on your bank or payment provider, it may take 3-7 business days for the funds to reflect in your account.</p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
