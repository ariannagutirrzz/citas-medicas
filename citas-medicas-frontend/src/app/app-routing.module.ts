import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardHomeComponent } from './components/dashboard/dashboard-home/dashboard-home.component';
import { PacientesComponent } from './components/pacientes/pacientes.component';
import { CitasComponent } from './components/citas/citas.component';
import { RegistrosComponent } from './components/registros/registros.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardHomeComponent },
      {
        path: 'pacientes',
        component: PacientesComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin', 'paciente'] }
      },
              {
          path: 'citas',
          component: CitasComponent,
          canActivate: [AuthGuard, RoleGuard],
          data: { roles: ['admin', 'doctor', 'paciente'] }
        },
        {
          path: 'registros',
          component: RegistrosComponent,
          canActivate: [AuthGuard, RoleGuard],
          data: { roles: ['admin', 'doctor'] }
        },
      {
        path: 'registros',
        component: RegistrosComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin', 'doctor'] }
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['admin'] }
      }
    ]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 