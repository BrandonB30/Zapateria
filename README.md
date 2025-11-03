Proyecto de zapateria App

# 🧩 Instrucciones de instalación, configuración y ejecución del proyecto

Este documento describe paso a paso el proceso de instalación, configuración y ejecución del proyecto **Zapatería App**, con capturas de pantalla del procedimiento completo.

---

## 🧱 1️⃣ Inicialización del repositorio local

1. Abre una terminal en la carpeta del proyecto.
2. Ejecuta el comando para inicializar un nuevo repositorio Git:

```bash
git init

`![Texto alternativo](public\img\Git_init.png)`

☁️ 2️⃣ Creación del repositorio remoto en GitHub
Ingresa a GitHub y crea un nuevo repositorio con el nombre zapateria-app.

Copia la URL del repositorio remoto.

(public\img\Repositorio.png?raw=true)

🔗 3️⃣ Vinculación del repositorio local con el remoto
Conecta el repositorio local al remoto usando:

Usando 
git add .
git commit -m "Iniciando"
git remote add origin 
git push origin main

(public\img\Git_Push.png?raw=true)

⚙️ 5️⃣ Instalación de dependencias del proyecto
Una vez clonado o descargado el proyecto, abre una terminal en la raíz del proyecto.

Ejecuta:

bash
Copy code
npm install
Esto instalará todas las dependencias necesarias definidas en el archivo package.json.

(public\img\Run.png?raw=true)

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

(public\img\Pagina.png?raw=true)

Y con esto finalizamos y comprobamos el funcionamiento de la pagina.