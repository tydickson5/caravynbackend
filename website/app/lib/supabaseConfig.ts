/**
 * Centralized Supabase configuration manager.
 * Supports swapping between Testing (dev) and Real Data (prod) databases.
 *
 * Security Note:
 * - apiKey (anon key): Safe for client-side and public queries.
 * - serviceRoleKey: Kept strictly on the server (/api/ routes) to securely
 *   insert waitlist applications through Supabase Row-Level Security (RLS).
 *   Never exposed to the browser.
 */

export type DbEnvironment = 'dev' | 'prod';

export function getActiveDbEnv(): DbEnvironment {
  const envVar = (
    process.env.NEXT_PUBLIC_DB_ENV ||
    process.env.DB_ENV ||
    ''
  ).toLowerCase().trim();

  if (envVar === 'prod' || envVar === 'production') {
    return 'prod';
  }
  if (envVar === 'dev' || envVar === 'development' || envVar === 'test') {
    return 'dev';
  }

  return process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
}

export function getSupabaseConfig() {
  const activeEnv = getActiveDbEnv();
  const isDev = activeEnv === 'dev';

  // DEV credentials (Testing DB)
  const devUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL_DEV ||
    'https://coeythfyfwzrwzuqowfe.supabase.co';
  const devApiKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_DEV ||
    process.env.SUPABASE_ANON_KEY_DEV ||
    '';
  const devServiceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY_DEV || '';

  // PROD credentials (Real Data DB)
  const prodUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL_PROD ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://vdxqfhrsuhmqdbpeqtbt.supabase.co';
  const prodApiKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_PROD ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    '';
  const prodServiceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY_PROD ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    '';

  const supabaseUrl = (isDev ? devUrl : prodUrl) || devUrl;
  const apiKey = isDev
    ? (devApiKey || prodApiKey)
    : (prodApiKey || devApiKey);
  const serviceRoleKey = isDev
    ? (devServiceKey || prodServiceKey)
    : (prodServiceKey || devServiceKey);
  const storageBucket =
    process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'post-media';

  return {
    activeEnv,
    isDev,
    supabaseUrl: supabaseUrl.replace(/\/+$/, ''),
    apiKey,
    serviceRoleKey,
    storageBucket,
  };
}
