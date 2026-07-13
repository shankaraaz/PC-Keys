import React, { useState } from 'react';
import { Star, Check, Key, ShieldCheck, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { resolveProductTrustDetails } from '../lib/images';
import SoftwareBox from './SoftwareBox';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const discountPercent = Math.round(((product.price - product.salePrice) / product.price) * 100);

  const { licenseType } = resolveProductTrustDetails(product);

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 2 });
  };

  // Logic to guess key type for UI if not strictly available from product trust details
  const keyTypeLabel = product.title.toLowerCase().includes('bind') || product.title.toLowerCase().includes('online')
    ? 'Online Activation'
    : 'Telephonic Key';

  const activationLabel = licenseType === 'Subscription' ? '1 Year Activation' : 'Lifetime Activation';

  return (
    <motion.div
      className="bg-white rounded p-3 flex flex-col w-full select-none border border-slate-100"
      style={{
        boxShadow: "0 2px 10px rgba(0,0,0,0.03)"
      }}
      id={`product-card-${product.id}`}
      whileHover={{
        translateY: -4,
        boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.08)"
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Area */}
      <div
        className="relative  w-full h-[220px] rounded bg-gradient-to-b from-slate-50 to-slate-100/50  mb-3.5 flex items-center justify-center cursor-pointer overflow-hidden border border-slate-100/60"
        onClick={() => onViewDetails(product)}
      >
        {/* Discount Badge */}
        <div className="absolute top-2.5 left-2.5 bg-[#2563eb] text-slate-100 text-[11px] font-bold px-2.5 py-1 rounded-full z-20 shadow-sm">
          -{discountPercent}%
        </div>

        {/* Features Badges (Right side) */}
        {/* <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-20">
          <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-md flex items-center px-1.5 py-1 gap-1.5 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
            <Key className="w-3.5 h-3.5 text-orange-500" strokeWidth={2} />
            <span className="text-[9px] text-slate-700 font-semibold">{keyTypeLabel}</span>
          </div>
          <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-md flex items-center px-1.5 py-1 gap-1.5 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
            <ShieldCheck className="w-3.5 h-3.5 text-orange-500" strokeWidth={2} />
            <span className="text-[9px] text-slate-700 font-semibold">{activationLabel}</span>
          </div>
          <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-md flex items-center px-1.5 py-1 gap-1.5 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
            <Mail className="w-3.5 h-3.5 text-orange-500" strokeWidth={2} />
            <span className="text-[9px] text-slate-700 font-semibold">Email Delivery</span>
          </div>
        </div> */}

        {/* 3D Box */}
        <div className="relative z-10 scale-[0.80] sm:scale-[0.85] transition-transform duration-500 ease-out preserve-3d group-hover:scale-[0.88]">
          <SoftwareBox product={product} isHovered={isHovered} size="normal" />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col gap-1.5 px-0.5">
        <div
          className="cursor-pointer"
          onClick={() => onViewDetails(product)}
        >
          {/* <h3 className="text-[15px] font-bold text-slate-800 leading-snug line-clamp-1 hover:text-blue-600 transition-colors wrap">
           */}
          <h3 className="text-[15px] font-bold text-slate-800 line-clamp-2 hover:text-blue-600 transition-colors wrap">

            {product.title}
          </h3>
          {/* <p className="text-[13px] text-slate-400 mt-0.5 line-clamp-1">{product.title} Key</p> */}
        </div>

        {/* <div className="flex items-center gap-0.5 mt-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-[14px] h-[14px] text-slate-300" strokeWidth={2} />
          ))}
        </div> */}
        <div className=" top-2.5 right-2.5 flex flex-col gap-1.5 z-20">
          {/* <div className="bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-md flex items-center px-1.5 py-1 gap-1.5 shadow-[0_2px_4px_rgba(0,0,0,0.02)]">
            <Key className="w-3.5 h-3.5 text-orange-500" strokeWidth={2} />
            <span className="text-[9px] text-slate-700 font-semibold">{keyTypeLabel}</span>
          </div> */}
          <div className="   rounded-md flex items-center px-1.5 py-1 gap-1.5 ">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" strokeWidth={2} />
            <span className="text-[10px] text-slate-700 font-semibold">{activationLabel}</span>
          </div>
          <div className="   rounded-md flex items-center px-1.5 py-1 gap-1.5  ">
            <Mail className="w-3.5 h-3.5 text-blue-500" strokeWidth={2} />
            <span className="text-[10px] text-slate-700 font-semibold">Email Delivery</span>
          </div>
        </div>

        {/* <div className="flex items-center gap-1.5 mt-1">
          <Check className="w-[15px] h-[15px] text-blue-600" strokeWidth={3} />
          <span className="text-[13px] text-slate-700 font-semibold">In stock</span>
        </div> */}

        <div className="flex items-center gap-2 mt-1 mb-1">
          <span className="text-[13px] text-slate-300 line-through font-medium">₹{formatPrice(product.price)}</span>
          <span className="text-[15px] font-bold text-blue-600">₹{formatPrice(product.salePrice)}</span>
          <div className="flex items-center gap-1.5  ml-auto">
            <Check className="w-[15px] h-[15px] text-blue-600" strokeWidth={3} />
            <span className="text-[13px] text-slate-700 font-semibold">In stock</span>
          </div>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="w-full rounded bg-[#1e5ee6] hover:bg-blue-700 text-white font-semibold py-2.5  transition-colors text-[14px] flex items-center justify-center mt-1 shadow-sm"
          id={`add-to-cart-${product.id}`}
        >
          Add To Cart
        </button>
      </div>
    </motion.div>
  );
}
