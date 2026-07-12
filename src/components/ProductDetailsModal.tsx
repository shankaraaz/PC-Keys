import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, HelpCircle, Star, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { getProductResolvedImages, resolveProductTrustDetails } from '../lib/images';
import SoftwareBox from './SoftwareBox';

interface ProductDetailsModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductDetailsModal({ product, onClose, onAddToCart }: ProductDetailsModalProps) {
  const [isHoveredModal, setIsHoveredModal] = useState(false);
  const discountPercent = Math.round(((product.price - product.salePrice) / product.price) * 100);

  // Determine elegant ambient glow colors for each brand category
  const titleLower = product.title.toLowerCase();
  let glowColorClass = "from-[#3b82f6]/10 to-transparent";
  if (titleLower.includes("office") || titleLower.includes("365") || titleLower.includes("m365")) {
    glowColorClass = "from-orange-500/10 to-transparent";
  } else if (titleLower.includes("server")) {
    glowColorClass = "from-blue-600/10 to-transparent";
  } else if (titleLower.includes("project")) {
    glowColorClass = "from-emerald-500/10 to-transparent";
  } else if (titleLower.includes("visio")) {
    glowColorClass = "from-sky-500/10 to-transparent";
  } else if (titleLower.includes("steam")) {
    glowColorClass = "from-[#3b82f6]/15 to-transparent";
  } else if (titleLower.includes("xbox")) {
    glowColorClass = "from-green-500/15 to-transparent";
  } else if (titleLower.includes("playstation")) {
    glowColorClass = "from-blue-500/15 to-transparent";
  } else if (titleLower.includes("bitdefender") || titleLower.includes("mcafee") || titleLower.includes("adobe")) {
    glowColorClass = "from-red-500/10 to-transparent";
  } else if (titleLower.includes("norton")) {
    glowColorClass = "from-yellow-500/10 to-transparent";
  } else if (titleLower.includes("kaspersky")) {
    glowColorClass = "from-teal-500/10 to-transparent";
  } else if (titleLower.includes("eset")) {
    glowColorClass = "from-emerald-500/10 to-transparent";
  }

  // Resolve official artwork assets and gallery images
  const { imageUrl: mainUrl } = getProductResolvedImages(product);
  const { licenseType, deliveryTime, devices } = resolveProductTrustDetails(product);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6" id="product-details-modal">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity" onClick={onClose} />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', duration: 0.4 }}
        className="relative bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[#E2E8F0] z-10 flex flex-col md:flex-row max-h-[92vh] md:max-h-[85vh] text-[#393E46]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-[#EEEEEE] hover:bg-[#EEEEEE] text-[#222831] p-2.5 rounded-full transition-all duration-200 cursor-pointer z-30 border border-[#E2E8F0]"
          id="close-modal-btn"
        >
          <X className="h-4 w-4" />
        </button>

        {/* LEFT COLUMN: Premium 3D Software Box Showcase */}
        <div 
          className="w-full md:w-[45%] bg-[#EEEEEE] border-r border-[#E2E8F0] flex flex-col p-6 space-y-6 justify-center items-center relative select-none overflow-hidden cursor-pointer"
          onMouseEnter={() => setIsHoveredModal(true)}
          onMouseLeave={() => setIsHoveredModal(false)}
        >
          
          {/* Ambient Brand Glow */}
          <div className={`absolute w-[240px] h-[240px] rounded-full bg-gradient-to-r ${glowColorClass} blur-[60px] opacity-40 pointer-events-none z-0`} />

          <div className="relative preserve-3d flex items-center justify-center p-2 z-10">
            <SoftwareBox product={product} isHovered={isHoveredModal} size="large" />
          </div>
          
          <div className="text-center space-y-1.5 z-10">
            <span className="text-[9px] font-extrabold text-[#3b82f6] bg-[#3b82f6]/5 border border-[#3b82f6]/10 px-2.5 py-1 uppercase tracking-widest rounded-full">
              {product.category}
            </span>
            <p className="text-[10px] text-[#393E46] uppercase tracking-widest font-bold pt-1">
              Interactive 3D Product Box
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Product Metadata, Features, Reviews and Buy panel */}
        <div className="w-full md:w-[55%] flex flex-col overflow-hidden max-h-[50vh] md:max-h-full">
          {/* Scrollable details view */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
            {/* Category and Title */}
            <div>
              <span className="text-[9px] font-black text-[#3b82f6] tracking-[0.2em] uppercase block mb-1">
                INSTANT DIGITAL LICENSE
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#222831] leading-tight">
                {product.title}
              </h2>
            </div>

            {/* Rating and Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center space-x-1 bg-[#EEEEEE] border border-[#E2E8F0] text-[#222831] px-2.5 py-1 rounded-xl text-[11px] font-bold shadow-xs">
                <Star className="h-3.5 w-3.5 fill-[#3b82f6] text-[#3b82f6]" />
                <span>{product.rating}</span>
                <span className="text-[#393E46] font-medium">({product.reviewsCount} reviews)</span>
              </div>
              
              <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 font-extrabold text-[9px] px-2.5 py-1 uppercase tracking-widest rounded-md">
                SAVE {discountPercent}% INSTANTLY
              </span>

              <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded border ${
                licenseType === 'Lifetime' 
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                  : licenseType === 'Subscription'
                  ? 'bg-indigo-50 text-indigo-600 border-indigo-200'
                  : 'bg-cyan-50 text-cyan-600 border-cyan-200'
              }`}>
                {licenseType} Badge
              </span>

              <span className="bg-[#EEEEEE] border border-[#E2E8F0] text-[#393E46] font-bold text-[9px] px-2.5 py-1 uppercase tracking-widest flex items-center space-x-1 rounded-md">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                <span>Genuine Activation</span>
              </span>
            </div>

            {/* Pricing Section */}
            <div className="bg-[#EEEEEE] rounded-2xl p-4.5 border border-[#E2E8F0] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#393E46] uppercase tracking-widest block mb-0.5">MSRP / Retail Price</span>
                <span className="text-sm font-semibold text-slate-300 line-through">₹{product.price}</span>
              </div>
              
              <div className="text-right">
                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 uppercase tracking-widest block mb-1 rounded-md">
                  Saved ₹{product.price - product.salePrice}
                </span>
                <span className="text-2xl font-black text-[#222831] tracking-tight">
                  ₹{product.salePrice}
                </span>
              </div>
            </div>

            {/* Trust checklist */}
            <div className="bg-white hover:bg-[#EEEEEE] border border-[#E2E8F0] p-4.5 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-3 transition-all duration-300 shadow-xs">
              <div className="flex items-center text-xs text-[#393E46]">
                <span className="text-emerald-500 mr-2.5 font-bold">✓</span>
                <span className="font-medium">Instant Delivery ({deliveryTime})</span>
              </div>
              <div className="flex items-center text-xs text-[#393E46]">
                <span className="text-emerald-500 mr-2.5 font-bold">✓</span>
                <span className="font-medium">{devices} License</span>
              </div>
              <div className="flex items-center text-xs text-[#393E46]">
                <span className="text-emerald-500 mr-2.5 font-bold">✓</span>
                <span className="font-medium">{licenseType} License</span>
              </div>
              <div className="flex items-center text-xs text-[#393E46]">
                <span className="text-emerald-500 mr-2.5 font-bold">✓</span>
                <span className="font-medium">GST Invoice Available</span>
              </div>
              <div className="flex items-center text-xs text-[#393E46]">
                <span className="text-emerald-500 mr-2.5 font-bold">✓</span>
                <span className="font-medium">Activation Assistance Included</span>
              </div>
              <div className="flex items-center text-xs text-[#393E46]">
                <span className="text-emerald-500 mr-2.5 font-bold">✓</span>
                <span className="font-medium">WhatsApp Support Active</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-[10px] font-bold text-[#393E46] uppercase tracking-[0.2em] mb-2">Description</h4>
              <p className="text-sm text-[#393E46] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Business Bulk Discounts */}
            <div className="bg-[#EEEEEE]/50 border border-[#3b82f6]/15 rounded-2xl p-4.5 space-y-2.5">
              <h4 className="text-[10px] font-extrabold text-[#3b82f6] uppercase tracking-widest block">Business & Bulk Discounts</h4>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-white p-2.5 rounded-xl border border-[#E2E8F0] shadow-xs">
                  <span className="block text-[9px] text-[#393E46] uppercase font-semibold">1-4 Keys</span>
                  <span className="text-xs font-bold text-[#222831]">Reg. Price</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-emerald-100 shadow-xs">
                  <span className="block text-[9px] text-emerald-500 uppercase font-bold">5-9 Keys</span>
                  <span className="text-xs font-bold text-emerald-500">15% OFF</span>
                </div>
                <div className="bg-white p-2.5 rounded-xl border border-[#3b82f6]/20 shadow-xs">
                  <span className="block text-[9px] text-[#3b82f6] uppercase font-bold">10+ Keys</span>
                  <span className="text-xs font-bold text-[#3b82f6]">25% OFF</span>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div>
              <h4 className="text-[10px] font-bold text-[#393E46] uppercase tracking-[0.2em] mb-3">License Key Features</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-2 text-xs text-[#393E46]">
                    <CheckCircle className="h-4 w-4 text-[#3b82f6] shrink-0 mt-0.5" />
                    <span className="font-medium leading-snug">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Reviews Section */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-[#393E46] uppercase tracking-[0.2em]">Verified Buyer Reviews</h4>
              <div className="space-y-2.5">
                <div className="bg-white rounded-xl p-3.5 border border-[#E2E8F0] space-y-1.5 shadow-xs">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-extrabold text-[#222831]">Rahul K. <span className="text-emerald-600 text-[9px] font-mono uppercase bg-emerald-50 border border-emerald-200 px-1.5 rounded ml-1.5">Verified Buyer</span></span>
                    <div className="flex items-center text-[#3b82f6]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-[#3b82f6] mr-0.5" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#393E46] font-medium leading-relaxed">"Delivered instantly into my digital panel. Copied and pasted, Windows activated without any phone setup needed. Absolute lifesaver for our office!"</p>
                </div>

                <div className="bg-white rounded-xl p-3.5 border border-[#E2E8F0] space-y-1.5 shadow-xs">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-extrabold text-[#222831]">Amit S. <span className="text-emerald-600 text-[9px] font-mono uppercase bg-emerald-50 border border-emerald-200 px-1.5 rounded ml-1.5">Verified Buyer</span></span>
                    <div className="flex items-center text-[#3b82f6]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-[#3b82f6] mr-0.5" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-[#393E46] font-medium leading-relaxed">"Got Adobe All Apps subscription seat on my personal account in less than 5 minutes. Works perfectly with Neural Filters, genuine and highly recommended."</p>
                </div>
              </div>
            </div>

            {/* Activation Guide */}
            <div className="bg-[#EEEEEE] border border-[#E2E8F0] rounded-2xl p-5">
              <h4 className="text-xs font-bold text-[#222831] uppercase tracking-[0.2em] flex items-center mb-3">
                <HelpCircle className="h-4 w-4 mr-2 text-[#3b82f6]" />
                How Activation Works
              </h4>
              <p className="text-xs text-[#393E46] leading-relaxed mb-3">
                Your digital license key code is saved directly to your client profile dashboard immediately upon checkout. Use the guide below to activate:
              </p>
              <div className="bg-white rounded-xl p-3.5 border border-[#E2E8F0] font-mono text-xs text-[#393E46] whitespace-pre-line leading-relaxed shadow-xs">
                {product.activationGuide}
              </div>
            </div>
          </div>

          {/* Bottom Action Footer Panel */}
          <div className="p-6 border-t border-[#E2E8F0] bg-[#EEEEEE] flex items-center justify-between gap-4 z-20">
            <div>
              <span className="text-[10px] font-bold text-[#393E46] block uppercase tracking-widest">Instant Delivery</span>
              <span className="text-xs font-bold text-emerald-600 flex items-center">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 status-dot text-emerald-500 animate-pulse" />
                In Stock & Ready
              </span>
            </div>

            <button
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              className="brand-gradient-btn text-white font-black text-[10px] uppercase tracking-widest px-6 py-3.5 rounded-xl flex items-center space-x-2 transition-all duration-200 shadow-lg cursor-pointer animate-brightness-hover"
              id="modal-add-to-cart-btn"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add To Cart</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
