import React, { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  setDoc,
  doc,
  query,
  where,
  orderBy,
  addDoc
} from 'firebase/firestore';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import {
  Key,
  ShieldCheck,
  Sparkles,
  ShoppingCart,
  Search,
  User as UserIcon,
  Mail,
  ArrowRight,
  Zap,
  MessageSquare,
  Star,
  X,
  Monitor,
  FileText,
  Palette,
  Terminal,
  Globe,
  Gamepad2,
  Building2,
  Clock,
  Apple
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Components
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductDetailsModal from './components/ProductDetailsModal';
import CartDrawer from './components/CartDrawer';
import CheckoutPage from './components/CheckoutPage';
import OrdersPage from './components/OrdersPage';
import AdminPanel from './components/AdminPanel';
import SupportPage from './components/SupportPage';

// Libs & Types
import { db, auth, handleFirestoreError, OperationType } from './lib/firebase';
import { Product, CartItem, Order, Category, Coupon, InventoryKey, RefundRequest, Customer } from './types';
import { SEEDED_PRODUCTS } from './data';
import { searchProducts, getDidYouMeanQuery, logSearchAnalytics } from './lib/search';

// Premium Vector Illustrations for Category Bento Cards
const WindowsIllustration = () => (
  <svg className="w-full h-full" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="winG" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.9" />
      </linearGradient>
      <linearGradient id="winSpec" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="white" stopOpacity="0.4" />
        <stop offset="100%" stopColor="white" stopOpacity="0.0" />
      </linearGradient>
      <filter id="winGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="3" dy="6" stdDeviation="5" floodColor="#1d4ed8" floodOpacity="0.25" />
      </filter>
    </defs>
    <g filter="url(#winGlow)">
      {/* Top Left Block */}
      <rect x="25" y="25" width="31" height="31" rx="4" fill="url(#winG)" />
      <rect x="25" y="25" width="31" height="31" rx="4" fill="url(#winSpec)" />
      {/* Top Right Block */}
      <rect x="62" y="25" width="31" height="31" rx="4" fill="url(#winG)" />
      <rect x="62" y="25" width="31" height="31" rx="4" fill="url(#winSpec)" />
      {/* Bottom Left Block */}
      <rect x="25" y="62" width="31" height="31" rx="4" fill="url(#winG)" />
      <rect x="25" y="62" width="31" height="31" rx="4" fill="url(#winSpec)" />
      {/* Bottom Right Block */}
      <rect x="62" y="62" width="31" height="31" rx="4" fill="url(#winG)" />
      <rect x="62" y="62" width="31" height="31" rx="4" fill="url(#winSpec)" />
    </g>
  </svg>
);

const OfficeIllustration = () => (
  <svg className="w-full h-full" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="offRed" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff6b4a" />
        <stop offset="100%" stopColor="#dc2626" />
      </linearGradient>
      <linearGradient id="offOr" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fb923c" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
      <filter id="offGlow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="#ea580c" floodOpacity="0.25" />
      </filter>
    </defs>
    <g filter="url(#offGlow)">
      {/* Background card sheet */}
      <rect x="42" y="32" width="46" height="56" rx="8" fill="url(#offRed)" />
      <rect x="42" y="32" width="46" height="56" rx="8" stroke="white" strokeWidth="1.5" strokeOpacity="0.2" />
      {/* Foreground floating sheet */}
      <rect x="32" y="42" width="46" height="46" rx="8" fill="url(#offOr)" stroke="white" strokeWidth="1.5" strokeOpacity="0.4" />
      {/* Inner stylized Office 'O' */}
      <circle cx="55" cy="65" r="10" stroke="white" strokeWidth="3" fill="none" />
    </g>
  </svg>
);

const SecurityIllustration = () => (
  <svg className="w-full h-full" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="secG" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#34d399" />
        <stop offset="100%" stopColor="#059669" />
      </linearGradient>
      <filter id="secGlow" x="-15%" y="-15%" width="130%" height="130%">
        <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="#059669" floodOpacity="0.25" />
      </filter>
    </defs>
    <g filter="url(#secGlow)">
      {/* Main Shield */}
      <path d="M60 22 C82 27 88 38 88 56 C88 74 60 88 60 88 C60 88 32 74 32 56 C32 38 38 27 60 22 Z" fill="url(#secG)" />
      <path d="M60 22 C82 27 88 38 88 56 C88 74 60 88 60 88 C60 88 32 74 32 56 C32 38 38 27 60 22 Z" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" />
      {/* Concentric protective rings */}
      <path d="M60 32 C74 36 78 44 78 56 C78 68 60 77 60 77 C60 77 42 68 42 56 C42 44 46 36 60 32 Z" stroke="white" strokeWidth="1.5" strokeDasharray="4 3" strokeOpacity="0.6" fill="none" />
      {/* Checkmark inside */}
      <path d="M50 56 L57 63 L70 48" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  </svg>
);

const CreativeIllustration = () => (
  <svg className="w-full h-full" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="crG1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
      <linearGradient id="crG2" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f43f5e" />
        <stop offset="100%" stopColor="#d946ef" />
      </linearGradient>
      <filter id="crGlow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="#8b5cf6" floodOpacity="0.25" />
      </filter>
    </defs>
    <g filter="url(#crGlow)">
      {/* Ribbon 1 */}
      <path d="M25 65 C40 30 70 85 95 45 C80 80 50 25 25 65 Z" fill="url(#crG1)" />
      {/* Ribbon 2 */}
      <path d="M35 75 C50 40 80 95 105 55 C90 90 60 35 35 75 Z" fill="url(#crG2)" opacity="0.8" />
      {/* Art tools background circles */}
      <circle cx="45" cy="35" r="4" fill="#a78bfa" />
      <circle cx="75" cy="30" r="5" fill="#f472b6" />
      <circle cx="85" cy="70" r="3" fill="#c084fc" />
    </g>
  </svg>
);

const DeveloperIllustration = () => (
  <svg className="w-full h-full" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="devG" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>
      <filter id="devGlow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="#0d9488" floodOpacity="0.2" />
      </filter>
    </defs>
    <g filter="url(#devGlow)">
      {/* Terminal Window frame */}
      <rect x="25" y="30" width="70" height="55" rx="6" fill="url(#devG)" stroke="#334155" strokeWidth="1.5" />
      {/* Header Bar */}
      <rect x="25" y="30" width="70" height="12" rx="6" fill="#1e293b" />
      {/* Window dots */}
      <circle cx="32" cy="36" r="2" fill="#ef4444" />
      <circle cx="38" cy="36" r="2" fill="#f59e0b" />
      <circle cx="44" cy="36" r="2" fill="#10b981" />
      {/* Code syntax lines */}
      <path d="M32 50 L38 54 L32 58" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="43" y1="54" x2="52" y2="54" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="32" y1="64" x2="48" y2="64" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="52" y1="64" x2="68" y2="64" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="32" y1="72" x2="60" y2="72" stroke="#e2e8f0" strokeWidth="1.5" strokeLinecap="round" />
    </g>
  </svg>
);

const VpnIllustration = () => (
  <svg className="w-full h-full" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="vpnG" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#0284c7" />
      </linearGradient>
      <filter id="vpnGlow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="#0284c7" floodOpacity="0.25" />
      </filter>
    </defs>
    <g filter="url(#vpnGlow)">
      {/* Network Grid Globe */}
      <circle cx="60" cy="55" r="32" stroke="url(#vpnG)" strokeWidth="1.5" strokeOpacity="0.3" fill="none" />
      <circle cx="60" cy="55" r="32" fill="url(#vpnG)" fillOpacity="0.05" />
      <ellipse cx="60" cy="55" rx="32" ry="12" stroke="url(#vpnG)" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
      <ellipse cx="60" cy="55" rx="12" ry="32" stroke="url(#vpnG)" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
      <line x1="28" y1="55" x2="92" y2="55" stroke="url(#vpnG)" strokeWidth="1.5" strokeOpacity="0.4" />
      {/* Secure lock overlaid in center-right */}
      <g transform="translate(62, 50)">
        <rect x="2" y="10" width="20" height="15" rx="3" fill="#0284c7" stroke="white" strokeWidth="1.5" />
        <path d="M7 10 v-4 a5 5 0 0 1 10 0 v4" stroke="white" strokeWidth="1.5" fill="none" />
      </g>
    </g>
  </svg>
);

const GamingIllustration = () => (
  <svg className="w-full h-full" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gameG" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f472b6" />
        <stop offset="100%" stopColor="#db2777" />
      </linearGradient>
      <filter id="gameGlow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="#db2777" floodOpacity="0.25" />
      </filter>
    </defs>
    <g filter="url(#gameGlow)" transform="translate(20, 30)">
      {/* Controller Body */}
      <path d="M 12 15 L 68 15 C 78 15 82 22 80 38 L 74 62 C 72 68 64 68 56 60 L 50 54 L 30 54 L 24 60 C 16 68 8 68 6 62 L 0 38 C -2 22 2 15 12 15 Z" fill="url(#gameG)" />
      <path d="M 12 15 L 68 15 C 78 15 82 22 80 38 L 74 62 C 72 68 64 68 56 60 L 50 54 L 30 54 L 24 60 C 16 68 8 68 6 62 L 0 38 C -2 22 2 15 12 15 Z" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" fill="none" />
      {/* D-Pad */}
      <path d="M 16 35 h 8 v -4 h 4 v 4 h 8 v 4 h -8 v 4 h -4 v -4 h -8 Z" fill="white" />
      {/* Buttons */}
      <circle cx="62" cy="33" r="3.5" fill="white" />
      <circle cx="70" cy="41" r="3.5" fill="white" />
      <circle cx="54" cy="41" r="3.5" fill="white" />
      <circle cx="62" cy="49" r="3.5" fill="white" />
      {/* Joysticks */}
      <circle cx="28" cy="46" r="6" fill="#be185d" />
      <circle cx="52" cy="46" r="6" fill="#be185d" />
    </g>
  </svg>
);

const BusinessIllustration = () => (
  <svg className="w-full h-full" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bizG" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2dd4bf" />
        <stop offset="100%" stopColor="#0f766e" />
      </linearGradient>
      <filter id="bizGlow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="#0f766e" floodOpacity="0.25" />
      </filter>
    </defs>
    <g filter="url(#bizGlow)">
      {/* Grid lines */}
      <line x1="25" y1="80" x2="95" y2="80" stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1="25" y1="60" x2="95" y2="60" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="25" y1="40" x2="95" y2="40" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
      {/* Chart Bars */}
      <rect x="30" y="55" width="10" height="25" rx="2" fill="url(#bizG)" />
      <rect x="46" y="45" width="10" height="35" rx="2" fill="url(#bizG)" />
      <rect x="62" y="32" width="10" height="48" rx="2" fill="url(#bizG)" />
      <rect x="78" y="20" width="10" height="60" rx="2" fill="url(#bizG)" />
      {/* Overlay growth trend line */}
      <path d="M 35 60 L 51 48 L 67 36 L 83 22" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <circle cx="83" cy="22" r="5" fill="#f59e0b" stroke="white" strokeWidth="1.5" />
    </g>
  </svg>
);

const premiumCategories = [
  {
    id: 'Microsoft Windows Keys' as Category,
    name: 'Windows Keys',
    icon: Monitor,
    badge: 'POPULAR',
    bgClass: (isActive: boolean) => isActive
      ? 'bg-[#EFF6FF] border-[#3B82F6] shadow-[0_8px_30px_rgba(59,130,246,0.12)]'
      : 'bg-[#EFF6FF]/65 border-[#EFF6FF] hover:bg-[#EFF6FF]/90 hover:border-[#BFDBFE] hover:shadow-[0_8px_25px_rgba(59,130,246,0.06)]',
    iconColorClass: 'text-blue-500',
    badgeClass: 'bg-[#EFF6FF] border-[#BFDBFE]/60 text-blue-600',
    illustration: WindowsIllustration
  },
  {
    id: 'Microsoft Office Keys' as Category,
    name: 'Office Keys',
    icon: FileText,
    badge: 'BEST SELLER',
    bgClass: (isActive: boolean) => isActive
      ? 'bg-[#FFF7ED] border-[#F97316] shadow-[0_8px_30px_rgba(249,115,22,0.12)]'
      : 'bg-[#FFF7ED]/65 border-[#FFF7ED] hover:bg-[#FFF7ED]/90 hover:border-[#FED7AA] hover:shadow-[0_8px_25px_rgba(249,115,22,0.06)]',
    iconColorClass: 'text-orange-500',
    badgeClass: 'bg-[#FFF7ED] border-[#FED7AA]/60 text-orange-600',
    illustration: OfficeIllustration
  },
  {
    id: 'Antivirus & Security' as Category,
    name: 'Antivirus & Security',
    icon: ShieldCheck,
    badge: 'ESSENTIAL',
    bgClass: (isActive: boolean) => isActive
      ? 'bg-[#F0FDF4] border-[#10B981] shadow-[0_8px_30px_rgba(16,185,129,0.12)]'
      : 'bg-[#F0FDF4]/65 border-[#F0FDF4] hover:bg-[#F0FDF4]/90 hover:border-[#A7F3D0] hover:shadow-[0_8px_25px_rgba(16,185,129,0.06)]',
    iconColorClass: 'text-emerald-500',
    badgeClass: 'bg-[#F0FDF4] border-[#A7F3D0]/60 text-emerald-600',
    illustration: SecurityIllustration
  },
  {
    id: 'Creative & Professional Software' as Category,
    name: 'Creative Software',
    icon: Palette,
    badge: 'TRENDING',
    bgClass: (isActive: boolean) => isActive
      ? 'bg-[#FAF5FF] border-[#8B5CF6] shadow-[0_8px_30px_rgba(139,92,246,0.12)]'
      : 'bg-[#FAF5FF]/65 border-[#FAF5FF] hover:bg-[#FAF5FF]/90 hover:border-[#E9D5FF] hover:shadow-[0_8px_25px_rgba(139,92,246,0.06)]',
    iconColorClass: 'text-purple-500',
    badgeClass: 'bg-[#FAF5FF] border-[#E9D5FF]/60 text-purple-600',
    illustration: CreativeIllustration
  },
  {
    id: 'Developer Tools' as Category,
    name: 'Developer Tools',
    icon: Terminal,
    badge: 'PRO',
    bgClass: (isActive: boolean) => isActive
      ? 'bg-[#F0FDFA] border-[#0D9488] shadow-[0_8px_30px_rgba(13,148,136,0.12)]'
      : 'bg-[#F0FDFA]/65 border-[#F0FDFA] hover:bg-[#F0FDFA]/90 hover:border-[#99F6E4] hover:shadow-[0_8px_25px_rgba(13,148,136,0.06)]',
    iconColorClass: 'text-teal-500',
    badgeClass: 'bg-[#F0FDFA] border-[#99F6E4]/60 text-teal-600',
    illustration: DeveloperIllustration
  },
  {
    id: 'VPN & Privacy' as Category,
    name: 'VPN & Privacy',
    icon: Globe,
    badge: 'SECURE',
    bgClass: (isActive: boolean) => isActive
      ? 'bg-[#F0F9FF] border-[#0EA5E9] shadow-[0_8px_30px_rgba(14,165,233,0.12)]'
      : 'bg-[#F0F9FF]/65 border-[#F0F9FF] hover:bg-[#F0F9FF]/90 hover:border-[#BAE6FD] hover:shadow-[0_8px_25px_rgba(14,165,233,0.06)]',
    iconColorClass: 'text-sky-500',
    badgeClass: 'bg-[#F0F9FF] border-[#BAE6FD]/60 text-sky-600',
    illustration: VpnIllustration
  },
  {
    id: 'Gaming & Gift Cards' as Category,
    name: 'Gaming & Gift Cards',
    icon: Gamepad2,
    badge: 'HOT',
    bgClass: (isActive: boolean) => isActive
      ? 'bg-[#FDF2F8] border-[#EC4899] shadow-[0_8px_30px_rgba(236,72,153,0.12)]'
      : 'bg-[#FDF2F8]/65 border-[#FDF2F8] hover:bg-[#FDF2F8]/90 hover:border-[#FBCFE8] hover:shadow-[0_8px_25px_rgba(236,72,153,0.06)]',
    iconColorClass: 'text-pink-500',
    badgeClass: 'bg-[#FDF2F8] border-[#FBCFE8]/60 text-pink-600',
    illustration: GamingIllustration
  },
  {
    id: 'Business & Enterprise Licenses' as Category,
    name: 'Business & Enterprise',
    icon: Building2,
    badge: 'CORPORATE',
    bgClass: (isActive: boolean) => isActive
      ? 'bg-[#F0FDF4] border-[#0F766E] shadow-[0_8px_30px_rgba(15,118,110,0.12)]'
      : 'bg-[#F0FDF4]/65 border-[#F0FDF4] hover:bg-[#F0FDF4]/90 hover:border-[#A7F3D0] hover:shadow-[0_8px_25px_rgba(15,118,110,0.06)]',
    iconColorClass: 'text-teal-700',
    badgeClass: 'bg-[#F0FDF4] border-[#A7F3D0]/60 text-teal-700',
    illustration: BusinessIllustration
  }
];

export default function App() {
  // Auth state
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [demoUser, setDemoUser] = useState<{ name: string; email: string; uid: string } | null>(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [demoLoginName, setDemoLoginName] = useState('');
  const [demoLoginEmail, setDemoLoginEmail] = useState('');
  const [demoLoginEmailError, setDemoLoginEmailError] = useState('');

  // Products and Catalog state
  const [products, setProducts] = useState<Product[]>(SEEDED_PRODUCTS); // Fallback to memory list
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Navigation state
  const [activeTab, setActiveTab] = useState<'catalog' | 'orders' | 'checkout' | 'admin' | 'support'>('catalog');
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  // Status Alerts
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Countdown timer for XBOX Game Pass Flash Deal in Hero Section
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 45, seconds: 12 });
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

  const handlePromoClick = (categoryName: Category, query?: string) => {
    setSelectedCategory(categoryName);
    if (query !== undefined) {
      setSearchQuery(query);
    }
    const element = document.getElementById('store-catalog-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper to generate keys
  const generateInitialInventoryKeys = (prods: Product[]): InventoryKey[] => {
    const keys: InventoryKey[] = [];
    prods.forEach(p => {
      for (let i = 1; i <= 4; i++) {
        let keyStr = '';
        if (
          p.category === 'Microsoft Windows Keys' ||
          p.category === 'Microsoft Office Keys' ||
          p.category === 'Antivirus & Security' ||
          p.category === 'Developer Tools' ||
          p.category === 'Business & Enterprise Licenses'
        ) {
          keyStr = `${Math.random().toString(36).substr(2, 5)}-${Math.random().toString(36).substr(2, 5)}-${Math.random().toString(36).substr(2, 5)}-${Math.random().toString(36).substr(2, 5)}-${Math.random().toString(36).substr(2, 5)}`.toUpperCase();
        } else if (p.category === 'VPN & Privacy') {
          keyStr = `SUB-${p.id.toUpperCase()}-${Math.random().toString(36).substr(2, 12).toUpperCase()}`;
        } else {
          keyStr = `GIFT-${p.id.toUpperCase().replace('-USD', '')}-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}-${Math.random().toString(36).substr(2, 4)}`.toUpperCase();
        }
        keys.push({
          id: `key_${p.id}_${i}_${Math.random().toString(36).substr(2, 5)}`,
          productId: p.id,
          productTitle: p.title,
          keyString: keyStr,
          status: 'available'
        });
      }
    });
    return keys;
  };

  // State definitions for Admin operations
  const [inventoryKeys, setInventoryKeys] = useState<InventoryKey[]>(() => {
    const saved = localStorage.getItem('netlyra_inventory_keys');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return generateInitialInventoryKeys(SEEDED_PRODUCTS);
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('netlyra_coupons');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      { id: 'cp1', code: 'NETLYRA10', discountType: 'percent', discountValue: 10, minOrderAmount: 0, active: true },
      { id: 'cp2', code: 'SAVE20', discountType: 'percent', discountValue: 20, minOrderAmount: 2499, active: true },
      { id: 'cp3', code: 'OFF500', discountType: 'fixed', discountValue: 500, minOrderAmount: 999, active: true },
    ];
  });

  const [refundRequests, setRefundRequests] = useState<RefundRequest[]>(() => {
    const saved = localStorage.getItem('netlyra_refund_requests');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      { id: 'ref_1', orderId: 'TXN_982143', customerName: 'Amit Sharma', customerEmail: 'amit.sharma@gmail.com', reason: 'Purchased Windows Server Standard instead of Pro key', status: 'pending', amount: 49.99, requestedAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString() },
      { id: 'ref_2', orderId: 'TXN_712401', customerName: 'Priya Patel', customerEmail: 'priya.patel@outlook.com', reason: 'Netflix UHD subscription profile password did not work', status: 'pending', amount: 3.49, requestedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString() },
    ];
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('netlyra_customers');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      { uid: 'cust_1', name: 'Amit Sharma', email: 'amit.sharma@gmail.com', phone: '+91 98765 43210', createdAt: new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString(), status: 'active', totalOrders: 4, totalSpent: 124.95 },
      { uid: 'cust_2', name: 'Priya Patel', email: 'priya.patel@outlook.com', phone: '+91 99988 77766', createdAt: new Date(Date.now() - 15 * 24 * 3600 * 1000).toISOString(), status: 'active', totalOrders: 2, totalSpent: 38.48 },
      { uid: 'cust_3', name: 'Rahul Verma', email: 'rahul.verma@yahoo.com', createdAt: new Date(Date.now() - 5 * 24 * 3600 * 1000).toISOString(), status: 'active', totalOrders: 1, totalSpent: 14.99 },
    ];
  });

  // Local Storage Sync Effects
  useEffect(() => {
    localStorage.setItem('netlyra_inventory_keys', JSON.stringify(inventoryKeys));
  }, [inventoryKeys]);

  useEffect(() => {
    localStorage.setItem('netlyra_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('netlyra_refund_requests', JSON.stringify(refundRequests));
  }, [refundRequests]);

  useEffect(() => {
    localStorage.setItem('netlyra_customers', JSON.stringify(customers));
  }, [customers]);

  // Product Administration Handlers
  const handleAddProduct = (newProd: Product) => {
    setProducts(prev => [newProd, ...prev]);
    triggerAlert("Product created successfully", "success");
    if (auth.currentUser) {
      setDoc(doc(db, 'products', newProd.id), newProd).catch(e => handleFirestoreError(e, OperationType.WRITE, 'products'));
    }
  };

  const handleUpdateProduct = (updatedProd: Product) => {
    setProducts(prev => prev.map(p => p.id === updatedProd.id ? updatedProd : p));
    triggerAlert("Product updated successfully", "success");
    if (auth.currentUser) {
      setDoc(doc(db, 'products', updatedProd.id), updatedProd).catch(e => handleFirestoreError(e, OperationType.WRITE, 'products'));
    }
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    triggerAlert("Product removed", "success");
  };

  // Coupon Admin Handlers
  const handleAddCoupon = (newCp: Coupon) => {
    setCoupons(prev => [newCp, ...prev]);
    triggerAlert(`Promo Code ${newCp.code} deployed`, "success");
  };

  const handleDeleteCoupon = (couponId: string) => {
    setCoupons(prev => prev.filter(c => c.id !== couponId));
    triggerAlert("Promo Code revoked", "success");
  };

  // Key Inventory RESTOCK Handlers
  const handleAddInventoryKeys = (productId: string, keys: string[]) => {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;
    const newKeys: InventoryKey[] = keys.map(keyStr => ({
      id: `key_${productId}_${Math.random().toString(36).substr(2, 9)}`,
      productId,
      productTitle: prod.title,
      keyString: keyStr,
      status: 'available'
    }));
    setInventoryKeys(prev => [...newKeys, ...prev]);

    // Update product stock level!
    setProducts(prevProducts => prevProducts.map(p => {
      if (p.id === productId) {
        const updated = { ...p, stock: p.stock + keys.length };
        if (auth.currentUser) {
          setDoc(doc(db, 'products', p.id), updated).catch(e => console.error(e));
        }
        return updated;
      }
      return p;
    }));
    triggerAlert(`Appended ${keys.length} keys to stock!`, "success");
  };

  // LICENSE KEY AUTO DELIVERY SYSTEM ENGINE
  // This satisfies the critical workflow:
  // "Customer payment karega -> available key database se ek key pick karega -> key customer ko email karega (simulated) -> order dashboard me show karega -> key ko sold mark karega"
  const handleAllocateKeys = (productId: string, qty: number, userEmail: string, orderId: string): string[] => {
    const pool = inventoryKeys.filter(k => k.productId === productId && k.status === 'available');
    const allocatedKeys: string[] = [];

    // Copy current state
    let availableCount = pool.length;
    let poolIndex = 0;

    // Pick keys
    for (let i = 0; i < qty; i++) {
      if (poolIndex < availableCount) {
        allocatedKeys.push(pool[poolIndex].keyString);
        poolIndex++;
      } else {
        // Fallback generator if pool runs out, keeping checkout experience seamless
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const segment = () => Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        const generatedKey = `AUTO-${segment()}-${segment()}-${segment()}`;
        allocatedKeys.push(generatedKey);
      }
    }

    // Update keys state to mark them as sold!
    setInventoryKeys(prevKeys => prevKeys.map(k => {
      const matchIndex = pool.findIndex(pk => pk.id === k.id);
      if (k.productId === productId && k.status === 'available' && matchIndex >= 0 && matchIndex < poolIndex) {
        // This key has been selected & allocated
        return {
          ...k,
          status: 'sold',
          orderId,
          soldToEmail: userEmail,
          soldAt: new Date().toISOString()
        };
      }
      return k;
    }));

    // Decrement the product's stock count
    setProducts(prevProducts => prevProducts.map(p => {
      if (p.id === productId) {
        const updated = { ...p, stock: Math.max(0, p.stock - qty) };
        if (auth.currentUser) {
          setDoc(doc(db, 'products', p.id), updated).catch(e => console.error(e));
        }
        return updated;
      }
      return p;
    }));

    return allocatedKeys;
  };

  // Order Operations Handlers
  const handleUpdateOrderStatus = (orderId: string, status: 'pending' | 'completed' | 'failed') => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    triggerAlert(`Order status marked as ${status}`, "success");
  };

  // Refund Claims Operations Handlers
  const handleProcessRefund = (refundId: string, status: 'approved' | 'rejected') => {
    setRefundRequests(prev => prev.map(r => r.id === refundId ? { ...r, status } : r));
    const request = refundRequests.find(r => r.id === refundId);
    if (request && status === 'approved') {
      // Find the associated order and fail/refund it
      setOrders(prevOrders => prevOrders.map(o => {
        if (o.id === request.orderId || o.paymentDetails?.transactionId === request.orderId) {
          return { ...o, status: 'failed' };
        }
        return o;
      }));
    }
    triggerAlert(`Refund request was ${status}!`, "success");
  };

  // Customer Management Handlers
  const handleToggleCustomerStatus = (uid: string) => {
    setCustomers(prev => prev.map(c => {
      if (c.uid === uid) {
        const nextStatus = c.status === 'active' ? 'banned' : 'active';
        return { ...c, status: nextStatus };
      }
      return c;
    }));
    triggerAlert("Customer profile restriction updated", "success");
  };

  // Get effective UID & info
  const currentUserId = user?.uid || demoUser?.uid || null;
  const currentUserEmail = user?.email || demoUser?.email || null;

  // Track Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        setDemoUser(null); // Clear demo if signed in officially
        triggerAlert(`Welcome back, ${firebaseUser.displayName || 'User'}!`, 'success');
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch / Seed Products inside Firestore
  useEffect(() => {
    async function loadProducts() {
      setIsLoadingProducts(true);
      const path = 'products';
      try {
        const querySnapshot = await getDocs(collection(db, path));
        if (querySnapshot.empty) {
          console.log("Firestore products collection is empty. Seeding products...");
          // Only seed if authenticated to avoid permission errors
          if (auth.currentUser) {
            for (const prod of SEEDED_PRODUCTS) {
              await setDoc(doc(db, path, prod.id), prod);
            }
          }
          setProducts(SEEDED_PRODUCTS);
        } else {
          const loaded: Product[] = [];
          querySnapshot.forEach((doc) => {
            loaded.push(doc.data() as Product);
          });
          setProducts(loaded);
        }
      } catch (err) {
        console.warn("Could not load products from Firestore (using local fallback data):", err);
        setProducts(SEEDED_PRODUCTS);
        handleFirestoreError(err, OperationType.GET, path);
      } finally {
        setIsLoadingProducts(false);
      }
    }
    loadProducts();
  }, []);

  // Fetch orders from Firestore for the active user
  useEffect(() => {
    if (!currentUserId) {
      setOrders([]);
      return;
    }

    // Support local persistence for demo/guest users who are unauthenticated
    if (currentUserId.startsWith('demo_user_') || currentUserId.startsWith('guest_')) {
      const saved = localStorage.getItem(`orders_${currentUserId}`);
      if (saved) {
        try {
          setOrders(JSON.parse(saved));
        } catch (e) {
          console.error("Error parsing local orders:", e);
          setOrders([]);
        }
      } else {
        setOrders([]);
      }
      return;
    }

    async function loadOrders() {
      setIsLoadingOrders(true);
      const path = 'orders';
      try {
        const q = query(
          collection(db, path),
          where('userId', '==', currentUserId)
        );
        const querySnapshot = await getDocs(q);
        const fetched: Order[] = [];
        querySnapshot.forEach((docSnap) => {
          fetched.push({
            id: docSnap.id,
            ...docSnap.data()
          } as Order);
        });

        // Sort orders descending locally by date
        fetched.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setOrders(fetched);
      } catch (err) {
        console.error("Error loading user orders:", err);
        handleFirestoreError(err, OperationType.LIST, path);
      } finally {
        setIsLoadingOrders(false);
      }
    }
    loadOrders();
  }, [currentUserId]);

  // Alert handler
  const triggerAlert = (message: string, type: 'success' | 'error') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3500);
  };

  // Google authentication flow
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setLoginModalOpen(false);
    } catch (error) {
      console.error("Google sign in failure:", error);
      triggerAlert("Google login was cancelled or blocked by iframe restrictions.", "error");
    }
  };

  // Demo guest log in
  const handleDemoLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!demoLoginName.trim() || !demoLoginEmail.trim()) {
      triggerAlert("Please enter both Name and Email for the demo login", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(demoLoginEmail.trim())) {
      setDemoLoginEmailError("Please enter a valid email address");
      triggerAlert("Please provide a correctly formatted email address", "error");
      return;
    }

    const mockUid = 'demo_user_' + Math.floor(Math.random() * 100000);
    setDemoUser({
      name: demoLoginName.trim(),
      email: demoLoginEmail.trim(),
      uid: mockUid
    });
    setDemoLoginEmailError('');
    setLoginModalOpen(false);
    triggerAlert(`Logged in as Demo User: ${demoLoginName}`, 'success');
  };

  // Log out flow
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setDemoUser(null);
      setActiveTab('catalog');
      triggerAlert("Logged out successfully.", "success");
    } catch (error) {
      console.error(error);
    }
  };

  // Add to Shopping Cart
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        triggerAlert(`Updated ${product.title} quantity in Cart.`, 'success');
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      triggerAlert(`Added ${product.title} to Cart!`, 'success');
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) return;
    setCart((prevCart) =>
      prevCart.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
    triggerAlert("Item removed from cart.", "success");
  };

  // Push completed Order to Firestore
  const handlePostOrderToFirestore = async (orderPayload: Omit<Order, 'id' | 'createdAt'>) => {
    const path = 'orders';

    // For local demo/guest users who are unauthenticated, throw to trigger CheckoutPage local fallback
    if (currentUserId && (currentUserId.startsWith('demo_user_') || currentUserId.startsWith('guest_'))) {
      throw new Error("Demo/guest user is not authenticated; storing locally instead.");
    }

    try {
      const docRef = await addDoc(collection(db, path), {
        ...orderPayload,
        createdAt: new Date().toISOString(),
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
      throw error;
    }
  };

  const handleOrderFinished = (newOrder: Order) => {
    setCart([]); // Clear cart
    // Push new order to local state list immediately
    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      if (currentUserId && (currentUserId.startsWith('demo_user_') || currentUserId.startsWith('guest_'))) {
        localStorage.setItem(`orders_${currentUserId}`, JSON.stringify(updated));
      }
      return updated;
    });
    triggerAlert("Checkout successfully complete!", "success");
  };

  // Advanced Search Engine query, filter and ranking
  const searchResults = searchProducts(searchQuery, products, selectedCategory);
  const filteredProducts = searchResults.map(res => res.product);

  // Search analytics logging effect with debounce
  useEffect(() => {
    const q = searchQuery.trim();
    if (!q) return;

    const delayDebounceFn = setTimeout(() => {
      logSearchAnalytics(q, filteredProducts.length, currentUserId);
    }, 2000); // 2 second settle time to avoid logging half-typed terms

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, filteredProducts.length, currentUserId]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const categoriesList: Category[] = [
    'All',
    'Microsoft Windows Keys',
    'Microsoft Office Keys',
    'Antivirus & Security',
    'Creative & Professional Software',
    'Developer Tools',
    'VPN & Privacy',
    'Gaming & Gift Cards',
    'Business & Enterprise Licenses'
  ];

  return (
    <div className="min-h-screen bg-[#0B1120] text-[#CBD5E1] font-sans flex flex-col selection:bg-[#0EA5B7] selection:text-white" id="main-app">

      {/* Toast Alert Banner */}
      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-2.5 px-5 py-3 rounded-2xl shadow-xl text-white font-medium text-xs tracking-wider uppercase border ${alert.type === 'success'
              ? 'bg-[#1E293B]/95 text-white border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
              : 'bg-rose-950/90 text-rose-200 border-rose-500/30 shadow-black/55'
              }`}
            id="toast-notification"
          >
            <Sparkles className="h-4.5 w-4.5 shrink-0 text-brand-teal" />
            <span>{alert.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Store Navigation Header */}
      <Navbar
        user={user}
        demoUser={demoUser}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        onLoginClick={() => setLoginModalOpen(true)}
        onLogoutClick={handleLogout}
        onTabChange={(tab) => {
          if (tab === 'orders' && !currentUserId) {
            setLoginModalOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        activeTab={activeTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        products={products}
      />

      {/* Primary Views Route Handling */}
      <main className="flex-grow pb-16">
        {activeTab === 'catalog' && (
          <div id="catalog-view" className="space-y-12">

            {/* Elegant Hero Banner */}
            <div className="relative bg-[#F8FAFC] overflow-hidden py-16 sm:py-20 border-b border-[#E2E8F0]" id="hero-banner">
              {/* Abstract decorative grid */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(rgba(14,165,183,0.1)_1.2px,transparent_1.2px)] [background-size:16px_16px]" />
              <div className="absolute -top-40 -right-40 h-[450px] w-[450px] bg-[#0EA5B7]/5 rounded-full blur-3xl" />
              <div className="absolute -bottom-40 -left-40 h-[450px] w-[450px] bg-[#7C3AED]/5 rounded-full blur-3xl" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-between">

                  {/* LEFT SIDE (existing content) */}
                  <div className="w-full lg:w-[45%] shrink-0 space-y-6">
                    <div className="inline-flex items-center space-x-2 bg-white border border-[#E2E8F0] px-3.5 py-1.5 rounded-full shadow-xs">
                      <Sparkles className="h-4 w-4 text-[#7C3AED]" />
                      <span className="text-slate-700 text-[9px] font-black uppercase tracking-widest">UP TO 85% DISCOUNT SALE ACTIVE</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                      Premium Digital Keys. <br />
                      <span className="brand-gradient-text font-serif italic font-bold">
                        100% Secure & Genuine.
                      </span>
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      Get fully-licensed, lifetime retail activation software keys for Operating Systems, high-end Antivirus suites, and productive Office suites instantly with automated delivery.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2">
                      <div className="flex items-center space-x-2 bg-white border border-[#E2E8F0] rounded-2xl px-4 py-3 text-slate-800 text-xs font-bold shadow-xs">
                        <Zap className="h-4.5 w-4.5 text-[#0EA5B7] fill-[#0EA5B7]/10" />
                        <span className="tracking-wide">Instant Keys Delivery</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-white border border-[#E2E8F0] rounded-2xl px-4 py-3 text-slate-800 text-xs font-bold shadow-xs">
                        <ShieldCheck className="h-4.5 w-4.5 text-[#7C3AED]" />
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
                        onClick={() => handlePromoClick('Microsoft Office Keys')}
                        className="sm:col-span-4 bg-gradient-to-br from-[#0EA5B7] to-[#7C3AED] text-white p-6 rounded-3xl relative overflow-hidden flex flex-col justify-between h-[210px] group border border-transparent shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer select-none"
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
                          <span className="bg-white text-[#7C3AED] hover:bg-slate-100 font-extrabold text-[9px] uppercase tracking-widest px-3 py-1.5 rounded-xl flex items-center space-x-1 shadow-xs transition-colors duration-200">
                            <span>Claim Now</span>
                            <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </motion.div>

                      {/* XBOX Game Pass Offer (Right Column - Top) */}
                      <motion.div
                        whileHover={{ y: -4, borderColor: "rgba(124, 58, 237, 0.3)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        onClick={() => handlePromoClick('Gaming & Gift Cards', 'Xbox')}
                        className="sm:col-span-2 bg-white border border-[#E2E8F0] p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between h-[210px] group shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer select-none"
                      >
                        {/* Xbox green ambient glow */}
                        <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-emerald-500/10 blur-2xl opacity-60 group-hover:opacity-80 transition-all duration-300 z-0" />

                        <div className="space-y-2 relative z-10">
                          <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">
                            Xbox Special
                          </span>
                          <h3 className="text-sm font-extrabold text-slate-800 leading-tight">
                            Game Pass Ultimate
                          </h3>
                          <p className="text-[10px] text-slate-500 leading-snug">
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
                            <span className="text-xs font-black text-slate-800">₹749</span>
                            <span className="text-[9px] font-extrabold text-[#7C3AED] uppercase tracking-wider flex items-center space-x-0.5">
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
                        onClick={() => handlePromoClick('Gaming & Gift Cards', 'PlayStation')}
                        className="sm:col-span-3 bg-white border border-[#E2E8F0] p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between h-[150px] group shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer select-none"
                      >
                        {/* PlayStation blue glow */}
                        <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-blue-500/10 blur-2xl opacity-60 group-hover:opacity-80 transition-all duration-300 z-0" />

                        <div className="space-y-1 relative z-10">
                          <span className="bg-blue-50 text-blue-600 border border-blue-100 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">
                            PlayStation
                          </span>
                          <h3 className="text-sm font-extrabold text-slate-800 leading-tight">
                            PSN Store Wallet Cards
                          </h3>
                          <p className="text-[10px] text-slate-500 leading-snug">
                            Access wallet funds with up to 40% wholesale rates.
                          </p>
                        </div>

                        <div className="flex items-center justify-between relative z-10">
                          <span className="text-xs font-black text-slate-800">From ₹1,499</span>
                          <span className="text-[9px] font-extrabold text-[#7C3AED] uppercase tracking-wider flex items-center space-x-0.5">
                            <span>Shop Keys</span>
                            <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </motion.div>

                      {/* Office for Mac Promotion (Bottom Right) */}
                      <motion.div
                        whileHover={{ y: -4, borderColor: "rgba(124, 58, 237, 0.3)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        onClick={() => handlePromoClick('Microsoft Office Keys', 'Mac')}
                        className="sm:col-span-3 bg-white border border-[#E2E8F0] p-5 rounded-3xl relative overflow-hidden flex flex-col justify-between h-[150px] group shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer select-none"
                      >
                        {/* macOS purple glow */}
                        <div className="absolute -right-8 -bottom-8 w-24 h-24 rounded-full bg-purple-500/10 blur-2xl opacity-60 group-hover:opacity-80 transition-all duration-300 z-0" />

                        <div className="space-y-1 relative z-10">
                          <span className="bg-purple-50 text-purple-600 border border-purple-100 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">
                            Apple Exclusive
                          </span>
                          <h3 className="text-sm font-extrabold text-slate-800 leading-tight">
                            Office Home & Business Mac
                          </h3>
                          <p className="text-[10px] text-slate-500 leading-snug">
                            Lifetime retail license keys bound directly to Apple ID.
                          </p>
                        </div>

                        <div className="flex items-center justify-between relative z-10">
                          <span className="text-xs font-black text-slate-800">From ₹1,999</span>
                          <span className="text-[9px] font-extrabold text-[#7C3AED] uppercase tracking-wider flex items-center space-x-0.5">
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

            {/* Catalog Main section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="store-catalog-section">

              {/* Category selector row */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center space-x-2">
                      <Sparkles className="h-4 w-4 text-[#7C3AED]" />
                      <span>Premium Software Categories</span>
                    </h3>
                    <p className="text-[11px] text-slate-500">Select a category below to explore digital key licenses</p>
                  </div>
                  {selectedCategory !== 'All' && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      onClick={() => setSelectedCategory('All')}
                      className="text-[10px] uppercase font-mono font-bold tracking-widest text-rose-600 bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-xl hover:bg-rose-100 hover:border-rose-300 transition-all duration-200 cursor-pointer flex items-center space-x-1"
                    >
                      <span>Show All</span>
                      <X className="h-3.5 w-3.5" />
                    </motion.button>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" id="premium-category-bento">
                  {premiumCategories.map((cat) => {
                    const isActive = selectedCategory === cat.id;
                    const productCount = products.filter(p => p.category === cat.id).length;

                    return (
                      <motion.div
                        key={cat.id}
                        onClick={() => setSelectedCategory(isActive ? 'All' : cat.id)}
                        whileHover={{
                          y: -6,
                          boxShadow: "0 20px 40px rgba(0,0,0,0.08)"
                        }}
                        whileTap={{ scale: 0.985 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className={`relative h-[150px] rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 border cursor-pointer select-none overflow-hidden group ${cat.bgClass(isActive)}`}
                      >
                        {/* Background illustration graphic */}
                        <div className="absolute right-[-10px] top-4 bottom-4 w-[130px] flex items-center justify-center opacity-90 group-hover:scale-105 transition-all duration-300 z-10 pointer-events-none">
                          <cat.illustration />
                        </div>

                        {/* Card Header: Rounded White Icon Box */}
                        <div className="flex justify-between items-start relative z-20">
                          <div className="w-12 h-12 rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100/80 flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
                            <cat.icon className={`h-5 w-5 ${cat.iconColorClass}`} />
                          </div>
                          {cat.badge && (
                            <span className={`text-[9px] uppercase font-sans font-extrabold tracking-wider px-2.5 py-0.5 rounded-full border transition-all duration-300 ${cat.badgeClass}`}>
                              {cat.badge}
                            </span>
                          )}
                        </div>

                        {/* Card Footer: Category Name, Product Count & Chevron button */}
                        <div className="flex justify-between items-end relative z-20">
                          <div className="space-y-0.5 text-left max-w-[60%]">
                            <h4 className="text-xs sm:text-sm font-extrabold tracking-tight text-slate-800 group-hover:text-slate-950 transition-colors">
                              {cat.name}
                            </h4>
                            <span className="text-[11px] font-semibold text-slate-500">
                              {productCount} Products
                            </span>
                          </div>

                          {/* Navigation Chevron circle */}
                          {/* <div className="w-7 h-7 rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.04)] border border-slate-100 flex items-center justify-center group-hover:bg-[#7C3AED] group-hover:border-[#7C3AED] transition-all duration-300">
                            <svg className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </div> */}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Products listing grid */}
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3">
                  <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest">
                    Showing {filteredProducts.length} License Offers
                  </span>
                </div>

                {isLoadingProducts ? (
                  <div className="py-20 flex flex-col items-center justify-center space-y-3">
                    <div className="h-10 w-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs text-white/40 font-semibold tracking-wider uppercase">Synchronizing products database...</p>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="space-y-12">
                    <div className="py-16 text-center space-y-4 bg-white/[0.02] rounded-3xl border border-white/5 shadow-inner animate-fade-in" id="no-results-panel">
                      <Search className="h-10 w-10 text-white/20 mx-auto" />
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-white uppercase tracking-wider">No exact license offers found</p>
                        <p className="text-xs text-white/40 max-w-[340px] mx-auto leading-relaxed font-light">
                          We couldn't find any digital keys matching your query "<span className="text-blue-400 font-bold">{searchQuery}</span>".
                        </p>

                        {getDidYouMeanQuery(searchQuery) && (
                          <div className="pt-2 text-xs" id="spelling-suggestion-wrapper">
                            <span className="text-white/50 font-light">Did you mean: </span>
                            <button
                              onClick={() => setSearchQuery(getDidYouMeanQuery(searchQuery)!)}
                              className="text-blue-400 hover:text-blue-300 font-bold underline cursor-pointer uppercase tracking-wider text-[11px]"
                              id="did-you-mean-btn"
                            >
                              {getDidYouMeanQuery(searchQuery)}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Suggested products fallback section */}
                    <div className="space-y-6" id="suggested-products-fallback">
                      <div className="border-b border-white/5 pb-2">
                        <h4 className="text-xs font-bold text-white uppercase tracking-widest flex items-center space-x-2">
                          <Sparkles className="h-4 w-4 text-blue-400" />
                          <span>Highly Rated Recommended Keys For You</span>
                        </h4>
                        <p className="text-[10px] text-white/40 mt-1 font-light">Explore some of our overall customer-favorites digital license keys.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="suggested-products-grid">
                        {products
                          .slice()
                          .sort((a, b) => b.rating - a.rating)
                          .slice(0, 4)
                          .map((prod) => (
                            <ProductCard
                              key={`suggested_${prod.id}`}
                              product={prod}
                              onAddToCart={handleAddToCart}
                              onViewDetails={(p) => setSelectedProduct(p)}
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" id="products-grid">
                    {filteredProducts.map((prod) => (
                      <ProductCard
                        key={prod.id}
                        product={prod}
                        onAddToCart={handleAddToCart}
                        onViewDetails={(p) => setSelectedProduct(p)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Trust badges footer strip */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-white/[0.08]" id="trust-banner-strip">
                <div className="bg-[#1E293B]/60 p-5 rounded-2xl border border-white/[0.08] flex items-start space-x-3 hover:border-white/15 transition-all duration-300">
                  <div className="p-2.5 bg-white/5 text-[#0EA5B7] rounded-xl shrink-0">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">Genuine Sourced Keys</h4>
                    <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed font-light">
                      Sourced direct from verified Microsoft and developer authorized channels with full original validation certificates.
                    </p>
                  </div>
                </div>

                <div className="bg-[#1E293B]/60 p-5 rounded-2xl border border-white/[0.08] flex items-start space-x-3 hover:border-white/15 transition-all duration-300">
                  <div className="p-2.5 bg-white/5 text-[#0EA5B7] rounded-xl shrink-0">
                    <Zap className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">Instant Delivery</h4>
                    <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed font-light">
                      Keys are generated, allocated, and displayed in your profile vault immediately on payment verification.
                    </p>
                  </div>
                </div>

                <div className="bg-[#1E293B]/60 p-5 rounded-2xl border border-white/[0.08] flex items-start space-x-3 hover:border-white/15 transition-all duration-300">
                  <div className="p-2.5 bg-white/5 text-[#0EA5B7] rounded-xl shrink-0">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-white">24/7 Expert Support</h4>
                    <p className="text-xs text-[#94A3B8] mt-1.5 leading-relaxed font-light">
                      Experienced technician assistance for troubleshooting or guide clarifications anytime.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'checkout' && (
          <CheckoutPage
            user={user}
            demoUser={demoUser}
            cartItems={cart}
            onBackToCatalog={() => setActiveTab('catalog')}
            onSubmitOrderToFirestore={handlePostOrderToFirestore}
            onOrderCreated={handleOrderFinished}
            onAllocateKeys={handleAllocateKeys}
            coupons={coupons}
          />
        )}

        {activeTab === 'orders' && (
          <OrdersPage
            orders={orders}
            onBackToCatalog={() => setActiveTab('catalog')}
          />
        )}

        {activeTab === 'support' && (
          <SupportPage
            orders={orders}
            currentUserEmail={user?.email || demoUser?.email || null}
            onBackToCatalog={() => setActiveTab('catalog')}
          />
        )}

        {activeTab === 'admin' && (
          <AdminPanel
            products={products}
            onAddProduct={handleAddProduct}
            onUpdateProduct={handleUpdateProduct}
            onDeleteProduct={handleDeleteProduct}
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            inventoryKeys={inventoryKeys}
            onAddInventoryKeys={handleAddInventoryKeys}
            refundRequests={refundRequests}
            onProcessRefund={handleProcessRefund}
            coupons={coupons}
            onAddCoupon={handleAddCoupon}
            onDeleteCoupon={handleDeleteCoupon}
            customers={customers}
            onToggleCustomerStatus={handleToggleCustomerStatus}
            onBackToCatalog={() => setActiveTab('catalog')}
          />
        )}
      </main>

      {/* Professional digital keys shop footer */}
      <footer className="bg-[#F8FAFC] text-slate-700 border-t border-[#E2E8F0] shrink-0 py-12" id="store-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-white border border-[#E2E8F0] p-2 rounded-lg flex items-center justify-center shadow-xs">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 6v6h6M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" stroke="url(#footer-logo-grad)" />
                  <path d="M9 12H3m6-3H6" stroke="url(#footer-logo-grad)" />
                  <defs>
                    <linearGradient id="footer-logo-grad" x1="3" y1="6" x2="21" y2="12" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#0EA5B7" />
                      <stop offset="1" stopColor="#7C3AED" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="text-lg font-black tracking-tight uppercase text-slate-900 leading-none">
                NETLYRA<span className="serif-italic text-[#7C3AED] lowercase">keys</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              A premium, fully responsive retail license store offering authenticated genuine keys at massive wholesale discount price structures. Built for security, speed, and reliability.
            </p>
          </div>

          {/* 24x7 WhatsApp Support Column */}
          <div className="space-y-4 bg-white border border-[#0EA5B7]/20 p-5 rounded-2xl relative overflow-hidden shadow-xs" id="footer-whatsapp-column">
            <div className="absolute top-0 right-0 h-16 w-16 bg-emerald-500/5 rounded-full blur-xl" />
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">24×7 ACTIVE SUPPORT</h4>
            </div>
            <p className="text-xs font-bold text-slate-900 leading-snug">
              Need Help? Chat with us 24×7 on WhatsApp
            </p>
            <ul className="text-[10px] space-y-1.5 font-sans font-semibold text-slate-600">
              <li className="flex items-center space-x-1.5">
                <span className="text-emerald-500 text-xs font-bold">✓</span>
                <span>Instant Activation Support</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <span className="text-emerald-500 text-xs font-bold">✓</span>
                <span>Pre-sales & Post-sales assistance</span>
              </li>
            </ul>
            <a
              href="https://wa.me/919999999999?text=Hello%20Netlyrakeys%20Support%2C%20I%20need%20help%20with%20a%20key%20purchase."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#10B981] hover:bg-[#059669] text-white font-black text-[10px] uppercase tracking-widest py-2.5 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-xs hover:scale-[1.01] active:scale-[0.99]"
              id="footer-whatsapp-btn"
            >
              {/* WhatsApp Icon */}
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.182 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.637-1.03-5.114-2.905-6.99C16.656 1.882 14.183 1.05 11.54 1.05 6.105 1.05 1.681 5.47 1.677 10.908c-.001 1.745.453 3.449 1.317 4.957l-1.018 3.715 3.804-.998zm11.233-7.24c-.312-.156-1.848-.912-2.129-1.015-.282-.102-.487-.156-.69.156-.204.311-.785.983-.96 1.186-.177.204-.355.228-.668.072-.312-.156-1.32-.486-2.515-1.551-.93-.829-1.558-1.854-1.74-2.165-.183-.312-.02-.481.136-.636.14-.139.312-.365.469-.547.156-.183.208-.312.312-.52.105-.208.053-.391-.026-.547-.079-.156-.69-1.661-.944-2.274-.249-.597-.502-.516-.69-.526-.178-.009-.383-.011-.587-.011-.204 0-.537.076-.818.384-.282.311-1.077 1.051-1.077 2.561 0 1.51 1.099 2.97 1.253 3.177.154.204 2.162 3.299 5.241 4.628.732.315 1.304.503 1.751.644.735.233 1.402.2 1.93.121.588-.087 1.848-.755 2.11-1.468.263-.712.263-1.32.184-1.448-.079-.118-.282-.172-.593-.328z" />
              </svg>
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Disclaimer & Trademarks</h4>
            <p className="text-[10px] text-slate-500 leading-relaxed font-normal">
              Netlyrakeys is an independent marketplace provider of digital licensing activation codes. All company, product, and service names used on this website are for identification purposes only. All product titles, copyrights, and brand trademarks are properties of Microsoft Corporation or their respective original publishers.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Secure Trust Seals</h4>
            <div className="flex items-center space-x-2.5">
              <div className="border border-[#E2E8F0] bg-white px-3.5 py-1.5 rounded-xl text-center shadow-xs">
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">SSL</div>
                <div className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mt-0.5">Secured</div>
              </div>
              <div className="border border-[#E2E8F0] bg-white px-3.5 py-1.5 rounded-xl text-center shadow-xs">
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Microsoft</div>
                <div className="text-[9px] font-black text-[#7C3AED] uppercase tracking-widest mt-0.5">Partner Key</div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Side slide Cart drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onCheckout={() => {
          if (!currentUserId) {
            triggerAlert("Please log in with an account to complete secure checkout", "error");
            setLoginModalOpen(true);
          } else {
            setActiveTab('checkout');
          }
        }}
      />

      {/* Product Details popup Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailsModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
          />
        )}
      </AnimatePresence>

      {/* Modern User Authentication Selection popup Modal */}
      <AnimatePresence>
        {loginModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4" id="login-modal-overlay">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setLoginModalOpen(false)} />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-[#090909] rounded-3xl max-w-sm w-full p-8 shadow-2xl border border-white/10 z-10 space-y-6"
            >
              <button
                onClick={() => setLoginModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-center space-y-2">
                <div className="bg-white/5 text-blue-400 h-12 w-12 rounded-2xl flex items-center justify-center mx-auto border border-white/10 shadow-sm">
                  <UserIcon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-light text-white tracking-tight">Access User Management</h3>
                <p className="text-xs text-white/40 max-w-[240px] mx-auto leading-relaxed font-light">
                  Sign in to securely access your license activation codes and save order history.
                </p>
              </div>

              <div className="space-y-4">
                {/* 1. Official Google Sign-In */}
                <button
                  onClick={handleGoogleLogin}
                  className="w-full bg-white hover:bg-white/90 text-black font-bold text-[10px] uppercase tracking-widest py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
                >
                  {/* Google SVG G logo */}
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.47 15 0 12 0 7.32 0 3.32 2.69 1.42 6.6l3.86 2.99C6.18 6.74 8.87 5.04 12 5.04z" />
                    <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.46c-.29 1.48-1.14 2.73-2.4 3.58l3.76 2.91c2.2-2.03 3.67-5.01 3.67-8.64z" />
                    <path fill="#FBBC05" d="M5.28 14.51c-.24-.71-.38-1.47-.38-2.26s.14-1.55.38-2.26L1.42 7c-.78 1.56-1.22 3.32-1.22 5.2s.44 3.64 1.22 5.2l3.86-2.99z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.76-2.91c-1.04.7-2.38 1.11-4.2 1.11-3.13 0-5.82-1.7-6.72-4.55L1.42 17.4C3.32 21.31 7.32 24 12 24z" />
                  </svg>
                  <span>Sign In with Google</span>
                </button>

                {/* Divider */}
                <div className="flex items-center space-x-2 text-white/10 my-2">
                  <div className="flex-grow border-t border-white/10" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">or trial demo</span>
                  <div className="flex-grow border-t border-white/10" />
                </div>

                {/* 2. Mock Guest/Demo Login */}
                <form onSubmit={handleDemoLoginSubmit} className="space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Demo Name"
                      value={demoLoginName}
                      onChange={(e) => setDemoLoginName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-semibold text-white outline-none placeholder:text-white/20 focus:border-blue-400/50"
                    />
                  </div>
                  <div className="space-y-1">
                    <input
                      type="text"
                      placeholder="Demo Email"
                      value={demoLoginEmail}
                      onChange={(e) => {
                        setDemoLoginEmail(e.target.value);
                        if (demoLoginEmailError) {
                          setDemoLoginEmailError('');
                        }
                      }}
                      className={`w-full px-4 py-2.5 bg-white/5 border ${demoLoginEmailError ? 'border-rose-500 focus:border-rose-500' : 'border-white/10 focus:border-blue-400/50'
                        } rounded-xl text-xs font-semibold text-white outline-none placeholder:text-white/20`}
                    />
                    {demoLoginEmailError && (
                      <p className="text-[10px] text-rose-400 font-bold tracking-wide pl-1 animate-pulse" id="demo-email-error-text">
                        {demoLoginEmailError}
                      </p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-[10px] uppercase tracking-widest py-3 rounded-xl transition-all duration-200 shadow-md cursor-pointer"
                  >
                    Instant Trial Account
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Widget with Hover/Interactive Prompt */}
      <div className="fixed bottom-6 right-6 z-50 group flex flex-col items-end" id="floating-whatsapp-widget">
        {/* Expandable chat assistant window */}
        <div className="mb-3 max-w-[280px] bg-[#0c0c0c] border border-emerald-500/20 rounded-2xl shadow-2xl p-4 opacity-0 scale-90 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-300 origin-bottom-right" id="whatsapp-tooltip-window">
          <div className="flex items-center space-x-2.5 border-b border-white/5 pb-2.5 mb-2.5">
            <div className="relative">
              <div className="h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center text-black font-extrabold text-xs shadow-inner">
                WA
              </div>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 border border-[#0c0c0c] animate-pulse" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white flex items-center">
                Netlyra Support
                <span className="text-[8px] font-bold text-emerald-400 uppercase bg-emerald-950/40 border border-emerald-500/15 px-1 py-0.5 rounded ml-1.5">24x7 Active</span>
              </h5>
              <p className="text-[9px] text-white/40 font-mono">Response time: Instant</p>
            </div>
          </div>

          <div className="space-y-2.5">
            <p className="text-[11px] font-semibold text-white leading-snug">
              Need Help? Chat with us 24×7 on WhatsApp
            </p>
            <div className="space-y-1.5 text-[10px] text-white/60 font-light">
              <div className="flex items-center space-x-1.5">
                <span className="text-emerald-400 font-bold">✦</span>
                <span>Instant activation support</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="text-emerald-400 font-bold">✦</span>
                <span>Pre-sales & post-sales assistance</span>
              </div>
            </div>

            <a
              href="https://wa.me/919999999999?text=Hello%20Netlyrakeys%20Support%2C%20I%20need%20assistance%20with%20license%20activation."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-[10px] uppercase tracking-widest py-2 rounded-xl transition-all duration-150 flex items-center justify-center space-x-1.5"
            >
              <span>Start Live Chat</span>
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M16.003 9.414l-8.607 8.607-1.414-1.414 8.607-8.607H9.003V6h11v11h-2V11.414z" />
              </svg>
            </a>
          </div>
        </div>

        {/* The main green floating action button */}
        <a
          href="https://wa.me/919999999999?text=Hello%20Netlyrakeys%20Support%2C%20I%20need%20assistance%20with%20license%20activation."
          target="_blank"
          rel="noopener noreferrer"
          className="relative h-14 w-14 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-[0_4px_24px_rgba(16,185,129,0.4)] hover:bg-emerald-400 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
          id="whatsapp-floating-action-btn"
        >
          {/* Pulsating glow rings */}
          <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping opacity-75" style={{ animationDuration: '2s' }} />

          {/* WhatsApp logo */}
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.182 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.637-1.03-5.114-2.905-6.99C16.656 1.882 14.183 1.05 11.54 1.05 6.105 1.05 1.681 5.47 1.677 10.908c-.001 1.745.453 3.449 1.317 4.957l-1.018 3.715 3.804-.998zm11.233-7.24c-.312-.156-1.848-.912-2.129-1.015-.282-.102-.487-.156-.69.156-.204.311-.785.983-.96 1.186-.177.204-.355.228-.668.072-.312-.156-1.32-.486-2.515-1.551-.93-.829-1.558-1.854-1.74-2.165-.183-.312-.02-.481.136-.636.14-.139.312-.365.469-.547.156-.183.208-.312.312-.52.105-.208.053-.391-.026-.547-.079-.156-.69-1.661-.944-2.274-.249-.597-.502-.516-.69-.526-.178-.009-.383-.011-.587-.011-.204 0-.537.076-.818.384-.282.311-1.077 1.051-1.077 2.561 0 1.51 1.099 2.97 1.253 3.177.154.204 2.162 3.299 5.241 4.628.732.315 1.304.503 1.751.644.735.233 1.402.2 1.93.121.588-.087 1.848-.755 2.11-1.468.263-.712.263-1.32.184-1.448-.079-.118-.282-.172-.593-.328z" />
          </svg>

          {/* Tiny notification dot */}
          <span className="absolute top-0 right-0 h-3.5 w-3.5 bg-rose-500 rounded-full border-2 border-emerald-500 flex items-center justify-center">
            <span className="block h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          </span>
        </a>
      </div>

    </div>
  );
}
