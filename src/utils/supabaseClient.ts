import { createClient } from '@supabase/supabase-js';

const env = (import.meta as any).env || {};
const SUPABASE_URL = env.VITE_SUPABASE_URL || 'https://ajsynotpwbsluohwxvdh.supabase.co';
const SUPABASE_ANON_KEY = env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqc3lub3Rwd2JzbHVvaHd4dmRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIxNjMxNDMsImV4cCI6MjEwNzczOTE0M30.BA0EB4D4wBlX7yQid4PN5p_Y_CJgD6ZUWQW0zI1efYc';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});
