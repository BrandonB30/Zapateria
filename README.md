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

4) Implementación de un filtro de búsqueda:

Se implementa un container, el botón de filtrar que realizará la acción y los espacios para los diferentes inputs.
Mediante la funcion function setupFilters() se establece como se aplicarán los filtros acompañado con un event listener "filterBtn.addEventListener" se declara que la accion se realiza cuando se da click al botón.


<img width="988" height="540" alt="Image" src="https://github.com/BrandonB30/Zapateria/blob/main/public/img/Filtro4.jpg" />

5) Ruta adicional en el backend que calcula la cantidad y precio total de los productos.

Se usa una nueva ruta que toma los elementos existentes del carrito, mediante el uso de objetos JSON y el .map que recorre los objetos agregados para calcular el total en unidades agregadas y el precio final.
Se realizan pruebas usando Postman para testear el GET y POST.

Se agregan 3 unidades del producto con Id 2  http://localhost:3000/api/cart/add

<img width="988" height="540" alt="Image" src="https://github.com/BrandonB30/Zapateria/blob/main/public/img/Prueba postman2.jpg" />

Se agregan 4 unidades del producto con Id 1  http://localhost:3000/api/cart/add

<img width="988" height="540" alt="Image" src="https://github.com/BrandonB30/Zapateria/blob/main/public/img/Prueba postman3.jpg" />

Se obtiene el total agregado. http://localhost:3000/api/cart/total

<img width="988" height="540" alt="Image" src="https://github.com/BrandonB30/Zapateria/blob/main/public/img/Prueba postman1.jpg" />

