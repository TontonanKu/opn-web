export const personalInfo = {
  name: "zura-w",
  nickname: "zura-w",
  birthDate: "05-06-2006",
  phone: "082172795156",
  whatsappNumber: "6282172795156",
  email: "zuraw.official@gmail.com",
  domain: "zura-w.my.id",
  bio: "Spesialisasi generative game assets, integrasi AI, serta jasa push rank 100% murni handplay.",
  headline: "Game Assets Creator • Practical AI Developer • Pro Gamer & Joki Specialist",
  status: "Available for Projects & Joki Game",
  software: [
    { name: "FIGMA", category: "UI/UX & Design", color: "#F24E1E" },
    { name: "UNITY", category: "Game Engine", color: "#000000" },
    { name: "CANVA", category: "Graphic Design", color: "#00C4CC" },
    { name: "PYTHON", category: "AI & Scripting", color: "#3776AB" },
    { name: "PYTORCH", category: "Deep Learning", color: "#EE4C2C" },
    { name: "BLENDER", category: "3D Modeling", color: "#EA7600" }
  ]
};

// Raw multi-language projects
const aiProjectsData = [
  {
    id: "kura-cards",
    title: "Kura Cards: 2D Card Game Asset Pack",
    shortDesc: {
      id: "Complete 2D card game deck asset pack yang dirilis di platform itch.io: 4 varian warna, kartu angka 0-9, kartu spesial (Swap, Shell, Shield), kartu Wild & Wild +4, dan Card Back transparan 800x1000px.",
      en: "Complete 2D card game deck asset pack released on itch.io: 4 color suits, numbers 0-9, special action cards (Swap, Shell, Shield), Wild & Wild +4, and transparent 800x1000px Card Back."
    },
    category: {
      id: "2D Game Assets",
      en: "2D Game Assets"
    },
    tag: {
      id: "Asset Pack (Itch.io)",
      en: "Asset Pack (Itch.io)"
    },
    isAi: false,
    aiLabel: {
      id: "🎨 Non-AI / Handcrafted",
      en: "🎨 Non-AI / Handcrafted"
    },
    date: {
      id: "Tersedia di Itch.io",
      en: "Available on Itch.io"
    },
    price: "$2.00 USD",
    platform: "itch.io",
    image: "https://img.itch.zone/aW1nLzMwNTk3NTk4LmpwZw==/original/kDPze3.jpg",
    tech: ["2D Sprites", "PNG Transparent", "800x1000 px", "Unity / Godot / GDevelop", "itch.io"],
    features: {
      id: [
        "4 set warna lengkap: Green, Brown, Purple, Magenta dengan angka 0-9",
        "Kartu aksi spesial: Swap (tukar kartu), Shell (beri kartu permanen), Shield (pantulkan +4)",
        "Kartu Wild & Wild +4 beserta desain Card Back serasi",
        "Format PNG resolusi 800x1000 px background transparan siap pakai",
        "Tersedia dokumen rules gameplay (English & Indonesian)",
        "100% Non-AI: Dibuat murni secara manual tanpa bantuan generative AI"
      ],
      en: [
        "4 complete color suits: Green, Brown, Purple, Magenta with numbers 0-9",
        "Special action cards: Swap (exchange cards), Shell (permanent card give), Shield (reflect +4)",
        "Wild & Wild +4 cards with matching transparent Card Back design",
        "Ready-to-use transparent PNG format in 800x1000 px resolution",
        "Complete gameplay rules documentation (English & Indonesian)",
        "100% Non-AI: Handcrafted without any generative AI assistance"
      ]
    },
    githubUrl: "",
    demoUrl: "https://kura-w.itch.io/kura-cards-2d-card-game-asset-pack",
    actionText: {
      id: "Beli di Itch.io ($2) ↗",
      en: "Buy on Itch.io ($2) ↗"
    }
  },
  {
    id: "chessy",
    title: "Chessy - 1v1 & vs Bot",
    shortDesc: {
      id: "Aplikasi web game catur mobile-first dengan bot AI cerdas, mode 1v1 offline pass-and-play, tracking XP & level, audio sound effects, dan skin papan catur.",
      en: "Mobile-first chess web game application featuring a smart AI bot, offline 1v1 pass-and-play mode, XP & level progression, sound effects, and custom board skins."
    },
    category: {
      id: "Game Tech & AI",
      en: "Game Tech & AI"
    },
    tag: {
      id: "Chess Engine & Bot",
      en: "Chess Engine & Bot"
    },
    isAi: true,
    aiLabel: {
      id: "✨ AI Powered",
      en: "✨ AI Powered"
    },
    date: {
      id: "Web App Aktif",
      en: "Live Web App"
    },
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1200&q=80",
    tech: ["HTML5 Canvas", "JavaScript", "Chess AI Bot", "Web Audio API", "Mobile App UI"],
    features: {
      id: [
        "Mode 1v1 Pass-and-Play Offline & Bermain Lawan Bot AI",
        "Kalkulasi evaluasi langkah catur dan pendeteksi skakmat akurat",
        "True mobile app wrapper tanpa fake frame dengan navigasi mulus",
        "Pilihan skin tema papan catur, efek suara foley catur, dan BGM"
      ],
      en: [
        "Offline 1v1 Pass-and-Play Mode & Play vs Smart AI Bot",
        "Real-time move evaluation calculation and precise checkmate detection",
        "True mobile app layout with fluid, responsive navigation",
        "Custom chess board theme skins, foley sound effects, and ambient BGM"
      ]
    },
    githubUrl: "https://github.com/tontonanku/chessy",
    demoUrl: "https://tontonanku.github.io/chessy/",
    actionText: {
      id: "Buka Web App ↗",
      en: "Open Web App ↗"
    }
  },
  {
    id: "ngampus",
    title: "Ngampus - Jadwal & 3D WebGL Viewer",
    shortDesc: {
      id: "Platform web interaktif jadwal harian dan manajemen tugas dengan integrasi 3D WebGL viewer dan GSAP animation.",
      en: "Interactive daily schedule and task management web platform with 3D WebGL viewer integration and smooth GSAP animations."
    },
    category: {
      id: "Web 3D & Utility",
      en: "Web 3D & Utility"
    },
    tag: {
      id: "WebGL & Model 3D",
      en: "WebGL & 3D Model"
    },
    isAi: true,
    aiLabel: {
      id: "✨ AI Powered",
      en: "✨ AI Powered"
    },
    date: {
      id: "Web App Aktif",
      en: "Live Web App"
    },
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    tech: ["WebGL", "Google Model-Viewer 3D", "GSAP Animation", "JavaScript", "Glassmorphism"],
    features: {
      id: [
        "Jadwal kuliah otomatis sesuai hari aktif interaktif",
        "Visualisasi model 3D interaktif menggunakan @google/model-viewer",
        "Animasi dinamis tech elements & transisi mulus dengan GSAP",
        "Manajemen tugas dan agenda perkuliahan"
      ],
      en: [
        "Automated class schedules synced to the active day",
        "Interactive 3D model visualization powered by @google/model-viewer",
        "Dynamic tech element animations & fluid transitions with GSAP",
        "Coursework task tracking and daily academic agenda"
      ]
    },
    githubUrl: "https://github.com/tontonanku/ngampus",
    demoUrl: "https://tontonanku.github.io/ngampus/",
    actionText: {
      id: "Buka Web App ↗",
      en: "Open Web App ↗"
    }
  },
  {
    id: "zuradown",
    title: "ZuraDown - Video Downloader TikTok & YouTube",
    shortDesc: {
      id: "Tool web pengunduh video TikTok tanpa watermark dan video/audio YouTube (MP4 & MP3) cepat dengan antarmuka modern dan responsif.",
      en: "Fast web tool for downloading watermark-free TikTok videos and YouTube media (MP4 & MP3) with a clean, responsive modern UI."
    },
    category: {
      id: "Web Tools & API",
      en: "Web Tools & API"
    },
    tag: {
      id: "Video Downloader",
      en: "Video Downloader"
    },
    isAi: true,
    aiLabel: {
      id: "✨ AI Powered",
      en: "✨ AI Powered"
    },
    date: {
      id: "Web App Aktif",
      en: "Live Web App"
    },
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80",
    tech: ["REST API", "Video Parser", "JavaScript", "FontAwesome", "Responsive CSS"],
    features: {
      id: [
        "Unduh video TikTok HD tanpa watermark secara cepat",
        "Konversi dan unduh video YouTube kualitas MP4 serta audio MP3",
        "Selector platform pintar dengan auto-detect format URL link",
        "Antarmuka cepat, clean, tanpa pop-up iklan yang mengganggu"
      ],
      en: [
        "Fast HD TikTok video download without watermark",
        "Convert and download YouTube videos in MP4 quality and MP3 audio",
        "Smart platform selector with URL auto-detection",
        "Fast, clean interface with zero annoying pop-up ads"
      ]
    },
    githubUrl: "https://github.com/tontonanku/zuradown",
    demoUrl: "https://tontonanku.github.io/zuradown/",
    actionText: {
      id: "Buka Web App ↗",
      en: "Open Web App ↗"
    }
  }
];

export const getAiProjects = (lang = 'id') => {
  return aiProjectsData.map(p => ({
    ...p,
    title: p.title,
    shortDesc: p.shortDesc[lang] || p.shortDesc.id,
    category: p.category[lang] || p.category.id,
    tag: p.tag[lang] || p.tag.id,
    aiLabel: p.aiLabel[lang] || p.aiLabel.id,
    date: p.date[lang] || p.date.id,
    actionText: p.actionText[lang] || p.actionText.id,
    features: p.features[lang] || p.features.id
  }));
};

export const aiProjects = getAiProjects('id');

// Raw multi-language Joki Games
const jokiGamesData = [
  {
    id: "mlbb",
    name: "Mobile Legends: Bang Bang",
    shortName: "MLBB",
    category: "MOBA Mobile",
    banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    roles: {
      id: ["All Role Specialist", "Jungler / Hyper Carry", "Roamer Shotcaller"],
      en: ["All-Role Specialist", "Jungler / Hyper Carry", "Roamer Shotcaller"]
    },
    features: {
      id: [
        "Winrate tinggi (rata-rata 80% - 95%)",
        "Hero request bisa disesuaikan (gratis)",
        "Privasi akun 100% aman & no chit/script",
        "Bisa Request Jam Main / Sembunyikan Hasil"
      ],
      en: [
        "High winrate (avg 80% - 95%)",
        "Hero request available (free)",
        "100% account privacy & no cheats/scripts",
        "Flexible play schedule & match history hiding"
      ]
    },
    ranks: [
      { name: "Master", pricePerStar: 3000, estimatedTime: { id: "Per Bintang", en: "Per Star" } },
      { name: "Grandmaster", pricePerStar: 4000, estimatedTime: { id: "Per Bintang", en: "Per Star" } },
      { name: "Epic", pricePerStar: 5000, estimatedTime: { id: "Per Bintang", en: "Per Star" } },
      { name: "Legend", pricePerStar: 7000, estimatedTime: { id: "Per Bintang", en: "Per Star" } },
      { 
        name: { id: "Mythic Biasa (1-24 Bintang)", en: "Regular Mythic (1-24 Stars)" }, 
        pricePerStar: 12000, 
        estimatedTime: { id: "Per Bintang", en: "Per Star" } 
      },
      { 
        name: { id: "Mythical Honor (25-49 Bintang)", en: "Mythical Honor (25-49 Stars)" }, 
        pricePerStar: 16000, 
        estimatedTime: { id: "Per Bintang", en: "Per Star" } 
      },
      { 
        name: { id: "Mythical Glory (50-99 Bintang)", en: "Mythical Glory (50-99 Stars)" }, 
        pricePerStar: 22000, 
        estimatedTime: { id: "Per Bintang", en: "Per Star" } 
      },
      { 
        name: { id: "Mythic Immortal (100+ Bintang)", en: "Mythic Immortal (100+ Stars)" }, 
        pricePerStar: 30000, 
        estimatedTime: { id: "Per Bintang", en: "Per Star" } 
      }
    ],
    packages: [
      { 
        name: { id: "Paket Order 10 Bintang (Free 1★)", en: "10 Stars Order Bundle (Free 1★)" }, 
        price: { id: "Harga Normal", en: "Standard Price" }, 
        bonus: { id: "Order 10 Bintang FREE 1 Bintang (Total 11★)", en: "Order 10 Stars FREE 1 Star (Total 11★)" }, 
        speed: { id: "Per Bintang", en: "Per Star" } 
      },
      { 
        name: { id: "Paket Epic ke Legend (25 Bintang)", en: "Epic to Legend Bundle (25 Stars)" }, 
        price: "Rp 125.000", 
        bonus: { id: "Order 10★ Free 1★ (Dapat Bonus 2★)", en: "Order 10★ Free 1★ (Get 2★ Bonus)" }, 
        speed: { id: "1-2 Hari", en: "1-2 Days" } 
      },
      { 
        name: { id: "Paket Legend ke Mythic (25 Bintang)", en: "Legend to Mythic Bundle (25 Stars)" }, 
        price: "Rp 175.000", 
        bonus: { id: "Order 10★ Free 1★ (Dapat Bonus 2★)", en: "Order 10★ Free 1★ (Get 2★ Bonus)" }, 
        speed: { id: "1-2 Hari", en: "1-2 Days" } 
      },
      { 
        name: { id: "Paket Mythic ke Honor (25 Bintang)", en: "Mythic to Honor Bundle (25 Stars)" }, 
        price: "Rp 300.000", 
        bonus: { id: "Order 10★ Free 1★ (Dapat Bonus 2★)", en: "Order 10★ Free 1★ (Get 2★ Bonus)" }, 
        speed: { id: "2-3 Hari", en: "2-3 Days" } 
      }
    ]
  },
  {
    id: "wuwa",
    name: "Wuthering Waves",
    shortName: "WUWA",
    category: "Action RPG & Open World",
    banner: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=800&q=80",
    roles: {
      id: ["Exploration Map", "Story & Companion Quest", "Jasa Rawat Akun Harian", "Event Farming"],
      en: ["Map Exploration", "Story & Companion Quests", "Daily Account Care", "Event Farming"]
    },
    features: {
      id: [
        "Eksplorasi map teliti (Huanglong, Rinascita, LahaiRoi, Mengzhou)",
        "Jasa Rawat Akun 15 & 30 Hari (Daily, Waveplate, Weekly, Endgame, Holo)",
        "Pengerjaan Main Story, Exploration, Companion & Side Quests",
        "Event berjalan 100% tuntas, akun aman & anti hackback"
      ],
      en: [
        "Detailed map exploration (Huanglong, Rinascita, LahaiRoi, Mengzhou)",
        "15 & 30-Day Daily Account Care (Waveplates, Weekly, Endgame, Holo)",
        "Main Story, Exploration, Companion & Side Quests completion",
        "100% event completion, safe account & anti-hackback guarantee"
      ]
    },
    ranks: [
      // 1. Astrites
      { name: "1.600 Astrites", category: "astrites", pricePerStar: 18000, estimatedTime: { id: "1-2 Jam", en: "1-2 Hours" } },
      // 2. Quests
      { name: "Main Story Quest", category: "quest", pricePerStar: 10000, estimatedTime: { id: "Per Quest", en: "Per Quest" } },
      { name: "Exploration Quest", category: "quest", pricePerStar: 7000, estimatedTime: { id: "Per Quest", en: "Per Quest" } },
      { name: "Companion Story Quest", category: "quest", pricePerStar: 7000, estimatedTime: { id: "Per Quest", en: "Per Quest" } },
      { name: "Side Quests", category: "quest", pricePerStar: 2000, estimatedTime: { id: "Per Quest", en: "Per Quest" } },
      // 3. Exploration
      { 
        name: { id: "Exploration Huanglong", en: "Huanglong Exploration" }, 
        category: "exploration", 
        pricePerStar: 160000, 
        estimatedTime: { id: "2-3 Hari", en: "2-3 Days" } 
      },
      { 
        name: { id: "Exploration Rinascita", en: "Rinascita Exploration" }, 
        category: "exploration", 
        pricePerStar: 115000, 
        estimatedTime: { id: "1-2 Hari", en: "1-2 Days" } 
      },
      { 
        name: { id: "Exploration LahaiRoi", en: "LahaiRoi Exploration" }, 
        category: "exploration", 
        pricePerStar: 275000, 
        estimatedTime: { id: "3-4 Hari", en: "3-4 Days" } 
      },
      { 
        name: { id: "Exploration Mengzhou", en: "Mengzhou Exploration" }, 
        category: "exploration", 
        pricePerStar: 115000, 
        estimatedTime: { id: "1-2 Hari", en: "1-2 Days" } 
      },
      // 4. Rawat Akun
      { 
        name: { id: "Rawat Akun 15 Hari (Basic)", en: "Account Care 15 Days (Basic)" }, 
        category: "rawat-akun", 
        pricePerStar: 18000, 
        estimatedTime: { id: "15 Hari", en: "15 Days" } 
      },
      { 
        name: { id: "Rawat Akun 15 Hari (Standard)", en: "Account Care 15 Days (Standard)" }, 
        category: "rawat-akun", 
        pricePerStar: 30000, 
        estimatedTime: { id: "15 Hari", en: "15 Days" } 
      },
      { 
        name: { id: "Rawat Akun 30 Hari (Basic)", en: "Account Care 30 Days (Basic)" }, 
        category: "rawat-akun", 
        pricePerStar: 33000, 
        estimatedTime: { id: "30 Hari", en: "30 Days" } 
      },
      { 
        name: { id: "Rawat Akun 30 Hari (Standard)", en: "Account Care 30 Days (Standard)" }, 
        category: "rawat-akun", 
        pricePerStar: 55000, 
        estimatedTime: { id: "30 Hari", en: "30 Days" } 
      }
    ],
    packages: [
      { 
        name: { id: "Paket Rawat 15 Hari Basic + 5 Side Quests", en: "15-Day Basic Care + 5 Side Quests" }, 
        price: "Rp 27.440", 
        bonus: { id: "Diskon 2% (Hemat Rp 560)", en: "2% Discount (Save Rp 560)" }, 
        speed: { id: "15 Hari", en: "15 Days" } 
      },
      { 
        name: { id: "Paket Rawat Akun 15 Hari Premium", en: "15-Day Premium Account Care" }, 
        price: "Rp 49.000", 
        bonus: { id: "Diskon 2% (Hemat Rp 1.000)", en: "2% Discount (Save Rp 1,000)" }, 
        speed: { id: "15 Hari", en: "15 Days" } 
      },
      { 
        name: { id: "Paket Rawat Akun 30 Hari Premium + Holo", en: "30-Day Premium Care + Hologram" }, 
        price: "Rp 88.200", 
        bonus: { id: "Diskon 2% (Hemat Rp 1.800)", en: "2% Discount (Save Rp 1,800)" }, 
        speed: { id: "30 Hari", en: "30 Days" } 
      },
      { 
        name: { id: "Paket Quest Rush (2 Main + 2 Companion + 5 Side)", en: "Quest Rush Bundle (2 Main + 2 Companion + 5 Side)" }, 
        price: "Rp 43.120", 
        bonus: { id: "Diskon 2% (Hemat Rp 880)", en: "2% Discount (Save Rp 880)" }, 
        speed: { id: "1-2 Hari", en: "1-2 Days" } 
      },
      { 
        name: { id: "Paket Eksplorasi (Rinascita + Mengzhou)", en: "Exploration Bundle (Rinascita + Mengzhou)" }, 
        price: "Rp 225.400", 
        bonus: { id: "Diskon 2% (Hemat Rp 4.600)", en: "2% Discount (Save Rp 4,600)" }, 
        speed: { id: "2-3 Hari", en: "2-3 Days" } 
      }
    ]
  },
  {
    id: "roblox",
    name: "Roblox",
    shortName: "RBLX",
    category: "Anime Vanguards & Grinding",
    banner: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    roles: {
      id: ["Anime Vanguards Specialist", "Secret Unit Hunting", "Evolution Grinding"],
      en: ["Anime Vanguards Specialist", "Secret Unit Hunting", "Evolution Grinding"]
    },
    features: {
      id: [
        "100% Pengerjaan Manual / Handplay tanpa script auto-ban",
        "Proses hunting & grinding cepat dan aman",
        "Unit & drop dijamin masuk ke inventory",
        "Bisa request jam pengerjaan online"
      ],
      en: [
        "100% Manual Handplay without ban-risk scripts",
        "Fast & secure hunting and grinding process",
        "Units & drops guaranteed in inventory",
        "Flexible online play schedule upon request"
      ]
    },
    ranks: [
      { name: "GET FULL ICHIGO VANGUARD", subGame: "anime-vanguard", pricePerStar: 150000, estimatedTime: { id: "1-2 Hari", en: "1-2 Days" } },
      { name: "GET AIZEN", subGame: "anime-vanguard", pricePerStar: 25000, estimatedTime: { id: "2-4 Jam", en: "2-4 Hours" } },
      { name: "GET ULQIORA", subGame: "anime-vanguard", pricePerStar: 30000, estimatedTime: { id: "3-5 Jam", en: "3-5 Hours" } },
      { name: "GET RUKIA VANGUARD", subGame: "anime-vanguard", pricePerStar: 75000, estimatedTime: { id: "1 Hari", en: "1 Day" } },
      { name: "GET MAKIMA", subGame: "anime-vanguard", pricePerStar: 45000, estimatedTime: { id: "4-6 Jam", en: "4-6 Hours" } },
      { name: "EVO DENJI", subGame: "anime-vanguard", pricePerStar: 95000, estimatedTime: { id: "1 Hari", en: "1 Day" } }
    ],
    packages: [
      { 
        name: { id: "Paket Bleach Duo (Aizen + Ulquiora)", en: "Bleach Duo Bundle (Aizen + Ulquiora)" }, 
        price: "Rp 53.900", 
        bonus: { id: "Diskon 2% (Hemat Rp 1.100)", en: "2% Discount (Save Rp 1,100)" }, 
        speed: { id: "1 Hari", en: "1 Day" } 
      },
      { 
        name: { id: "Paket Chainsaw Duo (Makima + Evo Denji)", en: "Chainsaw Duo Bundle (Makima + Evo Denji)" }, 
        price: "Rp 137.200", 
        bonus: { id: "Diskon 2% (Hemat Rp 2.800)", en: "2% Discount (Save Rp 2,800)" }, 
        speed: { id: "1-2 Hari", en: "1-2 Days" } 
      },
      { 
        name: { id: "Paket Vanguard Bleach (Ichigo + Rukia)", en: "Bleach Vanguard Bundle (Ichigo + Rukia)" }, 
        price: "Rp 220.500", 
        bonus: { id: "Diskon 2% (Hemat Rp 4.500)", en: "2% Discount (Save Rp 4,500)" }, 
        speed: { id: "2 Hari", en: "2 Days" } 
      }
    ]
  }
];

export const getJokiGames = (lang = 'id') => {
  return jokiGamesData.map(g => ({
    ...g,
    roles: g.roles[lang] || g.roles.id,
    features: g.features[lang] || g.features.id,
    ranks: g.ranks.map(r => ({
      ...r,
      name: typeof r.name === 'object' ? (r.name[lang] || r.name.id) : r.name,
      estimatedTime: typeof r.estimatedTime === 'object' ? (r.estimatedTime[lang] || r.estimatedTime.id) : r.estimatedTime
    })),
    packages: g.packages.map(p => ({
      ...p,
      name: typeof p.name === 'object' ? (p.name[lang] || p.name.id) : p.name,
      price: typeof p.price === 'object' ? (p.price[lang] || p.price.id) : p.price,
      bonus: typeof p.bonus === 'object' ? (p.bonus[lang] || p.bonus.id) : p.bonus,
      speed: typeof p.speed === 'object' ? (p.speed[lang] || p.speed.id) : p.speed
    }))
  }));
};

export const jokiGames = getJokiGames('id');

// Raw multi-language Premium Apps
const premiumAppsData = [
  {
    id: "duolingo",
    name: "Duolingo Super",
    fullName: {
      id: "Duolingo SUPER 12 BULAN (VIA CODE REDEEM)",
      en: "Duolingo SUPER 12 MONTHS (VIA CODE REDEEM)"
    },
    category: {
      id: "Edukasi & Bahasa",
      en: "Education & Language"
    },
    duration: {
      id: "12 Bulan",
      en: "12 Months"
    },
    price: 50000,
    priceFormatted: "Rp 50.000",
    method: "VIA CODE REDEEM",
    methodBadge: "Code Redeem",
    badgeColor: "bg-green-600",
    description: {
      id: "Belajar bahasa asing tanpa batas nyawa (unlimited hearts), bebas iklan, dan review kesalahan otomatis.",
      en: "Learn foreign languages with unlimited hearts, ad-free experience, and automated mistake review."
    },
    note: {
      id: "RECOMMENDED TO TRY, setelah pembayaran harus langsung dipakai, redeemnya segampang 1+1 = 2, no garansi",
      en: "RECOMMENDED TO TRY, redeem immediately after purchase, super easy activation (1+1=2), no warranty"
    },
    features: {
      id: ["Unlimited Hearts (Tanpa Batas)", "Bebas Iklan 100%", "Practice Hub & Mistake Review", "Private Account Resmi"],
      en: ["Unlimited Hearts", "100% Ad-Free", "Practice Hub & Mistake Review", "Official Private Account"]
    },
    icon: "Languages"
  },
  {
    id: "ilovepdf",
    name: "iLovePDF Premium",
    fullName: {
      id: "Ilove PDF PREMIUM 12 BULAN (VIA AKUN SELLER)",
      en: "Ilove PDF PREMIUM 12 MONTHS (SELLER ACCOUNT)"
    },
    category: {
      id: "Office & Utility",
      en: "Office & Utility"
    },
    duration: {
      id: "11 – 12 Bulan",
      en: "11 – 12 Months"
    },
    price: 50000,
    priceFormatted: "Rp 50.000",
    method: "VIA AKUN SELLER",
    methodBadge: "Akun Seller",
    badgeColor: "bg-red-600",
    description: {
      id: "Akses tanpa batas semua fitur edit, convert, compress, OCR, dan sign PDF kualitas tinggi tanpa limit ukuran file.",
      en: "Unlimited access to all PDF edit, convert, compress, OCR, and sign tools with no file size limits."
    },
    note: {
      id: "RECOMMENDED TO TRY, setelah pembayaran harus langsung dipakai, redeemnya segampang 1+1 = 2, no garansi",
      en: "RECOMMENDED TO TRY, activate immediately after payment, simple setup, no warranty"
    },
    features: {
      id: ["OCR scan PDF to Word akurat", "Unlimited batch convert & edit", "Tanpa batasan ukuran file", "Private Account"],
      en: ["Accurate OCR PDF to Word", "Unlimited batch convert & edit", "No file size limitations", "Private Account"]
    },
    icon: "FileText"
  },
  {
    id: "youtube",
    name: "YouTube + Music Premium",
    fullName: {
      id: "YOUTUBE + MUSIC PREMIUM (VIA INVITE)",
      en: "YOUTUBE + MUSIC PREMIUM (VIA INVITE)"
    },
    category: {
      id: "Streaming & Entertainment",
      en: "Streaming & Entertainment"
    },
    duration: {
      id: "1 Bulan",
      en: "1 Month"
    },
    price: 12000,
    priceFormatted: "Rp 12.000",
    method: "VIA INVITE",
    methodBadge: "Via Invite",
    badgeColor: "bg-red-700",
    description: {
      id: "Nonton video YouTube & dengar lagu YouTube Music tanpa jeda iklan, bisa putar di latar belakang dan download offline.",
      en: "Ad-free YouTube videos & YouTube Music, background play, and offline downloads."
    },
    note: {
      id: "Bagusnya order selain dimalam hari, only for indo, hanya butuh emailmu, garansi 1 bulan",
      en: "Best to order during daytime, requires email only, 1-month warranty"
    },
    features: {
      id: ["Bebas Iklan Video & Musik", "Putar di Latar Belakang (PIP)", "YouTube Music Premium Included", "Garansi 1 Bulan"],
      en: ["Ad-Free Video & Music", "Background Playback (PIP)", "YouTube Music Premium Included", "1-Month Warranty"]
    },
    icon: "PlayCircle"
  },
  {
    id: "adobe",
    name: "Adobe Express Premium",
    fullName: {
      id: "Adobe Express PREMIUM 12 BULAN (VIA CODE REDEEM)",
      en: "Adobe Express PREMIUM 12 MONTHS (VIA CODE REDEEM)"
    },
    category: {
      id: "Design & AI Creative",
      en: "Design & Creative AI"
    },
    duration: {
      id: "12 Bulan",
      en: "12 Months"
    },
    price: 50000,
    priceFormatted: "Rp 50.000",
    method: "VIA CODE REDEEM",
    methodBadge: "Code Redeem",
    badgeColor: "bg-indigo-600",
    description: {
      id: "Tool desain grafis AI dari Adobe. Ribuan template premium, generative AI text-to-image, remove background 1-klik, dan font Adobe.",
      en: "Adobe AI graphic design tool. Thousands of premium templates, text-to-image AI, 1-click background removal, and Adobe Fonts."
    },
    note: {
      id: "RECOMMENDED TO TRY, setelah pembayaran harus langsung dipakai, redeemnya segampang 1+1 = 2, no garansi",
      en: "RECOMMENDED TO TRY, redeem immediately after purchase, super easy code activation, no warranty"
    },
    features: {
      id: ["Akses Adobe Firefly AI", "Remove background instan", "20.000+ Adobe Fonts resmi", "Private Account Resmi"],
      en: ["Adobe Firefly AI Access", "Instant Background Removal", "20,000+ Official Adobe Fonts", "Official Private Account"]
    },
    icon: "Palette"
  },
  {
    id: "canva",
    name: "Canva Edu",
    fullName: {
      id: "CANVA EDU (VIA INVITE)",
      en: "CANVA EDU (VIA INVITE)"
    },
    category: {
      id: "Desain Grafis & Presentasi",
      en: "Graphic Design & Slides"
    },
    duration: {
      id: "LIFETIME",
      en: "LIFETIME"
    },
    price: 20000,
    priceFormatted: "Rp 20.000",
    method: "VIA INVITE",
    methodBadge: "Via Invite",
    badgeColor: "bg-blue-600",
    description: {
      id: "Akses jutaan template Canva Edu premium, elemen grafis vektor, foto premium, magic resize, dan brand kit selamanya.",
      en: "Access millions of premium Canva Edu templates, vector elements, stock photos, magic resize, and brand kit forever."
    },
    note: {
      id: "Akan tetap di 1 tim selamanya, dan hanya butuh emailmu, garansi 6 bulan",
      en: "Stays in 1 team forever, email address only (no password needed), 6-month warranty"
    },
    features: {
      id: ["Akses Lifetime / Selamanya", "Hanya butuh email (tanpa password)", "Jutaan elemen & template premium", "Garansi 6 Bulan"],
      en: ["Lifetime Access", "Requires Email Only (No Password)", "Millions of Premium Elements & Templates", "6-Month Warranty"]
    },
    icon: "Sparkles"
  },
  {
    id: "netflix",
    name: "Netflix (1P1U)",
    fullName: {
      id: "Netflix (1P1U) — Rp. 40.000 [Garansi 14 Hari]",
      en: "Netflix (1P1U) — Rp 40,000 [14-Day Warranty]"
    },
    category: {
      id: "Streaming & Film",
      en: "Streaming & Movies"
    },
    duration: {
      id: "14 Hari Garansi",
      en: "14-Day Warranty"
    },
    price: 40000,
    priceFormatted: "Rp 40.000",
    method: "1 PROFILE 1 USER",
    methodBadge: "1P1U Private",
    badgeColor: "bg-red-800",
    description: {
      id: "Nonton film & series Netflix kualitas Ultra HD 4K. 1 Profile 1 User dengan PIN pribadi tanpa takut tabrakan profil.",
      en: "Watch Netflix movies & series in Ultra HD 4K. 1 Profile 1 User with private PIN, zero profile collisions."
    },
    note: {
      id: "Limit sangat jarang, Garansi 14 Hari.",
      en: "Extremely rare limits, full 14-Day Warranty."
    },
    features: {
      id: ["Ultra HD 4K Support", "1 Profile 1 User (PIN Private)", "Limit Sangat Jarang", "Garansi 14 Hari Penuh"],
      en: ["Ultra HD 4K Quality", "1 Profile 1 User (Private PIN)", "Extremely Rare Limits", "Full 14-Day Warranty"]
    },
    icon: "Film"
  }
];

export const getPremiumApps = (lang = 'id') => {
  return premiumAppsData.map(app => ({
    ...app,
    fullName: typeof app.fullName === 'object' ? (app.fullName[lang] || app.fullName.id) : app.fullName,
    category: typeof app.category === 'object' ? (app.category[lang] || app.category.id) : app.category,
    duration: typeof app.duration === 'object' ? (app.duration[lang] || app.duration.id) : app.duration,
    description: typeof app.description === 'object' ? (app.description[lang] || app.description.id) : app.description,
    note: typeof app.note === 'object' ? (app.note[lang] || app.note.id) : app.note,
    features: app.features[lang] || app.features.id
  }));
};

export const premiumApps = getPremiumApps('id');

const premiumAppsNotesData = {
  id: [
    "Produk diatas tidak selamanya ada, buruan beli sebelum produknya tidak ada lagi.",
    "Tidak menjual sharing acc (semua private acc).",
    "Tidak menjual crack/mod apk (semua pakai apk asli)."
  ],
  en: [
    "Products above are limited-stock, order now before slots run out.",
    "No shared accounts (all accounts are 100% private).",
    "No cracked/mod APKs (all applications are official & genuine)."
  ]
};

export const getPremiumAppsNotes = (lang = 'id') => premiumAppsNotesData[lang] || premiumAppsNotesData.id;

export const premiumAppsNotes = getPremiumAppsNotes('id');

export const initialTestimonials = [];

const imageTestimonialsData = [
  // Wuthering Waves (5 images)
  {
    id: "wuwa-1",
    game: "Wuthering Waves",
    gameCategory: "wuwa",
    title: { id: "Testimoni Pengerjaan WuWa #1", en: "WuWa Boosting Proof #1" },
    image: "/testimoni-wuwa/Group 1.png"
  },
  {
    id: "wuwa-2",
    game: "Wuthering Waves",
    gameCategory: "wuwa",
    title: { id: "Testimoni Pengerjaan WuWa #2", en: "WuWa Boosting Proof #2" },
    image: "/testimoni-wuwa/Group 2.png"
  },
  {
    id: "wuwa-3",
    game: "Wuthering Waves",
    gameCategory: "wuwa",
    title: { id: "Testimoni Pengerjaan WuWa #3", en: "WuWa Boosting Proof #3" },
    image: "/testimoni-wuwa/Group 3.png"
  },
  {
    id: "wuwa-4",
    game: "Wuthering Waves",
    gameCategory: "wuwa",
    title: { id: "Testimoni Pengerjaan WuWa #4", en: "WuWa Boosting Proof #4" },
    image: "/testimoni-wuwa/Group 4.png"
  },
  {
    id: "wuwa-5",
    game: "Wuthering Waves",
    gameCategory: "wuwa",
    title: { id: "Testimoni Pengerjaan WuWa #5", en: "WuWa Boosting Proof #5" },
    image: "/testimoni-wuwa/Group 5.png"
  },
  // Roblox (11 images)
  {
    id: "rblx-1",
    game: "Roblox",
    gameCategory: "roblox",
    title: { id: "Bukti Transaksi & Joki Roblox #1", en: "Roblox Transaction & Boosting Proof #1" },
    image: "/testimoni-roblox/image.webp"
  },
  {
    id: "rblx-2",
    game: "Roblox",
    gameCategory: "roblox",
    title: { id: "Bukti Transaksi & Joki Roblox #2", en: "Roblox Transaction & Boosting Proof #2" },
    image: "/testimoni-roblox/image (1).webp"
  },
  {
    id: "rblx-3",
    game: "Roblox",
    gameCategory: "roblox",
    title: { id: "Bukti Transaksi & Joki Roblox #3", en: "Roblox Transaction & Boosting Proof #3" },
    image: "/testimoni-roblox/image (2).webp"
  },
  {
    id: "rblx-4",
    game: "Roblox",
    gameCategory: "roblox",
    title: { id: "Bukti Transaksi & Joki Roblox #4", en: "Roblox Transaction & Boosting Proof #4" },
    image: "/testimoni-roblox/image (3).webp"
  },
  {
    id: "rblx-5",
    game: "Roblox",
    gameCategory: "roblox",
    title: { id: "Bukti Transaksi & Joki Roblox #5", en: "Roblox Transaction & Boosting Proof #5" },
    image: "/testimoni-roblox/image (4).webp"
  },
  {
    id: "rblx-6",
    game: "Roblox",
    gameCategory: "roblox",
    title: { id: "Bukti Transaksi & Joki Roblox #6", en: "Roblox Transaction & Boosting Proof #6" },
    image: "/testimoni-roblox/image (5).webp"
  },
  {
    id: "rblx-7",
    game: "Roblox",
    gameCategory: "roblox",
    title: { id: "Bukti Transaksi & Joki Roblox #7", en: "Roblox Transaction & Boosting Proof #7" },
    image: "/testimoni-roblox/image (6).webp"
  },
  {
    id: "rblx-8",
    game: "Roblox",
    gameCategory: "roblox",
    title: { id: "Bukti Transaksi & Joki Roblox #8", en: "Roblox Transaction & Boosting Proof #8" },
    image: "/testimoni-roblox/image (7).webp"
  },
  {
    id: "rblx-9",
    game: "Roblox",
    gameCategory: "roblox",
    title: { id: "Bukti Transaksi & Joki Roblox #9", en: "Roblox Transaction & Boosting Proof #9" },
    image: "/testimoni-roblox/image (8).webp"
  },
  {
    id: "rblx-10",
    game: "Roblox",
    gameCategory: "roblox",
    title: { id: "Bukti Transaksi & Joki Roblox #10", en: "Roblox Transaction & Boosting Proof #10" },
    image: "/testimoni-roblox/image (9).webp"
  },
  {
    id: "rblx-11",
    game: "Roblox",
    gameCategory: "roblox",
    title: { id: "Bukti Transaksi & Joki Roblox #11", en: "Roblox Transaction & Boosting Proof #11" },
    image: "/testimoni-roblox/image (10).webp"
  }
];

export const getImageTestimonials = (lang = 'id') => {
  return imageTestimonialsData.map(item => ({
    ...item,
    title: typeof item.title === 'object' ? (item.title[lang] || item.title.id) : item.title
  }));
};

export const imageTestimonials = getImageTestimonials('id');

export const faqs = [
  {
    q: "Apakah proses joki game aman dari banned atau hackback?",
    a: "100% Sangat Aman! Semua proses joki dikerjakan murni dengan skill tangan (Handplay), tanpa bantuan cheat, script, bot, atau modifikasi ilegal apa pun. Login bisa menggunakan sistem QR Code atau login kode verifikasi tanpa harus bagi-bagi password rahasia jika diinginkan."
  },
  {
    q: "Bagaimana cara memesan AI Project atau kustomisasi game AI?",
    a: "Kamu bisa langsung hubungi zura-w melalui WhatsApp di 082172795156 atau email reihanfahreza012@gmail.com dengan menyertakan deskripsi kebutuhan project. Kita bisa diskusikan scope kerja, timeline, hingga integrasi langsung ke Unity engine."
  },
  {
    q: "Bisa request Hero, Role, atau jam pengerjaan joki?",
    a: "Bisa banget! Kamu bisa request hero favorit (misal Fanny, Gusion, Ling) atau request waktu pengerjaan khusus (misal hanya dimainkan saat malam hari / saat kamu sedang sekolah/kerja)."
  },
  {
    q: "Apakah aplikasi premium yang dijual aman dan legal?",
    a: "100% Aman & Asli! Kami TIDAK menjual aplikasi bajakan / crack / mod apk, dan TIDAK menjual akun sharing. Semua akun adalah private account resmi atau aktivasi invite resmi ke email pribadi Anda."
  }
];
