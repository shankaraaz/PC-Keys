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

  // Responsive sizing classes
  const isLarge = size === 'large' || size === 'card';
  
  // Responsive sizing classes to fit mobile and desktop cards and details modal perfectly
  let containerClasses = 'w-[130px] h-[162px] sm:w-[155px] sm:h-[194px]';
  let spineClasses = 'w-[13px] sm:w-[15px] [transform:rotateY(90deg)_translateZ(129px)] sm:[transform:rotateY(90deg)_translateZ(154px)]';

  if (size === 'large') {
    containerClasses = 'w-[190px] h-[238px] sm:w-[220px] sm:h-[275px]';
    spineClasses = 'w-[18px] sm:w-[21px] [transform:rotateY(90deg)_translateZ(189px)] sm:[transform:rotateY(90deg)_translateZ(219px)]';
  } else if (size === 'card') {
    // Desktop: w-[270px], h-[338px] (perfect 4:5 aspect ratio, 85-95% of desktop card width)
    // Tablet: w-[230px], h-[288px] (85-95% of tablet card width)
    // Mobile: w-[190px], h-[238px] (85-95% of mobile card width)
    containerClasses = 'w-[190px] h-[238px] sm:w-[230px] sm:h-[288px] md:w-[270px] md:h-[338px]';
    spineClasses = 'w-[18px] sm:w-[22px] md:w-[26px] [transform:rotateY(90deg)_translateZ(189px)] sm:[transform:rotateY(90deg)_translateZ(229px)] md:[transform:rotateY(90deg)_translateZ(269px)]';
  }

  // Render Microsoft Logo SVG
  const MicrosoftLogo = () => (
    <svg className={isLarge ? "h-3.5 w-3.5" : "h-3 w-3"} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="11" height="11" fill="#F25022" />
      <rect x="12" y="0" width="11" height="11" fill="#7FBA00" />
      <rect x="0" y="12" width="11" height="11" fill="#01A6F0" />
      <rect x="12" y="12" width="11" height="11" fill="#FFB900" />
    </svg>
  );

  // Render Windows Logo SVG
  const WindowsLogo = ({ color = '#0078D7' }: { color?: string }) => (
    <svg className={`${isLarge ? "h-14 w-14" : "h-10 w-10"} opacity-90 transition-all duration-300`} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M0 3.449L9.75 2.1v9.45H0V3.449zM0 12.45h9.75v9.45L0 20.551v-8.1zM10.8 1.95L24 0v11.55H10.8V1.95zM10.8 12.45H24v11.55l-13.2-1.95v-9.6z" />
    </svg>
  );

  // Render Office Logo SVG
  const OfficeLogo = () => (
    <svg className={isLarge ? "h-14 w-14" : "h-10 w-10"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0L1.5 4.5v15L12 24l10.5-4.5v-15L12 0zm8.5 17.5l-8.5 3.65-8.5-3.65V6.5l8.5-3.65 8.5 3.65v11z" fill="#E45124" />
      <path d="M12 5.5l6 2.6v7.8l-6 2.6-6-2.6V8.1l6-2.6z" fill="#F25022" />
      <path d="M10 9h4v6h-4z" fill="#FFF" />
    </svg>
  );

  // Render Project Logo SVG
  const ProjectLogo = () => (
    <svg className={isLarge ? "h-14 w-14" : "h-10 w-10"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#107C41" />
      <path d="M7 6h10a1 1 0 011 1v10a1 1 0 01-1 1H7a1 1 0 01-1-1V7a1 1 0 01-1-1z" fill="#107C41" />
      <path d="M9 8h6v8H9V8z" fill="#FFF" />
      <text x="12" y="15" fill="#107C41" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">P</text>
    </svg>
  );

  // Render Visio Logo SVG
  const VisioLogo = () => (
    <svg className={isLarge ? "h-14 w-14" : "h-10 w-10"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#0078D4" />
      <path d="M7 6h10a1 1 0 011 1v10a1 1 0 01-1 1H7a1 1 0 01-1-1V7a1 1 0 01-1-1z" fill="#0078D4" />
      <path d="M9 8h6v8H9V8z" fill="#FFF" />
      <text x="12" y="15" fill="#0078D4" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">V</text>
    </svg>
  );

  // Steam Logo SVG
  const SteamLogo = () => (
    <svg className={isLarge ? "h-16 w-16" : "h-12 w-12"} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 .002C5.373.002 0 5.374 0 12c0 5.09 3.172 9.43 7.643 11.206l-1.042-3.64c-.066-.23-.008-.475.144-.648L8.74 16.71c-.08-.344-.122-.7-.122-1.066a3.636 3.636 0 011.054-2.559l2.802-2.8a3.63 3.63 0 012.56-1.053c2.01 0 3.64 1.63 3.64 3.64 0 2.008-1.63 3.638-3.64 3.638-.345 0-.686-.041-1.018-.117l-2.128 3.123c-.158.232-.435.345-.705.281l-3.342-.79c.148.513.398.987.728 1.402a5.952 5.952 0 106.945-8.878 5.95 5.95 0 00-6.944 8.878l1.71 1.71c.216.216.284.539.172.825L9.62 23.856C10.395 23.95 11.19 24 12 24c6.627 0 12-5.373 12-12 0-6.627-5.373-11.998-12-11.998z" />
    </svg>
  );

  // Xbox Logo SVG
  const XboxLogo = () => (
    <svg className={isLarge ? "h-16 w-16" : "h-12 w-12"} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.11 23.51c-2.48-.37-4.78-1.42-6.66-3.05C1.88 18.23.41 15.35.09 12.18c-.06-.57-.04-1.28.05-1.74.32-1.7.99-3.26 2-4.6A11.75 11.75 0 019 1.43c1.45-.4 3-.52 4.45-.33 2.1.28 4.09 1.13 5.75 2.45a11.83 11.83 0 013.9 5.8c.45 1.46.54 3.03.26 4.54a11.82 11.82 0 01-4 6.7 11.66 11.66 0 01-6.7 2.92h-1.55zm.84-1.1c.36-.08.85-.2 1.08-.27.24-.07.41-.12.43-.11.13.06.49-.07.64-.23.16-.17.18-.3.04-.37-.09-.05-.18-.03-.31.05-.14.09-.13.09-.32.03-.4-.14-.54-.3-.41-.53.07-.12.12-.11.45.05.52.26 1 .37 1.43.34a2.22 2.22 0 001.21-.49c.28-.27.32-.42.27-.85-.11-.94-.85-2.28-1.89-3.41a29.83 29.83 0 00-3.32-3.07c-2.02-1.6-4.57-3.04-6.42-3.6l-.37-.11h.41c1.23.01 2.9.52 4.38 1.34 1.35.75 2.72 1.83 3.66 2.87.6.66 1.14 1.42 1.14 1.57 0 .04-.05.02-.12-.05-1.15-1.21-2.61-2.43-3.83-3.21-1.39-.89-3.32-1.63-4.88-1.86h-.5l.39.18c1.33.62 3.16 2.03 4.47 3.44.82.88 1.63 2.04 1.95 2.76.1.24.16.42.12.42-.03 0-.15-.12-.27-.26-1.18-1.42-2.71-2.8-4.04-3.63a14.28 14.28 0 00-3.64-1.63c-.41-.11-.47-.1-.31.05.77.72 1.94 2.22 2.65 3.4 1.07 1.77 1.8 3.59 2.05 5.12.06.34.12.87.14 1.18.04.48.01.62-.16.64-.13.01-.22-.05-.41-.24-1.54-1.57-3.05-3.66-3.81-5.26-.52-1.11-.93-2.31-1.12-3.27-.04-.2-.08-.34-.09-.31 0 .1.22.84.44 1.48.51 1.47 1.36 3.17 2.38 4.75 1.4 2.18 3.2 4.19 4.7 5.25.32.23.49.32.74.37.28.05.3.05.53-.01z" />
    </svg>
  );

  // PlayStation Logo SVG
  const PlayStationLogo = () => (
    <svg className={isLarge ? "h-16 w-16" : "h-12 w-12"} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.32 14.735c-.092-.267.018-.62.336-.783a48.741 48.741 0 015.424-2.147l.083.256c-1.393.592-3.155 1.31-4.484 2.015-.494.263-1.037.493-1.359.66zM24 16.738l-.16-.361a40.384 40.384 0 00-7.05-1.936l-.08.286c1.782.388 4.29 1.108 5.79 1.83.67.323 1.173.543 1.5.181zm-11.96-6.402c-.046-.063-.092-.128-.138-.194-.282-.4-.537-.768-.737-1.078l-1.383-.343a41.026 41.026 0 00-3.328-.616l.163-.383a15.454 15.454 0 012.775.498c.184-.11.385-.23.6-.363a15.203 15.203 0 012.56-.123l.115.347c-.636-.057-1.364.004-2.02.164.242.348.528.784.823 1.258.411.66.822 1.393 1.168 2.083l-.54.251zm-1.815 4.316l.102.327c-.89.155-2.032.336-3.136.471-.854.104-1.636.191-2.227.24a4.91 4.91 0 00-1.874.457c-.244.135-.373.344-.373.597l-.022 1.096-.062-.016a1.354 1.354 0 01.378-1.022c.31-.301.888-.52 1.644-.65 1.066-.184 2.875-.411 4.275-.54.341-.031.787-.07 1.291-.11v-.85h.004zm2.146-.425c.34-.143.682-.294 1.025-.453l-.113-.357a39.117 39.117 0 00-6.195 2.11l.056.242c1.758-.553 4.02-1.184 5.227-1.542zm6.27-.406a46.21 46.21 0 00-5.717.39l.064.286c1.698-.22 3.963-.424 5.253-.415.535.004.81.042.802.162.004.143-.378.361-1.002.628l-.025.21c1.375-.503 1.957-.991 1.951-1.36-.01-.482-.628-.686-1.326-.9zM12.1 4.23c-.35-.55-.65-1.02-1.12-1.74l-.45.21c.54.85.93 1.48 1.25 2.04l.32-.51zm-.51-1.02c-.31-.5-.65-.91-.93-1.34l-.42.2a19.78 19.78 0 011.05 1.64l.3-.5zM12 0l-1.05 1.54c-.16-.32-.42-.71-.56-1l-.43.19A31.62 31.62 0 0111.41.97L12 0z" />
    </svg>
  );

  // Google Play Logo SVG
  const GooglePlayLogo = () => (
    <svg className={isLarge ? "h-16 w-16" : "h-12 w-12"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.3 1.15c-.15.17-.23.45-.23.82v19.98c0 .37.08.65.23.82l.1.1L12.5 12l.1-.1L1.4 1.05l-.1.1z" fill="#00E676" />
      <path d="M16.2 15.7l-3.6-3.6-.1-.1-3.6-3.6-5.1 5.1c.15.15.42.17.72.07l10.9-6.2c.3-.18.6-.18.7.02z" fill="#FF3D00" />
      <path d="M16.2 8.3L3.8 1.23c-.3-.18-.57-.15-.72-.02l5.1 5.1 3.6 3.6 3.6-3.6c.1.1.1.1.1 0z" fill="#FFC107" />
      <path d="M22.5 11.9l-5-2.8-1.3-.8-3.7 3.7 3.7 3.7 1.3-.8 5-2.8c.6-.35.6-1.15 0-1.5z" fill="#1976D2" />
    </svg>
  );

  // Apple Logo SVG
  const AppleLogo = () => (
    <svg className={isLarge ? "h-16 w-16" : "h-12 w-12"} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.21.67-2.93 1.49-.62.69-1.16 1.84-1.01 2.96 1.12.09 2.27-.56 2.95-1.39z" />
    </svg>
  );

  // Render Brand Icon based on the product
  const renderBrandIcon = () => {
    if (title.includes('steam')) return <SteamLogo />;
    if (title.includes('xbox')) return <XboxLogo />;
    if (title.includes('playstation') || title.includes('psn')) return <PlayStationLogo />;
    if (title.includes('google play') || title.includes('play store')) return <GooglePlayLogo />;
    if (title.includes('apple') || title.includes('itunes')) return <AppleLogo />;
    
    if (title.includes('project')) return <ProjectLogo />;
    if (title.includes('visio')) return <VisioLogo />;
    if (title.includes('office') || title.includes('365') || title.includes('m365')) return <OfficeLogo />;
    if (title.includes('server')) return <WindowsLogo color="#0078D7" />;
    if (title.includes('windows') || title.includes('win11') || title.includes('win10')) return <WindowsLogo color="#ffffff" />;
    
    // Antivirus Symbols
    if (title.includes('bitdefender')) {
      return (
        <div className={`${isLarge ? 'w-16 h-16 text-2xl' : 'w-12 h-12 text-xl'} rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-500 font-extrabold tracking-tighter shadow-sm`}>
          B
        </div>
      );
    }
    if (title.includes('norton')) {
      return (
        <div className={`${isLarge ? 'w-16 h-16 text-2xl' : 'w-12 h-12 text-xl'} rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500 font-extrabold shadow-sm`}>
          N
        </div>
      );
    }
    if (title.includes('kaspersky')) {
      return (
        <div className={`${isLarge ? 'w-16 h-16 text-2xl' : 'w-12 h-12 text-xl'} rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 font-extrabold shadow-sm`}>
          K
        </div>
      );
    }
    if (title.includes('mcafee')) {
      return (
        <div className={`${isLarge ? 'w-16 h-16 text-2xl' : 'w-12 h-12 text-xl'} rounded-xl bg-red-600/10 border border-red-500/20 flex items-center justify-center text-red-600 font-black shadow-sm`}>
          M
        </div>
      );
    }
    if (title.includes('eset')) {
      return (
        <div className={`${isLarge ? 'w-16 h-16 text-2xl' : 'w-12 h-12 text-xl'} rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-extrabold shadow-sm`}>
          E
        </div>
      );
    }

    // Creative / Dev Tools
    if (title.includes('adobe') || title.includes('photoshop') || title.includes('illustrator') || title.includes('premiere')) {
      return (
        <div className={`${isLarge ? 'w-16 h-16 text-2xl' : 'w-12 h-12 text-xl'} rounded-xl bg-red-600 border border-red-500 flex items-center justify-center text-white font-black shadow-sm`}>
          Ad
        </div>
      );
    }
    if (title.includes('jetbrains') || title.includes('intellij')) {
      return (
        <div className={`${isLarge ? 'w-16 h-16 text-2xl' : 'w-12 h-12 text-xl'} rounded-xl bg-black border border-purple-500/30 flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-tr from-yellow-400 via-pink-500 to-cyan-400 font-extrabold shadow-sm`}>
          JB
        </div>
      );
    }

    return (
      <div className={`${isLarge ? 'w-16 h-16 text-2xl' : 'w-12 h-12 text-xl'} rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-extrabold shadow-sm`}>
        L
      </div>
    );
  };

  // Determine specific layout theme categories
  const isWindowsServer = title.includes('server');
  const isWindowsDesktop = (title.includes('windows') || title.includes('win11') || title.includes('win10')) && !isWindowsServer;
  const isOffice = title.includes('office') || title.includes('365') || title.includes('m365');
  const isProject = title.includes('project');
  const isVisio = title.includes('visio');
  const isAntivirus = title.includes('bitdefender') || title.includes('norton') || title.includes('kaspersky') || title.includes('mcafee') || title.includes('eset') || title.includes('quick heal') || title.includes('security') || title.includes('antivirus');
  const isAdobe = title.includes('adobe') || title.includes('photoshop') || title.includes('illustrator') || title.includes('premiere');
  const isJetBrains = title.includes('jetbrains') || title.includes('intellij');
  
  // Gift Card category
  const isSteam = title.includes('steam');
  const isXbox = title.includes('xbox');
  const isPlayStation = title.includes('playstation') || title.includes('psn');
  const isGooglePlay = title.includes('google play') || title.includes('play store');
  const isApple = title.includes('apple') || title.includes('itunes');
  const isGiftCard = isSteam || isXbox || isPlayStation || isGooglePlay || isApple;

  // VPN category
  const isNordVPN = title.includes('nordvpn');
  const isExpressVPN = title.includes('expressvpn');
  const isSurfshark = title.includes('surfshark');
  const isVPN = isNordVPN || isExpressVPN || isSurfshark;

  // Render original Windows Retail boxes with their distinctive brand-accurate colors
  if (isWindowsDesktop) {
    const isWin11 = title.includes('11') || title.includes('win11');
    const isWin10 = !isWin11;
    const isPro = title.includes('pro') || title.includes('professional');
    const isEnterprise = title.includes('enterprise') || title.includes('ent') || title.includes('volume');

    let coverBg = 'bg-white';
    let spineBg = '#0078D7';
    let spineBorderColor = '#005a9e';
    let bottomBandBg = 'bg-[#0078D7]';
    let textColor = 'text-gray-800 font-sans';
    let subtitleColor = 'text-[#005a9e]';
    let logoColor = '#0078D7';
    let badgeClasses = 'bg-blue-50 text-blue-600 border border-blue-100';
    let isDarkTheme = false;

    if (isWin11 && isPro) {
      // Windows 11 Pro: Famous Royal Blue / Deep Navy box
      coverBg = 'bg-gradient-to-b from-[#0a5c9e] via-[#004b87] to-[#003460]';
      spineBg = '#003460';
      spineBorderColor = '#001e38';
      bottomBandBg = 'bg-[#001e38]';
      textColor = 'text-white font-sans';
      subtitleColor = 'text-blue-200';
      logoColor = '#ffffff';
      badgeClasses = 'bg-white/10 text-blue-200 border border-white/15';
      isDarkTheme = true;
    } else if (isWin11 && isEnterprise) {
      // Windows 11 Enterprise: Cyber Slate/Teal Charcoal box
      coverBg = 'bg-gradient-to-b from-[#1c2429] via-[#0f1416] to-[#050708]';
      spineBg = '#050708';
      spineBorderColor = '#000000';
      bottomBandBg = 'bg-[#14b8a6]/20 border-t border-[#14b8a6]/30';
      textColor = 'text-white font-sans';
      subtitleColor = 'text-teal-300';
      logoColor = '#14b8a6';
      badgeClasses = 'bg-teal-500/10 text-teal-300 border border-teal-500/20';
      isDarkTheme = true;
    } else if (isWin10 && isPro) {
      // Windows 10 Pro: Famous Royal Indigo / Deep Purple box
      coverBg = 'bg-gradient-to-b from-[#401362] via-[#240b3a] to-[#12051d]';
      spineBg = '#12051d';
      spineBorderColor = '#000000';
      bottomBandBg = 'bg-[#401362]/40';
      textColor = 'text-white font-sans';
      subtitleColor = 'text-purple-200';
      logoColor = '#ffffff';
      badgeClasses = 'bg-purple-500/15 text-purple-300 border border-purple-500/20';
      isDarkTheme = true;
    } else if (isWin10 && !isPro) {
      // Windows 10 Home: Vibrant Sky Blue / Cyan box
      coverBg = 'bg-gradient-to-b from-[#00b0f0] via-[#0070c0] to-[#004b80]';
      spineBg = '#004b80';
      spineBorderColor = '#003154';
      bottomBandBg = 'bg-[#003154]';
      textColor = 'text-white font-sans';
      subtitleColor = 'text-blue-100';
      logoColor = '#ffffff';
      badgeClasses = 'bg-white/10 text-white border border-white/15';
      isDarkTheme = true;
    } else {
      // Windows 11 Home: Original White/Cyan design
      coverBg = 'bg-white';
      spineBg = '#0078D7';
      spineBorderColor = '#005a9e';
      bottomBandBg = 'bg-[#0078D7]';
      textColor = 'text-gray-800 font-sans';
      subtitleColor = 'text-[#005a9e]';
      logoColor = '#00a2ed';
      badgeClasses = 'bg-blue-50 text-blue-600 border border-blue-100';
    }

    return (
      <div className={`${containerClasses} relative preserve-3d flex items-center justify-center transition-all duration-300`}>
        {/* Main Box Cover */}
        <div className={`relative w-full h-full ${coverBg} rounded-lg shadow-[0_12px_28px_rgba(0,0,0,0.65)] border border-white/10 overflow-hidden z-10 flex flex-col justify-between ${isLarge ? 'p-5' : 'p-3.5'} text-left select-none`}>
          {/* Header */}
          <div className="space-y-1">
            <div className="flex items-center space-x-1">
              <MicrosoftLogo />
              <span className={`text-[6px] sm:text-[7.5px] font-bold tracking-widest uppercase ${isDarkTheme ? 'text-white/40' : 'text-gray-400'}`}>Microsoft</span>
            </div>
            <h4 className={`${isLarge ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'} font-black tracking-tight leading-none uppercase`}>
              Windows {isWin11 ? '11' : '10'}
            </h4>
            <h5 className={`${isLarge ? 'text-[11px] sm:text-[12px]' : 'text-[8.5px] sm:text-[9.5px]'} font-bold ${subtitleColor} leading-none uppercase tracking-widest`}>
              {isEnterprise ? 'Enterprise' : (isPro ? 'Professional' : 'Home Edition')}
            </h5>
          </div>

          {/* Center Graphic */}
          <div className={`absolute ${isLarge ? 'right-4 bottom-14' : 'right-2.5 bottom-12'} opacity-90 scale-110`}>
            <WindowsLogo color={logoColor} />
          </div>

          {/* Badge & Bottom details */}
          <div className="space-y-2 z-10">
            <div className={`inline-block ${badgeClasses} text-[6.5px] sm:text-[7.5px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded shadow-sm`}>
              Lifetime Activation
            </div>
            <p className={`text-[6.5px] sm:text-[7.5px] font-bold tracking-wider ${isDarkTheme ? 'text-white/50' : 'text-gray-400'}`}>
              License Key for 1 PC
            </p>
          </div>

          {/* Bottom band */}
          <div className={`absolute bottom-0 left-0 right-0 ${bottomBandBg} ${isLarge ? 'h-4.5' : 'h-3.5'} px-3 flex items-center justify-between z-10`}>
            <span className="text-[5px] sm:text-[6px] font-bold text-white tracking-widest uppercase">RETAIL LICENSE</span>
            <span className="text-[5px] sm:text-[6px] font-bold text-white tracking-widest uppercase">32/64-Bit</span>
          </div>
        </div>

        {/* 3D Box Spine */}
        <div 
          style={{ backgroundColor: spineBg, borderColor: spineBorderColor }}
          className={`absolute top-0 right-0 h-full border-y border-r origin-left rounded-r-sm shadow-inner z-0 pointer-events-none opacity-95 transition-all duration-300 ${spineClasses}`} 
        />
      </div>
    );
  }

  // Render Microsoft Office Boxes
  if (isOffice) {
    const is2024 = title.includes('2024');
    const is2021 = title.includes('2021');
    const is365 = title.includes('365') || title.includes('m365');
    const isFamily = title.includes('family');
    const isBusiness = title.includes('biz') || title.includes('business');

    let coverBg = 'bg-white';
    let spineBg = '#d23f13';
    let spineBorderColor = '#b1330e';
    let ribbonBg = 'bg-[#e45124] text-white border-b border-orange-700';
    let textColor = 'text-gray-800 font-sans';
    let subtitleColor = 'text-gray-500';
    let logoColor = '#E45124';
    let isDarkTheme = false;

    if (is365) {
      if (isBusiness) {
        // Business: Slate Blue / Cyan gradient
        coverBg = 'bg-gradient-to-br from-[#0078d4] via-[#005a9e] to-[#004b87]';
        spineBg = '#004b87';
        spineBorderColor = '#00355f';
        ribbonBg = 'bg-white text-[#005a9e] border-b border-blue-100';
        textColor = 'text-white';
        subtitleColor = 'text-blue-100';
        isDarkTheme = true;
      } else if (isFamily) {
        // Family: Purple / Orange hybrid premium gradient
        coverBg = 'bg-gradient-to-br from-[#4c1f7a] via-[#8c2d82] to-[#e45124]';
        spineBg = '#3c1363';
        spineBorderColor = '#250842';
        ribbonBg = 'bg-white text-[#8c2d82] border-b border-purple-100';
        textColor = 'text-white';
        subtitleColor = 'text-purple-100';
        isDarkTheme = true;
      } else {
        // Personal: Iconic full Orange-Yellow gradient
        coverBg = 'bg-gradient-to-br from-[#e03e11] via-[#e45124] to-[#f47c20]';
        spineBg = '#b8340d';
        spineBorderColor = '#942605';
        ribbonBg = 'bg-white text-[#e45124] border-b border-orange-100';
        textColor = 'text-white';
        subtitleColor = 'text-orange-100';
        isDarkTheme = true;
      }
    } else if (is2024 || is2021) {
      // Classic White with Premium Orange ribbon
      coverBg = 'bg-white';
      spineBg = '#d23f13';
      spineBorderColor = '#b1330e';
      ribbonBg = 'bg-[#e45124] text-white border-b border-orange-700';
    }

    return (
      <div className={`${containerClasses} relative preserve-3d flex items-center justify-center transition-all duration-300`}>
        {/* Main Box Cover */}
        <div className={`relative w-full h-full ${coverBg} rounded-lg shadow-[0_12px_28px_rgba(0,0,0,0.65)] border border-white/10 overflow-hidden z-10 flex flex-col justify-between ${isLarge ? 'p-5' : 'p-3.5'} text-left select-none`}>
          {/* Top Office Icon */}
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isDarkTheme ? 'bg-white' : 'bg-[#f25022]'}`} />
              <span className={`text-[6px] sm:text-[7.5px] font-bold tracking-widest uppercase ${isDarkTheme ? 'text-white/40' : 'text-gray-400'}`}>Microsoft</span>
            </div>
            <div className="opacity-95">
              <OfficeLogo />
            </div>
          </div>

          {/* Core Title Info */}
          <div className="space-y-1 my-1">
            <h4 className={`${isLarge ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'} font-black tracking-tighter leading-none uppercase ${textColor}`}>
              Office {is365 ? '365' : (is2024 ? '2024' : '2021')}
            </h4>
            <h5 className={`${isLarge ? 'text-[9.5px] sm:text-[11px]' : 'text-[7.5px] sm:text-[8.5px]'} font-black leading-none uppercase tracking-wider ${subtitleColor}`}>
              {is365 ? (isFamily ? 'Family Shared' : (isBusiness ? 'Business Standard' : 'Personal 1-Year')) : 'Professional Plus'}
            </h5>
          </div>

          {/* Red/Orange/White Ribbon Badge */}
          <div className={`${ribbonBg} text-[6.5px] sm:text-[7.5px] font-black tracking-widest uppercase py-1 px-2 text-center rounded-sm my-1 shadow-sm leading-none`}>
            {is365 ? 'KEY ANNUAL LICENSE' : 'KEY LIFETIME LICENSE'}
          </div>

          {/* Bottom Row with device icon */}
          <div className={`flex justify-between items-end border-t ${isDarkTheme ? 'border-white/10' : 'border-gray-100'} pt-2 z-10`}>
            <div className={`flex items-center space-x-1.5 ${isDarkTheme ? 'text-white/70' : 'text-gray-600'}`}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="2.5" />
                <path d="M8 21h8M12 17v4" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <span className="text-[7px] sm:text-[8px] font-bold tracking-tight">
                {is365 ? (isFamily ? '6 Users' : '5 Devices') : '1 PC'}
              </span>
            </div>
            <span className={`text-[5px] sm:text-[6px] font-bold tracking-wider uppercase ${isDarkTheme ? 'text-white/40' : 'text-gray-400'}`}>Genuine Activation</span>
          </div>
        </div>

        {/* 3D Box Spine */}
        <div 
          style={{ backgroundColor: spineBg, borderColor: spineBorderColor }}
          className={`absolute top-0 right-0 h-full border-y border-r origin-left rounded-r-sm shadow-inner z-0 pointer-events-none opacity-95 transition-all duration-300 ${spineClasses}`} 
        />
      </div>
    );
  }

  // Render Gaming & Gift Card Boxes (Beautifully customized for each platform!)
  if (isGiftCard) {
    let coverBg = 'bg-neutral-900';
    let spineBg = '#1c1c1c';
    let spineBorderColor = '#111111';
    let brandText = 'GIFT CARD';
    let valueText = '$50';
    let brandColor = 'text-white';
    let accentLineBg = 'bg-blue-500';

    if (isSteam) {
      coverBg = 'bg-gradient-to-b from-[#1b2838] via-[#171a21] to-[#0b0c0f]';
      spineBg = '#171a21';
      spineBorderColor = '#0b0c0f';
      brandText = 'Steam Wallet';
      valueText = title.includes('25') ? '$25' : '$50';
      brandColor = 'text-white';
      accentLineBg = 'bg-gradient-to-r from-cyan-500 to-blue-500';
    } else if (isXbox) {
      coverBg = 'bg-gradient-to-b from-[#107c10] via-[#0b540b] to-[#042004]';
      spineBg = '#0b540b';
      spineBorderColor = '#042004';
      brandText = 'XBOX LIVE';
      valueText = title.includes('25') ? '$25' : '$50';
      brandColor = 'text-white';
      accentLineBg = 'bg-[#107c10]';
    } else if (isPlayStation) {
      coverBg = 'bg-gradient-to-b from-[#003087] via-[#001c4e] to-[#000d24]';
      spineBg = '#001c4e';
      spineBorderColor = '#000d24';
      brandText = 'PLAYSTATION';
      valueText = title.includes('25') ? '$25' : '$50';
      brandColor = 'text-white';
      accentLineBg = 'bg-sky-400';
    } else if (isGooglePlay) {
      coverBg = 'bg-gradient-to-b from-white via-neutral-50 to-neutral-100';
      spineBg = '#e5e5e5';
      spineBorderColor = '#cccccc';
      brandText = 'Google Play';
      valueText = title.includes('25') ? '$25' : '$50';
      brandColor = 'text-gray-800';
      accentLineBg = 'bg-gradient-to-r from-[#4285F4] via-[#34A853] to-[#EA4335]';
    } else if (isApple) {
      coverBg = 'bg-gradient-to-b from-[#2d2d2d] via-[#1a1a1a] to-black';
      spineBg = '#1a1a1a';
      spineBorderColor = '#0d0d0d';
      brandText = 'Apple Store';
      valueText = title.includes('25') ? '$25' : '$50';
      brandColor = 'text-white';
      accentLineBg = 'bg-white';
    }

    const isLightCard = isGooglePlay;

    return (
      <div className={`${containerClasses} relative preserve-3d flex items-center justify-center transition-all duration-300`}>
        {/* Main Box Cover */}
        <div className={`relative w-full h-full ${coverBg} rounded-lg shadow-[0_12px_28px_rgba(0,0,0,0.65)] border border-white/10 overflow-hidden z-10 flex flex-col justify-between ${isLarge ? 'p-5' : 'p-3.5'} text-left select-none`}>
          {/* Header */}
          <div className="space-y-0.5">
            <span className={`text-[6px] sm:text-[7px] font-black tracking-widest uppercase ${isLightCard ? 'text-gray-400' : 'text-white/40'}`}>DIGITAL VOUCHER</span>
            <h4 className={`${isLarge ? 'text-base sm:text-lg' : 'text-xs sm:text-sm'} font-black tracking-tight leading-none uppercase ${brandColor}`}>
              {brandText}
            </h4>
          </div>

          {/* Logo container */}
          <div className="flex justify-center my-1">
            {renderBrandIcon()}
          </div>

          {/* Value Display */}
          <div className="text-center space-y-1.5 z-10">
            <p className={`${isLarge ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'} font-black leading-none font-mono ${isLightCard ? 'text-gray-900' : 'text-white'} tracking-tighter`}>
              {valueText}
            </p>
            <div className={`h-[3px] w-12 mx-auto ${accentLineBg} rounded-full`} />
            <p className={`text-[6px] sm:text-[7px] font-black tracking-widest uppercase ${isLightCard ? 'text-gray-500' : 'text-white/60'}`}>
              US REGION ONLY
            </p>
          </div>

          {/* Footer details */}
          <div className={`border-t ${isLightCard ? 'border-gray-200' : 'border-white/10'} pt-2 flex justify-between items-center text-[5.5px] sm:text-[6.5px] font-bold ${isLightCard ? 'text-gray-500' : 'text-white/40'} tracking-wider uppercase`}>
            <span>INSTANT CODE</span>
            <span>SECURE VAULT</span>
          </div>
        </div>

        {/* 3D Box Spine */}
        <div 
          style={{ backgroundColor: spineBg, borderColor: spineBorderColor }}
          className={`absolute top-0 right-0 h-full border-y border-r origin-left rounded-r-sm shadow-inner z-0 pointer-events-none opacity-95 transition-all duration-300 ${spineClasses}`} 
        />
      </div>
    );
  }

  // Render Antivirus & Security
  if (isAntivirus) {
    const isBitdefender = title.includes('bitdefender');
    const isNorton = title.includes('norton');
    const isKaspersky = title.includes('kaspersky');
    const isMcAfee = title.includes('mcafee');
    const isESET = title.includes('eset');
    
    let primaryBg = 'bg-gradient-to-b from-slate-900 to-slate-950';
    let brandText = 'ANTIVIRUS';
    let brandColor = 'text-white';
    let spineBg = '#0f172a';
    let spineBorderColor = '#020617';
    let accentBg = 'bg-slate-700 text-white border-slate-600';

    if (isBitdefender) {
      primaryBg = 'bg-gradient-to-b from-[#1a1111] via-[#110808] to-[#070303]';
      brandText = 'Bitdefender';
      brandColor = 'text-red-500';
      spineBg = '#1a0505';
      spineBorderColor = '#0a0101';
      accentBg = 'bg-red-500/10 text-red-400 border-red-500/20';
    } else if (isNorton) {
      primaryBg = 'bg-gradient-to-b from-slate-950 via-neutral-900 to-[#1c170c]';
      brandText = 'Norton 360';
      brandColor = 'text-yellow-500';
      spineBg = '#b28f00';
      spineBorderColor = '#806600';
      accentBg = 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    } else if (isKaspersky) {
      primaryBg = 'bg-gradient-to-b from-slate-950 via-teal-950 to-black';
      brandText = 'Kaspersky';
      brandColor = 'text-teal-400';
      spineBg = '#0f3a33';
      spineBorderColor = '#092520';
      accentBg = 'bg-teal-500/10 text-teal-300 border-teal-500/20';
    } else if (isMcAfee) {
      primaryBg = 'bg-gradient-to-b from-red-950 via-neutral-950 to-black';
      brandText = 'McAfee';
      brandColor = 'text-red-500';
      spineBg = '#7f1d1d';
      spineBorderColor = '#450a0a';
      accentBg = 'bg-red-500/10 text-red-400 border-red-500/20';
    } else if (isESET) {
      primaryBg = 'bg-gradient-to-b from-emerald-950 via-slate-950 to-black';
      brandText = 'ESET NOD32';
      brandColor = 'text-emerald-400';
      spineBg = '#064e3b';
      spineBorderColor = '#022c22';
      accentBg = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    }

    return (
      <div className={`${containerClasses} relative preserve-3d flex items-center justify-center transition-all duration-300`}>
        {/* Main Box Cover */}
        <div className={`relative w-full h-full ${primaryBg} rounded-lg shadow-[0_12px_28px_rgba(0,0,0,0.65)] border border-white/10 overflow-hidden z-10 flex flex-col justify-between ${isLarge ? 'p-5' : 'p-3.5'} text-left select-none text-white`}>
          {/* Header */}
          <div className="space-y-0.5">
            <span className="text-[6px] sm:text-[7px] font-bold text-white/40 tracking-widest uppercase block">Security Suite</span>
            <h4 className={`text-sm sm:text-base font-black ${brandColor} tracking-tight leading-none font-sans uppercase`}>
              {brandText}
            </h4>
            <h5 className="text-[8.5px] sm:text-[9.5px] font-bold text-white/70 leading-none uppercase tracking-wide">
              {title.includes('deluxe') ? 'Deluxe 360' : (title.includes('total') ? 'Total Security' : 'Premium Guard')}
            </h5>
          </div>

          {/* Center Graphic Icon */}
          <div className="flex justify-center my-1 opacity-90 scale-95">
            {renderBrandIcon()}
          </div>

          {/* Details & Accent Badge */}
          <div className="space-y-2 z-10">
            <div className={`${accentBg} text-[6.5px] sm:text-[7.5px] font-bold tracking-widest uppercase py-1 px-2 rounded text-center backdrop-blur-sm shadow-xs border`}>
              Instant Delivery
            </div>
            <p className="text-[6.5px] sm:text-[7.5px] font-semibold text-white/50 tracking-wider text-center uppercase">
              1 Year • Multi-Device
            </p>
          </div>
        </div>

        {/* 3D Box Spine */}
        <div 
          style={{ backgroundColor: spineBg, borderColor: spineBorderColor }}
          className={`absolute top-0 right-0 h-full border-y border-r origin-left rounded-r-sm shadow-inner z-0 pointer-events-none opacity-95 transition-all duration-300 ${spineClasses}`} 
        />
      </div>
    );
  }

  // Render Project / Visio Boxes (Clean style with distinct side stripes)
  if (isProject || isVisio) {
    const is2024 = title.includes('2024');
    const is2021 = title.includes('2021');
    const isProject6 = title.includes('2016');
    const accentColor = isProject ? '#107C41' : '#0078D4';
    const accentColorDark = isProject ? '#0c5c30' : '#005a9e';

    // Special dark green Project 2016 style from attached user image
    if (isProject && isProject6) {
      return (
        <div className={`${containerClasses} relative preserve-3d flex items-center justify-center transition-all duration-300`}>
          {/* Main Box Cover (Deep Green background) */}
          <div className={`relative w-full h-full bg-gradient-to-br from-[#107C41] to-[#0c5c30] rounded-lg shadow-[0_12px_28px_rgba(0,0,0,0.65)] border border-white/10 overflow-hidden z-10 flex flex-col justify-between ${isLarge ? 'p-5' : 'p-3.5'} text-left select-none text-white`}>
            <div className="space-y-0.5">
              <span className="text-[6px] sm:text-[7px] font-bold text-white/50 tracking-widest uppercase block">Microsoft</span>
              <h4 className="text-sm sm:text-base font-bold tracking-tight leading-none font-sans uppercase">
                Project
              </h4>
              <h5 className="text-[10px] sm:text-[11px] font-light text-white/80 leading-none">
                2016 Professional
              </h5>
            </div>

            {/* Central White box icon */}
            <div className="flex justify-center my-1.5">
              <div className="bg-white p-2 rounded-lg shadow-md flex items-center justify-center">
                <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 4h16v16H4V4z" fill="#107C41" />
                  <text x="12" y="16" fill="#FFF" fontSize="13" fontWeight="black" textAnchor="middle" fontFamily="sans-serif">P</text>
                </svg>
              </div>
            </div>

            {/* Accent white band */}
            <div className="bg-white text-[#107C41] text-[7.5px] sm:text-[8.5px] font-black tracking-widest uppercase py-1 text-center rounded-sm leading-none shadow-sm font-sans">
              License Key
            </div>

            {/* Bottom details */}
            <div className="text-center">
              <p className="text-[7px] sm:text-[8px] font-bold tracking-wider text-white/80 uppercase">
                1 PC • Lifetime Access
              </p>
            </div>
          </div>

          {/* 3D Box Spine */}
          <div className={`absolute top-0 right-0 h-full bg-[#0c5c30] border-y border-r border-[#083e20] origin-left rounded-r-sm shadow-inner z-0 pointer-events-none opacity-95 transition-all duration-300 ${spineClasses}`} />
        </div>
      );
    }

    return (
      <div className={`${containerClasses} relative preserve-3d flex items-center justify-center transition-all duration-300`}>
        {/* Main Box Cover (White style with brand icon) */}
        <div className={`relative w-full h-full bg-white rounded-lg shadow-[0_12px_28px_rgba(0,0,0,0.65)] border border-white/10 overflow-hidden z-10 flex flex-col justify-between ${isLarge ? 'p-5' : 'p-3.5'} text-left select-none`}>
          {/* Header */}
          <div className="space-y-0.5">
            <div className="flex items-center space-x-1">
              <MicrosoftLogo />
              <span className="text-[6px] sm:text-[7.5px] font-bold text-gray-400 tracking-widest uppercase">Microsoft</span>
            </div>
            <h4 className="text-sm sm:text-base font-semibold text-gray-800 tracking-tight leading-tight uppercase font-sans">
              {isProject ? 'Project' : 'Visio'} {is2024 ? '2024' : (is2021 ? '2021' : '2019')}
            </h4>
            <h5 className="text-[9px] sm:text-[10px] font-bold text-gray-400 leading-none uppercase">
              Professional
            </h5>
          </div>

          {/* Center Brand Icon Right / Bottom */}
          <div className="absolute right-2.5 bottom-12 shadow-sm rounded-lg overflow-hidden">
            {isProject ? <ProjectLogo /> : <VisioLogo />}
          </div>

          {/* Details & Accent band */}
          <div className="space-y-1.5 z-10">
            {/* Bottom Accent Band */}
            <div 
              style={{ backgroundColor: accentColor }} 
              className="text-white text-[7.5px] sm:text-[8.5px] font-black tracking-widest uppercase py-1 px-2 rounded-sm text-center shadow-xs"
            >
              1 PC • Lifetime Access
            </div>
            <p className="text-[6px] sm:text-[7px] font-bold text-gray-400 tracking-wider text-center block uppercase">
              [BIND LICENSE]
            </p>
          </div>
        </div>

        {/* 3D Box Spine */}
        <div 
          style={{ backgroundColor: accentColorDark, borderColor: accentColorDark }} 
          className={`absolute top-0 right-0 h-full border-y border-r origin-left rounded-r-sm shadow-inner z-0 pointer-events-none opacity-95 transition-all duration-300 ${spineClasses}`} 
        />
      </div>
    );
  }

  // Fallback default premium design for JetBrains, Adobe, or other applications
  const isSubscription = title.includes('subscription') || title.includes('365') || title.includes('cc') || title.includes('pack');
  const accentGradient = isAdobe 
    ? 'from-[#ff0000] to-[#aa0000]' 
    : (isJetBrains ? 'from-[#a22bfb] to-[#12032e]' : 'from-[#0078D7] to-[#005a9e]');

  return (
    <div className={`${containerClasses} relative preserve-3d flex items-center justify-center transition-all duration-300`}>
      {/* Main Box Cover */}
      <div className={`relative w-full h-full bg-gradient-to-b from-[#111111] to-black rounded-lg shadow-[0_12px_28px_rgba(0,0,0,0.65)] border border-white/10 overflow-hidden z-10 flex flex-col justify-between ${isLarge ? 'p-5' : 'p-3.5'} text-left select-none text-white`}>
        {/* Header */}
        <div className="space-y-0.5">
          <span className="text-[6px] sm:text-[7px] font-bold text-white/35 tracking-widest uppercase block">Software Key</span>
          <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-none uppercase font-sans truncate">
            {product.title.split(' ')[0]} {product.title.split(' ')[1] || ''}
          </h4>
          <p className="text-[7.5px] sm:text-[8.5px] text-white/60 truncate leading-none uppercase">
            {product.category}
          </p>
        </div>

        {/* Center icon */}
        <div className="flex justify-center my-1">
          {renderBrandIcon()}
        </div>

        {/* Details & Accent band */}
        <div className="space-y-2 z-10">
          <div className={`bg-gradient-to-r ${accentGradient} text-white text-[7.5px] sm:text-[8.5px] font-black tracking-widest uppercase py-1 px-2 rounded-sm text-center shadow-xs`}>
            {isSubscription ? 'Annual License' : 'Lifetime Access'}
          </div>
          <p className="text-[6.5px] sm:text-[7px] font-bold text-white/40 tracking-wider text-center block uppercase">
            Instant Delivery Key
          </p>
        </div>
      </div>

      {/* 3D Box Spine */}
      <div className={`absolute top-0 right-0 h-full bg-[#1c1c1c] border-y border-r border-[#111111] origin-left rounded-r-sm shadow-inner z-0 pointer-events-none opacity-95 transition-all duration-300 ${spineClasses}`} />
    </div>
  );
}
