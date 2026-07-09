export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  salePrice: number;
  imageUrl: string;
  thumbnailUrl?: string;
  galleryImages?: string[];
  description: string;
  features: string[];
  activationGuide: string;
  stock: number;
  rating: number;
  reviewsCount: number;
  licenseType?: 'Retail' | 'OEM' | 'Volume' | 'Subscription' | 'Enterprise' | 'Lifetime';
  deliveryTime?: string;
  devices?: string;
  
  // Extended Fields for Backend Product Management System
  slug?: string;
  shortDescription?: string;
  fullDescription?: string;
  subcategory?: string;
  brand?: string;
  costPrice?: number;
  currency?: string; // Default 'INR'
  validity?: 'Lifetime' | '1 Year' | '2 Year' | 'Monthly';
  deviceLimit?: '1 PC' | '2 PC' | '5 PC' | 'Unlimited';
  status?: 'Active' | 'Draft' | 'Out Of Stock' | 'Hidden'; // Product status
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
  };
  trustBadges?: {
    instantDelivery?: boolean;
    gstInvoice?: boolean;
    activationSupport?: boolean;
    whatsappSupport?: boolean;
    genuineLicense?: boolean;
    replacementWarranty?: boolean;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  licenseKeys: string[];
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  userPhone: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: 'card' | 'upi' | 'qr';
  createdAt: string;
  paymentDetails: {
    transactionId?: string;
    cardLast4?: string;
    upiId?: string;
  };
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
}

export type Category = 
  | 'All' 
  | 'Microsoft Windows Keys' 
  | 'Microsoft Office Keys' 
  | 'Antivirus & Security' 
  | 'Creative & Professional Software' 
  | 'Developer Tools' 
  | 'VPN & Privacy' 
  | 'Gaming & Gift Cards' 
  | 'Business & Enterprise Licenses';

export interface Coupon {
  id: string;
  code: string;
  discountType: 'percent' | 'fixed';
  discountValue: number;
  minOrderAmount: number;
  active: boolean;
}

export interface InventoryKey {
  id: string;
  productId: string;
  productTitle: string;
  keyString: string;
  status: 'available' | 'sold';
  orderId?: string;
  soldToEmail?: string;
  soldAt?: string;
}

export interface RefundRequest {
  id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  amount: number;
  requestedAt: string;
  resolvedAt?: string;
}

export interface Customer {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
  status: 'active' | 'banned';
  totalOrders: number;
  totalSpent: number;
}

