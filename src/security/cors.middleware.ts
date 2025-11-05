import cors from 'cors';
import { Express } from 'express';

/**
 * Configuración de CORS más segura
 * Restringe los orígenes permitidos según el entorno
 */
export function setupCors(app: Express): void {
  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:3000', 'http://localhost:3001'];
  
  app.use(cors({
    origin: (origin, callback) => {
      // Permitir requests sin origin (como Postman o aplicaciones móviles)
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('No permitido por CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
}

