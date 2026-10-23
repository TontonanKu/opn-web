import { Order, User, MemberTierName, CustomerStats, LeaderboardEntry } from '../types';

export interface TierInfo {
  name: MemberTierName;
  minSpend: number;
  maxSpend: number;
  badge: string;
  badgeColor: string;
  benefits: string[];
}

export const MEMBER_TIERS: TierInfo[] = [
  {
    name: 'Bronze Explorer',
    minSpend: 0,
    maxSpend: 99999,
    badge: '🥉 Bronze',
    badgeColor: 'bg-amber-700 text-white',
    benefits: ['Garansi Respon 10 Menit', 'Akses Struk Digital Resmi', 'Live Chat CS 24/7']
  },
  {
    name: 'Silver Booster',
    minSpend: 100000,
    maxSpend: 299999,
    badge: '🥈 Silver',
    badgeColor: 'bg-slate-300 text-slate-900',
    benefits: ['Antrean Booster Prioritas', 'Akses Struk Digital', 'Bonus Poin Loyalitas 1.2x']
  },
  {
    name: 'Gold VIP',
    minSpend: 300000,
    maxSpend: 749999,
    badge: '🥇 Gold VIP',
    badgeColor: 'bg-[#FFC700] text-black',
    benefits: ['Fast-Track Pengerjaan Kilat', 'Jalur Khusus CS WhatsApp', 'Badge Profil VIP Emas']
  },
  {
    name: 'Platinum Elite',
    minSpend: 750000,
    maxSpend: 1999999,
    badge: '💎 Platinum',
    badgeColor: 'bg-cyan-500 text-white',
    benefits: ['Prioritas Utama Puncak Antrean', 'Request Booster Hero Gratis', 'Garansi Hold/Kendala 100%']
  },
  {
    name: 'Imperial Connoisseur',
    minSpend: 2000000,
    maxSpend: Infinity,
    badge: '👑 Imperial',
    badgeColor: 'bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-500 text-black',
    benefits: ['Hall of Fame Top Spender', 'Akses Langsung Kontak Owner Toko', 'Prioritas Pengerjaan Instan No #1']
  }
];

export const getTierBySpend = (spend: number): TierInfo => {
  for (let i = MEMBER_TIERS.length - 1; i >= 0; i--) {
    if (spend >= MEMBER_TIERS[i].minSpend) {
      return MEMBER_TIERS[i];
    }
  }
  return MEMBER_TIERS[0];
};

/**
 * Historical community top spenders to make leaderboard lively and authentic,
 * exactly like Discord community stores (e.g. 629 active members).
 */
const BASE_LEADERBOARD: Omit<LeaderboardEntry, 'rank' | 'isCurrentUser'>[] = [
  {
    name: 'see_one',
    phoneMasked: '0821••••9912',
    totalSpend: 4982665,
    totalTips: 75000,
    totalOrders: 37,
    reviewsCount: 13,
    points: 5780,
    tier: 'Imperial Connoisseur'
  },
  {
    name: 'KuroNeko_VIP',
    phoneMasked: '0812••••3841',
    totalSpend: 3450000,
    totalTips: 50000,
    totalOrders: 28,
    reviewsCount: 19,
    points: 4500,
    tier: 'Imperial Connoisseur'
  },
  {
    name: 'RyuuMythic99',
    phoneMasked: '0857••••1029',
    totalSpend: 2890000,
    totalTips: 35000,
    totalOrders: 22,
    reviewsCount: 14,
    points: 3660,
    tier: 'Imperial Connoisseur'
  },
  {
    name: 'Kenzy_Glory',
    phoneMasked: '0822••••8841',
    totalSpend: 1850000,
    totalTips: 25000,
    totalOrders: 16,
    reviewsCount: 11,
    points: 2450,
    tier: 'Platinum Elite'
  },
  {
    name: 'AuraSultan_ID',
    phoneMasked: '0813••••4472',
    totalSpend: 1420000,
    totalTips: 20000,
    totalOrders: 14,
    reviewsCount: 9,
    points: 1910,
    tier: 'Platinum Elite'
  },
  {
    name: 'Dinda_CanvaPro',
    phoneMasked: '0878••••9012',
    totalSpend: 890000,
    totalTips: 15000,
    totalOrders: 9,
    reviewsCount: 8,
    points: 1320,
    tier: 'Platinum Elite'
  },
  {
    name: 'BintangHonor',
    phoneMasked: '0896••••5519',
    totalSpend: 620000,
    totalTips: 10000,
    totalOrders: 7,
    reviewsCount: 6,
    points: 940,
    tier: 'Gold VIP'
  },
  {
    name: 'Fikri_Netflix4K',
    phoneMasked: '0819••••2230',
    totalSpend: 475000,
    totalTips: 8000,
    totalOrders: 5,
    reviewsCount: 4,
    points: 691,
    tier: 'Gold VIP'
  },
  {
    name: 'Vann_SoloRank',
    phoneMasked: '0852••••7711',
    totalSpend: 310000,
    totalTips: 5000,
    totalOrders: 4,
    reviewsCount: 3,
    points: 470,
    tier: 'Gold VIP'
  },
  {
    name: 'Zhafran_WuWa',
    phoneMasked: '0821••••3309',
    totalSpend: 185000,
    totalTips: 4000,
    totalOrders: 3,
    reviewsCount: 2,
    points: 293,
    tier: 'Silver Booster'
  }
];

export const TOTAL_COMMUNITY_MEMBERS = 629;

/**
 * Computes customer statistics based on their orders and user data.
 */
export const calculateCustomerStats = (
  user: User | null,
  userOrders: Order[]
): CustomerStats => {
  const validOrders = userOrders.filter(o => o.status !== 'cancelled');
  const ordersCount = validOrders.length;

  const totalSpend = validOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const totalTips = validOrders.reduce((sum, o) => sum + (o.tipAmount || 0), 0);
  const reviewsCount = validOrders.filter(o => Boolean(o.reviewSubmittedAt || o.rating)).length;

  // Points calculation:
  // - 1 Point per Rp 1.000 spend
  // - 2 Points per Rp 1.000 tips (generous bonus for tipping boosters)
  // - 50 Points bonus per review
  const spendPoints = Math.floor(totalSpend / 1000);
  const tipPoints = Math.floor((totalTips * 2) / 1000);
  const reviewPoints = reviewsCount * 50;
  const points = spendPoints + tipPoints + reviewPoints;

  const currentTierInfo = getTierBySpend(totalSpend);
  const tierIndex = MEMBER_TIERS.findIndex(t => t.name === currentTierInfo.name);
  const nextTierInfo = tierIndex < MEMBER_TIERS.length - 1 ? MEMBER_TIERS[tierIndex + 1] : undefined;

  let progressPercent = 100;
  let remainingToNextTier: number | undefined = undefined;

  if (nextTierInfo) {
    const range = nextTierInfo.minSpend - currentTierInfo.minSpend;
    const currentProgress = Math.max(0, totalSpend - currentTierInfo.minSpend);
    progressPercent = Math.min(99, Math.max(5, Math.round((currentProgress / range) * 100)));
    remainingToNextTier = Math.max(0, nextTierInfo.minSpend - totalSpend);
  }

  // Calculate Rank in Leaderboard
  // Count how many base leaderboard members have higher spend
  const higherSpendersCount = BASE_LEADERBOARD.filter(entry => entry.totalSpend > totalSpend).length;
  // If user has spend > 0, rank is higherSpendersCount + 1, otherwise put in community tier rank
  const rank = totalSpend > 0 
    ? Math.min(higherSpendersCount + 1, TOTAL_COMMUNITY_MEMBERS)
    : Math.min(18 + Math.floor(Math.random() * 5), TOTAL_COMMUNITY_MEMBERS);

  return {
    ordersCount,
    totalSpend,
    totalTips,
    reviewsCount,
    points,
    tier: currentTierInfo.name,
    rank,
    totalMembers: TOTAL_COMMUNITY_MEMBERS,
    nextTier: nextTierInfo?.name,
    remainingToNextTier,
    progressPercent
  };
};

/**
 * Generates the full sorted Leaderboard including current user.
 */
export const getFullLeaderboard = (
  currentUser: User | null,
  currentUserStats: CustomerStats
): LeaderboardEntry[] => {
  let list: Omit<LeaderboardEntry, 'rank'>[] = BASE_LEADERBOARD.map(entry => ({ ...entry }));

  if (currentUser && currentUserStats.totalSpend > 0) {
    const phoneMasked = currentUser.phone 
      ? `${currentUser.phone.slice(0, 4)}••••${currentUser.phone.slice(-4)}`
      : '08••••••••';

    // Check if user already in list by name
    const existingIdx = list.findIndex(e => e.name.toLowerCase() === currentUser.name.toLowerCase());
    const userEntry: Omit<LeaderboardEntry, 'rank'> = {
      name: currentUser.name,
      phoneMasked,
      totalSpend: currentUserStats.totalSpend,
      totalTips: currentUserStats.totalTips,
      totalOrders: currentUserStats.ordersCount,
      reviewsCount: currentUserStats.reviewsCount,
      points: currentUserStats.points,
      tier: currentUserStats.tier,
      isCurrentUser: true
    };

    if (existingIdx !== -1) {
      list[existingIdx] = userEntry;
    } else {
      list.push(userEntry);
    }
  }

  // Sort descending by totalSpend, then points
  list.sort((a, b) => b.totalSpend - a.totalSpend || b.points - a.points);

  // Assign 1-based ranks
  return list.map((entry, idx) => ({
    ...entry,
    rank: idx + 1
  }));
};
