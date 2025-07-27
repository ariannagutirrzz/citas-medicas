# Citas Médicas Express - Frontend Angular

Este es el frontend de la aplicación de gestión de citas médicas desarrollado en Angular con Material Design.

## Características

- 🔐 **Sistema de Autenticación Completo**: Login, registro y gestión de tokens JWT
- 👥 **Gestión de Usuarios**: CRUD completo con roles (admin, doctor, paciente)
- 🏥 **Gestión de Pacientes**: CRUD completo con validaciones
- 📅 **Gestión de Citas**: Programación y seguimiento de citas médicas
- 📋 **Registros Médicos**: Historial médico de pacientes
- 🛡️ **Protección de Rutas**: Guards basados en roles y autenticación
- 🎨 **UI Moderna**: Material Design con Angular Material
- 📱 **Responsive**: Diseño adaptable a diferentes dispositivos

## Requisitos Previos

- Node.js (versión 16 o superior)
- npm o yarn
- Angular CLI

## Instalación

1. **Instalar Angular CLI globalmente**:
   ```bash
   npm install -g @angular/cli
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar el backend**:
   Asegúrate de que tu backend Node.js esté ejecutándose en `http://localhost:3000`

## Desarrollo

### Ejecutar en modo desarrollo
```bash
ng serve
```
La aplicación estará disponible en `http://localhost:4200`

### Construir para producción
```bash
ng build --configuration production
```

## Estructura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   ├── auth/           # Componentes de autenticación
│   │   ├── dashboard/      # Dashboard principal
│   │   ├── pacientes/      # Gestión de pacientes
│   │   ├── citas/          # Gestión de citas
│   │   ├── registros/      # Registros médicos
│   │   ├── usuarios/       # Gestión de usuarios
│   │   └── navbar/         # Barra de navegación
│   ├── models/             # Interfaces TypeScript
│   ├── services/           # Servicios para API
│   ├── guards/             # Guards de autenticación
│   ├── interceptors/       # Interceptores HTTP
│   └── app.module.ts       # Módulo principal
├── assets/                 # Recursos estáticos
└── styles.scss            # Estilos globales
```

## Endpoints del Backend

La aplicación se conecta a los siguientes endpoints:

- **Autenticación**: `http://localhost:3000/api/auth`
- **Pacientes**: `http://localhost:3000/api/pacientes`
- **Citas**: `http://localhost:3000/api/citas`
- **Registros Médicos**: `http://localhost:3000/api/registros_medicos`

## Funcionalidades por Rol

### Administrador
- Acceso completo a todas las funcionalidades
- Gestión de usuarios, pacientes, citas y registros médicos

### Doctor
- Ver y gestionar registros médicos
- Ver citas asignadas

### Paciente
- Ver citas propias
- Ver registros médicos propios

## Tecnologías Utilizadas

- **Angular 16**: Framework principal
- **Angular Material**: Componentes UI
- **Angular Flex Layout**: Layout responsive
- **RxJS**: Programación reactiva
- **JWT**: Autenticación con tokens
- **SCSS**: Estilos avanzados

## Scripts Disponibles

- `npm start`: Ejecutar en modo desarrollo
- `npm run build`: Construir para producción
- `npm test`: Ejecutar pruebas
- `ng generate component`: Generar nuevos componentes

## Configuración de CORS

Asegúrate de que tu backend tenga configurado CORS para permitir peticiones desde `http://localhost:4200`.

## Solución de Problemas

### Error de CORS
Si encuentras errores de CORS, verifica que tu backend tenga configurado:
```javascript
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
```

### Error de Token
Si hay problemas con la autenticación, verifica:
1. Que el backend esté ejecutándose
2. Que las credenciales sean correctas
3. Que el token se esté enviando correctamente

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. 