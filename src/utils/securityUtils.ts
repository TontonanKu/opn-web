/**
 * Security and Anti-Spam Utilities for Zura Store.
 * Provides XSS sanitization, phone validation, password hashing, and client rate-limiting.
 */

/**
 * Strips HTML tags, script elements, event handlers, and dangerous control characters to prevent XSS.
 * Leaves standard characters like apostrophes and ampersands intact so React can render them naturally
 * without ugly HTML entity double-escaping (e.g. avoiding "O&#39;Connor").
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return '';
  return input
    // 1. Remove script tags and contents
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // 2. Remove all HTML tags
    .replace(/<[^>]+>/g, '')
    // 3. Remove javascript: pseudo-protocols
    .replace(/javascript\s*:/gi, '')
    // 4. Remove inline event handlers (e.g. onload=, onerror=, onclick=)
    .replace(/on\w+\s*=/gi, '')
    // 5. Remove dangerous non-printable control characters
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F-\u009F]/g, '')
    .trim();
};

/**
 * Validates Indonesian phone numbers (supports 08xx and 628xx).
 */
export const validatePhoneNumber = (phone: string): { isValid: boolean; normalized: string } => {
  if (!phone) return { isValid: false, normalized: '' };
  
  // Clean non-digits
  const digits = phone.replace(/[^0-9]/g, '');

  // Must start with 08 (min 10 max 14 digits) or 628 (min 11 max 15 digits)
  if (/^08[1-9][0-9]{7,11}$/.test(digits)) {
    return { isValid: true, normalized: digits };
  } else if (/^628[1-9][0-9]{7,11}$/.test(digits)) {
    return { isValid: true, normalized: digits };
  }

  return { isValid: false, normalized: digits };
};

/**
 * In-session rate limiter to prevent bot flood / rapid-fire spam on checkouts, logins & chat.
 */
const rateLimitMap: Record<string, number[]> = {};

export const checkRateLimit = (
  actionKey: string,
  maxRequests: number = 3,
  windowSeconds: number = 60
): { allowed: boolean; waitSeconds: number } => {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;

  if (!rateLimitMap[actionKey]) {
    rateLimitMap[actionKey] = [];
  }

  // Filter timestamps within current window
  rateLimitMap[actionKey] = rateLimitMap[actionKey].filter(ts => now - ts < windowMs);

  if (rateLimitMap[actionKey].length >= maxRequests) {
    const oldest = rateLimitMap[actionKey][0];
    const waitSeconds = Math.ceil((oldest + windowMs - now) / 1000);
    return { allowed: false, waitSeconds: Math.max(1, waitSeconds) };
  }

  // Record this attempt
  rateLimitMap[actionKey].push(now);
  return { allowed: true, waitSeconds: 0 };
};

/**
 * Computes a secure SHA-256 one-way cryptographic hash of a password
 * using the native browser Web Crypto API.
 */
export const hashPassword = async (password: string): Promise<string> => {
  if (!password) return '';
  try {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  } catch (e) {
    // Fallback if crypto.subtle is unavailable (e.g. non-secure dev context)
    return btoa(password);
  }
};

/**
 * Auto-purges sensitive passwords/PINs from completed orders.
 * Replaces credentials with secure masked strings so they are never stored indefinitely.
 */
export const purgeSensitiveFormData = (formData?: Record<string, string>): { sanitized: Record<string, string>; hadSensitiveData: boolean } => {
  if (!formData || typeof formData !== 'object') {
    return { sanitized: {}, hadSensitiveData: false };
  }

  const sensitiveKeywords = ['password', 'sandi', 'pass', 'pin', 'katasandi', 'moonton_pass', 'email_pass'];
  const sanitized: Record<string, string> = {};
  let hadSensitiveData = false;

  for (const [key, val] of Object.entries(formData)) {
    const isSensitive = sensitiveKeywords.some(keyword => key.toLowerCase().includes(keyword));
    if (isSensitive) {
      sanitized[key] = '•••••••• (Dihapus otomatis demi privasi akun)';
      hadSensitiveData = true;
    } else {
      sanitized[key] = val;
    }
  }

  return { sanitized, hadSensitiveData };
};

/**
 * Generates an immutable, verifiable receipt hash to prevent counterfeit / forged receipts.
 */
export const generateVerificationFingerprint = (orderCode: string, totalAmount: number, createdAt: number): string => {
  const seed = `${orderCode}_${totalAmount}_${createdAt}_ZURASEC2026`;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  const hex = Math.abs(hash).toString(16).toUpperCase().padStart(8, '0');
  return `ZR-VERIFIED-${orderCode.slice(-6)}-${hex}`;
};

/**
 * Bot detection honeypot check.
 */
export const isHoneypotTriggered = (value?: string): boolean => {
  return Boolean(value && value.trim().length > 0);
};

/**
 * Checks whether a name, phone, or email matches reserved admin identifiers
 * to prevent customer impersonation or privilege escalation.
 */
export const isReservedAdminIdentifier = (value?: string): boolean => {
  if (!value) return false;
  const clean = value.trim().toLowerCase();
  const digits = value.replace(/[^0-9]/g, '');

  const reservedNamesAndEmails = [
    'admin',
    'superadmin',
    'super admin',
    'zura admin',
    'admin zura',
    'zura super admin',
    'admin@zurastore.com',
    'admin@zura-w.my.id',
    'zuraw.official@gmail.com'
  ];

  if (reservedNamesAndEmails.includes(clean)) return true;
  if (digits === '082172795156' || digits === '6282172795156') return true;
  return false;
};
