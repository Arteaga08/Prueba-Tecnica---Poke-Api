# Poke API

Este proyecto consta de **dos módulos**:  

1. **Módulo Pokédex (Frontend)**  
   - Consume la API pública [PokeAPI](https://pokeapi.co/docs/v2).  
   - Permite **listar pokémon**, **paginarlos** y aplicar **filtros de búsqueda**.  

2. **Módulo Entrenadores (Backend)**  
   - API REST construida con **Node.js + Express + MongoDB**.  
   - Permite **crear, leer, actualizar y eliminar entrenadores Pokémon**.   

---

## 🚀 Tecnologías principales

- **Frontend:** React 19, Vite, TailwindCSS, React Router, Axios  
- **Backend:** Node.js, Express, MongoDB (Mongoose), dotenv, PDFKit  
- **Otros:** Morgan, Express Validator  

---

## ⚙️ Requisitos previos

- Node.js>= 20 
- npm => 10
- Conexión a un clúster de MongoDB Atlas (en la nube).

---

Debes actualizar el README.md para reflejar el cambio a MongoDB Atlas, ya que la configuración de conexión es diferente y es crucial para que el proyecto funcione en cualquier máquina.

Aquí está el texto completo del README.md actualizado que puedes copiar y pegar. He añadido una sección clara para la configuración de la base de datos en la nube.

# Poke API
Este proyecto consta de dos módulos:

Módulo Pokédex (Frontend)

Consume la API pública PokeAPI.

Permite listar pokémon, paginarlos y aplicar filtros de búsqueda.

Módulo Entrenadores (Backend)

API REST construida con Node.js + Express + MongoDB.

Permite crear, leer, actualizar y eliminar entrenadores Pokémon.

🚀 Tecnologías principales
Frontend: React 19, Vite, TailwindCSS, React Router, Axios

Backend: Node.js, Express, MongoDB (Mongoose), dotenv, PDFKit

Otros: Morgan, Express Validator

⚙️ Requisitos previos
Node.js>= 20

npm => 10

Conexión a un clúster de MongoDB Atlas (en la nube).

# Configuracion MongoDb(Atlas)
El proyecto se conecta a una base de datos en la nube para ser portable. Sigue estos pasos para configurarla:

1. **Crea una cuenta gratuita y un clúster en MongoDB Atlas.**
2. **En la sección Database Access, crea un nuevo usuario y guarda la contraseña.**
3. **En Network Access, configura el acceso para que permita conexiones desde cualquier IP (0.0.0.0/0).**
4. **Obtén la cadena de conexión de tu clúster.**

-- En la carpeta backend, crea un archivo llamado .env y pega tu cadena de conexión, reemplazando el usuario y la contraseña con los que creaste.

Fragmento de código
MONGO_URI=mongodb+srv://<tu_usuario>:<tu_contraseña>@<tu_cluster>.mongodb.net/<nombre_bd>?retryWrites=true&w=majority

## 📥 Instalación

Clonar el repositorio:

1. ```bash
git clone https://github.com/Arteaga08/Prueba-Tecnica---Poke-Api.git

 - cd Prueba-Tecnica---Poke-Api

2. Configuración de Variables de Entorno
El proyecto backend utiliza un archivo .env para gestionar las variables de entorno, como la conexión a la base de datos.

En la carpeta backend, crea un archivo llamado .env.

Copia y pega la siguiente línea en ese nuevo archivo:

Fragmento de código

MONGO_URI=mongodb://127.0.0.1:27017/poke-db

3. Este proyecto tiene dependencias en la carpeta raíz y en las carpetas de backend y frontend. Para instalar todas las dependencias necesarias, ejecuta los siguientes comandos desde la carpeta raíz del proyecto:

```bash
 - npm install
 - npm install --prefix backend # Instala las dependencias del backend
 - npm install --prefix frontend # Instala las dependencias del frontend


4. Ejecución del Proyecto
Una vez que todas las dependencias estén instaladas, puedes iniciar el proyecto completo con un solo comando. Gracias al paquete concurrently, este comando iniciará tanto el servidor del backend como el servidor del frontend simultáneamente.

```bash
 - npm run dev