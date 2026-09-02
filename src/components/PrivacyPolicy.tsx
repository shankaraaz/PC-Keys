import React from 'react';
import { Shield, Lock, Eye } from 'lucide-react';
import { motion } from 'motion/react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-xl p-8 shadow-xl text-slate-600"
      >
        <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-slate-100">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <Shield className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Privacy Policy</h1>
            <p className="text-slate-500 mt-1">Last updated: September 2026</p>
          </div>
        </div>

        <div className="space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2 mb-3">
              <Eye className="w-5 h-5 text-blue-500" />
              <span>1. Information We Collect</span>
            </h2>
            <p className="mb-3">At PC Key Zone, we collect information that you provide directly to us when you make a purchase, create an account, or contact our support team. This includes:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Name and email address</li>
              <li>Billing information and payment details (processed securely by our payment providers)</li>
              <li>Order history and license keys associated with your account</li>
              <li>Communication records with our support staff</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2 mb-3">
              <Lock className="w-5 h-5 text-emerald-500" />
              <span>2. How We Use Your Information</span>
            </h2>
            <p className="mb-3">We use the information we collect for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>To process your transactions and deliver your digital product keys</li>
              <li>To provide customer support and respond to your inquiries</li>
              <li>To send you transactional emails, including order confirmations and receipts</li>
              <li>To protect against fraudulent transactions and unauthorized access</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Data Security</h2>
            <p className="text-slate-600">We implement a variety of security measures to maintain the safety of your personal information. All sensitive payment information is transmitted via Secure Socket Layer (SSL) technology and encrypted into our payment gateway providers' database. We do not store your full credit card information on our servers.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Information Sharing</h2>
            <p className="text-slate-600">We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>
          </section>
          
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Contact Us</h2>
            <p className="text-slate-600">If there are any questions regarding this privacy policy, you may contact our support team via the Support Center or WhatsApp.</p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
