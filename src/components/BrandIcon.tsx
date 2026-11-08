import React, { useState } from 'react';

interface BrandIconProps {
  id: string;
  imageUrl?: string;
  fallbackEmoji?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const REMOTE_GAME_ICONS: Record<string, string[]> = {
  wuwa: [
    'https://play-lh.googleusercontent.com/S4HjezIFmL17FpPu7Z8VzxZvFMABYUjfLkcrDSEKxpjCYIL3tWLQK76_16SDOTiZlVHm_KeoMawvC7BPcyW_=s96-rw',
    'https://cdn.discordapp.com/emojis/1534877066695278825.png'
  ],
  'anime-vanguards': [
    'https://play-lh.googleusercontent.com/QqZj22aXblAyYDxLQw-Gg0ycW0QkKhrDnwqgERZU9BMRXZnMlgXfq-94sikG5mEpt_I0lzZxcUzfLblmQgwYzUE=s96-rw'
  ],
  astrites: [
    'https://cdn.discordapp.com/emojis/1534883145789476947.png',
    '/assets/emojis/gem.png'
  ],
  rawat: [
    'https://cdn.discordapp.com/emojis/1534889221989597285.png',
    '/assets/emojis/alarm.png'
  ],
  explore: [
    'https://cdn.discordapp.com/emojis/1534883089375825940.png',
    '/assets/emojis/chart.png'
  ],
  quest: [
    'https://cdn.discordapp.com/emojis/1534879491112046622.png',
    '/assets/emojis/scroll.png'
  ]
};

export const BrandIcon: React.FC<BrandIconProps> = ({
  id,
  imageUrl,
  fallbackEmoji = '✨',
  size = 'md',
  className = ''
}) => {
  const [urlIndex, setUrlIndex] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);

  const sizeClasses = {
    xs: 'w-5 h-5 text-[10px] rounded-md',
    sm: 'w-9 h-9 text-base rounded-xl',
    md: 'w-11 h-11 text-xl rounded-xl',
    lg: 'w-14 h-14 text-2xl rounded-2xl',
    xl: 'w-16 h-16 text-3xl rounded-2xl'
  }[size];

  const svgSizeClasses = {
    xs: 'w-3.5 h-3.5',
    sm: 'w-6 h-6',
    md: 'w-7 h-7',
    lg: 'w-9 h-9',
    xl: 'w-11 h-11'
  }[size];

  const key = id.toLowerCase();

  // 1. NETFLIX & NETFLIX GACHA — Official Dark #141414 + Crimson Red "N" Ribbon
  if (key === 'netflix' || key === 'netflix-gacha') {
    return (
      <div
        className={`${sizeClasses} bg-[#141414] border border-neutral-800 flex items-center justify-center shrink-0 shadow-sm ${className}`}
      >
        <svg viewBox="0 0 24 24" className={`${svgSizeClasses}`}>
          <path
            fill="#B1060F"
            d="M5.398 0v24l3.835-1.158V0H5.398zm9.369 0v22.842L18.602 24V0h-3.835z"
          />
          <path
            fill="#E50914"
            d="M5.398 0l9.369 22.842L18.602 24 9.233 0H5.398z"
          />
        </svg>
      </div>
    );
  }

  // 1B. DISNEY+ GACHA — Official Dark Navy-Teal Gradient + Iconic Disney+ Arch & Plus Emblem
  if (key === 'disney' || key === 'disney-gacha') {
    return (
      <div
        className={`${sizeClasses} bg-gradient-to-br from-[#040814] via-[#0A1738] to-[#0D315C] border border-[#1E40AF]/50 flex items-center justify-center shrink-0 shadow-sm ${className}`}
      >
        <svg viewBox="0 0 36 36" className="w-4/5 h-4/5">
          {/* Shooting Star Arch */}
          <path
            d="M6 16c4.5-6.5 14-8.5 21.5-3.5"
            fill="none"
            stroke="#38BDF8"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Stylized "D" + "+" */}
          <text
            x="14"
            y="25"
            textAnchor="middle"
            fill="#FFFFFF"
            fontFamily="serif"
            fontWeight="900"
            fontSize="16"
          >
            D
          </text>
          <path
            d="M25.5 15.5v7M22 19h7"
            stroke="#38BDF8"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  // 2. SPOTIFY — Official Dark #121212 + #1DB954 Spotify Soundwave Circle
  if (key === 'spotify') {
    return (
      <div
        className={`${sizeClasses} bg-[#121212] border border-neutral-800 flex items-center justify-center shrink-0 shadow-sm ${className}`}
      >
        <svg viewBox="0 0 24 24" className={`${svgSizeClasses} fill-[#1DB954]`}>
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      </div>
    );
  }

  // 3. YOUTUBE — Official Vivid Red #FF0000 App Badge with Crisp White Play Triangle
  if (key === 'youtube') {
    return (
      <div
        className={`${sizeClasses} bg-[#FF0000] border border-[#CC0000] flex items-center justify-center shrink-0 shadow-sm ${className}`}
      >
        <svg viewBox="0 0 24 24" className={`${svgSizeClasses} fill-white`}>
          <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18a1 1 0 0 0 0-1.69L9.54 5.98A.998.998 0 0 0 8 6.82z" />
        </svg>
      </div>
    );
  }

  // 4. CANVA — Official Teal-to-Purple Gradient + White Circle & Cursive "C" Emblem
  if (key === 'canva') {
    return (
      <div
        className={`${sizeClasses} bg-gradient-to-br from-[#00C4CC] via-[#4855E8] to-[#7D2AE8] flex items-center justify-center shrink-0 shadow-sm ${className}`}
      >
        <svg viewBox="0 0 36 36" className="w-4/5 h-4/5">
          <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
          <path
            fill="#FFFFFF"
            d="M22.8 21.6c-1.1 1.8-2.9 3.1-5.1 3.1-2.8 0-4.6-2.1-4.6-5.2 0-4.1 2.7-7.8 6.3-7.8 1.9 0 3.1 1 3.1 2.4 0 1.4-1 2.5-2.1 2.5-.5 0-.8-.2-.8-.6 0-.4.5-.8.5-1.5 0-.6-.5-1-1.3-1-2.1 0-3.5 3.1-3.5 6.1 0 2.1 1.1 3.3 2.7 3.3 1.5 0 2.8-.9 3.7-2.2l1.1.9z"
          />
        </svg>
      </div>
    );
  }

  // 5. CAPCUT — Official White App Badge with Crisp Black CapCut Scissor/Bowtie Vector
  if (key === 'capcut') {
    return (
      <div
        className={`${sizeClasses} bg-white border-2 border-neutral-200 flex items-center justify-center shrink-0 shadow-sm ${className}`}
      >
        <svg viewBox="0 0 24 24" className={`${svgSizeClasses} fill-neutral-950`}>
          <path d="M3.5 6.5A2.5 2.5 0 0 1 6 4h8.5a2.5 2.5 0 0 1 2.45 2.01l3.55-1.78v2.68l-6.12 3.06L12 8.78l2.5-1.25V6.5a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0-.5.5v1.88l6.5 3.25 8.5 4.25v2.68l-3.55-1.78A2.5 2.5 0 0 1 14.5 19H6a2.5 2.5 0 0 1-2.5-2.5v-2.62l6.12-3.06-6.12-3.06V6.5zm2 8.38V16.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-1.03l-2.5-1.25-6.5 3.25v-2.59z" />
        </svg>
      </div>
    );
  }

  // 6. ADOBE EXPRESS — Official Adobe Red #FA0F00 + Crisp Geometric Adobe "A" Emblem
  if (key === 'adobe') {
    return (
      <div
        className={`${sizeClasses} bg-[#FA0F00] border border-[#D00C00] flex items-center justify-center shrink-0 shadow-sm ${className}`}
      >
        <svg viewBox="0 0 24 24" className={`${svgSizeClasses} fill-white`}>
          <path d="M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425h-3.71zM8.884 1.376H0v21.248L8.884 1.376zm15.116 0h-8.884L24 22.624V1.376z" />
        </svg>
      </div>
    );
  }

  // 7. DUOLINGO — Full-Bleed Green Owl App Icon (No Gray Margin)
  if (key === 'duolingo') {
    return (
      <div
        className={`${sizeClasses} bg-[#58CC02] border border-[#46A302] flex items-center justify-center shrink-0 overflow-hidden shadow-sm ${className}`}
      >
        <img
          src="/assets/emojis/duolingo.png"
          alt="Duolingo Super"
          className="w-full h-full object-cover scale-105"
          loading="lazy"
        />
      </div>
    );
  }

  // 8. ILOVEPDF — Crisp Vector "I ❤️ PDF" Badge on Pure White Card
  if (key === 'ilovepdf') {
    return (
      <div
        className={`${sizeClasses} bg-white border-2 border-neutral-200 flex items-center justify-center shrink-0 overflow-hidden shadow-sm ${className}`}
      >
        <svg viewBox="0 0 48 48" className="w-4/5 h-4/5">
          {/* Bold "I" */}
          <path fill="#111827" d="M7 9h9v3.5h-2.3v10H16V26H7v-3.5h2.3v-10H7V9z" />
          {/* Red Heart with Page Fold */}
          <path
            fill="#E5322D"
            d="M31.5 8.5c-2.6 0-4.8 1.5-5.8 3.7-1-2.2-3.2-3.7-5.8-3.7-3.6 0-6.4 2.9-6.4 6.5 0 5.4 12.2 12.5 12.2 12.5S38 20.4 38 15c0-3.6-2.9-6.5-6.5-6.5z"
          />
          <polygon fill="#FFFFFF" points="31.5,9.5 31.5,16 37.5,16" />
          {/* Bold "PDF" */}
          <text
            x="24"
            y="41"
            textAnchor="middle"
            fill="#111827"
            fontFamily="sans-serif"
            fontWeight="900"
            fontSize="14"
            letterSpacing="-0.5"
          >
            PDF
          </text>
        </svg>
      </div>
    );
  }

  // 9. ROBLOX — Official Dark #111216 Badge + Iconic Tilted Square Logo
  if (key === 'roblox') {
    return (
      <div
        className={`${sizeClasses} bg-[#111216] border border-neutral-800 flex items-center justify-center shrink-0 shadow-sm ${className}`}
      >
        <svg viewBox="0 0 24 24" className={`${svgSizeClasses} fill-white`}>
          <path d="M5.164 0L.16 18.928 18.836 24 23.84 5.072 5.164 0zm9.086 14.37l-4.725-1.283 1.26-4.756 4.725 1.283-1.26 4.756z" />
        </svg>
      </div>
    );
  }

  // 10. ANIME ADVENTURES — Full-Bleed Square Game Artwork (No Gray Border)
  if (key === 'anime-adventures') {
    return (
      <div
        className={`${sizeClasses} bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 overflow-hidden shadow-sm ${className}`}
      >
        <img
          src="/assets/emojis/anime_adventures.png"
          alt="Anime Adventures"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  // 11. WUTHERING WAVES & ANIME VANGUARDS & WUWA CHARACTER SECTIONS
  if (REMOTE_GAME_ICONS[key] && !imgFailed) {
    const candidates = REMOTE_GAME_ICONS[key];
    const currentSrc = candidates[urlIndex] || imageUrl;
    const isFullBleedGame = key === 'wuwa' || key === 'anime-vanguards';

    if (currentSrc) {
      return (
        <div
          className={`${sizeClasses} ${
            isFullBleedGame
              ? 'bg-neutral-900 border border-neutral-800'
              : 'bg-gradient-to-br from-neutral-900 to-[#2A0808] border border-[#7A0B0B]/40 p-1'
          } flex items-center justify-center shrink-0 overflow-hidden shadow-sm ${className}`}
        >
          <img
            src={currentSrc}
            alt={id}
            className={isFullBleedGame ? 'w-full h-full object-cover' : 'w-full h-full object-contain'}
            loading="lazy"
            onError={() => {
              if (urlIndex + 1 < candidates.length) {
                setUrlIndex(urlIndex + 1);
              } else {
                setImgFailed(true);
              }
            }}
          />
        </div>
      );
    }
  }

  // Fallback for Wuthering Waves if offline
  if (key === 'wuwa') {
    return (
      <div
        className={`${sizeClasses} bg-gradient-to-br from-[#1A1C23] via-[#0F1117] to-[#7A0B0B] border border-amber-500/40 flex items-center justify-center shrink-0 shadow-sm ${className}`}
      >
        <svg viewBox="0 0 24 24" className={`${svgSizeClasses} fill-amber-400`}>
          <path d="M12 2L9.5 8.5 3 9.5l5 4.5-1.5 6.5L12 17l5.5 3.5L16 14l5-4.5-6.5-1L12 2z" />
        </svg>
      </div>
    );
  }

  // 12. APLIKASI PREMIUM CATEGORY ICON ("apps")
  if (key === 'apps') {
    return (
      <div
        className={`${sizeClasses} bg-gradient-to-br from-[#7A0B0B] to-[#1F0505] border border-[#991B1B] flex items-center justify-center shrink-0 shadow-sm ${className}`}
      >
        <svg viewBox="0 0 24 24" className={`${svgSizeClasses} fill-white`}>
          <rect x="3" y="3" width="7.5" height="7.5" rx="2" fill="#E50914" />
          <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" fill="#1DB954" />
          <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" fill="#00C4CC" />
          <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" fill="#FFFFFF" />
        </svg>
      </div>
    );
  }

  // 13. DISCORD & ACC OLD & SERVER BOOST
  if (key === 'discord' || key === 'acc-old') {
    return (
      <div
        className={`${sizeClasses} ${
          key === 'acc-old' ? 'bg-[#1E1F22] border border-[#5865F2]' : 'bg-[#5865F2]'
        } flex items-center justify-center shrink-0 shadow-sm ${className}`}
      >
        <svg
          viewBox="0 0 24 24"
          className={`${svgSizeClasses} ${key === 'acc-old' ? 'fill-[#5865F2]' : 'fill-white'}`}
        >
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
        </svg>
      </div>
    );
  }

  // 14. DISCORD SERVER BOOST ("boost-1" & "boost-3") — Official Nitro Boost Pink/Purple Diamond Gem
  if (key === 'boost-1' || key === 'boost-3') {
    return (
      <div
        className={`${sizeClasses} bg-[#1E1F22] border border-[#FF73FA]/50 flex items-center justify-center shrink-0 shadow-sm ${className}`}
      >
        <svg viewBox="0 0 24 24" className={`${svgSizeClasses}`}>
          <defs>
            <linearGradient id={`boostGrad-${key}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF73FA" />
              <stop offset="50%" stopColor="#C084FC" />
              <stop offset="100%" stopColor="#5865F2" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#boostGrad-${key})`}
            d="M12 2L4.5 9.5 12 22l7.5-12.5L12 2zm0 3.2l4.3 4.3H7.7L12 5.2zm-4.1 6.3h8.2L12 18.4l-4.1-6.9z"
          />
        </svg>
      </div>
    );
  }

  // 15. MIDDLEMAN / REKBER ("mm" & "fee") — Crimson Shield with 3D Handshake
  if (key === 'mm' || key === 'fee') {
    return (
      <div
        className={`${sizeClasses} bg-gradient-to-br from-[#7A0B0B] to-[#3B0404] border border-[#991B1B] flex items-center justify-center shrink-0 overflow-hidden shadow-sm p-1.5 ${className}`}
      >
        <img
          src="/assets/emojis/handshake.png"
          alt="Middleman Resmi"
          className="w-full h-full object-contain drop-shadow-sm"
          loading="lazy"
        />
      </div>
    );
  }

  // 16. SUB-SERVICE 3D ICONS (Gems, Leveling, Story, Carry, etc.) — Clean White/Crimson Tinted Frame with Larger Icon
  if (imageUrl) {
    return (
      <div
        className={`${sizeClasses} bg-white border-2 border-neutral-200 flex items-center justify-center shrink-0 overflow-hidden shadow-sm p-1.5 ${className}`}
      >
        <img
          src={imageUrl}
          alt={id}
          className="w-full h-full object-contain drop-shadow-sm"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      className={`${sizeClasses} bg-white border-2 border-neutral-200 flex items-center justify-center shrink-0 shadow-sm ${className}`}
    >
      <span className="select-none">{fallbackEmoji}</span>
    </div>
  );
};
