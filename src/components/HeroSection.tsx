import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Zap, ShieldCheck, ArrowRight, Clock, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Category } from '../types';

interface HeroSectionProps {
  onPromoClick: (categoryName: Category, query?: string) => void;
}

export default function HeroSection({ onPromoClick }: HeroSectionProps) {
  // Countdown timer for XBOX Game Pass Flash Deal in Hero Section
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 45, seconds: 12 });

  const [currentProductSlide, setCurrentProductSlide] = useState(1); // 1 is center item

  const carouselProducts = [
    {
      id: 1,
      title: 'Visio\nProfessional 2021',
      logo: 'V',
      bg: 'bg-[#155fc9]',
      border: 'border-[#0f4b9f]',
      text: 'text-white',
    },
    {
      id: 2,
      title: 'Project\nProfessional 2021',
      logo: 'P',
      bg: 'bg-[#0f7a3f]',
      border: 'border-[#0a5c2d]',
      text: 'text-white',
    },
    {
      id: 3,
      title: 'Microsoft\nSQL Server Standard',
      logo: 'SQL',
      bg: 'bg-white',
      border: 'border-gray-200',
      text: 'text-gray-800',
    }
  ];

  const nextProductSlide = () => {
    setCurrentProductSlide((prev) => (prev + 1) % carouselProducts.length);
  };

  const prevProductSlide = () => {
    setCurrentProductSlide((prev) => (prev - 1 + carouselProducts.length) % carouselProducts.length);
  };



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
    <div className="relative bg-[#F6F6F6] overflow-hidden min-h-[60vh] flex items-center border-b border-[#E2E8F0] " id="hero-banner">


      {/* Subtle brand glow effects */}
      {/* <div className="absolute -top-40 -right-40 h-[450px] w-[450px] bg-[#3b82f6]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 h-[450px] w-[450px] bg-[#3b82f6]/10 rounded-full blur-3xl pointer-events-none" /> */}

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
          {/* RIGHT SIDE (Carousel Card) */}
          <div className="w-full lg:w-[55%] flex-grow">
            <div className="bg-gradient-to-br from-[#105fdc] to-[#9c4be6] rounded-[2rem] p-6 md:p-10 relative overflow-hidden shadow-2xl flex flex-col justify-between h-[450px] sm:h-[500px]">

              {/* Text Content */}
              <div className="z-10 text-center sm:text-left space-y-4 max-w-lg">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
                  Get All Microsoft Licensing <br className="hidden sm:block" /> product's Key at Best Price
                </h2>
                <p className="text-white/90 text-sm leading-relaxed">
                  Shop all Microsoft Licensing product's Genuine Key at best affordable price
                </p>
                {/* <button
                  onClick={() => onPromoClick('Microsoft Office Keys')}
                  className="bg-[#2463eb] hover:bg-[#1a4db8] text-white px-6 py-3 rounded-lg font-bold flex items-center space-x-2 transition-colors mx-auto sm:mx-0 shadow-lg mt-2"
                >
                  <span>Shop Now</span>
                  <ShoppingCart className="w-5 h-5" />
                </button> */}
              </div>

              {/* Carousel container */}
              <div className="relative mt-8 sm:mt-12 flex-grow flex items-center justify-center z-10 w-full h-[250px]">
                {/* Left Arrow */}
                <button
                  onClick={prevProductSlide}
                  className="absolute left-2 sm:left-6 z-30 p-2 sm:p-3 bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-md transition-colors shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Cards Wrapper */}
                <div className="relative flex items-center justify-center w-full max-w-[400px] h-[220px]">
                  {carouselProducts.map((product, index) => {
                    let position = index - currentProductSlide;
                    if (position < -1) position += carouselProducts.length;
                    if (position > 1) position -= carouselProducts.length;

                    let zIndex = 10;
                    let transform = 'scale(0.8) translateX(0)';
                    let opacity = 'opacity-0';

                    if (position === 0) {
                      zIndex = 20;
                      transform = 'scale(1.05) translateY(0)';
                      opacity = 'opacity-100';
                    } else if (position === -1) {
                      zIndex = 15;
                      transform = 'scale(0.85) translateX(-80px)';
                      opacity = 'opacity-70';
                    } else if (position === 1) {
                      zIndex = 15;
                      transform = 'scale(0.85) translateX(80px)';
                      opacity = 'opacity-70';
                    }

                    return (
                      <div
                        key={product.id}
                        className={`absolute transition-all duration-500 ease-out flex-shrink-0 w-[140px] h-[190px] sm:w-[150px] sm:h-[210px] rounded-r-md border-l-8 ${product.border} shadow-2xl flex flex-col overflow-hidden bg-white ${opacity}`}
                        style={{ transform, zIndex }}
                      >
                        <div className={`flex-grow flex items-center justify-center ${product.bg}`}>
                          <span className="text-4xl sm:text-5xl font-extrabold text-white/90 font-mono tracking-tighter drop-shadow-md">
                            {product.logo}
                          </span>
                        </div>
                        <div className="bg-white h-[35%] p-2 sm:p-3 flex items-center justify-center border-t border-gray-100">
                          <span className={`text-[10px] sm:text-xs font-bold leading-tight text-center ${product.text} whitespace-pre-line`}>
                            {product.title}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right Arrow */}
                <button
                  onClick={nextProductSlide}
                  className="absolute right-2 sm:right-6 z-30 p-2 sm:p-3 bg-black/20 hover:bg-black/40 rounded-full text-white backdrop-blur-md transition-colors shadow-lg"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Dots */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-20">
                {carouselProducts.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentProductSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${currentProductSlide === idx ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60 w-2'}`}
                  />
                ))}
              </div>

              {/* Decorative background elements */}
              {/* <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" /> */}
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}
