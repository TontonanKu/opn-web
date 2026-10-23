import { Order } from '../types';
import { ADMIN_CONFIG } from '../data/initialData';

export interface TelegramConfig {
  botToken: string;
  chatId: string;
  isEnabled: boolean;
}

const STORAGE_KEY = 'zura_telegram_config';

/**
 * Retrieves the current Telegram configuration from localStorage,
 * falling back to default or empty config.
 */
export const getTelegramConfig = (): TelegramConfig => {
  const defaultToken = (ADMIN_CONFIG as any).telegramConfig?.botToken || '';
  const defaultChatId = (ADMIN_CONFIG as any).telegramConfig?.chatId || '';
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        botToken: parsed.botToken || defaultToken,
        chatId: parsed.chatId || defaultChatId,
        isEnabled: parsed.isEnabled ?? true
      };
    }
  } catch (e) {
    console.error('Error reading telegram config:', e);
  }
  return {
    botToken: defaultToken,
    chatId: defaultChatId,
    isEnabled: true
  };
};

/**
 * Saves Telegram configuration to localStorage.
 */
export const saveTelegramConfig = (config: TelegramConfig): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Error saving telegram config:', e);
  }
};

/**
 * Sends a formatted message via the official Telegram Bot HTTP API.
 */
export const sendTelegramMessage = async (
  htmlMessage: string,
  customConfig?: { botToken: string; chatId: string }
): Promise<{ success: boolean; error?: string }> => {
  const config = customConfig || getTelegramConfig();

  if (!config.botToken || !config.chatId) {
    return { success: false, error: 'Bot Token atau Chat ID belum diisi.' };
  }

  const endpoint = `https://api.telegram.org/bot${config.botToken.trim()}/sendMessage`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: config.chatId.trim(),
        text: htmlMessage,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    });

    const data = await response.json();

    if (data.ok) {
      return { success: true };
    } else {
      return { success: false, error: data.description || 'Gagal mengirim pesan Telegram.' };
    }
  } catch (err: any) {
    console.warn('Telegram API Error:', err);
    return { success: false, error: err.message || 'Koneksi jaringan gagal.' };
  }
};

/**
 * Escapes characters for Telegram HTML parse mode.
 */
const escapeHTML = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

/**
 * Sends an instant notification when a customer places a new order.
 */
export const notifyNewOrderTelegram = async (order: Order): Promise<boolean> => {
  const config = getTelegramConfig();
  if (!config.isEnabled || !config.botToken || !config.chatId) {
    return false;
  }

  const priceStr = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(order.totalAmount);

  const dateStr = new Date(order.createdAt).toLocaleString('id-ID', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }) + ' WIB';

  const categoryName = 
    order.serviceType === 'joki_game' 
      ? '🎮 Joki Game' 
      : order.serviceType === 'app_premium' 
      ? '⭐ Aplikasi Premium' 
      : '🎨 AI & Desain';

  const message = `🚨 <b>PESANAN BARU MASUK!</b> 🚨
━━━━━━━━━━━━━━━━━━━━
🏷️ <b>Kode Order:</b> <code>${escapeHTML(order.orderCode)}</code>
👤 <b>Pelanggan:</b> ${escapeHTML(order.customerName)}
📱 <b>WhatsApp:</b> <code>${escapeHTML(order.customerPhone || '-')}</code>
📁 <b>Kategori:</b> ${categoryName}
📦 <b>Item:</b> <b>${escapeHTML(order.itemName)}</b>
🎯 <b>Detail:</b> ${escapeHTML(order.itemDetails || '-')}
💰 <b>Total Bayar:</b> <b>${escapeHTML(priceStr)}</b>${order.tipAmount ? `\n🎁 <b>Tip Booster:</b> Rp ${order.tipAmount.toLocaleString('id-ID')}` : ''}
💳 <b>Metode:</b> ${order.paymentMethod === 'web_transfer' ? 'QRIS / DANA / GoPay' : 'WhatsApp Direct'}
⏰ <b>Waktu:</b> ${dateStr}
⏱️ <b>Batas Respon:</b> 10 Menit

👉 <i>Buka Web Zura Store untuk konfirmasi pengerjaan & terbitkan struk!</i>`;

  const res = await sendTelegramMessage(message);
  return res.success;
};

/**
 * Sends a notification when a customer sends payment proof or a live chat message.
 */
export const notifyChatMessageTelegram = async (
  senderName: string,
  text: string,
  orderCode?: string,
  hasImage?: boolean
): Promise<boolean> => {
  const config = getTelegramConfig();
  if (!config.isEnabled || !config.botToken || !config.chatId) {
    return false;
  }

  const isProof = text.toLowerCase().includes('bukti') || text.toLowerCase().includes('transfer') || hasImage;

  const title = isProof 
    ? '📷 <b>BUKTI TRANSFER DITERIMA!</b>' 
    : '💬 <b>PESAN LIVE CHAT BARU!</b>';

  const message = `${title}
━━━━━━━━━━━━━━━━━━━━
${orderCode ? `🏷️ <b>Terkait Order:</b> <code>${escapeHTML(orderCode)}</code>\n` : ''}👤 <b>Dari:</b> ${escapeHTML(senderName)}
📝 <b>Pesan:</b> ${escapeHTML(text.slice(0, 300))}
${hasImage ? '🖼️ <b>Lampiran:</b> [Ada Foto / Screenshot Bukti]\n' : ''}
👉 <i>Segera buka panel Live Chat web untuk memeriksa dan membalas!</i>`;

  const res = await sendTelegramMessage(message);
  return res.success;
};

/**
 * Tests connection with custom or saved credentials.
 */
export const testTelegramConnection = async (
  botToken: string,
  chatId: string
): Promise<{ success: boolean; message: string }> => {
  const testMsg = `🎉 <b>TES KONEKSI BOT TELEGRAM BERHASIL!</b>
━━━━━━━━━━━━━━━━━━━━
✅ Bot Telegram telah terhubung dengan <b>ZURA STORE</b>!
🔔 Anda akan menerima notifikasi instan setiap kali:
• Ada pesanan baru masuk
• Pelanggan mengirim bukti transfer / foto
• Pelanggan mengirim pesan di Live Chat

<i>Notifikasi ini 100% gratis, aman, dan akan selalu masuk ke HP Anda meskipun laptop dimatikan.</i>`;

  const res = await sendTelegramMessage(testMsg, { botToken, chatId });

  if (res.success) {
    return {
      success: true,
      message: 'Berhasil! Pesan uji coba telah dikirim ke akun Telegram Anda. Cek HP Anda sekarang!'
    };
  } else {
    return {
      success: false,
      message: `Gagal mengirim ke Telegram: ${res.error || 'Periksa kembali Bot Token dan Chat ID Anda.'}`
    };
  }
};
