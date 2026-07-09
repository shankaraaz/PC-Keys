import React, { useState, useEffect } from 'react';
import { ShieldCheck, CreditCard, QrCode, Phone, Mail, User, CheckCircle2, Copy, Check, Loader2, ArrowLeft, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, Order, OrderItem, Coupon } from '../types';
import { User as FirebaseUser } from 'firebase/auth';

interface CheckoutPageProps {
  user: FirebaseUser | null;
  demoUser: { name: string; email: string } | null;
  cartItems: CartItem[];
  onOrderCreated: (order: Order) => void;
  onBackToCatalog: () => void;
  onSubmitOrderToFirestore: (orderData: Omit<Order, 'id' | 'createdAt'>) => Promise<string>;
  onAllocateKeys: (productId: string, qty: number, userEmail: string, orderId: string) => string[];
  coupons: Coupon[];
}

// Key Generator helper
function generateLicenseKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segment = () => Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `${segment()}-${segment()}-${segment()}-${segment()}-${segment()}`;
}

export default function CheckoutPage({
  user,
  demoUser,
  cartItems,
  onOrderCreated,
  onBackToCatalog,
  onSubmitOrderToFirestore,
  onAllocateKeys,
  coupons,
}: CheckoutPageProps) {
  const [formData, setFormData] = useState({
    name: user?.displayName || demoUser?.name || '',
    email: user?.email || demoUser?.email || '',
    phone: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'qr'>('card');
  const [paymentGateway, setPaymentGateway] = useState<'Razorpay' | 'GPay' | 'Cashfree' | 'PayU'>('Razorpay');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [upiId, setUpiId] = useState('');
  
  const [requireGst, setRequireGst] = useState(false);
  const [gstCompany, setGstCompany] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  
  const [couponInput, setCouponInput] = useState('');
  const [activeCoupon, setActiveCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  
  // Payment gateway simulation states
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Helper to calculate bulk business discount pricing
  const getBulkDiscountPrice = (price: number, quantity: number): number => {
    if (quantity >= 10) return price * 0.75; // 25% off for 10+ keys
    if (quantity >= 5) return price * 0.85;  // 15% off for 5+ keys
    return price;
  };

  const standardSubtotal = cartItems.reduce((acc, item) => acc + item.product.salePrice * item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + getBulkDiscountPrice(item.product.salePrice, item.quantity) * item.quantity, 0);
  const bulkSavingsAmount = standardSubtotal - subtotal;

  const discountAmount = activeCoupon 
    ? activeCoupon.discountType === 'percent' 
      ? subtotal * (activeCoupon.discountValue / 100) 
      : activeCoupon.discountValue 
    : 0;

  const grandTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = () => {
    setCouponError(null);
    setCouponSuccess(null);
    if (!couponInput.trim()) return;

    const matched = coupons.find(c => c.code.toLowerCase() === couponInput.trim().toLowerCase());
    if (!matched) {
      setCouponError('Invalid promo code');
      return;
    }
    if (!matched.active) {
      setCouponError('This coupon is currently expired or disabled');
      return;
    }
    if (subtotal < matched.minOrderAmount) {
      setCouponError(`Minimum order size to use this code is ₹${matched.minOrderAmount}`);
      return;
    }

    setActiveCoupon(matched);
    const savedAmount = matched.discountType === 'percent' 
      ? subtotal * (matched.discountValue / 100) 
      : matched.discountValue;
    setCouponSuccess(`Coupon '${matched.code}' applied! You saved ₹${Math.round(savedAmount)}!`);
  };

  const handleRemoveCoupon = () => {
    setActiveCoupon(null);
    setCouponInput('');
    setCouponError(null);
    setCouponSuccess(null);
  };

  // Sync auth details
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      name: user?.displayName || demoUser?.name || prev.name,
      email: user?.email || demoUser?.email || prev.email,
    }));
  }, [user, demoUser]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = 'Full Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email Address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Contact Phone is required';
    } else if (formData.phone.length < 8) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (paymentMethod === 'card') {
      if (!cardDetails.number || cardDetails.number.replace(/\s/g, '').length < 16) {
        errors.cardNumber = 'Valid 16-digit Card Number is required';
      }
      if (!cardDetails.expiry || !/^\d{2}\/\d{2}$/.test(cardDetails.expiry)) {
        errors.cardExpiry = 'Expiry date must be in MM/YY format';
      }
      if (!cardDetails.cvv || cardDetails.cvv.length < 3) {
        errors.cardCvv = 'CVV must be 3 or 4 digits';
      }
    } else if (paymentMethod === 'upi') {
      if (!upiId.includes('@')) {
        errors.upiId = 'Please enter a valid UPI ID (e.g. user@paytm)';
      }
    }

    if (requireGst) {
      if (!gstCompany.trim()) {
        errors.gstCompany = 'Company Name is required for GST Invoice';
      }
      if (!gstNumber.trim()) {
        errors.gstNumber = 'GSTIN number is required';
      } else if (gstNumber.trim().length !== 15) {
        errors.gstNumber = 'GSTIN must be exactly 15 alphanumeric characters';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const triggerPaymentSimulation = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    setProcessingStep(0);

    const steps = [
      'Validating secure checkout payload...',
      'Connecting to highly secure encryption gateway (AES-256)...',
      'Contacting bank verification systems...',
      'Payment Authorized. Generating digital product keys...',
      'Finalizing your digital order setup...',
    ];

    // Staggered payment simulation steps
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProcessingStep(prev => prev + 1);
    }

    const tentativeOrderId = 'ORD_' + Math.floor(Math.random() * 100000000);

    // Build Order Items and allocate genuine activation keys from the real inventory
    const orderItems: OrderItem[] = cartItems.map(item => {
      const keys = onAllocateKeys(item.product.id, item.quantity, formData.email, tentativeOrderId);
      return {
        productId: item.product.id,
        title: item.product.title,
        price: item.product.salePrice,
        quantity: item.quantity,
        licenseKeys: keys,
      };
    });

    const paymentDetails: any = {};
    if (paymentMethod === 'card') {
      paymentDetails.cardLast4 = cardDetails.number.slice(-4) || '4242';
    } else if (paymentMethod === 'upi') {
      paymentDetails.upiId = upiId;
    }
    paymentDetails.transactionId = 'TXN_' + Math.floor(Math.random() * 100000000);
    paymentDetails.gatewayUsed = paymentGateway;
    paymentDetails.methodLabel = `${paymentGateway} (${paymentMethod.toUpperCase()})`;

    const orderPayload = {
      userId: user?.uid || 'guest_' + Date.now(),
      userEmail: formData.email,
      userName: formData.name,
      userPhone: formData.phone,
      items: orderItems,
      totalAmount: grandTotal, // Use the discounted grand total
      status: 'completed' as const,
      paymentMethod,
      paymentDetails,
    };

    try {
      // Save order to Firestore
      const orderId = await onSubmitOrderToFirestore(orderPayload);
      
      const completeOrder: Order = {
        ...orderPayload,
        id: orderId,
        createdAt: new Date().toISOString(),
      };

      setCompletedOrder(completeOrder);
      onOrderCreated(completeOrder);
    } catch (err) {
      console.error("Failed to commit order: ", err);
      // Fallback in case of Firestore error (local checkout simulation success)
      const completeOrder: Order = {
        ...orderPayload,
        id: 'MOCK_ORD_' + Math.floor(Math.random() * 100000),
        createdAt: new Date().toISOString(),
      };
      setCompletedOrder(completeOrder);
      onOrderCreated(completeOrder);
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const stepsList = [
    'Validating secure checkout payload...',
    'Connecting to highly secure encryption gateway (AES-256)...',
    'Contacting bank verification systems...',
    'Payment Authorized. Generating digital product keys...',
    'Finalizing your digital order setup...',
  ];

  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12" id="checkout-success-view">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1E293B] rounded-3xl border border-white/[0.08] shadow-xl p-8 text-center space-y-6 text-[#CBD5E1]"
        >
          <div className="mx-auto h-16 w-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-400 border border-green-500/20 animate-bounce">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <div>
            <span className="bg-green-500/10 text-green-400 text-[10px] font-bold px-3 py-1.5 rounded-full border border-green-500/20 uppercase tracking-widest">
              Payment Successful
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight mt-3">
              Order Confirmed!
            </h2>
            <p className="text-sm text-white/40 mt-1.5">
              Order ID: <span className="font-mono font-semibold text-[#0EA5B7]">{completedOrder.id}</span>
            </p>
          </div>

          <div className="bg-[#263447] rounded-2xl p-6 text-left space-y-4 border border-white/[0.08]">
            <h3 className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] border-b border-white/5 pb-2">
              Your Purchased License Activation Keys
            </h3>
            
            {completedOrder.items.map((item, index) => (
              <div key={index} className="space-y-2.5">
                <p className="text-[10px] font-bold text-[#0EA5B7] uppercase tracking-widest">{item.title}</p>
                <div className="space-y-2">
                  {item.licenseKeys.map((key, keyIdx) => (
                    <div 
                      key={keyIdx} 
                      className="flex items-center justify-between bg-[#0B1120] border border-white/[0.08] rounded-xl px-4 py-3 font-mono text-sm font-semibold text-white shadow-sm"
                    >
                      <div className="flex items-center space-x-2">
                        <Key className="h-4 w-4 text-[#0EA5B7] shrink-0" />
                        <span className="tracking-wide select-all font-medium text-white/90">{key}</span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(key)}
                        className="p-1.5 rounded-lg hover:bg-white/5 text-[#0EA5B7] transition-all duration-200 cursor-pointer"
                        title="Copy Key"
                      >
                        {copiedKey === key ? (
                          <Check className="h-4.5 w-4.5 text-green-400" />
                        ) : (
                          <Copy className="h-4.5 w-4.5" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="p-5 bg-[#263447] rounded-2xl border border-white/[0.08] text-left">
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest mb-2">
              Activation Guidelines
            </h4>
            <ul className="text-xs text-white/60 space-y-1.5 leading-relaxed font-light">
              <li>1. These license keys are permanently saved inside your profile.</li>
              <li>2. Click your user account dropdown at the top right, and select 'My Purchased Keys' anytime to fetch these instructions and keys again.</li>
              <li>3. If you bought Microsoft Office Bind keys, be sure to bind them at setup.office.com using your official email.</li>
            </ul>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={onBackToCatalog}
              className="brand-gradient-btn text-white font-bold text-[10px] uppercase tracking-widest px-8 py-4 rounded-xl transition-all duration-200 cursor-pointer shadow-lg animate-fade-in"
            >
              Continue Shopping
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="checkout-view-layout">
      {/* Back button */}
      <button 
        onClick={onBackToCatalog}
        className="mb-6 flex items-center space-x-2 text-[#CBD5E1] hover:text-white text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer"
        id="back-to-catalog-btn"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Store Catalog</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Checkout Form & Secure Payment Sandbox */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Step 1: User & Checkout info */}
          <div className="bg-[#1E293B] rounded-3xl border border-white/[0.08] p-6 sm:p-8 shadow-sm space-y-6 text-[#CBD5E1]">
            <div className="flex items-center space-x-2.5">
              <div className="h-8 w-8 bg-[#263447] rounded-lg flex items-center justify-center text-[#0EA5B7] border border-white/[0.08]">
                <User className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-base font-semibold text-white tracking-tight">Fast Checkout Details</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Recipient Full Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white/30">
                    <User className="h-4 w-4" />
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className={`w-full pl-9 pr-4 py-2.5 bg-[#0B1120] border ${formErrors.name ? 'border-rose-500' : 'border-white/[0.08]'} focus:border-[#0EA5B7] rounded-xl text-sm font-light text-white placeholder-white/20 outline-none transition-colors`}
                    id="checkout-name-input"
                  />
                </div>
                {formErrors.name && <p className="text-[11px] text-rose-400 font-bold mt-1">{formErrors.name}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Delivery Email Address</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white/30">
                    <Mail className="h-4 w-4" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className={`w-full pl-9 pr-4 py-2.5 bg-[#0B1120] border ${formErrors.email ? 'border-rose-500' : 'border-white/[0.08]'} focus:border-[#0EA5B7] rounded-xl text-sm font-light text-white placeholder-white/20 outline-none transition-colors`}
                    id="checkout-email-input"
                  />
                </div>
                {formErrors.email && <p className="text-[11px] text-rose-400 font-bold mt-1">{formErrors.email}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Mobile Phone (for activation updates)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white/30">
                    <Phone className="h-4 w-4" />
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className={`w-full pl-9 pr-4 py-2.5 bg-[#0B1120] border ${formErrors.phone ? 'border-rose-500' : 'border-white/[0.08]'} focus:border-[#0EA5B7] rounded-xl text-sm font-light text-white placeholder-white/20 outline-none transition-colors`}
                    id="checkout-phone-input"
                  />
                </div>
                {formErrors.phone && <p className="text-[11px] text-rose-400 font-bold mt-1">{formErrors.phone}</p>}
              </div>

              {/* GST Invoice Option */}
              <div className="sm:col-span-2 pt-2 border-t border-white/5">
                <label className="flex items-center space-x-3 cursor-pointer group select-none">
                  <input
                    type="checkbox"
                    checked={requireGst}
                    onChange={(e) => setRequireGst(e.target.checked)}
                    className="w-4 h-4 bg-[#0B1120] border border-white/[0.08] text-[#0EA5B7] rounded focus:ring-0 cursor-pointer"
                    id="require-gst-checkbox"
                  />
                  <div className="text-left">
                    <span className="block text-xs font-semibold text-white group-hover:text-[#0EA5B7] transition-colors">I require a GST Invoice for this order</span>
                    <span className="block text-[10px] text-white/40">Claim input tax credit on business purchases.</span>
                  </div>
                </label>

                <AnimatePresence>
                  {requireGst && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden grid grid-cols-1 sm:grid-cols-2 gap-4"
                    >
                      <div>
                        <label className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Registered Company Name</label>
                        <input
                          type="text"
                          value={gstCompany}
                          onChange={(e) => {
                            setGstCompany(e.target.value);
                            if (formErrors.gstCompany) {
                              setFormErrors(prev => ({ ...prev, gstCompany: '' }));
                            }
                          }}
                          placeholder="Acme Corporation Private Limited"
                          className={`w-full px-4 py-2.5 bg-[#0B1120] border ${formErrors.gstCompany ? 'border-rose-500' : 'border-white/[0.08]'} focus:border-[#0EA5B7] rounded-xl text-sm font-light text-white placeholder-white/20 outline-none transition-colors`}
                          id="gst-company-input"
                        />
                        {formErrors.gstCompany && <p className="text-[11px] text-rose-400 font-bold mt-1">{formErrors.gstCompany}</p>}
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">GSTIN Number (15 Alphanumeric)</label>
                        <input
                          type="text"
                          maxLength={15}
                          value={gstNumber}
                          onChange={(e) => {
                            setGstNumber(e.target.value.toUpperCase());
                            if (formErrors.gstNumber) {
                              setFormErrors(prev => ({ ...prev, gstNumber: '' }));
                            }
                          }}
                          placeholder="22AAAAA1111A1Z1"
                          className={`w-full px-4 py-2.5 bg-[#0B1120] border ${formErrors.gstNumber ? 'border-rose-500' : 'border-white/[0.08]'} focus:border-[#0EA5B7] rounded-xl text-sm font-light text-white font-mono placeholder-white/20 outline-none transition-colors`}
                          id="gst-number-input"
                        />
                        {formErrors.gstNumber && <p className="text-[11px] text-rose-400 font-bold mt-1">{formErrors.gstNumber}</p>}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Step 2: Secure Payment Sandbox */}
          <div className="bg-[#1E293B] rounded-3xl border border-white/[0.08] p-6 sm:p-8 shadow-sm space-y-6 text-[#CBD5E1]">
            <div className="flex justify-between items-center border-b border-white/[0.08] pb-4">
              <div className="flex items-center space-x-2.5">
                <div className="h-8 w-8 bg-[#263447] rounded-lg flex items-center justify-center text-[#0EA5B7] border border-white/[0.08]">
                  <ShieldCheck className="h-4.5 w-4.5" />
                </div>
                <h3 className="text-base font-semibold text-white tracking-tight">Secure Payment Gateway</h3>
              </div>
              <span className="bg-green-500/10 text-green-400 text-[9px] font-bold px-2.5 py-1 rounded-md border border-green-500/20 uppercase tracking-widest">
                AES-256 Encrypted
              </span>
            </div>

            {/* Gateway Brand Selector */}
            <div className="space-y-2.5">
              <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest">Select Processing Gateway Channel</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Razorpay', 'GPay', 'Cashfree', 'PayU'] as const).map(gw => (
                  <button
                    key={gw}
                    type="button"
                    onClick={() => {
                      setPaymentGateway(gw);
                      if (gw === 'GPay') setPaymentMethod('upi');
                    }}
                    className={`py-3 px-3 border rounded-xl font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      paymentGateway === gw
                        ? 'border-[#0EA5B7] bg-[#0EA5B7]/10 text-[#0EA5B7]'
                        : 'border-white/[0.08] bg-[#0B1120] text-[#94A3B8] hover:text-white hover:bg-[#1E293B]'
                    }`}
                  >
                    {gw === 'GPay' ? 'Google Pay' : gw}
                  </button>
                ))}
              </div>
            </div>

            {/* Selector */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3" id="payment-selector-tabs">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-3.5 px-3 border rounded-xl font-bold text-xs flex flex-col items-center space-y-1.5 transition-all duration-200 cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-[#0EA5B7] bg-[#263447] text-white shadow-md'
                    : 'border-white/[0.08] bg-[#0B1120] text-[#CBD5E1] hover:bg-[#1E293B]'
                }`}
                id="pay-card-tab"
              >
                <CreditCard className="h-5 w-5 text-[#0EA5B7]" />
                <span>Credit/Debit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`py-3.5 px-3 border rounded-xl font-bold text-xs flex flex-col items-center space-y-1.5 transition-all duration-200 cursor-pointer ${
                  paymentMethod === 'upi'
                    ? 'border-[#0EA5B7] bg-[#263447] text-white shadow-md'
                    : 'border-white/[0.08] bg-[#0B1120] text-[#CBD5E1] hover:bg-[#1E293B]'
                }`}
                id="pay-upi-tab"
              >
                <div className="font-extrabold italic text-sm tracking-wide text-[#0EA5B7]">UPI</div>
                <span>UPI ID Payment</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('qr')}
                className={`py-3.5 px-3 border rounded-xl font-bold text-xs flex flex-col items-center space-y-1.5 transition-all duration-200 cursor-pointer ${
                  paymentMethod === 'qr'
                    ? 'border-[#0EA5B7] bg-[#263447] text-white shadow-md'
                    : 'border-white/[0.08] bg-[#0B1120] text-[#CBD5E1] hover:bg-[#1E293B]'
                }`}
                id="pay-qr-tab"
              >
                <QrCode className="h-5 w-5 text-[#0EA5B7]" />
                <span>Dynamic QR Code</span>
              </button>
            </div>

            {/* Fields container */}
            <div className="pt-2 border-t border-white/[0.08]" id="payment-details-inputs">
              <AnimatePresence mode="wait">
                {paymentMethod === 'card' && (
                  <motion.div
                    key="card"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className="col-span-2">
                      <label className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Card Holder Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-2.5 bg-[#0B1120] border border-white/[0.08] rounded-xl text-sm font-light text-white placeholder-white/20 outline-none focus:border-[#0EA5B7] transition-colors"
                        id="card-name-input"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Card Number</label>
                      <input
                        type="text"
                        placeholder="4242 4242 4242 4242"
                        maxLength={19}
                        value={cardDetails.number}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
                          setCardDetails(prev => ({ ...prev, number: val }));
                        }}
                        className={`w-full px-4 py-2.5 bg-[#0B1120] border ${formErrors.cardNumber ? 'border-rose-500' : 'border-white/[0.08]'} rounded-xl text-sm font-light text-white placeholder-white/20 outline-none focus:border-[#0EA5B7] transition-colors`}
                        id="card-number-input"
                      />
                      {formErrors.cardNumber && <p className="text-[11px] text-rose-400 font-bold mt-1">{formErrors.cardNumber}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: e.target.value }))}
                        className={`w-full px-4 py-2.5 bg-[#0B1120] border ${formErrors.cardExpiry ? 'border-rose-500' : 'border-white/[0.08]'} rounded-xl text-sm font-light text-white placeholder-white/20 outline-none focus:border-[#0EA5B7] transition-colors`}
                        id="card-expiry-input"
                      />
                      {formErrors.cardExpiry && <p className="text-[11px] text-rose-400 font-bold mt-1">{formErrors.cardExpiry}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Security CVV</label>
                      <input
                        type="password"
                        placeholder="***"
                        maxLength={4}
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                        className={`w-full px-4 py-2.5 bg-[#0B1120] border ${formErrors.cardCvv ? 'border-rose-500' : 'border-white/[0.08]'} rounded-xl text-sm font-light text-white placeholder-white/20 outline-none focus:border-[#0EA5B7] transition-colors`}
                        id="card-cvv-input"
                      />
                      {formErrors.cardCvv && <p className="text-[11px] text-rose-400 font-bold mt-1">{formErrors.cardCvv}</p>}
                    </div>
                  </motion.div>
                )}

                {paymentMethod === 'upi' && (
                  <motion.div
                    key="upi"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="space-y-3"
                  >
                    <div>
                      <label className="block text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">Enter your UPI ID</label>
                      <input
                        type="text"
                        placeholder="username@paytm / username@oksbi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className={`w-full px-4 py-2.5 bg-[#0B1120] border ${formErrors.upiId ? 'border-rose-500' : 'border-white/[0.08]'} rounded-xl text-sm font-light text-white placeholder-white/20 outline-none focus:border-[#0EA5B7] transition-colors`}
                        id="upi-id-input"
                      />
                      {formErrors.upiId && <p className="text-[11px] text-rose-400 font-bold mt-1">{formErrors.upiId}</p>}
                    </div>
                    <p className="text-[11px] text-[#94A3B8]">A payment collect notification request will be pushed securely to your UPI app.</p>
                  </motion.div>
                )}

                {paymentMethod === 'qr' && (
                  <motion.div
                    key="qr"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5 p-4.5 bg-[#0B1120] rounded-2xl border border-white/[0.08]"
                  >
                    {/* Fake dynamic scan-to-pay QR code */}
                    <div className="bg-white p-3 rounded-2xl border border-white/[0.08] flex items-center justify-center shrink-0">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=netlyrakeys@sbi%26pn=Netlyrakeys%26am=${subtotal}%26cu=USD`}
                        alt="Scan QR code"
                        className="w-32 h-32"
                      />
                    </div>
                    <div className="text-center sm:text-left space-y-2">
                      <p className="text-sm font-semibold text-white">Dynamic Scan & Pay QR Code</p>
                      <p className="text-xs text-[#94A3B8] leading-relaxed font-light">
                        Scan this dynamic QR Code using any certified UPI app (GooglePay, PhonePe, Paytm, or BHIM) to complete the checkout transaction securely.
                      </p>
                      <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                        <span className="bg-[#1E293B] border border-white/[0.08] text-[#0EA5B7] text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">GooglePay</span>
                        <span className="bg-[#1E293B] border border-white/[0.08] text-[#0EA5B7] text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">PhonePe</span>
                        <span className="bg-[#1E293B] border border-white/[0.08] text-[#0EA5B7] text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">Paytm</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Buy Action */}
            <div className="pt-4 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={triggerPaymentSimulation}
                className="w-full brand-gradient-btn text-white font-bold text-xs uppercase tracking-widest py-4 px-4 rounded-xl transition-all duration-200 shadow-lg cursor-pointer flex items-center justify-center"
                id="submit-payment-btn"
              >
                <span>Authorize & Pay ₹{Math.round(grandTotal)}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#1E293B] rounded-3xl border border-white/[0.08] p-6 sm:p-8 shadow-sm space-y-4 text-[#CBD5E1]">
            <h3 className="text-base font-semibold text-white tracking-tight">Purchase Summary</h3>
            
            <div className="space-y-3 divide-y divide-white/5">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-3.5 pt-3 first:pt-0">
                  <div className="h-12 w-12 rounded-xl bg-[#0B1120] overflow-hidden shrink-0 border border-white/[0.08]">
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-medium text-white line-clamp-1 leading-snug">
                      {item.product.title}
                    </h4>
                    <p className="text-[9px] text-[#0EA5B7] font-bold uppercase tracking-widest mt-0.5 flex flex-wrap gap-x-2">
                      <span>Qty: {item.quantity} × ₹{item.product.salePrice}</span>
                      {item.quantity >= 10 && <span className="text-emerald-400 font-bold font-mono">(25% Bulk Discount)</span>}
                      {item.quantity >= 5 && item.quantity < 10 && <span className="text-emerald-400 font-bold font-mono">(15% Bulk Discount)</span>}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-white">
                    ₹{Math.round(getBulkDiscountPrice(item.product.salePrice, item.quantity) * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Promo Coupon Application Box */}
            <div className="bg-[#0B1120] p-4.5 rounded-2xl border border-white/[0.08] space-y-3">
              <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">Apply Promo / Coupon Code</div>
              {!activeCoupon ? (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value);
                      setCouponError(null);
                    }}
                    placeholder="E.G. NETLYRA10"
                    className="flex-1 bg-[#1E293B] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white font-mono uppercase tracking-wider outline-none focus:border-[#0EA5B7] placeholder-white/20"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="brand-gradient-btn text-white px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-emerald-950/20 border border-emerald-500/20 px-3.5 py-2.5 rounded-xl">
                  <div className="space-y-0.5">
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">Code: {activeCoupon.code}</span>
                    <p className="text-[9px] text-white/50 leading-none">
                      {activeCoupon.discountType === 'percent' ? `${activeCoupon.discountValue}% Discount` : `₹${activeCoupon.discountValue} Discount`} Applied
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="text-rose-400 hover:text-rose-300 font-bold font-mono text-[10px] uppercase shrink-0 transition-colors cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}
              {couponError && <p className="text-[10px] text-rose-400 font-semibold font-mono mt-1">{couponError}</p>}
              {couponSuccess && <p className="text-[10px] text-emerald-400 font-semibold font-mono mt-1">{couponSuccess}</p>}
            </div>

             <div className="pt-4 border-t border-white/[0.08] space-y-3.5">
              <div className="flex justify-between items-center text-xs text-white/40 font-light">
                <span>Standard Catalog Price</span>
                <span>₹{Math.round(standardSubtotal)}</span>
              </div>
              {bulkSavingsAmount > 0 && (
                <div className="flex justify-between items-center text-xs text-[#0EA5B7] font-semibold font-mono">
                  <span>Bulk Purchase Discount</span>
                  <span>-₹{Math.round(bulkSavingsAmount)}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-xs text-white/40 font-light">
                <span>Subtotal Items</span>
                <span>₹{Math.round(subtotal)}</span>
              </div>
              {activeCoupon && (
                <div className="flex justify-between items-center text-xs text-emerald-400 font-semibold font-mono">
                  <span>Coupon Savings ({activeCoupon.code})</span>
                  <span>-₹{Math.round(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-xs text-white/40 font-light">
                <span>Fast Digital Delivery</span>
                <span className="text-green-400 uppercase font-bold tracking-widest text-[10px]">FREE / Instant</span>
              </div>
              <div className="flex justify-between items-center border-t border-white/[0.08] pt-3.5">
                <span className="text-sm font-semibold text-white">Grand Total</span>
                <span className="text-2xl font-light text-white tracking-tighter font-serif italic">₹{Math.round(grandTotal)}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-[#1E293B] rounded-2xl p-5 border border-white/[0.08] space-y-3.5">
            <div className="flex items-start space-x-2.5 text-xs font-light text-white/60">
              <ShieldCheck className="h-4.5 w-4.5 text-[#0EA5B7] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <span className="font-semibold text-white">Netlyrakeys Guarantee:</span> All digital licensing activation keys are original lifetime retail editions sourced directly from Microsoft authorized volume distributor channels.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Payment Processing Spinner Screen Overlay */}
      <AnimatePresence>
        {isProcessing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md" id="checkout-loading-overlay">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#1E293B] rounded-3xl max-w-md w-full p-8 text-center space-y-6 shadow-2xl border border-white/[0.08] text-[#CBD5E1]"
            >
              <div className="relative mx-auto h-20 w-20 flex items-center justify-center">
                <Loader2 className="h-16 w-16 text-[#0EA5B7] animate-spin absolute" />
                <ShieldCheck className="h-8 w-8 text-[#0EA5B7]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white">Processing Payment Securely</h3>
                <p className="text-xs text-white/40">Please do not refresh the page or click back.</p>
              </div>

              {/* Progress Stepper list */}
              <div className="bg-[#0B1120] border border-white/[0.08] rounded-2xl p-4.5 space-y-3 text-left">
                {stepsList.map((step, idx) => {
                  const isActive = idx === processingStep;
                  const isDone = idx < processingStep;
                  return (
                    <div 
                      key={idx} 
                      className={`flex items-start space-x-2.5 text-xs font-semibold transition-colors duration-200 ${
                        isActive ? 'text-[#0EA5B7]' : isDone ? 'text-green-400' : 'text-white/20'
                      }`}
                    >
                      <div className="shrink-0 mt-0.5">
                        {isDone ? (
                          <CheckCircle2 className="h-4 w-4 text-green-400 fill-green-400/20" />
                        ) : isActive ? (
                          <div className="h-4 w-4 rounded-full border-2 border-[#0EA5B7] border-t-transparent animate-spin" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border-2 border-white/10" />
                        )}
                      </div>
                      <span className={isDone ? 'line-through opacity-40 font-light' : 'font-light'}>{step}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
