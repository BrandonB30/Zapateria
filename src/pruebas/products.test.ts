import request from 'supertest';
import express from 'express';
import productsRouter from '../routes/products.js';
import { promises as fs } from 'fs';
import { join } from 'path';

const DATA_FILE = join(process.cwd(), 'src/data/data.json');

const app = express();
app.use(express.json());
app.use('/api/products', productsRouter);

// Guardar datos originales antes de las pruebas
let originalData: any;

beforeAll(async () => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    originalData = JSON.parse(data);
  } catch (error) {
    originalData = { products: [], carts: {} };
  }
});

afterAll(async () => {
  // Restaurar datos originales después de las pruebas
  if (originalData) {
    await fs.writeFile(DATA_FILE, JSON.stringify(originalData, null, 2), 'utf-8');
  }
});

describe('Pruebas de Productos - GET /api/products', () => {
  test('Prueba 1: Debe devolver todos los productos', async () => {
    const response = await request(app).get('/api/products');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('price');
  });

  test('Prueba 2: Debe devolver un producto específico por ID', async () => {
    const response = await request(app).get('/api/products/1');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('price');
    expect(response.body).toHaveProperty('image');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('stock');
  });

  test('Prueba 3: Debe retornar 404 cuando el producto no existe', async () => {
    const response = await request(app).get('/api/products/9999');
    
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Producto no encontrado');
  });

  test('Prueba 4: Debe retornar 400 cuando el ID es inválido', async () => {
    const response = await request(app).get('/api/products/abc');
    
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'ID inválido');
  });
});

