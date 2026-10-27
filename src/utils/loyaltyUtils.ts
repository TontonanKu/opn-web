import { Order, User, MemberTierName, CustomerStats, LeaderboardEntry } from '../types';
import { isReservedAdminIdentifier } from './securityUtils';

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
    badge: 'Bronze',
    badgeColor: 'bg-amber-700 text-white',
    benefits: [
      'Akses Struk Pembayaran Digital Resmi',
      'Garansi Respon Cepat CS (< 10 Menit)',
      'Layanan Bantuan WhatsApp & Live Chat 24/7'
    ]
  },
  {
    name: 'Silver Booster',
    minSpend: 100000,
    maxSpend: 299999,
    badge: 'Silver',
    badgeColor: 'bg-slate-300 text-slate-900',
    benefits: [
      'Prioritas Pengerjaan di Atas Antrean Reguler',
      'Akumulasi Poin Loyalitas Setiap Transaksi',
      'Badge Akun Silver Booster Resmi'
    ]
  },
  {
    name: 'Gold VIP',
    minSpend: 300000,
    maxSpend: 749999,
    badge: 'Gold VIP',
    badgeColor: 'bg-[#FFC700] text-black',
    benefits: [
      'Bebas Request Jadwal Pengerjaan (Siang / Malam)',
      'Jalur Khusus CS WhatsApp Prioritas',
      'Badge Akun Gold VIP Resmi'
    ]
  },
  {
    name: 'Platinum Elite',
    minSpend: 750000,
    maxSpend: 1999999,
    badge: 'Platinum',
    badgeColor: 'bg-cyan-500 text-white',
    benefits: [
      'Prioritas Utama Antrean Pengerjaan Kilat',
      'Bebas Request Hero Utama (Tanpa Biaya Tambahan)',
      'Garansi Ganti Akun/Profil Baru Jika Ada Kendala'
    ]
  },
  {
    name: 'Imperial Connoisseur',
    minSpend: 2000000,
    maxSpend: Infinity,
    badge: 'Imperial',
    badgeColor: 'bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-500 text-black',
    benefits: [
      'Peringkat Kehormatan di Leaderboard Top Spender',
      'Pelayanan Jalur VIP Langsung dengan Owner Toko',
      'Garansi Penggantian Penuh & Pendampingan Paling Prioritas'
    ]
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
 * Generates the full sorted Leaderboard computed strictly from real orders.
 * Strictly excludes admins, staff test accounts, and Rp 0 users.
 * NO DUMMY DATA.
 */
export const getFullLeaderboard = (
  currentUser: User | null,
  allOrders: Order[] = []
): LeaderboardEntry[] => {
  const customerMap = new Map<string, {
    name: string;
    phone: string;
    totalSpend: number;
    totalTips: number;
    totalOrders: number;
    reviewsCount: number;
    isCurrentUser: boolean;
  }>();

  const getCustomerKey = (name?: string, phone?: string, userId?: string) => {
    if (userId && userId !== 'usr_admin') return `uid_${userId}`;
    const cleanPhone = (phone || '').replace(/[^0-9]/g, '');
    if (cleanPhone.length >= 8) return `phone_${cleanPhone}`;
    const cleanName = (name || '').trim().toLowerCase();
    if (cleanName) return `name_${cleanName}`;
    return null;
  };

  // Ingest ONLY real store orders with valid spending (completed or processing)
  const validOrders = (allOrders || []).filter(o => 
    (o.status === 'completed' || o.status === 'processing') &&
    (o.totalAmount && o.totalAmount > 0)
  );

  validOrders.forEach(order => {
    const name = order.customerName || 'Pelanggan Zura';
    const phone = order.customerPhone || '';
    
    // Strictly exclude admins and staff test accounts from customer leaderboard
    if (
      isReservedAdminIdentifier(name) ||
      isReservedAdminIdentifier(phone) ||
      order.userId === 'usr_admin' ||
      name.toLowerCase().includes('admin')
    ) {
      return;
    }

    const key = getCustomerKey(name, phone, order.userId) || `order_${order.id}`;

    const isMatch = Boolean(
      currentUser && (
        (order.userId && order.userId === currentUser.id) ||
        (phone && currentUser.phone && phone.replace(/[^0-9]/g, '') === currentUser.phone.replace(/[^0-9]/g, '')) ||
        (name.toLowerCase() === currentUser.name.toLowerCase())
      )
    );

    const existing = customerMap.get(key);
    const hasReview = Boolean(order.reviewSubmittedAt || order.rating);

    if (existing) {
      existing.totalSpend += (order.totalAmount || 0);
      existing.totalTips += (order.tipAmount || 0);
      existing.totalOrders += 1;
      if (hasReview) existing.reviewsCount += 1;
      if (isMatch) existing.isCurrentUser = true;
      if (name && (!existing.name || existing.name === 'Pelanggan Zura')) existing.name = name;
      if (phone && !existing.phone) existing.phone = phone;
    } else {
      customerMap.set(key, {
        name,
        phone,
        totalSpend: order.totalAmount || 0,
        totalTips: order.tipAmount || 0,
        totalOrders: 1,
        reviewsCount: hasReview ? 1 : 0,
        isCurrentUser: isMatch
      });
    }
  });

  // Filter out any entries that have zero spending or are admin
  const entries: Omit<LeaderboardEntry, 'rank'>[] = Array.from(customerMap.values())
    .filter(cust => 
      cust.totalSpend > 0 &&
      !isReservedAdminIdentifier(cust.name) &&
      !isReservedAdminIdentifier(cust.phone) &&
      !cust.name.toLowerCase().includes('admin')
    )
    .map(cust => {
      const spendPoints = Math.floor(cust.totalSpend / 1000);
      const tipPoints = Math.floor((cust.totalTips * 2) / 1000);
      const reviewPoints = cust.reviewsCount * 50;
      const points = spendPoints + tipPoints + reviewPoints;

      const cleanPhone = cust.phone.replace(/[^0-9]/g, '');
      const phoneMasked = cleanPhone && cleanPhone.length >= 8
        ? `${cleanPhone.slice(0, 4)}••••${cleanPhone.slice(-3)}`
        : '08••••••••';

      const tierInfo = getTierBySpend(cust.totalSpend);

      return {
        name: cust.name,
        phoneMasked,
        totalSpend: cust.totalSpend,
        totalTips: cust.totalTips,
        totalOrders: cust.totalOrders,
        reviewsCount: cust.reviewsCount,
        points,
        tier: tierInfo.name,
        isCurrentUser: cust.isCurrentUser
      };
    });

  // Sort descending: totalSpend DESC, then points DESC, then totalOrders DESC
  entries.sort((a, b) => b.totalSpend - a.totalSpend || b.points - a.points || b.totalOrders - a.totalOrders);

  // Assign 1-based ranks
  return entries.map((entry, idx) => ({
    ...entry,
    rank: idx + 1
  }));
};

/**
 * Computes customer statistics based strictly on real orders.
 * NO DUMMY DATA.
 */
export const calculateCustomerStats = (
  user: User | null,
  userOrders: Order[],
  allOrders: Order[] = []
): CustomerStats => {
  const activeOrDoneOrders = (userOrders || []).filter(o => o.status === 'completed' || o.status === 'processing');
  const ordersCount = (userOrders || []).filter(o => o.status !== 'cancelled').length;

  const totalSpend = activeOrDoneOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const totalTips = activeOrDoneOrders.reduce((sum, o) => sum + (o.tipAmount || 0), 0);
  const reviewsCount = activeOrDoneOrders.filter(o => Boolean(o.reviewSubmittedAt || o.rating)).length;

  // Points calculation:
  // - 1 Point per Rp 1.000 spend
  // - 2 Points per Rp 1.000 tips (apresiasi booster)
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
    progressPercent = range > 0 ? Math.min(99, Math.max(0, Math.round((currentProgress / range) * 100))) : 0;
    remainingToNextTier = Math.max(0, nextTierInfo.minSpend - totalSpend);
  }

  // Calculate actual real leaderboard ranking
  const fullLeaderboard = getFullLeaderboard(user, allOrders);
  const totalMembers = Math.max(1, fullLeaderboard.length);

  const currentUserEntry = fullLeaderboard.find(e => e.isCurrentUser);
  const rank = currentUserEntry ? currentUserEntry.rank : 1;

  return {
    ordersCount,
    totalSpend,
    totalTips,
    reviewsCount,
    points,
    tier: currentTierInfo.name,
    rank,
    totalMembers,
    nextTier: nextTierInfo?.name,
    remainingToNextTier,
    progressPercent
  };
};
