import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {
  currentUser: Usuario | null = null;
  currentDate = new Date();

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
    console.log('Dashboard Home - Current User:', this.currentUser);
    console.log('Dashboard Home - User Role:', this.currentUser?.roles);
    console.log('Dashboard Home - Has Admin Role:', this.authService.hasRole('admin'));
    console.log('Dashboard Home - Has Any Role Admin/Doctor:', this.authService.hasAnyRole(['admin', 'doctor']));
  }

  getWelcomeMessage(): string {
    if (!this.currentUser) return 'Bienvenido';
    
    const hour = this.currentDate.getHours();
    let greeting = '';
    
    if (hour < 12) {
      greeting = 'Buenos días';
    } else if (hour < 18) {
      greeting = 'Buenas tardes';
    } else {
      greeting = 'Buenas noches';
    }
    
    return `${greeting}, ${this.currentUser.nombres} ${this.currentUser.apellidos}`;
  }

  getRoleLabel(role: string): string {
    switch (role) {
      case 'admin': return 'Administrador';
      case 'doctor': return 'Doctor';
      case 'paciente': return 'Paciente';
      default: return role;
    }
  }
} 