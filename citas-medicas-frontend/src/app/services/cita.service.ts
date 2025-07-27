import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cita } from '../models/cita.model';
import { Usuario } from '../models/usuario.model';
import { Paciente } from '../models/paciente.model';

@Injectable({
  providedIn: 'root'
})
export class CitaService {
  private apiUrl = 'http://localhost:3000/api/citas';

  constructor(private http: HttpClient) { }

  getCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.apiUrl);
  }

  getCitasByPaciente(idPaciente: number): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/buscar_por_paciente/${idPaciente}`);
  }

  getCitasByDoctor(idDoctor: number): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${this.apiUrl}/buscar_por_doctor/${idDoctor}`);
  }

  createCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.apiUrl, cita);
  }

  updateCita(id: number, cita: Cita): Observable<Cita> {
    return this.http.put<Cita>(`${this.apiUrl}/${id}`, cita);
  }

  deleteCita(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Métodos para obtener doctores y pacientes
  getDoctores(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>('http://localhost:3000/api/usuarios/doctores');
  }

  getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>('http://localhost:3000/api/pacientes');
  }
} 