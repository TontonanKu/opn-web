import { GameService, PremiumApp, ProjectPortfolio, WhatsAppTestimonial, Order } from '../types';

export const ADMIN_CONFIG = {
  name: "zura-w",
  whatsappNumber: "6282172795156", // Nomor WhatsApp resmi zura-w.my.id
  email: "zuraw.official@gmail.com",
  domain: "zura-w.my.id",
  qrisImageUrl: "/qris.png", // QRIS Resmi KAZURA STORE (NMID: ID1025393427014)
  qrisNmid: "ID1025393427014",
  qrisMerchant: "KAZURA STORE",
  bankDetails: [
    { bank: "QRIS All Payment", accountNumber: "NMID: ID1025393427014", accountHolder: "KAZURA STORE (Semua Bank & E-Wallet)" },
    { bank: "DANA & GoPay", accountNumber: "0821-7279-5156", accountHolder: "082172795156" }
  ],
  offlineMessage: "Admin saat ini sedang offline/istirahat. Silakan lanjut checkout atau langsung chat ke WhatsApp!",
  maxWaitMinutes: 10,
  telegramConfig: {
    botToken: "8695094239:AAGNUFJ65mx9W4u1JhBE_ONDa6J_l1ojCZs",
    chatId: "",
    isEnabled: true
  }
};

export const GAME_SERVICES: GameService[] = [
  {
    id: "mlbb",
    title: "Mobile Legends: Bang Bang",
    category: "MOBA Mobile",
    tagline: "Winrate Tinggi 80%-95% • 100% Murni Handplay Anti-Banned",
    icon: "https://en.moonton.com/upload/image/20250424/dcbc75155314f416af8ed64b374438dd.jpg",
    badge: "PALING LARIS",
    bannerImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    popular: true,
    roles: ["All Role Specialist", "Jungler / Hyper Carry", "Roamer Shotcaller"],
    features: [
      "Winrate tinggi (rata-rata 80% - 95%)",
      "Hero request bisa disesuaikan (gratis)",
      "Privasi akun 100% aman & no chit/script",
      "Bisa Request Jam Main / Sembunyikan Hasil"
    ],
    formFields: [
      { label: "ID & Server Game", name: "gameId", placeholder: "Contoh: 12345678 (2041)", type: "text" },
      { label: "Nickname Akun", name: "nickname", placeholder: "Nama akun MLBB Anda", type: "text" },
      { label: "Tipe Login Akun", name: "loginType", placeholder: "Pilih Login", type: "select", options: ["Moonton", "VK", "TikTok", "Google Play"] },
      { label: "Catatan Tambahan (Hero Request/Jadwal Main)", name: "notes", placeholder: "Contoh: Utamakan Assassin/Mage, jangan main jam 19.00", type: "text" }
    ],
    tiers: [
      { id: "ml-master", fromRank: "Master", toRank: "Per Bintang", price: 3000, estTime: "Per Bintang", unit: "Bintang" },
      { id: "ml-gm", fromRank: "Grandmaster", toRank: "Per Bintang", price: 4000, estTime: "Per Bintang", unit: "Bintang" },
      { id: "ml-epic", fromRank: "Epic", toRank: "Per Bintang", price: 5000, estTime: "Per Bintang", unit: "Bintang" },
      { id: "ml-legend", fromRank: "Legend", toRank: "Per Bintang", price: 7000, estTime: "Per Bintang", unit: "Bintang" },
      { id: "ml-mythic", fromRank: "Mythic Biasa (1-24 Bintang)", toRank: "Per Bintang", price: 12000, estTime: "Per Bintang", unit: "Bintang" },
      { id: "ml-honor", fromRank: "Mythical Honor (25-49 Bintang)", toRank: "Per Bintang", price: 16000, estTime: "Per Bintang", unit: "Bintang" },
      { id: "ml-glory", fromRank: "Mythical Glory (50-99 Bintang)", toRank: "Per Bintang", price: 22000, estTime: "Per Bintang", unit: "Bintang" },
      { id: "ml-immortal", fromRank: "Mythic Immortal (100+ Bintang)", toRank: "Per Bintang", price: 30000, estTime: "Per Bintang", unit: "Bintang" }
    ],
    packages: [
      { id: "ml-pkg-10", name: "Paket Order 10 Bintang (Free 1 Bintang)", price: "Harga Normal", bonus: "Order 10 Bintang FREE 1 Bintang (Total 11 Bintang)", speed: "Per Bintang" },
      { id: "ml-pkg-epic", name: "Paket Epic ke Legend (25 Bintang)", price: "Rp 125.000", bonus: "Order 10 Bintang Free 1 (Dapat Bonus 2 Bintang)", speed: "1-2 Hari" },
      { id: "ml-pkg-legend", name: "Paket Legend ke Mythic (25 Bintang)", price: "Rp 175.000", bonus: "Order 10 Bintang Free 1 (Dapat Bonus 2 Bintang)", speed: "1-2 Hari" },
      { id: "ml-pkg-honor", name: "Paket Mythic ke Honor (25 Bintang)", price: "Rp 300.000", bonus: "Order 10 Bintang Free 1 (Dapat Bonus 2 Bintang)", speed: "2-3 Hari" }
    ]
  },
  {
    id: "wuwa",
    title: "Wuthering Waves",
    category: "Action RPG & Open World",
    tagline: "Eksplorasi Map 100%, Story Quests, & Jasa Rawat Akun",
    icon: "https://play-lh.googleusercontent.com/S4HjezIFmL17FpPu7Z8VzxZvFMABYUjfLkcrDSEKxpjCYIL3tWLQK76_16SDOTiZlVHm_KeoMawvC7BPcyW_=s96-rw",
    badge: "POPULER",
    bannerImage: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=800&q=80",
    popular: true,
    roles: ["Exploration Map", "Story & Companion Quest", "Jasa Rawat Akun Harian", "Event Farming"],
    features: [
      "Eksplorasi map teliti (Huanglong, Rinascita, LahaiRoi, Mengzhou)",
      "Jasa Rawat Akun 15 & 30 Hari (Daily, Waveplate, Weekly, Endgame, Holo)",
      "Pengerjaan Main Story, Exploration, Companion & Side Quests",
      "Event berjalan 100% tuntas, akun aman & anti hackback"
    ],
    formFields: [
      { label: "UID WuWa & Server", name: "gameId", placeholder: "UID: 901234567 (SEA / Asia)", type: "text" },
      { label: "Metode Login", name: "loginType", placeholder: "Pilih Login", type: "select", options: ["Kuro Account", "Google", "Twitter / X"] },
      { label: "Catatan Layanan (Fokus Map/Waveplate)", name: "notes", placeholder: "Contoh: Habiskan waveplate ke boss material, simpan crystal", type: "text" }
    ],
    tiers: [
      { id: "wuwa-astrites", fromRank: "1.600 Astrites Farming", toRank: "Selesai", price: 18000, estTime: "1-2 Jam", category: "astrites" },
      { id: "wuwa-main-quest", fromRank: "Main Story Quest", toRank: "Per Quest", price: 10000, estTime: "Per Quest", category: "quest" },
      { id: "wuwa-explore-quest", fromRank: "Exploration Quest", toRank: "Per Quest", price: 7000, estTime: "Per Quest", category: "quest" },
      { id: "wuwa-comp-quest", fromRank: "Companion Story Quest", toRank: "Per Quest", price: 7000, estTime: "Per Quest", category: "quest" },
      { id: "wuwa-side-quest", fromRank: "Side Quests", toRank: "Per Quest", price: 2000, estTime: "Per Quest", category: "quest" },
      { id: "wuwa-map-huanglong", fromRank: "Exploration Huanglong 100%", toRank: "Full Map", price: 160000, estTime: "2-3 Hari", category: "exploration" },
      { id: "wuwa-map-rinascita", fromRank: "Exploration Rinascita 100%", toRank: "Full Map", price: 115000, estTime: "1-2 Hari", category: "exploration" },
      { id: "wuwa-map-lahairoi", fromRank: "Exploration LahaiRoi 100%", toRank: "Full Map", price: 275000, estTime: "3-4 Hari", category: "exploration" },
      { id: "wuwa-map-mengzhou", fromRank: "Exploration Mengzhou 100%", toRank: "Full Map", price: 115000, estTime: "1-2 Hari", category: "exploration" },
      { id: "wuwa-rawat-15b", fromRank: "Rawat Akun 15 Hari (Basic)", toRank: "Daily + Waveplate Biru (Tanpa WP Kuning)", price: 20000, estTime: "15 Hari", category: "rawat-akun" },
      { id: "wuwa-rawat-15s", fromRank: "Rawat Akun 15 Hari (Standard)", toRank: "Daily + Waveplate + Weekly + Endgame", price: 30000, estTime: "15 Hari", category: "rawat-akun" },
      { id: "wuwa-rawat-15p", fromRank: "Rawat Akun 15 Hari (Premium)", toRank: "Daily + Waveplate + Weekly + Endgame + Event + Holo", price: 45000, estTime: "15 Hari", category: "rawat-akun" },
      { id: "wuwa-rawat-30b", fromRank: "Rawat Akun 30 Hari (Basic)", toRank: "Daily + Waveplate (Waveplate biru ga include WP kuning)", price: 40000, estTime: "30 Hari", category: "rawat-akun" },
      { id: "wuwa-rawat-30s", fromRank: "Rawat Akun 30 Hari (Standard)", toRank: "Daily + Waveplate + Weekly + Endgame", price: 60000, estTime: "30 Hari", category: "rawat-akun" },
      { id: "wuwa-rawat-30p", fromRank: "Rawat Akun 30 Hari (Premium)", toRank: "Daily + Waveplate + Weekly + Endgame + Event + Bonus (Holo)", price: 90000, estTime: "30 Hari", category: "rawat-akun" }
    ],
    packages: [
      { id: "wuwa-pkg-30b", name: "Paket Promo Rawat Akun 30 Hari (Basic)", price: "Rp 38.000", bonus: "Hemat Rp 2.000 (Daily + Waveplate Biru)", speed: "30 Hari" },
      { id: "wuwa-pkg-30s", name: "Paket Promo Rawat Akun 30 Hari (Standard)", price: "Rp 58.000", bonus: "Hemat Rp 2.000 (Daily + Waveplate + Weekly + Endgame)", speed: "30 Hari" },
      { id: "wuwa-pkg-30p", name: "Paket Promo Rawat Akun 30 Hari (Premium)", price: "Rp 88.000", bonus: "Hemat Rp 2.000 (Full Service + Event + Holo)", speed: "30 Hari" },
      { id: "wuwa-pkg-15b", name: "Paket Promo Rawat Akun 15 Hari (Basic)", price: "Rp 19.000", bonus: "Hemat Rp 1.000 (Daily + Waveplate)", speed: "15 Hari" },
      { id: "wuwa-pkg-15s", name: "Paket Promo Rawat Akun 15 Hari (Standard)", price: "Rp 28.500", bonus: "Hemat Rp 1.500 (Daily + Weekly + Endgame)", speed: "15 Hari" },
      { id: "wuwa-pkg-15p", name: "Paket Promo Rawat Akun 15 Hari (Premium)", price: "Rp 43.000", bonus: "Hemat Rp 2.000 (Daily + Weekly + Event + Holo)", speed: "15 Hari" },
      { id: "wuwa-pkg-explore", name: "Paket Eksplorasi (Rinascita + Mengzhou)", price: "Rp 225.400", bonus: "Diskon 2% (Hemat Rp 4.600)", speed: "2-3 Hari" }
    ]
  },
  {
    id: "roblox",
    title: "Roblox: Anime Vanguards",
    category: "Anime Vanguards & Grinding",
    tagline: "100% Handplay Manual • Secret Unit Hunting & Evolution",
    icon: "https://play-lh.googleusercontent.com/QqZj22aXblAyYDxLQw-Gg0ycW0QkKhrDnwqgERZU9BMRXZnMlgXfq-94sikG5mEpt_I0lzZxcUzfLblmQgwYzUE=s96-rw",
    badge: "HANDPLAY",
    bannerImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    popular: true,
    roles: ["Anime Vanguards Specialist", "Secret Unit Hunting", "Evolution Grinding"],
    features: [
      "100% Pengerjaan Manual / Handplay tanpa script auto-ban",
      "Proses hunting & grinding cepat dan aman",
      "Unit & drop dijamin masuk ke inventory",
      "Bisa request jam pengerjaan online"
    ],
    formFields: [
      { label: "Username / Akun Roblox", name: "gameId", placeholder: "Username Roblox Anda", type: "text" },
      { label: "Metode Login Akun", name: "loginType", placeholder: "Pilih Login", type: "select", options: ["Roblox Langsung", "Quick Login Code"] },
      { label: "Catatan Khusus (Unit / Stage Target)", name: "notes", placeholder: "Contoh: Utamakan food evolution Denji", type: "text" }
    ],
    tiers: [
      { id: "rblx-ichigo", fromRank: "GET FULL ICHIGO VANGUARD", toRank: "Unit Diperoleh", price: 150000, estTime: "1-2 Hari", subGame: "anime-vanguard" },
      { id: "rblx-aizen", fromRank: "GET AIZEN", toRank: "Unit Diperoleh", price: 25000, estTime: "2-4 Jam", subGame: "anime-vanguard" },
      { id: "rblx-ulquiora", fromRank: "GET ULQIORA", toRank: "Unit Diperoleh", price: 30000, estTime: "3-5 Jam", subGame: "anime-vanguard" },
      { id: "rblx-rukia", fromRank: "GET RUKIA VANGUARD", toRank: "Unit Diperoleh", price: 75000, estTime: "1 Hari", subGame: "anime-vanguard" },
      { id: "rblx-makima", fromRank: "GET MAKIMA", toRank: "Unit Diperoleh", price: 45000, estTime: "4-6 Jam", subGame: "anime-vanguard" },
      { id: "rblx-denji", fromRank: "EVO DENJI", toRank: "Evolution Selesai", price: 95000, estTime: "1 Hari", subGame: "anime-vanguard" }
    ],
    packages: [
      { id: "rblx-pkg-bleach-duo", name: "Paket Bleach Duo (Aizen + Ulquiora)", price: "Rp 53.900", bonus: "Diskon 2% (Hemat Rp 1.100)", speed: "1 Hari" },
      { id: "rblx-pkg-chainsaw", name: "Paket Chainsaw Duo (Makima + Evo Denji)", price: "Rp 137.200", bonus: "Diskon 2% (Hemat Rp 2.800)", speed: "1-2 Hari" },
      { id: "rblx-pkg-vanguard", name: "Paket Vanguard Bleach (Ichigo + Rukia)", price: "Rp 220.500", bonus: "Diskon 2% (Hemat Rp 4.500)", speed: "2 Hari" }
    ]
  }
];

export const ADMIN_CREDENTIALS = {
  email: "admin@zurastore.com",
  passwordHash: "9ef7d1bdd38d8eb06541cc1586e0e73e45044fc4fc0eb8ca835ab1e8041d84f3"
};

export const PREMIUM_APPS: PremiumApp[] = [
  {
    id: "duolingo",
    name: "Duolingo Super",
    category: "EDUCATION & LANGUAGE",
    badge: "Code Redeem",
    badgeColor: "green",
    price: 50000,
    duration: "/ 12 Months",
    description: "Learn foreign languages with unlimited hearts, ad-free experience, and automated mistake review.",
    noteSeller: "RECOMMENDED TO TRY, redeem immediately after purchase, super easy activation (1+1=2), no warranty",
    features: [
      "Unlimited Hearts",
      "100% Ad-Free",
      "Practice Hub & Mistake Review",
      "Official Private Account"
    ],
    isHighlighted: true
  },
  {
    id: "ilovepdf",
    name: "iLovePDF Premium",
    category: "OFFICE & UTILITY",
    badge: "Akun Seller",
    badgeColor: "red",
    price: 50000,
    duration: "/ 11 – 12 Months",
    description: "Unlimited access to all PDF edit, convert, compress, OCR, and sign tools with no file size limits.",
    noteSeller: "RECOMMENDED TO TRY, activate immediately after payment, simple setup, no warranty",
    features: [
      "Accurate OCR PDF to Word",
      "Unlimited batch convert & edit",
      "No file size limitations",
      "Private Account"
    ]
  },
  {
    id: "youtube-premium",
    name: "YouTube + Music Premium",
    category: "STREAMING & ENTERTAINMENT",
    badge: "Via Invite",
    badgeColor: "red",
    price: 20000,
    duration: "1 Bulan",
    description: "Nonton YouTube bebas iklan & YouTube Music Premium, background playback (PIP), dan download video offline.",
    noteSeller: "Best to order during daytime, butuh email saja, garansi 1 bulan penuh",
    features: [
      "Bebas Iklan Video & Musik",
      "Background Playback (PIP)",
      "YouTube Music Premium Termasuk",
      "Garansi 1 Bulan Penuh"
    ]
  },
  {
    id: "capcut-pro",
    name: "CapCut Pro (Team Plan)",
    category: "VIDEO & CREATIVE AI",
    badge: "Akun Seller",
    badgeColor: "red",
    price: 40000,
    duration: "26 – 31 Hari",
    description: "Akses seluruh fitur editing premium CapCut Pro: auto-caption akurat, efek AI canggih, export 4K 60fps tanpa watermark, dan cloud storage.",
    noteSeller: "HOT PRODUCT, garansi 1 minggu",
    features: [
      "Semua Fitur Pro & AI Unlocked",
      "Auto-Caption & Voice Generator AI",
      "Export 4K 60FPS Tanpa Watermark",
      "Garansi 1 Minggu (Akun Seller Resmi)"
    ],
    isHighlighted: true
  },
  {
    id: "spotify-premium",
    name: "Spotify Premium (Individual Plan)",
    category: "MUSIC & AUDIO STREAMING",
    badge: "Akun Seller",
    badgeColor: "green",
    price: 25000,
    duration: "26 – 31 Hari",
    description: "Dengarkan jutaan lagu tanpa jeda iklan, skip musik tanpa batas, audio kualitas tertinggi (320kbps), dan download lagu offline.",
    noteSeller: "No garansi",
    features: [
      "100% Bebas Iklan",
      "Download Lagu & Dengarkan Offline",
      "Unlimited Skip Lagu",
      "Audio Ultra Kualitas Tinggi (320 kbps)"
    ],
    variants: [
      {
        id: "spotify-1m",
        name: "1 Bulan (26-31 Hari)",
        duration: "26 – 31 Hari",
        price: 25000,
        noteSeller: "No garansi"
      },
      {
        id: "spotify-2m",
        name: "2 Bulan (50-60 Hari)",
        duration: "50 – 60 Hari",
        price: 20000,
        noteSeller: "No garansi, produk ini lebih rawan dari pada varian yang 1 bulan."
      }
    ]
  },
  {
    id: "adobe-express",
    name: "Adobe Express Premium",
    category: "DESIGN & CREATIVE AI",
    badge: "Code Redeem",
    badgeColor: "blue",
    price: 50000,
    duration: "12 Months",
    description: "Adobe AI graphic design tool. Thousands of premium templates, text-to-image AI, 1-click background removal, and Adobe Fonts.",
    noteSeller: "RECOMMENDED TO TRY, redeem immediately after purchase, super easy code activation, no warranty",
    features: [
      "Adobe Firefly AI Access",
      "Instant Background Removal",
      "20,000+ Official Adobe Fonts",
      "Official Private Account"
    ]
  },
  {
    id: "canva-edu",
    name: "Canva Edu",
    category: "GRAPHIC DESIGN & SLIDES",
    badge: "Via Invite",
    badgeColor: "blue",
    price: 12000,
    duration: "LIFETIME",
    description: "Access millions of premium Canva Edu templates, vector elements, stock photos, magic resize, and brand kit forever.",
    noteSeller: "Stays in 1 team forever, email address only (no password needed), 6-month warranty",
    features: [
      "Lifetime Access",
      "Requires Email Only (No Password)",
      "Millions of Premium Elements & Templates",
      "6-Month Warranty"
    ]
  },
  {
    id: "netflix-1p1u",
    name: "Netflix (1P1U)",
    category: "STREAMING & MOVIES",
    badge: "1P1U Private",
    badgeColor: "dark",
    price: 40000,
    duration: "14-Day Warranty",
    description: "Watch Netflix movies & series in Ultra HD 4K. 1 Profile 1 User with private PIN, zero profile collisions.",
    noteSeller: "Extremely rare limits, full 14-Day warranty.",
    features: [
      "Ultra HD 4K Quality",
      "1 Profile 1 User (Private PIN)",
      "Extremely Rare Limits",
      "Full 14-Day Warranty"
    ]
  },
  {
    id: "gemini-priv",
    name: "Gemini Pro Priv",
    category: "AI & GOOGLE WORKSPACE",
    badge: "Limited Promo",
    badgeColor: "yellow",
    price: 50000,
    duration: "18 Bulan",
    expiresAt: "2026-10-24T23:59:59+07:00",
    expiryNotice: "READY S.D 24 OKTOBER 2026",
    description: "Akun Gemini Pro Private durasi panjang 18 bulan dengan akses model AI flagship, Antigravity AI, dan aktivasi langsung via link resmi.",
    noteSeller: "Akun Private, Masa aktif 18 Bulan, No Garansi. Aktivasi mudah via link invite. Promo khusus terbatas hanya ready sampai 24 Oktober 2026!",
    features: [
      "Akses Gemini 4 Argon & Gemini 1.5 Pro",
      "Akses Antigravity AI (Bisa Invite s.d 5 Teman)",
      "Kapasitas Kuota Prompt Besar & Fast Processing",
      "Private Account 18 Bulan (No Garansi)"
    ]
  }
];

export const PORTFOLIO_PROJECTS: ProjectPortfolio[] = [
  {
    id: "kura-cards",
    title: "Kura Cards: 2D Card Game Asset Pack",
    type: "manual",
    aiLabel: "Non-AI / Handcrafted",
    category: "2D Game Assets",
    imageUrl: "https://img.itch.zone/aW1nLzMwNTk3NTk4LmpwZw==/original/kDPze3.jpg",
    description: "Complete 2D card game deck asset pack yang dirilis resmi di platform itch.io: 4 varian warna, kartu angka 0-9, kartu spesial (Swap, Shell, Shield), kartu Wild & Wild +4, dan Card Back transparan 800x1000px.",
    toolsUsed: ["2D Sprites", "PNG Transparent", "800x1000 px", "Unity / Godot / GDevelop", "itch.io"],
    tags: ["Asset Pack", "Itch.io", "Game Assets", "2D Sprites", "Non-AI"],
    year: "2024",
    demoUrl: "https://kura-w.itch.io/kura-cards-2d-card-game-asset-pack",
    actionText: "Beli di Itch.io ($2) ↗",
    price: "$2.00 USD",
    features: [
      "4 set warna lengkap: Green, Brown, Purple, Magenta dengan angka 0-9",
      "Kartu aksi spesial: Swap (tukar kartu), Shell (beri kartu permanen), Shield (pantulkan +4)",
      "Kartu Wild & Wild +4 beserta desain Card Back serasi",
      "Format PNG resolusi 800x1000 px background transparan siap pakai",
      "Tersedia dokumen rules gameplay (English & Indonesian)",
      "100% Non-AI: Dibuat murni secara manual tanpa bantuan generative AI"
    ]
  },
  {
    id: "kura-game",
    title: "Kura Card - Permainan Kartu Kura",
    type: "ai",
    aiLabel: "AI Powered",
    category: "Game Web & AI Bot",
    imageUrl: "/projects/kura.png",
    description: "Game kartu web retro-indie interaktif berbasis deck Kura Cards dengan bot AI cerdas (Luna, Reyy, Kuro), kartu aksi spesial (Swap, Shell, Shield), efek suara dynamic foley, dan mode bermain seru.",
    toolsUsed: ["JavaScript ES6+", "Bot AI Engine", "Web Audio API", "Vite & CSS3", "Retro Indie UI"],
    tags: ["Card Game", "AI Bot Engine", "Web Game", "Retro Indie", "Audio API"],
    year: "2024",
    demoUrl: "https://tontonanku.github.io/kura/",
    githubUrl: "https://github.com/tontonanku/kura",
    actionText: "Mainkan Game ↗",
    features: [
      "Bermain kartu seru melawan 3 Bot AI cerdas dengan gaya bermain unik (Luna, Reyy, Kuro)",
      "Mekanik kartu aksi orisinal: Swap (tukar kartu tangan), Shell (kunci kartu lawan), dan Shield (pantulkan +4)",
      "Desain antarmuka bertema Retro Indie Ticket dengan estetika anime & pixel cards",
      "Sistem evaluasi giliran otomatis, pendeteksi kartu valid, dan penghitung penalti kartu",
      "Efek audio lengkap: musik latar retro, efek suara tebasan & penempatan kartu, serta haptic feedback"
    ]
  },
  {
    id: "blocky",
    title: "Block Blast - Modern Edition",
    type: "ai",
    aiLabel: "AI Powered",
    category: "Game Web & Puzzle",
    imageUrl: "/projects/blocky.png",
    description: "Game puzzle balok gaya Block Blast neo-brutalist 8x8 yang responsif dengan efek kombo beruntun, 6 tema estetik ramah mata, sistem booster bantuan (Bom, Palu, Acak), lucky spin harian, dan papan peringkat global.",
    toolsUsed: ["HTML5 Canvas", "Vanilla JavaScript", "Game Logic AI", "Web Audio API", "Neo-Brutalism"],
    tags: ["Puzzle Balok", "Canvas", "Neo-Brutalism", "Game Logic AI", "Leaderboard"],
    year: "2024",
    demoUrl: "https://tontonanku.github.io/Blocky/",
    githubUrl: "https://github.com/tontonanku/Blocky",
    actionText: "Mainkan Game",
    features: [
      "Papan 8x8 dengan drag-and-drop intuitif, collision detection presisi & efek ledakan balok",
      "Sistem kombo bertingkat (Combo Streaks) untuk melipatgandakan perolehan skor",
      "6 Pilihan tema estetik ramah mata: Warm Ivory, Midnight Slate, Pastel, Zen Bamboo, Nordic Frost, Obsidian Gold",
      "Tiga booster taktis: Bom (ledakkan 3x3), Palu (hancurkan 1 balok), dan Acak (refresh balok)",
      "Fitur Papan Peringkat (Leaderboard), Lucky Spin harian, dan Misi Hadiah Harian"
    ]
  },
  {
    id: "chessy",
    title: "Chessy - 1v1 & vs Bot",
    type: "ai",
    aiLabel: "AI Powered",
    category: "Game Tech & AI",
    imageUrl: "/projects/chessy.png",
    description: "Aplikasi web game catur mobile-first dengan bot AI cerdas, mode 1v1 offline pass-and-play, tracking XP & level, audio sound effects, dan skin papan catur.",
    toolsUsed: ["HTML5 Canvas", "JavaScript", "Chess AI Bot", "Web Audio API", "Mobile App UI"],
    tags: ["Chess Engine", "AI Bot", "Mobile First", "Canvas", "Level System"],
    year: "2024",
    demoUrl: "https://tontonanku.github.io/chessy/",
    githubUrl: "https://github.com/tontonanku/chessy",
    actionText: "Buka Web App ↗",
    features: [
      "Mode 1v1 Pass-and-Play Offline & Bermain Lawan Bot AI",
      "Kalkulasi evaluasi langkah catur dan pendeteksi skakmat akurat secara real-time",
      "True mobile app wrapper tanpa fake frame dengan navigasi mulus",
      "Pilihan skin tema papan catur, efek suara foley catur, dan BGM"
    ]
  },
  {
    id: "outbreak",
    title: "Outbreak - Jobdesk Portal Tim RRBY (Game Unity 6)",
    type: "manual",
    aiLabel: "TEAM PORTAL",
    category: "Team Portal & Task Matrix",
    imageUrl: "/projects/outbreak.png",
    description: "Web portal koordinasi jobdesk & pengumpulan tugas tim RRBY (Reihan, Bintang, Royan, Eby) untuk proyek pengembangan Game 2D Zombie Survival 'Outbreak' di Unity 6 (game masih dalam tahap proses pengembangan aktif), terintegrasi live sync Firebase Realtime Cloud Database.",
    toolsUsed: ["Firebase Realtime DB", "Task Matrix", "Unity 6 (In-Dev)", "Figma Link", "Mindmap", "Web Portal"],
    tags: ["Jobdesk Portal", "RRBY Team", "Firebase Sync", "Unity 6 In-Dev", "Task Matrix"],
    year: "2024",
    demoUrl: "https://outbreak.zura-w.my.id/",
    githubUrl: "https://github.com/TontonanKu/OUTBREAK",
    actionText: "Buka Portal Jobdesk Tim ↗",
    features: [
      "Dashboard manajemen tugas & matriks pembagian jobdesk 4 anggota tim (Reihan, Bintang, Royan, Eby)",
      "Sinkronisasi realtime status pengerjaan berbasis Firebase Realtime Cloud Database",
      "Portal terintegrasi acuan desain Figma, Mindmap Outbreak, dan repositori pengumpulan file dosen",
      "Status Game Outbreak: Game 2D Top-Down Zombie Survival Unity 6 saat ini dalam proses pengembangan aktif"
    ]
  },
  {
    id: "ngampus",
    title: "Ngampus - Jadwal & 3D WebGL Viewer",
    type: "ai",
    aiLabel: "AI Powered",
    category: "Web 3D & Utility",
    imageUrl: "/projects/ngampus.png",
    description: "Platform web interaktif jadwal harian dan manajemen tugas dengan integrasi 3D WebGL viewer dan GSAP animation.",
    toolsUsed: ["WebGL", "@google/model-viewer 3D", "GSAP Animation", "JavaScript", "Glassmorphism"],
    tags: ["WebGL", "3D Model", "GSAP", "Student Utility", "Interactive"],
    year: "2024",
    demoUrl: "https://tontonanku.github.io/ngampus/",
    githubUrl: "https://github.com/tontonanku/ngampus",
    actionText: "Buka Web App ↗",
    features: [
      "Jadwal kuliah otomatis sesuai hari aktif interaktif",
      "Visualisasi model 3D interaktif menggunakan @google/model-viewer",
      "Animasi dinamis tech elements & transisi mulus dengan GSAP",
      "Manajemen tugas dan agenda perkuliahan terintegrasi"
    ]
  },
  {
    id: "zuradown",
    title: "ZuraDown - Video Downloader TikTok & YouTube",
    type: "ai",
    aiLabel: "AI Powered",
    category: "Web Tools & API",
    imageUrl: "/projects/zuradown.png",
    description: "Tool web pengunduh video TikTok tanpa watermark dan video/audio YouTube (MP4 & MP3) cepat dengan antarmuka modern dan responsif.",
    toolsUsed: ["REST API", "Video Parser", "JavaScript", "FontAwesome", "Responsive CSS"],
    tags: ["Video Downloader", "TikTok No WM", "YouTube MP4/MP3", "REST API"],
    year: "2024",
    demoUrl: "https://tontonanku.github.io/zuradown/",
    githubUrl: "https://github.com/tontonanku/zuradown",
    actionText: "Buka Web App ↗",
    features: [
      "Unduh video TikTok HD tanpa watermark secara cepat",
      "Konversi dan unduh video YouTube kualitas MP4 serta audio MP3",
      "Selector platform pintar dengan auto-detect format URL link",
      "Antarmuka cepat, clean, tanpa pop-up iklan yang mengganggu"
    ]
  }
];

export const INITIAL_WHATSAPP_TESTIMONIALS: WhatsAppTestimonial[] = [
  // --- WUTHERING WAVES VERIFIED TESTIMONIALS ---
  {
    id: "wa-wuwa-1",
    customerName: "Febri Ananda",
    serviceCategory: "Joki Wuthering Waves",
    date: "20 Agu 2026, 15:43 WIB",
    chatSnippet: "Jokian Selesai! Order: 1.600 Astrites. Pembayaran Diterima Rp 30.000 ke Kazura Store Batam. Terima kasih atas kepercayaannya!",
    screenshotUrl: "/testimonials/wuwa/Group 1.png",
    rating: 5,
    orderCode: "ZURA-WW-01"
  },
  {
    id: "wa-wuwa-2",
    customerName: "Rakha Ibnu Shoji",
    serviceCategory: "Joki Wuthering Waves",
    date: "23 Agu 2026, 02:38 WIB",
    chatSnippet: "Jokian Selesai - Order: 5.200 Astrites (Waktu pengerjaan: 9 jam). Chat: 'mantap thank you min 😁'. Transfer Rp 50.000 ke Kazura Store.",
    screenshotUrl: "/testimonials/wuwa/Group 2.png",
    rating: 5,
    orderCode: "ZURA-WW-02"
  },
  {
    id: "wa-wuwa-3",
    customerName: "Customer WuWa (Mandiri / GoPay)",
    serviceCategory: "Joki Wuthering Waves",
    date: "25 Agu 2026, 08:01 WIB",
    chatSnippet: "Order 8.000 Astrites selesai! Chat: 'terimakasih banyak min, next kalo joki disini lagi deh 😆👍'. Pembayaran Rp 75.000 sukses.",
    screenshotUrl: "/testimonials/wuwa/Group 3.png",
    rating: 5,
    orderCode: "ZURA-WW-03"
  },
  {
    id: "wa-wuwa-4",
    customerName: "M Muhammad Nabil",
    serviceCategory: "Joki Wuthering Waves",
    date: "27 Agu 2026, 13:35 WIB",
    chatSnippet: "Order 12.000 Astrites selesai! Chat: 'Walah cepet bat min, Makasih min'. Pembayaran SeaBank Rp 145.000 ke Kazura Store.",
    screenshotUrl: "/testimonials/wuwa/Group 4.png",
    rating: 5,
    orderCode: "ZURA-WW-04"
  },
  {
    id: "wa-wuwa-5",
    customerName: "Customer WuWa (QRIS Payment)",
    serviceCategory: "Joki Wuthering Waves",
    date: "29 Agu 2026, 18:49 WIB",
    chatSnippet: "Jokian Selesai - Quest Beneath a Melting Sky. Chat: '🙏😭 thanks bangg'. Pembayaran QRIS Rp 13.000 berhasil ke Kazura Store.",
    screenshotUrl: "/testimonials/wuwa/Group 5.png",
    rating: 5,
    orderCode: "ZURA-WW-05"
  },
  {
    id: "wa-wuwa-6",
    customerName: "Muhammad Nabil (obscurant)",
    serviceCategory: "Joki Wuthering Waves",
    date: "27 Okt 2026, 17:25 WIB",
    chatSnippet: "Jokian Selesai! Order: Companion 3 quest + explore 5 + side quest 2. Bonus: 2 side quest + 1 tutorial quest. Terima kasih ka sudah joki bareng kami! Ditunggu orderan selanjutnya 😊🙏",
    screenshotUrl: "/testimonials/wuwa/Group 2.png",
    rating: 5,
    orderCode: "ZURA-WW-261027"
  },

  // --- ROBLOX & GAME MIDMAN VERIFIED TESTIMONIALS ---
  {
    id: "wa-rblx-1",
    customerName: "Ndu Joji",
    serviceCategory: "Trade Pet Roblox",
    date: "07 Agu 2026, 18:35 WIB",
    chatSnippet: "Order Pet Orangutan Roblox 2.81 KG selesai via PS. Chat: 'ok ty mas sukses terus ya 👍'. Transfer BCA ke DANA Kazura Rp 500.000.",
    screenshotUrl: "/testimonials/roblox/image.webp",
    rating: 5,
    orderCode: "ZURA-RBLX-01"
  },
  {
    id: "wa-rblx-2",
    customerName: "chiwaprikitiw",
    serviceCategory: "Trade Pet Roblox",
    date: "11 Agu 2026, 23:56 WIB",
    chatSnippet: "Gift Pet Aromatic Kitsune [7.31 KG] selesai. Chat: 'thx kak 👍'. Pembayaran QRIS DANA Rp 250.000 ke Kazura Store.",
    screenshotUrl: "/testimonials/roblox/image (1).webp",
    rating: 5,
    orderCode: "ZURA-RBLX-02"
  },
  {
    id: "wa-rblx-3",
    customerName: "zayelle",
    serviceCategory: "Top Up & Membership",
    date: "30 Mar 2026, 12:24 WIB",
    chatSnippet: "Top Up Monthly Member Global - 750 Diamond masuk! Chat: 'okee dahh masukk'. Pembayaran DuitNow QR IDR 235.000 berhasil.",
    screenshotUrl: "/testimonials/roblox/image (2).webp",
    rating: 5,
    orderCode: "ZURA-TOPUP-01"
  },
  {
    id: "wa-rblx-4",
    customerName: "SHADOWBREAK (Sage L)",
    serviceCategory: "Jasa Midman (MM)",
    date: "21 Jun 2026, 19:36 WIB",
    chatSnippet: "Transaksi Aman Jasa Midman Kazura Store selesai. Chat: 'Sudah ya terima kasih telah menggunakan jasa midman saya'. BCA QRIS IDR 210.000.",
    screenshotUrl: "/testimonials/roblox/image (3).webp",
    rating: 5,
    orderCode: "ZURA-MM-01"
  },
  {
    id: "wa-rblx-5",
    customerName: "Din4Nduu (ndusophie)",
    serviceCategory: "Trade Farm Pet",
    date: "07 Agu 2026, 08:24 WIB",
    chatSnippet: "Trade Roblox Farm Pet selesai. Chat: 'Makasih banyak kak'. Transfer m-BCA ke DANA Kazura Rp 200.000.",
    screenshotUrl: "/testimonials/roblox/image (4).webp",
    rating: 5,
    orderCode: "ZURA-RBLX-03"
  },
  {
    id: "wa-rblx-6",
    customerName: "Muh. Sakir (Buyer 14)",
    serviceCategory: "Joki & Trade Game",
    date: "29 Mar 2026, 14:17 WIB",
    chatSnippet: "Order Transaksi Discord selesai. Chat: 'Done ya, makasih'. Pembayaran SeaBank QRIS Rp 195.000 ke Kazura Store Batam.",
    screenshotUrl: "/testimonials/roblox/image (5).webp",
    rating: 5,
    orderCode: "ZURA-DSC-01"
  },
  {
    id: "wa-rblx-7",
    customerName: "Buyer 14 (Batch 2)",
    serviceCategory: "Joki & Trade Game",
    date: "31 Mar 2026, 22:23 WIB",
    chatSnippet: "Order Transaksi Discord Batch 2 selesai. Chat: 'Done ya, makasih'. Pembayaran QRIS DANA SmartPay Rp 195.000 sukses.",
    screenshotUrl: "/testimonials/roblox/image (6).webp",
    rating: 5,
    orderCode: "ZURA-DSC-02"
  },
  {
    id: "wa-rblx-8",
    customerName: "Din4Nduu (ndusophie)",
    serviceCategory: "Trade Farm Pet",
    date: "07 Agu 2026, 08:13 WIB",
    chatSnippet: "m-Transfer BCA Berhasil Rp 200.000 ke Kazura Store (DANA 3901082172795156). Chat: 'Makasih banyak kak'.",
    screenshotUrl: "/testimonials/roblox/image (7).webp",
    rating: 5,
    orderCode: "ZURA-RBLX-04"
  },
  {
    id: "wa-rblx-9",
    customerName: "Rendy Ardiansyah (rndyardh)",
    serviceCategory: "Trade Pet Roblox",
    date: "08 Agu 2026, 18:00 WIB",
    chatSnippet: "Gift Pet Kitsune [2.77 KG] Age 1 selesai via PS. Chat: 'sama sama'. Pembayaran BRImo QRIS Rp 190.000 BERHASIL.",
    screenshotUrl: "/testimonials/roblox/image (8).webp",
    rating: 5,
    orderCode: "ZURA-RBLX-05"
  },
  {
    id: "wa-rblx-10",
    customerName: "Muh. Sakir (Buyer 14)",
    serviceCategory: "Joki & Trade Discord",
    date: "29 Mar 2026, 14:10 WIB",
    chatSnippet: "Transaksi SeaBank QRIS Rp 195.000 Terverifikasi Resmi. Chat: 'Done ya, makasih'. Pembayaran ke Kazura Store Batam.",
    screenshotUrl: "/testimonials/roblox/image (9).webp",
    rating: 5,
    orderCode: "ZURA-DSC-03"
  },
  {
    id: "wa-rblx-11",
    customerName: "Buyer 14 (Batch 2)",
    serviceCategory: "Joki & Trade Discord",
    date: "31 Mar 2026, 22:15 WIB",
    chatSnippet: "Transaksi QRIS DANA SmartPay Rp 195.000 Terverifikasi Resmi. Chat: 'Done ya, makasih'. Pembayaran ke Kazura Store Batam.",
    screenshotUrl: "/testimonials/roblox/image (10).webp",
    rating: 5,
    orderCode: "ZURA-DSC-04"
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ord_261027_nabil",
    orderCode: "ZURA-WW-261027",
    createdAt: 1793082300000, // 27 Okt 2026, 13:25 WIB
    completedAt: 1793096700000, // 27 Okt 2026, 17:25 WIB
    customerName: "Muhammad Nabil (obscurant)",
    customerPhone: "081047685941",
    serviceType: "joki_game",
    itemName: "Wuthering Waves",
    itemDetails: "Quest Combo (3 Companion + 5 Explore + 2 Side Quest + Bonus)",
    extraFormData: {
      "Kategori": "Story & Quest Farming",
      "Order Utama": "3 Companion Quest + 5 Exploration Quest + 2 Side Quest",
      "Bonus Layanan": "2 Side Quest + 1 Tutorial Quest (FREE)",
      "ID Transaksi": "261027-69CQ-6EALQH",
      "No. Referensi": "1tleprq47849",
      "Sumber Dana": "Bank Jago 104768565941 (Bank Mandiri)",
      "Pengirim": "MUHAMMAD NABIL",
      "Tujuan": "Kazura Store - Batam"
    },
    totalAmount: 55000,
    originalAmount: 55000,
    paymentMethod: "web_transfer",
    status: "completed",
    adminResponseReceived: true,
    adminRespondedAt: 1793096700000,
    rating: 5,
    reviewSubmittedAt: 1793096700000,
    reviewText: "Jokian quest WuWa cepat banget beres, dapat bonus 2 side quest + 1 tutorial quest. Mantap dan terpercaya!",
    verificationHash: "ZR-VERIFIED-6EALQH-KAZURA",
    receipt: {
      receiptNumber: "REC-202610-6EALQH",
      transactionDate: "27 Okt 2026, 13:25 WIB",
      completedDate: "27 Okt 2026, 17:25 WIB",
      serviceName: "Wuthering Waves",
      variantOrRank: "Quest Combo (3 Companion + 5 Explore + 2 Side Quest + Bonus)",
      customerName: "Muhammad Nabil (obscurant)",
      customerPhone: "0810••••5941",
      accountDetails: {
        "Order Utama": "3 Companion + 5 Explore + 2 Side Quest",
        "Bonus Layanan": "2 Side Quest + 1 Tutorial Quest (FREE)",
        "ID Transaksi": "261027-69CQ-6EALQH",
        "No. Referensi": "1tleprq47849",
        "Pengirim": "MUHAMMAD NABIL (Jago 104768565941)",
        "Status Pengerjaan": "100% Selesai & Lunas (17:25 WIB)"
      },
      amount: 55000,
      paymentMethod: "web_transfer",
      paymentStatus: "SELESAI",
      adminNotes: "Pembayaran Rp 55.000 via Bank Jago/Mandiri (ID Transaksi: 261027-69CQ-6EALQH, Ref: 1tleprq47849) telah diverifikasi lunas. Jokian selesai 100%: Companion 3 quest + explore 5 + side quest 2 + bonus 2 side quest & 1 tutorial quest.",
      rating: 5,
      review: "Jokian quest WuWa cepat banget beres, dapat bonus 2 side quest + 1 tutorial quest. Mantap dan terpercaya!",
      verificationHash: "ZR-VERIFIED-6EALQH-KAZURA"
    }
  }
];
