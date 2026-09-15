/**
 * Centralized Supabase configuration manager.
 * Allows swapping between Testing (dev) and Real Data (prod) databases.
 *
 * How to swap:
 * 1. In website/.env, toggle NEXT_PUBLIC_DB_ENV:
 *      NEXT_PUBLIC_DB_ENV=dev   -> uses testing database
 *      NEXT_PUBLIC_DB_ENV=prod  -> uses real production database
 * 2. Or run:
 *      npm run env:dev
 *      npm run env:prod
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
  const devServiceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY_DEV || '';

  // PROD credentials (Real Data DB)
  const prodUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL_PROD ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://vdxqfhrsuhmqdbpeqtbt.supabase.co';
  const prodServiceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY_PROD ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    '';

  const supabaseUrl = (isDev ? devUrl : prodUrl) || devUrl;
  const serviceRoleKey = isDev
    ? (devServiceKey || prodServiceKey)
    : (prodServiceKey || devServiceKey);
  const storageBucket =
    process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'post-media';

  return {
    activeEnv,
    isDev,
    supabaseUrl: supabaseUrl.replace(/\/+$/, ''),
    serviceRoleKey,
    storageBucket,
  };
}

