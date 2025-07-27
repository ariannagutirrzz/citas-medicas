export interface Cita {
  id_citas?: number;
  id_doctor: number;
  id_paciente: number;
  fecha: string;
  hora: string;
  es_activa: 'activa' | 'terminada';
} 