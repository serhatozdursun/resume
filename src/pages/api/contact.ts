import type { NextApiRequest, NextApiResponse } from 'next';

type ContactRequestBody = {
  name: string;
  email: string;
  message: string;
  token?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message, token } = req.body as ContactRequestBody;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Verify reCAPTCHA token (Standard v3)
  try {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) {
      return res.status(500).json({ error: 'Captcha secret not configured' });
    }

    const verifyResp = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret,
          response: token || '',
        }),
      }
    );

    const verifyJson = (await verifyResp.json()) as {
      success: boolean;
      score?: number;
      'error-codes'?: string[];
      action?: string;
    };

    if (
      !verifyJson.success ||
      (typeof verifyJson.score === 'number' && verifyJson.score < 0.3)
    ) {
      return res.status(400).json({ error: 'Captcha verification failed' });
    }
  } catch {
    return res.status(400).json({ error: 'Captcha verification error' });
  }

  // Forward email via EmailJS REST API
  try {
    const service_id = process.env.EMAILJS_SERVICE_ID;
    const template_id = process.env.EMAILJS_TEMPLATE_ID;
    const user_id = process.env.EMAILJS_PUBLIC_KEY;

    if (!service_id || !template_id || !user_id) {
      return res.status(500).json({ error: 'Email service not configured' });
    }

    const emailResp = await fetch(
      'https://api.emailjs.com/api/v1.0/email/send',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id,
          template_id,
          user_id,
          template_params: {
            from_name: name,
            reply_to: email,
            message,
          },
        }),
      }
    );

    if (!emailResp.ok) {
      const text = await emailResp.text();
      return res
        .status(500)
        .json({ error: 'Failed to send email', details: text });
    }

    return res.status(200).json({ message: 'Sent' });
  } catch {
    return res.status(500).json({ error: 'Unexpected error' });
  }
}
