export interface CatalogItem {
  id: string;
  label: string;
  name?: string;
  price: number;
  unit?: string;
  badge?: string;
  remindDays?: number;
  aliases?: string[];
}

export interface CatalogSection {
  id: string;
  group?: string;
  title: string;
  icon: string;
  iconImage?: string;
  chip?: string;
  via?: string;
  productId: string;
  productName: string;
  note?: string;
  notesList?: string[];
  advantages?: string[];
  orderable?: boolean;
  items: CatalogItem[];
}

export interface CatalogGroup {
  id: string;
  title: string;
  icon: string;
  iconImage?: string;
  subtitle?: string;
  highlights?: { id: string; label?: string; badge?: string }[];
}

export interface CatalogCategory {
  key: 'wuwa' | 'roblox' | 'apps' | 'discord' | 'mm';
  type: 'joki' | 'produk';
  icon: string;
  iconImage?: string;
  name: string;
  title: string;
  short: string;
  tag: string;
  tagline: string;
  dbCategory: string;
  ticketType: 'order' | 'mm';
  buttonLabel: string;
  menuNoun: string;
  priceWord?: string;
  promoTitle?: string;
  promoMessage?: string;
  orderGuide?: string[];
  notes: string[];
  groups?: CatalogGroup[];
  sections: CatalogSection[];
}

export const STORE_CONFIG = {
  storeName: 'TOKO KAZURA',
  subName: 'ZURA STORE',
  fullStoreName: 'TOKO KAZURA • ZURA STORE',
  ownerUsername: 'Zura (see_one)',
  logoUrl: '/assets/logo-kazura.png',
  bannerUrl: '/assets/banner-kazura.jpg',
  qrisUrl: '/assets/qris-kazura-store.png',
  whatsappNumber: '6282172795156',
  whatsappDisplay: '+62 821-7279-5156',
  discordInviteUrl: 'https://discord.gg/kTqNnYUsmB',
  discordTicketUrl: 'https://discord.com/channels/1363342252059136222/1564689688088813659',
  discordCatalogUrl: 'https://discord.com/channels/1363342252059136222/1535454247070470184',
  website: 'https://zura-w.my.id',
  version: 'v0.1',
  shortBio:
    'Pusat Joki Game (Wuthering Waves & Roblox 100% Handplay Manual), Aplikasi Premium Private Bergaransi, Kebutuhan Discord, serta Jasa Middleman / Rekber Resmi bareng Owner.',
  storeHours: {
    openHour: 8,
    closeHour: 23,
    utcOffset: 7,
    label: '08.00 – 23.00 WIB'
  },
  paymentInfo: {
    merchant: 'KAZURA STORE',
    nmid: 'ID1025393427014',
    supports: 'DANA, GoPay, OVO, ShopeePay, SeaBank & semua M-Banking'
  }
};

const HOUR_MS = 60 * 60 * 1000;

export function isWithinStoreHours(ms = Date.now()): boolean {
  const offset = STORE_CONFIG.storeHours.utcOffset * HOUR_MS;
  const local = new Date(ms + offset);
  const dayStart = Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate()) - offset;
  const openAt = dayStart + STORE_CONFIG.storeHours.openHour * HOUR_MS;
  const closeAt = dayStart + STORE_CONFIG.storeHours.closeHour * HOUR_MS;
  return ms >= openAt && ms < closeAt;
}

export function formatRupiah(amount: number): string {
  return 'Rp ' + Number(amount || 0).toLocaleString('id-ID');
}

export function formatItemPrice(item: CatalogItem): string {
  return `${formatRupiah(item.price)}${item.unit ? `/${item.unit}` : ''}`;
}

export function getItemFullName(section: CatalogSection, item: CatalogItem): string {
  return item.name || `${section.title} — ${item.label}`;
}

export function buildWhatsAppOrderUrl(params?: {
  categoryName?: string;
  sectionTitle?: string;
  item?: CatalogItem;
  orderGuide?: string[];
}): string {
  const base = `https://wa.me/${STORE_CONFIG.whatsappNumber}`;
  if (!params || (!params.item && !params.categoryName)) {
    const text = `Halo Admin *${STORE_CONFIG.storeName}*, saya mau tanya / order layanan di katalog web.`;
    return `${base}?text=${encodeURIComponent(text)}`;
  }

  const lines: string[] = [
    `Halo Admin *${STORE_CONFIG.storeName}*, saya mau order dari Katalog Website:`,
    ''
  ];

  if (params.categoryName) {
    lines.push(`• *Kategori:* ${params.categoryName}`);
  }
  if (params.sectionTitle) {
    lines.push(`• *Layanan:* ${params.sectionTitle}`);
  }
  if (params.item) {
    lines.push(`• *Paket:* ${params.item.label}`);
    lines.push(`• *Harga:* ${formatItemPrice(params.item)}`);
  }

  if (params.orderGuide && params.orderGuide.length > 0) {
    lines.push('');
    lines.push('*Data Pesanan:*');
    for (const g of params.orderGuide) {
      lines.push(`- ${g}: `);
    }
  }

  lines.push('');
  lines.push('Mohon info pembayaran QRIS-nya ya kak, terima kasih!');
  return `${base}?text=${encodeURIComponent(lines.join('\n'))}`;
}

// ==========================================
// KATALOG RESMI ZURA STORE (SINKRON 100% DENGAN bot zura/src/catalog.js)
// ==========================================
export const CATEGORIES: CatalogCategory[] = [
  {
    key: 'wuwa',
    type: 'joki',
    icon: '🌊',
    iconImage: '/assets/emojis/crown.png',
    name: 'Joki Wuthering Waves',
    title: 'Wuthering Waves Boosting',
    short: 'Farm Astrites · Rawat Akun · Explore 100% · Quest',
    tag: '100% handplay manual',
    tagline: '100% handplay manual · aman · bisa pantau progress',
    dbCategory: 'Joki Wuthering Waves',
    ticketType: 'order',
    buttonLabel: 'WUWA',
    menuNoun: 'layanan',
    orderGuide: ['Paket joki yang mau diambil', 'UID & server akun (data login dikirim pas admin minta)'],
    notes: [
      'tarif pasti, tanpa biaya tambahan',
      'estimasi waktu menyesuaikan konten & kondisi akun',
      '100% handplay manual, aman dari banned'
    ],
    sections: [
      {
        id: 'astrites',
        title: 'Farm Astrites',
        icon: '💠',
        iconImage: '/assets/emojis/gem.png',
        chip: '💠',
        productId: 'ZURA-WUWA-ASTRITES',
        productName: 'Wuthering Waves — Farm Astrites',
        note: 'wajib punya ladang astrites & event yang memadai',
        items: [
          { id: 'wuwa-astrites-1600', label: '1.600 Astrites', name: 'WuWa Farm 1.600 Astrites', price: 18000 },
          { id: 'wuwa-astrites-3200', label: '3.200 Astrites', name: 'WuWa Farm 3.200 Astrites', price: 35000 },
          { id: 'wuwa-astrites-4800', label: '4.800 Astrites', name: 'WuWa Farm 4.800 Astrites', price: 50000 }
        ]
      },
      {
        id: 'rawat',
        title: 'Rawat Akun',
        icon: '📅',
        iconImage: '/assets/emojis/alarm.png',
        chip: '📅',
        productId: 'ZURA-WUWA-RAWAT',
        productName: 'Wuthering Waves — Rawat Akun (15 & 30 Hari)',
        note: 'basic: daily + waveplate biru · standar: + weekly & endgame · premium: + event & holo',
        items: [
          { id: 'wuwa-rawat-15-basic', label: '15 Hari · Basic', name: 'WuWa Rawat Akun 15 Hari Basic', price: 20000, remindDays: 15 },
          { id: 'wuwa-rawat-15-standar', label: '15 Hari · Standar', name: 'WuWa Rawat Akun 15 Hari Standar', price: 30000, remindDays: 15 },
          { id: 'wuwa-rawat-15-premium', label: '15 Hari · Premium', name: 'WuWa Rawat Akun 15 Hari Premium', price: 45000, remindDays: 15 },
          { id: 'wuwa-rawat-30-basic', label: '30 Hari · Basic', name: 'WuWa Rawat Akun 30 Hari Basic', price: 40000, remindDays: 30 },
          { id: 'wuwa-rawat-30-standar', label: '30 Hari · Standar', name: 'WuWa Rawat Akun 30 Hari Standar', price: 60000, remindDays: 30 },
          { id: 'wuwa-rawat-30-premium', label: '30 Hari · Premium', name: 'WuWa Rawat Akun 30 Hari Premium', price: 90000, remindDays: 30 }
        ]
      },
      {
        id: 'explore',
        title: 'Exploration 100%',
        icon: '🗺️',
        iconImage: '/assets/emojis/chart.png',
        chip: '🗺️',
        productId: 'ZURA-WUWA-MAP',
        productName: 'Wuthering Waves — Exploration 100%',
        items: [
          { id: 'wuwa-explore-huanglong', label: 'Huanglong · 2–3 hari', name: 'WuWa Exploration Huanglong 100%', price: 160000 },
          { id: 'wuwa-explore-rinascita', label: 'Rinascita · 1–2 hari', name: 'WuWa Exploration Rinascita 100%', price: 115000 },
          { id: 'wuwa-explore-lahairoi', label: 'LahaiRoi · 3–4 hari', name: 'WuWa Exploration LahaiRoi 100%', price: 275000 },
          { id: 'wuwa-explore-mengzhou', label: 'Mengzhou · 1–2 hari', name: 'WuWa Exploration Mengzhou 100%', price: 115000 }
        ]
      },
      {
        id: 'quest',
        title: 'Joki Quest',
        icon: '📜',
        iconImage: '/assets/emojis/scroll.png',
        chip: '📜',
        productId: 'ZURA-WUWA-QUEST',
        productName: 'Wuthering Waves — Joki Quest',
        items: [
          { id: 'wuwa-quest-main', label: 'Main Story', name: 'WuWa Main Story Quest', price: 10000, unit: 'quest' },
          { id: 'wuwa-quest-explore', label: 'Exploration Quest', name: 'WuWa Exploration Quest', price: 7000, unit: 'quest' },
          { id: 'wuwa-quest-companion', label: 'Companion Story', name: 'WuWa Companion Story Quest', price: 7000, unit: 'quest' },
          { id: 'wuwa-quest-side', label: 'Side Quest', name: 'WuWa Side Quest', price: 2000, unit: 'quest' }
        ]
      }
    ]
  },
  {
    key: 'roblox',
    type: 'joki',
    icon: '🎮',
    iconImage: '/assets/emojis/anime_adventures.png',
    name: 'Joki Roblox',
    title: 'Roblox Boosting',
    short: 'Anime Adventures · Anime Vanguards',
    tag: 'joki game roblox',
    tagline: 'proses cepat, aman & bergaransi',
    dbCategory: 'Joki Roblox',
    ticketType: 'order',
    buttonLabel: 'ROBLOX',
    menuNoun: 'game',
    promoTitle: 'JOKI ROBLOX • ANIME ADVENTURES',
    promoMessage: 'Males grinding? Biar kita yang kerjain, mulai {min} aja!',
    orderGuide: ['Nama layanan yang mau diambil', 'Username Roblox kamu', 'Notes (kalau ada)'],
    notes: ['proses cepat, aman, dan bergaransi', 'format order: Nama Layanan / Username / Notes'],
    groups: [
      {
        id: 'anime-adventures',
        title: 'Anime Adventures',
        icon: '🗡️',
        iconImage: '/assets/emojis/anime_adventures.png',
        subtitle: 'Gems · Leveling · Story · Carry · Infinity Castle · Summer · April Fools · Dungeon · Evolve · Relics',
        highlights: [
          { id: 'aa-gems-1k' },
          { id: 'aa-gems-10k', badge: '🔥' },
          { id: 'aa-story-chapter', label: 'Story 1 Chapter' },
          { id: 'aa-carry-raid', label: 'Carry Raid' },
          { id: 'aa-afk-day', label: '1 Day AFK' },
          { id: 'aa-infinity-100', label: 'Infinity Floor 1 - 100' },
          { id: 'aa-summer-any', label: 'Summer Unit Banner' },
          { id: 'aa-summer-marco', label: 'Unit Marco' },
          { id: 'aa-summer-megumin', label: 'Unit Megumin' },
          { id: 'aa-summer-enel', label: 'Unit Enel' }
        ]
      },
      {
        id: 'anime-vanguards',
        title: 'Anime Vanguards',
        icon: '🛡️',
        iconImage: '/assets/emojis/trophy.png',
        subtitle: 'Pricelist sedang disiapkan — bisa tanya/request langsung ke Admin'
      }
    ],
    sections: [
      {
        id: 'aa-gems',
        group: 'anime-adventures',
        title: 'Gems',
        icon: '💎',
        iconImage: '/assets/emojis/gem.png',
        productId: 'ZURA-ROBLOX-AA',
        productName: 'Roblox — Anime Adventures',
        items: [
          { id: 'aa-gems-1k', label: '1K Gems', name: 'Anime Adventures 1K Gems', price: 6000 },
          { id: 'aa-gems-10k', label: '10K Gems', name: 'Anime Adventures 10K Gems', price: 38000, badge: '🔥' }
        ]
      },
      {
        id: 'aa-leveling',
        group: 'anime-adventures',
        title: 'Paket Leveling',
        icon: '📈',
        iconImage: '/assets/emojis/chart.png',
        productId: 'ZURA-ROBLOX-AA',
        productName: 'Roblox — Anime Adventures',
        items: [
          { id: 'aa-level-1-10', label: 'Level 1 - 10', name: 'Anime Adventures Level 1 - 10', price: 25000 },
          { id: 'aa-level-1-20', label: 'Level 1 - 20', name: 'Anime Adventures Level 1 - 20', price: 48000 },
          { id: 'aa-level-1-30', label: 'Level 1 - 30', name: 'Anime Adventures Level 1 - 30', price: 60000 },
          { id: 'aa-level-1-40', label: 'Level 1 - 40', name: 'Anime Adventures Level 1 - 40', price: 72000 },
          { id: 'aa-level-1-50', label: 'Level 1 - 50', name: 'Anime Adventures Level 1 - 50', price: 95000 },
          { id: 'aa-level-eceran', label: 'Eceran / Per Level', name: 'Anime Adventures Leveling Eceran', price: 3000, unit: 'level' }
        ]
      },
      {
        id: 'aa-story',
        group: 'anime-adventures',
        title: 'Story Quest',
        icon: '📖',
        iconImage: '/assets/emojis/book.png',
        productId: 'ZURA-ROBLOX-AA',
        productName: 'Roblox — Anime Adventures',
        items: [
          { id: 'aa-story-act', label: '1 Act / Stage', name: 'Anime Adventures Story Quest Act / Stage', price: 1000, unit: 'act' },
          { id: 'aa-story-chapter', label: '1 Chapter', name: 'Anime Adventures Story Quest Chapter', price: 3500, unit: 'chapter' }
        ]
      },
      {
        id: 'aa-carry',
        group: 'anime-adventures',
        title: 'Carry Service',
        icon: '⚔️',
        iconImage: '/assets/emojis/trophy.png',
        productId: 'ZURA-ROBLOX-AA',
        productName: 'Roblox — Anime Adventures',
        items: [
          { id: 'aa-carry-challenge', label: '5x Challenges', name: 'Anime Adventures Carry 5x Challenges', price: 12000 },
          { id: 'aa-carry-legend', label: 'Legend Stage', name: 'Anime Adventures Carry Legend Stage', price: 5000 },
          { id: 'aa-carry-raid', label: 'Raid', name: 'Anime Adventures Carry Raid', price: 5000 }
        ]
      },
      {
        id: 'aa-infinity',
        group: 'anime-adventures',
        title: 'Infinity Castle',
        icon: '🏰',
        iconImage: '/assets/emojis/crown.png',
        productId: 'ZURA-ROBLOX-AA',
        productName: 'Roblox — Anime Adventures',
        items: [{ id: 'aa-infinity-100', label: 'Floor 1 - 100', name: 'Anime Adventures Infinity Castle Floor 1 - 100', price: 78000 }]
      },
      {
        id: 'aa-summer',
        group: 'anime-adventures',
        title: 'Summer Update & Special',
        icon: '☀️',
        iconImage: '/assets/emojis/promo.png',
        productId: 'ZURA-ROBLOX-AA',
        productName: 'Roblox — Anime Adventures',
        items: [
          { id: 'aa-summer-marco', label: 'Marco', name: 'Anime Adventures Summer Marco', price: 140000 },
          { id: 'aa-summer-megumin', label: 'Megumin', name: 'Anime Adventures Summer Megumin', price: 180000 },
          { id: 'aa-summer-enel', label: 'Enel', name: 'Anime Adventures Summer Enel', price: 240000 },
          { id: 'aa-farm-1-bulan', label: 'Paket Farm 1 Bulan', name: 'Anime Adventures Paket Farm 1 Bulan', price: 320000, remindDays: 30 },
          { id: 'aa-afk-day', label: '1 Day AFK', name: 'Anime Adventures Day AFK', price: 40000, unit: 'hari' },
          { id: 'aa-summer-any', label: 'Any Summer Unit Banner', name: 'Anime Adventures Any Summer Unit Banner', price: 20000 },
          { id: 'aa-summer-evo', label: 'Evo Summer Unit Banner', name: 'Anime Adventures Evo Summer Unit Banner', price: 20000 }
        ]
      },
      {
        id: 'aa-april',
        group: 'anime-adventures',
        title: 'April Fools',
        icon: '🃏',
        iconImage: '/assets/emojis/gift.png',
        productId: 'ZURA-ROBLOX-AA',
        productName: 'Roblox — Anime Adventures',
        items: [
          { id: 'aa-april-chihiro', label: 'Chihiro', name: 'Anime Adventures April Fools Chihiro', price: 55000 },
          { id: 'aa-april-random', label: 'Random Banner Unit', name: 'Anime Adventures April Fools Random Banner Unit', price: 15000 },
          { id: 'aa-april-selected', label: 'Selected Banner Unit', name: 'Anime Adventures April Fools Selected Banner Unit', price: 26000 },
          { id: 'aa-april-evo', label: 'Evo April Fools Unit', name: 'Anime Adventures Evo April Fools Unit', price: 15000 }
        ]
      },
      {
        id: 'aa-dungeon',
        group: 'anime-adventures',
        title: 'Dungeon',
        icon: '🗝️',
        iconImage: '/assets/emojis/lock.png',
        productId: 'ZURA-ROBLOX-AA',
        productName: 'Roblox — Anime Adventures',
        items: [
          { id: 'aa-dungeon-run', label: 'Per Run', name: 'Anime Adventures Dungeon Per Run', price: 5000, unit: 'run' },
          { id: 'aa-dungeon-rukia', label: 'Rukia', name: 'Anime Adventures Dungeon Rukia', price: 145000 }
        ]
      },
      {
        id: 'aa-evolve',
        group: 'anime-adventures',
        title: 'Evolve & Get Unit',
        icon: '🧬',
        iconImage: '/assets/emojis/sparkles.png',
        productId: 'ZURA-ROBLOX-AA',
        productName: 'Roblox — Anime Adventures',
        items: [
          { id: 'aa-unit-alien', label: 'Unit Alien', name: 'Anime Adventures Unit Alien', price: 48000 },
          { id: 'aa-unit-fabled', label: 'Unit Fabled', name: 'Anime Adventures Unit Fabled', price: 48000 },
          { id: 'aa-unit-hero', label: 'Unit Hero', name: 'Anime Adventures Unit Hero', price: 48000 },
          { id: 'aa-unit-puppet', label: 'Unit Puppet', name: 'Anime Adventures Unit Puppet', price: 60000 },
          { id: 'aa-unit-virtual', label: 'Unit Virtual', name: 'Anime Adventures Unit Virtual', price: 60000 },
          { id: 'aa-unit-windhym', label: 'Unit Windhym', name: 'Anime Adventures Unit Windhym', price: 72000 },
          { id: 'aa-unit-undead-tomb', label: 'Undead Tomb', name: 'Anime Adventures Undead Tomb', price: 72000 },
          { id: 'aa-evo-raid', label: 'Evo Unit Raid', name: 'Anime Adventures Evo Unit Raid', price: 60000 },
          { id: 'aa-evo-griffin-pride', label: 'Evo Unit Griffin / Pride', name: 'Anime Adventures Evo Unit Griffin / Pride', price: 82000 },
          { id: 'aa-get-anz', label: 'Get Anz (Req 3 Overlord)', name: 'Anime Adventures Get Anz (Req 3 Overlord)', price: 175000 }
        ]
      },
      {
        id: 'aa-relics',
        group: 'anime-adventures',
        title: 'Relics & Items',
        icon: '✨',
        iconImage: '/assets/emojis/sparkles.png',
        productId: 'ZURA-ROBLOX-AA',
        productName: 'Roblox — Anime Adventures',
        items: [
          { id: 'aa-relic-timepiece', label: 'Miracle Timepiece', name: 'Anime Adventures Miracle Timepiece', price: 48000 },
          { id: 'aa-relic-mermaid-crown', label: 'Mermaid Crown', name: 'Anime Adventures Mermaid Crown', price: 60000 },
          { id: 'aa-relic-5-leaf-clover', label: '5 Leaf Clover', name: 'Anime Adventures 5 Leaf Clover', price: 60000 },
          { id: 'aa-relic-clover-wind', label: 'Clover of The Wind', name: 'Anime Adventures Clover of The Wind', price: 60000 },
          { id: 'aa-relic-mangekyo', label: 'Mangekyo Eye', name: 'Anime Adventures Mangekyo Eye', price: 48000 },
          { id: 'aa-relic-lostvayne', label: 'Lostvayne', name: 'Anime Adventures Lostvayne', price: 48000 }
        ]
      }
    ]
  },
  {
    key: 'apps',
    type: 'produk',
    icon: '📱',
    iconImage: '/assets/emojis/bags.png',
    name: 'Aplikasi Premium',
    title: 'Premium Apps',
    short: 'Netflix · Gacha Netflix · Gacha Disney+ · CapCut · Canva · YouTube · Spotify · Duolingo · Adobe · iLovePDF',
    tag: 'private akun & apk asli',
    tagline: 'private akun · apk resmi · tersedia paket bergaransi & gacha hemat',
    dbCategory: 'Aplikasi Premium',
    ticketType: 'order',
    buttonLabel: 'APLIKASI PREMIUM',
    menuNoun: 'aplikasi',
    orderGuide: ['Aplikasi + durasi yang mau dibeli', 'Email kamu (buat yang via invite)'],
    notes: [
      'tidak jual sharing (semua private akun, kecuali paket Gacha sesuai ketentuan gacha)',
      'tidak jual crack/mod apk (semua apk resmi)'
    ],
    sections: [
      {
        id: 'netflix',
        title: 'Netflix Ultra HD 4K',
        icon: '🍿',
        chip: '⏳',
        via: '1P1U',
        productId: 'ZURA-NETFLIX',
        productName: 'Netflix Ultra HD 4K (Private 1P1U)',
        note: '1 profil 1 user + pin private · garansi 14 hari',
        items: [{ id: 'netflix-1-bulan', label: '1 Bulan', name: 'Netflix Ultra HD 4K 1P1U 1 Bulan', price: 40000, remindDays: 30 }]
      },
      {
        id: 'netflix-gacha',
        title: 'Gacha Netflix',
        icon: '🎲',
        chip: '🎲',
        via: 'UHD 4K · No Garansi',
        productId: 'ZURA-NETFLIX-GACHA',
        productName: 'Gacha Netflix — Premium (UHD 4K)',
        note: 'durasi gacha 6 jam – 7 hari (rata-rata habis di 1 hari) · no garansi',
        notesList: [
          'Garansi : No garansi',
          'Durasi : 6 jam – 7 hari (rata-rata habis di 1 hari)',
          'Login via Chrome (Mobile & Desktop)',
          'Nonton di Aplikasi (Mobile) & Chrome (Desktop)'
        ],
        advantages: [
          'Support : Mobile & Desktop',
          'Easy to login & use, tidak butuh VPN, anti hold, anti ads'
        ],
        items: [
          {
            id: 'netflix-gacha-uhd-4k',
            label: 'Premium (UHD 4K)',
            name: 'Gacha Netflix Premium (UHD 4K)',
            price: 5000,
            badge: '🔥',
            aliases: ['gacha', 'ghaca', 'netflix gacha', 'netflix ghaca', 'uhd 4k', '4k', '5k', '5000']
          }
        ]
      },
      {
        id: 'disney-gacha',
        title: 'Gacha Disney+',
        icon: '✨',
        chip: '🎲',
        via: 'Random · No Garansi',
        productId: 'ZURA-DISNEY-GACHA',
        productName: 'Gacha Disney+ — Standard / Premium (Random)',
        note: 'durasi gacha 1 hari – 31 hari (tertinggi di 17 hari) · no garansi',
        notesList: [
          'Garansi : No garansi',
          'Durasi : 1 hari – 31 hari (tertinggi di 17 hari)',
          'Login via Aplikasi (Mobile), Chrome (Mobile & Desktop)',
          'Nonton sesuai tempat login'
        ],
        advantages: [
          'Jauh lebih awet daripada Netflix',
          'Support : Mobile & Desktop',
          'Easy to login & use, tidak butuh VPN, anti hold, anti ads, bebas limit perangkat'
        ],
        items: [
          {
            id: 'disney-gacha-random',
            label: 'Standard / Premium (Random)',
            name: 'Gacha Disney+ Standard/Premium (Random)',
            price: 6000,
            badge: '🔥',
            aliases: ['disney', 'disney+', 'disney plus', 'gacha disney', 'ghaca disney', '6k', '6000']
          }
        ]
      },
      {
        id: 'spotify',
        title: 'Spotify Premium',
        icon: '🎧',
        chip: '⏳',
        via: 'individual',
        productId: 'ZURA-SPOTIFY',
        productName: 'Spotify Premium Individual (1 Bulan)',
        note: 'private akun dari seller · full garansi 1 bulan',
        items: [{ id: 'spotify-1-bulan', label: '1 Bulan', name: 'Spotify Premium Individual 1 Bulan', price: 25000, remindDays: 30 }]
      },
      {
        id: 'youtube',
        title: 'YouTube + Music Premium',
        icon: '▶️',
        chip: '⏳',
        via: 'via invite',
        productId: 'ZURA-YOUTUBE',
        productName: 'YouTube + Music Premium (1 Bulan)',
        note: 'cuma butuh email kamu · full garansi 1 bulan',
        items: [{ id: 'youtube-1-bulan', label: '1 Bulan', name: 'YouTube + Music Premium 1 Bulan', price: 20000, remindDays: 30 }]
      },
      {
        id: 'canva',
        title: 'Canva Edu',
        icon: '🎨',
        chip: '📌',
        via: 'via invite',
        productId: 'ZURA-CANVA',
        productName: 'Canva Edu Lifetime',
        note: 'cuma butuh email kamu · garansi 6 bulan',
        items: [{ id: 'canva-lifetime', label: 'Lifetime', name: 'Canva Edu Lifetime', price: 12000 }]
      },
      {
        id: 'capcut',
        title: 'CapCut Pro',
        icon: '🎬',
        iconImage: '/assets/emojis/capcut.png',
        chip: '⏳',
        via: 'akun seller',
        productId: 'ZURA-CAPCUT',
        productName: 'CapCut Pro (Private Account)',
        note: 'private akun dari seller · full garansi sesuai durasi',
        items: [
          { id: 'capcut-4-7-hari', label: '4–7 Hari', name: 'CapCut Pro 4–7 Hari', price: 9000, remindDays: 4, aliases: ['1 minggu', '7 hari'] },
          { id: 'capcut-1-bulan', label: '26–31 Hari', name: 'CapCut Pro 26–31 Hari', price: 35000, remindDays: 26, aliases: ['1 bulan', '30 hari'] },
          { id: 'capcut-6-bulan', label: '6–7 Bulan', name: 'CapCut Pro 6–7 Bulan', price: 250000, badge: '🔥', remindDays: 180, aliases: ['6 bulan', '7 bulan'] }
        ]
      },
      {
        id: 'adobe',
        title: 'Adobe Express Premium',
        icon: '🖌️',
        chip: '⏳',
        productId: 'ZURA-ADOBE-DUO-PDF',
        productName: 'Adobe Express / Duolingo Super / iLovePDF (1 Tahun)',
        note: 'private akun / redeem resmi · garansi 6 bulan',
        items: [{ id: 'adobe-1-tahun', label: '1 Tahun', name: 'Adobe Express Premium 1 Tahun', price: 50000, remindDays: 365 }]
      },
      {
        id: 'duolingo',
        title: 'Duolingo Super',
        icon: '🦉',
        iconImage: '/assets/emojis/duolingo.png',
        chip: '⏳',
        via: 'kode redeem',
        productId: 'ZURA-ADOBE-DUO-PDF',
        productName: 'Adobe Express / Duolingo Super / iLovePDF (1 Tahun)',
        note: 'redeem resmi · garansi 6 bulan',
        items: [{ id: 'duolingo-1-tahun', label: '1 Tahun', name: 'Duolingo Super 1 Tahun', price: 50000, remindDays: 365 }]
      },
      {
        id: 'ilovepdf',
        title: 'iLovePDF Premium',
        icon: '📄',
        iconImage: '/assets/emojis/ilovepdf.png',
        chip: '⏳',
        via: 'private akun',
        productId: 'ZURA-ADOBE-DUO-PDF',
        productName: 'Adobe Express / Duolingo Super / iLovePDF (1 Tahun)',
        note: 'private akun · garansi 6 bulan',
        items: [{ id: 'ilovepdf-1-tahun', label: '1 Tahun', name: 'iLovePDF Premium 1 Tahun', price: 50000, remindDays: 365 }]
      }
    ]
  },
  {
    key: 'discord',
    type: 'produk',
    icon: '💬',
    iconImage: '/assets/emojis/idcard.png',
    name: 'Kebutuhan Discord',
    title: 'Discord Services',
    short: 'Acc Old 2017–2020 · Server Boost 1 & 3 bulan',
    tag: 'acc old & server boost',
    tagline: 'acc old polosan full akses · boost via link invite',
    dbCategory: 'Kebutuhan Discord',
    ticketType: 'order',
    buttonLabel: 'DISCORD',
    menuNoun: 'layanan',
    orderGuide: ['Acc Old: tahun akun + 1 email kosong', 'Boost: jumlah boost + link invite (text channel, never expire)'],
    notes: [
      'boost: no garansi',
      'server jangan "apply to join" selama boost diproses',
      'link invite ke text channel & set never expire',
      'matiin bot anti-raid/security yang auto-kick akun baru',
      'kasih tau staff servermu jangan kick akun booster'
    ],
    sections: [
      {
        id: 'acc-old',
        title: 'Acc Discord Old',
        icon: '👤',
        iconImage: '/assets/emojis/idcard.png',
        chip: '👤',
        via: 'polosan · full akses',
        productId: 'ZURA-DISCORD-AGED',
        productName: 'Acc Discord Old (Berdasarkan Tahun 2017–2020)',
        note: 'siapin 1 email kosong · garansi login pertama',
        items: [
          { id: 'discord-acc-2020', label: 'Akun 2020', name: 'Acc Discord Old 2020', price: 40000 },
          { id: 'discord-acc-2019', label: 'Akun 2019', name: 'Acc Discord Old 2019', price: 50000 },
          { id: 'discord-acc-2018', label: 'Akun 2018', name: 'Acc Discord Old 2018', price: 60000 },
          { id: 'discord-acc-2017', label: 'Akun 2017', name: 'Acc Discord Old 2017', price: 80000 }
        ]
      },
      {
        id: 'boost-1',
        title: 'Server Boost 1 Bulan',
        icon: '🚀',
        iconImage: '/assets/emojis/sparkles.png',
        chip: '🚀',
        via: '25–31 hari · via link invite',
        productId: 'ZURA-DISCORD-BOOST',
        productName: 'Discord Server Boost (Via Link Invite — 25–31 Hari)',
        items: [
          { id: 'boost-1b-2x', label: '2x Boost (25–31 Hari)', name: '2x Server Boost 25–31 Hari', price: 15000, remindDays: 25 },
          { id: 'boost-1b-8x', label: '8x Boost · Level 2 (25–31 Hari)', name: '8x Server Boost 25–31 Hari', price: 48000, remindDays: 25 },
          { id: 'boost-1b-14x', label: '14x Boost · Level 3 (25–31 Hari)', name: '14x Server Boost 25–31 Hari', price: 80000, badge: '🔥', remindDays: 25 },
          { id: 'boost-1b-20x', label: '20x Boost (25–31 Hari)', name: '20x Server Boost 25–31 Hari', price: 115000, remindDays: 25 }
        ]
      },
      {
        id: 'boost-3',
        title: 'Server Boost 3 Bulan',
        icon: '🚀',
        iconImage: '/assets/emojis/crown.png',
        chip: '🚀',
        via: '80–91 hari · via link invite',
        productId: 'ZURA-DISCORD-BOOST',
        productName: 'Discord Server Boost (Via Link Invite — 80–91 Hari)',
        items: [
          { id: 'boost-3b-2x', label: '2x Boost (80–91 Hari)', name: '2x Server Boost 80–91 Hari', price: 28000, remindDays: 80 },
          { id: 'boost-3b-8x', label: '8x Boost · Level 2 (80–91 Hari)', name: '8x Server Boost 80–91 Hari', price: 90000, remindDays: 80 },
          { id: 'boost-3b-14x', label: '14x Boost · Level 3 (80–91 Hari)', name: '14x Server Boost 80–91 Hari', price: 150000, badge: '🔥', remindDays: 80 },
          { id: 'boost-3b-28x', label: '28x Boost (80–91 Hari)', name: '28x Server Boost 80–91 Hari', price: 285000, remindDays: 80 },
          { id: 'boost-3b-30x', label: '30x Boost (80–91 Hari)', name: '30x Server Boost 80–91 Hari', price: 305000, remindDays: 80 }
        ]
      }
    ]
  },
  {
    key: 'mm',
    type: 'produk',
    icon: '🤝',
    iconImage: '/assets/emojis/handshake.png',
    name: 'Jasa Middleman',
    title: 'Middleman Service',
    short: 'Perantara jual-beli aman bareng owner',
    tag: 'rekber resmi',
    tagline: 'rekber resmi, aman & transparan bareng owner',
    dbCategory: 'Middleman / Rekber',
    ticketType: 'mm',
    buttonLabel: 'MIDDLEMAN',
    menuNoun: 'layanan',
    priceWord: 'fee mulai',
    orderGuide: [
      'Penjual & Pembeli (Username Discord / WA)',
      'Nominal Transaksi & Barang / Akun',
      'Fee (INC / EX) & Metode Pencairan'
    ],
    notes: [
      'dana ditahan admin sampai penjual & pembeli konfirmasi selesai',
      'transaksi cuma di ruang ticket bareng owner'
    ],
    sections: [
      {
        id: 'fee',
        title: 'Fee Rekber Resmi',
        icon: '💰',
        iconImage: '/assets/emojis/handshake.png',
        chip: '💰',
        productId: 'ZURA-MM',
        productName: 'Jasa Middleman (MM / Rekber Resmi Zura Store)',
        orderable: false,
        items: [
          { id: 'mm-fee-1', label: 'Transaksi Rp 10rb – 49rb', name: 'Fee Rekber Rp 10rb – 49rb', price: 3000 },
          { id: 'mm-fee-2', label: 'Transaksi Rp 50rb – 99rb', name: 'Fee Rekber Rp 50rb – 99rb', price: 5000 },
          { id: 'mm-fee-3', label: 'Transaksi Rp 100rb – 499rb', name: 'Fee Rekber Rp 100rb – 499rb', price: 10000 },
          { id: 'mm-fee-4', label: 'Transaksi Rp 500rb – 999rb', name: 'Fee Rekber Rp 500rb – 999rb', price: 15000 },
          { id: 'mm-fee-5', label: 'Transaksi Rp 1jt ke atas', name: 'Fee Rekber Rp 1jt ke atas', price: 25000 }
        ]
      }
    ]
  }
];

export function getCategory(key: string): CatalogCategory | null {
  const k = String(key || '').toLowerCase();
  const aliases: Record<string, string> = {
    other: 'mm',
    middleman: 'mm',
    rekber: 'mm',
    boost: 'discord',
    app: 'apps',
    aplikasi: 'apps',
    joki: 'wuwa'
  };
  return CATEGORIES.find(c => c.key === (aliases[k] || k)) || null;
}

export function getCategoryMinPrice(category: CatalogCategory): number {
  const allPrices = category.sections.flatMap(s => s.items.map(i => i.price));
  return allPrices.length ? Math.min(...allPrices) : 0;
}

export function getSectionMinPrice(section: CatalogSection): number {
  const prices = section.items.map(i => i.price);
  return prices.length ? Math.min(...prices) : 0;
}

export function getCategoryItemCount(category: CatalogCategory): number {
  return category.sections.reduce((acc, s) => acc + s.items.length, 0);
}

export interface TestimonialItem {
  id: string;
  customerName: string;
  serviceCategory: 'Joki Wuthering Waves' | 'Joki & Trade Roblox' | 'Transaksi Discord' | 'Jasa Middleman (MM)';
  filterGroup: 'wuwa' | 'roblox' | 'discord' | 'mm';
  date: string;
  amount: string;
  quote: string;
  description: string;
  screenshotUrl: string;
  rating: number;
  orderCode: string;
}

export const TESTIMONIAL_STATS = {
  totalDiscordTx: 167,
  averageRating: '5.0 / 5.0',
  discordTestiChannelUrl: 'https://discord.gg/kTqNnYUsmB'
};

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'wa-wuwa-1',
    customerName: 'Febri Ananda',
    serviceCategory: 'Joki Wuthering Waves',
    filterGroup: 'wuwa',
    date: '20 Agu 2026',
    amount: 'Rp 30.000',
    quote: 'Jokian 1.600 Astrites beres cepat & aman!',
    description: 'Order: 1.600 Astrites. Pembayaran diterima Rp 30.000 ke Kazura Store.',
    screenshotUrl: '/testimonials/wuwa/Group 1.png',
    rating: 5,
    orderCode: 'ZURA-WW-01'
  },
  {
    id: 'wa-wuwa-2',
    customerName: 'Rakha Ibnu Shoji',
    serviceCategory: 'Joki Wuthering Waves',
    filterGroup: 'wuwa',
    date: '23 Agu 2026',
    amount: 'Rp 50.000',
    quote: 'mantap thank you min 😁',
    description: 'Order: 5.200 Astrites (Waktu pengerjaan: 9 jam). Transfer Rp 50.000 ke Kazura Store.',
    screenshotUrl: '/testimonials/wuwa/Group 2.png',
    rating: 5,
    orderCode: 'ZURA-WW-02'
  },
  {
    id: 'wa-wuwa-3',
    customerName: 'Customer WuWa (Mandiri / GoPay)',
    serviceCategory: 'Joki Wuthering Waves',
    filterGroup: 'wuwa',
    date: '25 Agu 2026',
    amount: 'Rp 75.000',
    quote: 'terimakasih banyak min, next kalo joki disini lagi deh 😆👍',
    description: 'Order: 8.000 Astrites selesai 100% handplay. Pembayaran Rp 75.000 sukses.',
    screenshotUrl: '/testimonials/wuwa/Group 3.png',
    rating: 5,
    orderCode: 'ZURA-WW-03'
  },
  {
    id: 'wa-wuwa-4',
    customerName: 'M Muhammad Nabil',
    serviceCategory: 'Joki Wuthering Waves',
    filterGroup: 'wuwa',
    date: '27 Agu 2026',
    amount: 'Rp 145.000',
    quote: 'Walah cepet bat min, Makasih min',
    description: 'Order: 12.000 Astrites selesai! Pembayaran SeaBank Rp 145.000 ke Kazura Store.',
    screenshotUrl: '/testimonials/wuwa/Group 4.png',
    rating: 5,
    orderCode: 'ZURA-WW-04'
  },
  {
    id: 'wa-wuwa-5',
    customerName: 'Customer WuWa (QRIS)',
    serviceCategory: 'Joki Wuthering Waves',
    filterGroup: 'wuwa',
    date: '29 Agu 2026',
    amount: 'Rp 13.000',
    quote: '🙏😭 thanks bangg',
    description: 'Order: Joki Quest Beneath a Melting Sky. Pembayaran QRIS Rp 13.000 berhasil ke Kazura Store.',
    screenshotUrl: '/testimonials/wuwa/Group 5.png',
    rating: 5,
    orderCode: 'ZURA-WW-05'
  },
  {
    id: 'wa-wuwa-6',
    customerName: 'Muhammad Nabil (obscurant)',
    serviceCategory: 'Joki Wuthering Waves',
    filterGroup: 'wuwa',
    date: '27 Okt 2026',
    amount: 'Rp 55.000',
    quote: 'mantap min',
    description: 'Order: 3 Companion Quest + 5 Explore Quest + 2 Side Quest (+ Bonus 2 Side Quest & 1 Tutorial).',
    screenshotUrl: '/testimonials/wuwa/Group 2.png',
    rating: 5,
    orderCode: 'ZURA-WW-261027'
  },
  {
    id: 'wa-rblx-1',
    customerName: 'Ndu Joji',
    serviceCategory: 'Joki & Trade Roblox',
    filterGroup: 'roblox',
    date: '07 Agu 2026',
    amount: 'Rp 500.000',
    quote: 'ok ty mas sukses terus ya 👍',
    description: 'Order Pet Orangutan Roblox 2.81 KG selesai via Private Server. Transfer BCA ke DANA Kazura Rp 500.000.',
    screenshotUrl: '/testimonials/roblox/image.webp',
    rating: 5,
    orderCode: 'ZURA-RBLX-01'
  },
  {
    id: 'wa-rblx-2',
    customerName: 'chiwaprikitiw',
    serviceCategory: 'Joki & Trade Roblox',
    filterGroup: 'roblox',
    date: '11 Agu 2026',
    amount: 'Rp 250.000',
    quote: 'thx kak 👍',
    description: 'Gift Pet Aromatic Kitsune [7.31 KG] selesai. Pembayaran QRIS DANA Rp 250.000 ke Kazura Store.',
    screenshotUrl: '/testimonials/roblox/image (1).webp',
    rating: 5,
    orderCode: 'ZURA-RBLX-02'
  },
  {
    id: 'wa-rblx-4',
    customerName: 'SHADOWBREAK (Sage L)',
    serviceCategory: 'Jasa Middleman (MM)',
    filterGroup: 'mm',
    date: '21 Jun 2026',
    amount: 'Rp 210.000',
    quote: 'Sudah ya terima kasih telah menggunakan jasa midman saya',
    description: 'Transaksi aman Jasa Middleman / Rekber Resmi Kazura Store selesai via BCA QRIS Rp 210.000.',
    screenshotUrl: '/testimonials/roblox/image (3).webp',
    rating: 5,
    orderCode: 'ZURA-MM-01'
  },
  {
    id: 'wa-rblx-5',
    customerName: 'Din4Nduu (ndusophie)',
    serviceCategory: 'Joki & Trade Roblox',
    filterGroup: 'roblox',
    date: '07 Agu 2026',
    amount: 'Rp 200.000',
    quote: 'Makasih banyak kak',
    description: 'Trade Roblox Farm Pet selesai. Transfer m-BCA ke DANA Kazura Rp 200.000.',
    screenshotUrl: '/testimonials/roblox/image (4).webp',
    rating: 5,
    orderCode: 'ZURA-RBLX-03'
  },
  {
    id: 'wa-rblx-9',
    customerName: 'Rendy Ardiansyah (rndyardh)',
    serviceCategory: 'Joki & Trade Roblox',
    filterGroup: 'roblox',
    date: '08 Agu 2026',
    amount: 'Rp 190.000',
    quote: 'sama sama',
    description: 'Gift Pet Kitsune [2.77 KG] Age 1 selesai via PS. Pembayaran BRImo QRIS Rp 190.000 berhasil.',
    screenshotUrl: '/testimonials/roblox/image (8).webp',
    rating: 5,
    orderCode: 'ZURA-RBLX-05'
  },
  {
    id: 'wa-rblx-6',
    customerName: 'Muh. Sakir (Buyer 14)',
    serviceCategory: 'Transaksi Discord',
    filterGroup: 'discord',
    date: '29 Mar 2026',
    amount: 'Rp 195.000',
    quote: 'Done ya, makasih',
    description: 'Order Transaksi Discord selesai. Pembayaran SeaBank QRIS Rp 195.000 ke Kazura Store.',
    screenshotUrl: '/testimonials/roblox/image (5).webp',
    rating: 5,
    orderCode: 'ZURA-DSC-01'
  },
  {
    id: 'wa-rblx-7',
    customerName: 'Buyer 14 (Batch 2)',
    serviceCategory: 'Transaksi Discord',
    filterGroup: 'discord',
    date: '31 Mar 2026',
    amount: 'Rp 195.000',
    quote: 'Done ya, makasih',
    description: 'Order Transaksi Discord Batch 2 selesai. Pembayaran QRIS DANA SmartPay Rp 195.000 sukses.',
    screenshotUrl: '/testimonials/roblox/image (6).webp',
    rating: 5,
    orderCode: 'ZURA-DSC-02'
  },
  {
    id: 'wa-rblx-3',
    customerName: 'zayelle',
    serviceCategory: 'Joki & Trade Roblox',
    filterGroup: 'roblox',
    date: '30 Mar 2026',
    amount: 'Rp 235.000',
    quote: 'okee dahh masukk',
    description: 'Order Membership & Diamond selesai cepat. Pembayaran QR Rp 235.000 berhasil.',
    screenshotUrl: '/testimonials/roblox/image (2).webp',
    rating: 5,
    orderCode: 'ZURA-TOPUP-01'
  },
  {
    id: 'wa-rblx-8',
    customerName: 'Din4Nduu (Batch 2)',
    serviceCategory: 'Joki & Trade Roblox',
    filterGroup: 'roblox',
    date: '07 Agu 2026',
    amount: 'Rp 200.000',
    quote: 'Makasih banyak kak',
    description: 'm-Transfer BCA Berhasil Rp 200.000 ke Kazura Store (DANA).',
    screenshotUrl: '/testimonials/roblox/image (7).webp',
    rating: 5,
    orderCode: 'ZURA-RBLX-04'
  },
  {
    id: 'wa-rblx-10',
    customerName: 'Muh. Sakir (Batch SeaBank)',
    serviceCategory: 'Transaksi Discord',
    filterGroup: 'discord',
    date: '29 Mar 2026',
    amount: 'Rp 195.000',
    quote: 'Done ya, makasih',
    description: 'Transaksi SeaBank QRIS Rp 195.000 Terverifikasi Resmi ke Kazura Store.',
    screenshotUrl: '/testimonials/roblox/image (9).webp',
    rating: 5,
    orderCode: 'ZURA-DSC-03'
  },
  {
    id: 'wa-rblx-11',
    customerName: 'Buyer 14 (Batch QRIS DANA)',
    serviceCategory: 'Transaksi Discord',
    filterGroup: 'discord',
    date: '31 Mar 2026',
    amount: 'Rp 195.000',
    quote: 'Done ya, makasih',
    description: 'Transaksi QRIS DANA SmartPay Rp 195.000 Terverifikasi Resmi ke Kazura Store.',
    screenshotUrl: '/testimonials/roblox/image (10).webp',
    rating: 5,
    orderCode: 'ZURA-DSC-04'
  }
];
