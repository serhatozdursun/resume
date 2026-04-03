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
    it('should return GA_TRACKING_ID when set', () => {
      process.env.NEXT_PUBLIC_GA_TRACKING_ID = 'test-ga-id';
      const { env } = getEnvModule();
      expect(env.GA_TRACKING_ID).toBe('test-ga-id');
    });

    it('should return undefined for GA_TRACKING_ID when not set', () => {
      delete process.env.NEXT_PUBLIC_GA_TRACKING_ID;
      const { env } = getEnvModule();
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

    it('should not expose EMAILJS keys on the client', () => {
      const { env } = getEnvModule();
      expect(env).not.toHaveProperty('EMAILJS_SERVICE_ID');
      expect(env).not.toHaveProperty('EMAILJS_TEMPLATE_ID');
      expect(env).not.toHaveProperty('EMAILJS_PUBLIC_KEY');
    });
  });

  describe('validateEnv', () => {
    it('should not throw when GA_TRACKING_ID is set', () => {
      process.env.NEXT_PUBLIC_GA_TRACKING_ID = 'test-ga-id';
      const { validateEnv } = getEnvModule();
      expect(() => validateEnv()).not.toThrow();
    });

    it('should throw when GA_TRACKING_ID is missing', () => {
      delete process.env.NEXT_PUBLIC_GA_TRACKING_ID;
      const { validateEnv } = getEnvModule();
      expect(() => validateEnv()).toThrow(
        'Missing required environment variable: GA_TRACKING_ID'
      );
    });
  });
});
