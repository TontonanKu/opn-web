import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { 
  AdminStatusType, 
  User, 
  Order, 
  WhatsAppTestimonial, 
  WebReceipt,
  ChatMessage,
  ChatRoom
} from '../types';
import { 
  ADMIN_CONFIG, 
  ADMIN_CREDENTIALS,
  INITIAL_ORDERS, 
  INITIAL_WHATSAPP_TESTIMONIALS 
} from '../data/initialData';
import { soundService } from '../utils/audioUtils';
import { notifyNewOrder, notifyNewChatMessage } from '../utils/notificationService';
import { notifyNewOrderTelegram, notifyChatMessageTelegram } from '../utils/telegramUtils';
import { purgeSensitiveFormData, generateVerificationFingerprint, hashPassword } from '../utils/securityUtils';
import { supabase } from '../utils/supabaseClient';
import { 
  fetchCloudOrders, 
  upsertCloudOrder, 
  deleteCloudOrder, 
  fetchCloudMessages, 
  insertCloudMessage, 
  deleteCloudChatRoom, 
  updateCloudAdminStatus, 
  fetchCloudAdminStatus 
} from '../utils/supabaseSync';

// Real-time chat messages (starts clean)
const INITIAL_CHAT_MESSAGES: ChatMessage[] = [];

interface AppContextType {
  adminStatus: AdminStatusType;
  setAdminStatus: (status: AdminStatusType) => void;
  user: User | null;
  login: (name: string, phone: string, role?: 'customer' | 'admin') => void;
  logout: () => void;
  orders: Order[];
  myOrders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderCode' | 'createdAt' | 'status' | 'adminResponseReceived'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status'], receiptData?: Partial<WebReceipt>) => void;
  deleteOrder: (orderId: string) => void;
  cancelOrder: (orderId: string, reason?: string) => void;
  submitOrderReview: (orderId: string, rating: number, review: string) => void;
  closeChatRoom: (roomId: string) => void;
  deleteChatRoom: (roomId: string) => void;
  testimonials: WhatsAppTestimonial[];
  addWhatsAppTestimonial: (testi: Omit<WhatsAppTestimonial, 'id'>) => void;
  
  // Real-time Web Live Chat (Room-Based Multi-Customer)
  customerRoomId: string;
  customerSessionId: string;
  adminActiveRoomId: string;
  setAdminActiveRoomId: (roomId: string) => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string, targetRoomId?: string, overrideSender?: 'customer' | 'admin', orderCode?: string, imageUrl?: string) => void;
  getMessagesForRoom: (roomId: string) => ChatMessage[];
  getAllRooms: () => ChatRoom[];
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;
  unreadCount: number;
  markChatAsRead: () => void;

  // App View Routing
  viewMode: 'store' | 'admin-login' | 'admin-dashboard';
  setViewMode: (mode: 'store' | 'admin-login' | 'admin-dashboard') => void;
  adminLogin: (email: string, pass: string) => Promise<boolean>;

  // Modals & Navigation state
  activeModal: 'login' | 'checkout' | 'tracking' | 'receipt' | 'customer-profile' | 'terms' | null;
  setActiveModal: (modal: 'login' | 'checkout' | 'tracking' | 'receipt' | 'customer-profile' | 'terms' | null) => void;
  updateUserName: (newName: string) => boolean;
  checkoutItem: any;
  openCheckout: (item: any, type: 'joki_game' | 'app_premium' | 'design_ai') => void;
  activeOrderToTrack: Order | null;
  openOrderTracking: (order: Order) => void;
  activeReceiptOrder: Order | null;
  openReceiptModal: (order: Order) => void;
  
  // Helpers & Actions
  generateWhatsAppLink: (orderCode: string, itemName: string, totalAmount: number, customNote?: string) => string;
  triggerPaymentProofChat: (order: Order) => void;

  // Sound Notifications
  isSoundEnabled: boolean;
  toggleSound: () => boolean;
  testSound: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Admin Status
  const [adminStatus, setAdminStatusState] = useState<AdminStatusType>(() => {
    const saved = localStorage.getItem('zura_admin_status');
    return (saved as AdminStatusType) || 'online';
  });

  // Ensure dark mode class is completely cleared
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('zura_theme');
  }, []);

  // Sound Notifications State
  const [isSoundEnabled, setIsSoundEnabled] = useState(soundService.isEnabled());

  const toggleSound = () => {
    const next = soundService.toggle();
    setIsSoundEnabled(next);
    if (next) soundService.playNewOrderSound();
    return next;
  };

  const testSound = () => {
    soundService.playNewOrderSound();
  };

  const setAdminStatus = (status: AdminStatusType) => {
    setAdminStatusState(status);
    localStorage.setItem('zura_admin_status', status);
    updateCloudAdminStatus(status);

    try {
      const channel = new BroadcastChannel('zura_store_sync');
      channel.postMessage({ type: 'STATUS_CHANGE', payload: status });
      channel.close();
    } catch (e) {}
  };

  // Auth User
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('zura_user');
    if (!saved) return null;
    try {
      const u = JSON.parse(saved);
      // Auto-correct if user previously logged in as admin credentials or name
      const isKnownAdmin = 
        u.role === 'admin' ||
        u.id === 'usr_admin' ||
        (u.name && (u.name.toLowerCase() === 'zura super admin' || u.name.toLowerCase() === 'admin')) ||
        (u.phone && (u.phone === 'admin' || u.phone === ADMIN_CONFIG.whatsappNumber || u.phone === '082172795156')) ||
        (u.email && u.email.toLowerCase() === ADMIN_CREDENTIALS.email.toLowerCase());
      
      if (isKnownAdmin) {
        const upgradedAdmin: User = {
          id: 'usr_admin',
          name: 'Zura Super Admin',
          phone: ADMIN_CONFIG.whatsappNumber,
          email: ADMIN_CREDENTIALS.email,
          role: 'admin'
        };
        localStorage.setItem('zura_user', JSON.stringify(upgradedAdmin));
        return upgradedAdmin;
      }
      return u;
    } catch {
      return null;
    }
  });

  const login = (name: string, phone: string, role: 'customer' | 'admin' = 'customer') => {
    const newUser: User = {
      id: role === 'admin' ? 'usr_admin' : 'usr_' + Date.now(),
      name,
      phone,
      role,
      ...(role === 'admin' ? { email: ADMIN_CREDENTIALS.email } : {})
    };
    setUser(newUser);
    localStorage.setItem('zura_user', JSON.stringify(newUser));
    if (role === 'admin') {
      setViewMode('admin-dashboard');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('zura_user');
    localStorage.removeItem('zura_view_mode');
    setViewMode('store');
  };

  const updateUserName = (newName: string): boolean => {
    const trimmed = newName.trim();
    if (!user || !trimmed || trimmed.length < 2) return false;

    const updatedUser: User = { ...user, name: trimmed };
    setUser(updatedUser);
    localStorage.setItem('zura_user', JSON.stringify(updatedUser));

    // Update in registered users storage
    try {
      const stored = localStorage.getItem('zura_registered_users');
      if (stored) {
        const users = JSON.parse(stored);
        const idx = users.findIndex((u: any) => 
          (u.phone && u.phone === user.phone) || 
          (u.id && u.id === user.id)
        );
        if (idx !== -1) {
          users[idx].name = trimmed;
          localStorage.setItem('zura_registered_users', JSON.stringify(users));
        }
      }
    } catch (e) {}

    // Update customerName in existing orders for this user
    setOrders(prev => prev.map(o => {
      const isMatch = (o.userId && o.userId === user.id) || 
                      (o.customerPhone && o.customerPhone === user.phone);
      if (isMatch) {
        return { ...o, customerName: trimmed };
      }
      return o;
    }));

    return true;
  };

  // Persistent Client Session ID for guest visitors
  const [customerSessionId] = useState<string>(() => {
    let sid = localStorage.getItem('zura_client_session_id');
    if (!sid) {
      sid = 'client_' + Math.floor(100000 + Math.random() * 900000);
      localStorage.setItem('zura_client_session_id', sid);
    }
    return sid;
  });

  // Orders State (Master list for admin, metrics, and testimonials)
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('zura_orders');
      if (saved) {
        const parsed: Order[] = JSON.parse(saved);
        return parsed.filter(o => !o.id.startsWith('ord-demo-'));
      }
    } catch {}
    return INITIAL_ORDERS;
  });

  // Track order codes checked out on this specific visitor device/browser
  const [myOrderCodes, setMyOrderCodes] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('zura_my_order_codes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('zura_my_order_codes', JSON.stringify(myOrderCodes));
    } catch {}
  }, [myOrderCodes]);

  useEffect(() => {
    if (user?.role === 'admin') {
      localStorage.setItem('zura_orders', JSON.stringify(orders));
    } else {
      // Data Privacy Guard: mask other customers' phone and remove sensitive form data in visitor localStorage
      const sanitizedOrders = orders.map(o => {
        const isMine = myOrderCodes.includes(o.orderCode) || (user && (o.userId === user.id || o.customerPhone === user.phone));
        if (isMine) return o;
        return {
          ...o,
          customerPhone: o.customerPhone ? `${o.customerPhone.slice(0, 4)}••••${o.customerPhone.slice(-2)}` : '',
          extraFormData: undefined
        };
      });
      localStorage.setItem('zura_orders', JSON.stringify(sanitizedOrders));
    }
  }, [orders, user, myOrderCodes]);

  // Isolated orders for this customer (visitors never see demo or other users' orders)
  const myOrders = useMemo(() => {
    if (user?.role === 'admin') return orders;

    return orders.filter(o => {
      if (user) {
        if (o.userId && o.userId === user.id) return true;
        const cleanUserPhone = user.phone.replace(/[^0-9]/g, '');
        const cleanOrderPhone = (o.customerPhone || '').replace(/[^0-9]/g, '');
        if (cleanUserPhone && cleanOrderPhone && cleanUserPhone === cleanOrderPhone) return true;
        if (o.customerName && o.customerName.toLowerCase() === user.name.toLowerCase()) return true;
      }
      return myOrderCodes.includes(o.orderCode);
    });
  }, [orders, user, myOrderCodes]);

  // Auto-Complete Review (1-2 Jam):
  // Jika pesanan sudah berstatus 'completed' selama lebih dari 1 jam namun pembeli belum mengisi ulasan,
  // sistem secara otomatis menetapkan rating 5 bintang dan testimoni terverifikasi.
  useEffect(() => {
    const AUTO_REVIEW_TIMEOUT_MS = 60 * 60 * 1000; // 1 Jam

    const checkAutoReviews = () => {
      setOrders(prevOrders => {
        let hasChanges = false;
        const now = Date.now();

        const updated = prevOrders.map(order => {
          if (order.status === 'completed' && !order.reviewSubmittedAt) {
            const finishTime = order.completedAt || order.createdAt;
            if (now - finishTime >= AUTO_REVIEW_TIMEOUT_MS) {
              hasChanges = true;
              const autoReview = 'Pelayanan cepat.';
              const existingReceipt = order.receipt || {
                receiptNumber: `REC-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${order.orderCode.slice(-4)}`,
                transactionDate: new Date(order.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) + ' WIB',
                serviceName: order.itemName,
                variantOrRank: order.itemDetails,
                customerName: order.customerName,
                customerPhone: order.customerPhone,
                amount: order.totalAmount,
                paymentMethod: order.paymentMethod,
                paymentStatus: 'SELESAI' as const
              };

              const updatedReceipt: WebReceipt = {
                ...existingReceipt,
                completedDate: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) + ' WIB',
                rating: 5,
                review: autoReview,
                paymentStatus: 'SELESAI'
              };

              return {
                ...order,
                rating: 5,
                reviewText: autoReview,
                reviewSubmittedAt: now,
                receipt: updatedReceipt
              };
            }
          }
          return order;
        });

        return hasChanges ? updated : prevOrders;
      });
    };

    checkAutoReviews();
    const interval = setInterval(checkAutoReviews, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // WhatsApp Testimonials State (Auto-invalidate old cache and load all 16 authentic testimonials)
  const [testimonials, setTestimonials] = useState<WhatsAppTestimonial[]>(() => {
    try {
      localStorage.removeItem('zura_testimonials');
      localStorage.removeItem('zura_testimonials_v2');

      const saved = localStorage.getItem('zura_testimonials_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= INITIAL_WHATSAPP_TESTIMONIALS.length && !parsed.some((t: any) => t.screenshotUrl?.includes('unsplash.com') || t.avatar?.includes('unsplash.com'))) {
          return parsed;
        }
      }
    } catch {}
    localStorage.setItem('zura_testimonials_v3', JSON.stringify(INITIAL_WHATSAPP_TESTIMONIALS));
    return INITIAL_WHATSAPP_TESTIMONIALS;
  });

  useEffect(() => {
    // Proactively purge any lingering dummy or partial data
    if (testimonials.length < INITIAL_WHATSAPP_TESTIMONIALS.length || testimonials.some(t => t.screenshotUrl?.includes('unsplash.com') || t.avatar?.includes('unsplash.com'))) {
      setTestimonials(INITIAL_WHATSAPP_TESTIMONIALS);
      localStorage.setItem('zura_testimonials_v3', JSON.stringify(INITIAL_WHATSAPP_TESTIMONIALS));
      return;
    }
    localStorage.setItem('zura_testimonials_v3', JSON.stringify(testimonials));
  }, [testimonials]);

  // Real-time Chat Messages State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('zura_chat_messages');
      if (saved) {
        const parsed: ChatMessage[] = JSON.parse(saved);
        return parsed.filter(m => !m.id.startsWith('msg-d') && !m.id.startsWith('msg-a'));
      }
    } catch {}
    return INITIAL_CHAT_MESSAGES;
  });

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // View mode routing: 'store' | 'admin-login' | 'admin-dashboard'
  const [viewMode, setViewModeState] = useState<'store' | 'admin-login' | 'admin-dashboard'>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#admin' || hash === '#admin-dashboard') {
        const savedUser = localStorage.getItem('zura_user');
        if (savedUser) {
          try {
            const u = JSON.parse(savedUser);
            if (u.role === 'admin' || u.id === 'usr_admin' || u.name === 'Zura Super Admin') return 'admin-dashboard';
          } catch {}
        }
        return 'admin-login';
      }
      if (hash === '#login-admin' || hash === '#admin-login') {
        return 'admin-login';
      }
      const savedMode = localStorage.getItem('zura_view_mode');
      if (savedMode === 'admin-dashboard') {
        const savedUser = localStorage.getItem('zura_user');
        if (savedUser) {
          try {
            const u = JSON.parse(savedUser);
            if (u.role === 'admin' || u.id === 'usr_admin' || u.name === 'Zura Super Admin') return 'admin-dashboard';
          } catch {}
        }
      }
    }
    return 'store';
  });

  const setViewMode = (mode: 'store' | 'admin-login' | 'admin-dashboard') => {
    setViewModeState(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('zura_view_mode', mode);
      if (mode === 'admin-dashboard') {
        window.location.hash = 'admin';
      } else if (mode === 'admin-login') {
        window.location.hash = 'admin-login';
      } else {
        if (window.location.hash === '#admin' || window.location.hash === '#admin-login' || window.location.hash === '#admin-dashboard') {
          try {
            history.replaceState(null, '', window.location.pathname + window.location.search);
          } catch {}
        }
      }
    }
  };

  // Deep linking and hash change listener (#admin, #admin-login)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#admin' || hash === '#admin-dashboard') {
        const savedUser = localStorage.getItem('zura_user');
        if (savedUser) {
          try {
            const u = JSON.parse(savedUser);
            if (u.role === 'admin' || u.id === 'usr_admin' || u.name === 'Zura Super Admin') {
              setViewModeState('admin-dashboard');
              return;
            }
          } catch {}
        }
        setViewModeState('admin-login');
      } else if (hash === '#admin-login' || hash === '#login-admin') {
        setViewModeState('admin-login');
      }
    };

    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const adminLogin = async (identifier: string, pass: string): Promise<boolean> => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanDigits = identifier.replace(/[^0-9]/g, '');
    const isIdAdmin = 
      cleanId === 'admin' ||
      cleanId === 'superadmin' ||
      cleanId === ADMIN_CREDENTIALS.email.toLowerCase() ||
      cleanId === 'admin@zura-w.my.id' ||
      cleanId === 'zuraw.official@gmail.com' ||
      cleanDigits === '082172795156' ||
      cleanDigits === '6282172795156' ||
      cleanDigits === ADMIN_CONFIG.whatsappNumber;

    if (!isIdAdmin) return false;

    const hashedInput = await hashPassword(pass);
    if (hashedInput === ADMIN_CREDENTIALS.passwordHash) {
      const adminUser: User = {
        id: 'usr_admin',
        name: 'Zura Super Admin',
        phone: ADMIN_CONFIG.whatsappNumber,
        email: ADMIN_CREDENTIALS.email,
        role: 'admin'
      };
      setUser(adminUser);
      localStorage.setItem('zura_user', JSON.stringify(adminUser));
      setViewMode('admin-dashboard');
      return true;
    }
    return false;
  };

  // Modals state (Popups are for Checkout, Login, Tracking, Receipt, Customer Profile, Terms)
  const [activeModal, setActiveModal] = useState<'login' | 'checkout' | 'tracking' | 'receipt' | 'customer-profile' | 'terms' | null>(null);
  const [checkoutItem, setCheckoutItem] = useState<any>(null);
  const [activeOrderToTrack, setActiveOrderToTrack] = useState<Order | null>(null);
  const [activeReceiptOrder, setActiveReceiptOrder] = useState<Order | null>(null);

  // Admin selected active chat room in Admin Hub
  const [adminActiveRoomId, setAdminActiveRoomId] = useState<string>('');

  // Determine current active room for this specific customer
  const customerRoomId = activeOrderToTrack 
    ? activeOrderToTrack.orderCode 
    : (myOrders[0]?.orderCode || customerSessionId);

  useEffect(() => {
    localStorage.setItem('zura_chat_messages', JSON.stringify(chatMessages));
  }, [chatMessages]);

  // Cross-tab real-time sync with BroadcastChannel
  useEffect(() => {
    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel('zura_store_sync');
      channel.onmessage = (event) => {
        if (event.data?.type === 'NEW_CHAT_MESSAGE') {
          const incomingMsg = event.data.payload as ChatMessage;
          setChatMessages((prev) => {
            if (prev.some((m) => m.id === incomingMsg.id)) return prev;
            return [...prev, incomingMsg];
          });
          soundService.playNewMessageSound();
          // Only increment unread if the message is in customer's room
          if (!isChatOpen && incomingMsg.roomId === customerRoomId) {
            setUnreadCount((c) => c + 1);
          }
        } else if (event.data?.type === 'STATUS_CHANGE') {
          setAdminStatusState(event.data.payload);
        } else if (event.data?.type === 'ORDER_UPDATED') {
          const updatedOrders = event.data.payload;
          setOrders(updatedOrders);
        } else if (event.data?.type === 'NEW_ORDER') {
          const incomingOrder = event.data.payload;
          soundService.playNewOrderSound();
          if (incomingOrder) {
            notifyNewOrder(incomingOrder);
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('zura:new-order', { detail: incomingOrder }));
            }
          }
        }
      };
    } catch (e) {
      console.warn('BroadcastChannel not supported');
    }

    return () => {
      if (channel) channel.close();
    };
  }, [isChatOpen, customerRoomId]);

  // Supabase Cloud Real-time Synchronizer (24/7 cross-device sync)
  useEffect(() => {
    // 1. Initial hydration from Supabase Cloud
    fetchCloudOrders().then(cloudOrders => {
      if (cloudOrders && cloudOrders.length > 0) {
        setOrders(cloudOrders);
      }
    });

    fetchCloudMessages().then(cloudMsgs => {
      if (cloudMsgs && cloudMsgs.length > 0) {
        setChatMessages(cloudMsgs);
      }
    });

    fetchCloudAdminStatus().then(cloudStatus => {
      if (cloudStatus) {
        setAdminStatusState(cloudStatus);
      }
    });

    // 2. Real-time PostgreSQL subscription
    const realtimeChannel = supabase
      .channel('zura-store-live')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        (payload: any) => {
          if (payload.eventType === 'INSERT') {
            const newOrder = (payload.new?.data || payload.new) as Order;
            if (newOrder?.id) {
              setOrders(prev => {
                if (prev.some(o => o.id === newOrder.id)) return prev;
                return [newOrder, ...prev];
              });
              soundService.playNewOrderSound();
              notifyNewOrder(newOrder);
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('zura:new-order', { detail: newOrder }));
              }
            }
          } else if (payload.eventType === 'UPDATE') {
            const updated = (payload.new?.data || payload.new) as Order;
            if (updated?.id) {
              setOrders(prev => prev.map(o => o.id === updated.id ? updated : o));
            }
          } else if (payload.eventType === 'DELETE') {
            const deletedId = payload.old?.id;
            if (deletedId) {
              setOrders(prev => prev.filter(o => o.id !== deletedId));
            }
          }
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chat_messages' },
        (payload: any) => {
          if (payload.eventType === 'INSERT') {
            const newMsg = (payload.new?.data || payload.new) as ChatMessage;
            if (newMsg?.id) {
              setChatMessages(prev => {
                if (prev.some(m => m.id === newMsg.id)) return prev;
                return [...prev, newMsg];
              });
              soundService.playNewMessageSound();
              if (newMsg.sender === 'customer') {
                notifyNewChatMessage(newMsg.senderName, newMsg.text, newMsg.orderCode);
              }
              if (!isChatOpen && newMsg.roomId === customerRoomId) {
                setUnreadCount(c => c + 1);
              }
            }
          } else if (payload.eventType === 'DELETE') {
            const deletedId = payload.old?.id;
            if (deletedId) {
              setChatMessages(prev => prev.filter(m => m.id !== deletedId));
            }
          }
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'store_settings' },
        (payload: any) => {
          if (payload.new?.key === 'admin_status') {
            setAdminStatusState(payload.new.value === 'offline' ? 'offline' : 'online');
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(realtimeChannel);
    };
  }, [customerRoomId, isChatOpen]);

  const markChatAsRead = () => {
    setUnreadCount(0);
  };

  const getMessagesForRoom = (roomId: string) => {
    return chatMessages.filter(m => m.roomId === roomId);
  };

  const getAllRooms = (): ChatRoom[] => {
    const roomMap: Record<string, ChatRoom> = {};

    // 1. Order rooms (isolated per checkout code)
    orders.forEach(ord => {
      const msgs = chatMessages.filter(m => m.roomId === ord.orderCode);
      const lastMsg = msgs[msgs.length - 1];
      // Live chat automatically closes 30 mins after review is submitted, or if explicitly closed
      const isAutoClosed = Boolean(
        ord.chatClosed ||
        (ord.reviewSubmittedAt && (Date.now() - ord.reviewSubmittedAt > 1000 * 60 * 30))
      );

      roomMap[ord.orderCode] = {
        roomId: ord.orderCode,
        type: 'order',
        customerName: ord.customerName,
        customerPhone: ord.customerPhone,
        orderCode: ord.orderCode,
        serviceName: ord.itemName,
        orderStatus: ord.status,
        createdAt: ord.createdAt,
        lastMessageText: lastMsg ? (lastMsg.text || '[Lampiran Foto / Bukti]') : 'Pesanan dibuat. Menunggu konfirmasi.',
        lastMessageTime: lastMsg ? lastMsg.timestamp : ord.createdAt,
        unreadCount: msgs.filter(m => !m.isRead && m.sender === 'customer').length,
        isClosed: isAutoClosed,
        closedAt: ord.chatClosedAt || (isAutoClosed ? ord.reviewSubmittedAt : undefined),
        reviewSubmittedAt: ord.reviewSubmittedAt,
        rating: ord.rating,
        reviewText: ord.reviewText
      };
    });

    // 2. Guest & General CS Inquiry rooms
    chatMessages.forEach(msg => {
      if (!roomMap[msg.roomId]) {
        roomMap[msg.roomId] = {
          roomId: msg.roomId,
          type: 'general',
          customerName: msg.senderName || 'Pengunjung Web',
          customerPhone: msg.customerPhone,
          orderCode: msg.orderCode,
          serviceName: 'Tanya Jawab CS Umum',
          createdAt: msg.timestamp,
          lastMessageText: msg.text || '[Lampiran Foto / Gambar]',
          lastMessageTime: msg.timestamp,
          unreadCount: 0
        };
      }
    });

    return Object.values(roomMap).sort((a, b) => b.lastMessageTime - a.lastMessageTime);
  };

  const sendChatMessage = (
    text: string, 
    targetRoomId?: string,
    overrideSender?: 'customer' | 'admin',
    orderCodeParam?: string,
    imageUrl?: string
  ) => {
    const sender = overrideSender || (user?.role === 'admin' ? 'admin' : 'customer');
    const senderName = sender === 'admin' 
      ? 'Admin Zura' 
      : (user?.name || 'Pelanggan');

    const effectiveRoomId = targetRoomId || customerRoomId;
    const effectiveOrderCode = orderCodeParam || (effectiveRoomId.startsWith('ZURA-') ? effectiveRoomId : undefined);

    const newMsg: ChatMessage = {
      id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      roomId: effectiveRoomId,
      orderCode: effectiveOrderCode,
      sender,
      senderName,
      customerPhone: user?.phone,
      text,
      imageUrl,
      timestamp: Date.now(),
      isRead: false
    };

    const updated = [...chatMessages, newMsg];
    setChatMessages(updated);
    insertCloudMessage(newMsg);

    try {
      const channel = new BroadcastChannel('zura_store_sync');
      channel.postMessage({ type: 'NEW_CHAT_MESSAGE', payload: newMsg });
      channel.close();
    } catch (e) {}

    soundService.playNewMessageSound();

    if (sender === 'customer') {
      notifyChatMessageTelegram(senderName, text, effectiveOrderCode, Boolean(imageUrl)).catch(() => {});
    }

    // Auto bot response if admin is offline
    if (sender === 'customer' && adminStatus === 'offline') {
      setTimeout(() => {
        const offlineReply: ChatMessage = {
          id: 'msg_off_' + Date.now(),
          roomId: effectiveRoomId,
          orderCode: effectiveOrderCode,
          sender: 'system',
          senderName: 'Sistem Zura (Auto-Reply)',
          text: `Halo ${senderName}! Saat ini Admin Zura sedang OFFLINE. Pesanan/pertanyaan Anda di ruang chat ${effectiveRoomId} telah tersimpan. Jika dalam 10 menit belum dibalas, silakan klik tombol WhatsApp dengan kode pesanan Anda.`,
          timestamp: Date.now(),
          isRead: false
        };
        setChatMessages(prev => [...prev, offlineReply]);
      }, 1000);
    }
  };

  const openCheckout = (item: any, type: 'joki_game' | 'app_premium' | 'design_ai') => {
    setCheckoutItem({ ...item, serviceType: type });
    setActiveModal('checkout');
  };

  const openOrderTracking = (order: Order) => {
    setActiveOrderToTrack(order);
    setActiveModal('tracking');
  };

  const openReceiptModal = (order: Order) => {
    let orderToUse = order;
    if (!orderToUse.receipt) {
      const dateStr = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) + ' WIB';
      const receipt: WebReceipt = {
        receiptNumber: `REC-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${order.orderCode.slice(-4)}`,
        transactionDate: new Date(order.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) + ' WIB',
        completedDate: dateStr,
        serviceName: order.itemName,
        variantOrRank: order.itemDetails,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        accountDetails: order.extraFormData,
        amount: order.totalAmount,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.status === 'completed' ? 'SELESAI' : order.status === 'cancelled' ? 'BATAL' : 'DIPROSES',
        adminNotes: 'Bukti transaksi resmi Zura Store.',
        rating: order.rating || 5,
        review: order.reviewText || 'Pelayanan cepat dan terpercaya.'
      };
      orderToUse = { ...order, receipt };
    }
    setActiveReceiptOrder(orderToUse);
    setActiveModal('receipt');
  };

  const createOrder = (orderData: Omit<Order, 'id' | 'orderCode' | 'createdAt' | 'status' | 'adminResponseReceived'>) => {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const prefix = orderData.serviceType === 'joki_game' ? 'ML' : orderData.serviceType === 'app_premium' ? 'APP' : 'DSN';
    const orderCode = `ZURA-${prefix}-${randomSuffix}`;
    
    const newOrder: Order = {
      ...orderData,
      id: 'ord_' + Date.now(),
      orderCode,
      createdAt: Date.now(),
      status: 'pending_admin',
      adminResponseReceived: false,
    };

    const updated = [newOrder, ...orders];
    setOrders(updated);
    upsertCloudOrder(newOrder);
    setMyOrderCodes(prev => prev.includes(orderCode) ? prev : [orderCode, ...prev]);
    setActiveOrderToTrack(newOrder);
    setActiveModal('tracking');

    // Post system message directly into this customer's private room
    const orderSystemMsg: ChatMessage = {
      id: 'msg_order_' + Date.now(),
      roomId: orderCode, // Private room for this exact checkout code!
      orderCode,
      sender: 'system',
      senderName: 'Sistem Zura',
      customerPhone: newOrder.customerPhone,
      text: `[SISTEM] Pesanan Dibuat! (KODE: ${orderCode}) - Produk: ${newOrder.itemName} (${newOrder.itemDetails}). Menunggu respon admin di web (Batas waktu: 10 menit).`,
      timestamp: Date.now(),
      isRead: false
    };

    setChatMessages(prev => [...prev, orderSystemMsg]);
    insertCloudMessage(orderSystemMsg);

    try {
      const channel = new BroadcastChannel('zura_store_sync');
      channel.postMessage({ type: 'NEW_CHAT_MESSAGE', payload: orderSystemMsg });
      channel.postMessage({ type: 'ORDER_UPDATED', payload: updated });
      channel.postMessage({ type: 'NEW_ORDER', payload: newOrder });
      channel.close();
    } catch (e) {}

    soundService.playNewOrderSound();
    notifyNewOrder(newOrder);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('zura:new-order', { detail: newOrder }));
    }
    notifyNewOrderTelegram(newOrder).catch(() => {});

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status'], receiptData?: Partial<WebReceipt>) => {
    const updated = orders.map(order => {
      if (order.id !== orderId) return order;

      const updatedOrder: Order = {
        ...order,
        status,
        adminResponseReceived: true,
        adminRespondedAt: Date.now()
      };

      if (status === 'completed') {
        const now = Date.now();
        updatedOrder.completedAt = now;

        // Auto-purge sensitive account passwords/PINs for game joki orders
        if (order.extraFormData) {
          const { sanitized, hadSensitiveData } = purgeSensitiveFormData(order.extraFormData);
          updatedOrder.extraFormData = sanitized;
          if (hadSensitiveData) {
            updatedOrder.credentialsPurged = true;
          }
        }

        const verificationHash = order.verificationHash || generateVerificationFingerprint(order.orderCode, order.totalAmount, order.createdAt);
        updatedOrder.verificationHash = verificationHash;

        const dateStr = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) + ' WIB';
        const receipt: WebReceipt = {
          receiptNumber: `REC-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${order.orderCode.slice(-4)}`,
          transactionDate: new Date(order.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) + ' WIB',
          completedDate: dateStr,
          serviceName: order.itemName,
          variantOrRank: order.itemDetails,
          customerName: order.customerName,
          customerPhone: order.customerPhone,
          amount: order.totalAmount,
          voucherCode: order.voucherCode,
          discountAmount: order.discountAmount,
          originalAmount: order.originalAmount,
          verificationHash,
          paymentMethod: order.paymentMethod,
          paymentStatus: 'SELESAI',
          adminNotes: receiptData?.adminNotes || 'Transaksi diselesaikan secara resmi oleh Admin Zura Store.',
          rating: receiptData?.rating || order.rating || 5,
          review: receiptData?.review || order.reviewText,
          ...receiptData
        };
        updatedOrder.receipt = receipt;

        // Post completion message to this customer's private room with review request
        const completedMsg: ChatMessage = {
          id: 'msg_done_' + Date.now(),
          roomId: order.orderCode,
          orderCode: order.orderCode,
          sender: 'admin',
          senderName: 'Admin Zura',
          text: `🎉 [SELESAI] Pesanan ${order.orderCode} (${order.itemName}) telah SELESAI dikerjakan!\n\nSilakan berikan rating ⭐ bintang dan ulasan kepuasan Anda di sini atau via menu Lacak Pesanan. Ulasan Anda akan otomatis tayang di halaman testimoni web!`,
          timestamp: Date.now(),
          isRead: false
        };
        setChatMessages(prev => [...prev, completedMsg]);
        insertCloudMessage(completedMsg);
      }

      return updatedOrder;
    });

    setOrders(updated);
    const target = updated.find(o => o.id === orderId);
    if (target) upsertCloudOrder(target);

    try {
      const channel = new BroadcastChannel('zura_store_sync');
      channel.postMessage({ type: 'ORDER_UPDATED', payload: updated });
      channel.close();
    } catch (e) {}
  };

  const deleteOrder = (orderId: string) => {
    const targetOrder = orders.find(o => o.id === orderId);
    if (!targetOrder) return;

    const updated = orders.filter(o => o.id !== orderId);
    setOrders(updated);
    deleteCloudOrder(orderId);

    if (activeOrderToTrack?.id === orderId) {
      setActiveOrderToTrack(null);
      if (activeModal === 'tracking') setActiveModal(null);
    }

    try {
      const channel = new BroadcastChannel('zura_store_sync');
      channel.postMessage({ type: 'ORDER_UPDATED', payload: updated });
      channel.close();
    } catch (e) {}
  };

  const cancelOrder = (orderId: string, reason?: string) => {
    const updated = orders.map(order => {
      if (order.id !== orderId) return order;
      return {
        ...order,
        status: 'cancelled' as const,
        adminResponseReceived: true,
        adminRespondedAt: Date.now()
      };
    });
    setOrders(updated);
    const target = updated.find(o => o.id === orderId);
    if (target) upsertCloudOrder(target);

    const cancelledOrder = orders.find(o => o.id === orderId);
    if (cancelledOrder) {
      const cancelMsg: ChatMessage = {
        id: 'msg_cancel_' + Date.now(),
        roomId: cancelledOrder.orderCode,
        orderCode: cancelledOrder.orderCode,
        sender: 'system',
        senderName: 'Sistem Zura',
        text: `[BATAL] Pesanan (KODE: ${cancelledOrder.orderCode}) telah DIBATALKAN${reason ? `: ${reason}` : '.'}`,
        timestamp: Date.now(),
        isRead: false
      };
      setChatMessages(prev => [...prev, cancelMsg]);
      try {
        const channel = new BroadcastChannel('zura_store_sync');
        channel.postMessage({ type: 'NEW_CHAT_MESSAGE', payload: cancelMsg });
        channel.postMessage({ type: 'ORDER_UPDATED', payload: updated });
        channel.close();
      } catch (e) {}
    }
  };

  const submitOrderReview = (orderId: string, rating: number, review: string) => {
    const now = Date.now();
    const updated = orders.map(order => {
      if (order.id !== orderId) return order;

      const dateStr = new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) + ' WIB';
      const existingReceipt = order.receipt || {
        receiptNumber: `REC-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}-${order.orderCode.slice(-4)}`,
        transactionDate: new Date(order.createdAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }) + ' WIB',
        serviceName: order.itemName,
        variantOrRank: order.itemDetails,
        customerName: order.customerName,
        customerPhone: order.customerPhone,
        amount: order.totalAmount,
        paymentMethod: order.paymentMethod,
        paymentStatus: 'SELESAI' as const
      };

      const updatedReceipt: WebReceipt = {
        ...existingReceipt,
        completedDate: dateStr,
        rating,
        review,
        paymentStatus: 'SELESAI'
      };

      return {
        ...order,
        status: 'completed' as const,
        rating,
        reviewText: review,
        reviewSubmittedAt: now,
        receipt: updatedReceipt
      };
    });

    setOrders(updated);

    const targetOrder = updated.find(o => o.id === orderId);
    if (targetOrder) {
      if (activeOrderToTrack?.id === orderId) {
        setActiveOrderToTrack(targetOrder);
      }

      const reviewMsg: ChatMessage = {
        id: 'msg_rev_' + Date.now(),
        roomId: targetOrder.orderCode,
        orderCode: targetOrder.orderCode,
        sender: 'system',
        senderName: 'Sistem Zura',
        text: `⭐ Terima kasih! Anda memberikan ulasan (${rating}/5 bintang): "${review}". Sesi live chat order ini akan ditutup otomatis dalam 30-60 menit setelah review untuk menjaga performa antrean.`,
        timestamp: Date.now(),
        isRead: false
      };
      setChatMessages(prev => [...prev, reviewMsg]);

      if (rating >= 4) {
        addWhatsAppTestimonial({
          customerName: targetOrder.customerName,
          serviceCategory: targetOrder.itemName,
          date: 'Hari ini',
          chatSnippet: review,
          screenshotUrl: targetOrder.paymentProofUrl || '/testimonials/wuwa/Group 1.png',
          rating,
          orderCode: targetOrder.orderCode
        });
      }

      try {
        const channel = new BroadcastChannel('zura_store_sync');
        channel.postMessage({ type: 'NEW_CHAT_MESSAGE', payload: reviewMsg });
        channel.postMessage({ type: 'ORDER_UPDATED', payload: updated });
        channel.close();
      } catch (e) {}
    }
  };

  const closeChatRoom = (roomId: string) => {
    const updated = orders.map(ord => {
      if (ord.orderCode === roomId) {
        return {
          ...ord,
          chatClosed: true,
          chatClosedAt: Date.now()
        };
      }
      return ord;
    });
    setOrders(updated);

    const closeMsg: ChatMessage = {
      id: 'msg_close_' + Date.now(),
      roomId,
      orderCode: roomId.startsWith('ZURA-') ? roomId : undefined,
      sender: 'system',
      senderName: 'Sistem Zura',
      text: `[INFO] Sesi live chat untuk ruang #${roomId} telah resmi ditutup. Terima kasih telah menggunakan layanan Zura Store!`,
      timestamp: Date.now(),
      isRead: false
    };
    setChatMessages(prev => [...prev, closeMsg]);

    try {
      const channel = new BroadcastChannel('zura_store_sync');
      channel.postMessage({ type: 'NEW_CHAT_MESSAGE', payload: closeMsg });
      channel.postMessage({ type: 'ORDER_UPDATED', payload: updated });
      channel.close();
    } catch (e) {}
  };

  const deleteChatRoom = (roomId: string) => {
    setChatMessages(prev => prev.filter(m => m.roomId !== roomId));
    deleteCloudChatRoom(roomId);
  };

  const addWhatsAppTestimonial = (testi: Omit<WhatsAppTestimonial, 'id'>) => {
    const newTesti: WhatsAppTestimonial = {
      ...testi,
      id: 'wa_' + Date.now()
    };
    setTestimonials(prev => [newTesti, ...prev]);
  };

  const generateWhatsAppLink = (orderCode: string, itemName: string, totalAmount: number, customNote?: string) => {
    const phone = ADMIN_CONFIG.whatsappNumber;
    const formattedPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(totalAmount);
    
    let message = `Halo Admin ZURA STORE! 👋\n\n`;
    message += `Saya ingin konfirmasi pesanan:\n`;
    message += `🏷️ *KODE CHECKOUT:* ${orderCode}\n`;
    message += `📦 *Produk/Jasa:* ${itemName}\n`;
    message += `💰 *Total Tagihan:* ${formattedPrice}\n\n`;
    if (customNote) {
      message += `📝 *Catatan:* ${customNote}\n\n`;
    }
    message += `Mohon segera diproses ya min, terima kasih! 🚀`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const triggerPaymentProofChat = (order: Order) => {
    setActiveModal(null);
    setActiveOrderToTrack(order);
    setIsChatOpen(true);
    const amountStr = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(order.totalAmount);
    sendChatMessage(
      `Halo Admin Zura! Saya sudah transfer untuk pesanan #${order.orderCode} (${order.itemName}) via QRIS / DANA / GoPay sebesar ${amountStr}. Ini bukti pembayarannya:`,
      order.orderCode,
      'customer',
      order.orderCode
    );
  };

  return (
    <AppContext.Provider
      value={{
        adminStatus,
        setAdminStatus,
        user,
        login,
        logout,
        orders,
        myOrders,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        cancelOrder,
        submitOrderReview,
        closeChatRoom,
        deleteChatRoom,
        testimonials,
        addWhatsAppTestimonial,
        customerRoomId,
        customerSessionId,
        adminActiveRoomId,
        setAdminActiveRoomId,
        chatMessages,
        sendChatMessage,
        getMessagesForRoom,
        getAllRooms,
        isChatOpen,
        setIsChatOpen,
        unreadCount,
        markChatAsRead,
        viewMode,
        setViewMode,
        adminLogin,
        activeModal,
        setActiveModal,
        updateUserName,
        checkoutItem,
        openCheckout,
        activeOrderToTrack,
        openOrderTracking,
        activeReceiptOrder,
        openReceiptModal,
        generateWhatsAppLink,
        triggerPaymentProofChat,
        isSoundEnabled,
        toggleSound,
        testSound
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
