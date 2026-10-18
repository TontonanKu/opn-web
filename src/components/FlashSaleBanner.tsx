import React, { useState, useEffect } from 'react';
import { Zap, Clock, Copy, Check, Flame, ArrowRight, Tag } from 'lucide-react';

interface FlashSaleBannerProps {
  onNavigateToJoki?: () => void;
  onNavigateToApps?: () => void;
}

export const FlashSaleBanner: React.FC<FlashSaleBannerProps> = ({
  onNavigateToJoki,
  onNavigateToApps
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  // Dynamic countdown timer targeting tonight at 23:59:59 WIB
  const [timeLeft, setTimeLeft] = useState<{ hours: string; minutes: string; seconds: string }>({
    hours: '05',
    minutes: '42',
    seconds: '18'
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      
      const diffMs = endOfDay.getTime() - now.getTime();
      if (diffMs <= 0) {
        setTimeLeft({ hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const totalSeconds = Math.floor(diffMs / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0')
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyVoucher = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="bg-[#121212] text-white border-b-[3px] border-black py-4 px-4 sm:px-8 relative overflow-hidden">
      
      {/* Background Accent Graphics */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FF5900] opacity-20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 relative z-10">
        
        {/* Left: Flame & Title */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-1.5 bg-[#FF5900] text-white font-mono font-black text-xs px-2.5 py-1 uppercase border border-black shadow-[2px_2px_0px_#fff]">
            <Flame className="w-4 h-4 text-yellow-300 animate-bounce" />
            <span>FLASH SALE HARI INI</span>
          </div>

          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <span className="font-display font-black text-sm sm:text-base text-white tracking-wide uppercase">
                DISKON KILAT JOKI & APLIKASI
              </span>
              <span className="bg-[#FFC700] text-black font-mono font-black text-[11px] px-2 py-0.2 border border-black">
                HEMAT S/D 40%
              </span>
            </div>
            <span className="text-[11px] font-mono text-neutral-400 block mt-0.5">
              Gunakan kupon voucher sebelum waktu penawaran berakhir malam ini!
            </span>
          </div>
        </div>

        {/* Center: Live Countdown Clock */}
        <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-700 px-3.5 py-1.5 font-mono">
          <div className="flex items-center gap-1 text-[#FF5900] text-xs font-bold mr-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Sisa Waktu:</span>
          </div>
          
          <div className="flex items-center gap-1 text-sm font-black">
            <span className="bg-black text-[#FFC700] px-2 py-0.5 border border-neutral-600 rounded-none shadow-sm">
              {timeLeft.hours}
            </span>
            <span className="text-neutral-400">:</span>
            <span className="bg-black text-[#FFC700] px-2 py-0.5 border border-neutral-600 rounded-none shadow-sm">
              {timeLeft.minutes}
            </span>
            <span className="text-neutral-400">:</span>
            <span className="bg-black text-red-500 px-2 py-0.5 border border-neutral-600 rounded-none shadow-sm animate-pulse">
              {timeLeft.seconds}
            </span>
          </div>
        </div>

        {/* Right: Voucher Copy & Quick Action */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {/* Coupon Code Pill */}
          <div className="flex items-center bg-white border border-black text-black pl-2.5 pr-1 py-1 text-xs font-mono">
            <div className="flex items-center gap-1.5 font-black mr-2">
              <Tag className="w-3.5 h-3.5 text-[#FF5900]" />
              <span>ZURABARU</span>
            </div>
            <button
              type="button"
              onClick={() => handleCopyVoucher('ZURABARU')}
              className="bg-[#FFC700] hover:bg-black hover:text-[#FFC700] text-black border border-black px-2 py-0.5 text-[10px] font-bold uppercase transition-colors flex items-center gap-1"
              title="Salin kode promo untuk checkout"
            >
              {copiedCode === 'ZURABARU' ? (
                <>
                  <Check className="w-3 h-3 text-emerald-700" />
                  <span>Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Salin Kode</span>
                </>
              )}
            </button>
          </div>

          {/* Direct CTA Buttons */}
          <div className="flex items-center gap-1.5">
            {onNavigateToJoki && (
              <button
                type="button"
                onClick={onNavigateToJoki}
                className="bg-[#FFC700] hover:bg-[#FFD633] text-black font-mono font-black text-xs py-1.5 px-3 border border-black shadow-[2px_2px_0px_#fff] flex items-center gap-1 transition-all"
              >
                <span>Joki</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}

            {onNavigateToApps && (
              <button
                type="button"
                onClick={onNavigateToApps}
                className="bg-[#FF5900] hover:bg-[#ff6e1f] text-white font-mono font-black text-xs py-1.5 px-3 border border-black shadow-[2px_2px_0px_#fff] flex items-center gap-1 transition-all"
              >
                <span>Aplikasi</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
