import React from 'react';
import { ShieldCheck, Monitor, Zap, MessageSquare } from 'lucide-react';
import { Category } from '../types';

interface FooterProps {
  setActiveTab: (tab: 'catalog' | 'orders' | 'checkout' | 'admin' | 'support') => void;
  handlePromoClick: (categoryName: Category) => void;
}

export default function Footer({ setActiveTab, handlePromoClick }: FooterProps) {
  return (
    <footer className="bg-[#1A1F26] text-[#CBD5E1] border-t border-[#2A313C] shrink-0 pt-16 pb-8 font-sans" id="store-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">

          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-3">
              <img src="/PC-Key-Zone-For-Dark.png" alt="PC Key Zone" className="h-12 w-auto object-contain" />
              <div className="text-[26px] font-black tracking-tight text-white leading-none flex items-center">
                PC Key<span className="font-light text-[#3b82f6] ml-1.5">Zone</span>
              </div>
            </div>
            <p className="text-sm text-[#94A3B8] leading-relaxed max-w-sm">
              A premium, fully responsive retail license store offering authenticated genuine keys at massive wholesale discount price structures. Built for security, speed, and reliability.
            </p>

            {/* Trust Badges */}
            <div className="flex items-center space-x-3 pt-2">
              <div className="flex items-center space-x-1.5 bg-[#222831] px-3 py-1.5 rounded-lg border border-white/5 shadow-inner">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">256-Bit SSL</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-[#222831] px-3 py-1.5 rounded-lg border border-white/5 shadow-inner">
                <Monitor className="w-4 h-4 text-blue-400" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">Authorized</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold tracking-widest text-xs uppercase mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('catalog'); }} className="hover:text-blue-400 transition-colors">Home</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('catalog'); }} className="hover:text-blue-400 transition-colors">Browse Catalog</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('orders'); }} className="hover:text-blue-400 transition-colors">Track Order</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('support'); }} className="hover:text-blue-400 transition-colors">Support Center</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold tracking-widest text-xs uppercase mb-6">Categories</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" onClick={(e) => { e.preventDefault(); handlePromoClick('Microsoft Windows Keys'); }} className="hover:text-blue-400 transition-colors">Windows Keys</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handlePromoClick('Microsoft Office Keys'); }} className="hover:text-blue-400 transition-colors">Office Licenses</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handlePromoClick('Antivirus & Security'); }} className="hover:text-blue-400 transition-colors">Antivirus & Security</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handlePromoClick('Developer Tools'); }} className="hover:text-blue-400 transition-colors">Developer Tools</a></li>
            </ul>
          </div>

          {/* Support / Contact */}
          <div className="space-y-6">
            <h4 className="text-white font-bold tracking-widest text-xs uppercase mb-6">Need Help?</h4>

            <div className="bg-[#222831] border border-[#3b82f6]/20 p-5 rounded-xl relative overflow-hidden group hover:border-[#3b82f6]/40 transition-colors" id="footer-whatsapp-column">
              <div className="absolute top-0 right-0 h-16 w-16 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-colors" />

              <ul className="space-y-2.5 mb-5 relative z-10">
                <li className="flex items-center space-x-2.5 text-xs font-semibold text-white/80">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Instant Digital Delivery</span>
                </li>
                <li className="flex items-center space-x-2.5 text-xs font-semibold text-white/80">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Secure Checkout</span>
                </li>
                <li className="flex items-center space-x-2.5 text-xs font-semibold text-white/80">
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                  <span>24/7 Expert Support</span>
                </li>
              </ul>

              <a
                href="https://wa.me/917715933711?text=Hello%20PC%20Key%20Zone%20Support%2C%20I%20need%20help%20with%20a%20key%20purchase."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-black text-[10px] uppercase tracking-widest py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-md relative z-10"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.182 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.637-1.03-5.114-2.905-6.99C16.656 1.882 14.183 1.05 11.54 1.05 6.105 1.05 1.681 5.47 1.677 10.908c-.001 1.745.453 3.449 1.317 4.957l-1.018 3.715 3.804-.998zm11.233-7.24c-.312-.156-1.848-.912-2.129-1.015-.282-.102-.487-.156-.69.156-.204.311-.785.983-.96 1.186-.177.204-.355.228-.668.072-.312-.156-1.32-.486-2.515-1.551-.93-.829-1.558-1.854-1.74-2.165-.183-.312-.02-.481.136-.636.14-.139.312-.365.469-.547.156-.183.208-.312.312-.52.105-.208.053-.391-.026-.547-.079-.156-.69-1.661-.944-2.274-.249-.597-.502-.516-.69-.526-.178-.009-.383-.011-.587-.011-.204 0-.537.076-.818.384-.282.311-1.077 1.051-1.077 2.561 0 1.51 1.099 2.97 1.253 3.177.154.204 2.162 3.299 5.241 4.628.732.315 1.304.503 1.751.644.735.233 1.402.2 1.93.121.588-.087 1.848-.755 2.11-1.468.263-.712.263-1.32.184-1.448-.079-.118-.282-.172-.593-.328z" />
                </svg>
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#2A313C] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#94A3B8]">
            &copy; {new Date().getFullYear()} PC Key Zone Marketplace. All rights reserved. All product titles and trademarks belong to their respective publishers.
          </p>
          <div className="flex space-x-6 text-xs text-[#94A3B8]">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
