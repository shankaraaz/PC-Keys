import React, { useState } from 'react';
import { ShoppingCart, Star, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { getProductResolvedImages, resolveProductTrustDetails } from '../lib/images';
import SoftwareBox from './SoftwareBox';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
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
  const { licenseType, devices } = resolveProductTrustDetails(product);

  const isEnterprise = titleLower.includes('enterprise');
  const licenseBadgeText = isEnterprise ? 'Enterprise' : licenseType;

  // Avoid repeating "Microsoft Windows..." category title above if already present in title
  const showCategoryText = !titleLower.includes('windows') && !titleLower.includes('office') && !titleLower.includes('server');

  return (
    <motion.div 
      className="bg-white rounded-3xl shadow-sm hover:shadow-xl flex flex-col h-[300px] overflow-hidden group border border-[#E2E8F0] w-full select-none"
      id={`product-card-${product.id}`}
      whileHover={{ 
         scale: 1.015, 
         translateY: -4,
         borderColor: "rgba(124, 58, 237, 0.2)",
         boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.03)"
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. TOP ROW BADGES (Highly scannable & consistent) */}
      <div className="px-4 pt-3 pb-2 flex justify-between items-center border-b border-[#EEEEEE] z-20 shrink-0 bg-white">
        <span className="bg-blue-100 text-blue-600 border border-blue-200/50 font-black text-[9px] px-2 py-0.5 rounded uppercase tracking-widest shadow-xs">
          SAVE {discountPercent}%
        </span>
        <div className="flex items-center space-x-1.5">
          <span className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded border leading-none ${
            licenseBadgeText === 'Lifetime' 
              ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
              : licenseBadgeText === 'Subscription' || licenseBadgeText === 'Enterprise'
              ? 'bg-indigo-50 text-indigo-600 border-indigo-200'
              : 'bg-cyan-50 text-cyan-600 border-cyan-200'
          }`}>
            {licenseBadgeText}
          </span>
          <div className="bg-emerald-50 border border-emerald-500/15 text-emerald-600 text-[8px] font-extrabold px-1.5 py-0.5 rounded flex items-center space-x-0.5 shadow-xs">
            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
            <span className="uppercase tracking-widest text-[8px]">Instant</span>
          </div>
        </div>
      </div>

      {/* MAIN CARD CONTENT SPLIT */}
      <div className="flex flex-row flex-1 overflow-hidden">
        
        {/* LEFT COLUMN: Image & Price Area (40% width) */}
        <div className="w-[38%] sm:w-[40%] shrink-0 relative bg-gradient-to-b from-slate-50 to-slate-100/80 group-hover:from-slate-50/50 group-hover:to-slate-100 transition-all duration-300 flex flex-col justify-between p-3 border-r border-[#E2E8F0]">
          
          {/* Subtle Ambient Glow Behind Artwork */}
          <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-full bg-gradient-to-r ${glowColorClass} blur-[20px] sm:blur-[30px] opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-500 pointer-events-none z-0`} />

          {/* 3D Box Stage (Upper 40% constraint) */}
          <div className="absolute inset-x-0 top-3 bottom-14 flex items-center justify-center z-10 overflow-hidden">
            <div className="relative flex items-center justify-center transition-all duration-500 ease-out preserve-3d scale-[0.68] sm:scale-[0.74] md:scale-[0.80]">
              {/* Render 3D Software Box */}
              <SoftwareBox product={product} isHovered={isHovered} size="normal" />
            </div>
          </div>

          {/* Pricing Details Block (Aligned perfectly to bottom-left) */}
          <div className="relative z-20 mt-auto pt-2 border-t border-[#EEEEEE]/40 text-center sm:text-left sm:pl-1">
            <span className="block text-[9px] font-bold text-[#393E46] line-through leading-none">
              ₹{product.price}
            </span>
            <span className="text-base sm:text-lg font-black text-[#222831] mt-0.5 tracking-tight inline-block">
              ₹{product.salePrice}
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Metadata, Features, and Action Buttons (60% width) */}
        <div className="w-[62%] sm:w-[60%] flex-1 p-3 flex flex-col justify-between h-full bg-white relative">
          
          <div className="space-y-1.5">
            {/* Category title block (rendered dynamically with repeat-guard check) */}
            <div className="h-3.5 overflow-hidden">
              {showCategoryText ? (
                <span className="text-[8.5px] sm:text-[9px] font-extrabold text-[#3b82f6] uppercase tracking-widest block truncate">
                  {product.category}
                </span>
              ) : (
                <span className="text-[8.5px] sm:text-[9px] font-extrabold text-[#3b82f6] uppercase tracking-widest block truncate">
                  Genuine License Key
                </span>
              )}
            </div>

            {/* Product Title (Strict line clamp & container height constraint to prevent CLS) */}
            <h3 className="text-xs sm:text-sm font-black text-[#222831] leading-snug group-hover:text-[#3b82f6] transition-colors duration-200 line-clamp-2 h-[34px] sm:h-[36px] overflow-hidden">
              {product.title}
            </h3>

            {/* Rating Display */}
            <div className="flex items-center space-x-1 text-xs">
              <Star className="h-3 w-3 text-amber-500 fill-amber-500 shrink-0" />
              <span className="text-[11px] font-bold text-[#222831]">{product.rating}</span>
              <span className="text-[9px] text-[#393E46]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Clean 4-Bullet Feature Checklist (Guaranteed exact height/padding) */}
          <div className="space-y-1 my-2 bg-[#EEEEEE] p-2 sm:p-2.5 rounded-xl border border-[#EEEEEE] flex-grow flex flex-col justify-center h-[76px] overflow-hidden">
            <div className="flex items-center text-[10px] md:text-[11px] text-[#393E46] leading-none">
              <span className="text-emerald-500 mr-1.5 font-black">✓</span>
              <span className="font-medium truncate">{devices} License</span>
            </div>
            <div className="flex items-center text-[10px] md:text-[11px] text-[#393E46] leading-none">
              <span className="text-emerald-500 mr-1.5 font-black">✓</span>
              <span className="font-medium truncate">Genuine Activation</span>
            </div>
            <div className="flex items-center text-[10px] md:text-[11px] text-[#393E46] leading-none">
              <span className="text-emerald-500 mr-1.5 font-black">✓</span>
              <span className="font-medium truncate">Instant Delivery</span>
            </div>
            <div className="flex items-center text-[10px] md:text-[11px] text-[#393E46] leading-none">
              <span className="text-emerald-500 mr-1.5 font-black">✓</span>
              <span className="font-medium truncate">Activation Support</span>
            </div>
          </div>

          {/* Action Button Strip */}
          <div className="pt-2 border-t border-[#EEEEEE] flex items-center space-x-1.5 shrink-0 h-[40px] bg-white">
            <button
              onClick={() => onViewDetails(product)}
              className="p-2 rounded-lg text-[#393E46] bg-[#EEEEEE] hover:bg-[#EEEEEE] hover:text-[#222831] border border-[#EEEEEE] transition-all duration-200 flex items-center justify-center cursor-pointer shrink-0 h-9 w-9"
              title="View Activation Details"
              id={`view-details-${product.id}`}
            >
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => onAddToCart(product)}
              className="brand-gradient-bg text-white font-bold text-[9px] sm:text-[10px] uppercase tracking-widest px-2 sm:px-3 py-2 rounded-lg flex items-center justify-center space-x-1 shadow-md cursor-pointer hover:shadow-lg transition-all flex-grow h-9 truncate"
              id={`add-to-cart-${product.id}`}
            >
              <ShoppingCart className="h-4 w-4 text-white shrink-0" />
              <span className="truncate">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
