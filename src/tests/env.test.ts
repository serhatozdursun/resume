// Helper to set env and re-import
function getEnvModule() {
  jest.resetModules();
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { env, validateEnv } = require('../utils/env');
  return { env, validateEnv };
}

describe('env', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('env object', () => {
    it('should return environment variables when they are set', () => {
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = 'test-service-id';
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = 'test-template-id';
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = 'test-public-key';
      process.env.NEXT_PUBLIC_GA_TRACKING_ID = 'test-ga-id';
      process.env.NEXT_PUBLIC_SITE_URL = 'https://test.com';
      const { env } = getEnvModule();
      expect(env.EMAILJS_SERVICE_ID).toBe('test-service-id');
      expect(env.EMAILJS_TEMPLATE_ID).toBe('test-template-id');
      expect(env.EMAILJS_PUBLIC_KEY).toBe('test-public-key');
      expect(env.GA_TRACKING_ID).toBe('test-ga-id');
      expect(env.SITE_URL).toBe('https://test.com');
    });

    it('should return undefined for missing environment variables', () => {
      delete process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      delete process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      delete process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      delete process.env.NEXT_PUBLIC_GA_TRACKING_ID;
      delete process.env.NEXT_PUBLIC_SITE_URL;
      const { env } = getEnvModule();
      expect(env.EMAILJS_SERVICE_ID).toBeUndefined();
      expect(env.EMAILJS_TEMPLATE_ID).toBeUndefined();
      expect(env.EMAILJS_PUBLIC_KEY).toBeUndefined();
      expect(env.GA_TRACKING_ID).toBeUndefined();
    });

    it('should return default SITE_URL when NEXT_PUBLIC_SITE_URL is not set', () => {
      delete process.env.NEXT_PUBLIC_SITE_URL;
      const { env } = getEnvModule();
      expect(env.SITE_URL).toBe('https://serhatozdursun.com');
    });

    it('should return custom SITE_URL when NEXT_PUBLIC_SITE_URL is set', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'https://custom-site.com';
      const { env } = getEnvModule();
      expect(env.SITE_URL).toBe('https://custom-site.com');
    });
  });

  describe('validateEnv', () => {
    it('should not throw when all required environment variables are set', () => {
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = 'test-service-id';
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = 'test-template-id';
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = 'test-public-key';
      process.env.NEXT_PUBLIC_GA_TRACKING_ID = 'test-ga-id';
      const { validateEnv } = getEnvModule();
      expect(() => validateEnv()).not.toThrow();
    });

    it('should throw error when EMAILJS_SERVICE_ID is missing', () => {
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = 'test-template-id';
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = 'test-public-key';
      process.env.NEXT_PUBLIC_GA_TRACKING_ID = 'test-ga-id';
      const { validateEnv } = getEnvModule();
      expect(() => validateEnv()).toThrow(
        'Missing required environment variable: EMAILJS_SERVICE_ID'
      );
    });

    it('should throw error when EMAILJS_TEMPLATE_ID is missing', () => {
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = 'test-service-id';
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = 'test-public-key';
      process.env.NEXT_PUBLIC_GA_TRACKING_ID = 'test-ga-id';
      const { validateEnv } = getEnvModule();
      expect(() => validateEnv()).toThrow(
        'Missing required environment variable: EMAILJS_TEMPLATE_ID'
      );
    });

    it('should throw error when EMAILJS_PUBLIC_KEY is missing', () => {
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = 'test-service-id';
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = 'test-template-id';
      process.env.NEXT_PUBLIC_GA_TRACKING_ID = 'test-ga-id';
      const { validateEnv } = getEnvModule();
      expect(() => validateEnv()).toThrow(
        'Missing required environment variable: EMAILJS_PUBLIC_KEY'
      );
    });

    it('should throw error when GA_TRACKING_ID is missing', () => {
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = 'test-service-id';
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = 'test-template-id';
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = 'test-public-key';
      const { validateEnv } = getEnvModule();
      expect(() => validateEnv()).toThrow(
        'Missing required environment variable: GA_TRACKING_ID'
      );
    });

    it('should throw error when multiple environment variables are missing', () => {
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID = 'test-service-id';
      const { validateEnv } = getEnvModule();
      expect(() => validateEnv()).toThrow(
        'Missing required environment variable: EMAILJS_TEMPLATE_ID'
      );
    });

    it('should throw error when all required environment variables are missing', () => {
      delete process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      delete process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      delete process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      delete process.env.NEXT_PUBLIC_GA_TRACKING_ID;
      const { validateEnv } = getEnvModule();
      expect(() => validateEnv()).toThrow(
        'Missing required environment variable: EMAILJS_SERVICE_ID'
      );
    });
  });
});
