# Proyecto de zapateria App

Integrantes Brandon Bernal, Andres Barrera, Tatiana Montenegro, Yuliana Paez
--
# 🧩 Instrucciones de instalación, configuración y ejecución del proyecto

Este documento describe paso a paso el proceso de instalación, configuración y ejecución del proyecto **Zapatería App**, con capturas de pantalla del procedimiento completo.


## 🧱 1️⃣ Inicialización del repositorio local

1. Abre una terminal en la carpeta del proyecto.
2. Ejecuta el comando para inicializar un nuevo repositorio Git:

git init

<img width="988" height="540" alt="Image" src="https://github.com/user-attachments/assets/0c100fd4-8427-4c5a-b13c-45a4911635aa" />

## ☁️ 2️⃣ Creación del repositorio remoto en GitHub
Ingresa a GitHub y crea un nuevo repositorio con el nombre zapateria-app.

Copia la URL del repositorio remoto.

<img width="1656" height="633" alt="Image" src="https://github.com/user-attachments/assets/b119e258-3c04-44b1-a75d-3c61e485b37c" />

## 🔗 3️⃣ Vinculación del repositorio local con el remoto
Conecta el repositorio local al remoto usando:

Usando 
git add .
git commit -m "Iniciando"
git remote add origin 
git push origin main

([https://github.com/BrandonB30/MacaBlue/blob/main/assets/images/Panel%20Admin.jpg](https://github.com/BrandonB30/Zapateria/blob/main/public/img/Git_Push.png))


## ⚙️ 5️⃣ Instalación de dependencias del proyecto
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

2) **Personalización del frontend:**

Se realizó una renovación completa del diseño visual de la aplicación, cambiando el nombre de la tienda de "Zapatería Aether" a "FootStyle" con un nuevo logo. Se implementó un esquema de colores moderno con gradientes en índigo y púrpura (#6366f1 → #8b5cf6) para el navbar, header y botones principales. Se cambió la tipografía a "Poppins" de Google Fonts para mejorar la legibilidad y estética. Se agregaron efectos de hover, sombras y transiciones suaves en las tarjetas de productos. El diseño mantiene completamente el formato responsive de Bootstrap, asegurando una experiencia óptima en todos los dispositivos. Los cambios se aplicaron tanto en `index.html` como en `cart.html` para mantener consistencia visual en toda la aplicación.

<img width="1919" height="954" alt="FootStyle - Diseño Personalizado" src="public/img/Frontend_Personalizado.png" />



3) **Ampliación del catálogo de productos**:

Se agregaron tres nuevos productos al catálogo en el archivo `src/routes/products.ts`:
- **Premium Blanco** : Zapatilla premium en cuero genuino, precio $229,999 COP, stock de 15 unidades, imagen `/img/shoe_7.png`
- **Casual Negro**: Calzado casual cómodo con estilo moderno, precio $169,999 COP, stock de 20 unidades, imagen `/img/shoe_8.png`
- **Running Rosa** : Zapatilla deportiva de alta tecnología con amortiguación avanzada, precio $219,999 COP, stock de 11 unidades, imagen `/img/shoe_9.png`

Cada producto incluye nombre, precio, descripción detallada y cantidad en stock. Las imágenes correspondientes fueron guardadas en la carpeta `/public/img/` con los nombres `shoe_7.png`, `shoe_8.png` y `shoe_9.png` respectivamente. 

<img width="1919" height="954" alt="Catálogo de Productos - FootStyle" src="public/img/Catalogo_Productos.png" />

4) **Implementación de un filtro de búsqueda :**

Se implementa un container, el botón de filtrar que realizará la acción y los espacios para los diferentes inputs.
Mediante la funcion function setupFilters() se establece como se aplicarán los filtros acompañado con un event listener "filterBtn.addEventListener" se declara que la accion se realiza cuando se da click al botón.


<img width="988" height="540" alt="Image" src="https://github.com/BrandonB30/Zapateria/blob/main/public/img/Filtro4.jpg" />

5) **Ruta adicional en el backend que calcula la cantidad y precio total de los productos.**

Se usa una nueva ruta que toma los elementos existentes del carrito, mediante el uso de objetos JSON y el .map que recorre los objetos agregados para calcular el total en unidades agregadas y el precio final.
Se realizan pruebas usando Postman para testear el GET y POST.

Se agregan 3 unidades del producto con Id 2  http://localhost:3000/api/cart/add

<img width="988" height="540" alt="Image" src="https://github.com/BrandonB30/Zapateria/blob/main/public/img/Prueba postman2.jpg" />

Se agregan 4 unidades del producto con Id 1  http://localhost:3000/api/cart/add

<img width="988" height="540" alt="Image" src="https://github.com/BrandonB30/Zapateria/blob/main/public/img/Prueba postman3.jpg" />

Se obtiene el total agregado. http://localhost:3000/api/cart/total

<img width="988" height="540" alt="Image" src="https://github.com/BrandonB30/Zapateria/blob/main/public/img/Prueba postman1.jpg" />

