# Pruebas de Software - FootStyle

Esta carpeta contiene todas las pruebas unitarias e integración del proyecto.

## Estructura

- `products.test.ts` - Pruebas de las rutas de productos
- `cart.test.ts` - Pruebas de las rutas del carrito
- `data.test.ts` - Pruebas de persistencia de datos

## Ejecutar Pruebas

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas en modo watch
npm run test:watch

# Ejecutar pruebas con cobertura
npm run test:coverage
```

## Pruebas Implementadas

### Productos (4 pruebas)
1. ✅ GET /api/products devuelve todos los productos
2. ✅ GET /api/products/:id devuelve un producto específico
3. ✅ GET /api/products/:id retorna 404 cuando no existe
4. ✅ GET /api/products/:id valida ID inválido

### Carrito (7 pruebas)
5. ✅ GET /api/cart devuelve carrito vacío inicialmente
6. ✅ POST /api/cart/add agrega productos correctamente
7. ✅ POST /api/cart/add valida datos inválidos (productId faltante)
8. ✅ POST /api/cart/add valida datos inválidos (qty <= 0)
9. ✅ POST /api/cart/remove elimina productos
10. ✅ GET /api/cart/total calcula correctamente el total
11. ✅ POST /api/cart/clear vacía el carrito

### Persistencia (2 pruebas)
12. ✅ readData() lee correctamente desde JSON
13. ✅ writeData() escribe correctamente en JSON

**Total: 13 pruebas**

