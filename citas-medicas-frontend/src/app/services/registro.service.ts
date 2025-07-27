import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistroMedico } from '../models/registroMedico.model';
import { Paciente } from '../models/paciente.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private apiUrl = `${environment.apiUrl}/registros_medicos`;

  constructor(private http: HttpClient) { }

  getRegistros(): Observable<RegistroMedico[]> {
    return this.http.get<RegistroMedico[]>(this.apiUrl);
  }

  getRegistrosByPaciente(idPaciente: number): Observable<RegistroMedico[]> {
    return this.http.get<RegistroMedico[]>(`${this.apiUrl}/buscar_por_paciente/${idPaciente}`);
  }

  createRegistro(registro: RegistroMedico): Observable<RegistroMedico> {
    return this.http.post<RegistroMedico>(this.apiUrl, registro);
  }

  updateRegistro(id: number, registro: RegistroMedico): Observable<RegistroMedico> {
    return this.http.put<RegistroMedico>(`${this.apiUrl}/${id}`, registro);
  }

  deleteRegistro(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Método para obtener pacientes (para el select)
  getPacientes(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${environment.apiUrl}/pacientes`);
  }
} 