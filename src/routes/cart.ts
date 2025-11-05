import { Router } from "express";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import type { CartItem } from "../types/index.d.js";
import { validateProductId, validateQuantity } from "../security/validation.middleware.js";

const router = Router();

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_FILE = join(__dirname, "../data/data.json");

// Función para obtener el ID de sesión
function getSessionId(req: any): string {
  return req.sessionID || "default";
}

// Función para leer datos del archivo JSON
async function readData(): Promise<{ products: any[]; carts: Record<string, CartItem[]> }> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return { products: [], carts: {} };
  }
}

// Función para escribir datos al archivo JSON
async function writeData(data: { products: any[]; carts: Record<string, CartItem[]> }): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// Función para obtener el carrito de una sesión
async function getCart(sessionId: string): Promise<CartItem[]> {
  const data = await readData();
  return data.carts[sessionId] || [];
}

// Función para guardar el carrito de una sesión
async function saveCart(sessionId: string, cart: CartItem[]): Promise<void> {
  const data = await readData();
  data.carts[sessionId] = cart;
  await writeData(data);
}

router.get("/", async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    const cart = await getCart(sessionId);
    res.json(cart);
  } catch (error) {
    console.error("Error leyendo carrito:", error);
    res.status(500).json({ error: "Error al cargar carrito" });
  }
});

router.post("/add", validateProductId, validateQuantity, async (req, res) => {
  try {
    const { productId, qty } = req.body as CartItem;
    
    const sessionId = getSessionId(req);
    const cart = await getCart(sessionId);
    
    const idx = cart.findIndex((i: CartItem) => i.productId === productId);
    if (idx >= 0) {
      cart[idx].qty += qty;
    } else {
      cart.push({ productId, qty });
    }
    
    await saveCart(sessionId, cart);
    res.json({ ok: true, cart });
  } catch (error) {
    console.error("Error agregando al carrito:", error);
    res.status(500).json({ error: "Error al agregar producto al carrito" });
  }
});

router.post("/remove", validateProductId, async (req, res) => {
  try {
    const { productId } = req.body as { productId: number };
    
    const sessionId = getSessionId(req);
    const cart = await getCart(sessionId);
    const updatedCart = cart.filter((i: CartItem) => i.productId !== productId);
    
    await saveCart(sessionId, updatedCart);
    res.json({ ok: true, cart: updatedCart });
  } catch (error) {
    console.error("Error removiendo del carrito:", error);
    res.status(500).json({ error: "Error al remover producto del carrito" });
  }
});

router.post("/clear", async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    await saveCart(sessionId, []);
    res.json({ ok: true, cart: [] });
  } catch (error) {
    console.error("Error limpiando carrito:", error);
    res.status(500).json({ error: "Error al limpiar carrito" });
  }
});

// Nueva ruta: calcular el total del carrito
router.get("/total", async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    const cart = await getCart(sessionId);

    if (cart.length === 0) {
      return res.json({ total: 0, items: [] });
    }

    // Cargar los productos desde el archivo JSON
    const data = await readData();
    const products = data.products;

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
