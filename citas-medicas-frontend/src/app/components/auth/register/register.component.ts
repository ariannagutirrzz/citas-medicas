import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../services/auth.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  roles = [
    { value: 'admin', label: 'Administrador' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'paciente', label: 'Paciente' }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      cedula: ['', [Validators.required, Validators.pattern(/^\d{6,}$/)]],
      contraseña: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      roles: ['paciente', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    const contraseña = form.get('contraseña');
    const confirmPassword = form.get('confirmPassword');
    
    if (contraseña && confirmPassword && contraseña.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      const usuario: Usuario = {
        nombres: this.registerForm.value.nombres,
        apellidos: this.registerForm.value.apellidos,
        email: this.registerForm.value.email,
        cedula: this.registerForm.value.cedula,
        contraseña: this.registerForm.value.contraseña,
        roles: this.registerForm.value.roles
      };

      this.authService.register(usuario).subscribe({
        next: (response) => {
          this.loading = false;
          this.snackBar.open('Registro exitoso. Por favor inicie sesión.', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.loading = false;
          this.snackBar.open(error.error?.message || 'Error en el registro', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }
} 