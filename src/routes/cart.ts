import { Router } from "express";
import type { CartItem } from "../types/index.d.js";
import { products } from "./products.js";

const router = Router();

// Cart is stored per-session in cookie-session
router.get("/", (req, res) => {
  const cart: CartItem[] = (req.session as any).cart || [];
  res.json(cart);
});

router.post("/add", (req, res) => {
  const { productId, qty } = req.body as CartItem;

  // Validar que productId esté presente
  if (productId === undefined || productId === null) {
    return res.status(400).json({ 
      error: "El ID del producto es requerido",
      message: "Debe proporcionar un productId válido"
    });
  }

  // Validar que productId sea un número
  const productIdNum = Number(productId);
  if (isNaN(productIdNum) || !Number.isInteger(productIdNum) || productIdNum <= 0) {
    return res.status(400).json({ 
      error: "ID de producto inválido",
      message: "El productId debe ser un número entero positivo"
    });
  }

  // Validar que el producto exista
  const product = products.find(p => p.id === productIdNum);
  if (!product) {
    return res.status(400).json({ 
      error: "Producto no encontrado",
      message: `El producto con ID ${productIdNum} no existe en el catálogo`
    });
  }

  // Validar que qty esté presente
  if (qty === undefined || qty === null) {
    return res.status(400).json({ 
      error: "La cantidad es requerida",
      message: "Debe proporcionar una cantidad válida"
    });
  }

  // Validar que qty sea un número
  const qtyNum = Number(qty);
  if (isNaN(qtyNum) || !Number.isInteger(qtyNum)) {
    return res.status(400).json({ 
      error: "Cantidad inválida",
      message: "La cantidad debe ser un número entero"
    });
  }

  // Validar que la cantidad no sea negativa
  if (qtyNum < 0) {
    return res.status(400).json({ 
      error: "Cantidad inválida",
      message: "La cantidad no puede ser negativa"
    });
  }

  // Validar que la cantidad sea mayor a 0
  if (qtyNum === 0) {
    return res.status(400).json({ 
      error: "Cantidad inválida",
      message: "La cantidad debe ser mayor a cero"
    });
  }

  const sess: any = req.session;
  sess.cart = sess.cart || [];
  const idx = sess.cart.findIndex((i: CartItem) => i.productId === productIdNum);
  if (idx >= 0) sess.cart[idx].qty += qtyNum;
  else sess.cart.push({ productId: productIdNum, qty: qtyNum });
  res.json({ ok: true, cart: sess.cart });
});

router.post("/remove", (req, res) => {
  const { productId } = req.body as { productId: number };

  // Validar que productId esté presente
  if (productId === undefined || productId === null) {
    return res.status(400).json({ 
      error: "El ID del producto es requerido",
      message: "Debe proporcionar un productId válido"
    });
  }

  // Validar que productId sea un número
  const productIdNum = Number(productId);
  if (isNaN(productIdNum) || !Number.isInteger(productIdNum) || productIdNum <= 0) {
    return res.status(400).json({ 
      error: "ID de producto inválido",
      message: "El productId debe ser un número entero positivo"
    });
  }

  // Validar que el producto exista
  const product = products.find(p => p.id === productIdNum);
  if (!product) {
    return res.status(400).json({ 
      error: "Producto no encontrado",
      message: `El producto con ID ${productIdNum} no existe en el catálogo`
    });
  }

  const sess: any = req.session;
  sess.cart = (sess.cart || []).filter((i: CartItem) => i.productId !== productIdNum);
  res.json({ ok: true, cart: sess.cart });
});

router.post("/clear", (req, res) => {
  (req.session as any).cart = [];
  res.json({ ok: true, cart: [] });
});

export default router;
