import React, { useState, useEffect, useCallback } from 'react';
import { STORE_CONFIG, getCategory, buildWhatsAppOrderUrl } from './data/catalog';
import { LeftSidebar } from './components/LeftSidebar';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { OrderGuidePage } from './pages/OrderGuidePage';
import { TestimonialPage } from './pages/TestimonialPage';
import { ExternalLink } from 'lucide-react';

function parseHashRoute(): { path: string; params: URLSearchParams } {
  const raw = window.location.hash.replace(/^#/, '') || '/';
  const [pathPart, queryPart] = raw.split('?');
  const normalizedPath = pathPart.startsWith('/') ? pathPart : `/${pathPart}`;
  return {
    path: normalizedPath,
    params: new URLSearchParams(queryPart || '')
  };
}

export const App: React.FC = () => {
  const [routeState, setRouteState] = useState(parseHashRoute);

  useEffect(() => {
    const onHashChange = () => {
      setRouteState(parseHashRoute());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((target: string) => {
    const clean = target.startsWith('/') ? target : `/${target}`;
    if (window.location.hash === `#${clean}`) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = clean;
    }
  }, []);

  const { path, params } = routeState;
  const segments = path.split('/').filter(Boolean);

  // Determine which page view to render on the Right Panel
  let rightContent: React.ReactNode = null;
  const isHomePage = segments.length === 0;

  if (isHomePage) {
    rightContent = <HomePage mode="root" onNavigate={navigate} />;
  } else if (segments[0] === 'joki-game') {
    rightContent = <HomePage mode="joki" onNavigate={navigate} />;
  } else if (segments[0] === 'produk') {
    rightContent = <HomePage mode="produk" onNavigate={navigate} />;
  } else if (segments[0] === 'testimoni') {
    rightContent = <TestimonialPage groupKey={segments[1] || null} onNavigate={navigate} />;
  } else if (segments[0] === 'cara-order') {
    rightContent = <OrderGuidePage onNavigate={navigate} />;
  } else if (segments[0] === 'kategori' && segments[1]) {
    const cat = getCategory(segments[1]);
    if (cat) {
      rightContent = <CategoryPage category={cat} onNavigate={navigate} />;
    } else {
      rightContent = <HomePage mode="root" onNavigate={navigate} />;
    }
  } else if (segments[0] === 'layanan' && segments[1] && segments[2]) {
    const cat = getCategory(segments[1]);
    const sec = cat?.sections.find(s => s.id === segments[2]);
    if (cat && sec) {
      rightContent = (
        <ServiceDetailPage
          category={cat}
          section={sec}
          initialItemId={params.get('paket')}
          onNavigate={navigate}
        />
      );
    } else if (cat) {
      rightContent = <CategoryPage category={cat} onNavigate={navigate} />;
    } else {
      rightContent = <HomePage mode="root" onNavigate={navigate} />;
    }
  } else {
    const cat = getCategory(segments[0]);
    if (cat) {
      rightContent = <CategoryPage category={cat} onNavigate={navigate} />;
    } else {
      rightContent = <HomePage mode="root" onNavigate={navigate} />;
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Crimson Accent Stripe */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#5C0808] via-[#991B1B] to-[#5C0808]" />

      {/* Compact Mobile Header when viewing a Sub-Page */}
      {!isHomePage && (
        <div className="lg:hidden bg-white border-b border-neutral-200 px-4 py-2.5 sticky top-0 z-30 flex items-center justify-between gap-2 shadow-sm">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 text-left cursor-pointer"
          >
            <img
              src={STORE_CONFIG.logoUrl}
              alt={STORE_CONFIG.storeName}
              className="w-9 h-9 object-cover rounded-xl border border-[#7A0B0B]"
            />
            <div>
              <p className="font-display font-black text-xs text-neutral-900 leading-none">
                {STORE_CONFIG.storeName}
              </p>
              <p className="text-[10px] text-[#7A0B0B] font-bold mt-0.5">Katalog Resmi</p>
            </div>
          </button>

          <div className="flex items-center gap-1.5">
            <a
              href={buildWhatsAppOrderUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-lg bg-[#16A34A] text-white font-extrabold text-[11px] flex items-center gap-1"
            >
              <span>WA</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href={STORE_CONFIG.discordInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-lg bg-[#7A0B0B] text-white font-extrabold text-[11px] flex items-center gap-1"
            >
              <span>Discord</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* Main Split Container (Desktop: Left Banner/Bio/Order + Right Pages; Mobile: Adaptive Stack) */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 flex-1">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Left Column */}
          <div className={`w-full lg:w-auto ${!isHomePage ? 'hidden lg:block' : 'block'}`}>
            <LeftSidebar currentRoute={path} onNavigate={navigate} />
          </div>

          {/* Right Column: Dynamic Multi-Page Content Area (No top horizontal menu bar!) */}
          <main className="w-full flex-1 min-w-0">
            {rightContent}
          </main>

          {/* On Mobile Sub-Pages, also render LeftSidebar below so the full banner & bio remain accessible */}
          {!isHomePage && (
            <div className="w-full lg:hidden pt-4 border-t border-neutral-200">
              <LeftSidebar currentRoute={path} onNavigate={navigate} />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-neutral-200 bg-white py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <div className="flex items-center gap-2.5 font-semibold text-neutral-900">
            <img
              src={STORE_CONFIG.logoUrl}
              alt={STORE_CONFIG.storeName}
              className="w-6 h-6 rounded-lg object-cover border border-[#7A0B0B]"
            />
            <span>{STORE_CONFIG.fullStoreName}</span>
            <span className="text-neutral-300">•</span>
            <span className="text-neutral-500 font-normal">
              Katalog Resmi (Order via WhatsApp & Discord)
            </span>
          </div>
          <div className="flex items-center gap-4 font-semibold">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="hover:text-[#991B1B] cursor-pointer"
            >
              Menu Utama
            </button>
            <button
              type="button"
              onClick={() => navigate('/cara-order')}
              className="hover:text-[#991B1B] cursor-pointer"
            >
              QRIS & Cara Order
            </button>
            <a
              href={buildWhatsAppOrderUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#16A34A] hover:underline"
            >
              WhatsApp
            </a>
            <a
              href={STORE_CONFIG.discordInviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#7A0B0B] hover:underline"
            >
              Discord
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
