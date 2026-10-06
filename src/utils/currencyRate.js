import { useState, useEffect } from 'react';

// In-memory cache
let cachedRate = null;
let lastFetchTimestamp = 0;
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache

/**
 * Fetch real-time MYR to IDR exchange rate.
 * Primary: open.er-api.com
 * Fallback: api.exchangerate-api.com
 * Final fallback: stored in localStorage or default fallback 4374.
 */
export async function getLiveMyrRate() {
  const now = Date.now();
  if (cachedRate && now - lastFetchTimestamp < CACHE_TTL_MS) {
    return { rate: cachedRate, isLive: true };
  }

  // Check localStorage cache
  try {
    const saved = localStorage.getItem('zura_myr_rate');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed?.rate && now - parsed.time < CACHE_TTL_MS) {
        cachedRate = parsed.rate;
        lastFetchTimestamp = parsed.time;
        return { rate: cachedRate, isLive: true };
      }
    }
  } catch (e) {
    // Ignore storage errors
  }

  // 1. Try primary free API
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/MYR');
    if (res.ok) {
      const data = await res.json();
      if (data && data.rates && data.rates.IDR) {
        const rate = parseFloat(data.rates.IDR);
        cachedRate = rate;
        lastFetchTimestamp = now;
        try {
          localStorage.setItem('zura_myr_rate', JSON.stringify({ rate, time: now }));
        } catch (e) {}
        return { rate, isLive: true };
      }
    }
  } catch (err) {
    console.warn('Primary exchange API error, falling back...', err);
  }

  // 2. Try backup free API
  try {
    const res2 = await fetch('https://api.exchangerate-api.com/v4/latest/MYR');
    if (res2.ok) {
      const data2 = await res2.json();
      if (data2 && data2.rates && data2.rates.IDR) {
        const rate = parseFloat(data2.rates.IDR);
        cachedRate = rate;
        lastFetchTimestamp = now;
        try {
          localStorage.setItem('zura_myr_rate', JSON.stringify({ rate, time: now }));
        } catch (e) {}
        return { rate, isLive: true };
      }
    }
  } catch (err2) {
    console.warn('Backup exchange API error, falling back to local rate...', err2);
  }

  // 3. Fallback
  const fallbackRate = 4374;
  return { rate: cachedRate || fallbackRate, isLive: false };
}

/**
 * Custom React Hook for live MYR exchange rate
 */
export function useExchangeRate() {
  const [rate, setRate] = useState(() => {
    try {
      const saved = localStorage.getItem('zura_myr_rate');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.rate) return parsed.rate;
      }
    } catch (e) {}
    return 4374;
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let isMounted = true;
    getLiveMyrRate().then(({ rate: liveRate, isLive: liveStatus }) => {
      if (isMounted) {
        setRate(liveRate);
        setIsLive(liveStatus);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const convertIdrToMyr = (idrAmount) => {
    if (!idrAmount || isNaN(idrAmount)) return 0;
    return idrAmount / rate;
  };

  const formatMyr = (idrAmount) => {
    const myr = convertIdrToMyr(idrAmount);
    return `RM ${myr.toFixed(2)}`;
  };

  const formatIdr = (idrAmount) => {
    return `Rp ${(idrAmount || 0).toLocaleString('id-ID')}`;
  };

  return {
    rate,
    isLoading,
    isLive,
    convertIdrToMyr,
    formatMyr,
    formatIdr
  };
}
