import { Product } from './types';

const RAW_SEEDED_PRODUCTS: Product[] = [
  // --- MICROSOFT WINDOWS KEYS ---
  {
    id: "win-11-pro",
    title: "Microsoft Windows 11 Professional Retail Key (Lifetime)",
    category: "Microsoft Windows Keys",
    price: 199.00,
    salePrice: 14.99,
    imageUrl: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80",
    description: "Get the full retail version of Microsoft Windows 11 Professional. Features state-of-the-art security, advanced productivity tools like snap layouts, virtual desktops, and Windows Hello login security. Fully upgradeable, high-performance activation.",
    features: [
      "Lifetime retail activation key",
      "Direct Microsoft Activation & fully upgradeable",
      "Supports both 32-bit and 64-bit architectures",
      "Full ongoing security updates and patches",
      "Enterprise security: BitLocker, Windows Information Protection"
    ],
    activationGuide: "1. Click the Start button, then open 'Settings'.\n2. Select 'System' and click on 'Activation'.\n3. Click on 'Change product key'.\n4. Paste your 25-character product key sent in your digital vault.\n5. Click 'Next' and let the Microsoft Activation servers verify your original lifetime digital key.",
    stock: 150,
    rating: 4.8,
    reviewsCount: 142
  },
  {
    id: "win-11-home",
    title: "Microsoft Windows 11 Home OEM Key",
    category: "Microsoft Windows Keys",
    price: 139.00,
    salePrice: 11.99,
    imageUrl: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80",
    description: "The perfect operating system for home users. Enhanced widgets, snap layouts, integrated Microsoft Teams, and secure gaming optimizations.",
    features: [
      "Genuine digital license for 1 PC",
      "Seamless gaming support with Auto HDR & DirectStorage",
      "Secure boot and built-in Windows Defender security",
      "Free upgrades to standard security patches"
    ],
    activationGuide: "1. Open Windows 'Settings' > 'System' > 'Activation'.\n2. Click 'Change product key'.\n3. Type the 25-character OEM activation key.\n4. Apply to activate instantly.",
    stock: 120,
    rating: 4.7,
    reviewsCount: 88
  },
  {
    id: "win-11-ent",
    title: "Microsoft Windows 11 Enterprise Volume License",
    category: "Microsoft Windows Keys",
    price: 299.00,
    salePrice: 39.99,
    imageUrl: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80",
    description: "Built for hybrid work, with advanced security features, device management, and deployment capabilities for enterprise networks.",
    features: [
      "Enterprise security: AppLocker, Credential Guard",
      "DirectAccess and Windows To Go capabilities",
      "Unified write filter and branch cache controls",
      "Ideal for businesses needing full fleet compliance"
    ],
    activationGuide: "Activate using standard volume activation keys (MAK) via CMD or Volume Activation Management Tool.",
    stock: 75,
    rating: 4.9,
    reviewsCount: 34
  },
  {
    id: "win-10-pro",
    title: "Microsoft Windows 10 Professional Retail Key",
    category: "Microsoft Windows Keys",
    price: 189.00,
    salePrice: 12.49,
    imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80",
    description: "Uncompromised performance and security for professionals. The classic, robust, and familiar desktop operating system.",
    features: [
      "Lifetime activation key for 1 PC",
      "BitLocker encryption for external drives",
      "Remote Desktop connection hosting support",
      "Hyper-V virtualization setup available"
    ],
    activationGuide: "Go to Settings > Update & Security > Activation. Click Change Product Key, enter the code, and click activate.",
    stock: 200,
    rating: 4.8,
    reviewsCount: 212
  },
  {
    id: "win-10-home",
    title: "Microsoft Windows 10 Home Retail Key",
    category: "Microsoft Windows Keys",
    price: 119.00,
    salePrice: 9.99,
    imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=80",
    description: "Reliable operating system with fast startup, built-in security, and virtual desktop options.",
    features: [
      "Permanent activation for 1 computer",
      "Familiar Start menu and browser layout",
      "Standard gaming and office application compatibility"
    ],
    activationGuide: "Enter the code in Update & Security > Activation to link your system.",
    stock: 140,
    rating: 4.6,
    reviewsCount: 95
  },
  {
    id: "win-server-2022-std",
    title: "Windows Server 2022 Standard Retail Key",
    category: "Microsoft Windows Keys",
    price: 899.00,
    salePrice: 49.99,
    imageUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=600&auto=format&fit=crop&q=80",
    description: "Build robust, secure enterprise servers. Windows Server 2022 Standard features multi-layer security, hybrid capabilities with Azure, and a flexible application platform. Lifetime genuine retail key.",
    features: [
      "Lifetime original Retail activation for 1 Server",
      "Advanced multi-layer security, secured-core server",
      "Hybrid capabilities with Azure Arc integration",
      "Nested virtualization for AMD and Intel processors",
      "Enhanced container scalability & reliability tools"
    ],
    activationGuide: "1. Open administrative command prompt on your server.\n2. Run command: slmgr.vbs /ipk YOUR-LICENSE-KEY\n3. Activate online with command: slmgr.vbs /ato\n4. Your server operating system will connect to Microsoft servers and activate instantly.",
    stock: 45,
    rating: 4.9,
    reviewsCount: 31
  },
  {
    id: "win-server-2019-std",
    title: "Windows Server 2019 Standard Retail Key",
    category: "Microsoft Windows Keys",
    price: 699.00,
    salePrice: 34.99,
    imageUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=600&auto=format&fit=crop&q=80",
    description: "Highly compatible server OS with secure software-defined storage, enhanced security compliance, and hybrid cloud tools.",
    features: [
      "Genuine retail key",
      "Hyper-V container and Linux subsystem support",
      "System Insights predictive analytics"
    ],
    activationGuide: "Use slmgr.vbs in standard command prompt as administrator.",
    stock: 55,
    rating: 4.7,
    reviewsCount: 22
  },
  {
    id: "win-rds-cal-50",
    title: "Windows Server Remote Desktop Services (RDS) 50 CALs License",
    category: "Microsoft Windows Keys",
    price: 599.00,
    salePrice: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=600&auto=format&fit=crop&q=80",
    description: "Expand your remote work access. Enables up to 50 concurrent users/devices to connect securely to your Windows Server environment.",
    features: [
      "50 User Client Access Licenses (CAL)",
      "Supports Server 2016, 2019, and 2022 environments",
      "Ensures full remote work compliance",
      "Instant activation via Remote Desktop Licensing Manager"
    ],
    activationGuide: "Redeem the CAL license code directly inside the Remote Desktop Licensing Manager on your domain controller server.",
    stock: 30,
    rating: 4.9,
    reviewsCount: 19
  },

  // --- MICROSOFT OFFICE KEYS ---
  {
    id: "office-2024-pro-plus",
    title: "Microsoft Office 2024 Professional Plus Bind Key",
    category: "Microsoft Office Keys",
    price: 349.00,
    salePrice: 44.99,
    imageUrl: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=600&auto=format&fit=crop&q=80",
    description: "The absolute latest and most advanced Office package. Permanent bind key linking directly to your Microsoft Account.",
    features: [
      "Lifetime Bind activation - attaches to your email",
      "Full offline versions of Word, Excel, PowerPoint, Outlook, Access, Publisher",
      "Supports latest hardware and windows 11 optimizations",
      "One-time purchase, zero monthly billing"
    ],
    activationGuide: "1. Go to official portal: https://setup.office.com\n2. Log in with your personal email account.\n3. Enter the key. Download pre-bound installer.",
    stock: 90,
    rating: 4.9,
    reviewsCount: 43
  },
  {
    id: "office-2021-pro-plus",
    title: "Microsoft Office 2021 Professional Plus Bind Key",
    category: "Microsoft Office Keys",
    price: 249.00,
    salePrice: 29.99,
    imageUrl: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=600&auto=format&fit=crop&q=80",
    description: "The most popular, complete office suite. Enjoy Word, Excel, and Outlook forever on your personal account.",
    features: [
      "Permanent bind key associated with Microsoft Email",
      "Transferable and reusable across computer hardware",
      "Comprehensive toolkit: PowerPoint, Publisher, Access",
      "Official original digital copy downloads"
    ],
    activationGuide: "Visit setup.office.com, register the activation code to link it to your account.",
    stock: 180,
    rating: 4.9,
    reviewsCount: 310
  },
  {
    id: "office-2019-pro-plus",
    title: "Microsoft Office 2019 Professional Plus Retail Key",
    category: "Microsoft Office Keys",
    price: 199.00,
    salePrice: 21.99,
    imageUrl: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=600&auto=format&fit=crop&q=80",
    description: "A highly stable, affordable option for classic document management. Retail activation key.",
    features: [
      "Lifetime activation for 1 PC",
      "Includes Word, Excel, PowerPoint, and Outlook",
      "No recurring costs or license expiration issues"
    ],
    activationGuide: "Enter the key directly inside the pre-installed Office 2019 applications to activate.",
    stock: 110,
    rating: 4.7,
    reviewsCount: 145
  },
  {
    id: "office-2016-pro-plus",
    title: "Microsoft Office 2016 Professional Plus Retail Key",
    category: "Microsoft Office Keys",
    price: 149.00,
    salePrice: 15.99,
    imageUrl: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=600&auto=format&fit=crop&q=80",
    description: "Perfect for older PCs and standard document editing. Highly reliable and lightweight.",
    features: [
      "Familiar interface, lightweight performance",
      "One-time activation, no expiration"
    ],
    activationGuide: "Install Office 2016 from official sources, input license key on initial launch.",
    stock: 85,
    rating: 4.6,
    reviewsCount: 63
  },
  {
    id: "m365-personal-1yr",
    title: "Microsoft 365 Personal (1 Year Subscription Card)",
    category: "Microsoft Office Keys",
    price: 69.99,
    salePrice: 42.99,
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80",
    description: "Official 12-month renewal or new activation card. Premium cloud apps, safe tracking tools, and massive storage.",
    features: [
      "1 User, up to 5 devices simultaneously",
      "Includes 1TB OneDrive secure cloud storage",
      "Word, Excel, PowerPoint, Outlook with AI integration",
      "Full subscription key for renewal"
    ],
    activationGuide: "Redeem the activation voucher at setup.office.com with your personal Microsoft ID.",
    stock: 100,
    rating: 4.8,
    reviewsCount: 74
  },
  {
    id: "m365-family-1yr",
    title: "Microsoft 365 Family (6 Users - 1 Year Activation)",
    category: "Microsoft Office Keys",
    price: 99.99,
    salePrice: 64.99,
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80",
    description: "The ultimate productivity shared subscription card. Perfect for families, students, or teams.",
    features: [
      "Up to 6 users supported, 1TB Cloud per user (6TB total)",
      "Premium versions of full desktop applications",
      "Family safety location tracking & parental control apps"
    ],
    activationGuide: "Redeem on setup.office.com. Invite family members directly from your Microsoft dashboard.",
    stock: 60,
    rating: 4.9,
    reviewsCount: 52
  },
  {
    id: "m365-biz-std",
    title: "Microsoft 365 Business Standard (1 User - 1 Year)",
    category: "Microsoft Office Keys",
    price: 150.00,
    salePrice: 99.99,
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80",
    description: "Enterprise email hosting, desktop apps, Microsoft Teams integration, and secure business storage.",
    features: [
      "Premium desktop versions of Office applications",
      "Business-class email with 50 GB custom domain inbox",
      "Microsoft Teams collaboration suite, hosting up to 300 participants"
    ],
    activationGuide: "Redeem directly via Microsoft 365 Admin Center or setup portal with your tenant domain.",
    stock: 40,
    rating: 4.8,
    reviewsCount: 29
  },
  {
    id: "m365-biz-prem",
    title: "Microsoft 365 Business Premium (1 User - 1 Year)",
    category: "Microsoft Office Keys",
    price: 260.00,
    salePrice: 179.99,
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80",
    description: "Comprehensive secure productivity suite for small/medium business fleets. Advanced security, device management (Intune), and information protection.",
    features: [
      "Includes everything in Business Standard",
      "Advanced cyberthreat protection with Defender for Business",
      "Mobile device management via Microsoft Intune",
      "Azure Active Directory security features"
    ],
    activationGuide: "Register coupon inside your official Microsoft Business tenant admin portal.",
    stock: 35,
    rating: 4.9,
    reviewsCount: 15
  },

  // --- ANTIVIRUS & SECURITY ---
  {
    id: "bitdefender-total-sec",
    title: "Bitdefender Total Security (5 Devices - 1 Year)",
    category: "Antivirus & Security",
    price: 89.99,
    salePrice: 16.99,
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
    description: "Award-winning cyber threat detection system. Complete security on Windows, macOS, Android, and iOS.",
    features: [
      "Secures up to 5 devices simultaneously",
      "Complete multi-layered data protection & anti-ransomware",
      "Includes high-speed Bitdefender VPN & Parental Control",
      "Zero performance impact with automated profiles"
    ],
    activationGuide: "1. Create or log into your account at central.bitdefender.com.\n2. Click 'My Subscriptions' on the side panel.\n3. Click 'Activate with code' and paste code.\n4. Download the application on your devices.",
    stock: 140,
    rating: 4.8,
    reviewsCount: 110
  },
  {
    id: "norton-360-deluxe",
    title: "Norton 360 Deluxe (3 Devices - 1 Year)",
    category: "Antivirus & Security",
    price: 99.99,
    salePrice: 19.99,
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
    description: "Complete dark-web monitoring, secure VPN module, password management, and 50GB cloud backup storage.",
    features: [
      "Full malware and real-time virus protection for 3 devices",
      "50 GB secure PC Cloud backup space",
      "Dark Web Monitoring for personal identifiers"
    ],
    activationGuide: "Input the retail product key inside norton.com/setup or your existing Norton console.",
    stock: 95,
    rating: 4.7,
    reviewsCount: 78
  },
  {
    id: "mcafee-total-prot",
    title: "McAfee Total Protection (10 Devices - 1 Year)",
    category: "Antivirus & Security",
    price: 119.99,
    salePrice: 14.49,
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
    description: "Guard your family's personal data and devices with easy-to-use cross-platform cybersecurity.",
    features: [
      "Protects an impressive 10 devices",
      "Integrated password manager and file shredder",
      "Award-winning antivirus firewall block"
    ],
    activationGuide: "Visit mcafee.com/activate and register your 25-character premium activation license.",
    stock: 220,
    rating: 4.5,
    reviewsCount: 167
  },
  {
    id: "kaspersky-prem-1yr",
    title: "Kaspersky Premium Security (3 Devices - 1 Year)",
    category: "Antivirus & Security",
    price: 79.99,
    salePrice: 15.99,
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
    description: "The complete premium plan. Real-time protection, online payment guard, smart VPN, and expert identity protection.",
    features: [
      "Real-time identity monitoring alerts",
      "Includes unlimited high-speed secure VPN client",
      "Protects up to 3 PCs, Macs, or mobile phones"
    ],
    activationGuide: "Redeem the license key inside the My Kaspersky user dashboard or application.",
    stock: 80,
    rating: 4.8,
    reviewsCount: 92
  },
  {
    id: "eset-internet-sec",
    title: "ESET Internet Security (1 Device - 1 Year)",
    category: "Antivirus & Security",
    price: 49.99,
    salePrice: 9.99,
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
    description: "Industry-leading lightweight protection. Ideal for gamers and developers seeking minimal system drag.",
    features: [
      "Advanced multi-layered protection",
      "Lightweight resource usage footprint",
      "Protects web banking and smart home routers"
    ],
    activationGuide: "Register your ESET serial license inside the ESET HOME portal.",
    stock: 130,
    rating: 4.9,
    reviewsCount: 104
  },
  {
    id: "quick-heal-total",
    title: "Quick Heal Total Security (1 PC - 1 Year)",
    category: "Antivirus & Security",
    price: 39.99,
    salePrice: 8.49,
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
    description: "Complete threat scanning, data recovery security, parental lockouts, and robust email link protection.",
    features: [
      "Full local desktop and web file shielding",
      "Secure banking gateway prevents credential theft"
    ],
    activationGuide: "Enter code in the Quick Heal registration wizard.",
    stock: 160,
    rating: 4.6,
    reviewsCount: 57
  },

  // --- CREATIVE & PROFESSIONAL SOFTWARE ---
  {
    id: "adobe-creative-cloud",
    title: "Adobe Creative Cloud All Apps (1 Year Shared Team Subscription)",
    category: "Creative & Professional Software",
    price: 599.00,
    salePrice: 119.99,
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    description: "Get the complete collection of 20+ Adobe desktop and mobile creative apps. Fully original shared enterprise team membership.",
    features: [
      "Access to Photoshop, Illustrator, Premiere Pro, InDesign, Acrobat Pro",
      "Linked directly to your personal Adobe ID account",
      "Generative AI credits (Firefly) included",
      "100 GB cloud asset storage sync"
    ],
    activationGuide: "1. Log into adobe.com.\n2. Click the specific team-invite link provided in your digital key delivery.\n3. Accept the seat invite. Open Creative Cloud desktop to launch applications.",
    stock: 35,
    rating: 4.9,
    reviewsCount: 78
  },
  {
    id: "adobe-photoshop",
    title: "Adobe Photoshop CC (1 Year Private License)",
    category: "Creative & Professional Software",
    price: 239.99,
    salePrice: 49.99,
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    description: "The world's standard for graphic editing. Includes Neural Filters and Generative Fill AI tools.",
    features: [
      "1 Year license linked to your Adobe email account",
      "Full updates and neural AI filter downloads",
      "Perfect for creators, designers, and retouchers"
    ],
    activationGuide: "Accept the Adobe seat invitation link sent to your account email.",
    stock: 50,
    rating: 4.8,
    reviewsCount: 42
  },
  {
    id: "adobe-illustrator",
    title: "Adobe Illustrator CC (1 Year Private License)",
    category: "Creative & Professional Software",
    price: 239.99,
    salePrice: 49.99,
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    description: "Create stunning vector graphics, icons, typography, and complex layouts with desktop GPU acceleration.",
    features: [
      "1 Year original vector toolkit activation",
      "Direct cloud canvas workspace sync"
    ],
    activationGuide: "Join the Team workspace seat using the email confirmation link.",
    stock: 45,
    rating: 4.9,
    reviewsCount: 36
  },
  {
    id: "adobe-premiere",
    title: "Adobe Premiere Pro CC (1 Year License)",
    category: "Creative & Professional Software",
    price: 239.99,
    salePrice: 54.99,
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    description: "Professional video editing system with advanced color grading, transcription tools, and sound design modules.",
    features: [
      "Direct timeline multi-cam editing suite",
      "Advanced motion graphics template access"
    ],
    activationGuide: "Link the premium workspace license directly via your Adobe profile setup.",
    stock: 30,
    rating: 4.8,
    reviewsCount: 29
  },
  {
    id: "coreldraw-graphics",
    title: "CorelDRAW Graphics Suite (Lifetime Business License)",
    category: "Creative & Professional Software",
    price: 499.00,
    salePrice: 69.99,
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    description: "Professional vector illustration, layout, photo editing, and design tools. One-time lifetime activation.",
    features: [
      "Lifetime retail serial license code",
      "Full workspace editing control, no subscription cards required",
      "Powerful typography and page styling engines"
    ],
    activationGuide: "Download the Corel suite from the official installer, enter the lifetime license serial number on startup.",
    stock: 25,
    rating: 4.7,
    reviewsCount: 14
  },

  // --- DEVELOPER TOOLS ---
  {
    id: "jetbrains-all-pack",
    title: "JetBrains All Products Pack (1 Year Personal Subscription)",
    category: "Developer Tools",
    price: 649.00,
    salePrice: 89.99,
    imageUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=600&auto=format&fit=crop&q=80",
    description: "The complete set of IDEs by JetBrains. Includes IntelliJ IDEA Ultimate, PyCharm Pro, WebStorm, Rider, ReSharper, and more.",
    features: [
      "16 powerful development tools in one pack",
      "Official 1-year subscription linked to your JetBrains Account",
      "Use across multiple machines simultaneously",
      "Fully supports local compilation, AI integration, and plugins"
    ],
    activationGuide: "1. Log into account.jetbrains.com or create a free profile.\n2. Click the custom link delivered to your order page.\n3. Accept the subscription seat transfer.\n4. Log in inside the JetBrains Toolbox app to activate all tools.",
    stock: 40,
    rating: 4.9,
    reviewsCount: 94
  },
  {
    id: "intellij-idea-ult",
    title: "IntelliJ IDEA Ultimate (1 Year License)",
    category: "Developer Tools",
    price: 169.00,
    salePrice: 29.99,
    imageUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=600&auto=format&fit=crop&q=80",
    description: "The premier IDE for Java, Kotlin, Spring, and enterprise microservices. Fully featured with database tools and smart completion.",
    features: [
      "12-month full development workspace activation",
      "Smart code completion, refactoring, and framework support"
    ],
    activationGuide: "Redeem the student/developer license on your personal JetBrains account dashboard.",
    stock: 65,
    rating: 4.9,
    reviewsCount: 120
  },
  {
    id: "pycharm-pro",
    title: "PyCharm Professional (1 Year License)",
    category: "Developer Tools",
    price: 109.00,
    salePrice: 24.99,
    imageUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=600&auto=format&fit=crop&q=80",
    description: "The best Python IDE for professional developers, data scientists, and Django web architects.",
    features: [
      "Full web dev framework support (Django, Flask)",
      "Scientific tools: Jupyter notebook, Anaconda, pandas"
    ],
    activationGuide: "Link the activation voucher code inside your JetBrains account panel.",
    stock: 55,
    rating: 4.8,
    reviewsCount: 61
  },
  {
    id: "webstorm",
    title: "WebStorm IDE (1 Year License)",
    category: "Developer Tools",
    price: 69.00,
    salePrice: 19.99,
    imageUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=600&auto=format&fit=crop&q=80",
    description: "The smartest JavaScript and TypeScript IDE. Built-in support for React, Vue, Angular, Node.js, and Git.",
    features: [
      "Seamless TypeScript integration and automatic refactoring",
      "Excellent local debugging and terminal tools"
    ],
    activationGuide: "Paste the activation token into your JetBrains account registration tab.",
    stock: 70,
    rating: 4.7,
    reviewsCount: 55
  },
  {
    id: "github-copilot-1yr",
    title: "GitHub Copilot (1 Year Individual Subscription)",
    category: "Developer Tools",
    price: 100.00,
    salePrice: 34.99,
    imageUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=600&auto=format&fit=crop&q=80",
    description: "Your AI pair programmer. Generates complete code snippets, suggests comments, and auto-completes complex algorithms.",
    features: [
      "12 Months uninterrupted Copilot access",
      "Works inside VS Code, JetBrains, and Neovim",
      "Trained on billions of lines of open-source public code"
    ],
    activationGuide: "1. Log into your github.com account.\n2. Click the invite link provided in your digital vault.\n3. Accept organization access to unlock the Copilot license for 1 year.",
    stock: 80,
    rating: 4.9,
    reviewsCount: 201
  },

  // --- VPN & PRIVACY ---
  {
    id: "nordvpn-1yr",
    title: "NordVPN Premium (1 Year - 6 Devices)",
    category: "VPN & Privacy",
    price: 120.00,
    salePrice: 19.99,
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
    description: "Top-tier high-speed VPN with ultra-secure AES-256 encryption. Features malware blocking, ad-blocking, and dedicated servers.",
    features: [
      "6 simultaneous device connections",
      "Over 5500 ultra-fast servers across 60 countries",
      "SmartPlay streaming support with zero buffering logs",
      "Strict zero-logs protection guarantee"
    ],
    activationGuide: "1. Visit join.nordvpn.com/activate.\n2. Create or log into your Nord account.\n3. Enter the 25-character activation key delivered in your vault.",
    stock: 120,
    rating: 4.8,
    reviewsCount: 153
  },
  {
    id: "expressvpn-1yr",
    title: "ExpressVPN Unlimited (1 Year Key)",
    category: "VPN & Privacy",
    price: 155.00,
    salePrice: 24.99,
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
    description: "The fastest, most reliable premium VPN service. Overcomes all geo-blocks with ease. Highly private.",
    features: [
      "Ultra-secure Lightway encryption protocol",
      "Blazing-fast speeds on TVs, routers, and mobile devices",
      "Includes 24/7 client portal support"
    ],
    activationGuide: "Enter the activation key on the ExpressVPN app or login page to initiate your plan.",
    stock: 90,
    rating: 4.9,
    reviewsCount: 114
  },
  {
    id: "surfshark-1yr",
    title: "Surfshark VPN (1 Year - Unlimited Devices)",
    category: "VPN & Privacy",
    price: 99.00,
    salePrice: 15.49,
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80",
    description: "Connect as many devices as you want! Includes CleanWeb ad blocker, camouflage mode, and bypass lists.",
    features: [
      "Absolutely unlimited device installations",
      "Robust ad, malware, and tracking blocker integrated",
      "Split tunneling for sensitive bank applications"
    ],
    activationGuide: "Log in with the dedicated credentials provided or redeem the license code on your Surfshark app.",
    stock: 150,
    rating: 4.7,
    reviewsCount: 88
  },

  // --- GAMING & GIFT CARDS ---
  {
    id: "steam-50-usd",
    title: "Steam Wallet $50 USA Gift Card Code",
    category: "Gaming & Gift Cards",
    price: 50.00,
    salePrice: 48.99,
    imageUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&auto=format&fit=crop&q=80",
    description: "Add funds directly to your Steam Wallet account and purchase games, DLCs, and skins instantly. Genuine USA region code.",
    features: [
      "Adds exactly $50.00 USD to your Steam balance",
      "Instant allocation to your gaming library",
      "Works with Steam sales, season passes, and community markets"
    ],
    activationGuide: "1. Launch Steam client or log into store.steampowered.com.\n2. Click 'Account Details' under your profile name.\n3. Click 'Add funds to your Steam Wallet'.\n4. Select 'Redeem a Steam Wallet Code' and enter your code.",
    stock: 200,
    rating: 4.9,
    reviewsCount: 420
  },
  {
    id: "xbox-50-usd",
    title: "Xbox $50 Digital Gift Card (US Region)",
    category: "Gaming & Gift Cards",
    price: 50.00,
    salePrice: 48.49,
    imageUrl: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?w=600&auto=format&fit=crop&q=80",
    description: "Get full access to Xbox Game Pass Ultimate, download high-tier titles, and buy Roblox Robux or Fortnite V-Bucks.",
    features: [
      "Credit value: $50.00 USD US account",
      "Direct digital balance, zero transaction fees"
    ],
    activationGuide: "Go to microsoft.com/redeem or use the 'Store' app on your Xbox console.",
    stock: 130,
    rating: 4.8,
    reviewsCount: 165
  },
  {
    id: "playstation-50-usd",
    title: "PlayStation Network $50 Gift Card (US)",
    category: "Gaming & Gift Cards",
    price: 50.00,
    salePrice: 48.49,
    imageUrl: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&auto=format&fit=crop&q=80",
    description: "Purchase games, download extra map expansions, acquire monthly PlayStation Plus subscription tiers, and stream media.",
    features: [
      "Redeems full $50.00 USD balance",
      "Valid for PS4, PS5, and VR platform games"
    ],
    activationGuide: "Open PlayStation Store and select 'Redeem Code' in the user dropdown.",
    stock: 180,
    rating: 4.9,
    reviewsCount: 310
  },
  {
    id: "google-play-25-usd",
    title: "Google Play $25 USA Gift Card Code",
    category: "Gaming & Gift Cards",
    price: 25.00,
    salePrice: 24.29,
    imageUrl: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=600&auto=format&fit=crop&q=80",
    description: "Instantly buy apps, premium games, in-app gems, movies, audiobooks, and subscriptions.",
    features: [
      "Adds exactly $25.00 USD to your Play Store wallet",
      "No expiration date or hidden transaction fees"
    ],
    activationGuide: "Tap profile icon in Play Store, choose Payments & subscriptions, select Redeem code.",
    stock: 150,
    rating: 4.7,
    reviewsCount: 94
  },
  {
    id: "apple-50-usd",
    title: "Apple Gift Card $50 (US Region)",
    category: "Gaming & Gift Cards",
    price: 50.00,
    salePrice: 48.99,
    imageUrl: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=600&auto=format&fit=crop&q=80",
    description: "Use for App Store purchases, Apple Music subscriptions, iCloud storage upgrades, or hardware purchases on Apple.com.",
    features: [
      "Redeems $50.00 USD to Apple Account balance",
      "Works on App Store, iTunes, Apple TV, Apple Books"
    ],
    activationGuide: "Open App Store, click on user profile icon, choose 'Redeem Gift Card or Code' and enter key.",
    stock: 110,
    rating: 4.9,
    reviewsCount: 135
  },

  // --- BUSINESS & ENTERPRISE LICENSES ---
  {
    id: "win-volume-licensing",
    title: "Microsoft Windows 11 Enterprise Volume MAK (20 Activations)",
    category: "Business & Enterprise Licenses",
    price: 1500.00,
    salePrice: 499.99,
    imageUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=600&auto=format&fit=crop&q=80",
    description: "Commercial Volume Multiple Activation Key (MAK) for deploying and activating Windows 11 Enterprise across 20 separate devices simultaneously.",
    features: [
      "25-character commercial activation code for 20 devices",
      "Fully compliant with corporate audit requirements",
      "Supports offline KMS/MAK enterprise server structures"
    ],
    activationGuide: "Deploy code via Active Directory, Windows Deployment Services (WDS), or manual activation on host systems.",
    stock: 15,
    rating: 4.9,
    reviewsCount: 8
  },
  {
    id: "m365-enterprise-agreement",
    title: "Microsoft 365 Enterprise E3 (10 Seats - 1 Year Subscription)",
    category: "Business & Enterprise Licenses",
    price: 3800.00,
    salePrice: 2499.99,
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80",
    description: "Complete cloud-based business workspace for 10 corporate seats. Advanced security threat analytics, 100 GB inboxes, and Microsoft Teams Premium.",
    features: [
      "10 complete Office Enterprise E3 licenses",
      "Windows 11 Enterprise upgrades included",
      "Full cloud data protection & corporate compliance center"
    ],
    activationGuide: "Register licensing agreements inside your Microsoft Volume Licensing Center (VLSC) or tenant dashboard.",
    stock: 10,
    rating: 4.9,
    reviewsCount: 5
  },
  {
    id: "sql-server-2022-std",
    title: "Microsoft SQL Server 2022 Standard (16 Core License)",
    category: "Business & Enterprise Licenses",
    price: 3500.00,
    salePrice: 899.99,
    imageUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=600&auto=format&fit=crop&q=80",
    description: "Full license for up to 16 cores of SQL Server 2022. Powers commercial mission-critical database clusters, secure transaction logs, and Azure SQL link setups.",
    features: [
      "Perpetual SQL Server Standard product activation key",
      "Supports 16 cores of CPU hardware processing",
      "Intelligent query processing and database memory optimization"
    ],
    activationGuide: "Enter the standard core-based license key inside the SQL Server Installation Wizard under the 'Product Key' step.",
    stock: 20,
    rating: 4.8,
    reviewsCount: 14
  },
  {
    id: "exchange-server-2019-std",
    title: "Microsoft Exchange Server 2019 Standard Retail Key",
    category: "Business & Enterprise Licenses",
    price: 1200.00,
    salePrice: 299.99,
    imageUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=600&auto=format&fit=crop&q=80",
    description: "Build secure corporate mail servers. Supports high-performance memory cache architectures, private contact sync, and calendar hosting.",
    features: [
      "Genuine perpetual license code for 1 Exchange Standard server",
      "Integrates with Windows Server 2019 and Active Directory"
    ],
    activationGuide: "Input code inside the Exchange Admin Center (EAC) under the server licensing section.",
    stock: 12,
    rating: 4.7,
    reviewsCount: 11
  }
];

const INR_PRICE_MAP: { [id: string]: { price: number; salePrice: number } } = {
  'win-11-pro': { price: 3499, salePrice: 299 },
  'win-11-home': { price: 2999, salePrice: 249 },
  'win-11-ent': { price: 6999, salePrice: 999 },
  'win-10-pro': { price: 2999, salePrice: 199 },
  'win-10-home': { price: 2499, salePrice: 149 },
  'win-server-2022-std': { price: 14999, salePrice: 1499 },
  'win-server-2019-std': { price: 12999, salePrice: 1199 },
  'win-rds-cal-50': { price: 19999, salePrice: 2499 },
  'office-2024-pro-plus': { price: 8999, salePrice: 349 },
  'office-2021-pro-plus': { price: 7999, salePrice: 299 },
  'office-2019-pro-plus': { price: 6999, salePrice: 249 },
  'office-2016-pro-plus': { price: 5999, salePrice: 199 },
  'm365-personal-1yr': { price: 4899, salePrice: 999 },
  'm365-family-1yr': { price: 6199, salePrice: 1499 },
  'm365-biz-std': { price: 12500, salePrice: 2999 },
  'm365-biz-prem': { price: 21000, salePrice: 4999 },
  'bitdefender-total-sec': { price: 2999, salePrice: 499 },
  'norton-360-deluxe': { price: 3499, salePrice: 599 },
  'mcafee-total-prot': { price: 3999, salePrice: 399 },
  'kaspersky-prem-1yr': { price: 2499, salePrice: 499 },
  'eset-internet-sec': { price: 1999, salePrice: 299 },
  'quick-heal-total': { price: 1499, salePrice: 349 },
  'adobe-creative-cloud': { price: 49999, salePrice: 8999 },
  'adobe-photoshop': { price: 19999, salePrice: 3499 },
  'adobe-illustrator': { price: 19999, salePrice: 3499 },
  'adobe-premiere': { price: 19999, salePrice: 3999 },
  'coreldraw-graphics': { price: 39999, salePrice: 5999 },
};

// Transform all products to use Indian Rupees (INR) with custom mapping and dynamic fields
export const SEEDED_PRODUCTS: Product[] = RAW_SEEDED_PRODUCTS.map(product => {
  let price = Math.round(product.price * 80);
  let salePrice = Math.round(product.salePrice * 80);

  // If we have a custom INR mapping, use it!
  const custom = INR_PRICE_MAP[product.id];
  if (custom) {
    price = custom.price;
    salePrice = custom.salePrice;
  }

  // Set nice rounded pricing ending in .00 or just integers (as typical in India)
  price = Math.round(price);
  salePrice = Math.round(salePrice);

  // Set correct licenseType, deliveryTime and devices
  const isSubscription = product.id.includes('m365') || product.id.includes('adobe') || product.id.includes('vpn') || product.id.includes('subscription') || product.id.includes('1yr');
  const isEnterprise = product.id.includes('server') || product.id.includes('cal') || product.id.includes('ent') || product.id.includes('volume') || product.id.includes('biz');
  const licenseType = isSubscription ? 'Subscription' : (isEnterprise ? 'Enterprise' : 'Lifetime');

  const devices = product.id.includes('server') ? '1 Server' : (product.id.includes('cal') ? '50 Users' : (product.id.includes('deluxe') || product.id.includes('prem') ? '3 Devices' : (product.id.includes('total-sec') || product.id.includes('family') ? '5 Devices' : (product.id.includes('m365') ? '1 Device' : '1 PC'))));

  return {
    ...product,
    price,
    salePrice,
    licenseType,
    deliveryTime: '30 Seconds',
    devices
  };
});
