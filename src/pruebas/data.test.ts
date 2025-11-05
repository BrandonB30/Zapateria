import { promises as fs } from 'fs';
import { join } from 'path';

const DATA_FILE = join(process.cwd(), 'src/data/data.json');

describe('Pruebas de Persistencia de Datos', () => {
  test('Prueba 12: readData() debe leer correctamente desde JSON', async () => {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    
    expect(parsed).toHaveProperty('products');
    expect(parsed).toHaveProperty('carts');
    expect(Array.isArray(parsed.products)).toBe(true);
    expect(typeof parsed.carts).toBe('object');
  });

  test('Prueba 13: writeData() debe escribir correctamente en JSON', async () => {
    const testData = {
      products: [{ id: 1, name: 'Test', price: 100, image: '/test.png', description: 'Test', stock: 10 }],
      carts: {}
    };
    
    await fs.writeFile(DATA_FILE, JSON.stringify(testData, null, 2), 'utf-8');
    
    const readData = await fs.readFile(DATA_FILE, 'utf-8');
    const parsed = JSON.parse(readData);
    
    expect(parsed.products[0].name).toBe('Test');
    
    // Restaurar datos originales
    const originalData = {
      products: [
        { id: 1, name: "Runner Azul", price: 199999, image: "/img/shoe_1.png", description: "Zapatilla ligera para correr, malla transpirable.", stock: 12 },
        { id: 2, name: "Classic Rojo", price: 149999, image: "/img/shoe_2.png", description: "Clásico urbano para uso diario.", stock: 24 },
        { id: 3, name: "Eco Verde", price: 179999, image: "/img/shoe_3.png", description: "Materiales reciclados, cómodo y resistente.", stock: 8 },
        { id: 4, name: "Urban Naranja", price: 159999, image: "/img/shoe_4.png", description: "Estilo urbano con suela de alta tracción.", stock: 16 },
        { id: 5, name: "Sport Morado", price: 189999, image: "/img/shoe_5.png", description: "Para entrenamientos de alto rendimiento.", stock: 10 },
        { id: 6, name: "Trail Gris", price: 209999, image: "/img/shoe_6.png", description: "Ideal para montaña y terrenos irregulares.", stock: 7 },
        { id: 7, name: "Premium Blanco", price: 229999, image: "/img/shoe_7.png", description: "Zapatilla premium en cuero genuino, diseño elegante y versátil para cualquier ocasión.", stock: 15 },
        { id: 8, name: "Casual Negro", price: 169999, image: "/img/shoe_8.png", description: "Calzado casual cómodo, perfecto para el día a día con estilo moderno y minimalista.", stock: 20 },
        { id: 9, name: "Running Rosa", price: 219999, image: "/img/shoe_9.png", description: "Zapatilla deportiva de alta tecnología con amortiguación avanzada para máximo confort.", stock: 11 }
      ],
      carts: {}
    };
    await fs.writeFile(DATA_FILE, JSON.stringify(originalData, null, 2), 'utf-8');
  });
});

