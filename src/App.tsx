import React, { useState, useEffect, Suspense, lazy } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AdminStatusBar } from './components/AdminStatusBar';
import { Navbar, StoreTab } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { FlashSaleBanner } from './components/FlashSaleBanner';
import { FeaturedHighlights } from './components/FeaturedHighlights';
import { WhyChooseUs } from './components/WhyChooseUs';
import { FaqSection } from './components/FaqSection';
import { GameJokiSection } from './components/GameJokiSection';
import { PremiumAppSection } from './components/PremiumAppSection';
import { PortfolioSection } from './components/PortfolioSection';
import { TestimonialSection } from './components/TestimonialSection';
import { OrderCheckoutModal } from './components/OrderCheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { ReceiptModal } from './components/ReceiptModal';
import { AuthModal } from './components/AuthModal';
import { CustomerProfileModal } from './components/CustomerProfileModal';
import { TermsAndGuaranteeModal } from './components/TermsAndGuaranteeModal';
import { LiveOrderTicker } from './components/LiveOrderTicker';
import { LiveChatWidget } from './components/LiveChatWidget';
import { IncomingOrderAlert } from './components/IncomingOrderAlert';
import { Footer } from './components/Footer';
import { ADMIN_CONFIG } from './data/initialData';
import { MessageSquare, Receipt } from 'lucide-react';

// Code-split heavy admin views for fast initial customer bundle loading
const AdminLoginPage = lazy(() => import('./components/AdminLoginPage').then(m => ({ default: m.AdminLoginPage })));
const AdminDashboardView = lazy(() => import('./components/AdminDashboardView').then(m => ({ default: m.AdminDashboardView })));

const MainLayout: React.FC = () => {
  const { myOrders, openOrderTracking, viewMode } = useApp();

  // Active storefront tab state: 'home' | 'joki' | 'apps' | 'portfolio'
  const [storeTab, setStoreTab] = useState<StoreTab>(() => {
    const hash = window.location.hash.toLowerCase();
    if (hash === '#joki') return 'joki';
    if (hash === '#aplikasi' || hash === '#apps') return 'apps';
    if (hash === '#portfolio' || hash === '#desain') return 'portfolio';
    return 'home';
  });

  // Ensure body scroll is never locked
  useEffect(() => {
    document.body.style.overflow = '';
  }, []);

  // Sync hash changes with storeTab and smooth scrolling
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#joki') {
        setStoreTab('joki');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#aplikasi' || hash === '#apps') {
        setStoreTab('apps');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#portfolio' || hash === '#desain') {
        setStoreTab('portfolio');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === '#testimoni') {
        setStoreTab('home');
        setTimeout(() => {
          document.getElementById('testimoni')?.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      } else if (hash === '#faq') {
        setStoreTab('home');
        setTimeout(() => {
          document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      } else if (hash === '#home' || hash === '') {
        setStoreTab('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectTab = (tab: StoreTab) => {
    setStoreTab(tab);
    if (tab === 'home') {
      window.location.hash = 'home';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'joki') {
      window.location.hash = 'joki';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'apps') {
      window.location.hash = 'aplikasi';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'portfolio') {
      window.location.hash = 'portfolio';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // If Admin Login page is requested
  if (viewMode === 'admin-login') {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center font-mono font-bold text-sm">
          <div className="flex items-center gap-2 border-2 border-black bg-white p-4 shadow-brutal">
            <span className="w-3 h-3 bg-[#FFC700] border border-black animate-ping"></span>
            <span>Memuat Portal Admin...</span>
          </div>
        </div>
      }>
        <AdminLoginPage />
      </Suspense>
    );
  }

  // If Admin Dashboard is active (full dedicated view, NOT a popup modal!)
  if (viewMode === 'admin-dashboard') {
    return (
      <Suspense fallback={
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center font-mono font-bold text-sm">
          <div className="flex items-center gap-2 border-2 border-black bg-[#FFC700] p-4 shadow-brutal">
            <span className="w-3 h-3 bg-black border border-black animate-ping"></span>
            <span>Membuka Dashboard Admin Toko...</span>
          </div>
        </div>
      }>
        <IncomingOrderAlert />
        <AdminDashboardView />
      </Suspense>
    );
  }

  // Active / pending order check (only for this visitor's own orders)
  const activeOrder = myOrders.find(o => o.status === 'pending_admin' || o.status === 'processing');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] selection:bg-[#FFC700] selection:text-black">
      {/* Top Admin Status Ticker */}
      <AdminStatusBar />

      {/* Main Navbar with Tab Routing */}
      <Navbar 
        currentTab={storeTab} 
        onSelectTab={handleSelectTab} 
      />

      {/* Dynamic View by Tab */}
      <main className="flex-1">
        {storeTab === 'home' && (
          <>
            <HeroBanner
              onNavigateToJoki={() => handleSelectTab('joki')}
              onNavigateToApps={() => handleSelectTab('apps')}
              onNavigateToTestimoni={() => {
                const el = document.getElementById('testimoni');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <FlashSaleBanner
              onNavigateToJoki={() => handleSelectTab('joki')}
              onNavigateToApps={() => handleSelectTab('apps')}
            />
            <FeaturedHighlights
              onSelectJoki={() => handleSelectTab('joki')}
              onSelectApps={() => handleSelectTab('apps')}
              onSelectPortfolio={() => handleSelectTab('portfolio')}
            />
            <WhyChooseUs />
            <div id="testimoni">
              <TestimonialSection />
            </div>
            <div id="faq">
              <FaqSection />
            </div>
          </>
        )}

        {storeTab === 'joki' && (
          <GameJokiSection onBackToHome={() => handleSelectTab('home')} />
        )}

        {storeTab === 'apps' && (
          <PremiumAppSection onBackToHome={() => handleSelectTab('home')} />
        )}

        {storeTab === 'portfolio' && (
          <PortfolioSection onBackToHome={() => handleSelectTab('home')} />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals for Orders & Auth */}
      <OrderCheckoutModal />
      <OrderTrackingModal />
      <ReceiptModal />
      <AuthModal />
      <CustomerProfileModal />
      <TermsAndGuaranteeModal />

      {/* Real-Time Incoming Order Pop-up Alert Banner */}
      <IncomingOrderAlert />

      {/* Social Proof Live Order Notification Ticker */}
      <LiveOrderTicker />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        
        {/* Floating Active Order Tracker if order exists */}
        {activeOrder && (
          <button
            onClick={() => openOrderTracking(activeOrder)}
            className="brutal-btn-orange py-2 px-3 text-xs flex items-center gap-2 shadow-brutal animate-bounce"
            title="Lihat status pesanan aktif & timer 10 menit"
          >
            <Receipt className="w-4 h-4" />
            <span className="font-mono font-bold">Lacak Order: {activeOrder.orderCode}</span>
          </button>
        )}

        {/* Live Chat Web Real-Time Widget */}
        <LiveChatWidget />

        {/* WhatsApp Fast Contact Button */}
        <a
          href={`https://wa.me/${ADMIN_CONFIG.whatsappNumber}?text=Halo%20Admin%20Zura%20Store,%20saya%20ingin%20tanya%20layanan%20joki%20/%20aplikasi%20premium.`}
          target="_blank"
          rel="noopener noreferrer"
          className="brutal-btn bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-xs sm:text-sm py-3 px-4 flex items-center gap-2 shadow-brutal"
        >
          <div className="w-3 h-3 rounded-full bg-white animate-ping"></div>
          <MessageSquare className="w-5 h-5 text-black" />
          <span className="font-mono">Chat CS WhatsApp</span>
        </a>
      </div>

    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
