# TaskFlow API

API REST para la gestión de usuarios, proyectos y tareas, desarrollada con **Node.js, Express y PostgreSQL**.

El proyecto implementa autenticación mediante **JWT**, persistencia de datos utilizando **Sequelize ORM**, validación de solicitudes, documentación interactiva mediante **Swagger** y despliegue en **Render**.

---

## 🚀 Demo

**API desplegada:**

https://daniel-flores.onrender.com

**Documentación Swagger:**

https://daniel-flores.onrender.com/api-docs

> La API requiere autenticación mediante Bearer Token para acceder a los recursos protegidos.

---

## 📋 Descripción

TaskFlow API permite a los usuarios:

- Registrarse e iniciar sesión.
- Crear y administrar proyectos.
- Asociar tareas a proyectos.
- Consultar las tareas de un proyecto mediante paginación.
- Crear, actualizar, completar y eliminar tareas.
- Eliminar proyectos mediante **Soft Delete**.
- Consultar un proyecto junto con sus tareas relacionadas.

La estructura principal de relaciones es:

```text
User
  │
  │ 1:N
  ▼
Project
  │
  │ 1:N
  ▼
Task
```

Un usuario puede tener múltiples proyectos y cada proyecto puede contener múltiples tareas.

---

## 🛠️ Tecnologías utilizadas

| Tecnología        | Uso                                   |
| ----------------- | ------------------------------------- |
| Node.js           | Entorno de ejecución                  |
| Express.js        | Framework para la API REST            |
| PostgreSQL        | Base de datos relacional              |
| Sequelize         | ORM para PostgreSQL                   |
| JWT               | Autenticación y autorización          |
| bcrypt            | Hash de contraseñas                   |
| Swagger           | Documentación y pruebas de la API     |
| express-validator | Validación de datos                   |
| Helmet            | Seguridad HTTP                        |
| CORS              | Control de solicitudes entre orígenes |
| Morgan / Pino     | Logging                               |
| Render            | Despliegue de la aplicación           |

---

## 📁 Estructura del proyecto

```text
taskflow-api/
│
├── src/
│   ├── config/
│   │   ├── env.js
│   │   └── logger.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── project.controller.js
│   │   └── task.controller.js
│   │
│   ├── database/
│   │   └── sequelize.js
│   │
│   ├── entities/
│   │   ├── user.entity.js
│   │   ├── project.entity.js
│   │   ├── task.entity.js
│   │   └── index.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── validation.middleware.js
│   │
│   ├── repositories/
│   │   ├── user.repository.js
│   │   ├── project.repository.js
│   │   └── task.repository.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── project.routes.js
│   │   └── task.routes.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── project.service.js
│   │   └── task.service.js
│   │
│   ├── utils/
│   │   ├── AppError.js
│   │   └── response.js
│   │
│   ├── validators/
│   │   └── common.validator.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

## 🗄️ Modelos y relaciones

### User

Representa a los usuarios registrados en el sistema.

Principales campos:

- `id`
- `name`
- `email`
- `password`
- `createdAt`
- `updatedAt`

### Project

Representa los proyectos pertenecientes a un usuario.

Principales campos:

- `id`
- `name`
- `description`
- `status`
- `userId`
- `createdAt`
- `updatedAt`
- `deletedAt`

El campo `deletedAt` es utilizado para implementar **Soft Delete** mediante Sequelize.

### Task

Representa las tareas pertenecientes a un proyecto.

Principales campos:

- `id`
- `title`
- `description`
- `completed`
- `projectId`
- `createdAt`
- `updatedAt`

### Relaciones

```text
User.hasMany(Project)
Project.belongsTo(User)

Project.hasMany(Task)
Task.belongsTo(Project)
```

Por lo tanto, las tareas pertenecen directamente a un proyecto y los proyectos pertenecen directamente a un usuario.

---

## 🔐 Autenticación

La API utiliza **JWT (JSON Web Token)** para proteger los endpoints privados.

### Registrar usuario

```http
POST /auth/register
```

Body:

```json
{
  "name": "Daniel",
  "email": "daniel@example.com",
  "password": "123456"
}
```

### Iniciar sesión

```http
POST /auth/login
```

Body:

```json
{
  "email": "daniel@example.com",
  "password": "123456"
}
```

La respuesta proporciona un token JWT que debe utilizarse posteriormente mediante:

```http
Authorization: Bearer <token>
```

---

# 📌 Endpoints

## Projects

Todas las rutas de proyectos requieren autenticación.

### Obtener proyectos

```http
GET /projects
```

Obtiene los proyectos del usuario autenticado.

### Crear proyecto

```http
POST /projects
```

Body:

```json
{
  "name": "Mi proyecto",
  "description": "Descripción del proyecto"
}
```

### Obtener proyecto

```http
GET /projects/:id
```

Obtiene un proyecto junto con sus tareas relacionadas.

### Actualizar proyecto

```http
PUT /projects/:id
```

Body:

```json
{
  "name": "Proyecto actualizado",
  "description": "Nueva descripción",
  "status": "active"
}
```

### Eliminar proyecto

```http
DELETE /projects/:id
```

La eliminación utiliza **Soft Delete**, por lo que el registro no se elimina físicamente de la base de datos. Sequelize utiliza el campo `deletedAt` para marcarlo como eliminado.

---

# 📝 Tasks

Todas las rutas de tareas requieren autenticación.

### Obtener tareas de un proyecto

```http
GET /tasks/:projectId
```

Permite utilizar paginación mediante:

```text
?page=1&limit=10
```

Ejemplo:

```http
GET /tasks/PROJECT_ID?page=1&limit=10
```

La respuesta incluye:

```json
{
  "items": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalItems": 0,
    "totalPages": 0
  }
}
```

### Crear tarea

```http
POST /tasks/:projectId
```

Body:

```json
{
  "title": "Primera tarea",
  "description": "Descripción de la tarea"
}
```

### Actualizar tarea

```http
PATCH /tasks/:projectId
```

Body:

```json
{
  "id": "TASK_ID",
  "title": "Tarea actualizada",
  "description": "Nueva descripción"
}
```

### Eliminar tarea

```http
DELETE /tasks/:projectId
```

Body:

```json
{
  "id": "TASK_ID"
}
```

### Completar tarea

```http
PATCH /tasks/:projectId/complete
```

Body:

```json
{
  "id": "TASK_ID"
}
```

---

# 📄 Swagger

La API cuenta con documentación interactiva mediante Swagger.

En producción:

**https://daniel-flores.onrender.com/api-docs**

Desde Swagger se pueden consultar y probar los endpoints disponibles.

La configuración utiliza diferentes servidores dependiendo del entorno:

```text
Desarrollo:
http://localhost:3000

Producción:
https://daniel-flores.onrender.com
```

---

# ⚙️ Instalación y ejecución local

## Requisitos

Antes de ejecutar el proyecto se necesita tener instalado:

- Node.js
- npm
- PostgreSQL

## 1. Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/taskflow-api-practica.git
```

Entrar al proyecto:

```bash
cd taskflow-api-practica
```

## 2. Instalar dependencias

```bash
npm install
```

## 3. Configurar variables de entorno

Crear un archivo `.env` a partir de `.env.example`.

Ejemplo:

```env
PORT=3000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=taskflow
DB_USER=postgres
DB_PASSWORD=TU_PASSWORD

JWT_SECRET=TU_SECRET
JWT_EXPIRES_IN=1d

LOG_LEVEL=info
```

> El archivo `.env` no debe subirse al repositorio porque contiene información sensible.

## 4. Ejecutar en desarrollo

```bash
npm run dev
```

El servidor estará disponible normalmente en:

```text
http://localhost:3000
```

La documentación Swagger estará disponible en:

```text
http://localhost:3000/api-docs
```

## 5. Ejecutar en producción

```bash
npm start
```

---

# 🧪 Pruebas

La API fue probada mediante Swagger tanto en el entorno local como en el entorno desplegado.

Se verificaron, entre otras, las siguientes funcionalidades:

- Registro de usuarios.
- Inicio de sesión.
- Autenticación mediante JWT.
- Creación de proyectos.
- Consulta de proyectos.
- Actualización de proyectos.
- Eliminación mediante Soft Delete.
- Creación de tareas.
- Consulta de tareas.
- Paginación.
- Actualización de tareas.
- Completar tareas.
- Eliminación de tareas.
- Relaciones entre usuarios, proyectos y tareas.
- Funcionamiento de la API en producción.

---

# ☁️ Despliegue

La API se encuentra desplegada utilizando **Render**.

La aplicación utiliza variables de entorno para configurar:

- Conexión a PostgreSQL.
- Entorno de ejecución.
- Secretos JWT.
- Configuración de logs.

La estructura de la base de datos es sincronizada mediante Sequelize al iniciar la aplicación.

---

# 🔒 Seguridad

El proyecto implementa algunas medidas básicas de seguridad:

- Contraseñas almacenadas mediante hash con `bcrypt`.
- Autenticación mediante JWT.
- Protección de rutas mediante middleware.
- Helmet para cabeceras de seguridad.
- CORS.
- Validación de datos de entrada.
- Variables sensibles almacenadas mediante variables de entorno.

---

# 👨‍💻 Autor

**Daniel Flores**

Proyecto desarrollado como parte del **Diplomado de Desarrollo Full Stack — Módulo 4: Desarrollo Backend con Node.js y Express**.
