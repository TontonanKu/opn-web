import { supabase } from './supabaseClient';
import { Order, ChatMessage, AdminStatusType } from '../types';

/**
 * Supabase Cloud Sync Utilities for Zura Store.
 * Provides bi-directional realtime sync between all clients (buyer & admin).
 */

// 1. Fetch Orders from Supabase
export const fetchCloudOrders = async (): Promise<Order[] | null> => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return null;

    return data.map((row) => ({
      ...row.data,
      id: row.id,
      orderCode: row.order_code,
      status: row.status,
      createdAt: Number(row.created_at)
    }));
  } catch (err) {
    console.warn('Failed to fetch orders from Supabase:', err);
    return null;
  }
};

// 2. Save / Upsert Order to Supabase
export const upsertCloudOrder = async (order: Order): Promise<boolean> => {
  try {
    const { error } = await supabase.from('orders').upsert({
      id: order.id,
      order_code: order.orderCode,
      customer_name: order.customerName,
      customer_phone: order.customerPhone,
      status: order.status,
      created_at: order.createdAt,
      data: order
    });

    if (error) {
      console.warn('Failed to upsert order to Supabase:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Error saving order to Supabase:', err);
    return false;
  }
};

// 3. Delete Order from Supabase
export const deleteCloudOrder = async (orderId: string): Promise<boolean> => {
  try {
    const { error } = await supabase.from('orders').delete().eq('id', orderId);
    return !error;
  } catch {
    return false;
  }
};

// 4. Fetch Chat Messages from Supabase
export const fetchCloudMessages = async (): Promise<ChatMessage[] | null> => {
  try {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .order('timestamp', { ascending: true });

    if (error || !data) return null;

    return data.map((row) => ({
      ...row.data,
      id: row.id,
      roomId: row.room_id,
      sender: row.sender,
      text: row.text,
      timestamp: Number(row.timestamp)
    }));
  } catch (err) {
    console.warn('Failed to fetch messages from Supabase:', err);
    return null;
  }
};

// 5. Save Chat Message to Supabase
export const insertCloudMessage = async (msg: ChatMessage): Promise<boolean> => {
  try {
    const { error } = await supabase.from('chat_messages').upsert({
      id: msg.id,
      room_id: msg.roomId,
      sender: msg.sender,
      text: msg.text || '',
      timestamp: msg.timestamp,
      data: msg
    });

    return !error;
  } catch {
    return false;
  }
};

// 6. Delete Chat Room from Supabase
export const deleteCloudChatRoom = async (roomId: string): Promise<boolean> => {
  try {
    const { error } = await supabase.from('chat_messages').delete().eq('room_id', roomId);
    return !error;
  } catch {
    return false;
  }
};

// 7. Store Settings (Admin status online/offline/away)
export const updateCloudAdminStatus = async (status: AdminStatusType): Promise<boolean> => {
  try {
    const { error } = await supabase.from('store_settings').upsert({
      key: 'admin_status',
      value: status,
      updated_at: new Date().toISOString()
    });
    return !error;
  } catch {
    return false;
  }
};

export const fetchCloudAdminStatus = async (): Promise<AdminStatusType | null> => {
  try {
    const { data, error } = await supabase
      .from('store_settings')
      .select('value')
      .eq('key', 'admin_status')
      .single();

    if (error || !data) return null;
    return (data.value as AdminStatusType) || 'online';
  } catch {
    return null;
  }
};
