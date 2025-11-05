import express from "express";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import productsRouter from "./routes/products.js";
import cartRouter from "./routes/cart.js";
import { setupHelmet, setupCors, apiLimiter, cartLimiter } from "./security/index.js";

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares de seguridad
setupHelmet(app);
setupCors(app);

// Rate limiting
app.use('/api/', apiLimiter);
app.use('/api/cart', cartLimiter);

app.use(express.json({ limit: '10mb' })); // Limitar tamaño del body
app.use(cookieSession({
  name: "session",
  secret: process.env.SESSION_SECRET || "zapateria-secret",
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
  sameSite: 'strict',
  maxAge: 24 * 60 * 60 * 1000
}));

// Static files (frontend)
app.use(express.static("public"));

// API
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
