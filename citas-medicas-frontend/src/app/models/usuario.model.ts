export interface Usuario {
  id_usuario?: number;
  nombres: string;
  apellidos: string;
  email: string;
  cedula: string;
  contraseña?: string;
  roles: 'admin' | 'doctor' | 'paciente';
  fecha_creacion?: string;
  activo?: boolean;
}

export interface LoginRequest {
  cedula: string;
  contraseña: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  usuario: Usuario;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  usuario?: Usuario | null;
} 