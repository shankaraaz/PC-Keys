import React from 'react';
import { Product } from '../types';

interface SoftwareBoxProps {
  product: Product;
  isHovered?: boolean;
  size?: 'normal' | 'large' | 'card';
}

export default function SoftwareBox({ product, isHovered = false, size = 'normal' }: SoftwareBoxProps) {
  const title = product.title.toLowerCase();
  const category = product.category.toLowerCase();

  // Dimensions & 3D configurations
  let W = 145; // Width in px
  let H = 185; // Height in px
  let T = 25;  // Thickness in px (increased for depth)

  if (size === 'large') {
    W = 180;
    H = 225;
    T = 30; // increased
  } else if (size === 'card') {
    W = 160;
    H = 200;
    T = 28; // increased
  }

  // Brand SVG Logos
  const MicrosoftLogo = () => (
    <svg className="h-3 w-3 shrink-0" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="11" height="11" fill="#F25022" />
      <rect x="12" y="0" width="11" height="11" fill="#7FBA00" />
      <rect x="0" y="12" width="11" height="11" fill="#01A6F0" />
      <rect x="12" y="12" width="11" height="11" fill="#FFB900" />
    </svg>
  );

  const WindowsLogo = ({ color = '#FFFFFF' }: { color?: string }) => (
    <svg className="h-10 w-10 opacity-90 transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M0 3.449L9.75 2.1v9.45H0V3.449zM0 12.45h9.75v9.45L0 20.551v-8.1zM10.8 1.95L24 0v11.55H10.8V1.95zM10.8 12.45H24v11.55l-13.2-1.95v-9.6z" />
    </svg>
  );

  const OfficeLogo = () => (
    <svg className="h-11 w-11 drop-shadow-md" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0L1.5 4.5v15L12 24l10.5-4.5v-15L12 0zm8.5 17.5l-8.5 3.65-8.5-3.65V6.5l8.5-3.65 8.5 3.65v11z" fill="#E45124" />
      <path d="M12 5.5l6 2.6v7.8l-6 2.6-6-2.6V8.1l6-2.6z" fill="#F25022" />
      <path d="M10 9h4v6h-4z" fill="#FFF" />
    </svg>
  );

  // Security Shield SVG
  const ShieldIcon = ({ color = '#3B82F6' }: { color?: string }) => (
    <svg className="h-12 w-12 drop-shadow-[0_0_12px_rgba(59,130,246,0.3)]" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );

  // Terminal Brackets SVG
  const CodeIcon = () => (
    <svg className="h-12 w-12 text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  );

  // VPN Globe SVG
  const GlobeIcon = () => (
    <svg className="h-12 w-12 text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
    </svg>
  );

  // Creative Palette SVG
  const CreativeIcon = () => (
    <svg className="h-12 w-12 text-pink-400 drop-shadow-[0_0_10px_rgba(244,114,182,0.3)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122A3 3 0 00.18 15M9.53 16.122a3 3 0 004.595-1.223L16.25 10m-6.72 6.122a3 3 0 01-3.668-3.668l3.668-3.668m11.238 2.628l-.758 3.03a3 3 0 00-3.668 3.668l3.03-.758a3 3 0 003.668-3.668l-2.272-2.272zm0 0L16.25 10m-6.72 6.122l-3.668-3.668M16.25 10l-6.72-6.122" />
    </svg>
  );

  // Gaming Controller SVG
  const ControllerIcon = () => (
    <svg className="h-12 w-12 text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.3)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12h-6m6 0a3 3 0 11-6 0m6 0a9 9 0 11-9-9h9a9 9 0 010 18" />
    </svg>
  );

  // Business Chart SVG
  const BusinessChartIcon = () => (
    <svg className="h-11 w-11 text-teal-400 drop-shadow-[0_0_10px_rgba(45,212,191,0.3)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 013 18.375v-5.25zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125v-9.75zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );

  // Category identification flags
  const isWindows = title.includes('windows') || title.includes('win11') || title.includes('win10') || title.includes('server');
  const isOffice = title.includes('office') || title.includes('365') || title.includes('m365') || title.includes('project') || title.includes('visio');
  const isAntivirus = category.includes('antivirus') || category.includes('security') || title.includes('bitdefender') || title.includes('norton') || title.includes('kaspersky') || title.includes('mcafee') || title.includes('eset') || title.includes('malwarebytes') || title.includes('guard');
  const isDev = category.includes('developer') || title.includes('jetbrains') || title.includes('visual studio') || title.includes('sql') || title.includes('intellij') || title.includes('github');
  const isVPN = category.includes('vpn') || title.includes('nordvpn') || title.includes('expressvpn') || title.includes('surfshark');
  const isCreative = category.includes('creative') || title.includes('adobe') || title.includes('photoshop') || title.includes('illustrator') || title.includes('premiere') || title.includes('autocad');
  const isGaming = category.includes('gaming') || category.includes('gift') || title.includes('steam') || title.includes('xbox') || title.includes('playstation') || title.includes('psn');
  const isBusiness = category.includes('business') || category.includes('enterprise') || title.includes('quickbooks');

  const isWin11 = title.includes('11') || title.includes('win11');
  const isPro = title.includes('pro') || title.includes('professional');
  const isEnterprise = title.includes('enterprise') || title.includes('ent') || title.includes('volume');

  // Specific themes setup
  let coverBg = 'bg-gradient-to-b from-slate-800 to-slate-950';
  let spineBg = 'bg-slate-900';
  let sideStripBg = 'bg-slate-700';
  let glowColor = 'rgba(148, 163, 184, 0.15)'; // default slate glow
  let brandTitle = 'SOFTWARE';
  let brandEdition = 'Premium Key';
  let deviceLimit = '1 PC License';
  let cardGraphic: React.ReactNode = null;
  let customOverlay: React.ReactNode = null;
  const isServer = title.includes('server');
  let bottomBadge = 'SECURE LICENSE';

  if (isWindows) {
    brandTitle = isServer ? 'Windows Server' : (isWin11 ? 'Windows 11' : 'Windows 10');
    deviceLimit = title.includes('rds') ? 'Remote Client CAL' : '1 PC License';

    if (isServer) {
      coverBg = 'bg-gradient-to-b from-[#1e40af] via-[#1e3a8a] to-[#222831]';
      spineBg = 'bg-[#172554]';
      sideStripBg = 'bg-blue-600';
      glowColor = 'rgba(59, 130, 246, 0.25)';
      brandEdition = 'Standard Server';
      cardGraphic = <WindowsLogo color="#3b82f6" />;
      bottomBadge = 'SERVER LICENSE';
    } else if (isWin11 && isPro) {
      // Windows 11 Professional: Royal blue, glassmorphism, white logos
      coverBg = 'bg-gradient-to-b from-[#0284c7] via-[#0369a1] to-[#0c4a6e]';
      spineBg = 'bg-[#082f49]';
      sideStripBg = 'bg-sky-400';
      glowColor = 'rgba(14, 165, 233, 0.35)';
      brandEdition = 'Professional';
      cardGraphic = <WindowsLogo color="#ffffff" />;
      customOverlay = (
        <div className="absolute inset-x-2.5 top-[38%] bottom-6.5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md p-2 flex flex-col justify-between" />
      );
      bottomBadge = 'RETAIL DIGITAL KEY';
    } else if (isWin11 && isEnterprise) {
      // Windows 11 Enterprise: Premium Dark, Glowing Cyan accents
      coverBg = 'bg-gradient-to-b from-[#222831] via-[#020617] to-black';
      spineBg = 'bg-black';
      sideStripBg = 'bg-cyan-500';
      glowColor = 'rgba(6, 182, 212, 0.4)';
      brandEdition = 'Enterprise MAK';
      cardGraphic = <WindowsLogo color="#22d3ee" />;
      customOverlay = (
        <div className="absolute inset-x-2.5 top-[38%] bottom-6.5 border border-cyan-500/25 bg-cyan-950/10 rounded-xl shadow-[inset_0_0_8px_rgba(6,182,212,0.15)] backdrop-blur-xs p-2 flex flex-col justify-between" />
      );
      bottomBadge = 'VOLUME LICENSE';
    } else if (isWin11 && !isPro && !isEnterprise) {
      // Windows 11 Home: White/light theme, clean, consumer
      coverBg = 'bg-gradient-to-b from-white via-slate-50 to-[#e2e8f0]';
      spineBg = 'bg-slate-300';
      sideStripBg = 'bg-[#0078d7]';
      glowColor = 'rgba(0, 120, 215, 0.15)';
      brandEdition = 'Home Edition';
      cardGraphic = <WindowsLogo color="#0078d7" />;
      bottomBadge = 'OEM LIFETIME';
    } else if (title.includes('10') && isPro) {
      // Windows 10 Professional: Purple premium theme
      coverBg = 'bg-gradient-to-b from-[#6b21a8] via-[#4c1f7a] to-[#2e1065]';
      spineBg = 'bg-[#1e1b4b]';
      sideStripBg = 'bg-purple-400';
      glowColor = 'rgba(168, 85, 247, 0.3)';
      brandEdition = 'Professional';
      cardGraphic = <WindowsLogo color="#ffffff" />;
      bottomBadge = 'RETAIL LIFETIME';
    } else {
      // Windows 10 Home/Other: Classic blue
      coverBg = 'bg-gradient-to-b from-[#0078d7] via-[#00569e] to-[#002f5c]';
      spineBg = 'bg-[#001f3d]';
      sideStripBg = 'bg-[#0078d7]';
      glowColor = 'rgba(0, 120, 215, 0.25)';
      brandEdition = 'Home Retail';
      cardGraphic = <WindowsLogo color="#ffffff" />;
      bottomBadge = 'DIGITAL KEY';
    }
  } else if (isOffice) {
    // Office Products: Premium white package, orange-red accents
    coverBg = 'bg-gradient-to-b from-white via-[#fafafa] to-slate-100';
    spineBg = 'bg-[#EEEEEE]';
    sideStripBg = 'bg-[#e45124]';
    glowColor = 'rgba(228, 81, 36, 0.2)';
    brandTitle = title.includes('365') ? 'Office 365' : 'Office Professional';
    brandEdition = title.includes('2024') ? 'Pro Plus 2024' : (title.includes('2019') ? 'Pro Plus 2019' : 'Pro Plus 2021');
    deviceLimit = title.includes('family') ? '6 Users Account' : '1 PC Account Bind';
    cardGraphic = <OfficeLogo />;
    bottomBadge = 'ACCOUNT BIND KEY';
  } else if (isAntivirus) {
    // Antivirus: Dark tech theme, security pattern, shields
    coverBg = 'bg-gradient-to-b from-slate-900 via-[#0d1527] to-[#020617]';
    spineBg = 'bg-[#030712]';
    sideStripBg = 'bg-rose-500';
    glowColor = 'rgba(244, 63, 94, 0.3)';
    brandTitle = title.includes('bitdefender') ? 'Bitdefender' : (title.includes('norton') ? 'Norton 360' : (title.includes('kaspersky') ? 'Kaspersky' : 'Antivirus'));
    brandEdition = 'Total Protection';
    deviceLimit = '1 Year License';
    cardGraphic = <ShieldIcon color="#f43f5e" />;
    customOverlay = (
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none overflow-hidden">
        {/* Security Cyber Matrix Grid */}
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#ffffff" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    );
    bottomBadge = 'CYBER SECURITY';
  } else if (isDev) {
    // Developer Tools: Dark terminal aesthetic, brackets, green/cyan glow
    coverBg = 'bg-gradient-to-b from-[#0b1329] via-[#020617] to-black';
    spineBg = 'bg-black';
    sideStripBg = 'bg-emerald-500';
    glowColor = 'rgba(16, 185, 129, 0.25)';
    brandTitle = title.includes('jetbrains') ? 'JetBrains' : 'Developer License';
    brandEdition = 'All Products Pack';
    deviceLimit = 'Subscription Key';
    cardGraphic = <CodeIcon />;
    customOverlay = (
      <div className="absolute inset-x-2.5 top-[38%] bottom-6.5 bg-[#020617] border border-emerald-500/15 rounded-xl p-2 flex flex-col justify-between font-mono">
        {/* Code line patterns */}
        <div className="space-y-1 opacity-45">
          <div className="h-1 w-12 bg-emerald-400 rounded-xs" />
          <div className="h-1 w-16 bg-cyan-400 rounded-xs" />
          <div className="h-1 w-8 bg-purple-400 rounded-xs" />
        </div>
      </div>
    );
    bottomBadge = 'DEV SUITE LICENSE';
  } else if (isVPN) {
    // VPN: Encrypted tunnel globe theme
    coverBg = 'bg-gradient-to-b from-[#071d2b] via-[#030d17] to-black';
    spineBg = 'bg-black';
    sideStripBg = 'bg-cyan-500';
    glowColor = 'rgba(6, 182, 212, 0.3)';
    brandTitle = title.includes('nordvpn') ? 'NordVPN' : 'Private VPN';
    brandEdition = 'Secure Tunnel';
    deviceLimit = 'Multi-Device Key';
    cardGraphic = <GlobeIcon />;
    bottomBadge = 'PRIVACY VAULT';
  } else if (isCreative) {
    // Creative Software: Vibrant gradient background, design tools
    coverBg = 'bg-gradient-to-br from-violet-600 via-pink-500 to-amber-500';
    spineBg = 'bg-violet-950';
    sideStripBg = 'bg-pink-400';
    glowColor = 'rgba(236, 72, 153, 0.35)';
    brandTitle = title.includes('adobe') ? 'Adobe CC' : 'Creative Suite';
    brandEdition = 'Master Collection';
    deviceLimit = '1 Year License';
    cardGraphic = <CreativeIcon />;
    bottomBadge = 'CREATIVE CLOUD';
  } else if (isGaming) {
    // Gaming & Gift Cards
    coverBg = 'bg-gradient-to-b from-[#2e1065] via-[#0f052d] to-black';
    spineBg = 'bg-black';
    sideStripBg = 'bg-indigo-500';
    glowColor = 'rgba(99, 102, 241, 0.35)';
    brandTitle = title.includes('steam') ? 'Steam Wallet' : (title.includes('xbox') ? 'Xbox Live' : 'Gift Voucher');
    brandEdition = title.includes('25') ? '$25 Card' : '$50 Card';
    deviceLimit = 'Digital Key Code';
    cardGraphic = <ControllerIcon />;
    bottomBadge = 'GAMING VAULT';
  } else if (isBusiness) {
    // Business & Enterprise: Teal gradient packaging, growing charts
    coverBg = 'bg-gradient-to-b from-[#0f766e] via-[#115e59] to-[#134e4a]';
    spineBg = 'bg-[#0f2e2b]';
    sideStripBg = 'bg-teal-400';
    glowColor = 'rgba(15, 118, 110, 0.3)';
    brandTitle = title.includes('quickbooks') ? 'QuickBooks' : 'Business';
    brandEdition = 'Enterprise';
    deviceLimit = 'Commercial License';
    cardGraphic = <BusinessChartIcon />;
    bottomBadge = 'CORPORATE';
  }

  const isLight = (isWindows && isWin11 && !isPro && !isEnterprise) || isOffice;

  // Render the Premium 3D Box
  return (
    <div 
      className="premium-3d-box-container relative preserve-3d select-none pointer-events-none"
      style={{
        width: `${W}px`,
        height: `${H}px`,
        perspective: '1000px',
        margin: '0 auto',
      }}
    >
      {/* 3D Box Ambient glow shadow backdrop */}
      <div 
        className="absolute inset-0 rounded-2xl blur-2xl opacity-40 transition-all duration-500"
        style={{
          backgroundColor: glowColor,
          transform: `translateZ(-10px) scale(${isHovered ? 1.15 : 0.95})`,
        }}
      />

      {/* 3D Soft Shadow Floor */}
      <div 
        className="absolute rounded-full blur-md transition-all duration-500 bg-black/45"
        style={{
          width: '85%',
          height: '14px',
          bottom: '-12px',
          left: '7.5%',
          transform: `translateZ(-${T/2}px) rotateX(90deg) scale(${isHovered ? 0.85 : 1})`,
          opacity: isHovered ? 0.5 : 0.85,
          boxShadow: '0 10px 20px rgba(0,0,0,0.6)',
        }}
      />

      {/* Box Inner 3D Rotation Wrapper */}
      <div
        className="w-full h-full preserve-3d transition-all duration-500 ease-out"
        style={{
          transform: isHovered 
            ? `rotateY(-14deg) rotateX(3deg) translateY(-10px) scale(1.03)` 
            : `rotateY(-23deg) rotateX(6deg)`,
        }}
      >
        {/* 1. FRONT FACE */}
        <div 
          className={`absolute inset-0 ${coverBg} rounded-xl border border-white/10 overflow-hidden flex flex-col justify-between p-3.5 text-left preserve-3d`}
          style={{
            transform: `translateZ(${T/2}px)`,
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.15), 0 10px 25px rgba(0,0,0,0.2)',
          }}
        >
          {/* Custom Overlay Patterns (Grid patterns/lines) */}
          {customOverlay}

          {/* Top Row: Microsoft Logo + Brand Identifier */}
          <div className="z-10 relative flex items-center space-x-1.5 opacity-90 shrink-0">
            {isWindows || isOffice ? (
              <>
                <MicrosoftLogo />
                <span className={`text-[6px] font-extrabold uppercase tracking-widest ${isLight ? 'text-[#393E46]' : 'text-white/45'}`}>
                  Microsoft
                </span>
              </>
            ) : (
              <>
                <div className={`w-2 h-2 rounded-xs ${isLight ? 'bg-slate-800' : 'bg-white'} flex items-center justify-center p-[1px] shrink-0`}>
                  {cardGraphic}
                </div>
                <span className={`text-[6px] font-extrabold uppercase tracking-widest ${isLight ? 'text-[#393E46]' : 'text-white/45'}`}>
                  {category.split(' ')[0]}
                </span>
              </>
            )}
          </div>

          {/* Upper-Middle Brand Block: Small Logo + Title */}
          <div className="z-10 relative mt-3 space-y-0.5 flex-1">
            <div className="flex items-center space-x-1.5">
              {isWindows ? (
                <div className="h-4.5 w-4.5 shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill={isLight ? '#0078d7' : '#ffffff'} className="h-full w-full opacity-90">
                    <path d="M0 3.449L9.75 2.1v9.45H0V3.449zM0 12.45h9.75v9.45L0 20.551v-8.1zM10.8 1.95L24 0v11.55H10.8V1.95zM10.8 12.45H24v11.55l-13.2-1.95v-9.6z" />
                  </svg>
                </div>
              ) : isOffice ? (
                <div className="h-4.5 w-4.5 shrink-0 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
                    <path d="M12 0L1.5 4.5v15L12 24l10.5-4.5v-15L12 0zm8.5 17.5l-8.5 3.65-8.5-3.65V6.5l8.5-3.65 8.5 3.65v11z" fill="#E45124" />
                    <path d="M12 5.5l6 2.6v7.8l-6 2.6-6-2.6V8.1l6-2.6z" fill="#F25022" />
                    <path d="M10 9h4v6h-4z" fill="#FFF" />
                  </svg>
                </div>
              ) : null}
              <h4 className={`text-xs font-black leading-none uppercase tracking-tight ${isLight ? 'text-[#222831]' : 'text-white'}`}>
                {brandTitle}
              </h4>
            </div>
            <span className={`text-[8px] font-bold block uppercase tracking-widest ${isLight ? 'text-[#0078d7]' : 'text-white/80'} pl-[22px] font-sans italic opacity-95`}>
              {brandEdition}
            </span>
          </div>

          {/* Large Bottom-Right Icon Artwork */}
          <div className="absolute bottom-10 right-3.5 z-0 pointer-events-none opacity-85 select-none">
            {isWindows ? (
              <svg viewBox="0 0 24 24" fill={isLight ? '#0078d7' : '#ffffff'} className="h-16 w-16 drop-shadow-sm">
                <path d="M0 3.449L9.75 2.1v9.45H0V3.449zM0 12.45h9.75v9.45L0 20.551v-8.1zM10.8 1.95L24 0v11.55H10.8V1.95zM10.8 12.45H24v11.55l-13.2-1.95v-9.6z" />
              </svg>
            ) : isOffice ? (
              <svg viewBox="0 0 24 24" fill="none" className="h-16 w-16 drop-shadow-sm">
                <path d="M12 0L1.5 4.5v15L12 24l10.5-4.5v-15L12 0zm8.5 17.5l-8.5 3.65-8.5-3.65V6.5l8.5-3.65 8.5 3.65v11z" fill="#E45124" />
                <path d="M12 5.5l6 2.6v7.8l-6 2.6-6-2.6V8.1l6-2.6z" fill="#F25022" />
                <path d="M10 9h4v6h-4z" fill="#FFF" />
              </svg>
            ) : (
              <div className="scale-[1.3] opacity-90 pr-2 pb-2">
                {cardGraphic}
              </div>
            )}
          </div>

          {/* Bottom details & badges */}
          <div className="space-y-1 z-10 relative mt-auto shrink-0">
            <span className={`inline-block text-[6px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded shadow-xs ${
              isLight 
                ? 'bg-[#EEEEEE] text-[#393E46] border border-slate-300' 
                : 'bg-white/10 text-white border border-white/15'
            }`}>
              {deviceLimit}
            </span>
            
            <div className={`flex justify-between items-center text-[5px] font-bold tracking-widest ${isLight ? 'text-[#393E46]' : 'text-white/45'} border-t ${isLight ? 'border-[#EEEEEE]' : 'border-white/10'} pt-1`}>
              <span>{bottomBadge}</span>
              <span>GENUINE</span>
            </div>
          </div>

          {/* Glossy Plastic Wrapping Reflection sweep layer */}
          <div 
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 45%, rgba(255,255,255,0.02) 45%, rgba(255,255,255,0.12) 100%)',
            }}
          />
        </div>

        {/* 2. RIGHT SIDE FACE (SPINE) */}
        <div 
          className={`absolute top-0 bottom-0 ${spineBg} flex flex-col justify-between py-3.5 items-center`}
          style={{
            width: `${T}px`,
            transform: `translateZ(${T/2}px) rotateY(90deg)`,
            transformOrigin: 'left',
            left: '100%',
            borderLeft: '1px solid rgba(255,255,255,0.08)',
            borderRight: '1px solid rgba(0,0,0,0.4)',
            boxShadow: 'inset -2px 0 6px rgba(0,0,0,0.3)',
          }}
        >
          {/* Vertical text along spine */}
          <div className="flex-1 flex items-center justify-center w-full overflow-hidden">
            <span 
              className="text-[6.5px] font-black tracking-widest uppercase text-white/50 whitespace-nowrap block"
              style={{
                transform: 'rotate(90deg)',
                transformOrigin: 'center',
              }}
            >
              {brandTitle} {brandEdition !== 'Premium Key' && brandEdition !== 'Premium' ? brandEdition : ''}
            </span>
          </div>
          {/* Small white logo at the bottom edge of spine */}
          <div className="h-2 w-2 opacity-50 mt-2 shrink-0">
            {isWindows ? (
              <svg viewBox="0 0 24 24" fill="#ffffff" className="w-full h-full">
                <path d="M0 3.449L9.75 2.1v9.45H0V3.449zM0 12.45h9.75v9.45L0 20.551v-8.1zM10.8 1.95L24 0v11.55H10.8V1.95zM10.8 12.45H24v11.55l-13.2-1.95v-9.6z" />
              </svg>
            ) : isOffice ? (
              <svg viewBox="0 0 24 24" fill="#ffffff" className="w-full h-full">
                <path d="M12 0L1.5 4.5v15L12 24l10.5-4.5v-15L12 0zm8.5 17.5l-8.5 3.65-8.5-3.65V6.5l8.5-3.65 8.5 3.65v11z" />
              </svg>
            ) : (
              <div className="scale-75 text-white flex items-center justify-center">
                {cardGraphic}
              </div>
            )}
          </div>
        </div>

        {/* 3. TOP FACE */}
        <div 
          className={`${spineBg} absolute left-0 right-0`}
          style={{
            height: `${T}px`,
            transform: `translateZ(${T/2}px) rotateX(-90deg)`,
            transformOrigin: 'top',
            top: '0px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            boxShadow: 'inset 0 -2px 6px rgba(255,255,255,0.05)',
          }}
        >
          {/* Glossy top-edge reflection highlight line */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20" />
        </div>
      </div>
    </div>
  );
}
