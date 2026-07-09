import React from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ShieldCheck, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartDrawerProps) {
  // Helper to calculate bulk business discount pricing
  const getBulkDiscountPrice = (price: number, quantity: number): number => {
    if (quantity >= 10) return price * 0.75; // 25% off for 10+ keys
    if (quantity >= 5) return price * 0.85;  // 15% off for 5+ keys
    return price;
  };

  const standardSubtotal = cartItems.reduce((acc, item) => acc + item.product.salePrice * item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + getBulkDiscountPrice(item.product.salePrice, item.quantity) * item.quantity, 0);
  const bulkSavings = standardSubtotal - subtotal;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-container">
          <div className="absolute inset-0 overflow-hidden">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            />

            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
                className="pointer-events-auto w-screen max-w-md"
              >
                <div className="flex h-full flex-col bg-white shadow-2xl border-l border-[#E2E8F0] text-slate-700">
                  {/* Header */}
                  <div className="flex items-center justify-between px-6 py-5 border-b border-[#E2E8F0]">
                    <div className="flex items-center space-x-2.5">
                      <ShoppingBag className="h-5 w-5 text-[#7C3AED]" />
                      <h2 className="text-base font-extrabold text-slate-900 tracking-tight">Your Shopping Cart</h2>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-all duration-200 cursor-pointer border border-[#E2E8F0]"
                      id="close-cart-btn"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Body List */}
                  <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                    {cartItems.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                        <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 border border-[#E2E8F0] shadow-xs">
                          <ShoppingBag className="h-7 w-7" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-800 uppercase tracking-widest">Your cart is empty</p>
                          <p className="text-xs text-slate-500 mt-2 max-w-[240px] leading-relaxed">
                            Looks like you haven't added any software digital activation keys yet.
                          </p>
                        </div>
                        <button
                          onClick={onClose}
                          className="brand-gradient-btn text-white font-bold text-xs uppercase tracking-widest px-5 py-2.5 rounded-xl transition-all duration-200 cursor-pointer shadow-md"
                        >
                          Start Shopping
                        </button>
                      </div>
                    ) : (
                      cartItems.map((item) => {
                        const product = item.product;
                        return (
                          <div
                            key={product.id}
                            className="flex items-start space-x-4 p-3 border border-[#E2E8F0] rounded-2xl bg-white hover:bg-slate-50 transition-all duration-200 group shadow-xs"
                            id={`cart-item-${product.id}`}
                          >
                            {/* Product Image */}
                            <div className="h-16 w-16 rounded-xl overflow-hidden bg-slate-50 shrink-0 border border-[#E2E8F0]">
                              <img
                                src={product.imageUrl}
                                alt={product.title}
                                referrerPolicy="no-referrer"
                                className="h-full w-full object-cover"
                              />
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-slate-900 line-clamp-1 leading-snug group-hover:text-[#7C3AED] transition-colors duration-200">
                                {product.title}
                              </h4>
                              <p className="text-[9px] font-black text-[#0EA5B7] mb-2 uppercase tracking-widest mt-0.5">
                                {product.category}
                              </p>
                              
                              <div className="flex items-center justify-between">
                                {/* Price */}
                                <div className="space-y-1">
                                  <div className="text-sm font-extrabold text-slate-900">
                                    ₹{Math.round(getBulkDiscountPrice(product.salePrice, item.quantity) * item.quantity)}
                                  </div>
                                  {item.quantity >= 5 && (
                                    <div className="inline-block text-[8px] text-emerald-600 font-extrabold font-mono uppercase bg-emerald-50 px-1 py-0.5 border border-emerald-200 rounded">
                                      {item.quantity >= 10 ? '25% Bulk Off' : '15% Bulk Off'}
                                    </div>
                                  )}
                                </div>

                                {/* Qty Actions */}
                                <div className="flex items-center space-x-1 border border-[#E2E8F0] rounded-lg p-1 bg-slate-50">
                                  <button
                                    onClick={() => onUpdateQuantity(product.id, item.quantity - 1)}
                                    className="p-1 rounded text-slate-400 hover:text-slate-800 hover:bg-slate-200 disabled:opacity-20 disabled:pointer-events-none cursor-pointer"
                                    disabled={item.quantity <= 1}
                                    id={`qty-minus-${product.id}`}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </button>
                                  <span className="text-xs font-black text-slate-800 px-1.5 min-w-[16px] text-center">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => onUpdateQuantity(product.id, item.quantity + 1)}
                                    className="p-1 rounded text-slate-400 hover:text-slate-800 hover:bg-slate-200 cursor-pointer"
                                    id={`qty-plus-${product.id}`}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Remove button */}
                            <button
                              onClick={() => onRemoveItem(product.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all duration-200 shrink-0 cursor-pointer"
                              title="Delete Item"
                              id={`remove-item-${product.id}`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Footer checkout area */}
                  {cartItems.length > 0 && (
                    <div className="border-t border-[#E2E8F0] p-6 space-y-4 bg-slate-50 shrink-0">
                      <div className="space-y-2">
                        {bulkSavings > 0 && (
                          <div className="flex items-center justify-between text-xs font-medium text-slate-400">
                            <span>Standard Catalog Price:</span>
                            <span>₹{Math.round(standardSubtotal)}</span>
                          </div>
                        )}
                        {bulkSavings > 0 && (
                          <div className="flex items-center justify-between text-xs font-bold text-emerald-600 font-mono">
                            <span>Bulk Savings Discount:</span>
                            <span>-₹{Math.round(bulkSavings)}</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between pt-1 border-t border-[#E2E8F0]">
                          <div>
                            <span className="text-[10px] font-bold text-slate-500 block uppercase tracking-widest font-sans">Cart Subtotal</span>
                            <span className="text-[9px] text-[#0EA5B7] font-black uppercase tracking-widest flex items-center mt-1">
                              <ShieldCheck className="h-3.5 w-3.5 mr-1 text-[#7C3AED]" />
                              Secure SSL Transaction
                            </span>
                          </div>
                          <span className="text-2xl font-black text-slate-900 tracking-tight">
                            ₹{Math.round(subtotal)}
                          </span>
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-500 leading-relaxed flex items-start space-x-1.5 font-medium">
                        <Key className="h-3.5 w-3.5 text-[#0EA5B7] shrink-0 mt-0.5" />
                        <span>License keys are generated and bound directly in your purchase profile database immediately. No delivery delay.</span>
                      </div>

                      <button
                        onClick={() => {
                          onClose();
                          onCheckout();
                        }}
                        className="w-full brand-gradient-btn text-white font-black text-xs uppercase tracking-widest py-4 px-4 rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
                        id="drawer-checkout-btn"
                      >
                        <span>Secure Checkout</span>
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
