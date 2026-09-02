import React from 'react';
import { FileText, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200 rounded-xl p-8 shadow-xl text-slate-600"
      >
        <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-slate-100">
          <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
            <FileText className="w-8 h-8 text-purple-500" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Terms of Service</h1>
            <p className="text-slate-500 mt-1">Last updated: September 2026</p>
          </div>
        </div>

        <div className="space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2 mb-3">
              <CheckCircle className="w-5 h-5 text-purple-500" />
              <span>1. Acceptance of Terms</span>
            </h2>
            <p className="text-slate-600">By accessing and using PC Key Zone, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use our service.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Digital Product Delivery</h2>
            <p className="mb-3">All products sold on PC Key Zone are digital licenses and activation keys. No physical goods will be shipped.</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>Keys are typically delivered instantly upon payment confirmation.</li>
              <li>You are responsible for providing a correct and accessible email address for delivery.</li>
              <li>Once a key has been revealed or sent, it is considered "opened" and cannot be returned to our inventory.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <span>3. Use of Licenses</span>
            </h2>
            <p className="text-slate-600">The licenses we sell are intended for personal or business use in accordance with the respective software publisher's terms (e.g., Microsoft, Adobe). We act solely as an independent reseller of unused, authentic license keys. You are responsible for complying with the software manufacturer's End User License Agreement (EULA).</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. User Accounts</h2>
            <p className="text-slate-600">To access certain features of the site, including order history, you may be required to register an account. You agree to provide accurate information and maintain the security of your account credentials. You are responsible for all activities that occur under your account.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Limitation of Liability</h2>
            <p className="text-slate-600">PC Key Zone shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.</p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
