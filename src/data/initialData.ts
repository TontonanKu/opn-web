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
      { id: "wuwa-rawat-15b", fromRank: "Rawat Akun 15 Hari (Basic)", toRank: "Daily + Waveplate", price: 18000, estTime: "15 Hari", category: "rawat-akun" },
      { id: "wuwa-rawat-15s", fromRank: "Rawat Akun 15 Hari (Standard)", toRank: "Daily + Weekly + Holo", price: 30000, estTime: "15 Hari", category: "rawat-akun" },
      { id: "wuwa-rawat-30b", fromRank: "Rawat Akun 30 Hari (Basic)", toRank: "Daily + Waveplate", price: 33000, estTime: "30 Hari", category: "rawat-akun" },
      { id: "wuwa-rawat-30s", fromRank: "Rawat Akun 30 Hari (Standard)", toRank: "Daily + Weekly + Holo + Event", price: 55000, estTime: "30 Hari", category: "rawat-akun" }
    ],
    packages: [
      { id: "wuwa-pkg-15b-5sq", name: "Paket Rawat 15 Hari Basic + 5 Side Quests", price: "Rp 27.440", bonus: "Diskon 2% (Hemat Rp 560)", speed: "15 Hari" },
      { id: "wuwa-pkg-15p", name: "Paket Rawat Akun 15 Hari Premium", price: "Rp 49.000", bonus: "Diskon 2% (Hemat Rp 1.000)", speed: "15 Hari" },
      { id: "wuwa-pkg-30p", name: "Paket Rawat Akun 30 Hari Premium + Holo", price: "Rp 88.200", bonus: "Diskon 2% (Hemat Rp 1.800)", speed: "30 Hari" },
      { id: "wuwa-pkg-rush", name: "Paket Quest Rush (2 Main + 2 Companion + 5 Side)", price: "Rp 43.120", bonus: "Diskon 2% (Hemat Rp 880)", speed: "1-2 Hari" },
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
  password: "admin123"
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
    price: 12000,
    duration: "/ 1 Month",
    description: "Ad-free YouTube videos & YouTube Music, background play, and offline downloads.",
    noteSeller: "Best to order during daytime, requires email only, 1-month warranty",
    features: [
      "Ad-Free Video & Music",
      "Background Playback (PIP)",
      "YouTube Music Premium Included",
      "1-Month Warranty"
    ]
  },
  {
    id: "adobe-express",
    name: "Adobe Express Premium",
    category: "DESIGN & CREATIVE AI",
    badge: "Code Redeem",
    badgeColor: "blue",
    price: 50000,
    duration: "/ 12 Months",
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
    price: 20000,
    duration: "/ LIFETIME",
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
    duration: "/ 14-Day Warranty",
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
    duration: "/ 18 Bulan",
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
    imageUrl: "https://zura-w.my.id/projects/kura.png",
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
    imageUrl: "https://zura-w.my.id/projects/blocky.png",
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
    imageUrl: "https://zura-w.my.id/projects/chessy.png",
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
    id: "ngampus",
    title: "Ngampus - Jadwal & 3D WebGL Viewer",
    type: "ai",
    aiLabel: "AI Powered",
    category: "Web 3D & Utility",
    imageUrl: "https://zura-w.my.id/projects/ngampus.png",
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
    imageUrl: "https://zura-w.my.id/projects/zuradown.png",
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
  {
    id: "wa-1",
    customerName: "Rian Pratama (Jakarta)",
    serviceCategory: "Joki MLBB",
    date: "Kemarin, 21:14 WIB",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    chatSnippet: "Gokil beneran cepet bgt bro! Tadi sore Legend IV sekarang udah Mythic 15 bintang! WR 100% savage berkali-kali. Makasih min, next order lagi!",
    screenshotUrl: "https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&w=600&q=80",
    rating: 5,
    orderCode: "ZURA-ML-98214"
  },
  {
    id: "wa-2",
    customerName: "Fajar Maulana (Bandung)",
    serviceCategory: "Netflix 4K UHD",
    date: "12 Okt 2024, 14:02 WIB",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
    chatSnippet: "Akun Netflix udah bisa min, langsung login di Smart TV lancar jaya no on-hold! Mantap responsif bgt pas 10 menit timer langsung kelar akunnya.",
    screenshotUrl: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&w=600&q=80",
    rating: 5,
    orderCode: "ZURA-APP-41902"
  },
  {
    id: "wa-3",
    customerName: "Dinda Salsabila (Surabaya)",
    serviceCategory: "ChatGPT Plus & Canva Pro",
    date: "10 Okt 2024, 18:30 WIB",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    chatSnippet: "Canva Pro nya udah masuk email min, fitur pro aktif semua buat ngerjain tugas skripsi! ChatGPT Plus juga kenceng banget. Trusted!",
    screenshotUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    rating: 5,
    orderCode: "ZURA-APP-77291"
  },
  {
    id: "wa-4",
    customerName: "Kevin Wijaya (Medan)",
    serviceCategory: "Joki Valorant",
    date: "08 Okt 2024, 23:45 WIB",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    chatSnippet: "From Gold 2 to Ascendant 1! Booster ramah, mainnya rapih gak pake cheat, match history ijo semua. Rekomendasi buat anak Valo!",
    screenshotUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80",
    rating: 5,
    orderCode: "ZURA-VAL-33821"
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-demo-1",
    orderCode: "ZURA-ML-849201",
    createdAt: Date.now() - 3600000 * 5, // 5 hours ago
    customerName: "Dimas Aditya",
    customerPhone: "081392817291",
    serviceType: "joki_game",
    itemName: "Mobile Legends: Bang Bang",
    itemDetails: "Epic -> Legend (Paket Full)",
    extraFormData: {
      gameId: "98273618 (2190)",
      nickname: "ShadowStrike",
      loginType: "Moonton"
    },
    totalAmount: 85000,
    paymentMethod: "web_transfer",
    paymentProofUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80",
    status: "completed",
    adminResponseReceived: true,
    adminRespondedAt: Date.now() - 3600000 * 4.8,
    receipt: {
      receiptNumber: "REC-202410-0081",
      transactionDate: "15/10/2024 19:40 WIB",
      completedDate: "15/10/2024 23:15 WIB",
      serviceName: "Jasa Joki Mobile Legends",
      variantOrRank: "Epic ke Legend (Full Bintang)",
      customerName: "Dimas Aditya",
      customerPhone: "081392817291",
      accountDetails: {
        "ID & Server": "98273618 (2190)",
        "Nickname": "ShadowStrike",
        "Login Via": "Moonton"
      },
      amount: 85000,
      paymentMethod: "web_transfer",
      paymentStatus: "SELESAI",
      adminNotes: "Joki selesai 100% murni tanpa cheat. Win streak 14 match.",
      rating: 5,
      review: "Gacor banget Jokinya, 3 jam beres mantap!"
    }
  },
  {
    id: "ord-demo-2",
    orderCode: "ZURA-APP-509124",
    createdAt: Date.now() - 3600000 * 2, // 2 hours ago
    customerName: "Aulia Rahma",
    customerPhone: "085817263541",
    serviceType: "app_premium",
    itemName: "Netflix Premium 4K UHD",
    itemDetails: "1 Bulan (1 Profile 1 Device)",
    extraFormData: {
      userEmail: "aulia.rahma99@gmail.com"
    },
    totalAmount: 28000,
    paymentMethod: "whatsapp_direct",
    status: "completed",
    adminResponseReceived: true,
    adminRespondedAt: Date.now() - 3600000 * 1.9,
    receipt: {
      receiptNumber: "REC-202410-0082",
      transactionDate: "15/10/2024 22:10 WIB",
      completedDate: "15/10/2024 22:18 WIB",
      serviceName: "Netflix Premium Ultra HD 4K",
      variantOrRank: "1 Bulan (Profile Pribadi)",
      customerName: "Aulia Rahma",
      customerPhone: "085817263541",
      accountDetails: {
        "Email Terdaftar": "aulia.rahma99@gmail.com",
        "PIN Profile": "8821"
      },
      amount: 28000,
      paymentMethod: "whatsapp_direct",
      paymentStatus: "SELESAI",
      adminNotes: "Kredensial dan PIN sudah dikirim melalui WhatsApp resmi.",
      rating: 5,
      review: "Cepat banget respon adminnya, gak sampe 10 menit akun udah aktif!"
    }
  }
];
