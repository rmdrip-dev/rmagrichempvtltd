import { createClient } from '@supabase/supabase-js';

// Access environment variables directly
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

let client: any = null;

if (supabaseUrl && supabaseKey) {
  client = createClient(supabaseUrl, supabaseKey);
} else {
  console.warn('Supabase credentials missing. Running in mock mode.');
  // Mock client or null to prevent crashes if accidentally used
  client = {
    auth: {
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        getSession: async () => ({ data: { session: null } }),
        signInWithPassword: async () => ({ error: { message: 'Supabase not configured' } }),
        signOut: async () => {},
    },
    from: () => ({ select: () => ({}) })
  };
}

export const supabase = client;