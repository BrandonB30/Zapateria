import { Router } from "express";
import type { CartItem } from "../types/index.d.js";

const router = Router();

// Cart is stored per-session in cookie-session
router.get("/", (req, res) => {
  const cart: CartItem[] = (req.session as any).cart || [];
  res.json(cart);
});

router.post("/add", (req, res) => {
  const { productId, qty } = req.body as CartItem;
  if (!productId || qty == null || qty <= 0) {
    return res.status(400).json({ error: "Datos inválidos" });
  }
  const sess: any = req.session;
  sess.cart = sess.cart || [];
  const idx = sess.cart.findIndex((i: CartItem) => i.productId === productId);
  if (idx >= 0) sess.cart[idx].qty += qty;
  else sess.cart.push({ productId, qty });
  res.json({ ok: true, cart: sess.cart });
});

router.post("/remove", (req, res) => {
  const { productId } = req.body as { productId: number };
  if (!productId) return res.status(400).json({ error: "productId requerido" });
  const sess: any = req.session;
  sess.cart = (sess.cart || []).filter((i: CartItem) => i.productId !== productId);
  res.json({ ok: true, cart: sess.cart });
});

router.post("/clear", (req, res) => {
  (req.session as any).cart = [];
  res.json({ ok: true, cart: [] });
});

// Nueva ruta: calcular el total del carrito
router.get("/total", async (req, res) => {
  const sess: any = req.session;
  const cart: CartItem[] = sess.cart || [];

  if (cart.length === 0) {
    return res.json({ total: 0, items: [] });
  }

  try {
    // Cargar los productos
    const response = await fetch("http://localhost:3000/api/products");
    const products = await response.json();

    // Construir el detalle de cada producto del carrito
    const detailedItems = cart
      .map((item) => {
        const product = products.find((p: any) => p.id === item.productId);
        if (!product) return null;

        return {
          id: product.id,
          nombre: product.name,
          precioUnitario: product.price,
          cantidad: item.qty,
          subtotal: product.price * item.qty,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);

    // Calcular el total
    const total = detailedItems.reduce((acc, item) => acc + item.subtotal, 0);

    // Imprimir total y detalles
    res.json({
      total,
      items: detailedItems,
    });

  } catch (err) {
    console.error("Error calculando el total:", err);
    res.status(500).json({ error: "Error al calcular el total" });
  }
});

export default router;
