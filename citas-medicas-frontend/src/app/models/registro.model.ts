export interface RegistroMedico {
  id_registro?: number;
  id_paciente: number;
  id_doctor: number;
  fecha: string;
  sintomas: string;
  diagnostico: string;
  tratamiento: string;
  prescripcion?: string;
  notas?: string;
  fecha_creacion?: string;
  paciente?: {
    nombre: string;
    apellido: string;
    cedula: string;
  };
  doctor?: {
    nombre: string;
    email: string;
  };
} 