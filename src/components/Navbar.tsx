import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Zap,
  Sparkles, 
  Palette, 
  ReceiptText, 
  User, 
  LogOut, 
  Receipt, 
  Menu, 
  X, 
  LayoutDashboard,
  ChevronRight,
  LucideIcon,
  Crown,
  Check
} from 'lucide-react';

interface NavItemConfig {
  id: string;
  href: string;
  label: string;
  icon: LucideIcon;
  badgeText: string;
  badgeType: 'hot' | 'square';
}

const navItems: NavItemConfig[] = [
  {
    id: 'joki',
    href: '#joki',
    label: 'JOKI GAME',
    icon: Zap,
    badgeText: 'HOT',
    badgeType: 'hot',
  },
  {
    id: 'aplikasi',
    href: '#aplikasi',
    label: 'APLIKASI',
    icon: Sparkles,
    badgeText: '%',
    badgeType: 'square',
  },
  {
    id: 'portfolio',
    href: '#portfolio',
    label: 'AI & DESAIN',
    icon: Palette,
    badgeText: 'NEW',
    badgeType: 'hot',
  },
  {
    id: 'testimoni',
    href: '#testimoni',
    label: 'TESTIMONI',
    icon: ReceiptText,
    badgeText: 'CHECK',
    badgeType: 'square',
  },
];

export const Navbar: React.FC = () => {
  const { 
    user, 
    logout, 
    setActiveModal, 
    setViewMode, 
    orders, 
    myOrders,
    openOrderTracking
  } = useApp();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // Scroll listener to update activeSection dynamically based on viewport position
  useEffect(() => {
    const handleScroll = () => {
      // When at top near Hero banner (< 250px), no nav button is highlighted
      if (window.scrollY < 250) {
        setActiveSection('');
        return;
      }

      const sections = ['testimoni', 'portfolio', 'aplikasi', 'joki'];
      const scrollPos = window.scrollY + 200;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(id);
            return;
          }
        }
      }
      setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter orders for logged in user to show order counter badge
  const userOrders = orders.filter(o => {
    if (!user) return false;
    const matchId = o.userId && o.userId === user.id;
    const cleanUserPhone = user.phone.replace(/[^0-9]/g, '');
    const cleanOrderPhone = (o.customerPhone || '').replace(/[^0-9]/g, '');
    const matchPhone = cleanUserPhone && cleanOrderPhone && (cleanUserPhone === cleanOrderPhone);
    const matchName = o.customerName && o.customerName.toLowerCase() === user.name.toLowerCase();
    return matchId || matchPhone || matchName;
  });

  // Active / recent pending orders for this visitor / user
  const activeOrders = myOrders.filter(o => o.status === 'pending_admin' || o.status === 'processing');

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5] border-b-[3px] border-[#121212]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo brand */}
          <div className="flex items-center gap-3">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveSection('');
              }}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-11 h-11 bg-[#FFC700] border-[2.5px] border-[#121212] flex items-center justify-center font-display font-black text-2xl shadow-brutal-sm group-hover:bg-[#FF5900] group-hover:text-white transition-colors">
                Z
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-black text-2xl tracking-tighter text-[#121212] leading-none">
                    ZURA
                  </span>
                  <span className="bg-[#121212] text-[#FFC700] text-[9px] font-mono px-1.5 py-0.5 font-bold uppercase rounded-sm">
                    STORE
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="h-1 w-5 bg-checker"></span>
                  <span className="text-[9px] font-bold tracking-widest uppercase text-neutral-500 font-mono">
                    BOOST & DIGITAL
                  </span>
                </div>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links with Pop-Out Hover State from User Reference */}
          <nav className="hidden lg:flex items-center gap-3">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;
              return (
                <div key={item.id} className="relative flex flex-col items-center group py-1.5">
                  <a 
                    href={item.href}
                    onClick={() => setActiveSection(item.id)}
                    className={`font-display font-black text-xs uppercase tracking-wider py-2 px-3.5 rounded-none flex items-center gap-2 border-[2.5px] transition-all duration-150 cursor-pointer select-none ${
                      isActive
                        ? 'bg-[#FFD43B] text-black border-black shadow-[4px_4px_0px_#000] -translate-x-0.5 -translate-y-1'
                        : 'bg-transparent text-[#121212] border-transparent group-hover:bg-[#FFD43B] group-hover:text-black group-hover:border-black group-hover:shadow-[4px_4px_0px_#000] group-hover:-translate-x-0.5 group-hover:-translate-y-1'
                    }`}
                  >
                    <Icon className="w-4 h-4 stroke-[2.5]" />
                    <span>{item.label}</span>

                    {/* Neo-brutalist Badges from reference image */}
                    {item.badgeType === 'hot' ? (
                      <span className={`font-mono font-black text-[10px] px-1.5 py-0.5 border-[1.5px] border-black transition-all ${
                        isActive
                          ? 'bg-[#FF5900] text-white shadow-[1px_1px_0px_#000]'
                          : 'bg-neutral-200/90 text-neutral-700 border-neutral-400 group-hover:bg-[#FF5900] group-hover:text-white group-hover:border-black group-hover:shadow-[1px_1px_0px_#000]'
                      }`}>
                        {item.badgeText}
                      </span>
                    ) : (
                      <span className={`w-5 h-5 flex items-center justify-center font-mono font-black text-[10px] border-[1.5px] border-black transition-all ${
                        isActive
                          ? 'bg-black text-[#FFD43B]'
                          : 'bg-[#FFD43B] text-black group-hover:bg-black group-hover:text-[#FFD43B]'
                      }`}>
                        {item.badgeText === 'CHECK' ? <Check className="w-3 h-3 stroke-[3]" /> : item.badgeText}
                      </span>
                    )}
                  </a>

                  {/* Signature Orange Underline Bar directly beneath shadow from user reference */}
                  <div 
                    className={`w-full h-[3.5px] bg-[#FF5900] mt-1.5 transition-all duration-150 origin-center ${
                      isActive 
                        ? 'opacity-100 scale-x-100' 
                        : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                    }`}
                  />
                </div>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Active order quick indicator */}
            {activeOrders.length > 0 && (
              <button
                onClick={() => openOrderTracking(activeOrders[0])}
                className="brutal-btn-orange text-xs py-2 px-3 flex items-center gap-1.5 animate-pulse"
                title="Lacak pesanan yang sedang berjalan"
              >
                <Receipt className="w-3.5 h-3.5" />
                <span className="font-mono font-bold">{activeOrders.length} Order Aktif</span>
              </button>
            )}

            {/* If logged in as Admin: Dedicated Dashboard button appears */}
            {user?.role === 'admin' && (
              <button
                onClick={() => setViewMode('admin-dashboard')}
                className="bg-[#121212] text-[#FFC700] border-2 border-black px-3.5 py-2 text-xs font-mono font-black uppercase flex items-center gap-2 shadow-[2px_2px_0px_#000] hover:bg-[#262626] transition-colors"
                title="Akses Dashboard Admin"
              >
                <Crown className="w-4 h-4 text-[#FFC700]" />
                <span>Panel Admin</span>
              </button>
            )}

            {/* User Account / Login Button */}
            {user ? (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveModal('customer-profile')}
                  className="flex items-center gap-2 bg-[#FFC700] hover:bg-[#FFD43B] border-2 border-[#121212] px-3.5 py-2 shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all group"
                  title="Buka Profil & Riwayat Pesanan Saya"
                >
                  <div className="w-5 h-5 bg-black text-[#FFC700] flex items-center justify-center font-bold text-[10px]">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-bold text-xs truncate max-w-[110px] group-hover:underline">
                    {user.name}
                  </span>
                  {userOrders.length > 0 && (
                    <span className="bg-[#FF5900] text-white font-mono font-black text-[9px] px-1.5 py-0.2 border border-black shadow-[1px_1px_0px_#000]">
                      {userOrders.length}
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="p-2 border-2 border-black bg-white hover:bg-red-50 text-neutral-700 hover:text-red-600 shadow-[2px_2px_0px_#000] transition-colors"
                  title="Keluar dari Akun"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setActiveModal('login')}
                className="brutal-btn-yellow text-xs uppercase py-2.5 px-5 flex items-center gap-2 font-display font-black tracking-wide"
              >
                <User className="w-4 h-4" />
                <span>Masuk / Akun</span>
              </button>
            )}

          </div>

          {/* Mobile hamburger menu toggle & quick actions */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Direct Admin Panel shortcut on Mobile Header */}
            {user?.role === 'admin' && (
              <button
                onClick={() => setViewMode('admin-dashboard')}
                className="bg-[#121212] text-[#FFC700] border-2 border-black px-2.5 py-1.5 text-xs font-mono font-black uppercase flex items-center gap-1.5 shadow-[2px_2px_0px_#000] active:scale-95 transition-all"
                title="Akses Dashboard Admin"
              >
                <Crown className="w-3.5 h-3.5 text-[#FFC700]" />
                <span>Panel</span>
              </button>
            )}

            {activeOrders.length > 0 && (
              <button
                onClick={() => openOrderTracking(activeOrders[0])}
                className="brutal-btn-orange text-[10px] py-1.5 px-2 flex items-center gap-1"
              >
                <Receipt className="w-3 h-3" />
                <span>{activeOrders.length}</span>
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border-2 border-[#121212] bg-[#FFC700] shadow-[2px_2px_0px_#000]"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer with Colors */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-[#121212] bg-[#FAF8F5] p-4 flex flex-col gap-2.5 shadow-lg">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => {
                  setActiveSection(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`font-display font-black text-xs py-3 px-3.5 border-2 border-black flex items-center justify-between transition-all ${
                  isActive 
                    ? 'bg-[#FFD43B] text-black shadow-[3px_3px_0px_#000] border-b-[4px] border-b-[#FF5900]' 
                    : 'bg-white text-black hover:bg-[#FFF3B0]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 stroke-[2.5]" />
                  <span>{item.label}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  {item.badgeType === 'hot' ? (
                    <span className="bg-[#FF5900] text-white font-mono font-black text-[9px] px-1.5 py-0.5 border border-black shadow-[1px_1px_0px_#000]">
                      {item.badgeText}
                    </span>
                  ) : (
                    <span className="w-5 h-5 flex items-center justify-center font-mono font-black text-[9px] border border-black bg-[#FFD43B] text-black shadow-[1px_1px_0px_#000]">
                      {item.badgeText === 'CHECK' ? <Check className="w-3 h-3 stroke-[3]" /> : item.badgeText}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-neutral-600" />
                </div>
              </a>
            );
          })}

          <div className="pt-2 border-t-2 border-dashed border-neutral-300 flex flex-col gap-2">
            {user?.role === 'admin' && (
              <button
                onClick={() => {
                  setViewMode('admin-dashboard');
                  setMobileMenuOpen(false);
                }}
                className="bg-[#121212] text-[#FFC700] border-2 border-black py-2.5 text-xs font-mono font-bold text-center flex items-center justify-center gap-2 shadow-[2px_2px_0px_#000]"
              >
                <Crown className="w-4 h-4 text-[#FFC700]" />
                <span>Buka Dashboard Admin</span>
              </button>
            )}

            {user ? (
              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal('customer-profile');
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-between bg-[#FFC700] hover:bg-[#FFD43B] border-2 border-black p-3 text-xs shadow-[2px_2px_0px_#000] font-black"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-black" />
                    <span>Profil & Riwayat Pesanan ({user.name})</span>
                  </div>
                  {userOrders.length > 0 && (
                    <span className="bg-[#FF5900] text-white font-mono font-black text-[10px] px-2 py-0.5 border border-black">
                      {userOrders.length} Pesanan
                    </span>
                  )}
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }} 
                  className="border-2 border-black bg-white hover:bg-red-50 p-2 text-xs font-bold text-red-600 text-center"
                >
                  Keluar dari Akun (Logout)
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setActiveModal('login');
                  setMobileMenuOpen(false);
                }}
                className="brutal-btn-yellow text-xs py-2.5 text-center font-bold"
              >
                Masuk / Buat Akun
              </button>
            )}

            {user?.role !== 'admin' && (
              <button
                type="button"
                onClick={() => {
                  setViewMode('admin-login');
                  setMobileMenuOpen(false);
                }}
                className="text-[11px] font-mono text-neutral-600 hover:text-black text-center pt-1 underline flex items-center justify-center gap-1"
              >
                <Crown className="w-3 h-3 text-[#FF5900]" />
                <span>Portal Khusus Admin Toko</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
