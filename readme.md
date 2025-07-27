# Sistema de Gestión de Citas Médicas

Sistema completo que permite administrar pacientes, citas, registros médicos y usuarios. 

## 🏗️ Arquitectura

- **Backend**: Node.js, Express y Sequelize con autenticación JWT
- **Frontend**: Angular 16 con Angular Material
- **Base de Datos**: MySQL
- **Autenticación**: JWT con roles (admin, doctor, paciente) y refresh tokens

## 📋 Características

- ✅ Autenticación completa (login/registro)
- ✅ Gestión de Pacientes (CRUD completo)
- ✅ Gestión de Citas (CRUD completo)
- ✅ Gestión de Registros Médicos (CRUD completo)
- ✅ Gestión de Usuarios (CRUD completo)
- ✅ Protección de rutas por roles
- ✅ Interfaz moderna y responsive
- ✅ Validaciones en frontend y backend

## 🚀 Instalación y Configuración

### 📋 Requisitos Previos

- **Node.js**: Versión 22.12.0 o superior
- **MySQL**: 8.0 o superior
- **Angular CLI**: Versión 16 o superior
- **Git**: Para clonar el repositorio

### 🔧 Configuración del Backend

#### 1. Instalar Dependencias del Backend
```bash
# Navegar al directorio del proyecto
cd CitasMedicasExpress

# Instalar dependencias
npm install
```

#### 2. Configurar Base de Datos MySQL
```sql
-- Crear la base de datos
CREATE DATABASE citas_medicas_andres;

-- Importar el esquema
-- Usar el archivo: src/data/citasMedicasAndres.sql
```

#### 3. Configurar Variables de Entorno
Crear archivo `.env` en la raíz del proyecto:
```env
DBHOST = localhost
DBUSER = root
DBPASSWORD = 
DBPORT = 3306
DBNAME = citas_medicas_andres
ACCESS_TOKEN_SECRET= tu_clave_secreta_access_token
REFRESH_TOKEN_SECRET= tu_clave_secreta_refresh_token
ACCESS_TOKEN_EXPIRES_IN= 15m
REFRESH_TOKEN_EXPIRES_IN= 24h
```

#### 4. Ejecutar el Backend
```bash
# Iniciar el servidor backend
npm start

# El backend estará disponible en: http://localhost:3000
```

### 🎨 Configuración del Frontend

#### 1. Instalar Angular CLI (si no está instalado)
```bash
npm install -g @angular/cli@16
```

#### 2. Navegar al Directorio del Frontend
```bash
cd citas-medicas-frontend
```

#### 3. Instalar Dependencias del Frontend
```bash
npm install
```

#### 4. Ejecutar el Frontend
```bash
# Iniciar el servidor de desarrollo
ng serve

# El frontend estará disponible en: http://localhost:4200
```

### 📊 Datos de Prueba

#### Insertar Usuarios de Prueba
```sql
-- Ejecutar los archivos SQL de prueba:
-- inserts_usuarios_doctores.sql
-- inserts_pacientes.sql
-- inserts_citas.sql
-- inserts_registros_medicos.sql
-- inserts_usuarios_adicionales.sql
```

#### Credenciales de Prueba
- **Admin**: cédula: `30605255`, contraseña: `123456`
- **Doctor**: cédula: `123456`, contraseña: `123456`
- **Paciente**: cédula: `123456789`, contraseña: `123456`

## 🔧 Dependencias

### Backend
- express
- bcrypt.js
- sequelize
- jsonwebtoken
- mysql2
- dotenv
- cors

### Frontend
- Angular 16.2.0
- Angular Material
- Angular Flex Layout
- RxJS
- JWT Decode

## 🎯 Uso del Sistema

### 1. Acceso al Sistema
- Abrir navegador en: `http://localhost:4200`
- Usar las credenciales de prueba para iniciar sesión

### 2. Funcionalidades por Rol

#### 👨‍⚕️ Administrador (Admin)
- ✅ Gestión completa de usuarios
- ✅ Gestión completa de pacientes
- ✅ Gestión completa de citas
- ✅ Gestión completa de registros médicos
- ✅ Acceso a todas las funcionalidades

#### 🩺 Doctor
- ✅ Ver y gestionar citas
- ✅ Crear y editar registros médicos
- ✅ Ver pacientes
- ❌ No puede gestionar usuarios

#### 👤 Paciente
- ✅ Ver citas propias
- ✅ Ver información personal
- ❌ Acceso limitado a otras funcionalidades

## 🌐 Despliegue en la Web

### Opción 1: Vercel (Frontend) + Railway/Heroku (Backend)

#### Frontend en Vercel:
1. **Preparar el proyecto para producción**:
```bash
cd citas-medicas-frontend
ng build --configuration production
```

2. **Crear archivo `vercel.json`** en la raíz del frontend:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/citas-medicas-frontend/*",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/dist/citas-medicas-frontend/index.html"
    }
  ]
}
```

3. **Actualizar URLs del backend** en `environment.ts`:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://tu-backend-url.railway.app/api'
};
```

#### Backend en Railway:
1. **Crear cuenta en Railway.app**
2. **Conectar repositorio de GitHub**
3. **Configurar variables de entorno**:
   - `DBHOST`
   - `DBUSER`
   - `DBPASSWORD`
   - `DBNAME`
   - `ACCESS_TOKEN_SECRET`
   - `REFRESH_TOKEN_SECRET`

### Opción 2: Netlify (Frontend) + Render (Backend)

#### Frontend en Netlify:
1. **Build command**: `ng build --configuration production`
2. **Publish directory**: `dist/citas-medicas-frontend`
3. **Crear archivo `_redirects`** en `src/`:
```
/*    /index.html   200
```

#### Backend en Render:
1. **Crear cuenta en Render.com**
2. **Conectar repositorio**
3. **Configurar como Web Service**
4. **Build Command**: `npm install`
5. **Start Command**: `npm start`

### Opción 3: Firebase Hosting (Frontend) + Google Cloud (Backend)

#### Frontend en Firebase:
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 🔧 Solución de Problemas

### Error: "Cannot find module"
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Error: "Connection refused" en MySQL
```bash
# Verificar que MySQL esté corriendo
# En Windows: Servicios > MySQL
# En Linux: sudo systemctl start mysql
```

### Error: "Port already in use"
```bash
# Cambiar puerto del backend en src/index.js
# O matar el proceso que usa el puerto
```

### Error: "CORS policy"
```bash
# Verificar que el backend esté corriendo en puerto 3000
# Verificar configuración CORS en src/index.js
```

### Error: "Angular CLI not found"
```bash
# Instalar Angular CLI globalmente
npm install -g @angular/cli@16
```

### Error 404 en Vercel:
1. **Verificar `vercel.json`** está en la raíz del proyecto
2. **Verificar build path** es correcto
3. **Verificar `angular.json`** tiene la configuración correcta
4. **Verificar `package.json`** tiene el script de build

## 📁 Estructura del Proyecto

```
CitasMedicasExpress/
├── src/                    # Backend Node.js
│   ├── config/            # Configuración de BD
│   ├── controllers/       # Controladores
│   ├── middleware/        # Middlewares de auth
│   ├── models/           # Modelos Sequelize
│   ├── routers/          # Rutas de la API
│   └── services/         # Servicios de BD
├── citas-medicas-frontend/ # Frontend Angular
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/ # Componentes
│   │   │   ├── services/   # Servicios HTTP
│   │   │   ├── models/     # Interfaces TypeScript
│   │   │   ├── guards/     # Guards de autenticación
│   │   │   └── interceptors/ # Interceptores HTTP
│   │   └── assets/        # Recursos estáticos
└── *.sql                 # Archivos de datos de prueba
```

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
