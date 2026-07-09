import React, { useState } from 'react';
import { 
  HelpCircle, MessageCircle, Mail, ShieldCheck, FileText, Search, ChevronDown, ChevronUp,
  Cpu, Key, Laptop, Send, Clock, User, AlertCircle, RefreshCw, ClipboardCheck, PhoneCall
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Order } from '../types';

interface SupportPageProps {
  orders: Order[];
  currentUserEmail: string | null;
  onBackToCatalog: () => void;
}

interface SupportTicket {
  id: string;
  subject: string;
  department: string;
  status: 'Open' | 'InProgress' | 'Resolved';
  createdAt: string;
  messages: {
    sender: 'user' | 'agent';
    text: string;
    timestamp: string;
  }[];
}

export default function SupportPage({ orders, currentUserEmail, onBackToCatalog }: SupportPageProps) {
  const [supportTab, setSupportTab] = useState<'track' | 'tickets' | 'guides' | 'remote'>('track');
  
  // Order Tracking State
  const [trackInput, setTrackInput] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<Order | null>(null);
  const [trackError, setTrackError] = useState('');

  // Ticket Support State
  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    const saved = localStorage.getItem('netlyra_support_tickets');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return [
      {
        id: 'TCK-29402',
        subject: 'Windows 11 activation fail with error 0xC004C003',
        department: 'Activation Assistance',
        status: 'Resolved',
        createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
        messages: [
          { sender: 'user', text: 'Hey, I entered the Windows 11 key and got an error about it already being in use or invalid. Please assist.', timestamp: new Date(Date.now() - 48 * 3600 * 1000).toISOString() },
          { sender: 'agent', text: 'Hello! This usually happens if there is a temporary Microsoft server sync delay or if the wrong Windows edition is installed (e.g. Home instead of Pro). I have verified and replaced your retail key in your order tracking with a fresh BIND key. Please try the new key or run the slmgr.vbs command as guided in our instructions.', timestamp: new Date(Date.now() - 47 * 3600 * 1000).toISOString() },
          { sender: 'user', text: 'Thank you! The new key worked perfectly and activated instantly.', timestamp: new Date(Date.now() - 46 * 3600 * 1000).toISOString() }
        ]
      }
    ];
  });

  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDepartment, setTicketDepartment] = useState('Activation Assistance');
  const [ticketMessage, setTicketMessage] = useState('');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [ticketSuccess, setTicketSuccess] = useState('');

  // Guides Accordion State
  const [activeGuideIndex, setActiveGuideIndex] = useState<number | null>(null);
  const [guideSearch, setGuideSearch] = useState('');

  // Remote setup state
  const [remoteSoftware, setRemoteSoftware] = useState<'AnyDesk' | 'TeamViewer' | 'UltraViewer'>('AnyDesk');
  const [remoteId, setRemoteId] = useState('');
  const [remotePass, setRemotePass] = useState('');
  const [remoteDetails, setRemoteDetails] = useState('');
  const [remoteSuccess, setRemoteSuccess] = useState(false);

  // Quick lookup tracking handler
  const handleTrackOrder = () => {
    setTrackError('');
    setTrackedOrder(null);
    if (!trackInput.trim()) return;

    // Search local orders state
    const cleanId = trackInput.trim().toUpperCase();
    const found = orders.find(o => 
      o.id.toUpperCase() === cleanId || 
      o.paymentDetails?.transactionId?.toUpperCase() === cleanId
    );

    if (found) {
      setTrackedOrder(found);
    } else {
      setTrackError('Order or Transaction ID not found. Please log in to view order history or double check your input.');
    }
  };

  // Submit support ticket
  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) return;

    const newTicket: SupportTicket = {
      id: 'TCK-' + Math.floor(10000 + Math.random() * 90000),
      subject: ticketSubject,
      department: ticketDepartment,
      status: 'Open',
      createdAt: new Date().toISOString(),
      messages: [
        { sender: 'user', text: ticketMessage, timestamp: new Date().toISOString() }
      ]
    };

    const updated = [newTicket, ...tickets];
    setTickets(updated);
    localStorage.setItem('netlyra_support_tickets', JSON.stringify(updated));

    setTicketSubject('');
    setTicketMessage('');
    setTicketSuccess(`Support ticket ${newTicket.id} has been submitted! Our support team will reply within 5-15 minutes.`);

    // Simulate smart automatic activation assistant response
    setTimeout(() => {
      let responseText = "Hello! Your ticket has been received. Our certified technicians have been notified and are reviewing your request. For immediate help, you can also ping us on WhatsApp with this ticket ID.";
      if (ticketDepartment === 'Activation Assistance') {
        responseText = "Hello! Thank you for contacting activation support. If you are facing issues with a Windows or Office key, please verify that your edition matches the license perfectly (e.g., Windows 11 Pro vs. Enterprise). You can track your keys in the 'Track Order' tab to get step-by-step installation codes. We are here to assist!";
      } else if (ticketDepartment === 'Remote Installation Support') {
        responseText = "Remote support ticket acknowledged! Please go to the 'Remote Setup' tab to securely share your AnyDesk/TeamViewer ID. One of our engineers will connect to assist with installation shortly.";
      }

      setTickets(prev => {
        const next = prev.map(t => {
          if (t.id === newTicket.id) {
            return {
              ...t,
              status: 'InProgress' as const,
              messages: [...t.messages, { sender: 'agent', text: responseText, timestamp: new Date().toISOString() }]
            };
          }
          return t;
        });
        localStorage.setItem('netlyra_support_tickets', JSON.stringify(next));
        return next;
      });
    }, 4000);
  };

  // Reply to ticket inside conversation
  const handleReplyTicket = (ticketId: string) => {
    if (!replyMessage.trim()) return;

    const updated = tickets.map(t => {
      if (t.id === ticketId) {
        const nextMsgs = [...t.messages, {
          sender: 'user' as const,
          text: replyMessage,
          timestamp: new Date().toISOString()
        }];
        return { ...t, messages: nextMsgs, status: 'Open' as const };
      }
      return t;
    });

    setTickets(updated);
    localStorage.setItem('netlyra_support_tickets', JSON.stringify(updated));
    setReplyMessage('');

    // Update selected view
    const updatedSelected = updated.find(t => t.id === ticketId);
    if (updatedSelected) setSelectedTicket(updatedSelected);

    // Simulate Agent Reply after 5 seconds
    setTimeout(() => {
      setTickets(prev => {
        const next = prev.map(t => {
          if (t.id === ticketId) {
            return {
              ...t,
              status: 'InProgress' as const,
              messages: [...t.messages, {
                sender: 'agent' as const,
                text: "Thank you for the additional details. Our team is working on resolving this. We will update you here or via email within a few minutes.",
                timestamp: new Date().toISOString()
              }]
            };
          }
          return t;
        });
        localStorage.setItem('netlyra_support_tickets', JSON.stringify(next));
        const sel = next.find(x => x.id === ticketId);
        if (sel) setSelectedTicket(sel);
        return next;
      });
    }, 5000);
  };

  // Remote setup submission
  const handleRemoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!remoteId.trim()) return;

    setRemoteSuccess(true);
    // Auto-create a ticket as well
    const newTicket: SupportTicket = {
      id: 'TCK-' + Math.floor(10000 + Math.random() * 90000),
      subject: `Remote Installation Support via ${remoteSoftware}`,
      department: 'Remote Installation Support',
      status: 'Open',
      createdAt: new Date().toISOString(),
      messages: [
        { 
          sender: 'user', 
          text: `Requesting remote install on ${remoteSoftware}. ID: ${remoteId}. Details: ${remoteDetails || 'No special details'}`, 
          timestamp: new Date().toISOString() 
        },
        {
          sender: 'agent',
          text: `Hello! I have queued your Remote Installation ticket. An expert technician will attempt to connect using ${remoteSoftware} on ID ${remoteId} shortly. Please keep the app open.`,
          timestamp: new Date().toISOString()
        }
      ]
    };
    const updated = [newTicket, ...tickets];
    setTickets(updated);
    localStorage.setItem('netlyra_support_tickets', JSON.stringify(updated));

    setRemoteId('');
    setRemotePass('');
    setRemoteDetails('');
  };

  const guides = [
    {
      category: 'Microsoft Windows Keys',
      title: 'How to Activate Windows 11 / 10 Pro or Home',
      steps: [
        'Open Windows settings by pressing Windows Key + I on your keyboard.',
        'Navigate to "System" > "Activation" (or "Update & Security" > "Activation" on Windows 10).',
        'Click on "Change product key" or "Enter product key".',
        'Carefully copy and paste your 25-character digital key delivered in your Order Vault.',
        'Click "Next" and then "Activate". Your system will connect to Microsoft servers and grant a permanent digital license.'
      ],
      tip: 'If you get error 0xC004C003, ensure your version of Windows matches the key edition (e.g. Pro key will not activate Windows Home without a reboot upgrade).'
    },
    {
      category: 'Microsoft Office Keys',
      title: 'How to Activate Microsoft Office 2024 / 2021 / 2019 BIND Key',
      steps: [
        'Open your web browser and go to the official portal: https://setup.office.com',
        'Sign in with your personal Microsoft Email Account (e.g. @outlook.com, @hotmail.com).',
        'Paste your 25-character premium BIND activation key.',
        'Select your Country and Language, then click Next.',
        'Your key is now permanently bound to your Microsoft account! Download the custom setup installer package on your computer.',
        'Install and open any application (like Word or Excel), then sign in with your email to complete activation.'
      ],
      tip: 'Always uninstall any trial or old Office packages before installing your new genuine copy to prevent licensing conflicts.'
    },
    {
      category: 'Antivirus & Security',
      title: 'How to Redeem Bitdefender / Kaspersky / Norton Subscriptions',
      steps: [
        'Bitdefender: Go to https://central.bitdefender.com, register or log in, select "My Subscriptions", click "Activate with Code", and enter key.',
        'Norton: Go to https://norton.com/setup, sign in, enter your unique activation card serial, and download the software.',
        'Kaspersky: Launch the Kaspersky application, click "Enter Activation Code" in the bottom-right corner, and paste the code.'
      ]
    },
    {
      category: 'Developer Tools',
      title: 'How to Link JetBrains All Products Pack / PyCharm / IntelliJ Pro',
      steps: [
        'Visit account.jetbrains.com and create or log into your personal profile.',
        'Open your order tracking page in our shop and click the custom invitation link.',
        'Accept the license allocation workspace transfer.',
        'Install the JetBrains Toolbox app on your PC/Mac, log in, and download your pre-activated IDEs instantly.'
      ]
    },
    {
      category: 'Gaming & Gift Cards',
      title: 'Redeeming Steam / Google Play / Xbox Wallet Codes',
      steps: [
        'Steam: Launch Steam client, go to Account Details > click "+ Add funds to your Steam Wallet" > choose "Redeem a Steam Wallet Code", paste the key, and click redeem.',
        'Google Play: Open Play Store, tap your avatar, select "Payments & subscriptions" > choose "Redeem code", and enter the key.',
        'Apple Gift Card: Open the App Store app, tap your photo, select "Redeem Gift Card or Code" and input key.'
      ]
    }
  ];

  const filteredGuides = guides.filter(g => 
    g.title.toLowerCase().includes(guideSearch.toLowerCase()) || 
    g.category.toLowerCase().includes(guideSearch.toLowerCase()) ||
    g.steps.some(s => s.toLowerCase().includes(guideSearch.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-white" id="support-page-container">
      
      {/* Support Header */}
      <div className="text-center space-y-3 mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#0EA5B7] to-[#7C3AED] bg-clip-text text-transparent">
          24×7 Customer Helpdesk & Resolution Center
        </h2>
        <p className="text-sm text-[#CBD5E1] max-w-2xl mx-auto">
          Instant support for activation keys, automated license allocation, remote setup assistance, and billing inquiries.
        </p>

        {/* Support badges */}
        <div className="flex flex-wrap justify-center gap-3.5 pt-4">
          <div className="bg-[#111827] border border-white/[0.08] px-4 py-2 rounded-2xl flex items-center space-x-2">
            <Clock className="h-4 w-4 text-[#0EA5B7]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white/80">Average Response: &lt; 5 mins</span>
          </div>
          <div className="bg-[#111827] border border-white/[0.08] px-4 py-2 rounded-2xl flex items-center space-x-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white/80">100% Genuine Guarantee</span>
          </div>
          <a 
            href="https://wa.me/919876543210" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-emerald-950/20 hover:bg-emerald-900/30 border border-emerald-500/20 px-4 py-2 rounded-2xl flex items-center space-x-2 transition-colors cursor-pointer"
          >
            <MessageCircle className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">WhatsApp Support (Live)</span>
          </a>
        </div>
      </div>

      {/* Grid Tabs layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Navigation panel */}
        <div className="col-span-1 space-y-2.5">
          <button
            onClick={() => { setSupportTab('track'); setTrackError(''); setTrackedOrder(null); }}
            className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center space-x-3 cursor-pointer ${
              supportTab === 'track' 
                ? 'bg-[#0EA5B7]/10 border-[#0EA5B7]/30 text-[#0EA5B7]' 
                : 'bg-[#111827] border-white/[0.08] text-[#CBD5E1] hover:text-white hover:bg-[#1E293B]'
            }`}
          >
            <Search className="h-5 w-5 shrink-0" />
            <div className="truncate">
              <div className="text-xs font-bold uppercase tracking-wider leading-none">Track Order & Key</div>
              <p className="text-[10px] text-white/40 mt-1">Lookup license & delivery</p>
            </div>
          </button>

          <button
            onClick={() => { setSupportTab('tickets'); setTicketSuccess(''); }}
            className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center space-x-3 cursor-pointer ${
              supportTab === 'tickets' 
                ? 'bg-[#0EA5B7]/10 border-[#0EA5B7]/30 text-[#0EA5B7]' 
                : 'bg-[#111827] border-white/[0.08] text-[#CBD5E1] hover:text-white hover:bg-[#1E293B]'
            }`}
          >
            <HelpCircle className="h-5 w-5 shrink-0" />
            <div className="truncate">
              <div className="text-xs font-bold uppercase tracking-wider leading-none">Support Ticket Desk</div>
              <p className="text-[10px] text-white/40 mt-1">Submit & view tickets</p>
            </div>
          </button>

          <button
            onClick={() => setSupportTab('guides')}
            className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center space-x-3 cursor-pointer ${
              supportTab === 'guides' 
                ? 'bg-[#0EA5B7]/10 border-[#0EA5B7]/30 text-[#0EA5B7]' 
                : 'bg-[#111827] border-white/[0.08] text-[#CBD5E1] hover:text-white hover:bg-[#1E293B]'
            }`}
          >
            <Key className="h-5 w-5 shrink-0" />
            <div className="truncate">
              <div className="text-xs font-bold uppercase tracking-wider leading-none">Activation Assistance</div>
              <p className="text-[10px] text-white/40 mt-1">Setup guides & steps</p>
            </div>
          </button>

          <button
            onClick={() => { setSupportTab('remote'); setRemoteSuccess(false); }}
            className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center space-x-3 cursor-pointer ${
              supportTab === 'remote' 
                ? 'bg-[#0EA5B7]/10 border-[#0EA5B7]/30 text-[#0EA5B7]' 
                : 'bg-[#111827] border-white/[0.08] text-[#CBD5E1] hover:text-white hover:bg-[#1E293B]'
            }`}
          >
            <Laptop className="h-5 w-5 shrink-0" />
            <div className="truncate">
              <div className="text-xs font-bold uppercase tracking-wider leading-none">Remote Installation</div>
              <p className="text-[10px] text-white/40 mt-1">AnyDesk / TeamViewer help</p>
            </div>
          </button>

          <div className="p-4 rounded-2xl border border-white/[0.08] bg-[#0B1120] space-y-3 pt-6">
            <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Other Support channels</h4>
            
            <a 
              href="mailto:support@netlyrakeys.com"
              className="flex items-center space-x-2 text-xs text-[#CBD5E1] hover:text-[#0EA5B7] transition-colors"
            >
              <Mail className="h-4 w-4 text-[#0EA5B7]" />
              <span>support@netlyrakeys.com</span>
            </a>

            <div className="pt-2 flex items-center space-x-2 text-xs text-[#CBD5E1]">
              <Cpu className="h-4 w-4 text-[#0EA5B7]" />
              <span>GST Invoices Available</span>
            </div>

            <div className="text-[9px] text-white/30 leading-normal">
              For corporate or bulk discounts (&gt;5 licenses), please open a ticket under the Bulk Business department.
            </div>
          </div>
        </div>

        {/* Content Panel */}
        <div className="col-span-1 lg:col-span-3">
          
          {/* TAB 1: TRACK ORDER */}
          {supportTab === 'track' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1E293B] border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-6"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider font-mono">Live Order tracking & Key Delivery</h3>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  Enter your Order ID (starts with ORD_) or Payment Transaction ID (starts with TXN_) to instantly look up your automated license keys and active digital guides.
                </p>
              </div>

              <div className="flex space-x-2.5 max-w-xl">
                <input
                  type="text"
                  placeholder="E.G. ORD_982143 OR TXN_4901824"
                  value={trackInput}
                  onChange={(e) => setTrackInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleTrackOrder()}
                  className="flex-1 bg-[#0B1120] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white font-mono uppercase tracking-wider outline-none focus:border-[#0EA5B7] placeholder-white/20"
                />
                <button
                  onClick={handleTrackOrder}
                  className="brand-gradient-btn text-white px-5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Lookup
                </button>
              </div>

              {trackError && (
                <div className="bg-rose-950/20 border border-rose-500/20 p-4 rounded-xl flex items-start space-x-3 text-xs text-rose-300">
                  <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
                  <span>{trackError}</span>
                </div>
              )}

              {trackedOrder ? (
                <div className="space-y-6 border-t border-white/5 pt-6 animate-fadeIn" id="tracked-order-results">
                  <div className="flex flex-wrap items-center justify-between gap-4 bg-[#263447] p-4 rounded-2xl border border-white/[0.08]">
                    <div>
                      <div className="text-[10px] font-mono text-white/40 uppercase">Order ID Reference</div>
                      <div className="text-sm font-bold text-white font-mono uppercase mt-0.5">{trackedOrder.id}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-white/40 uppercase">Payment Method</div>
                      <div className="text-xs text-white mt-0.5 uppercase tracking-wider">
                        {trackedOrder.paymentDetails?.methodLabel || trackedOrder.paymentMethod}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-white/40 uppercase">Order Date</div>
                      <div className="text-xs text-white mt-0.5">{new Date(trackedOrder.createdAt).toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-white/40 uppercase">Delivery Status</div>
                      <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold mt-1 inline-block">
                        Delivered Instant
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white">Your Purchased Licenses</h4>
                    
                    {trackedOrder.items.map((item, idx) => (
                      <div key={idx} className="bg-[#0B1120] border border-white/[0.08] rounded-2xl p-4.5 space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="text-xs font-bold text-white uppercase tracking-wider">{item.title}</h5>
                            <p className="text-[10px] text-white/40 mt-0.5">Quantity: {item.quantity}</p>
                          </div>
                          <span className="bg-[#1E293B] text-[#0EA5B7] border border-white/[0.08] px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold">
                            Auto Allocated
                          </span>
                        </div>

                        {/* Allocated keys box */}
                        <div className="bg-[#263447] p-3.5 rounded-xl border border-white/[0.08] space-y-2">
                          <div className="text-[9px] font-mono text-white/40 uppercase tracking-widest">Digital Keys / Login Information</div>
                          {item.licenseKeys && item.licenseKeys.length > 0 ? (
                            <div className="space-y-2 font-mono">
                              {item.licenseKeys.map((key, kIdx) => (
                                <div key={kIdx} className="flex items-center justify-between text-xs bg-[#0B1120] border border-white/[0.08] px-3 py-2 rounded-lg">
                                  <span className="text-emerald-400 font-bold select-all">{key}</span>
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(key);
                                      alert("Copied product key: " + key);
                                    }}
                                    className="text-[9px] text-[#94A3B8] hover:text-white hover:underline uppercase font-bold"
                                  >
                                    Copy Key
                                  </button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-xs text-rose-400 font-bold font-mono">Keys pending allocation. Please wait or contact live support.</div>
                          )}
                        </div>

                        {/* Step-by-step activation accordion inside tracker */}
                        <div className="bg-[#0B1120] p-4 rounded-xl border border-white/[0.08] space-y-2">
                          <div className="text-[10px] font-bold text-[#0EA5B7] uppercase tracking-widest flex items-center space-x-1">
                            <ClipboardCheck className="h-3.5 w-3.5" />
                            <span>Step-By-Step Activation Guide</span>
                          </div>
                          <div className="text-xs text-white/60 space-y-1.5 leading-normal mt-2">
                            {idx === 0 ? (
                              <>
                                <p className="font-semibold text-white">To activate Windows:</p>
                                <p>1. Open Windows settings, navigate to System &gt; Activation.</p>
                                <p>2. Select "Change product key".</p>
                                <p>3. Input the license key exactly as copied above.</p>
                                <p>4. Save and let it activate. Free technical support is available if you hit server busy flags.</p>
                              </>
                            ) : (
                              <>
                                <p className="font-semibold text-white">To activate this digital package:</p>
                                <p>1. Follow the link provided inside the email voucher.</p>
                                <p>2. Copy your key, select country / activation preference, and register the genuine code.</p>
                                <p>3. Keep your keys locked in safe files.</p>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* GST invoice prompt in tracked order */}
                  <div className="bg-[#263447] border border-white/[0.08] p-4.5 rounded-2xl flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-white">Need a GST Invoice for this order?</div>
                      <p className="text-[10px] text-white/50">Submit your business GST Details to download custom compliant tax invoices.</p>
                    </div>
                    <button
                      onClick={() => {
                        setSupportTab('tickets');
                        setTicketDepartment('GST Invoice Requests');
                        setTicketSubject(`GST Invoice Request for Order ${trackedOrder.id}`);
                        setTicketMessage(`Please generate a GST tax invoice with the following details:\n\nCompany Name:\nGSTIN Number:\nBilling Address:\nState/UT:`);
                      }}
                      className="brand-gradient-btn text-white font-bold text-[10px] uppercase tracking-wider py-2 px-3.5 rounded-xl cursor-pointer"
                    >
                      Request Invoice
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border border-white/[0.08] rounded-2xl bg-[#0B1120] p-6 text-center space-y-2.5">
                  <FileText className="h-8 w-8 text-white/20 mx-auto" />
                  <p className="text-xs text-white/60">No tracked order selected. Input your reference to pull live server logs.</p>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 2: TICKET SUPPORT DESK */}
          {supportTab === 'tickets' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-[#1E293B] border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-6">
                
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider font-mono">Create Support Ticket</h3>
                    <p className="text-xs text-[#CBD5E1] leading-relaxed">
                      Submit details of licensing, activation flags, or remote assistance requests.
                    </p>
                  </div>
                  
                  {/* View Tickets List button toggle if has tickets */}
                  {tickets.length > 0 && (
                    <div className="flex gap-2">
                      <span className="bg-[#0EA5B7]/10 border border-[#0EA5B7]/20 text-[#0EA5B7] rounded-full px-3 py-1 text-[10px] font-mono uppercase font-bold flex items-center">
                        {tickets.length} Active Tickets
                      </span>
                    </div>
                  )}
                </div>

                {ticketSuccess && (
                  <div className="bg-emerald-950/20 border border-emerald-500/20 p-4 rounded-xl flex items-start space-x-3 text-xs text-emerald-300">
                    <ShieldCheck className="h-4.5 w-4.5 shrink-0 mt-0.5 text-emerald-400" />
                    <span>{ticketSuccess}</span>
                  </div>
                )}

                {/* Main ticket list & chat panel */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  
                  {/* Sidebar with previous tickets */}
                  <div className="md:col-span-2 space-y-3 bg-[#0B1120] p-3 rounded-2xl border border-white/[0.08]">
                    <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest px-1">Your Tickets History</h4>
                    
                    {tickets.length === 0 ? (
                      <div className="p-4 text-center text-xs text-white/40">No tickets generated yet.</div>
                    ) : (
                      tickets.map(t => (
                        <button
                          key={t.id}
                          onClick={() => setSelectedTicket(t)}
                          className={`w-full text-left p-3 rounded-xl border transition-all space-y-2 ${
                            selectedTicket?.id === t.id 
                              ? 'bg-[#0EA5B7]/10 border-[#0EA5B7]/30' 
                              : 'bg-[#111827] border-white/[0.08] hover:bg-[#1E293B]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-[#94A3B8] font-bold">{t.id}</span>
                            <span className={`text-[8px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                              t.status === 'Resolved' 
                                ? 'bg-emerald-950/50 text-emerald-400 border-emerald-500/20' 
                                : t.status === 'InProgress'
                                ? 'bg-amber-950/50 text-amber-400 border-amber-500/20'
                                : 'bg-blue-950/50 text-blue-400 border-blue-500/20'
                            }`}>
                              {t.status}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-white truncate">{t.subject}</p>
                          <div className="flex justify-between items-center text-[9px] text-[#94A3B8]">
                            <span>{t.department}</span>
                            <span>{new Date(t.createdAt).toLocaleDateString()}</span>
                          </div>
                        </button>
                      ))
                    )}
                  </div>

                  {/* Main active ticket panel or create form */}
                  <div className="md:col-span-3">
                    
                    {selectedTicket ? (
                      <div className="bg-[#0B1120] rounded-2xl border border-white/[0.08] p-4.5 space-y-4 h-full flex flex-col justify-between">
                        
                        {/* Conversation Header */}
                        <div className="border-b border-white/[0.08] pb-3 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-mono text-[#0EA5B7] font-bold">{selectedTicket.id}</span>
                            <h4 className="text-xs font-bold text-white uppercase tracking-wide mt-0.5">{selectedTicket.subject}</h4>
                          </div>
                          <button 
                            onClick={() => setSelectedTicket(null)}
                            className="text-[10px] font-mono uppercase text-white/40 hover:text-white"
                          >
                            Close Chat
                          </button>
                        </div>

                        {/* Message log */}
                        <div className="space-y-3.5 max-h-[220px] overflow-y-auto py-2.5 flex-1 pr-1">
                          {selectedTicket.messages.map((m, mIdx) => (
                            <div 
                              key={mIdx} 
                              className={`flex flex-col space-y-1 ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                            >
                              <div className={`text-xs px-3.5 py-2.5 rounded-2xl max-w-[85%] leading-relaxed ${
                                m.sender === 'user' 
                                  ? 'bg-[#7C3AED] text-white rounded-tr-none font-medium' 
                                  : 'bg-[#1E293B] border border-white/[0.08] text-white/90 rounded-tl-none font-light'
                              }`}>
                                {m.text}
                              </div>
                              <span className="text-[8px] text-white/30 font-mono">
                                {m.sender === 'user' ? 'Customer' : 'Certified Engineer'} • {new Date(m.timestamp).toLocaleTimeString()}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Send reply bar */}
                        <div className="border-t border-white/[0.08] pt-3.5 flex items-center space-x-2">
                          <input
                            type="text"
                            placeholder="Type your reply to our engineer..."
                            value={replyMessage}
                            onChange={(e) => setReplyMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleReplyTicket(selectedTicket.id)}
                            className="flex-1 bg-[#1E293B] border border-white/[0.08] rounded-xl px-3 py-2 text-xs text-white outline-none focus:border-[#0EA5B7]"
                          />
                          <button
                            onClick={() => handleReplyTicket(selectedTicket.id)}
                            className="brand-gradient-btn text-white p-2.5 rounded-xl transition-colors cursor-pointer"
                          >
                            <Send className="h-4 w-4" />
                          </button>
                        </div>

                      </div>
                    ) : (
                      <form onSubmit={handleCreateTicket} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Select Issue Department</label>
                            <select
                              value={ticketDepartment}
                              onChange={(e) => setTicketDepartment(e.target.value)}
                              className="w-full bg-[#0B1120] border border-white/[0.08] rounded-xl p-3 text-xs text-white outline-none focus:border-[#0EA5B7]"
                            >
                              <option value="Activation Assistance">Activation Assistance</option>
                              <option value="Remote Installation Support">Remote Installation Support</option>
                              <option value="GST Invoice Requests">GST Invoice Requests</option>
                              <option value="Billing & Payments">Billing & Payments</option>
                              <option value="Bulk Business / Corporate License">Bulk Business / Corporate License</option>
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Ticket Summary Subject</label>
                            <input
                              type="text"
                              required
                              placeholder="E.G. Windows 11 Key not validating"
                              value={ticketSubject}
                              onChange={(e) => setTicketSubject(e.target.value)}
                              className="w-full bg-[#0B1120] border border-white/[0.08] rounded-xl p-3 text-xs text-white outline-none focus:border-[#0EA5B7]"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Detailed Message</label>
                          <textarea
                            required
                            rows={3}
                            placeholder="Please provide your order ID (if any) and paste the exact error code or issue details. Our certified developers are standing by."
                            value={ticketMessage}
                            onChange={(e) => setTicketMessage(e.target.value)}
                            className="w-full bg-[#0B1120] border border-white/[0.08] rounded-xl p-3 text-xs text-white outline-none focus:border-[#0EA5B7] resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full brand-gradient-btn text-white font-bold text-xs uppercase tracking-widest py-3.5 px-4 rounded-xl transition-all duration-200 cursor-pointer text-center"
                        >
                          Submit Support Ticket
                        </button>
                      </form>
                    )}

                  </div>

                </div>

              </div>
            </motion.div>
          )}

          {/* TAB 3: ACTIVATION GUIDES */}
          {supportTab === 'guides' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1E293B] border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-6"
            >
              <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider font-mono">Step-By-Step Activation Desk</h3>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed">
                    Verify official setup files, redeem commands, and register licenses smoothly.
                  </p>
                </div>
                
                {/* Search guides */}
                <div className="relative max-w-xs w-full">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-white/30">
                    <Search className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search guides..."
                    value={guideSearch}
                    onChange={(e) => setGuideSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#0B1120] border border-white/[0.08] rounded-xl text-xs text-white outline-none focus:border-[#0EA5B7]"
                  />
                </div>
              </div>

              {/* Guides Accordion list */}
              <div className="space-y-3.5">
                {filteredGuides.length === 0 ? (
                  <div className="p-8 text-center text-xs text-white/40">No matching activation guides found. Try keywords like Windows or Office.</div>
                ) : (
                  filteredGuides.map((guide, idx) => {
                    const isOpen = activeGuideIndex === idx;
                    return (
                      <div key={idx} className="border border-white/[0.08] bg-[#0B1120] rounded-2xl overflow-hidden">
                        <button
                          onClick={() => setActiveGuideIndex(isOpen ? null : idx)}
                          className="w-full p-4 text-left flex justify-between items-center hover:bg-[#1E293B] transition-colors cursor-pointer"
                        >
                          <div className="space-y-1">
                            <span className="text-[8px] font-mono font-bold bg-[#1E293B] text-[#0EA5B7] border border-white/[0.08] px-2 py-0.5 rounded uppercase">
                              {guide.category}
                            </span>
                            <h4 className="text-xs font-bold text-white uppercase tracking-wider">{guide.title}</h4>
                          </div>
                          {isOpen ? <ChevronUp className="h-4 w-4 text-white/40" /> : <ChevronDown className="h-4 w-4 text-white/40" />}
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="border-t border-white/[0.08] p-4.5 bg-[#111827] space-y-4 text-xs text-white/80 leading-normal"
                            >
                              <div className="space-y-2.5">
                                {guide.steps.map((step, sIdx) => (
                                  <div key={sIdx} className="flex items-start space-x-3">
                                    <span className="h-5 w-5 bg-[#263447] border border-white/[0.08] rounded-lg flex items-center justify-center font-mono font-bold text-[10px] text-[#0EA5B7] shrink-0 mt-0.5">
                                      {sIdx + 1}
                                    </span>
                                    <p className="flex-1">{step}</p>
                                  </div>
                                ))}
                              </div>

                              {guide.tip && (
                                <div className="bg-amber-950/20 border border-amber-500/20 p-3.5 rounded-xl flex items-start space-x-2.5 text-amber-300">
                                  <AlertCircle className="h-4.5 w-4.5 shrink-0 mt-0.5 text-amber-400" />
                                  <div>
                                    <span className="font-bold text-[10px] uppercase block tracking-wider mb-0.5">Activation Tip</span>
                                    <p className="text-[11px] leading-relaxed">{guide.tip}</p>
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })
                )}
              </div>

            </motion.div>
          )}

          {/* TAB 4: REMOTE INSTALLATION SETUP */}
          {supportTab === 'remote' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1E293B] border border-white/[0.08] rounded-3xl p-6 sm:p-8 space-y-6"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white uppercase tracking-wider font-mono">1-On-1 Remote Installation Support</h3>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  Let our certified engineers connect securely to your computer to assist with Windows upgrade command issues, complex Office activation binds, or troubleshooting serial blocks via AnyDesk or TeamViewer.
                </p>
              </div>

              {remoteSuccess ? (
                <div className="bg-emerald-950/20 border border-emerald-500/20 p-6 rounded-2xl text-center space-y-3">
                  <ShieldCheck className="h-10 w-10 text-emerald-400 mx-auto" />
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Remote Assistance Request Queued!</h4>
                  <p className="text-xs text-white/60 max-w-md mx-auto leading-normal">
                    A developer from NetlyraKeys support is assigned. We will ping you inside the Ticket chat or email and attempt remote login within 5-15 minutes. Please keep your connection software open.
                  </p>
                  <button
                    onClick={() => { setRemoteSuccess(false); setSupportTab('tickets'); }}
                    className="text-xs font-mono text-[#0EA5B7] font-bold uppercase hover:underline mt-2 cursor-pointer"
                  >
                    View active tickets to track status
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRemoteSubmit} className="space-y-4 max-w-xl">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Select Remote Software</label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {(['AnyDesk', 'TeamViewer', 'UltraViewer'] as const).map(sw => (
                        <button
                          key={sw}
                          type="button"
                          onClick={() => setRemoteSoftware(sw)}
                          className={`py-3 px-3 border rounded-xl font-mono text-[10px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                            remoteSoftware === sw
                              ? 'border-[#0EA5B7] bg-[#0EA5B7]/10 text-[#0EA5B7]'
                              : 'border-white/[0.08] bg-[#0B1120] text-[#CBD5E1] hover:text-white hover:bg-[#1E293B]'
                          }`}
                        >
                          {sw}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Your Remote ID Code</label>
                      <input
                        type="text"
                        required
                        placeholder="E.G. 102 984 204"
                        value={remoteId}
                        onChange={(e) => setRemoteId(e.target.value)}
                        className="w-full bg-[#0B1120] border border-white/[0.08] rounded-xl p-3 text-xs text-white font-mono outline-none focus:border-[#0EA5B7]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Temporary Password (Optional)</label>
                      <input
                        type="password"
                        placeholder="Secure temporary pass"
                        value={remotePass}
                        onChange={(e) => setRemotePass(e.target.value)}
                        className="w-full bg-[#0B1120] border border-white/[0.08] rounded-xl p-3 text-xs text-white font-mono outline-none focus:border-[#0EA5B7]"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] text-white/40 uppercase font-bold tracking-wider">Tell us what you are trying to install</label>
                    <textarea
                      rows={2.5}
                      placeholder="E.G. Upgrading from Win 11 Home to Pro using BIND license code, need activation help."
                      value={remoteDetails}
                      onChange={(e) => setRemoteDetails(e.target.value)}
                      className="w-full bg-[#0B1120] border border-white/[0.08] rounded-xl p-3 text-xs text-white outline-none focus:border-[#0EA5B7] resize-none"
                    />
                  </div>

                  <div className="bg-[#0B1120] p-3.5 rounded-xl border border-white/[0.08] flex items-start space-x-2.5 text-[10px] text-[#94A3B8]">
                    <ShieldCheck className="h-4.5 w-4.5 text-[#0EA5B7] shrink-0 mt-0.5" />
                    <p className="leading-normal">
                      Security Guarantee: Remote connections are strictly encrypted and controlled. You can terminate the session at any time with a mouse drag. Our developers will never download or touch files unrelated to activation.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full brand-gradient-btn text-white font-bold text-xs uppercase tracking-widest py-3.5 px-4 rounded-xl transition-all duration-200 cursor-pointer text-center"
                  >
                    Request Live Remote Assistance
                  </button>
                </form>
              )}
            </motion.div>
          )}

        </div>

      </div>

    </div>
  );
}
