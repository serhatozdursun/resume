export const env = {
  GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://serhatozdursun.com',
} as const;

// Validate required client-side environment variables
export const validateEnv = () => {
  const required = ['GA_TRACKING_ID'] as const;

  for (const key of required) {
    if (!env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }
};
