import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Zap, ShieldCheck, ArrowRight, Clock } from 'lucide-react';
import { Category } from '../types';

interface HeroSectionProps {
  onPromoClick: (categoryName: Category, query?: string) => void;
}

export default function HeroSection({ onPromoClick }: HeroSectionProps) {
  // Countdown timer for XBOX Game Pass Flash Deal in Hero Section
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 45, seconds: 12 });
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroImages = [
    '/asset/win-black.jpg',
    '/asset/win-color.jpg',
    '/asset/win-glass.jpg',
    '/asset/win-white.jpg'
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4500); // 4.5 seconds per slide
    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      const diff = endOfDay.getTime() - now.getTime();

      if (diff > 0) {
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 23, minutes: 59, seconds: 59 });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    // min-h-[calc(100vh-64px)]
    <div className="relative bg-[#EEEEEE] overflow-hidden min-h-[calc(90vh-32px)] flex items-center border-b border-[#E2E8F0] py-16 sm:py-20" id="hero-banner">
      {/* Background Carousel */}
      {heroImages.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={src}
            alt="Hero Background"
            className="w-full h-full object-cover object-center"
          />
        </div>
      ))}

      {/* Elegant overlay to ensure text readability */}
      <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px]" />
      
      {/* Subtle brand glow effects */}
      <div className="absolute -top-40 -right-40 h-[450px] w-[450px] bg-[#3b82f6]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 h-[450px] w-[450px] bg-[#3b82f6]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-between">

          {/* LEFT SIDE (existing content) */}
          <div className="w-full lg:w-[45%] shrink-0 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white border border-[#E2E8F0] px-3.5 py-1.5 rounded-full shadow-xs">
              <Sparkles className="h-4 w-4 text-[#3b82f6]" />
              <span className="text-[#393E46] text-[9px] font-black uppercase tracking-widest">UP TO 85% DISCOUNT SALE ACTIVE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-[#222831] leading-tight tracking-tight">
              Premium Digital Keys. <br />
              <span className="text-blue-600 font-serif italic font-bold">
                100% Secure & Genuine.
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-[#393E46] leading-relaxed font-normal">
              Get fully-licensed, lifetime retail activation software keys for Operating Systems, high-end Antivirus suites, and productive Office suites instantly with automated delivery.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center space-x-2 bg-white border border-[#E2E8F0] rounded-2xl px-4 py-3 text-[#222831] text-xs font-bold shadow-xs">
                <Zap className="h-4.5 w-4.5 text-[#3b82f6] fill-[#3b82f6]/10" />
                <span className="tracking-wide">Instant Keys Delivery</span>
              </div>
              <div className="flex items-center space-x-2 bg-white border border-[#E2E8F0] rounded-2xl px-4 py-3 text-[#222831] text-xs font-bold shadow-xs">
                <ShieldCheck className="h-4.5 w-4.5 text-[#3b82f6]" />
                <span className="tracking-wide">Microsoft Certified Original</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE (new promotional grid) */}
          <div className="w-full lg:w-[55%] flex-grow">
            <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 animate-fade-in">

              {/* Large Primary Banner (2/3 width) */}
              <motion.div
                whileHover={{ y: -4, borderColor: "rgba(124, 58, 237, 0.3)" }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                onClick={() => onPromoClick('Microsoft Office Keys')}
                className="sm:col-span-4 bg-gradient-to-br from-[#3b82f6] to-[#3b82f6] text-white p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between h-[210px] group border border-transparent shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer select-none"
              >
                {/* Glassy floating document icons representing Office apps */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex -space-x-4 opacity-35 group-hover:opacity-55 group-hover:scale-105 transition-all duration-500 pointer-events-none z-0">
                  {/* Excel */}
                  <div className="w-14 h-14 bg-emerald-500/30 backdrop-blur-md rounded-2xl border border-emerald-400/30 flex items-center justify-center transform -rotate-12 shadow-lg">
                    <span className="text-lg font-extrabold font-mono text-emerald-100">X</span>
                  </div>
                  {/* Word */}
                  <div className="w-14 h-14 bg-blue-500/40 backdrop-blur-md rounded-2xl border border-blue-400/30 flex items-center justify-center transform rotate-6 shadow-lg translate-y-3">
                    <span className="text-lg font-extrabold font-mono text-blue-100">W</span>
                  </div>
                  {/* PowerPoint */}
                  <div className="w-14 h-14 bg-orange-500/30 backdrop-blur-md rounded-2xl border border-orange-400/30 flex items-center justify-center transform -rotate-6 shadow-lg -translate-y-1">
                    <span className="text-lg font-extrabold font-mono text-orange-100">P</span>
                  </div>
                </div>

                <div className="space-y-2 relative z-10">
                  <span className="bg-white/20 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full w-fit">
                    Microsoft Office 365 Promotion
                  </span>
                  <h3 className="text-lg font-extrabold tracking-tight leading-tight max-w-[200px]">
                    Upgrade to <br />Office 365 Professional
                  </h3>
                  <p className="text-[10px] text-white/80 max-w-[200px] leading-relaxed">
                    Activate Word, Excel, PowerPoint & 1TB cloud storage across 5 devices instantly.
                  </p>
                </div>

                <div className="flex items-center justify-between relative z-10">
                  <div className="text-xs font-black">
                    From <span className="text-lg">₹1,199</span>
                  </div>
                  <span className="bg-white text-[#3b82f6] hover:bg-[#EEEEEE] font-extrabold text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-xl flex items-center space-x-1 shadow-xs transition-colors duration-200">
                    <span>Claim Now</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </motion.div>

              {/* XBOX Game Pass Offer (Right Column - Top) */}
              <motion.div
                whileHover={{ y: -4, borderColor: "rgba(124, 58, 237, 0.3)" }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                onClick={() => onPromoClick('Gaming & Gift Cards', 'Xbox')}
                className="sm:col-span-2 bg-white border border-[#E2E8F0] p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between h-[210px] group shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer select-none"
              >
                {/* Xbox green ambient glow */}
                <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-emerald-500/10 blur-2xl opacity-60 group-hover:opacity-80 transition-all duration-300 z-0" />

                <div className="space-y-2 relative z-10">
                  <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">
                    Xbox Special
                  </span>
                  <h3 className="text-sm font-extrabold text-[#222831] leading-tight">
                    Game Pass Ultimate
                  </h3>
                  <p className="text-[10px] text-[#393E46] leading-snug">
                    Get 3 months unlimited play of over 100 console games.
                  </p>
                </div>

                <div className="space-y-3 relative z-10">
                  {/* Live countdown timer */}
                  <div className="flex items-center space-x-1.5 font-mono text-rose-600 font-bold bg-rose-50 border border-rose-100 rounded-xl px-2 py-0.5 text-[10px] w-fit">
                    <Clock className="h-3 w-3 text-rose-500 animate-pulse" />
                    <span>{String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#222831]">₹749</span>
                    <span className="text-[9px] font-extrabold text-[#3b82f6] uppercase tracking-wider flex items-center space-x-0.5">
                      <span>Get</span>
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* PSN Games Promotion (Bottom Left) */}
              <motion.div
                whileHover={{ y: -4, borderColor: "rgba(124, 58, 237, 0.3)" }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                onClick={() => onPromoClick('Gaming & Gift Cards', 'PlayStation')}
                className="sm:col-span-3 bg-white border border-[#E2E8F0] p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between h-[150px] group shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer select-none"
              >
                {/* PlayStation blue glow */}
                <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-blue-500/10 blur-2xl opacity-60 group-hover:opacity-80 transition-all duration-300 z-0" />

                <div className="space-y-1 relative z-10">
                  <span className="bg-blue-50 text-blue-600 border border-blue-100 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">
                    PlayStation
                  </span>
                  <h3 className="text-sm font-extrabold text-[#222831] leading-tight">
                    PSN Store Wallet Cards
                  </h3>
                  <p className="text-[10px] text-[#393E46] leading-snug">
                    Access wallet funds with up to 40% wholesale rates.
                  </p>
                </div>

                <div className="flex items-center justify-between relative z-10">
                  <span className="text-xs font-black text-[#222831]">From ₹1,499</span>
                  <span className="text-[9px] font-extrabold text-[#3b82f6] uppercase tracking-wider flex items-center space-x-0.5">
                    <span>Shop Keys</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </motion.div>

              {/* Office for Mac Promotion (Bottom Right) */}
              <motion.div
                whileHover={{ y: -4, borderColor: "rgba(124, 58, 237, 0.3)" }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                onClick={() => onPromoClick('Microsoft Office Keys', 'Mac')}
                className="sm:col-span-3 bg-white border border-[#E2E8F0] p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between h-[150px] group shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer select-none"
              >
                {/* macOS purple glow */}
                <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-purple-500/10 blur-2xl opacity-60 group-hover:opacity-80 transition-all duration-300 z-0" />

                <div className="space-y-1 relative z-10">
                  <span className="bg-purple-50 text-purple-600 border border-purple-100 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">
                    Apple Exclusive
                  </span>
                  <h3 className="text-sm font-extrabold text-[#222831] leading-tight">
                    Office Home & Business Mac
                  </h3>
                  <p className="text-[10px] text-[#393E46] leading-snug">
                    Lifetime retail license keys bound directly to Apple ID.
                  </p>
                </div>

                <div className="flex items-center justify-between relative z-10">
                  <span className="text-xs font-black text-[#222831]">From ₹1,999</span>
                  <span className="text-[9px] font-extrabold text-[#3b82f6] uppercase tracking-wider flex items-center space-x-0.5">
                    <span>Get Mac Office</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
