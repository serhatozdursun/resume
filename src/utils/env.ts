export const env = {
  EMAILJS_SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
  SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://serhatozdursun.com',
} as const;

// Validate required environment variables
export const validateEnv = () => {
  const required = [
    'EMAILJS_SERVICE_ID',
    'EMAILJS_TEMPLATE_ID',
    'EMAILJS_PUBLIC_KEY',
    'GA_TRACKING_ID',
  ] as const;

  for (const key of required) {
    if (!env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  }
};
