export interface RegistroMedico {
  id_registro?: number;
  id_paciente: number;
  fecha: string;
  diagnosis: string;
  tratamiento: string;
} 