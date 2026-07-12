import React, { useState, useMemo } from 'react';
import { 
  Database, Tag, ShoppingBag, RefreshCw, Users, BarChart3, Plus, Trash2, 
  Check, X, Search, ShieldCheck, AlertCircle, TrendingUp, DollarSign, Key, 
  Percent, FileText, ArrowLeft, Settings, UserX, UserCheck, Inbox, Mail, ExternalLink, Calendar,
  Upload, Image, Download, Copy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, 
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';
import { Product, Order, Coupon, InventoryKey, RefundRequest, Customer, Category } from '../types';

interface AdminPanelProps {
  products: Product[];
  onAddProduct: (prod: Product) => void;
  onUpdateProduct: (prod: Product) => void;
  onDeleteProduct: (id: string) => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: 'pending' | 'completed' | 'failed') => void;
  inventoryKeys: InventoryKey[];
  onAddInventoryKeys: (productId: string, keys: string[]) => void;
  refundRequests: RefundRequest[];
  onProcessRefund: (id: string, status: 'approved' | 'rejected') => void;
  coupons: Coupon[];
  onAddCoupon: (coupon: Coupon) => void;
  onDeleteCoupon: (id: string) => void;
  customers: Customer[];
  onToggleCustomerStatus: (uid: string) => void;
  onBackToCatalog: () => void;
}

type AdminSection = 'analytics' | 'products' | 'inventory' | 'orders' | 'refunds' | 'coupons' | 'customers';

export default function AdminPanel({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  orders,
  onUpdateOrderStatus,
  inventoryKeys,
  onAddInventoryKeys,
  refundRequests,
  onProcessRefund,
  coupons,
  onAddCoupon,
  onDeleteCoupon,
  customers,
  onToggleCustomerStatus,
  onBackToCatalog
}: AdminPanelProps) {
  const [activeSection, setActiveSection] = useState<AdminSection>('analytics');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals / Forms States
  const [productFormOpen, setProductFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedProductKeysView, setSelectedProductKeysView] = useState<string>('all');
  const [newKeysInput, setNewKeysInput] = useState('');
  const [newKeysProductId, setNewKeysProductId] = useState('');
  const [couponFormOpen, setCouponFormOpen] = useState(false);

  // Core Product Form state
  const [prodTitle, setProdTitle] = useState('');
  const [prodCategory, setProdCategory] = useState<Category>('Microsoft Windows Keys');
  const [prodPrice, setProdPrice] = useState('49.99');
  const [prodSalePrice, setProdSalePrice] = useState('14.99');
  const [prodImg, setProdImg] = useState('https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80');
  const [prodDesc, setProdDesc] = useState('');
  const [prodFeatures, setProdFeatures] = useState('');
  const [prodGuide, setProdGuide] = useState('');
  const [prodStock, setProdStock] = useState('50');

  // Extended fields states
  const [prodSlug, setProdSlug] = useState('');
  const [prodShortDesc, setProdShortDesc] = useState('');
  const [prodFullDesc, setProdFullDesc] = useState('');
  const [prodSubcategory, setProdSubcategory] = useState('');
  const [prodBrand, setProdBrand] = useState('');
  const [prodCostPrice, setProdCostPrice] = useState('0');
  const [prodCurrency, setProdCurrency] = useState('INR');
  const [prodLicenseType, setProdLicenseType] = useState<'Retail' | 'OEM' | 'Volume' | 'Subscription' | 'Enterprise' | 'Lifetime'>('Lifetime');
  const [prodValidity, setProdValidity] = useState<'Lifetime' | '1 Year' | '2 Year' | 'Monthly'>('Lifetime');
  const [prodDeviceLimit, setProdDeviceLimit] = useState<'1 PC' | '2 PC' | '5 PC' | 'Unlimited'>('1 PC');
  const [prodStatus, setProdStatus] = useState<'Active' | 'Draft' | 'Out Of Stock' | 'Hidden'>('Active');
  
  // SEO
  const [prodMetaTitle, setProdMetaTitle] = useState('');
  const [prodMetaDesc, setProdMetaDesc] = useState('');
  const [prodKeywords, setProdKeywords] = useState('');

  // Trust Badges
  const [badgeInstantDelivery, setBadgeInstantDelivery] = useState(true);
  const [badgeGstInvoice, setBadgeGstInvoice] = useState(true);
  const [badgeActivationSupport, setBadgeActivationSupport] = useState(true);
  const [badgeWhatsappSupport, setBadgeWhatsappSupport] = useState(true);
  const [badgeGenuineLicense, setBadgeGenuineLicense] = useState(true);
  const [badgeReplacementWarranty, setBadgeReplacementWarranty] = useState(true);

  // Gallery
  const [prodThumbnail, setProdThumbnail] = useState('');
  const [prodGallery, setProdGallery] = useState<string[]>([]);
  const [activeFormTab, setActiveFormTab] = useState<'basic' | 'pricing' | 'media' | 'seo'>('basic');

  // Canvas WebP & Cropping helper states
  const [cropImageSource, setCropImageSource] = useState<string | null>(null);
  const [cropTarget, setCropTarget] = useState<'main' | 'thumbnail' | 'gallery'>('main');
  const [cropZoom, setCropZoom] = useState(1);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>, target: 'main' | 'thumbnail' | 'gallery') => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setCropImageSource(dataUrl);
      setCropTarget(target);
      setCropZoom(1);
    };
    reader.readAsDataURL(file);
  };

  const handleCropSave = () => {
    if (!cropImageSource) return;
    
    const img = new window.Image();
    img.src = cropImageSource;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const size = Math.min(img.width, img.height);
      canvas.width = 500;
      canvas.height = 500;
      
      const sourceX = (img.width - size) / 2;
      const sourceY = (img.height - size) / 2;
      
      ctx.drawImage(
        img,
        sourceX, sourceY, size, size,
        0, 0, 500, 500
      );
      
      // Convert to WebP
      const webpDataUrl = canvas.toDataURL('image/webp', 0.85);
      
      if (cropTarget === 'main') {
        setProdImg(webpDataUrl);
      } else if (cropTarget === 'thumbnail') {
        setProdThumbnail(webpDataUrl);
      } else if (cropTarget === 'gallery') {
        setProdGallery(prev => [...prev, webpDataUrl]);
      }
      
      setCropImageSource(null);
    };
  };

  const handleDuplicateProduct = (prod: Product) => {
    const duplicated: Product = {
      ...prod,
      id: 'prod_' + Math.random().toString(36).substring(2, 11),
      title: `${prod.title} (Copy)`,
      slug: `${prod.slug || prod.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-copy-${Math.random().toString(36).substring(2, 6)}`,
      reviewsCount: 1,
      rating: 5,
    };
    onAddProduct(duplicated);
  };

  const handleToggleProductStatus = (prod: Product) => {
    const newStatus = prod.status === 'Active' ? 'Hidden' : 'Active';
    const updated: Product = {
      ...prod,
      status: newStatus
    };
    onUpdateProduct(updated);
  };

  const handleExportCSV = () => {
    if (products.length === 0) {
      alert("No products to export");
      return;
    }
    const headers = ["id", "title", "category", "price", "salePrice", "stock", "rating", "reviewsCount", "licenseType", "status", "slug", "brand", "subcategory", "costPrice"];
    const csvRows = [headers.join(",")];
    for (const p of products) {
      const values = [
        p.id,
        `"${(p.title || '').replace(/"/g, '""')}"`,
        `"${(p.category || '').replace(/"/g, '""')}"`,
        p.price,
        p.salePrice,
        p.stock,
        p.rating || 5,
        p.reviewsCount || 1,
        p.licenseType || 'Lifetime',
        p.status || 'Active',
        p.slug || '',
        `"${(p.brand || '').replace(/"/g, '""')}"`,
        `"${(p.subcategory || '').replace(/"/g, '""')}"`,
        p.costPrice || 0
      ];
      csvRows.push(values.join(","));
    }
    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `netlyrakeys_products_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const lines = text.split("\n");
        if (lines.length <= 1) {
          alert("CSV file is empty");
          return;
        }
        const headers = lines[0].split(",").map(h => h.trim().replace(/^["']|["']$/g, ''));
        
        // Find indices
        const titleIdx = headers.indexOf("title");
        const categoryIdx = headers.indexOf("category");
        const priceIdx = headers.indexOf("price");
        const salePriceIdx = headers.indexOf("salePrice");
        const stockIdx = headers.indexOf("stock");
        const descIdx = headers.indexOf("description") !== -1 ? headers.indexOf("description") : headers.indexOf("shortDescription");
        
        if (titleIdx === -1 || categoryIdx === -1 || priceIdx === -1 || salePriceIdx === -1) {
          alert("CSV must contain headers: title, category, price, salePrice");
          return;
        }
        
        let count = 0;
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;
          
          // Basic CSV parsing split by comma, ignoring commas inside quotes
          const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)*/g) || line.split(",");
          const values = matches.filter(v => v !== undefined).map(v => v.trim().replace(/^["']|["']$/g, ''));
          
          if (values.length < 4) continue;
          
          const title = values[titleIdx] || "Untitled SKU";
          const category = values[categoryIdx] || "Microsoft Windows Keys";
          const price = parseFloat(values[priceIdx]) || 1999;
          const salePrice = parseFloat(values[salePriceIdx]) || 999;
          const stock = stockIdx !== -1 ? (parseInt(values[stockIdx]) || 50) : 50;
          const description = descIdx !== -1 ? (values[descIdx] || "Imported Software Key") : "Imported Software Key";
          
          const pId = 'prod_' + Math.random().toString(36).substring(2, 11);
          const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Math.random().toString(36).substring(2, 6);
          
          const importedProd: Product = {
            id: pId,
            title,
            category: category as any,
            price,
            salePrice,
            imageUrl: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80",
            description,
            features: ["Genuine Lifetime Retail Key", "Instant Digital Delivery"],
            activationGuide: "1. Visit official link\n2. Key will be sent to email",
            stock,
            rating: 5,
            reviewsCount: 1,
            slug,
            status: "Active"
          };
          onAddProduct(importedProd);
          count++;
        }
        alert(`Successfully imported ${count} products!`);
      } catch (err) {
        console.error(err);
        alert("Error parsing CSV. Please check formatting.");
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // New Coupon Form state
  const [cpCode, setCpCode] = useState('');
  const [cpType, setCpType] = useState<'percent' | 'fixed'>('percent');
  const [cpValue, setCpValue] = useState('10');
  const [cpMinOrder, setCpMinOrder] = useState('20');

  // Trigger editing product
  const handleStartEditProduct = (prod: Product) => {
    setEditingProduct(prod);
    setProdTitle(prod.title);
    setProdCategory(prod.category as any);
    setProdPrice(prod.price.toString());
    setProdSalePrice(prod.salePrice.toString());
    setProdImg(prod.imageUrl);
    setProdDesc(prod.description);
    setProdFeatures(prod.features.join('\n'));
    setProdGuide(prod.activationGuide);
    setProdStock(prod.stock.toString());

    // Extended properties
    setProdSlug(prod.slug || '');
    setProdShortDesc(prod.shortDescription || '');
    setProdFullDesc(prod.fullDescription || prod.description || '');
    setProdSubcategory(prod.subcategory || '');
    setProdBrand(prod.brand || '');
    setProdCostPrice((prod.costPrice || 0).toString());
    setProdCurrency(prod.currency || 'INR');
    setProdLicenseType(prod.licenseType || 'Lifetime');
    setProdValidity(prod.validity || 'Lifetime');
    setProdDeviceLimit(prod.deviceLimit || '1 PC');
    
    const rawStatus = prod.status || 'Active';
    const cleanStatus = (rawStatus as string) === 'Out of Stock' ? 'Out Of Stock' : rawStatus;
    setProdStatus(cleanStatus as any);

    // SEO
    setProdMetaTitle(prod.seo?.metaTitle || '');
    setProdMetaDesc(prod.seo?.metaDescription || '');
    setProdKeywords(prod.seo?.keywords || '');

    // Trust Badges
    setBadgeInstantDelivery(prod.trustBadges?.instantDelivery !== false);
    setBadgeGstInvoice(prod.trustBadges?.gstInvoice !== false);
    setBadgeActivationSupport(prod.trustBadges?.activationSupport !== false);
    setBadgeWhatsappSupport(prod.trustBadges?.whatsappSupport !== false);
    setBadgeGenuineLicense(prod.trustBadges?.genuineLicense !== false);
    setBadgeReplacementWarranty(prod.trustBadges?.replacementWarranty !== false);

    // Media
    setProdThumbnail(prod.thumbnailUrl || '');
    setProdGallery(prod.galleryImages || []);
    setActiveFormTab('basic');

    setProductFormOpen(true);
  };

  const handleOpenNewProductForm = () => {
    setEditingProduct(null);
    setProdTitle('');
    setProdCategory('Microsoft Windows Keys');
    setProdPrice('499.00');
    setProdSalePrice('249.00');
    setProdImg('https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80');
    setProdDesc('');
    setProdFeatures("Lifetime Retail Key\nInstant Digital Delivery\n24/7 Technical Support");
    setProdGuide("1. Open the application or website.\n2. Go to activation menu.\n3. Paste your delivered key.\n4. Click verify.");
    setProdStock('100');

    // Extended
    setProdSlug('');
    setProdShortDesc('');
    setProdFullDesc('');
    setProdSubcategory('');
    setProdBrand('');
    setProdCostPrice('100');
    setProdCurrency('INR');
    setProdLicenseType('Lifetime');
    setProdValidity('Lifetime');
    setProdDeviceLimit('1 PC');
    setProdStatus('Active');
    setProdMetaTitle('');
    setProdMetaDesc('');
    setProdKeywords('');
    setBadgeInstantDelivery(true);
    setBadgeGstInvoice(true);
    setBadgeActivationSupport(true);
    setBadgeWhatsappSupport(true);
    setBadgeGenuineLicense(true);
    setBadgeReplacementWarranty(true);
    setProdThumbnail('');
    setProdGallery([]);
    setActiveFormTab('basic');

    setProductFormOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    const calculatedSlug = prodSlug || (prodTitle ? prodTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'prod-' + Math.random().toString(36).substr(2, 5));
    
    const newProd: Product = {
      id: editingProduct ? editingProduct.id : 'prod_' + Math.random().toString(36).substr(2, 9),
      title: prodTitle || 'Untitled Product',
      category: prodCategory,
      price: parseFloat(prodPrice) || 0,
      salePrice: parseFloat(prodSalePrice) || 0,
      imageUrl: prodImg || 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80',
      thumbnailUrl: prodThumbnail || prodImg,
      galleryImages: prodGallery.length > 0 ? prodGallery : [prodImg],
      description: prodDesc || prodShortDesc || 'No description provided.',
      features: prodFeatures.split('\n').filter(f => f.trim() !== ''),
      activationGuide: prodGuide || 'No guide provided.',
      stock: parseInt(prodStock) || 0,
      rating: editingProduct ? editingProduct.rating : 4.8,
      reviewsCount: editingProduct ? editingProduct.reviewsCount : 1,
      
      // Extended fields
      slug: calculatedSlug,
      shortDescription: prodShortDesc || prodDesc,
      fullDescription: prodFullDesc || prodDesc,
      subcategory: prodSubcategory,
      brand: prodBrand,
      costPrice: parseFloat(prodCostPrice) || 0,
      currency: prodCurrency,
      licenseType: prodLicenseType,
      validity: prodValidity,
      deviceLimit: prodDeviceLimit,
      status: prodStatus,
      seo: {
        metaTitle: prodMetaTitle || prodTitle,
        metaDescription: prodMetaDesc || prodShortDesc || prodDesc,
        keywords: prodKeywords
      },
      trustBadges: {
        instantDelivery: badgeInstantDelivery,
        gstInvoice: badgeGstInvoice,
        activationSupport: badgeActivationSupport,
        whatsappSupport: badgeWhatsappSupport,
        genuineLicense: badgeGenuineLicense,
        replacementWarranty: badgeReplacementWarranty
      }
    };

    if (editingProduct) {
      onUpdateProduct(newProd);
    } else {
      onAddProduct(newProd);
    }
    setProductFormOpen(false);
    setEditingProduct(null);
  };

  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cpCode) return;
    const newCp: Coupon = {
      id: 'coupon_' + Math.random().toString(36).substr(2, 9),
      code: cpCode.toUpperCase().trim(),
      discountType: cpType,
      discountValue: parseFloat(cpValue) || 0,
      minOrderAmount: parseFloat(cpMinOrder) || 0,
      active: true
    };
    onAddCoupon(newCp);
    setCouponFormOpen(false);
    setCpCode('');
  };

  const handleAddKeysSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeysProductId || !newKeysInput) return;
    const splitKeys = newKeysInput
      .split('\n')
      .map(k => k.trim())
      .filter(k => k.length > 0);
    
    if (splitKeys.length > 0) {
      onAddInventoryKeys(newKeysProductId, splitKeys);
      setNewKeysInput('');
      alert(`Successfully added ${splitKeys.length} keys to stock inventory!`);
    }
  };

  // ANALYTICS CALCULATIONS
  const totalRevenue = useMemo(() => {
    return orders
      .filter(o => o.status === 'completed')
      .reduce((sum, o) => sum + o.totalAmount, 0);
  }, [orders]);

  const totalSalesCount = useMemo(() => {
    return orders.filter(o => o.status === 'completed').length;
  }, [orders]);

  const keyStockStatus = useMemo(() => {
    const totalKeys = inventoryKeys.length;
    const available = inventoryKeys.filter(k => k.status === 'available').length;
    const sold = totalKeys - available;
    return { totalKeys, available, sold };
  }, [inventoryKeys]);

  const categoryRevenue = useMemo(() => {
    const data: { [cat: string]: number } = {};
    orders.filter(o => o.status === 'completed').forEach(order => {
      order.items.forEach(item => {
        const prod = products.find(p => p.id === item.productId);
        const cat = prod?.category || 'Microsoft Windows Keys';
        data[cat] = (data[cat] || 0) + item.price * item.quantity;
      });
    });
    return Object.keys(data).map(key => ({
      name: key,
      value: Math.round(data[key] * 100) / 100
    }));
  }, [orders, products]);

  const recentSalesData = useMemo(() => {
    // Generate mock revenue chart over last 7 days based on orders
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const result = days.map(d => ({ day: d, sales: 0, revenue: 0 }));
    
    orders.filter(o => o.status === 'completed').forEach((o, index) => {
      const dayIdx = (new Date(o.createdAt).getDay() || index) % 7;
      result[dayIdx].revenue += o.totalAmount;
      result[dayIdx].sales += 1;
    });

    // Make sure it's not all zero for preview visuals
    if (totalRevenue === 0) {
      return [
        { day: 'Mon', sales: 4, revenue: 120 },
        { day: 'Tue', sales: 7, revenue: 210 },
        { day: 'Wed', sales: 5, revenue: 150 },
        { day: 'Thu', sales: 12, revenue: 380 },
        { day: 'Fri', sales: 15, revenue: 490 },
        { day: 'Sat', sales: 18, revenue: 580 },
        { day: 'Sun', sales: 22, revenue: 740 },
      ];
    }
    return result;
  }, [orders, totalRevenue]);

  // Filters
  const filteredProductsList = products.filter(p => {
    return p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const filteredOrdersList = orders.filter(o => {
    return o.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
           o.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
           o.userName.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const filteredKeysList = inventoryKeys.filter(k => {
    if (selectedProductKeysView !== 'all' && k.productId !== selectedProductKeysView) return false;
    return k.keyString.toLowerCase().includes(searchQuery.toLowerCase()) ||
           k.productTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
           (k.soldToEmail && k.soldToEmail.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8" id="admin-panel-container">
      
      {/* Admin Title Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6" id="admin-header">
        <div className="space-y-1">
          <div className="flex items-center space-x-2.5">
            <div className="bg-[#3b82f6]/10 border border-[#3b82f6]/30 text-[#3b82f6] p-2 rounded-xl">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-light tracking-wide text-white uppercase">Central Operations Console</h1>
              <p className="text-xs font-mono text-[#CBD5E1]/60">Secure Netlyrakeys Keys & Subscriptions Warehouse Administration</p>
            </div>
          </div>
        </div>
        <button
          onClick={onBackToCatalog}
          className="bg-[#FFFFFF] hover:bg-[#FFFFFF] text-white border border-white/[0.08] px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center space-x-2 transition-all duration-200 cursor-pointer self-start md:self-auto"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Exit To Catalog</span>
        </button>
      </div>

      {/* Admin Quick Summary Stats Ribbon */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" id="admin-summary-ribbon">
        <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-white/[0.08] space-y-1">
          <div className="text-white/40 font-mono text-[9px] uppercase tracking-widest">Gross Sales revenue</div>
          <div className="text-2xl font-semibold tracking-tight text-emerald-400 flex items-center">
            <span className="mr-1">₹</span>
            <span>{totalRevenue.toFixed(2)}</span>
          </div>
          <div className="text-[10px] text-white/30 font-light">Real completed transaction total</div>
        </div>
        <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-white/[0.08] space-y-1">
          <div className="text-white/40 font-mono text-[9px] uppercase tracking-widest">Total Orders Handled</div>
          <div className="text-2xl font-semibold tracking-tight text-[#3b82f6]">
            <span>{orders.length}</span>
          </div>
          <div className="text-[10px] text-white/30 font-light">
            <span className="text-emerald-400 font-semibold">{totalSalesCount}</span> successfully paid & delivered
          </div>
        </div>
        <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-white/[0.08] space-y-1">
          <div className="text-white/40 font-mono text-[9px] uppercase tracking-widest">Active Coupon Promos</div>
          <div className="text-2xl font-semibold tracking-tight text-amber-400">
            <span>{coupons.filter(c => c.active).length}</span>
          </div>
          <div className="text-[10px] text-white/30 font-light">Applied discount campaign codes</div>
        </div>
        <div className="bg-[#FFFFFF] p-5 rounded-2xl border border-white/[0.08] space-y-1">
          <div className="text-white/40 font-mono text-[9px] uppercase tracking-widest">License Key Inventory</div>
          <div className="text-2xl font-semibold tracking-tight text-purple-400">
            <span>{keyStockStatus.available}</span> <span className="text-xs text-white/30">/ {keyStockStatus.totalKeys} keys</span>
          </div>
          <div className="text-[10px] text-white/30 font-light">
            <span className="text-purple-400 font-semibold">{keyStockStatus.sold}</span> allocated to active orders
          </div>
        </div>
      </div>

      {/* Admin Operations Sub-Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/[0.08] pb-1" id="admin-sub-tabs">
        <button
          onClick={() => { setActiveSection('analytics'); setSearchQuery(''); }}
          className={`px-4 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center space-x-2 border-b-2 transition-all duration-200 cursor-pointer ${
            activeSection === 'analytics' ? 'border-[#3b82f6] text-[#3b82f6]' : 'border-transparent text-[#CBD5E1]/60 hover:text-white'
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          <span>Analytics Dashboard</span>
        </button>
        <button
          onClick={() => { setActiveSection('products'); setSearchQuery(''); }}
          className={`px-4 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center space-x-2 border-b-2 transition-all duration-200 cursor-pointer ${
            activeSection === 'products' ? 'border-[#3b82f6] text-[#3b82f6]' : 'border-transparent text-[#CBD5E1]/60 hover:text-white'
          }`}
        >
          <ShoppingBag className="h-4 w-4" />
          <span>Product Catalog ({products.length})</span>
        </button>
        <button
          onClick={() => { setActiveSection('inventory'); setSearchQuery(''); }}
          className={`px-4 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center space-x-2 border-b-2 transition-all duration-200 cursor-pointer ${
            activeSection === 'inventory' ? 'border-[#3b82f6] text-[#3b82f6]' : 'border-transparent text-[#CBD5E1]/60 hover:text-white'
          }`}
        >
          <Key className="h-4 w-4" />
          <span>Key Inventory ({inventoryKeys.length})</span>
        </button>
        <button
          onClick={() => { setActiveSection('orders'); setSearchQuery(''); }}
          className={`px-4 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center space-x-2 border-b-2 transition-all duration-200 cursor-pointer ${
            activeSection === 'orders' ? 'border-[#3b82f6] text-[#3b82f6]' : 'border-transparent text-[#CBD5E1]/60 hover:text-white'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>Order Management ({orders.length})</span>
        </button>
        <button
          onClick={() => { setActiveSection('refunds'); setSearchQuery(''); }}
          className={`px-4 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center space-x-2 border-b-2 transition-all duration-200 cursor-pointer ${
            activeSection === 'refunds' ? 'border-[#3b82f6] text-[#3b82f6]' : 'border-transparent text-[#CBD5E1]/60 hover:text-white'
          }`}
        >
          <RefreshCw className="h-4 w-4" />
          <span>Refund Requests ({refundRequests.length})</span>
        </button>
        <button
          onClick={() => { setActiveSection('coupons'); setSearchQuery(''); }}
          className={`px-4 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center space-x-2 border-b-2 transition-all duration-200 cursor-pointer ${
            activeSection === 'coupons' ? 'border-[#3b82f6] text-[#3b82f6]' : 'border-transparent text-[#CBD5E1]/60 hover:text-white'
          }`}
        >
          <Tag className="h-4 w-4" />
          <span>Coupon Promos ({coupons.length})</span>
        </button>
        <button
          onClick={() => { setActiveSection('customers'); setSearchQuery(''); }}
          className={`px-4 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center space-x-2 border-b-2 transition-all duration-200 cursor-pointer ${
            activeSection === 'customers' ? 'border-[#3b82f6] text-[#3b82f6]' : 'border-transparent text-[#CBD5E1]/60 hover:text-white'
          }`}
        >
          <Users className="h-4 w-4" />
          <span>Customers Base ({customers.length})</span>
        </button>
      </div>

      {/* SEARCH / UTILITY BAR */}
      {activeSection !== 'analytics' && (
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#FFFFFF] p-4 rounded-2xl border border-white/[0.08]" id="admin-search-ribbon">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
            <input
              type="text"
              placeholder={`Search ${activeSection}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#EEEEEE] border border-white/[0.08] rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono uppercase tracking-wider text-white placeholder-white/30 focus:border-[#3b82f6] outline-none transition-all duration-200"
            />
          </div>

          <div className="flex gap-2 self-end md:self-auto">
            {activeSection === 'products' && (
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  id="csv-import-file"
                  accept=".csv"
                  onChange={handleImportCSV}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => document.getElementById('csv-import-file')?.click()}
                  className="bg-[#FFFFFF] hover:bg-[#FFFFFF] text-white border border-white/[0.08] px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center space-x-1.5 transition-all duration-200 cursor-pointer"
                  title="Import products from a CSV file"
                >
                  <Upload className="h-4 w-4 text-emerald-400" />
                  <span className="hidden sm:inline">Import CSV</span>
                </button>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="bg-[#FFFFFF] hover:bg-[#FFFFFF] text-white border border-white/[0.08] px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center space-x-1.5 transition-all duration-200 cursor-pointer"
                  title="Export products to a CSV file"
                >
                  <Download className="h-4 w-4 text-[#3b82f6]" />
                  <span className="hidden sm:inline">Export CSV</span>
                </button>
                <button
                  type="button"
                  onClick={handleOpenNewProductForm}
                  className="brand-gradient-btn text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center space-x-1.5 transition-all duration-200 cursor-pointer shadow-lg"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Product</span>
                </button>
              </div>
            )}
            {activeSection === 'coupons' && (
              <button
                onClick={() => setCouponFormOpen(true)}
                className="brand-gradient-btn text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center space-x-1.5 transition-all duration-200 cursor-pointer shadow-lg"
              >
                <Plus className="h-4 w-4" />
                <span>Add Coupon</span>
              </button>
            )}
            {activeSection === 'inventory' && (
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Filter Product:</span>
                <select
                  value={selectedProductKeysView}
                  onChange={(e) => setSelectedProductKeysView(e.target.value)}
                  className="bg-[#EEEEEE] border border-white/[0.08] text-xs text-white uppercase tracking-wider font-mono rounded-xl p-2.5 outline-none focus:border-[#3b82f6]"
                >
                  <option value="all">ALL PRODUCTS</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.title.substring(0, 30)}...</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CORE SECTIONS SWITCH */}
      <div id="admin-main-section-render">
        
        {/* SECTION 1: ANALYTICS */}
        {activeSection === 'analytics' && (
          <div className="space-y-6" id="section-analytics">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Sales Revenue Trend */}
              <div className="lg:col-span-2 bg-[#FFFFFF] p-6 rounded-3xl border border-white/[0.08] space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Daily Operations revenue</h3>
                    <p className="text-xs text-white/40">Aggregated revenue values across calendar periods</p>
                  </div>
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                </div>
                
                <div className="h-72 w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={recentSalesData}>
                      <defs>
                        <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                      <XAxis dataKey="day" stroke="#555" fontSize={11} tickLine={false} />
                      <YAxis stroke="#555" fontSize={11} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#FFFFFF', borderColor: 'rgba(255,255,255,0.08)', borderRadius: 12 }} 
                        labelStyle={{ color: '#aaa', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#revenueGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Category Share */}
              <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-white/[0.08] space-y-4">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Share of Sales Category</h3>
                  <p className="text-xs text-white/40">Distribution of gross revenues by department</p>
                </div>

                <div className="h-56 w-full flex items-center justify-center relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryRevenue}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryRevenue.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#60a5fa', '#a78bfa', '#fb7185', '#34d399', '#f59e0b', '#3b82f6', '#ec4899', '#14b8a6', '#f43f5e'][index % 9]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#FFFFFF', borderColor: 'rgba(255,255,255,0.08)', borderRadius: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  {/* Legend Overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
                    <div className="text-[10px] text-white/40 font-mono uppercase">Sales Value</div>
                    <div className="text-lg font-bold text-white">${totalRevenue.toFixed(0)}</div>
                  </div>
                </div>

                {/* Legend list */}
                <div className="grid grid-cols-2 gap-2 text-center text-[10px] font-mono">
                  {categoryRevenue.slice(0, 4).map((cat, index) => {
                    const colors = ['#60a5fa', '#a78bfa', '#fb7185', '#34d399', '#f59e0b', '#3b82f6', '#ec4899', '#14b8a6', '#f43f5e'];
                    return (
                      <div key={cat.name} className="space-y-1">
                        <div className="flex items-center justify-center space-x-1.5">
                          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
                          <span className="text-white/60 truncate max-w-[120px]" title={cat.name}>{cat.name}</span>
                        </div>
                        <div className="font-semibold text-white">${cat.value}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Row - Stock Status Alerts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-white/[0.08] space-y-3 col-span-1 md:col-span-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white">Stock Level Threshold Watch</h4>
                  <span className="bg-red-950 text-red-400 border border-red-500/20 px-2 py-0.5 rounded text-[9px] font-mono uppercase">Under 15 items</span>
                </div>
                <div className="space-y-3.5">
                  {products.filter(p => p.stock < 15).slice(0, 4).map(p => (
                    <div key={p.id} className="flex items-center justify-between border-b border-white/[0.08] pb-2 last:border-0 last:pb-0 text-xs">
                      <span className="text-white/80 truncate max-w-sm font-medium">{p.title}</span>
                      <div className="flex items-center space-x-3 shrink-0">
                        <span className="font-mono text-red-400 font-semibold">{p.stock} left</span>
                        <button 
                          onClick={() => {
                            setActiveSection('inventory');
                            setNewKeysProductId(p.id);
                          }}
                          className="bg-[#FFFFFF] hover:bg-[#3b82f6] text-[#CBD5E1] hover:text-white px-2.5 py-1 rounded border border-white/[0.08] text-[10px] uppercase font-bold tracking-wider transition-all duration-200"
                        >
                          Restock Keys
                        </button>
                      </div>
                    </div>
                  ))}
                  {products.filter(p => p.stock < 15).length === 0 && (
                    <div className="text-center py-6 text-xs text-white/30 italic">All products are healthy. Minimum key inventories are satisfied!</div>
                  )}
                </div>
              </div>

              {/* Conversion metrics box */}
              <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-white/[0.08] space-y-4 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#CBD5E1]/60">Core Operational Metrics</h4>
                  <div className="mt-4 space-y-3.5 font-mono text-xs">
                    <div className="flex justify-between border-b border-white/[0.08] pb-1.5">
                      <span className="text-white/40">Average Order Value:</span>
                      <span className="text-white font-semibold">${orders.length ? (totalRevenue / orders.filter(o=>o.status==='completed').length || 1).toFixed(2) : '0.00'}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/[0.08] pb-1.5">
                      <span className="text-white/40">Delivered Key Health:</span>
                      <span className="text-emerald-400 font-semibold">100% Genuine</span>
                    </div>
                    <div className="flex justify-between border-b border-white/[0.08] pb-1.5">
                      <span className="text-white/40">Verification Rate:</span>
                      <span className="text-[#3b82f6] font-semibold">99.8% Auto</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/40">License Solved Rate:</span>
                      <span className="text-purple-400 font-semibold">{keyStockStatus.totalKeys ? ((keyStockStatus.sold / keyStockStatus.totalKeys)*100).toFixed(1) : '35.4'}%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-[#EEEEEE] rounded-xl p-3 border border-white/[0.08] text-center flex items-center space-x-3">
                  <Inbox className="h-5 w-5 text-[#3b82f6]" />
                  <div className="text-left">
                    <div className="text-[9px] font-mono uppercase text-white/40">Payment Integrations</div>
                    <div className="text-[10px] text-white/80 font-bold uppercase tracking-wider">Razorpay • GPay • Cashfree</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: PRODUCTS */}
        {activeSection === 'products' && (
          <div className="bg-[#FFFFFF] rounded-3xl border border-white/[0.08] overflow-hidden" id="section-products-list">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FFFFFF] border-b border-white/[0.08] text-[#CBD5E1]/60 uppercase tracking-widest font-mono text-[10px]">
                    <th className="p-4">Product Info</th>
                    <th className="p-4">Category</th>
                    <th className="p-4 text-right">M.R.P.</th>
                    <th className="p-4 text-right">Sale Price</th>
                    <th className="p-4 text-center">Calculated Stock</th>
                    <th className="p-4 text-center">Reviews</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.08] font-light">
                  {filteredProductsList.map(p => (
                    <tr key={p.id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <img src={p.imageUrl} alt={p.title} className="h-10 w-10 rounded-lg object-cover bg-[#EEEEEE] border border-white/[0.08]" />
                          <div className="max-w-xs space-y-0.5">
                            <div className="text-white font-medium truncate">{p.title}</div>
                            <div className="text-[10px] text-white/40 font-mono uppercase">ID: {p.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="bg-[#3b82f6]/10 border border-[#3b82f6]/25 px-2 py-1 rounded-full text-[10px] uppercase font-mono tracking-wider text-[#3b82f6]">
                          {p.category}
                        </span>
                      </td>
                      <td className="p-4 text-right font-mono text-white/40">${p.price.toFixed(2)}</td>
                      <td className="p-4 text-right font-mono text-emerald-400 font-semibold">${p.salePrice.toFixed(2)}</td>
                      <td className="p-4 text-center font-mono">
                        <span className={`px-2 py-0.5 rounded-md font-bold ${
                          p.stock < 15 ? 'bg-rose-950/50 text-rose-400 border border-rose-500/20' : 'bg-emerald-950/50 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {p.stock}
                        </span>
                      </td>
                      <td className="p-4 text-center text-white/50">⭐ {p.rating} ({p.reviewsCount})</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            type="button"
                            onClick={() => handleToggleProductStatus(p)}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                              p.status === 'Active' 
                                ? 'bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-400 border-emerald-500/25' 
                                : 'bg-[#FFFFFF] hover:bg-[#FFFFFF] text-[#CBD5E1] border-white/[0.08]'
                            }`}
                            title={p.status === 'Active' ? 'Deactivate (Set to Hidden)' : 'Activate (Set to Active)'}
                          >
                            <span className="text-[9px] font-mono uppercase font-bold px-1">
                              {p.status === 'Active' ? 'Active' : 'Hidden'}
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDuplicateProduct(p)}
                            className="bg-[#FFFFFF] hover:bg-[#FFFFFF] text-[#CBD5E1] p-2 rounded-xl border border-white/[0.08] transition-all cursor-pointer"
                            title="Duplicate Product (Copy SKU)"
                          >
                            <Copy className="h-4 w-4 text-amber-400" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStartEditProduct(p)}
                            className="bg-[#FFFFFF] hover:bg-[#FFFFFF] text-[#CBD5E1] p-2 rounded-xl border border-white/[0.08] transition-all cursor-pointer"
                            title="Edit Product"
                          >
                            <Settings className="h-4 w-4 text-blue-400" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this product?")) {
                                onDeleteProduct(p.id);
                              }
                            }}
                            className="bg-[#FFFFFF] hover:bg-rose-500/10 text-rose-400 p-2 rounded-xl border border-white/[0.08] hover:border-rose-500/30 transition-all cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredProductsList.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-white/30 italic">No products matching filters found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION 3: KEY INVENTORY */}
        {activeSection === 'inventory' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" id="section-inventory">
            
            {/* Keys Allocation Form */}
            <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-white/[0.08] space-y-4 self-start">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Replenish Activation Keys</h3>
                <p className="text-xs text-white/40">Select a product and load serial codes to raise stock</p>
              </div>

              <form onSubmit={handleAddKeysSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-white/40 uppercase">Product target</label>
                  <select
                    value={newKeysProductId}
                    onChange={(e) => setNewKeysProductId(e.target.value)}
                    className="w-full bg-[#EEEEEE] border border-white/[0.08] text-xs text-white rounded-xl p-3 outline-none focus:border-[#3b82f6]"
                    required
                  >
                    <option value="">SELECT PRODUCT...</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-white/40 uppercase">Enter License Keys (one per line)</label>
                  <textarea
                    rows={6}
                    value={newKeysInput}
                    onChange={(e) => setNewKeysInput(e.target.value)}
                    placeholder="ABCD-EFGH-IJKL-MNOP&#10;QWERT-YUIOP-ASDFG-HJKLM"
                    className="w-full bg-[#EEEEEE] border border-white/[0.08] text-xs text-white rounded-xl p-3 font-mono outline-none focus:border-[#3b82f6] resize-none"
                    required
                  />
                  <p className="text-[10px] text-white/30 leading-tight">These codes will be marked as available. Selling them increments the product stock count automatically.</p>
                </div>

                <button
                  type="submit"
                  className="w-full brand-gradient-btn text-white font-bold text-[10px] uppercase tracking-widest py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Verify & Append Keys</span>
                </button>
              </form>
            </div>

            {/* Keys Table Database */}
            <div className="lg:col-span-2 bg-[#FFFFFF] rounded-3xl border border-white/[0.08] overflow-hidden flex flex-col h-[520px]">
              <div className="p-4 bg-[#FFFFFF] border-b border-white/[0.08] font-bold text-xs uppercase tracking-wider flex justify-between items-center text-white">
                <span>License Keys Database</span>
                <span className="text-[10px] font-mono text-[#3b82f6] bg-[#3b82f6]/10 px-2.5 py-0.5 rounded-full border border-[#3b82f6]/20">{filteredKeysList.length} total codes</span>
              </div>
              <div className="overflow-y-auto flex-1">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#EEEEEE] border-b border-white/[0.08] text-white/50 uppercase tracking-widest font-mono text-[9px]">
                      <th className="p-3.5">Product Title</th>
                      <th className="p-3.5">Key Serial String</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Allocation Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.08] font-mono text-[11px] font-light">
                    {filteredKeysList.map(key => (
                      <tr key={key.id} className="hover:bg-white/[0.03] transition-colors">
                        <td className="p-3.5 text-white/80 max-w-xs truncate uppercase font-sans font-medium">{key.productTitle}</td>
                        <td className="p-3.5 text-blue-300 tracking-wider font-semibold">{key.keyString}</td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                            key.status === 'available' 
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/20' 
                              : 'bg-white/5 text-white/40 border border-white/10'
                          }`}>
                            {key.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-[10px] text-white/40">
                          {key.status === 'sold' ? (
                            <div className="space-y-0.5">
                              <div className="text-white/70">To: {key.soldToEmail}</div>
                              <div className="text-[9px] text-blue-400">Order: {key.orderId?.substring(0, 15)}...</div>
                              <div className="text-[9px]">{key.soldAt ? new Date(key.soldAt).toLocaleDateString() : ''}</div>
                            </div>
                          ) : (
                            <span className="italic text-emerald-500/60">Ready in digital pool</span>
                          )}
                        </td>
                      </tr>
                    ))}
                    {filteredKeysList.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center py-16 text-white/30 italic font-sans text-xs">No license keys matching select product or search string.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* SECTION 4: ORDERS */}
        {activeSection === 'orders' && (
          <div className="bg-[#FFFFFF] rounded-3xl border border-white/[0.08] overflow-hidden" id="section-orders-list">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FFFFFF] border-b border-white/[0.08] text-[#CBD5E1]/60 uppercase tracking-widest font-mono text-[10px]">
                    <th className="p-4">Order Details</th>
                    <th className="p-4">Customer Info</th>
                    <th className="p-4">Items Summary</th>
                    <th className="p-4 text-right">Total Amount</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-center">Payment Gateway</th>
                    <th className="p-4 text-right">Toggle Status Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.08] font-light">
                  {filteredOrdersList.map(o => (
                    <tr key={o.id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="p-4">
                        <div className="space-y-1 font-mono text-[11px]">
                          <div className="text-[#3b82f6] font-bold">{o.id}</div>
                          <div className="text-white/40 text-[9px]">{new Date(o.createdAt).toLocaleString()}</div>
                          <div className="text-[9px] bg-[#EEEEEE] border border-white/[0.08] text-white/50 px-1.5 py-0.5 rounded inline-block truncate max-w-[150px]">
                            TXN: {o.paymentDetails?.transactionId || 'None'}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-0.5">
                          <div className="text-white font-medium">{o.userName || 'Guest User'}</div>
                          <div className="text-white/40 font-mono text-[10px]">{o.userEmail}</div>
                          {o.userPhone && <div className="text-white/30 text-[10px]">{o.userPhone}</div>}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1.5">
                          {o.items.map((it, idx) => (
                            <div key={idx} className="text-white/80">
                              <span className="font-semibold text-[#3b82f6]">{it.quantity}x</span> {it.title}
                              {it.licenseKeys && it.licenseKeys.length > 0 && (
                                <div className="mt-1 flex flex-wrap gap-1 font-mono text-[10px]">
                                  {it.licenseKeys.map((k, ki) => (
                                    <span key={ki} className="bg-[#3b82f6]/10 text-[#3b82f6] px-1.5 py-0.5 rounded border border-[#3b82f6]/20">
                                      🔑 {k}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="p-4 text-right font-mono text-emerald-400 font-semibold text-sm">
                        ${o.totalAmount.toFixed(2)}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          o.status === 'completed' 
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/20' 
                            : o.status === 'pending'
                            ? 'bg-amber-950 text-amber-400 border border-amber-500/20'
                            : 'bg-rose-950 text-rose-400 border border-rose-500/20'
                        }`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="p-4 text-center uppercase text-[10px] font-mono text-white/60 font-semibold">
                        {o.paymentMethod || 'Razorpay'}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          <button
                            onClick={() => onUpdateOrderStatus(o.id, 'completed')}
                            className="bg-emerald-950/30 hover:bg-emerald-900/50 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-xl text-[9px] uppercase tracking-wider font-bold transition-all cursor-pointer"
                            title="Complete Order"
                          >
                            Mark Paid
                          </button>
                          <button
                            onClick={() => onUpdateOrderStatus(o.id, 'failed')}
                            className="bg-rose-950/30 hover:bg-rose-900/50 text-rose-400 border border-rose-500/20 px-2.5 py-1 rounded-xl text-[9px] uppercase tracking-wider font-bold transition-all cursor-pointer"
                            title="Cancel Order"
                          >
                            Mark Fail
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredOrdersList.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-white/30 italic">No customer orders matching search.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION 5: REFUNDS */}
        {activeSection === 'refunds' && (
          <div className="bg-[#FFFFFF] rounded-3xl border border-white/[0.08] overflow-hidden animate-fade-in" id="section-refunds">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FFFFFF] border-b border-white/[0.08] text-[#CBD5E1]/60 uppercase tracking-widest font-mono text-[10px]">
                    <th className="p-4">Refund ID</th>
                    <th className="p-4">Order Association</th>
                    <th className="p-4">Customer Details</th>
                    <th className="p-4">Refund Reason</th>
                    <th className="p-4 text-right">Refund Amount</th>
                    <th className="p-4 text-center">Status</th>
                    <th className="p-4 text-right">Operations Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.08] font-light">
                  {refundRequests.map(ref => (
                    <tr key={ref.id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="p-4 font-mono text-[#3b82f6] font-bold text-[11px]">{ref.id}</td>
                      <td className="p-4 font-mono text-white/60 text-[11px]">{ref.orderId}</td>
                      <td className="p-4">
                        <div className="space-y-0.5">
                          <div className="text-white font-medium">{ref.customerName}</div>
                          <div className="text-white/40 font-mono text-[10px]">{ref.customerEmail}</div>
                        </div>
                      </td>
                      <td className="p-4 text-white/70 italic text-[11px]">"{ref.reason}"</td>
                      <td className="p-4 text-right font-mono text-emerald-400 font-semibold text-sm">
                        ${ref.amount.toFixed(2)}
                      </td>
                      <td className="p-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          ref.status === 'approved' 
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/20' 
                            : ref.status === 'pending'
                            ? 'bg-amber-950 text-amber-400 border border-amber-500/20'
                            : 'bg-rose-950 text-rose-400 border border-rose-500/20'
                        }`}>
                          {ref.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        {ref.status === 'pending' ? (
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => onProcessRefund(ref.id, 'approved')}
                              className="bg-emerald-500 hover:bg-emerald-400 text-black px-2.5 py-1.5 rounded-xl text-[9px] uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center space-x-1"
                            >
                              <Check className="h-3 w-3" />
                              <span>Approve</span>
                            </button>
                            <button
                              onClick={() => onProcessRefund(ref.id, 'rejected')}
                              className="bg-[#FFFFFF] hover:bg-rose-500/10 text-rose-400 border border-white/[0.08] hover:border-rose-500/30 px-2.5 py-1.5 rounded-xl text-[9px] uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center space-x-1"
                            >
                              <X className="h-3 w-3" />
                              <span>Reject</span>
                            </button>
                          </div>
                        ) : (
                          <span className="text-white/30 text-[10px] italic">Resolved</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {refundRequests.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-white/30 italic">No refund requests logged.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* SECTION 6: COUPONS */}
        {activeSection === 'coupons' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="section-coupons">
            
            {/* Coupon display table */}
            <div className="md:col-span-2 bg-[#FFFFFF] rounded-3xl border border-white/[0.08] overflow-hidden">
              <div className="p-4 bg-[#FFFFFF] border-b border-white/[0.08] text-xs font-bold uppercase tracking-wider text-white">Active Store Coupons</div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#EEEEEE] border-b border-white/[0.08] text-white/50 uppercase tracking-widest font-mono text-[9px]">
                      <th className="p-3.5">Promo Code</th>
                      <th className="p-3.5">Discount Metric</th>
                      <th className="p-3.5 text-right">Min Order Size</th>
                      <th className="p-3.5 text-center">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.08] font-mono text-[11px] font-light">
                    {coupons.map(cp => (
                      <tr key={cp.id} className="hover:bg-white/[0.03] transition-colors">
                        <td className="p-3.5 font-bold text-white tracking-wider flex items-center space-x-1.5">
                          <Tag className="h-3.5 w-3.5 text-[#3b82f6]" />
                          <span>{cp.code}</span>
                        </td>
                        <td className="p-3.5 text-emerald-400 font-semibold">
                          {cp.discountType === 'percent' ? `${cp.discountValue}% OFF` : `$${cp.discountValue.toFixed(2)} OFF`}
                        </td>
                        <td className="p-3.5 text-right font-mono text-white/40">${cp.minOrderAmount.toFixed(2)}</td>
                        <td className="p-3.5 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                            cp.active 
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/20' 
                              : 'bg-white/5 text-white/40 border border-white/10'
                          }`}>
                            {cp.active ? 'active' : 'disabled'}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => onDeleteCoupon(cp.id)}
                            className="bg-[#FFFFFF] hover:bg-rose-500/10 text-rose-400 p-1.5 rounded-xl border border-white/[0.08] hover:border-rose-500/30 transition-all cursor-pointer"
                            title="Delete Coupon"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {coupons.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center py-12 text-white/30 italic font-sans text-xs">No coupon promotion codes defined. Click Add Coupon to spawn!</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Coupon Creator */}
            <div className="bg-[#FFFFFF] p-6 rounded-3xl border border-white/[0.08] space-y-4 self-start">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Generate Promo Code</h3>
                <p className="text-xs text-white/40">Launch a new marketing campaign code</p>
              </div>

              <form onSubmit={handleSaveCoupon} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-white/40 uppercase">Coupon Code String</label>
                  <input
                    type="text"
                    required
                    placeholder="E.G. NEWYEAR50, WIN11SALE"
                    value={cpCode}
                    onChange={(e) => setCpCode(e.target.value)}
                    className="w-full bg-[#EEEEEE] border border-white/[0.08] text-xs text-white rounded-xl p-3 font-mono outline-none uppercase focus:border-[#3b82f6]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-white/40 uppercase">Type</label>
                    <select
                      value={cpType}
                      onChange={(e) => setCpType(e.target.value as any)}
                      className="w-full bg-[#EEEEEE] border border-white/[0.08] text-xs text-white rounded-xl p-3 outline-none focus:border-[#3b82f6]"
                    >
                      <option value="percent">PERCENT (%)</option>
                      <option value="fixed">FLAT ($)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-white/40 uppercase">Value</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={cpValue}
                      onChange={(e) => setCpValue(e.target.value)}
                      className="w-full bg-[#EEEEEE] border border-white/[0.08] text-xs text-white rounded-xl p-3 outline-none focus:border-[#3b82f6]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-white/40 uppercase">Min Order Threshold ($)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={cpMinOrder}
                    onChange={(e) => setCpMinOrder(e.target.value)}
                    className="w-full bg-[#EEEEEE] border border-white/[0.08] text-xs text-white rounded-xl p-3 outline-none focus:border-[#3b82f6]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full brand-gradient-btn text-white font-bold text-[10px] uppercase tracking-widest py-3 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
                >
                  <Tag className="h-4 w-4" />
                  <span>Deploy Coupon Code</span>
                </button>
              </form>
            </div>

          </div>
        )}

        {/* SECTION 7: CUSTOMERS */}
        {activeSection === 'customers' && (
          <div className="bg-[#FFFFFF] rounded-3xl border border-white/[0.08] overflow-hidden" id="section-customers">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FFFFFF] border-b border-white/[0.08] text-[#CBD5E1]/60 uppercase tracking-widest font-mono text-[10px]">
                    <th className="p-4">Customer Name</th>
                    <th className="p-4">Email Address</th>
                    <th className="p-4">Registered Date</th>
                    <th className="p-4 text-center">Orders Count</th>
                    <th className="p-4 text-right">Lifetime Spent</th>
                    <th className="p-4 text-center">Account Status</th>
                    <th className="p-4 text-right">Restrict Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.08] font-light">
                  {customers.map(cust => (
                    <tr key={cust.uid} className="hover:bg-white/[0.03] transition-colors">
                      <td className="p-4">
                        <div className="font-semibold text-white uppercase text-[11px]">{cust.name}</div>
                      </td>
                      <td className="p-4 font-mono text-[11px] text-white/70">{cust.email}</td>
                      <td className="p-4 font-mono text-[10px] text-white/40">{new Date(cust.createdAt).toLocaleDateString()}</td>
                      <td className="p-4 text-center font-mono font-semibold text-[#3b82f6]">{cust.totalOrders}</td>
                      <td className="p-4 text-right font-mono text-emerald-400 font-semibold">${cust.totalSpent.toFixed(2)}</td>
                      <td className="p-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                          cust.status === 'active' 
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/20' 
                            : 'bg-rose-950 text-rose-400 border border-rose-500/20'
                        }`}>
                          {cust.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => onToggleCustomerStatus(cust.uid)}
                          className={`px-3 py-1.5 rounded-xl text-[9px] uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center space-x-1.5 ml-auto border ${
                            cust.status === 'active'
                              ? 'bg-[#FFFFFF] hover:bg-rose-500/10 text-rose-400 border-white/[0.08] hover:border-rose-500/20'
                              : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/20'
                          }`}
                        >
                          {cust.status === 'active' ? (
                            <>
                              <UserX className="h-3 w-3" />
                              <span>Suspend Ban</span>
                            </>
                          ) : (
                            <>
                              <UserCheck className="h-3 w-3" />
                              <span>Reactivate</span>
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {customers.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-white/30 italic">No registered customer accounts found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* --- ADD / EDIT PRODUCT POPUP DIALOG MODAL --- */}
      <AnimatePresence>
        {productFormOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4" id="product-form-modal">
            <div className="fixed inset-0 bg-black/90 backdrop-blur-md" onClick={() => setProductFormOpen(false)} />
            
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-[#FFFFFF] border border-white/[0.08] rounded-3xl max-w-4xl w-full p-6 md:p-8 shadow-2xl z-10 space-y-6 max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={() => setProductFormOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.03] transition-all duration-200 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#3b82f6] bg-[#3b82f6]/10 border border-[#3b82f6]/25 px-2.5 py-1 rounded-md">
                  {editingProduct ? 'Update SKU' : 'Catalog Ingress'}
                </span>
                <h3 className="text-xl font-light text-white tracking-tight mt-2 font-sans">
                  {editingProduct ? `Modify SKU: ${editingProduct.title}` : 'Provision New Software Product'}
                </h3>
                <p className="text-xs text-white/40 mt-1 font-mono">Build comprehensive schemas, activate trust metrics, and deploy keys seamlessly.</p>
              </div>

              {/* Form Tab Headers */}
              <div className="flex border-b border-white/[0.08] pb-2 overflow-x-auto space-x-6 text-[10px] font-mono tracking-wider uppercase">
                <button
                  type="button"
                  onClick={() => setActiveFormTab('basic')}
                  className={`pb-2 px-1 transition-all border-b-2 font-bold ${activeFormTab === 'basic' ? 'border-[#3b82f6] text-[#3b82f6]' : 'border-transparent text-white/40 hover:text-white/80'}`}
                >
                  ✦ Basic Specs
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFormTab('pricing')}
                  className={`pb-2 px-1 transition-all border-b-2 font-bold ${activeFormTab === 'pricing' ? 'border-[#3b82f6] text-[#3b82f6]' : 'border-transparent text-white/40 hover:text-white/80'}`}
                >
                  ✦ Pricing & SKU Limits
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFormTab('media')}
                  className={`pb-2 px-1 transition-all border-b-2 font-bold ${activeFormTab === 'media' ? 'border-[#3b82f6] text-[#3b82f6]' : 'border-transparent text-white/40 hover:text-white/80'}`}
                >
                  ✦ WebP Media & Gallery
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFormTab('seo')}
                  className={`pb-2 px-1 transition-all border-b-2 font-bold ${activeFormTab === 'seo' ? 'border-[#3b82f6] text-[#3b82f6]' : 'border-transparent text-white/40 hover:text-white/80'}`}
                >
                  ✦ SEO & Trust Parameters
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-6 text-xs">
                
                {/* TAB 1: BASIC INFORMATION */}
                {activeFormTab === 'basic' && (
                  <div className="space-y-4 font-mono">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-[10px] text-white/40 uppercase">Product Title</label>
                        <input
                          type="text" required placeholder="E.G. Microsoft Windows 11 Professional Retail Key"
                          value={prodTitle} onChange={(e) => {
                            setProdTitle(e.target.value);
                            // Auto-generate slug
                            setProdSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                            setProdMetaTitle(e.target.value);
                          }}
                          className="w-full bg-[#EEEEEE] border border-white/[0.08] rounded-xl p-3 text-white outline-none focus:border-[#3b82f6] font-sans font-medium text-xs transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-[10px] text-white/40 uppercase">URL Slug (For SEO Routes)</label>
                        <input
                          type="text" required placeholder="windows-11-professional-retail-key"
                          value={prodSlug} onChange={(e) => setProdSlug(e.target.value.toLowerCase().replace(/[^a-z0-9\-]+/g, ''))}
                          className="w-full bg-[#EEEEEE] border border-white/[0.08] rounded-xl p-3 text-white outline-none focus:border-[#3b82f6] font-mono text-xs transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] text-white/40 uppercase">Brand/Publisher</label>
                        <input
                          type="text" placeholder="E.G. Microsoft, Adobe, Kaspersky"
                          value={prodBrand} onChange={(e) => setProdBrand(e.target.value)}
                          className="w-full bg-[#EEEEEE] border border-white/[0.08] rounded-xl p-3 text-white outline-none focus:border-[#3b82f6] font-sans transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] text-white/40 uppercase">Subcategory Class</label>
                        <input
                          type="text" placeholder="E.G. Operating Systems, Office Suites, VPN"
                          value={prodSubcategory} onChange={(e) => setProdSubcategory(e.target.value)}
                          className="w-full bg-[#EEEEEE] border border-white/[0.08] rounded-xl p-3 text-white outline-none focus:border-[#3b82f6] font-sans transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-[10px] text-white/40 uppercase">Primary Category Department</label>
                        <select
                          value={prodCategory} onChange={(e) => setProdCategory(e.target.value as any)}
                          className="w-full bg-[#EEEEEE] border border-white/[0.08] rounded-xl p-3 text-white outline-none focus:border-[#3b82f6] font-sans transition-colors cursor-pointer"
                        >
                          <option value="Microsoft Windows Keys">Microsoft Windows Keys</option>
                          <option value="Microsoft Office Keys">Microsoft Office Keys</option>
                          <option value="Antivirus & Security">Antivirus & Security</option>
                          <option value="Creative & Professional Software">Creative & Professional Software</option>
                          <option value="Developer Tools">Developer Tools</option>
                          <option value="VPN & Privacy">VPN & Privacy</option>
                          <option value="Gaming & Gift Cards">Gaming & Gift Cards</option>
                          <option value="Business & Enterprise Licenses">Business & Enterprise Licenses</option>
                        </select>
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-[10px] text-white/40 uppercase">Short Brief Summary Description</label>
                        <input
                          type="text" placeholder="Brief 1-sentence sales pitch"
                          value={prodShortDesc} onChange={(e) => setProdShortDesc(e.target.value)}
                          className="w-full bg-[#EEEEEE] border border-white/[0.08] rounded-xl p-3 text-white outline-none focus:border-[#3b82f6] font-sans transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-[10px] text-white/40 uppercase">Full Dynamic HTML Description</label>
                        <textarea
                          rows={3} required placeholder="Comprehensive catalog review copy..."
                          value={prodDesc} onChange={(e) => {
                            setProdDesc(e.target.value);
                            setProdFullDesc(e.target.value);
                          }}
                          className="w-full bg-[#EEEEEE] border border-white/[0.08] rounded-xl p-3 text-white outline-none focus:border-[#3b82f6] font-sans transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] text-white/40 uppercase">Highlights (One per line)</label>
                        <textarea
                          rows={4} required placeholder="Lifetime Retail License&#10;Genuine Activation&#10;Email Delivery"
                          value={prodFeatures} onChange={(e) => setProdFeatures(e.target.value)}
                          className="w-full bg-[#EEEEEE] border border-white/[0.08] rounded-xl p-3 text-white outline-none focus:border-[#3b82f6] font-sans resize-none transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] text-white/40 uppercase">Active activation guide instructions</label>
                        <textarea
                          rows={4} required placeholder="1. Go to official Microsoft activation.&#10;2. Input product serial serial code.&#10;3. Enjoy genuine OS."
                          value={prodGuide} onChange={(e) => setProdGuide(e.target.value)}
                          className="w-full bg-[#EEEEEE] border border-white/[0.08] rounded-xl p-3 text-white outline-none focus:border-[#3b82f6] font-sans resize-none transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: PRICING & LICENSE SPECIFICATION */}
                {activeFormTab === 'pricing' && (
                  <div className="space-y-4 font-mono">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-white/40 uppercase">Cost price (Internal expense) (₹)</label>
                        <input
                          type="number" step="0.01" required min="0"
                          value={prodCostPrice} onChange={(e) => setProdCostPrice(e.target.value)}
                          className="w-full bg-[#EEEEEE] border border-white/[0.08] rounded-xl p-3 text-white outline-none focus:border-[#3b82f6] transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] text-white/40 uppercase">Selling Price (INR ₹)</label>
                        <input
                          type="number" step="0.01" required min="1"
                          value={prodSalePrice} onChange={(e) => setProdSalePrice(e.target.value)}
                          className="w-full bg-[#EEEEEE] border border-white/[0.08] rounded-xl p-3 text-white outline-none focus:border-[#3b82f6] transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] text-white/40 uppercase">Compare price (Old MSRP) (₹)</label>
                        <input
                          type="number" step="0.01" required min="0"
                          value={prodPrice} onChange={(e) => setProdPrice(e.target.value)}
                          className="w-full bg-[#EEEEEE] border border-white/[0.08] rounded-xl p-3 text-white outline-none focus:border-[#3b82f6] transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] text-white/40 uppercase">Price Currency Code</label>
                        <select
                          value={prodCurrency} onChange={(e) => setProdCurrency(e.target.value)}
                          className="w-full bg-[#EEEEEE] border border-white/[0.08] rounded-xl p-3 text-white outline-none focus:border-[#3b82f6] transition-colors font-sans cursor-pointer"
                        >
                          <option value="INR">INR (₹) Default</option>
                          <option value="USD">USD ($)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] text-white/40 uppercase">Stock Level limit</label>
                        <input
                          type="number" required min="0"
                          value={prodStock} onChange={(e) => setProdStock(e.target.value)}
                          className="w-full bg-[#EEEEEE] border border-white/[0.08] rounded-xl p-3 text-white outline-none focus:border-[#3b82f6] transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] text-white/40 uppercase">SKU Availability status</label>
                        <select
                          value={prodStatus} onChange={(e) => setProdStatus(e.target.value as any)}
                          className="w-full bg-[#EEEEEE] border border-white/[0.08] rounded-xl p-3 text-white outline-none focus:border-[#3b82f6] transition-colors font-sans cursor-pointer"
                        >
                          <option value="Active">Active (Visible)</option>
                          <option value="Draft">Draft (Offline)</option>
                          <option value="Out Of Stock">Out Of Stock</option>
                          <option value="Hidden">Hidden (Direct Link Only)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] text-white/40 uppercase">License class Type</label>
                        <select
                          value={prodLicenseType} onChange={(e) => setProdLicenseType(e.target.value as any)}
                          className="w-full bg-[#EEEEEE] border border-white/[0.08] rounded-xl p-3 text-white outline-none focus:border-[#3b82f6] transition-colors font-sans cursor-pointer"
                        >
                          <option value="Retail">Retail Key</option>
                          <option value="OEM">OEM Hardware Key</option>
                          <option value="Volume">Volume Licensing (KMS/MAK)</option>
                          <option value="Subscription">Subscription Account/Key</option>
                          <option value="Enterprise">Enterprise License</option>
                          <option value="Lifetime">Lifetime Activation</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] text-white/40 uppercase">License validity duration</label>
                        <select
                          value={prodValidity} onChange={(e) => setProdValidity(e.target.value as any)}
                          className="w-full bg-[#EEEEEE] border border-white/[0.08] rounded-xl p-3 text-white outline-none focus:border-[#3b82f6] transition-colors font-sans cursor-pointer"
                        >
                          <option value="Lifetime">Lifetime Validity</option>
                          <option value="1 Year">1 Year Duration</option>
                          <option value="2 Year">2 Year Duration</option>
                          <option value="Monthly">Monthly Access</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] text-white/40 uppercase">Hardware activation limit</label>
                        <select
                          value={prodDeviceLimit} onChange={(e) => setProdDeviceLimit(e.target.value as any)}
                          className="w-full bg-[#EEEEEE] border border-white/[0.08] rounded-xl p-3 text-white outline-none focus:border-[#3b82f6] transition-colors font-sans cursor-pointer"
                        >
                          <option value="1 PC">1 PC Activation</option>
                          <option value="2 PC">2 PC Activations</option>
                          <option value="5 PC">5 PC Activations</option>
                          <option value="Unlimited">Unlimited Devices</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: MEDIA UPLOADS & IMAGES */}
                {activeFormTab === 'media' && (
                  <div className="space-y-6 font-mono">
                    <div className="bg-[#FFFFFF]/30 p-5 rounded-2xl border border-white/[0.08] space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">Canvas WebP Ingestion Station</h4>
                          <p className="text-[10px] text-white/40">Upload client files to perform auto-WebP conversion & cropping</p>
                        </div>
                        <Image className="h-5 w-5 text-[#3b82f6]" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        
                        {/* Box 1: Main Image Upload */}
                        <div className="bg-[#EEEEEE] border border-white/[0.08] p-4 rounded-xl flex flex-col justify-between space-y-3">
                          <div>
                            <span className="text-[9px] uppercase font-bold text-[#3b82f6]">Main SKU Cover</span>
                            <div className="mt-2 h-20 bg-black/50 rounded-lg flex items-center justify-center overflow-hidden border border-white/5 relative">
                              {prodImg ? <img src={prodImg} className="h-full w-full object-contain" alt="Main cover" /> : <span className="text-[9px] text-white/30">No Image</span>}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <input
                              type="file" accept="image/*" id="main-upload-file" className="hidden"
                              onChange={(e) => handleImageFileChange(e, 'main')}
                            />
                            <button
                              type="button" onClick={() => document.getElementById('main-upload-file')?.click()}
                              className="w-full bg-[#3b82f6]/10 hover:bg-[#3b82f6]/20 text-[#3b82f6] py-1.5 rounded-lg border border-[#3b82f6]/20 text-[9px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                            >
                              Upload File
                            </button>
                            <input
                              type="text" placeholder="Or paste absolute image URL..."
                              value={prodImg} onChange={(e) => setProdImg(e.target.value)}
                              className="w-full bg-[#EEEEEE] border border-white/[0.05] text-[9px] p-2 rounded text-white outline-none"
                            />
                          </div>
                        </div>

                        {/* Box 2: Thumbnail Upload */}
                        <div className="bg-[#EEEEEE] border border-white/[0.08] p-4 rounded-xl flex flex-col justify-between space-y-3">
                          <div>
                            <span className="text-[9px] uppercase font-bold text-blue-400">SKU Core Thumbnail</span>
                            <div className="mt-2 h-20 bg-black/50 rounded-lg flex items-center justify-center overflow-hidden border border-white/5">
                              {prodThumbnail ? <img src={prodThumbnail} className="h-full w-full object-contain" alt="Thumbnail cover" /> : <span className="text-[9px] text-white/30">No Image</span>}
                            </div>
                          </div>
                          <div className="space-y-2">
                            <input
                              type="file" accept="image/*" id="thumb-upload-file" className="hidden"
                              onChange={(e) => handleImageFileChange(e, 'thumbnail')}
                            />
                            <button
                              type="button" onClick={() => document.getElementById('thumb-upload-file')?.click()}
                              className="w-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 py-1.5 rounded-lg border border-blue-500/20 text-[9px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                            >
                              Upload File
                            </button>
                            <input
                              type="text" placeholder="Or paste absolute thumbnail URL..."
                              value={prodThumbnail} onChange={(e) => setProdThumbnail(e.target.value)}
                              className="w-full bg-[#EEEEEE] border border-white/[0.05] text-[9px] p-2 rounded text-white outline-none"
                            />
                          </div>
                        </div>

                        {/* Box 3: Gallery Queue Upload */}
                        <div className="bg-[#EEEEEE] border border-white/[0.08] p-4 rounded-xl flex flex-col justify-between space-y-3">
                          <div>
                            <span className="text-[9px] uppercase font-bold text-amber-400">Gallery Image Stream</span>
                            <div className="mt-2 h-20 bg-black/50 rounded-lg flex items-center justify-center border border-white/5 text-center p-2">
                              <span className="text-[9px] text-white/40 leading-tight">Add supplementary artwork displays below</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <input
                              type="file" accept="image/*" id="gallery-upload-file" className="hidden"
                              onChange={(e) => handleImageFileChange(e, 'gallery')}
                            />
                            <button
                              type="button" onClick={() => document.getElementById('gallery-upload-file')?.click()}
                              className="w-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 py-1.5 rounded-lg border border-amber-500/20 text-[9px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                            >
                              Incorporate Image
                            </button>
                            <button
                              type="button" onClick={() => {
                                const url = prompt('Enter image URL:');
                                if (url) setProdGallery(prev => [...prev, url]);
                              }}
                              className="w-full bg-white/5 hover:bg-white/10 text-white/60 py-1.5 rounded-lg border border-white/10 text-[9px] font-bold uppercase tracking-wider transition-all"
                            >
                              Add via direct URL
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Canvas Cropper Overlay Component */}
                    {cropImageSource && (
                      <div className="bg-[#EEEEEE] border border-dashed border-[#3b82f6]/40 p-5 rounded-2xl space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                            <span className="text-xs font-bold text-white uppercase tracking-wider">Canvas Studio Editor ({cropTarget.toUpperCase()})</span>
                          </div>
                          <button
                            type="button" onClick={() => setCropImageSource(null)}
                            className="text-white/40 hover:text-white"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 items-center">
                          <div className="relative max-w-[300px] max-h-[300px] bg-black/60 rounded-xl overflow-hidden border border-white/5 flex items-center justify-center p-2">
                            <img
                              id="canvas-source-image" src={cropImageSource}
                              style={{ transform: `scale(${cropZoom})`, transition: 'transform 0.15s ease-out' }}
                              className="max-h-[220px] max-w-full object-contain" alt="Target crop source"
                            />
                          </div>

                          <div className="flex-1 space-y-4 w-full">
                            <div className="space-y-1.5">
                              <label className="text-[10px] text-white/40 flex justify-between">
                                <span>Adjust Digital Zoom Scope:</span>
                                <span className="font-bold text-white font-mono">{cropZoom.toFixed(1)}x</span>
                              </label>
                              <input
                                type="range" min="1" max="3" step="0.1"
                                value={cropZoom} onChange={(e) => setCropZoom(parseFloat(e.target.value))}
                                className="w-full accent-[#3b82f6] bg-white/10 h-1 rounded-lg"
                              />
                            </div>

                            <div className="space-y-2">
                              <button
                                type="button" onClick={handleCropSave}
                                className="w-full brand-gradient-btn text-white py-2.5 rounded-xl text-xs uppercase tracking-widest font-bold transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
                              >
                                <Check className="h-4 w-4" />
                                <span>Crop & Convert to WebP</span>
                              </button>
                              <p className="text-[9px] text-white/30 leading-normal font-mono text-center">Outputs optimized 1:1 Aspect WebP rendering securely inside browser</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* SORTING MANAGER */}
                    <div className="space-y-2">
                      <label className="text-[10px] text-white/40 uppercase">Media Library Gallery Queue Manager (Touch & Click Reordering)</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {/* Display Main Image as Item 0 */}
                        <div className="bg-[#EEEEEE] rounded-xl p-2.5 border border-[#3b82f6]/20 flex flex-col justify-between space-y-2 relative group">
                          <span className="absolute top-1 right-1 bg-emerald-950 text-emerald-400 border border-emerald-500/20 text-[8px] font-bold px-1.5 py-0.5 rounded font-mono uppercase z-10">Main</span>
                          <div className="h-20 bg-black/50 rounded-lg flex items-center justify-center overflow-hidden">
                            {prodImg ? <img src={prodImg} className="h-full w-full object-contain" alt="Main cover preview" /> : <span className="text-[10px] text-white/20">Empty</span>}
                          </div>
                          <div className="text-[9px] text-white/30 truncate text-center">SKU Primary Cover</div>
                        </div>

                        {/* Display Gallery Items */}
                        {prodGallery.map((gImg, idx) => (
                          <div key={idx} className="bg-[#EEEEEE] rounded-xl p-2.5 border border-white/5 flex flex-col justify-between space-y-2 relative group hover:border-white/25 transition-colors">
                            <span className="absolute top-1 right-1 bg-black/60 text-white/70 text-[8px] font-mono px-1 py-0.5 rounded">#{idx + 1}</span>
                            <div className="h-20 bg-black/50 rounded-lg flex items-center justify-center overflow-hidden">
                              <img src={gImg} className="h-full w-full object-contain" alt={`Gallery item ${idx}`} />
                            </div>
                            
                            {/* Sorting controls */}
                            <div className="flex items-center justify-between text-[8px] font-mono font-bold uppercase text-white/50 pt-1 border-t border-white/5">
                              <button
                                type="button" onClick={() => {
                                  // Set as main
                                  const temp = prodImg;
                                  setProdImg(gImg);
                                  setProdGallery(prev => prev.map((img, i) => i === idx ? temp : img));
                                }}
                                className="hover:text-emerald-400" title="Set as Main Cover"
                              >
                                Set Main
                              </button>
                              
                              <div className="flex space-x-1">
                                {idx > 0 && (
                                  <button
                                    type="button" onClick={() => {
                                      // Move Left
                                      setProdGallery(prev => {
                                        const next = [...prev];
                                        const temp = next[idx];
                                        next[idx] = next[idx - 1];
                                        next[idx - 1] = temp;
                                        return next;
                                      });
                                    }}
                                    className="hover:text-blue-400" title="Move Left"
                                  >
                                    ◀
                                  </button>
                                )}
                                {idx < prodGallery.length - 1 && (
                                  <button
                                    type="button" onClick={() => {
                                      // Move Right
                                      setProdGallery(prev => {
                                        const next = [...prev];
                                        const temp = next[idx];
                                        next[idx] = next[idx + 1];
                                        next[idx + 1] = temp;
                                        return next;
                                      });
                                    }}
                                    className="hover:text-blue-400" title="Move Right"
                                  >
                                    ▶
                                  </button>
                                )}
                              </div>

                              <button
                                type="button" onClick={() => setProdGallery(prev => prev.filter((_, i) => i !== idx))}
                                className="hover:text-rose-400 text-rose-500" title="Delete Artwork"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}

                        {prodGallery.length === 0 && (
                          <div className="bg-[#FFFFFF]/30 rounded-xl p-3 border border-dashed border-white/10 flex flex-col items-center justify-center text-center col-span-3 min-h-[120px]">
                            <Plus className="h-4 w-4 text-white/20 mb-1" />
                            <p className="text-[9px] text-white/30">No gallery images added yet.</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: SEO & TRUST BADGES */}
                {activeFormTab === 'seo' && (
                  <div className="space-y-6 font-mono">
                    <div className="bg-[#FFFFFF]/40 p-5 rounded-2xl border border-white/[0.08] space-y-4">
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">Search Engine Optimization (SEO Meta)</h4>
                        <p className="text-[10px] text-white/40">Adjust tags rendered in search indexes to boost visibility</p>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] text-white/40 uppercase">Meta Title Tag</label>
                          <input
                            type="text" placeholder="E.G. Windows 11 Professional Retail Key | NetlyraKeys"
                            value={prodMetaTitle} onChange={(e) => setProdMetaTitle(e.target.value)}
                            className="w-full bg-[#EEEEEE] border border-white/[0.08] rounded-xl p-3 text-white outline-none focus:border-[#3b82f6] font-sans transition-colors"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] text-white/40 uppercase">Meta Description Tag</label>
                          <textarea
                            rows={2} placeholder="E.G. Buy genuine Windows 11 Pro keys with instant delivery, GST invoice and 24/7 premium support."
                            value={prodMetaDesc} onChange={(e) => setProdMetaDesc(e.target.value)}
                            className="w-full bg-[#EEEEEE] border border-white/[0.08] rounded-xl p-3 text-white outline-none focus:border-[#3b82f6] font-sans resize-none transition-colors"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] text-white/40 uppercase">Index Meta Keywords (Comma separated)</label>
                          <input
                            type="text" placeholder="windows 11 key, microsoft office, netlyrakeys, genuine license"
                            value={prodKeywords} onChange={(e) => setProdKeywords(e.target.value)}
                            className="w-full bg-[#EEEEEE] border border-white/[0.08] rounded-xl p-3 text-white outline-none focus:border-[#3b82f6] transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* TRUST BADGES SWITCHES GRID */}
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">SKU Trust Badges & Guarantees</h4>
                        <p className="text-[10px] text-white/40">Activate trust flags which display on client product pages</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        <div
                          onClick={() => setBadgeInstantDelivery(!badgeInstantDelivery)}
                          className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${badgeInstantDelivery ? 'bg-[#3b82f6]/10 border-[#3b82f6]/30 text-[#3b82f6]' : 'bg-[#EEEEEE] border-white/[0.08] text-white/40'}`}
                        >
                          <div className="text-left space-y-0.5">
                            <div className="text-[10px] font-bold uppercase">Instant Delivery</div>
                            <div className="text-[8px] opacity-60">Delivered within seconds</div>
                          </div>
                          {badgeInstantDelivery ? <Check className="h-4 w-4 text-[#3b82f6] shrink-0" /> : <X className="h-4 w-4 opacity-40 shrink-0" />}
                        </div>

                        <div
                          onClick={() => setBadgeGstInvoice(!badgeGstInvoice)}
                          className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${badgeGstInvoice ? 'bg-[#3b82f6]/10 border-[#3b82f6]/30 text-[#3b82f6]' : 'bg-[#EEEEEE] border-white/[0.08] text-white/40'}`}
                        >
                          <div className="text-left space-y-0.5">
                            <div className="text-[10px] font-bold uppercase">GST Invoice</div>
                            <div className="text-[8px] opacity-60">Includes GST input credit</div>
                          </div>
                          {badgeGstInvoice ? <Check className="h-4 w-4 text-[#3b82f6] shrink-0" /> : <X className="h-4 w-4 opacity-40 shrink-0" />}
                        </div>

                        <div
                          onClick={() => setBadgeActivationSupport(!badgeActivationSupport)}
                          className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${badgeActivationSupport ? 'bg-[#3b82f6]/10 border-[#3b82f6]/30 text-[#3b82f6]' : 'bg-[#EEEEEE] border-white/[0.08] text-white/40'}`}
                        >
                          <div className="text-left space-y-0.5">
                            <div className="text-[10px] font-bold uppercase">Activation Support</div>
                            <div className="text-[8px] opacity-60">Full setup support</div>
                          </div>
                          {badgeActivationSupport ? <Check className="h-4 w-4 text-[#3b82f6] shrink-0" /> : <X className="h-4 w-4 opacity-40 shrink-0" />}
                        </div>

                        <div
                          onClick={() => setBadgeWhatsappSupport(!badgeWhatsappSupport)}
                          className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${badgeWhatsappSupport ? 'bg-[#3b82f6]/10 border-[#3b82f6]/30 text-[#3b82f6]' : 'bg-[#EEEEEE] border-white/[0.08] text-white/40'}`}
                        >
                          <div className="text-left space-y-0.5">
                            <div className="text-[10px] font-bold uppercase">WhatsApp 24/7 Chat</div>
                            <div className="text-[8px] opacity-60">Live agent widget support</div>
                          </div>
                          {badgeWhatsappSupport ? <Check className="h-4 w-4 text-[#3b82f6] shrink-0" /> : <X className="h-4 w-4 opacity-40 shrink-0" />}
                        </div>

                        <div
                          onClick={() => setBadgeGenuineLicense(!badgeGenuineLicense)}
                          className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${badgeGenuineLicense ? 'bg-[#3b82f6]/10 border-[#3b82f6]/30 text-[#3b82f6]' : 'bg-[#EEEEEE] border-white/[0.08] text-white/40'}`}
                        >
                          <div className="text-left space-y-0.5">
                            <div className="text-[10px] font-bold uppercase">Genuine License</div>
                            <div className="text-[8px] opacity-60">100% legal digital software</div>
                          </div>
                          {badgeGenuineLicense ? <Check className="h-4 w-4 text-[#3b82f6] shrink-0" /> : <X className="h-4 w-4 opacity-40 shrink-0" />}
                        </div>

                        <div
                          onClick={() => setBadgeReplacementWarranty(!badgeReplacementWarranty)}
                          className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${badgeReplacementWarranty ? 'bg-[#3b82f6]/10 border-[#3b82f6]/30 text-[#3b82f6]' : 'bg-[#EEEEEE] border-white/[0.08] text-white/40'}`}
                        >
                          <div className="text-left space-y-0.5">
                            <div className="text-[10px] font-bold uppercase">Replacement Warranty</div>
                            <div className="text-[8px] opacity-60">Immediate key swaps</div>
                          </div>
                          {badgeReplacementWarranty ? <Check className="h-4 w-4 text-[#3b82f6] shrink-0" /> : <X className="h-4 w-4 opacity-40 shrink-0" />}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* MODAL CONTROL ACTIONS */}
                <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 font-mono text-[10px] uppercase tracking-wider">
                  <button
                    type="submit"
                    className="flex-1 brand-gradient-btn text-white font-bold py-3.5 rounded-xl transition-all duration-200 cursor-pointer text-center uppercase tracking-widest"
                  >
                    {editingProduct ? 'Commit SKU Changes' : 'Initialize & Deploy SKU'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setProductFormOpen(false)}
                    className="sm:w-32 bg-[#FFFFFF] hover:bg-white/[0.03] text-white border border-white/[0.08] font-bold py-3.5 rounded-xl transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
