// Zura Store Service Worker - Native Mobile / APK & PWA Push Notifications
const CACHE_NAME = 'zura-store-sw-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Handle Notification Clicks (Focus or open app window to #admin)
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/#admin';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url && 'focus' in client) {
          if (client.url.indexOf(self.location.origin) !== -1) {
            client.navigate(targetUrl);
            return client.focus();
          }
        }
      }
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});

// Handle background push event
self.addEventListener('push', (event) => {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: 'ZURA STORE', body: event.data.text() };
    }
  }

  const title = data.title || '🚨 PESANAN BARU MASUK! - Zura Store';
  const options = {
    body: data.body || 'Ada transaksi baru yang menunggu konfirmasi admin.',
    icon: '/icon.svg',
    badge: '/icon.svg',
    vibrate: [300, 150, 300, 150, 400],
    data: {
      url: data.url || '/#admin'
    },
    requireInteraction: true
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
