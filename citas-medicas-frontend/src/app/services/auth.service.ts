import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario, LoginRequest, LoginResponse, AuthResponse } from '../models/usuario.model';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private currentUserSubject: BehaviorSubject<Usuario | null>;
  public currentUser: Observable<Usuario | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Usuario | null>(
      this.getUserFromToken()
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Usuario | null {
    return this.currentUserSubject.value;
  }

  private getUserFromToken(): Usuario | null {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwt_decode(token);
        // The token only contains idusuario, we need to get user info from localStorage or make an API call
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
          return JSON.parse(userInfo);
        }
        return {
          id_usuario: decoded.idusuario,
          nombres: '',
          apellidos: '',
          email: '',
          cedula: '',
          roles: 'paciente'
        };
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userInfo');
        return null;
      }
    }
    return null;
  }

  login(loginRequest: LoginRequest): Observable<AuthResponse> {
    return this.http.post<any>(`${this.apiUrl}/inicio_sesion`, loginRequest)
      .pipe(
        map(response => {
          localStorage.setItem('token', response.jwt);
          localStorage.setItem('refreshToken', response.refresh);
          localStorage.setItem('userInfo', JSON.stringify(response.usuario));
          
          this.currentUserSubject.next(response.usuario);
          
          return {
            success: true,
            message: 'Login exitoso',
            token: response.jwt,
            usuario: response.usuario
          };
        })
      );
  }

  register(usuario: Usuario): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}`, usuario);
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/cierre_sesion`, {}).subscribe();
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userInfo');
    this.currentUserSubject.next(null);
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post(`${this.apiUrl}/refresh`, { refreshToken });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    try {
      const decoded: any = jwt_decode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch {
      return false;
    }
  }

  hasRole(role: string): boolean {
    const user = this.currentUserValue;
    return user ? user.roles === role : false;
  }

  hasAnyRole(roles: string[]): boolean {
    const user = this.currentUserValue;
    console.log('Checking roles:', roles, 'User role:', user?.roles, 'Full user:', user);
    return user ? roles.includes(user.roles) : false;
  }
} 