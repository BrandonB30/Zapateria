import request from 'supertest';
import express from 'express';
import cookieSession from 'cookie-session';
import cartRouter from '../routes/cart.js';
import { promises as fs } from 'fs';
import { join } from 'path';

const DATA_FILE = join(process.cwd(), 'src/data/data.json');

const app = express();
app.use(express.json());
app.use(cookieSession({
  name: 'session',
  secret: 'test-secret',
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000
}));
app.use('/api/cart', cartRouter);

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

describe('Pruebas de Carrito', () => {
  test('Prueba 5: GET /api/cart debe devolver el carrito vacío inicialmente', async () => {
    const response = await request(app).get('/api/cart');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('Prueba 6: POST /api/cart/add debe agregar productos al carrito correctamente', async () => {
    const response = await request(app)
      .post('/api/cart/add')
      .send({ productId: 1, qty: 2 });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('ok', true);
    expect(response.body).toHaveProperty('cart');
    expect(Array.isArray(response.body.cart)).toBe(true);
    expect(response.body.cart.length).toBeGreaterThan(0);
    expect(response.body.cart[0]).toHaveProperty('productId', 1);
    expect(response.body.cart[0]).toHaveProperty('qty', 2);
  });

  test('Prueba 7: POST /api/cart/add debe validar datos inválidos (productId faltante)', async () => {
    const response = await request(app)
      .post('/api/cart/add')
      .send({ qty: 2 });
    
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'productId es requerido');
  });

  test('Prueba 8: POST /api/cart/add debe validar datos inválidos (qty <= 0)', async () => {
    const response = await request(app)
      .post('/api/cart/add')
      .send({ productId: 1, qty: 0 });
    
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'qty debe ser un número entero positivo');
  });

  test('Prueba 9: POST /api/cart/remove debe eliminar productos del carrito', async () => {
    // Primero agregamos un producto
    await request(app)
      .post('/api/cart/add')
      .send({ productId: 2, qty: 1 });
    
    // Luego lo removemos
    const response = await request(app)
      .post('/api/cart/remove')
      .send({ productId: 2 });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('ok', true);
    expect(response.body.cart.find((item: any) => item.productId === 2)).toBeUndefined();
  });

  test('Prueba 10: GET /api/cart/total debe calcular correctamente el total del carrito', async () => {
    // Limpiar carrito primero
    await request(app).post('/api/cart/clear');
    
    // Agregar productos
    await request(app).post('/api/cart/add').send({ productId: 1, qty: 2 });
    await request(app).post('/api/cart/add').send({ productId: 2, qty: 1 });
    
    const response = await request(app).get('/api/cart/total');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('total');
    expect(response.body).toHaveProperty('items');
    expect(Array.isArray(response.body.items)).toBe(true);
    expect(response.body.total).toBeGreaterThan(0);
    expect(response.body.items.length).toBeGreaterThan(0);
  });

  test('Prueba 11: POST /api/cart/clear debe vaciar el carrito correctamente', async () => {
    // Agregar productos primero
    await request(app).post('/api/cart/add').send({ productId: 1, qty: 1 });
    
    // Limpiar carrito
    const response = await request(app).post('/api/cart/clear');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('ok', true);
    expect(response.body.cart).toHaveLength(0);
  });
});

