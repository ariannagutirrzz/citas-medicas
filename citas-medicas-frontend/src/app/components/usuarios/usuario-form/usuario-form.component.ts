import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent implements OnInit {
  usuarioForm: FormGroup;
  loading = false;
  isEditMode = false;
  hidePassword = true;
  hideConfirmPassword = true;

  roles = [
    { value: 'admin', label: 'Administrador' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'paciente', label: 'Paciente' }
  ];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private dialogRef: MatDialogRef<UsuarioFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Usuario
  ) {
    this.usuarioForm = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      cedula: ['', [Validators.required, Validators.pattern(/^\d{6,}$/)]],
      contraseña: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      roles: ['paciente', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(): void {
    if (this.data && this.data.id_usuario) {
      this.isEditMode = true;
      // En modo edición, no requerimos contraseña
      this.usuarioForm.removeControl('contraseña');
      this.usuarioForm.removeControl('confirmPassword');
      this.usuarioForm.patchValue(this.data);
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('contraseña');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    
    if (confirmPassword && confirmPassword.errors) {
      delete confirmPassword.errors['passwordMismatch'];
      if (Object.keys(confirmPassword.errors).length === 0) {
        confirmPassword.setErrors(null);
      }
    }
    
    return null;
  }

  onSubmit(): void {
    if (this.usuarioForm.valid) {
      this.loading = true;
      const usuarioData = this.usuarioForm.value;

      if (this.isEditMode) {
        // En edición, no enviamos contraseña
        delete usuarioData.contraseña;
        delete usuarioData.confirmPassword;
        
        this.usuarioService.updateUsuario(this.data.id_usuario!, usuarioData).subscribe({
          next: () => {
            this.loading = false;
            this.snackBar.open('Usuario actualizado exitosamente', 'Cerrar', { duration: 3000 });
            this.dialogRef.close(true);
          },
          error: (error) => {
            this.loading = false;
            this.snackBar.open(error.error?.message || 'Error al actualizar usuario', 'Cerrar', { duration: 3000 });
          }
        });
      } else {
        // En creación, enviamos todos los datos
        delete usuarioData.confirmPassword;
        
        this.usuarioService.createUsuario(usuarioData).subscribe({
          next: () => {
            this.loading = false;
            this.snackBar.open('Usuario creado exitosamente', 'Cerrar', { duration: 3000 });
            this.dialogRef.close(true);
          },
          error: (error) => {
            this.loading = false;
            this.snackBar.open(error.error?.message || 'Error al crear usuario', 'Cerrar', { duration: 3000 });
          }
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getErrorMessage(controlName: string): string {
    const control = this.usuarioForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (control?.hasError('email')) {
      return 'Email inválido';
    }
    if (control?.hasError('minlength')) {
      if (controlName === 'nombres' || controlName === 'apellidos') {
        return 'Debe tener al menos 2 caracteres';
      }
      if (controlName === 'contraseña') {
        return 'Debe tener al menos 6 caracteres';
      }
    }
    if (control?.hasError('pattern')) {
      if (controlName === 'cedula') {
        return 'Debe tener al menos 6 dígitos';
      }
    }
    if (control?.hasError('passwordMismatch')) {
      return 'Las contraseñas no coinciden';
    }
    return '';
  }
} 