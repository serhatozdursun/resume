import type { NextApiRequest, NextApiResponse } from 'next';
import handler from '../../pages/api/contact';

// Mock fetch
global.fetch = jest.fn();

// Mock environment variables
const originalEnv = process.env;

describe('/api/contact', () => {
  let mockReq: Partial<NextApiRequest>;
  let mockRes: Partial<NextApiResponse>;
  let jsonResponse: jest.Mock;
  let statusResponse: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = {
      ...originalEnv,
      RECAPTCHA_SECRET_KEY: 'test-secret-key',
      EMAILJS_SERVICE_ID: 'test-service-id',
      EMAILJS_TEMPLATE_ID: 'test-template-id',
      EMAILJS_PUBLIC_KEY: 'test-public-key',
    };

    jsonResponse = jest.fn();
    statusResponse = jest.fn().mockReturnValue({ json: jsonResponse });

    mockReq = {
      method: 'POST',
      body: {
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message',
        token: 'test-token',
      },
    };

    mockRes = {
      status: statusResponse,
      json: jsonResponse,
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('Method validation', () => {
    it('returns 405 for non-POST methods', async () => {
      mockReq.method = 'GET';

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusResponse).toHaveBeenCalledWith(405);
      expect(jsonResponse).toHaveBeenCalledWith({
        error: 'Method not allowed',
      });
    });
  });

  describe('Request validation', () => {
    it('returns 400 when name is missing', async () => {
      mockReq.body = {
        email: 'test@example.com',
        message: 'Test message',
        token: 'test-token',
      };

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusResponse).toHaveBeenCalledWith(400);
      expect(jsonResponse).toHaveBeenCalledWith({
        error: 'Missing required fields',
      });
    });

    it('returns 400 when email is missing', async () => {
      mockReq.body = {
        name: 'Test User',
        message: 'Test message',
        token: 'test-token',
      };

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusResponse).toHaveBeenCalledWith(400);
      expect(jsonResponse).toHaveBeenCalledWith({
        error: 'Missing required fields',
      });
    });

    it('returns 400 when message is missing', async () => {
      mockReq.body = {
        name: 'Test User',
        email: 'test@example.com',
        token: 'test-token',
      };

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusResponse).toHaveBeenCalledWith(400);
      expect(jsonResponse).toHaveBeenCalledWith({
        error: 'Missing required fields',
      });
    });
  });

  describe('reCAPTCHA verification', () => {
    it('returns 500 when RECAPTCHA_SECRET_KEY is missing', async () => {
      delete process.env.RECAPTCHA_SECRET_KEY;

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusResponse).toHaveBeenCalledWith(500);
      expect(jsonResponse).toHaveBeenCalledWith({
        error: 'Captcha secret not configured',
      });
    });

    it('returns 400 when reCAPTCHA verification fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => ({
          success: false,
          'error-codes': ['invalid-input-response'],
        }),
      });

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusResponse).toHaveBeenCalledWith(400);
      expect(jsonResponse).toHaveBeenCalledWith({
        error: 'Captcha verification failed',
      });
    });

    it('returns 400 when reCAPTCHA score is too low', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => ({
          success: true,
          score: 0.2, // Below threshold of 0.3
        }),
      });

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusResponse).toHaveBeenCalledWith(400);
      expect(jsonResponse).toHaveBeenCalledWith({
        error: 'Captcha verification failed',
      });
    });

    it('returns 400 when reCAPTCHA verification throws error', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('Network error')
      );

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusResponse).toHaveBeenCalledWith(400);
      expect(jsonResponse).toHaveBeenCalledWith({
        error: 'Captcha verification error',
      });
    });

    it('handles missing token gracefully', async () => {
      mockReq.body = {
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message',
        // token is missing
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => ({
          success: false,
        }),
      });

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://www.google.com/recaptcha/api/siteverify',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
      );

      // Check that the body contains empty response parameter
      const fetchCall = (global.fetch as jest.Mock).mock.calls[0];
      const body = fetchCall[1].body;
      // body is a URLSearchParams object, convert to string to check
      if (body instanceof URLSearchParams) {
        expect(body.toString()).toContain('response=');
      } else {
        expect(String(body)).toContain('response=');
      }
    });
  });

  describe('EmailJS configuration', () => {
    beforeEach(() => {
      // Mock successful reCAPTCHA verification
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => ({
          success: true,
          score: 0.9,
        }),
      });
    });

    it('returns 500 when EMAILJS_SERVICE_ID is missing', async () => {
      delete process.env.EMAILJS_SERVICE_ID;

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusResponse).toHaveBeenCalledWith(500);
      expect(jsonResponse).toHaveBeenCalledWith({
        error: 'Email service not configured',
      });
    });

    it('returns 500 when EMAILJS_TEMPLATE_ID is missing', async () => {
      delete process.env.EMAILJS_TEMPLATE_ID;

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusResponse).toHaveBeenCalledWith(500);
      expect(jsonResponse).toHaveBeenCalledWith({
        error: 'Email service not configured',
      });
    });

    it('returns 500 when EMAILJS_PUBLIC_KEY is missing', async () => {
      delete process.env.EMAILJS_PUBLIC_KEY;

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusResponse).toHaveBeenCalledWith(500);
      expect(jsonResponse).toHaveBeenCalledWith({
        error: 'Email service not configured',
      });
    });
  });

  describe('Email sending', () => {
    beforeEach(() => {
      // Mock successful reCAPTCHA verification
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        json: async () => ({
          success: true,
          score: 0.9,
        }),
      });
    });

    it('sends email successfully', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
      });

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.emailjs.com/api/v1.0/email/send',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: 'test-service-id',
            template_id: 'test-template-id',
            user_id: 'test-public-key',
            template_params: {
              from_name: 'Test User',
              reply_to: 'test@example.com',
              message: 'Test message',
            },
          }),
        })
      );

      expect(statusResponse).toHaveBeenCalledWith(200);
      expect(jsonResponse).toHaveBeenCalledWith({ message: 'Sent' });
    });

    it('returns 500 when email sending fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        text: async () => 'Internal server error',
      });

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusResponse).toHaveBeenCalledWith(500);
      expect(jsonResponse).toHaveBeenCalledWith({
        error: 'Failed to send email',
        details: 'Internal server error',
      });
    });

    it('returns 500 when email sending throws error', async () => {
      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          json: async () => ({ success: true, score: 0.9 }),
        })
        .mockRejectedValueOnce(new Error('Network error'));

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusResponse).toHaveBeenCalledWith(500);
      expect(jsonResponse).toHaveBeenCalledWith({
        error: 'Unexpected error',
      });
    });
  });

  describe('reCAPTCHA score edge cases', () => {
    beforeEach(() => {
      // Clear any previous mocks
      (global.fetch as jest.Mock).mockClear();
      statusResponse.mockClear();
      jsonResponse.mockClear();
    });

    it('accepts score of exactly 0.3', async () => {
      // The condition is: score < 0.3, so 0.3 should pass (not less than)
      // Reset and set up fresh mocks
      (global.fetch as jest.Mock).mockReset();

      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          json: async () => {
            const result = {
              success: true,
              score: 0.3, // Exactly 0.3, should pass (0.3 is NOT < 0.3)
            };
            return result;
          },
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
        });

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      // Verify reCAPTCHA was called first
      expect(global.fetch).toHaveBeenNthCalledWith(
        1,
        'https://www.google.com/recaptcha/api/siteverify',
        expect.any(Object)
      );

      // Should succeed with score 0.3 (0.3 is not < 0.3, so condition is false)
      expect(statusResponse).toHaveBeenCalledWith(200);
      expect(jsonResponse).toHaveBeenCalledWith({ message: 'Sent' });
    });

    it('accepts score above 0.3', async () => {
      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          json: async () => ({
            success: true,
            score: 0.8,
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
        });

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusResponse).toHaveBeenCalledWith(200);
      expect(jsonResponse).toHaveBeenCalledWith({ message: 'Sent' });
    });

    it('handles missing score field', async () => {
      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          json: async () => ({
            success: true,
            // No score field
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
        });

      await handler(mockReq as NextApiRequest, mockRes as NextApiResponse);

      expect(statusResponse).toHaveBeenCalledWith(200);
      expect(jsonResponse).toHaveBeenCalledWith({ message: 'Sent' });
    });
  });
});
