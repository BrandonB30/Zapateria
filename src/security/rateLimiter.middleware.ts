import rateLimit from 'express-rate-limit';
import { Express } from 'express';

/**
 * Rate Limiter para prevenir ataques de fuerza bruta y DDoS básico
 * Limita el número de peticiones por IP en un período de tiempo
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 peticiones por IP en 15 minutos
  message: 'Demasiadas peticiones desde esta IP, intenta de nuevo más tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate Limiter más estricto para rutas de carrito
 */
export const cartLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 20, // máximo 20 peticiones por IP en 1 minuto
  message: 'Demasiadas peticiones al carrito, intenta de nuevo en un minuto.',
  standardHeaders: true,
  legacyHeaders: false,
});

