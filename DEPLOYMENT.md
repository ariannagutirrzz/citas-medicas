# 🌐 Guía de Despliegue - Sistema de Citas Médicas

## 🚀 Opciones de Despliegue

### Opción 1: Vercel (Frontend) + Railway (Backend) - RECOMENDADA

#### Paso 1: Desplegar Backend en Railway

1. **Crear cuenta en Railway.app**
   - Ve a [railway.app](https://railway.app)
   - Conecta tu cuenta de GitHub

2. **Crear nuevo proyecto**
   - Click en "New Project"
   - Selecciona "Deploy from GitHub repo"
   - Selecciona tu repositorio

3. **Configurar variables de entorno**
   - Ve a la pestaña "Variables"
   - Agrega las siguientes variables:
   ```
   DBHOST=tu-host-mysql
   DBUSER=tu-usuario-mysql
   DBPASSWORD=tu-password-mysql
   DBNAME=citas_medicas_andres
   DBPORT=3306
   ACCESS_TOKEN_SECRET=tu_clave_secreta_access_token
   REFRESH_TOKEN_SECRET=tu_clave_secreta_refresh_token
   ACCESS_TOKEN_EXPIRES_IN=15m
   REFRESH_TOKEN_EXPIRES_IN=24h
   ```

4. **Configurar base de datos**
   - Puedes usar Railway MySQL o conectar una base de datos externa
   - Importa el archivo `src/data/citasMedicasAndres.sql`

5. **Obtener URL del backend**
   - Railway te dará una URL como: `https://tu-app.railway.app`
   - Guarda esta URL para configurar el frontend

#### Paso 2: Desplegar Frontend en Vercel

1. **Preparar el proyecto**
   ```bash
   cd citas-medicas-frontend
   ```

2. **Actualizar environment.prod.ts**
   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'https://tu-app.railway.app/api' // URL de tu backend en Railway
   };
   ```

3. **Crear cuenta en Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Conecta tu cuenta de GitHub

4. **Importar proyecto**
   - Click en "New Project"
   - Selecciona tu repositorio
   - Configura:
     - **Framework Preset**: Angular
     - **Root Directory**: `citas-medicas-frontend`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist/citas-medicas-frontend`

5. **Deploy**
   - Click en "Deploy"
   - Vercel te dará una URL como: `https://tu-app.vercel.app`

### Opción 2: Netlify (Frontend) + Render (Backend)

#### Backend en Render:
1. Ve a [render.com](https://render.com)
2. Crea un "Web Service"
3. Conecta tu repositorio
4. Configura:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Agrega las variables de entorno

#### Frontend en Netlify:
1. Ve a [netlify.com](https://netlify.com)
2. Conecta tu repositorio
3. Configura:
   - **Build command**: `cd citas-medicas-frontend && npm run build`
   - **Publish directory**: `citas-medicas-frontend/dist/citas-medicas-frontend`

### Opción 3: Firebase Hosting (Frontend) + Google Cloud (Backend)

#### Frontend en Firebase:
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
# Selecciona tu proyecto y configura
firebase deploy
```

## 🔧 Solución de Problemas Comunes

### Error 404 en Vercel:
1. **Verificar `vercel.json`** está en la raíz del frontend
2. **Verificar build path** en `angular.json`
3. **Verificar `package.json`** tiene el script de build correcto

### Error CORS:
1. **Verificar configuración CORS** en `src/index.js`
2. **Verificar URL del backend** en environment.prod.ts
3. **Verificar que el backend esté corriendo**

### Error de Base de Datos:
1. **Verificar variables de entorno** en Railway/Render
2. **Verificar conexión a MySQL**
3. **Verificar que la base de datos esté creada**

### Error de Build:
1. **Verificar Node.js version** (22.12.0)
2. **Verificar dependencias** instaladas
3. **Verificar scripts** en package.json

## 📋 Checklist de Despliegue

### Backend:
- [ ] Variables de entorno configuradas
- [ ] Base de datos creada y poblada
- [ ] CORS configurado para el dominio del frontend
- [ ] Endpoints funcionando correctamente

### Frontend:
- [ ] Environment.prod.ts actualizado con URL del backend
- [ ] Vercel.json configurado correctamente
- [ ] Build exitoso localmente
- [ ] Todas las dependencias instaladas

### General:
- [ ] URLs actualizadas en todos los servicios
- [ ] Pruebas de autenticación funcionando
- [ ] CRUD operations funcionando
- [ ] Responsive design funcionando

## 🌍 URLs de Producción

Una vez desplegado, tendrás:
- **Frontend**: `https://tu-app.vercel.app`
- **Backend**: `https://tu-app.railway.app`

## 🔐 Credenciales de Prueba

Usa estas credenciales para probar el sistema:
- **Admin**: cédula: `30605255`, contraseña: `123456`
- **Doctor**: cédula: `123456`, contraseña: `123456`
- **Paciente**: cédula: `123456789`, contraseña: `123456` 