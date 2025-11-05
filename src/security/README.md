# Seguridad y Autenticación - FootStyle

Esta carpeta contiene todos los middlewares y configuraciones de seguridad del proyecto.

## Elementos de Seguridad Implementados

### 1. Helmet.js (`helmet.middleware.ts`)
- **Protección XSS**: Headers de seguridad contra ataques Cross-Site Scripting
- **Prevención de Clickjacking**: Protección contra ataques de clickjacking
- **Content Security Policy**: Política de seguridad de contenido configurada
- **Headers de seguridad HTTP**: Múltiples headers de seguridad configurados

### 2. Rate Limiting (`rateLimiter.middleware.ts`)
- **API Limiter**: 100 peticiones por IP cada 15 minutos para todas las rutas `/api/`
- **Cart Limiter**: 20 peticiones por IP cada 1 minuto para rutas del carrito
- **Protección DDoS**: Previene ataques de denegación de servicio básicos
- **Protección fuerza bruta**: Limita intentos repetidos

### 3. Validación de Entrada (`validation.middleware.ts`)
- **validateProductId**: Valida que productId sea un número entero positivo
- **validateQuantity**: Valida que qty sea un número entero positivo (máx 100)
- **validateIdParam**: Valida IDs en parámetros de URL
- **sanitizeString**: Función para sanitizar strings y prevenir XSS
- **Prevención de inyección**: Validación estricta de tipos y rangos

### 4. Variables de Entorno (`.env.example`)
- **SESSION_SECRET**: Secreto para cookies de sesión (configurable)
- **ALLOWED_ORIGINS**: Orígenes permitidos para CORS
- **PORT**: Puerto del servidor configurable
- **NODE_ENV**: Entorno de ejecución (development/production)

### 5. CORS Mejorado (`cors.middleware.ts`)
- **Orígenes restringidos**: Solo permite orígenes configurados en variables de entorno
- **Métodos permitidos**: Solo GET, POST, PUT, DELETE, OPTIONS
- **Headers permitidos**: Content-Type y Authorization
- **Credentials**: Soporte para cookies de autenticación

## Uso

Los middlewares se importan y configuran en `src/server.ts`:

```typescript
import { setupHelmet, setupCors, apiLimiter, cartLimiter } from "./security/index.js";

// Configurar seguridad
setupHelmet(app);
setupCors(app);
app.use('/api/', apiLimiter);
app.use('/api/cart', cartLimiter);
```

## Configuración

Crea un archivo `.env` basado en `.env.example` para configurar las variables de entorno.

