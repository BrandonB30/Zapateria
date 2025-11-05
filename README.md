Proyecto de zapateria App

# 🧩 Instrucciones de instalación, configuración y ejecución del proyecto

Este documento describe paso a paso el proceso de instalación, configuración y ejecución del proyecto **Zapatería App**, con capturas de pantalla del procedimiento completo.


## 🧱 1️⃣ Inicialización del repositorio local

1. Abre una terminal en la carpeta del proyecto.
2. Ejecuta el comando para inicializar un nuevo repositorio Git:

git init

<img width="988" height="540" alt="Image" src="https://github.com/user-attachments/assets/0c100fd4-8427-4c5a-b13c-45a4911635aa" />

☁️ 2️⃣ Creación del repositorio remoto en GitHub
Ingresa a GitHub y crea un nuevo repositorio con el nombre zapateria-app.

Copia la URL del repositorio remoto.

<img width="1656" height="633" alt="Image" src="https://github.com/user-attachments/assets/b119e258-3c04-44b1-a75d-3c61e485b37c" />

##🔗 3️⃣ Vinculación del repositorio local con el remoto
Conecta el repositorio local al remoto usando:

Usando 
git add .
git commit -m "Iniciando"
git remote add origin 
git push origin main

([https://github.com/BrandonB30/MacaBlue/blob/main/assets/images/Panel%20Admin.jpg](https://github.com/BrandonB30/Zapateria/blob/main/public/img/Git_Push.png))

⚙️ 5️⃣ Instalación de dependencias del proyecto
Una vez clonado o descargado el proyecto, abre una terminal en la raíz del proyecto.

Ejecuta:

bash
Copy code
npm install
Esto instalará todas las dependencias necesarias definidas en el archivo package.json.

<img width="1183" height="312" alt="Image" src="https://github.com/user-attachments/assets/f5649387-5a03-4d20-9a25-8e6528f40cd7" />

🚀 6️⃣ Ejecución del servidor
Para correr el servidor en modo desarrollo:

bash
Copy code
npm run dev
El servidor se ejecutará en el puerto 3000.
Abre tu navegador y entra en:

arduino
Copy code
http://localhost:3000

<img width="1919" height="954" alt="Image" src="https://github.com/user-attachments/assets/95bbef02-ac06-40d2-9525-22a93c03dca6" />

Y con esto finalizamos y comprobamos el funcionamiento de la pagina.
# 🛍️ Proyecto Zapatería – Validación y Ventanas Flotantes

Este proyecto implementa un sistema de carrito de compras con validación de datos en el servidor y notificaciones visuales en el cliente.

---

## 🧩 1. Validación de Datos en el Servidor

Se agregaron validaciones en las rutas `/api/cart/add` y `/api/cart/remove` para garantizar que:

- La cantidad (`qty`) no sea negativa ni cero.  
- El `productId` exista en el catálogo de productos.  
- Si los datos son incorrectos, el servidor responde con **código 400 (Bad Request)** y un mensaje claro en formato JSON.

### 🔧 Ejemplo de validación (`src/routes/cart.ts`)
```ts
if (!productId || qty == null) {
  return res.status(400).json({ error: "Faltan datos: productId y qty son requeridos" });
}

if (qty <= 0) {
  return res.status(400).json({ error: "La cantidad debe ser mayor que 0" });
}

const product = products.find(p => p.id === productId);
if (!product) {
  return res.status(400).json({ error: "El producto no existe" });
}
🚀 2. Cómo probar las validaciones con Postman o Thunder Client
🧠 Requisitos previos
Tener el servidor corriendo:

npm run build
npm start

Servidor corriendo en http://localhost:3000
🧪 Pruebas en /api/cart/add
Ruta:

POST http://localhost:3000/api/cart/add
✅ Caso correcto

{
  "productId": 1,
  "qty": 2
}
Respuesta:
{
  "ok": true,
  "cart": [{ "productId": 1, "qty": 2 }]
}
❌ Caso error 1 — Cantidad negativa
{
  "productId": 1,
  "qty": -3
}
Respuesta esperada:

json
Copiar código
{ "error": "La cantidad debe ser mayor que 0" }
Código HTTP: 400 Bad Request

❌ Caso error 2 — Producto inexistente

{
  "productId": 99,
  "qty": 1
}
Respuesta esperada:

{ "error": "El producto no existe" }
Código HTTP: 400 Bad Request

❌ Caso error 3 — Falta información
{
  "qty": 2
}
Respuesta esperada:
{ "error": "Faltan datos: productId y qty son requeridos" }
Código HTTP: 400 Bad Request

🧪 Pruebas en /api/cart/remove
Ruta:

POST http://localhost:3000/api/cart/remove
✅ Producto existente

{ "productId": 1 }
Respuesta:

json
{ "ok": true, "cart": [] }
❌ Producto inexistente

{ "productId": 99 }
Respuesta esperada:

{ "error": "El producto no existe" }
Código HTTP: 400 Bad Request

<img [WhatsApp Image 2025-11-05 at 3 34 24 PM](https://github.com/user-attachments/assets/a556a30f-039a-4bf0-84d8-cbafd44e9f78)<img <img [WhatsApp Image 2025-11-05 at 3 34 25 PM](https://github.com/user-attachments/assets/6067f756-d867-4bfc-9b0f-0479d6f42a87)


💬 3. Ventanas Flotantes (Alertas en el Frontend)
Para mejorar la experiencia del usuario, se implementan alertas flotantes (ventanas emergentes) que notifican eventos como:

✅ Producto añadido correctamente.

❌ Error al agregar producto (respuesta 400 desde el servidor).

📁 Ubicación del código
Archivo: public/cart.html
Función: showAlert(message, type)

html

<script>
  function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} position-fixed top-0 end-0 m-3`;
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 2000);
  }

  // Exponer globalmente para usar en cart.js
  window.showAlert = showAlert;
</script>

