import { Router } from "express";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import type { Product, CartItem } from "../types/index.d.js";
import { validateIdParam } from "../security/validation.middleware.js";

const router = Router();

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_FILE = join(__dirname, "../data/data.json");

// Función para leer datos del archivo JSON
async function readData(): Promise<{ products: Product[]; carts: Record<string, CartItem[]> }> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    // Si el archivo no existe, retornar estructura por defecto
    return { products: [], carts: {} };
  }
}

// Función para escribir datos al archivo JSON
async function writeData(data: { products: Product[]; carts: Record<string, CartItem[]> }): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

router.get("/", async (_req, res) => {
  try {
    const data = await readData();
    res.json(data.products);
  } catch (error) {
    console.error("Error leyendo productos:", error);
    res.status(500).json({ error: "Error al cargar productos" });
  }
});

router.get("/:id", validateIdParam, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = await readData();
    const product = data.products.find(p => p.id === id);
    if (!product) return res.status(404).json({ error: "Producto no encontrado" });
    res.json(product);
  } catch (error) {
    console.error("Error leyendo producto:", error);
    res.status(500).json({ error: "Error al cargar producto" });
  }
});

export default router;
