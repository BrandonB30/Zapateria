import helmet from 'helmet';
import { Express } from 'express';

/**
 * Configuración de Helmet para headers de seguridad HTTP
 * Protege contra ataques comunes como XSS, clickjacking, etc.
 */
export function setupHelmet(app: Express): void {
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
        scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }));
}

