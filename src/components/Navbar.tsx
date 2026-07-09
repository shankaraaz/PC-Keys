import React, { useState } from 'react';
import { Key, ShoppingCart, User, LogOut, FileText, Search, ShieldCheck, Settings, HelpCircle, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { User as FirebaseUser } from 'firebase/auth';
import { Product } from '../types';
import { getAutocompleteSuggestions } from '../lib/search';

interface NavbarProps {
  user: FirebaseUser | null;
  demoUser: { name: string; email: string } | null;
  cartCount: number;
  onCartClick: () => void;
  onLoginClick: () => void;
  onLogoutClick: () => void;
  onTabChange: (tab: 'catalog' | 'orders' | 'admin' | 'checkout' | 'support') => void;
  activeTab: 'catalog' | 'orders' | 'admin' | 'checkout' | 'support';
  searchQuery: string;
  onSearchChange: (query: string) => void;
  products: Product[];
}

export default function Navbar({
  user,
  demoUser,
  cartCount,
  onCartClick,
  onLoginClick,
  onLogoutClick,
  onTabChange,
  activeTab,
  searchQuery,
  onSearchChange,
  products,
}: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const displayName = user?.displayName || demoUser?.name || '';
  const displayEmail = user?.email || demoUser?.email || '';
  const loggedIn = !!user || !!demoUser;

  return (
    <div className="sticky top-0 z-40 w-full font-sans" id="store-navbar-wrapper">
      {/* Prominent 24x7 WhatsApp Support Banner with brand gradient */}
      <div className="bg-gradient-to-r from-[#0EA5B7] to-[#7C3AED] py-2 sm:py-2.5 px-4 text-center text-[10px] sm:text-xs font-semibold text-white tracking-wide flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-4 shadow-sm relative z-50">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="font-extrabold text-white uppercase tracking-wider text-[10px] sm:text-xs bg-white/20 border border-white/25 px-1.5 py-0.5 rounded">24×7 WhatsApp Support</span>
          <span className="text-white/95 font-semibold">Need Help? Chat with us 24×7 on WhatsApp</span>
        </div>
        <div className="hidden lg:flex items-center space-x-2 text-white/40 text-[10px] uppercase font-bold tracking-widest">
          <span>•</span>
          <span className="text-white font-extrabold">Instant Activation Support</span>
          <span>•</span>
          <span className="text-white font-extrabold">Pre-sales & Post-sales Assistance</span>
        </div>
        <a 
          href="https://wa.me/919999999999?text=Hello%20Netlyrakeys%20Support%2C%20I%20need%20help%20with%20a%20key%20purchase." 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-white hover:bg-slate-50 text-[#7C3AED] px-3.5 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider transition-all duration-200 flex items-center space-x-1.5 shadow-sm hover:scale-105 active:scale-95"
          id="navbar-whatsapp-banner-link"
        >
          {/* WhatsApp Icon */}
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.182 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.637-1.03-5.114-2.905-6.99C16.656 1.882 14.183 1.05 11.54 1.05 6.105 1.05 1.681 5.47 1.677 10.908c-.001 1.745.453 3.449 1.317 4.957l-1.018 3.715 3.804-.998zm11.233-7.24c-.312-.156-1.848-.912-2.129-1.015-.282-.102-.487-.156-.69.156-.204.311-.785.983-.96 1.186-.177.204-.355.228-.668.072-.312-.156-1.32-.486-2.515-1.551-.93-.829-1.558-1.854-1.74-2.165-.183-.312-.02-.481.136-.636.14-.139.312-.365.469-.547.156-.183.208-.312.312-.52.105-.208.053-.391-.026-.547-.079-.156-.69-1.661-.944-2.274-.249-.597-.502-.516-.69-.526-.178-.009-.383-.011-.587-.011-.204 0-.537.076-.818.384-.282.311-1.077 1.051-1.077 2.561 0 1.51 1.099 2.97 1.253 3.177.154.204 2.162 3.299 5.241 4.628.732.315 1.304.503 1.751.644.735.233 1.402.2 1.93.121.588-.087 1.848-.755 2.11-1.468.263-.712.263-1.32.184-1.448-.079-.118-.282-.172-.593-.328z" />
          </svg>
          <span>Chat on WhatsApp</span>
        </a>
      </div>

      <nav className="bg-white border-b border-[#E2E8F0] shadow-xs" id="store-navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer shrink-0" 
            onClick={() => { onTabChange('catalog'); onSearchChange(''); }}
            id="nav-logo"
          >
            <div className="bg-slate-50 border border-[#E2E8F0] p-2.5 rounded-xl flex items-center justify-center shadow-xs">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 6v6h6M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" stroke="url(#logo-grad)" />
                <path d="M9 12H3m6-3H6" stroke="url(#logo-grad)" />
                <defs>
                  <linearGradient id="logo-grad" x1="3" y1="6" x2="21" y2="12" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0EA5B7" />
                    <stop offset="1" stopColor="#7C3AED" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div>
              <div className="text-2xl font-black tracking-tighter text-slate-900 leading-none">
                NETLYRA<span className="serif-italic text-[#7C3AED] lowercase">keys</span>
              </div>
              <div className="flex items-center space-x-1 text-[9px] text-slate-500 font-bold tracking-widest uppercase mt-1">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-500 fill-blue-500/10" />
                <span>100% Genuine Keys</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          {activeTab === 'catalog' && (
            <div className="hidden md:flex flex-1 max-w-lg mx-8 relative" id="nav-search-container">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search keys..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                  className="w-full pl-4.5 pr-11 py-2.5 bg-slate-50 border border-[#E2E8F0] focus:border-[#7C3AED] rounded-full text-xs font-semibold text-slate-800 placeholder-slate-400 transition-all duration-200 outline-none shadow-xs"
                  id="nav-search-input"
                  autoComplete="off"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                  <Search className="h-4.5 w-4.5" />
                </div>
                
                <AnimatePresence>
                  {searchFocused && searchQuery.trim().length >= 2 && (
                    (() => {
                      const suggestions = getAutocompleteSuggestions(searchQuery, products);
                      return suggestions.length > 0 ? (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 right-0 mt-2 bg-[#1E293B] border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden z-50 divide-y divide-white/5"
                          id="autocomplete-dropdown"
                        >
                          {suggestions.map((suggestion, idx) => (
                            <button
                              key={idx}
                              onMouseDown={(e) => {
                                e.preventDefault(); // prevents blur from stealing focus before action
                                onSearchChange(suggestion);
                                setSearchFocused(false);
                              }}
                              className="w-full text-left px-4.5 py-3.5 hover:bg-[#263447] text-xs text-white/80 hover:text-white flex items-center justify-between transition-colors font-semibold uppercase tracking-wider cursor-pointer"
                            >
                              <div className="flex items-center space-x-2.5">
                                <Search className="h-3.5 w-3.5 text-[#0EA5B7] shrink-0" />
                                <span>{suggestion}</span>
                              </div>
                              <ArrowUpRight className="h-3.5 w-3.5 text-white/30" />
                            </button>
                          ))}
                        </motion.div>
                      ) : null;
                    })()
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}

          {/* Right section items */}
          <div className="flex items-center space-x-3 sm:space-x-4 shrink-0" id="nav-actions">
            
            {/* Catalog Button */}
            <button
              onClick={() => onTabChange('catalog')}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer shadow-xs ${
                activeTab === 'catalog'
                  ? 'bg-[#7C3AED] text-white hover:bg-[#6D28D9]'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              id="nav-catalog-btn"
            >
              Browse Keys
            </button>

            {/* Support/Activation Center Button */}
            <button
              onClick={() => onTabChange('support')}
              className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'support'
                  ? 'text-[#7C3AED] bg-slate-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
              id="nav-support-btn"
            >
              <HelpCircle className="h-4 w-4 text-blue-500" />
              <span>Support Center</span>
            </button>

            {/* Admin Portal Button */}
            <button
              onClick={() => onTabChange('admin')}
              className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer flex items-center space-x-1.5 ${
                activeTab === 'admin'
                  ? 'text-[#7C3AED] bg-slate-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
              id="nav-admin-btn"
            >
              <Settings className="h-4 w-4 text-blue-500" />
              <span>Admin Side</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onCartClick}
              className="relative p-2.5 rounded-xl text-slate-800 hover:bg-slate-100 hover:text-[#7C3AED] transition-all duration-200 flex items-center justify-center cursor-pointer border border-[#E2E8F0]"
              aria-label="Cart"
              id="nav-cart-btn"
            >
              <ShoppingCart className="h-5.5 w-5.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-blue-500 text-white font-bold text-[10px] h-5 w-5 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account / Profile Menu */}
            {loggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 pr-3 rounded-xl border border-white/10 hover:bg-white/5 transition-all duration-200"
                  id="user-profile-menu-btn"
                >
                  <div className="h-8 w-8 rounded-lg bg-white/10 border border-white/10 text-[#0EA5B7] flex items-center justify-center font-bold text-xs uppercase tracking-wider">
                    {displayName ? displayName.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                  </div>
                  <span className="hidden sm:inline text-xs font-bold uppercase tracking-widest text-white/80 max-w-[100px] truncate">
                    {displayName.split(' ')[0]}
                  </span>
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <>
                      {/* Backdrop to close dropdown */}
                      <div className="fixed inset-0 z-30" onClick={() => setDropdownOpen(false)} />
                      
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#1E293B] border border-white/[0.08] shadow-2xl py-2 z-40 text-white"
                        id="user-dropdown-panel"
                      >
                        <div className="px-4 py-3 border-b border-white/[0.08] mb-1">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">Signed in as</p>
                          <p className="text-sm font-semibold text-white truncate mt-0.5">{displayName}</p>
                          <p className="text-xs text-[#94A3B8] truncate">{displayEmail}</p>
                        </div>

                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            onTabChange('orders');
                          }}
                          className={`w-full text-left px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest flex items-center space-x-2.5 transition-all duration-150 ${
                            activeTab === 'orders' ? 'bg-[#263447] text-[#0EA5B7]' : 'text-white/60 hover:text-white hover:bg-white/5'
                          }`}
                          id="dropdown-orders-btn"
                        >
                          <FileText className="h-4 w-4 text-[#0EA5B7]" />
                          <span>My Purchased Keys</span>
                        </button>

                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            onTabChange('admin');
                          }}
                          className={`w-full text-left px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest flex items-center space-x-2.5 transition-all duration-150 ${
                            activeTab === 'admin' ? 'bg-[#263447] text-[#0EA5B7]' : 'text-[#CBD5E1] hover:text-white hover:bg-white/5'
                          }`}
                          id="dropdown-admin-portal-btn"
                        >
                          <Settings className="h-4 w-4 text-[#0EA5B7]" />
                          <span>Admin Portal</span>
                        </button>

                        <button
                          onClick={() => {
                            setDropdownOpen(false);
                            onLogoutClick();
                          }}
                          className="w-full text-left px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-rose-400 hover:bg-rose-500/10 flex items-center space-x-2.5 transition-all duration-150"
                          id="dropdown-logout-btn"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-white hover:bg-slate-50 text-slate-800 border border-[#E2E8F0] px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-200 flex items-center space-x-1.5 cursor-pointer shadow-xs"
                id="login-register-btn"
              >
                <User className="h-4 w-4 text-slate-600" />
                <span>Login</span>
              </button>
            )}

          </div>
        </div>
      </div>
    </nav>
  </div>
  );
}
