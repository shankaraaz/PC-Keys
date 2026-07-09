import { Product } from '../types';
import { db, auth } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

// Levenshtein Distance for fuzzy matching
export function getLevenshteinDistance(a: string, b: string): number {
  const tmp: number[][] = [];
  const alen = a.length;
  const blen = b.length;
  if (alen === 0) return blen;
  if (blen === 0) return alen;
  
  for (let i = 0; i <= alen; i++) {
    tmp[i] = [i];
  }
  for (let j = 0; j <= blen; j++) {
    tmp[0][j] = j;
  }
  
  for (let i = 1; i <= alen; i++) {
    for (let j = 1; j <= blen; j++) {
      tmp[i][j] = Math.min(
        tmp[i - 1][j] + 1,
        tmp[i][j - 1] + 1,
        tmp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return tmp[alen][blen];
}

// Check if a word is a fuzzy match to another word
export function isFuzzyMatch(word1: string, word2: string): boolean {
  const w1 = word1.toLowerCase().trim();
  const w2 = word2.toLowerCase().trim();
  if (w1 === w2) return true;
  if (w2.includes(w1) || w1.includes(w2)) return true;
  
  const maxLen = Math.max(w1.length, w2.length);
  if (maxLen < 3) return false;
  
  const dist = getLevenshteinDistance(w1, w2);
  if (maxLen <= 4) return dist <= 1;
  if (maxLen <= 8) return dist <= 2;
  return dist <= 3;
}

// Normalization Rules
export function normalizeQuery(queryText: string): string {
  let q = queryText.toLowerCase().trim();
  
  // Replace complete phrases first
  q = q.replace(/\boffice key\b/g, 'office');
  q = q.replace(/\bwindows key\b/g, 'windows');
  q = q.replace(/\bwin key\b/g, 'windows');
  q = q.replace(/\bms office\b/g, 'microsoft office');
  
  // Replacement dictionary for individual tokens
  const replacements: { [key: string]: string } = {
    'ms': 'microsoft',
    'm365': 'microsoft 365',
    'win': 'windows',
    'av': 'antivirus'
  };
  
  const tokens = q.split(/\s+/).map(t => replacements[t] || t);
  return tokens.join(' ');
}

// Synonym mapping Groups
export interface SynonymGroup {
  id: string;
  keywords: string[];
  primaryTerms: string[];
}

export const SYNONYM_GROUPS: SynonymGroup[] = [
  {
    id: 'office',
    keywords: ['office', 'microsoft office', 'office key', 'office activation', 'office 365', 'm365', 'ms office'],
    primaryTerms: ['office', 'm365', 'microsoft 365']
  },
  {
    id: 'windows',
    keywords: ['windows', 'windows key', 'win10', 'win11', 'win', 'microsoft windows'],
    primaryTerms: ['windows', 'win']
  },
  {
    id: 'antivirus',
    keywords: ['antivirus', 'security', 'protection', 'antivirus key', 'mcafee', 'kaspersky', 'kasperski', 'mcfee', 'av'],
    primaryTerms: ['antivirus', 'security', 'protection']
  },
  {
    id: 'developer',
    keywords: ['jetbrains', 'ide', 'developer software', 'coding tools', 'visual studio', 'visual', 'sql server'],
    primaryTerms: ['jetbrains', 'ide', 'developer', 'visual studio']
  }
];

// Dynamically generate tags and brand for any Product
export function getProductMeta(product: Product): { brand: string; tags: string[] } {
  const title = product.title.toLowerCase();
  const cat = product.category.toLowerCase();
  const desc = product.description.toLowerCase();
  
  let brand = 'Other';
  const tags: string[] = [];
  
  // Determine Brand
  if (title.includes('microsoft') || title.includes('windows') || title.includes('office') || title.includes('visio') || title.includes('project') || title.includes('sql server')) {
    brand = 'Microsoft';
  } else if (title.includes('mcafee')) {
    brand = 'McAfee';
  } else if (title.includes('kaspersky') || title.includes('kasperski')) {
    brand = 'Kaspersky';
  } else if (title.includes('jetbrains') || title.includes('intellij') || title.includes('pycharm') || title.includes('clion') || title.includes('webstorm') || title.includes('rider')) {
    brand = 'JetBrains';
  } else if (title.includes('adobe') || title.includes('photoshop') || title.includes('creative cloud')) {
    brand = 'Adobe';
  } else if (title.includes('vpn') || title.includes('nordvpn') || title.includes('expressvpn')) {
    brand = 'NordVPN';
  } else if (title.includes('autodesk') || title.includes('autocad')) {
    brand = 'Autodesk';
  }
  
  // Extract Tags
  if (cat.includes('windows') || title.includes('windows') || title.includes('win11') || title.includes('win10')) {
    tags.push('windows', 'os', 'operating system', 'win', 'microsoft', 'activation');
    if (title.includes('server')) tags.push('server', 'enterprise');
  }
  if (cat.includes('office') || title.includes('office') || title.includes('365') || title.includes('m365')) {
    tags.push('office', 'microsoft', 'm365', 'productivity', 'word', 'excel', 'powerpoint', 'activation');
  }
  if (cat.includes('antivirus') || title.includes('antivirus') || title.includes('security') || title.includes('protection') || title.includes('mcafee') || title.includes('kaspersky')) {
    tags.push('antivirus', 'security', 'protection', 'key', 'safe', 'firewall', 'malware');
  }
  if (cat.includes('developer') || title.includes('jetbrains') || title.includes('ide') || title.includes('clion') || title.includes('pycharm')) {
    tags.push('jetbrains', 'ide', 'developer', 'coding', 'programming', 'tools');
  }
  if (title.includes('vpn') || cat.includes('vpn')) {
    tags.push('vpn', 'privacy', 'security', 'proxy', 'encryption', 'anonymous');
  }
  if (title.includes('gift card') || title.includes('gaming') || cat.includes('gaming')) {
    tags.push('gaming', 'gift card', 'voucher', 'steam', 'playstation', 'xbox');
  }
  
  // Add descriptive modifier words
  const modifiers = ['license', 'activation', 'genuine', 'lifetime', 'retail', 'oem', 'subscription'];
  for (const mod of modifiers) {
    if (title.includes(mod) || desc.includes(mod)) {
      tags.push(mod);
    }
  }
  
  return {
    brand,
    tags: Array.from(new Set(tags))
  };
}

// Core Relevance Ranking and Query Matcher
export interface SearchResult {
  product: Product;
  score: number;
}

export function searchProducts(
  queryText: string,
  products: Product[],
  categoryFilter: string = 'All'
): SearchResult[] {
  if (!queryText.trim()) {
    // If no search query, return all products matching the category with a score of 100
    const filtered = categoryFilter === 'All'
      ? products
      : products.filter(p => p.category === categoryFilter);
    return filtered.map(p => ({ product: p, score: 100 }));
  }

  const originalQuery = queryText.toLowerCase().trim();
  const normalizedQuery = normalizeQuery(queryText);
  const queryTokens = normalizedQuery.split(/\s+/).filter(Boolean);

  const results: SearchResult[] = [];

  for (const product of products) {
    // Category match is a hard filter first
    if (categoryFilter !== 'All' && product.category !== categoryFilter) {
      continue;
    }

    const { brand, tags } = getProductMeta(product);
    const title = product.title.toLowerCase();
    const category = product.category.toLowerCase();
    const description = product.description.toLowerCase();
    
    let score = 0;
    let matchCount = 0;

    // 1. Synonym matching boost (highest priority)
    let synonymBoost = 0;
    for (const group of SYNONYM_GROUPS) {
      const queryHasSynonym = group.keywords.some(keyword => {
        const regex = new RegExp(`\\b${keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
        return regex.test(normalizedQuery) || regex.test(originalQuery);
      });
      
      if (queryHasSynonym) {
        const productMatchesGroup = group.primaryTerms.some(term => {
          return title.includes(term) || 
                 category.includes(term) || 
                 brand.toLowerCase().includes(term) || 
                 tags.some(tag => tag.includes(term));
        });
        
        if (productMatchesGroup) {
          synonymBoost += 85;
          matchCount++;
        }
      }
    }
    score += synonymBoost;

    // 2. Token by Token Scoring with Priorities:
    // Priority:
    // 1. Product Name (Title)
    // 2. Tags
    // 3. Category
    // 4. Brand
    // 5. Description
    for (const token of queryTokens) {
      let tokenScore = 0;
      let matchedToken = false;

      // --- 1. Product Name (Title) Matches ---
      if (title.includes(token)) {
        tokenScore += 100;
        matchedToken = true;
        // Exact word match bonus
        const regex = new RegExp(`\\b${token.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
        if (regex.test(title)) {
          tokenScore += 50;
        }
      } else {
        // Fuzzy match in title words
        const titleWords = title.split(/[\s\-_(),.]+/);
        const fuzzyTitle = titleWords.some(word => isFuzzyMatch(word, token));
        if (fuzzyTitle) {
          tokenScore += 45;
          matchedToken = true;
        }
      }

      // --- 2. Tags Matches ---
      const exactTag = tags.some(tag => tag.toLowerCase() === token);
      if (exactTag) {
        tokenScore += 50;
        matchedToken = true;
      } else {
        const fuzzyTag = tags.some(tag => isFuzzyMatch(tag, token));
        if (fuzzyTag) {
          tokenScore += 25;
          matchedToken = true;
        }
      }

      // --- 3. Category Matches ---
      if (category.includes(token)) {
        tokenScore += 30;
        matchedToken = true;
      } else {
        const catWords = category.split(/[\s\-_(),.]+/);
        const fuzzyCat = catWords.some(word => isFuzzyMatch(word, token));
        if (fuzzyCat) {
          tokenScore += 15;
          matchedToken = true;
        }
      }

      // --- 4. Brand Matches ---
      if (brand.toLowerCase().includes(token)) {
        tokenScore += 25;
        matchedToken = true;
      } else if (isFuzzyMatch(brand, token)) {
        tokenScore += 10;
        matchedToken = true;
      }

      // --- 5. Description Matches ---
      if (description.includes(token)) {
        tokenScore += 12;
        matchedToken = true;
        // exact word in desc
        const regex = new RegExp(`\\b${token.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
        if (regex.test(description)) {
          tokenScore += 8;
        }
      } else {
        const descWords = description.split(/\s+/);
        const fuzzyDesc = descWords.slice(0, 50).some(word => isFuzzyMatch(word, token)); // optimize: check first 50 words
        if (fuzzyDesc) {
          tokenScore += 5;
          matchedToken = true;
        }
      }

      if (matchedToken) {
        score += tokenScore;
        matchCount++;
      }
    }

    // Only include if we have at least one token match or synonym match
    if (matchCount > 0) {
      // Add a slight boost based on product rating to act as popularity ranker ( Flipkart/Amazon style)
      score += (product.rating || 0) * 2;
      results.push({ product, score });
    }
  }

  // Sort by score descending, then by reviews count or rating
  return results.sort((a, b) => {
    if (Math.abs(a.score - b.score) < 0.1) {
      return b.product.rating - a.product.rating;
    }
    return b.score - a.score;
  });
}

// Get Autocomplete suggestions based on query
export function getAutocompleteSuggestions(
  queryText: string,
  products: Product[]
): string[] {
  const q = queryText.toLowerCase().trim();
  if (q.length < 2) return [];

  const results = searchProducts(q, products);
  const suggestions: string[] = [];

  // 1. Gather top product titles
  for (const res of results) {
    if (suggestions.length < 6) {
      suggestions.push(res.product.title);
    }
  }

  // 2. Also suggest common categories or keywords
  const categories = ['Windows', 'Office', 'Antivirus', 'VPN', 'JetBrains'];
  for (const cat of categories) {
    if (cat.toLowerCase().startsWith(q) || q.startsWith(cat.toLowerCase())) {
      if (!suggestions.includes(cat) && suggestions.length < 6) {
        suggestions.unshift(cat);
      }
    }
  }

  return suggestions.slice(0, 6);
}

// Spelling auto-correction / "Did you mean:" query generator
export function getDidYouMeanQuery(queryText: string): string | null {
  const words = queryText.toLowerCase().trim().split(/\s+/);
  let corrected = false;
  
  const dictionary = [
    'office', 'microsoft', 'windows', 'antivirus', 'security', 'protection',
    'jetbrains', 'mcafee', 'kaspersky', 'privacy', 'server', 'database',
    'activation', 'license', 'professional', 'enterprise', 'lifetime', 'retail'
  ];

  const correctedWords = words.map(word => {
    if (dictionary.includes(word) || word.length <= 3) return word;
    
    // Find closest dictionary word
    let closestWord = word;
    let minDistance = 999;
    
    for (const dictWord of dictionary) {
      const dist = getLevenshteinDistance(word, dictWord);
      if (dist < minDistance && dist <= 2) {
        minDistance = dist;
        closestWord = dictWord;
      }
    }
    
    if (closestWord !== word) {
      corrected = true;
    }
    return closestWord;
  });

  return corrected ? correctedWords.join(' ') : null;
}

// Log Search Analytics to Firestore
export async function logSearchAnalytics(
  query: string,
  resultCount: number,
  userId: string | null
): Promise<void> {
  const cleanQuery = query.trim();
  if (!cleanQuery) return;
  
  try {
    const path = 'search_logs';
    await addDoc(collection(db, path), {
      query: cleanQuery,
      timestamp: new Date().toISOString(),
      userId: userId || 'anonymous',
      resultCount: resultCount
    });
  } catch (error) {
    console.warn('Failed to log search analytics:', error);
  }
}
