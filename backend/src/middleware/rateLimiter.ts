import { Request, Response, NextFunction } from 'express';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

let ratelimit: Ratelimit | null = null;

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
    analytics: true,
  });
}

export const couponRateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  if (!ratelimit) {
    // If upstash is not configured, bypass
    return next();
  }

  try {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const identifier = `coupon_validate_${ip}`;
    const { success } = await ratelimit.limit(identifier);

    if (!success) {
      return res.status(429).json({ success: false, message: 'Too many requests, please try again later.' });
    }

    next();
  } catch (error) {
    console.error('Rate Limiter Error:', error);
    next();
  }
};

// In-memory store for OTP rate-limiting (60-second window per phone/IP)
const otpCooldownStore = new Map<string, number>();

export const otpRateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  const phone = req.body?.phone;
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  
  const now = Date.now();
  const COOLDOWN_MS = 60 * 1000; // 60 seconds

  const keys = [
    `otp_phone_${phone || 'none'}`,
  ];
  if (process.env.NODE_ENV === 'production') {
    keys.push(`otp_ip_${ip}`);
  }

  for (const key of keys) {
    const lastSent = otpCooldownStore.get(key);
    if (lastSent && now - lastSent < COOLDOWN_MS) {
      const secondsLeft = Math.ceil((COOLDOWN_MS - (now - lastSent)) / 1000);
      return res.status(429).json({
        success: false,
        message: `Please wait ${secondsLeft} seconds before requesting another OTP.`,
        retryAfterSeconds: secondsLeft
      });
    }
  }

  // Update timestamps
  if (phone) otpCooldownStore.set(`otp_phone_${phone}`, now);
  if (process.env.NODE_ENV === 'production') {
    otpCooldownStore.set(`otp_ip_${ip}`, now);
  }

  // Clean old keys periodically
  if (otpCooldownStore.size > 5000) {
    for (const [k, ts] of otpCooldownStore.entries()) {
      if (now - ts > COOLDOWN_MS) otpCooldownStore.delete(k);
    }
  }

  next();
};

