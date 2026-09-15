/**
 * Centralized Supabase configuration manager.
 * Uses public Anon keys so you DO NOT need the privileged service_role key.
 *
 * How to swap:
 * 1. In website/.env, toggle NEXT_PUBLIC_DB_ENV:
 *      NEXT_PUBLIC_DB_ENV=dev   -> uses testing database
 *      NEXT_PUBLIC_DB_ENV=prod  -> uses real production database
 * 2. Or run:
 *      npm run db:dev
 *      npm run db:prod
 *
 * When deploying (NODE_ENV === 'production'), if NEXT_PUBLIC_DB_ENV is omitted,
 * it automatically defaults to 'prod'.
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

  // Automatic fallback: production deployments use prod, local dev defaults to dev
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
    process.env.SUPABASE_SERVICE_ROLE_KEY_DEV ||
    '';

  // PROD credentials (Real Data DB)
  const prodUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL_PROD ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://vdxqfhrsuhmqdbpeqtbt.supabase.co';
  const prodApiKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_PROD ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY_PROD ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    '';

  const supabaseUrl = (isDev ? devUrl : prodUrl) || devUrl;
  const apiKey = isDev
    ? (devApiKey || prodApiKey)
    : (prodApiKey || devApiKey);
  const storageBucket =
    process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'post-media';

  return {
    activeEnv,
    isDev,
    supabaseUrl: supabaseUrl.replace(/\/+$/, ''),
    apiKey,
    storageBucket,
  };
}
