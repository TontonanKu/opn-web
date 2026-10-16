export type AdminStatusType = 'online' | 'offline' | 'away';

export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: 'customer' | 'admin';
}

export type ServiceCategory = 'joki_game' | 'app_premium' | 'design_ai';

export interface GameBoostTier {
  id: string;
  fromRank: string;
  toRank: string;
  price: number;
  estTime: string;
  category?: string;
  subGame?: string;
  unit?: string;
}

export interface GamePackage {
  id: string;
  name: string;
  price: string;
  bonus: string;
  speed: string;
}

export interface GameService {
  id: string;
  title: string;
  category: string;
  tagline: string;
  icon: string;
  badge: string;
  bannerImage: string;
  popular: boolean;
  roles?: string[];
  features?: string[];
  packages?: GamePackage[];
  tiers: GameBoostTier[];
  formFields: {
    label: string;
    name: string;
    placeholder: string;
    type: 'text' | 'select' | 'password';
    options?: string[];
  }[];
}

export interface PremiumAppVariant {
  id: string;
  name: string;
  duration: string;
  price: number;
  noteSeller?: string;
}

export interface PremiumApp {
  id: string;
  name: string;
  category: string;
  icon?: string;
  badge: string;
  badgeColor?: 'green' | 'red' | 'blue' | 'dark' | 'yellow';
  price: number;
  duration: string;
  description: string;
  noteSeller?: string;
  features: string[];
  isHighlighted?: boolean;
  expiresAt?: string;
  expiryNotice?: string;
  variants?: PremiumAppVariant[];
}

export interface ProjectPortfolio {
  id: string;
  title: string;
  type: 'ai' | 'manual' | 'hybrid';
  category: string;
  imageUrl: string;
  description: string;
  toolsUsed: string[];
  prompt?: string;
  tags: string[];
  year: string;
  demoUrl?: string;
  githubUrl?: string;
  actionText?: string;
  price?: string;
  features?: string[];
  aiLabel?: string;
}

export interface WebReceipt {
  receiptNumber: string;
  transactionDate: string;
  completedDate?: string;
  serviceName: string;
  variantOrRank: string;
  customerName: string;
  customerPhone: string;
  accountDetails?: Record<string, string>;
  amount: number;
  paymentMethod: 'web_transfer' | 'whatsapp_direct';
  paymentStatus: 'MENUNGGU_VERIFIKASI' | 'DIPROSES' | 'SELESAI' | 'BATAL';
  adminNotes?: string;
  rating?: number;
  review?: string;
  voucherCode?: string;
  originalAmount?: number;
  discountAmount?: number;
  verificationHash?: string;
}

export interface WhatsAppTestimonial {
  id: string;
  customerName: string;
  serviceCategory: string;
  date: string;
  avatar?: string;
  chatSnippet: string;
  screenshotUrl: string;
  rating: number;
  orderCode: string;
}

export interface Order {
  id: string;
  orderCode: string; // e.g. ZURA-849201
  createdAt: number; // timestamp
  userId?: string;
  customerName: string;
  customerPhone: string;
  serviceType: 'joki_game' | 'app_premium' | 'design_ai';
  itemName: string;
  itemDetails: string;
  extraFormData?: Record<string, string>;
  totalAmount: number;
  originalAmount?: number;
  voucherCode?: string;
  discountAmount?: number;
  paymentMethod: 'web_transfer' | 'whatsapp_direct';
  paymentProofUrl?: string;
  status: 'pending_admin' | 'processing' | 'completed' | 'cancelled';
  adminResponseReceived: boolean;
  adminRespondedAt?: number;
  completedAt?: number;
  receipt?: WebReceipt;
  reviewSubmittedAt?: number;
  rating?: number;
  reviewText?: string;
  chatClosed?: boolean;
  chatClosedAt?: number;
  credentialsPurged?: boolean;
  warrantyClaimed?: boolean;
  verificationHash?: string;
}

export interface ChatMessage {
  id: string;
  roomId: string; // ID ruang privat: Kode Checkout atau Session ID Pelanggan
  orderCode?: string;
  chatType?: 'order' | 'general';
  sender: 'customer' | 'admin' | 'system';
  senderName: string;
  customerPhone?: string;
  text: string;
  imageUrl?: string; // Lampiran foto / bukti transfer / screenshot
  timestamp: number;
  isRead: boolean;
}

export interface ChatRoom {
  roomId: string;
  type: 'order' | 'general';
  customerName: string;
  customerPhone?: string;
  orderCode?: string;
  serviceName?: string;
  orderStatus?: Order['status'];
  createdAt: number;
  lastMessageText: string;
  lastMessageTime: number;
  unreadCount: number;
  isClosed?: boolean;
  closedAt?: number;
  reviewSubmittedAt?: number;
  rating?: number;
  reviewText?: string;
}


