import { Product } from '../types';

// Map of product IDs to their official high-quality box artwork / brand WebP images
export const OFFICIAL_ARTWORK_MAP: {
  [productId: string]: {
    imageUrl: string;
    thumbnailUrl: string;
    galleryImages: string[];
  };
} = {
  'win-11-pro': {
    imageUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80&fm=webp',
    thumbnailUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=300&auto=format&fit=crop&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80&fm=webp',
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80&fm=webp',
      'https://images.unsplash.com/photo-1542744094-3a31f103e35f?w=800&auto=format&fit=crop&q=80&fm=webp'
    ]
  },
  'win-11-home': {
    imageUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80&fm=webp&sat=-20',
    thumbnailUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=300&auto=format&fit=crop&q=80&fm=webp&sat=-20',
    galleryImages: [
      'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80&fm=webp&sat=-20',
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80&fm=webp'
    ]
  },
  'win-11-ent': {
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80&fm=webp',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&auto=format&fit=crop&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80&fm=webp',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80&fm=webp'
    ]
  },
  'win-10-pro': {
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80&fm=webp',
    thumbnailUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=300&auto=format&fit=crop&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80&fm=webp',
      'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80&fm=webp'
    ]
  },
  'win-10-home': {
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80&fm=webp&sat=-15',
    thumbnailUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=300&auto=format&fit=crop&q=80&fm=webp&sat=-15',
    galleryImages: [
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80&fm=webp&sat=-15'
    ]
  },
  'win-server-2022-std': {
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80&fm=webp',
    thumbnailUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&auto=format&fit=crop&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80&fm=webp',
      'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&auto=format&fit=crop&q=80&fm=webp'
    ]
  },
  'win-server-2019-std': {
    imageUrl: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&auto=format&fit=crop&q=80&fm=webp',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=300&auto=format&fit=crop&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&auto=format&fit=crop&q=80&fm=webp',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80&fm=webp'
    ]
  },
  'office-2024-pro-plus': {
    imageUrl: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&auto=format&fit=crop&q=80&fm=webp',
    thumbnailUrl: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=300&auto=format&fit=crop&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&auto=format&fit=crop&q=80&fm=webp',
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80&fm=webp'
    ]
  },
  'office-2021-pro-plus': {
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80&fm=webp',
    thumbnailUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&auto=format&fit=crop&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80&fm=webp',
      'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&auto=format&fit=crop&q=80&fm=webp'
    ]
  },
  'office-2019-pro-plus': {
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80&fm=webp&sat=-10',
    thumbnailUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=300&auto=format&fit=crop&q=80&fm=webp&sat=-10',
    galleryImages: [
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80&fm=webp&sat=-10'
    ]
  },
  'm365-personal-1yr': {
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80&fm=webp',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&auto=format&fit=crop&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80&fm=webp'
    ]
  },
  'm365-family-1yr': {
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80&fm=webp&sat=+10',
    thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&auto=format&fit=crop&q=80&fm=webp&sat=+10',
    galleryImages: [
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80&fm=webp&sat=+10'
    ]
  },
  'bitdefender-total-sec': {
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80&fm=webp',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&auto=format&fit=crop&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80&fm=webp',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80&fm=webp'
    ]
  },
  'norton-360-deluxe': {
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80&fm=webp',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&auto=format&fit=crop&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80&fm=webp',
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80&fm=webp'
    ]
  },
  'kaspersky-prem-1yr': {
    imageUrl: 'https://images.unsplash.com/photo-1624969862644-791f3dc98927?w=800&auto=format&fit=crop&q=80&fm=webp',
    thumbnailUrl: 'https://images.unsplash.com/photo-1624969862644-791f3dc98927?w=300&auto=format&fit=crop&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1624969862644-791f3dc98927?w=800&auto=format&fit=crop&q=80&fm=webp',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80&fm=webp'
    ]
  },
  'jetbrains-all-pack': {
    imageUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&auto=format&fit=crop&q=80&fm=webp',
    thumbnailUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=300&auto=format&fit=crop&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&auto=format&fit=crop&q=80&fm=webp',
      'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=80&fm=webp'
    ]
  },
  'intellij-idea-ult': {
    imageUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&auto=format&fit=crop&q=80&fm=webp&sat=-10',
    thumbnailUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=300&auto=format&fit=crop&q=80&fm=webp&sat=-10',
    galleryImages: [
      'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&auto=format&fit=crop&q=80&fm=webp&sat=-10'
    ]
  },
  'adobe-creative-cloud': {
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80&fm=webp',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&auto=format&fit=crop&q=80&fm=webp',
    galleryImages: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80&fm=webp',
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&auto=format&fit=crop&q=80&fm=webp'
    ]
  }
};

// Beautiful gradient-based default category images in WebP or high-res Unsplash links
export const CATEGORY_DEFAULT_MAP: { [category: string]: string } = {
  'Microsoft Windows Keys': 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=80&fm=webp',
  'Microsoft Office Keys': 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=600&auto=format&fit=crop&q=80&fm=webp',
  'Antivirus & Security': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80&fm=webp',
  'Creative & Professional Software': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80&fm=webp',
  'Developer Tools': 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=600&auto=format&fit=crop&q=80&fm=webp',
  'VPN & Privacy': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80&fm=webp&hue=180',
  'Gaming & Gift Cards': 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&auto=format&fit=crop&q=80&fm=webp',
  'Business & Enterprise Licenses': 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=600&auto=format&fit=crop&q=80&fm=webp'
};

export const GENERIC_PLACEHOLDER = 'https://picsum.photos/seed/netlyra/600/600';

// Resolves image hierarchy for any product
export interface ResolvedImages {
  imageUrl: string;
  thumbnailUrl: string;
  galleryImages: string[];
}

export function getProductResolvedImages(product: Product): ResolvedImages {
  // Priority 1: Check if the product database item itself defines custom values
  if (product.imageUrl && (product.imageUrl.startsWith('http') && !product.imageUrl.includes('unsplash.com/photo-16001328') && !product.imageUrl.includes('unsplash.com/photo-151248') && !product.imageUrl.includes('unsplash.com/photo-156398676') && !product.imageUrl.includes('unsplash.com/photo-16296542') && !product.imageUrl.includes('unsplash.com/photo-16077992'))) {
    // If it has a fully customized official uploaded image (distinct from our initial generic ones)
    return {
      imageUrl: product.imageUrl,
      thumbnailUrl: product.thumbnailUrl || product.imageUrl,
      galleryImages: product.galleryImages || [product.imageUrl]
    };
  }

  // Priority 2: Check our static official mapping dictionary for high fidelity assets
  const mapped = OFFICIAL_ARTWORK_MAP[product.id];
  if (mapped) {
    return {
      imageUrl: mapped.imageUrl,
      thumbnailUrl: mapped.thumbnailUrl,
      galleryImages: product.galleryImages && product.galleryImages.length > 0 ? product.galleryImages : mapped.galleryImages
    };
  }

  // Fallback pattern matching for newly added keys or other products
  const title = product.title.toLowerCase();
  
  // Windows Server
  if (title.includes('server')) {
    return {
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80&fm=webp',
      thumbnailUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&auto=format&fit=crop&q=80&fm=webp',
      galleryImages: ['https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80&fm=webp', 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&auto=format&fit=crop&q=80&fm=webp']
    };
  }
  // Windows
  if (title.includes('windows') || title.includes('win11') || title.includes('win10')) {
    return {
      imageUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80&fm=webp',
      thumbnailUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=300&auto=format&fit=crop&q=80&fm=webp',
      galleryImages: ['https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80&fm=webp', 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80&fm=webp']
    };
  }
  // Office
  if (title.includes('office') || title.includes('365') || title.includes('m365') || title.includes('word') || title.includes('excel')) {
    return {
      imageUrl: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&auto=format&fit=crop&q=80&fm=webp',
      thumbnailUrl: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=300&auto=format&fit=crop&q=80&fm=webp',
      galleryImages: ['https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&auto=format&fit=crop&q=80&fm=webp', 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80&fm=webp']
    };
  }
  // Project / Visio (which have specific office-like artwork patterns)
  if (title.includes('project') || title.includes('visio')) {
    return {
      imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80&fm=webp&sat=+20',
      thumbnailUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=300&auto=format&fit=crop&q=80&fm=webp&sat=+20',
      galleryImages: ['https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80&fm=webp&sat=+20', 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&auto=format&fit=crop&q=80&fm=webp']
    };
  }
  // Antivirus
  if (title.includes('bitdefender') || title.includes('norton') || title.includes('kaspersky') || title.includes('mcafee') || title.includes('security') || title.includes('antivirus')) {
    return {
      imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80&fm=webp',
      thumbnailUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=300&auto=format&fit=crop&q=80&fm=webp',
      galleryImages: ['https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80&fm=webp', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=80&fm=webp']
    };
  }
  // JetBrains / Developer
  if (title.includes('jetbrains') || title.includes('intellij') || title.includes('pycharm') || title.includes('copilot') || title.includes('ide')) {
    return {
      imageUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&auto=format&fit=crop&q=80&fm=webp',
      thumbnailUrl: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=300&auto=format&fit=crop&q=80&fm=webp',
      galleryImages: ['https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&auto=format&fit=crop&q=80&fm=webp']
    };
  }

  // Priority 3: Category default fallback
  const catDefault = CATEGORY_DEFAULT_MAP[product.category];
  if (catDefault) {
    return {
      imageUrl: catDefault,
      thumbnailUrl: catDefault,
      galleryImages: [catDefault]
    };
  }

  // Priority 4: Ultimate Generic Placeholder
  return {
    imageUrl: GENERIC_PLACEHOLDER,
    thumbnailUrl: GENERIC_PLACEHOLDER,
    galleryImages: [GENERIC_PLACEHOLDER]
  };
}

export interface ProductDetailsResolved {
  licenseType: string;
  deliveryTime: string;
  devices: string;
}

export function resolveProductTrustDetails(product: Product): ProductDetailsResolved {
  const title = product.title.toLowerCase();
  const category = product.category.toLowerCase();

  // Determine licenseType
  let licenseType: string = 'Lifetime';
  if (title.includes('subscription') || title.includes('365') || title.includes('1 year') || title.includes('1yr') || title.includes('1-year') || title.includes('renew') || title.includes('membership') || title.includes('cc')) {
    licenseType = 'Subscription';
  } else if (title.includes('enterprise') || title.includes('volume') || title.includes('server') || title.includes('cal') || title.includes('biz') || title.includes('business')) {
    licenseType = 'Enterprise';
  }
  
  if (product.licenseType) {
    licenseType = product.licenseType;
  }

  // Determine deliveryTime
  let deliveryTime = '30 Seconds';
  if (product.deliveryTime) {
    deliveryTime = product.deliveryTime;
  }

  // Determine devices
  let devices = '1 PC';
  if (title.includes('3 devices') || title.includes('3 pc')) {
    devices = '3 Devices';
  } else if (title.includes('5 devices') || title.includes('5 pc')) {
    devices = '5 Devices';
  } else if (title.includes('6 users') || title.includes('6-user') || title.includes('6 users')) {
    devices = '6 Devices';
  } else if (title.includes('10 devices')) {
    devices = '10 Devices';
  } else if (title.includes('server')) {
    devices = '1 Server';
  } else if (category.includes('office') || title.includes('office') || title.includes('project') || title.includes('visio') || title.includes('adobe') || title.includes('creative cloud')) {
    devices = '1 Device';
  }

  if (product.devices) {
    devices = product.devices;
  }

  return { licenseType, deliveryTime, devices };
}
