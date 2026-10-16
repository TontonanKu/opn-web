-- Script Schema Supabase untuk ZURA STORE

-- 1. Tabel Pesanan (Orders)
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  order_code TEXT NOT NULL UNIQUE,
  customer_name TEXT,
  customer_phone TEXT,
  status TEXT NOT NULL DEFAULT 'pending_admin',
  created_at BIGINT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- 2. Tabel Obrolan Live Chat (Chat Messages)
CREATE TABLE IF NOT EXISTS chat_messages (
  id TEXT PRIMARY KEY,
  room_id TEXT NOT NULL,
  sender TEXT NOT NULL,
  text TEXT,
  timestamp BIGINT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- 3. Tabel Pengaturan Toko (Status Admin)
CREATE TABLE IF NOT EXISTS store_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO store_settings (key, value) VALUES ('admin_status', 'online')
ON CONFLICT (key) DO NOTHING;

-- 4. Aktifkan Realtime WebSocket
ALTER PUBLICATION supabase_realtime ADD TABLE orders;
ALTER PUBLICATION supabase_realtime ADD TABLE chat_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE store_settings;

-- 5. Row Level Security Policies
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "orders_select_policy" ON orders FOR SELECT USING (true);
CREATE POLICY "orders_insert_policy" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "orders_update_policy" ON orders FOR UPDATE USING (true);
CREATE POLICY "orders_delete_policy" ON orders FOR DELETE USING (true);

CREATE POLICY "chat_select_policy" ON chat_messages FOR SELECT USING (true);
CREATE POLICY "chat_insert_policy" ON chat_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "chat_delete_policy" ON chat_messages FOR DELETE USING (true);

CREATE POLICY "settings_select_policy" ON store_settings FOR SELECT USING (true);
CREATE POLICY "settings_update_policy" ON store_settings FOR UPDATE USING (true);
