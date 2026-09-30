export const personalInfo = {
  name: "Reihan Fahreza",
  nickname: "Reihan (zura-w)",
  birthDate: "05-06-2006",
  phone: "082172795156",
  whatsappNumber: "6282172795156",
  email: "reihanfahreza012@gmail.com",
  domain: "zura-w.my.id",
  bio: "Mahasiswa D4 Informatika peminatan Game Technology. Memiliki latar belakang Teknik Komputer & Jaringan, serta pengalaman di bidang manufaktur elektronik. Disiplin, teliti, & cepat beradaptasi.",
  headline: "Game Tech Student • Practical AI Developer • Pro Gamer & Joki Specialist",
  campus: "Politeknik Negeri Batam",
  status: "Available for AI Projects & Joki Game",
  education: [
    {
      period: "2022 - 2025",
      institution: "SMK Negeri 7 Batam",
      major: "Teknik Komputer & Jaringan",
      desc: "Fondasi kuat dalam networking, hardware troubleshooting, dan arsitektur sistem komputer."
    },
    {
      period: "2025 - Sekarang",
      institution: "Politeknik Negeri Batam",
      major: "Teknik Informatika (Game Tech)",
      desc: "Fokus pada game engine (Unity), pemrograman gameplay, visual asset pipeline, dan integrasi Artificial Intelligence."
    }
  ],
  experience: [
    {
      year: "2024",
      place: "PT AMBER KARYA",
      role: "Electronic & Assembly Technician",
      points: [
        "Termination Crimping",
        "Assembly Kabel & Connector",
        "Quality Control Dasar",
        "Kerja Tim & Target Harian"
      ]
    },
    {
      year: "2026",
      place: "FOCUS LEARNING",
      role: "Game UI/UX & AI Workflow Specialist",
      points: [
        "Learn UI/visual design and apply it to game assets",
        "Learn practical AI for design workflows & generative game pipelines"
      ]
    }
  ],
  software: [
    { name: "FIGMA", category: "UI/UX & Design", color: "#F24E1E" },
    { name: "UNITY", category: "Game Engine", color: "#000000" },
    { name: "CANVA", category: "Graphic Design", color: "#00C4CC" },
    { name: "PYTHON", category: "AI & Scripting", color: "#3776AB" },
    { name: "PYTORCH", category: "Deep Learning", color: "#EE4C2C" },
    { name: "BLENDER", category: "3D Modeling", color: "#EA7600" }
  ]
};

export const aiProjects = [
  {
    id: "chessy",
    title: "Chessy - 1v1 & vs Bot",
    shortDesc: "Aplikasi web game catur mobile-first dengan bot AI cerdas, mode 1v1 offline pass-and-play, tracking XP & level, audio sound effects, dan skin papan catur.",
    category: "Game Tech & AI",
    tag: "Chess Engine & Bot",
    date: "Live Web App",
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1200&q=80",
    tech: ["HTML5 Canvas", "JavaScript", "Chess AI Bot", "Web Audio API", "Mobile App UI"],
    features: [
      "Mode 1v1 Pass-and-Play Offline & Bermain Lawan Bot AI",
      "Kalkulasi evaluasi langkah catur dan pendeteksi skakmat akurat",
      "True mobile app wrapper tanpa fake frame dengan navigasi mulus",
      "Pilihan skin tema papan catur, efek suara foley catur, dan BGM"
    ],
    liveSimulation: {
      type: "chess",
      samplePrompt: "Evaluasi langkah pembukaan terbaik pion putih...",
      resultStats: "Evaluation Depth 8 • Best Move: e2-e4 (King's Pawn) • Score +0.3"
    },
    githubUrl: "https://github.com/tontonanku/chessy",
    demoUrl: "https://tontonanku.github.io/chessy/"
  },
  {
    id: "ngampus",
    title: "Ngampus - Jadwal Kuliah & 3D WebGL Polibatam",
    shortDesc: "Platform web interaktif jadwal kuliah harian dan manajemen tugas mahasiswa Game Technology Polibatam dengan integrasi 3D WebGL viewer dan GSAP animation.",
    category: "Web 3D & Utility",
    tag: "WebGL & 3D Model",
    date: "Live Web App",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    tech: ["WebGL", "Google Model-Viewer 3D", "GSAP Animation", "JavaScript", "Glassmorphism"],
    features: [
      "Jadwal kuliah otomatis sesuai hari aktif mahasiswa Game Tech Polibatam",
      "Visualisasi model 3D interaktif menggunakan @google/model-viewer",
      "Animasi dinamis tech elements & transisi mulus dengan GSAP",
      "Manajemen tugas perkuliahan dan direktori kontak dosen Polibatam"
    ],
    liveSimulation: {
      type: "schedule",
      samplePrompt: "Cek jadwal aktif kuliah Game Technology hari ini...",
      resultStats: "Status: Senin Aktif • Pemrograman Game Lanjut (Lab 302) • Model 3D Loaded"
    },
    githubUrl: "https://github.com/tontonanku/ngampus",
    demoUrl: "https://tontonanku.github.io/ngampus/"
  },
  {
    id: "zuradown",
    title: "ZuraDown - Video Downloader TikTok & YouTube",
    shortDesc: "Tool web pengunduh video TikTok tanpa watermark dan video/audio YouTube (MP4 & MP3) cepat dengan antarmuka modern dan responsif.",
    category: "Web Tools & API",
    tag: "Video Downloader",
    date: "Live Web App",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80",
    tech: ["REST API", "Video Parser", "JavaScript", "FontAwesome", "Responsive CSS"],
    features: [
      "Unduh video TikTok HD tanpa watermark secara cepat",
      "Konversi dan unduh video YouTube kualitas MP4 serta audio MP3",
      "Selector platform pintar dengan auto-detect format URL link",
      "Antarmuka cepat, clean, tanpa pop-up iklan yang mengganggu"
    ],
    liveSimulation: {
      type: "downloader",
      samplePrompt: "Paste URL TikTok atau YouTube untuk parsing...",
      resultStats: "Status 200 OK • Video HD 1080p No-Watermark Ready (18.4 MB)"
    },
    githubUrl: "https://github.com/tontonanku/zuradown",
    demoUrl: "https://tontonanku.github.io/zuradown/"
  }
];

export const jokiGames = [
  {
    id: "mlbb",
    name: "Mobile Legends: Bang Bang",
    shortName: "MLBB",
    category: "MOBA Mobile",
    banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
    roles: ["All Role Specialist", "Jungler / Hyper Carry", "Roamer Shotcaller"],
    features: [
      "Winrate tinggi (rata-rata 80% - 95%)",
      "Hero request bisa disesuaikan (gratis)",
      "Privasi akun 100% aman & no chit/script",
      "Bisa Request Jam Main / Sembunyikan Hasil"
    ],
    ranks: [
      { name: "Master", pricePerStar: 3000, estimatedTime: "Per Bintang" },
      { name: "Grandmaster", pricePerStar: 4000, estimatedTime: "Per Bintang" },
      { name: "Epic", pricePerStar: 5000, estimatedTime: "Per Bintang" },
      { name: "Legend", pricePerStar: 7000, estimatedTime: "Per Bintang" },
      { name: "Mythic Biasa (1-24 Bintang)", pricePerStar: 12000, estimatedTime: "Per Bintang" },
      { name: "Mythical Honor (25-49 Bintang)", pricePerStar: 16000, estimatedTime: "Per Bintang" },
      { name: "Mythical Glory (50-99 Bintang)", pricePerStar: 22000, estimatedTime: "Per Bintang" },
      { name: "Mythic Immortal (100+ Bintang)", pricePerStar: 30000, estimatedTime: "Per Bintang" }
    ],
    packages: [
      { name: "Paket Order 10 Bintang (Free 1★)", price: "Harga Normal", bonus: "Order 10 Bintang FREE 1 Bintang (Total 11★)", speed: "Per Bintang" },
      { name: "Paket Epic ke Legend (25 Bintang)", price: "Rp 125.000", bonus: "Order 10★ Free 1★ (Dapat Bonus 2★)", speed: "1-2 Hari" },
      { name: "Paket Legend ke Mythic (25 Bintang)", price: "Rp 175.000", bonus: "Order 10★ Free 1★ (Dapat Bonus 2★)", speed: "1-2 Hari" },
      { name: "Paket Mythic ke Honor (25 Bintang)", price: "Rp 300.000", bonus: "Order 10★ Free 1★ (Dapat Bonus 2★)", speed: "2-3 Hari" }
    ]
  },
  {
    id: "wuwa",
    name: "Wuthering Waves",
    shortName: "WUWA",
    category: "Action RPG & Open World",
    banner: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=800&q=80",
    roles: ["Exploration Map", "Story & Companion Quest", "Jasa Rawat Akun Harian", "Event Farming"],
    features: [
      "Eksplorasi map teliti (Huanglong, Rinascita, LahaiRoi, Mengzhou)",
      "Jasa Rawat Akun 15 & 30 Hari (Daily, Waveplate, Weekly, Endgame, Holo)",
      "Pengerjaan Main Story, Exploration, Companion & Side Quests",
      "Event berjalan 100% tuntas, akun aman & anti hackback"
    ],
    ranks: [
      // 1. Astrites
      { name: "1.600 Astrites", category: "astrites", pricePerStar: 18000, estimatedTime: "1-2 Jam" },
      // 2. Quests
      { name: "Main Story Quest", category: "quest", pricePerStar: 10000, estimatedTime: "Per Quest" },
      { name: "Exploration Quest", category: "quest", pricePerStar: 7000, estimatedTime: "Per Quest" },
      { name: "Companion Story Quest", category: "quest", pricePerStar: 7000, estimatedTime: "Per Quest" },
      { name: "Side Quests", category: "quest", pricePerStar: 2000, estimatedTime: "Per Quest" },
      // 3. Exploration (tanpa 100%)
      { name: "Exploration Huanglong", category: "exploration", pricePerStar: 160000, estimatedTime: "2-3 Hari" },
      { name: "Exploration Rinascita", category: "exploration", pricePerStar: 115000, estimatedTime: "1-2 Hari" },
      { name: "Exploration LahaiRoi", category: "exploration", pricePerStar: 275000, estimatedTime: "3-4 Hari" },
      { name: "Exploration Mengzhou", category: "exploration", pricePerStar: 115000, estimatedTime: "1-2 Hari" },
      // 4. Rawat Akun (Premium dipindah ke paket)
      { name: "Rawat Akun 15 Hari (Basic)", category: "rawat-akun", pricePerStar: 18000, estimatedTime: "15 Hari" },
      { name: "Rawat Akun 15 Hari (Standard)", category: "rawat-akun", pricePerStar: 30000, estimatedTime: "15 Hari" },
      { name: "Rawat Akun 30 Hari (Basic)", category: "rawat-akun", pricePerStar: 33000, estimatedTime: "30 Hari" },
      { name: "Rawat Akun 30 Hari (Standard)", category: "rawat-akun", pricePerStar: 55000, estimatedTime: "30 Hari" }
    ],
    packages: [
      { name: "Paket Rawat 15 Hari Basic + 5 Side Quests", price: "Rp 27.440", bonus: "Diskon 2% (Hemat Rp 560)", speed: "15 Hari" },
      { name: "Paket Rawat Akun 15 Hari Premium", price: "Rp 49.000", bonus: "Diskon 2% (Hemat Rp 1.000)", speed: "15 Hari" },
      { name: "Paket Rawat Akun 30 Hari Premium + Holo", price: "Rp 88.200", bonus: "Diskon 2% (Hemat Rp 1.800)", speed: "30 Hari" },
      { name: "Paket Quest Rush (2 Main + 2 Companion + 5 Side)", price: "Rp 43.120", bonus: "Diskon 2% (Hemat Rp 880)", speed: "1-2 Hari" },
      { name: "Paket Eksplorasi (Rinascita + Mengzhou)", price: "Rp 225.400", bonus: "Diskon 2% (Hemat Rp 4.600)", speed: "2-3 Hari" }
    ]
  },
  {
    id: "roblox",
    name: "Roblox",
    shortName: "RBLX",
    category: "Anime Vanguards & Grinding",
    banner: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    roles: ["Anime Vanguards Specialist", "Secret Unit Hunting", "Evolution Grinding"],
    features: [
      "100% Pengerjaan Manual / Handplay tanpa script auto-ban",
      "Proses hunting & grinding cepat dan aman",
      "Unit & drop dijamin masuk ke inventory",
      "Bisa request jam pengerjaan online"
    ],
    ranks: [
      { name: "GET FULL ICHIGO VANGUARD", subGame: "anime-vanguard", pricePerStar: 150000, estimatedTime: "1-2 Hari" },
      { name: "GET AIZEN", subGame: "anime-vanguard", pricePerStar: 25000, estimatedTime: "2-4 Jam" },
      { name: "GET ULQIORA", subGame: "anime-vanguard", pricePerStar: 30000, estimatedTime: "3-5 Jam" },
      { name: "GET RUKIA VANGUARD", subGame: "anime-vanguard", pricePerStar: 75000, estimatedTime: "1 Hari" },
      { name: "GET MAKIMA", subGame: "anime-vanguard", pricePerStar: 45000, estimatedTime: "4-6 Jam" },
      { name: "EVO DENJI", subGame: "anime-vanguard", pricePerStar: 95000, estimatedTime: "1 Hari" }
    ],
    packages: [
      { name: "Paket Bleach Duo (Aizen + Ulquiora)", price: "Rp 53.900", bonus: "Diskon 2% (Hemat Rp 1.100)", speed: "1 Hari" },
      { name: "Paket Chainsaw Duo (Makima + Evo Denji)", price: "Rp 137.200", bonus: "Diskon 2% (Hemat Rp 2.800)", speed: "1-2 Hari" },
      { name: "Paket Vanguard Bleach (Ichigo + Rukia)", price: "Rp 220.500", bonus: "Diskon 2% (Hemat Rp 4.500)", speed: "2 Hari" }
    ]
  }
];

export const premiumApps = [
  {
    id: "duolingo",
    name: "Duolingo Super",
    fullName: "Duolingo SUPER 12 BULAN (VIA CODE REDEEM)",
    category: "Edukasi & Bahasa",
    duration: "12 Bulan",
    price: 50000,
    priceFormatted: "Rp 50.000",
    method: "VIA CODE REDEEM",
    methodBadge: "Code Redeem",
    badgeColor: "bg-green-600",
    description: "Belajar bahasa asing tanpa batas nyawa (unlimited hearts), bebas iklan, dan review kesalahan otomatis.",
    note: "RECOMMENDED TO TRY, setelah pembayaran harus langsung dipakai, redeemnya segampang 1+1 = 2, no garansi",
    features: ["Unlimited Hearts (Tanpa Batas)", "Bebas Iklan 100%", "Practice Hub & Mistake Review", "Private Account Resmi"],
    icon: "Languages"
  },
  {
    id: "ilovepdf",
    name: "iLovePDF Premium",
    fullName: "Ilove PDF PREMIUM 12 BULAN (VIA AKUN SELLER)",
    category: "Office & Utility",
    duration: "11 – 12 Bulan",
    price: 50000,
    priceFormatted: "Rp 50.000",
    method: "VIA AKUN SELLER",
    methodBadge: "Akun Seller",
    badgeColor: "bg-red-600",
    description: "Akses tanpa batas semua fitur edit, convert, compress, OCR, dan sign PDF kualitas tinggi tanpa limit ukuran file.",
    note: "RECOMMENDED TO TRY, setelah pembayaran harus langsung dipakai, redeemnya segampang 1+1 = 2, no garansi",
    features: ["OCR scan PDF to Word akurat", "Unlimited batch convert & edit", "Tanpa batasan ukuran file", "Private Account"],
    icon: "FileText"
  },
  {
    id: "youtube",
    name: "YouTube + Music Premium",
    fullName: "YOUTUBE + MUSIC PREMIUM (VIA INVITE)",
    category: "Streaming & Entertainment",
    duration: "1 Bulan",
    price: 12000,
    priceFormatted: "Rp 12.000",
    method: "VIA INVITE",
    methodBadge: "Via Invite",
    badgeColor: "bg-red-700",
    description: "Nonton video YouTube & dengar lagu YouTube Music tanpa jeda iklan, bisa putar di latar belakang dan download offline.",
    note: "Bagusnya order selain dimalam hari, only for indo, hanya butuh emailmu, garansi 1 bulan",
    features: ["Bebas Iklan Video & Musik", "Putar di Latar Belakang (PIP)", "YouTube Music Premium Included", "Garansi 1 Bulan"],
    icon: "PlayCircle"
  },
  {
    id: "adobe",
    name: "Adobe Express Premium",
    fullName: "Adobe Express PREMIUM 12 BULAN (VIA CODE REDEEM)",
    category: "Design & AI Creative",
    duration: "12 Bulan",
    price: 50000,
    priceFormatted: "Rp 50.000",
    method: "VIA CODE REDEEM",
    methodBadge: "Code Redeem",
    badgeColor: "bg-indigo-600",
    description: "Tool desain grafis AI dari Adobe. Ribuan template premium, generative AI text-to-image, remove background 1-klik, dan font Adobe.",
    note: "RECOMMENDED TO TRY, setelah pembayaran harus langsung dipakai, redeemnya segampang 1+1 = 2, no garansi",
    features: ["Akses Adobe Firefly AI", "Remove background instan", "20.000+ Adobe Fonts resmi", "Private Account Resmi"],
    icon: "Palette"
  },
  {
    id: "canva",
    name: "Canva Edu",
    fullName: "CANVA EDU (VIA INVITE)",
    category: "Desain Grafis & Presentasi",
    duration: "LIFETIME",
    price: 20000,
    priceFormatted: "Rp 20.000",
    method: "VIA INVITE",
    methodBadge: "Via Invite",
    badgeColor: "bg-blue-600",
    description: "Akses jutaan template Canva Edu premium, elemen grafis vektor, foto premium, magic resize, dan brand kit selamanya.",
    note: "Akan tetap di 1 tim selamanya, dan hanya butuh emailmu, garansi 6 bulan",
    features: ["Akses Lifetime / Selamanya", "Hanya butuh email (tanpa password)", "Jutaan elemen & template premium", "Garansi 6 Bulan"],
    icon: "Sparkles"
  },
  {
    id: "netflix",
    name: "Netflix (1P1U)",
    fullName: "Netflix (1P1U) — Rp. 40.000 [Garansi 14 Hari]",
    category: "Streaming & Film",
    duration: "14 Hari Garansi",
    price: 40000,
    priceFormatted: "Rp 40.000",
    method: "1 PROFILE 1 USER",
    methodBadge: "1P1U Private",
    badgeColor: "bg-red-800",
    description: "Nonton film & series Netflix kualitas Ultra HD 4K. 1 Profile 1 User dengan PIN pribadi tanpa takut tabrakan profil.",
    note: "Limit sangat jarang, Garansi 14 Hari.",
    features: ["Ultra HD 4K Support", "1 Profile 1 User (PIN Private)", "Limit Sangat Jarang", "Garansi 14 Hari Penuh"],
    icon: "Film"
  }
];

export const premiumAppsNotes = [
  "Produk diatas tidak selamanya ada, buruan beli sebelum produknya tidak ada lagi.",
  "Tidak menjual sharing acc (semua private acc).",
  "Tidak menjual crack/mod apk (semua pakai apk asli)."
];

export const initialTestimonials = [];

export const imageTestimonials = [
  // Wuthering Waves (5 images)
  {
    id: "wuwa-1",
    game: "Wuthering Waves",
    gameCategory: "wuwa",
    title: "Testimoni Pengerjaan WuWa #1",
    image: "/testimoni-wuwa/Group 1.png"
  },
  {
    id: "wuwa-2",
    game: "Wuthering Waves",
    gameCategory: "wuwa",
    title: "Testimoni Pengerjaan WuWa #2",
    image: "/testimoni-wuwa/Group 2.png"
  },
  {
    id: "wuwa-3",
    game: "Wuthering Waves",
    gameCategory: "wuwa",
    title: "Testimoni Pengerjaan WuWa #3",
    image: "/testimoni-wuwa/Group 3.png"
  },
  {
    id: "wuwa-4",
    game: "Wuthering Waves",
    gameCategory: "wuwa",
    title: "Testimoni Pengerjaan WuWa #4",
    image: "/testimoni-wuwa/Group 4.png"
  },
  {
    id: "wuwa-5",
    game: "Wuthering Waves",
    gameCategory: "wuwa",
    title: "Testimoni Pengerjaan WuWa #5",
    image: "/testimoni-wuwa/Group 5.png"
  },
  // Roblox (11 images)
  {
    id: "rblx-1",
    game: "Roblox",
    gameCategory: "roblox",
    title: "Bukti Transaksi & Joki Roblox #1",
    image: "/testimoni-roblox/image.webp"
  },
  {
    id: "rblx-2",
    game: "Roblox",
    gameCategory: "roblox",
    title: "Bukti Transaksi & Joki Roblox #2",
    image: "/testimoni-roblox/image (1).webp"
  },
  {
    id: "rblx-3",
    game: "Roblox",
    gameCategory: "roblox",
    title: "Bukti Transaksi & Joki Roblox #3",
    image: "/testimoni-roblox/image (2).webp"
  },
  {
    id: "rblx-4",
    game: "Roblox",
    gameCategory: "roblox",
    title: "Bukti Transaksi & Joki Roblox #4",
    image: "/testimoni-roblox/image (3).webp"
  },
  {
    id: "rblx-5",
    game: "Roblox",
    gameCategory: "roblox",
    title: "Bukti Transaksi & Joki Roblox #5",
    image: "/testimoni-roblox/image (4).webp"
  },
  {
    id: "rblx-6",
    game: "Roblox",
    gameCategory: "roblox",
    title: "Bukti Transaksi & Joki Roblox #6",
    image: "/testimoni-roblox/image (5).webp"
  },
  {
    id: "rblx-7",
    game: "Roblox",
    gameCategory: "roblox",
    title: "Bukti Transaksi & Joki Roblox #7",
    image: "/testimoni-roblox/image (6).webp"
  },
  {
    id: "rblx-8",
    game: "Roblox",
    gameCategory: "roblox",
    title: "Bukti Transaksi & Joki Roblox #8",
    image: "/testimoni-roblox/image (7).webp"
  },
  {
    id: "rblx-9",
    game: "Roblox",
    gameCategory: "roblox",
    title: "Bukti Transaksi & Joki Roblox #9",
    image: "/testimoni-roblox/image (8).webp"
  },
  {
    id: "rblx-10",
    game: "Roblox",
    gameCategory: "roblox",
    title: "Bukti Transaksi & Joki Roblox #10",
    image: "/testimoni-roblox/image (9).webp"
  },
  {
    id: "rblx-11",
    game: "Roblox",
    gameCategory: "roblox",
    title: "Bukti Transaksi & Joki Roblox #11",
    image: "/testimoni-roblox/image (10).webp"
  }
];

export const faqs = [
  {
    q: "Apakah proses joki game aman dari banned atau hackback?",
    a: "100% Sangat Aman! Semua proses joki dikerjakan murni dengan skill tangan (Handplay), tanpa bantuan cheat, script, bot, atau modifikasi ilegal apa pun. Login bisa menggunakan sistem QR Code atau login kode verifikasi tanpa harus bagi-bagi password rahasia jika diinginkan."
  },
  {
    q: "Bagaimana cara memesan AI Project atau kustomisasi game AI?",
    a: "Kamu bisa langsung hubungi Reihan melalui WhatsApp di 082172795156 atau email reihanfahreza012@gmail.com dengan menyertakan deskripsi kebutuhan project. Kita bisa diskusikan scope kerja, timeline, hingga integrasi langsung ke Unity engine."
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
