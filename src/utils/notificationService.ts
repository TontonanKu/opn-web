import { Order } from '../types';
import { soundService } from './audioUtils';

/**
 * Service to manage native Android APK, PWA, and browser system notifications.
 * Displays popup banners on the phone lock screen, notification shade, and status bar.
 */

// Register Service Worker
export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return null;
  }

  try {
    const reg = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
    return reg;
  } catch (error) {
    console.warn('Service Worker registration skipped or failed:', error);
    return null;
  }
};

// Check if notification is supported on this browser / device
export const isNotificationSupported = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'Notification' in window;
};

// Get current permission status: 'default' | 'granted' | 'denied'
export const getNotificationPermission = (): NotificationPermission => {
  if (!isNotificationSupported()) return 'denied';
  return Notification.permission;
};

// Request permission from the user
export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!isNotificationSupported()) {
    alert('Browser atau perangkat ini belum mendukung notifikasi sistem.');
    return false;
  }

  try {
    const perm = await Notification.requestPermission();
    if (perm === 'granted') {
      // Send a confirmation notification right away
      triggerTestMobileNotification();
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
};

type ExtendedNotificationOptions = NotificationOptions & {
  vibrate?: number[];
  requireInteraction?: boolean;
};

// Trigger test notification on mobile screen
export const triggerTestMobileNotification = async () => {
  if (!isNotificationSupported() || Notification.permission !== 'granted') return;

  const title = '🔔 NOTIFIKASI HP ZURA STORE AKTIF!';
  const options: ExtendedNotificationOptions = {
    body: 'Berhasil! Ketika ada pesanan baru masuk dari pembeli, notifikasi pop-up dan getar akan langsung muncul di layar HP Anda.',
    icon: '/icon.svg',
    badge: '/icon.svg',
    tag: 'zura-test-notif',
    vibrate: [250, 100, 250, 100, 250],
    data: { url: '/#admin' }
  };

  // Vibrate mobile device
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate([250, 100, 250, 100, 250]);
    } catch (e) {}
  }

  // Play bell sound
  soundService.playNewOrderSound();

  // Try service worker first
  if ('serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.ready;
      if (reg && reg.showNotification) {
        await reg.showNotification(title, options);
        return;
      }
    } catch (e) {}
  }

  // Fallback to standard window Notification
  try {
    new Notification(title, options);
  } catch (e) {}
};

// Send real system notification when a new order arrives
export const notifyNewOrder = async (order: {
  orderCode: string;
  customerName: string;
  itemName: string;
  totalAmount: number;
  paymentMethod?: string;
}) => {
  // 1. Play alert sound
  soundService.playNewOrderSound();

  // 2. Vibrate mobile phone (Pattern: Buzz - Pause - Buzz - Pause - Long Buzz)
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate([350, 150, 350, 150, 500]);
    } catch (e) {}
  }

  // 3. System Push / Pop-up Notification in Android Status Bar & Lock Screen
  if (isNotificationSupported() && Notification.permission === 'granted') {
    const formattedAmount = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(order.totalAmount);

    const title = `🚨 ORDERAN BARU! #${order.orderCode}`;
    const body = `${order.customerName} memesan ${order.itemName} (${formattedAmount}). Klik untuk buka detail di dashboard!`;

    const options: ExtendedNotificationOptions = {
      body,
      icon: '/icon.svg',
      badge: '/icon.svg',
      tag: `order-${order.orderCode}`,
      vibrate: [350, 150, 350, 150, 500],
      data: { url: '/#admin' },
      requireInteraction: true // Keeps notification visible until user interacts with it
    };

    if ('serviceWorker' in navigator) {
      try {
        const reg = await navigator.serviceWorker.ready;
        if (reg && reg.showNotification) {
          await reg.showNotification(title, options as NotificationOptions);
          return;
        }
      } catch (e) {}
    }

    try {
      new Notification(title, options);
    } catch (e) {}
  }
};

// Send notification for new chat messages
export const notifyNewChatMessage = async (
  senderName = 'Pelanggan',
  messageText = '',
  roomId = 'CS',
  isForAdmin = false
) => {
  // 1. Play sound
  soundService.playNewMessageSound();

  // 2. Short vibration
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate([150, 80, 150]);
    } catch (e) {}
  }

  // 3. System Notification
  if (isNotificationSupported() && Notification.permission === 'granted') {
    const title = `💬 Pesan Baru dari ${senderName} (${roomId})`;
    const options: ExtendedNotificationOptions = {
      body: messageText || 'Mengirim foto/lampiran',
      icon: '/icon.svg',
      badge: '/icon.svg',
      tag: `chat-${roomId}-${Date.now()}`,
      vibrate: [150, 80, 150],
      data: { url: isForAdmin ? '/#admin' : '/' }
    };

    if ('serviceWorker' in navigator) {
      try {
        const reg = await navigator.serviceWorker.ready;
        if (reg && reg.showNotification) {
          await reg.showNotification(title, options as NotificationOptions);
          return;
        }
      } catch (e) {}
    }

    try {
      new Notification(title, options);
    } catch (e) {}
  }
};
