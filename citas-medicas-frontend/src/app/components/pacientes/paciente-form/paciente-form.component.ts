import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PacienteService } from '../../../services/paciente.service';
import { Paciente } from '../../../models/paciente.model';

@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.scss']
})
export class PacienteFormComponent implements OnInit {
  pacienteForm: FormGroup;
  loading = false;
  isEditMode = false;



  constructor(
    private fb: FormBuilder,
    private pacienteService: PacienteService,
    private dialogRef: MatDialogRef<PacienteFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Paciente
  ) {
    this.pacienteForm = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      cedula: ['', [Validators.required, Validators.pattern(/^\d{6,}$/)]],
      historia_medica: ['']
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.id_paciente) {
      this.isEditMode = true;
      this.pacienteForm.patchValue(this.data);
    }
  }

  onSubmit(): void {
    if (this.pacienteForm.valid) {
      this.loading = true;
      const pacienteData = this.pacienteForm.value;

      if (this.isEditMode) {
        this.pacienteService.updatePaciente(this.data.id_paciente!, pacienteData).subscribe({
          next: () => {
            this.loading = false;
            this.snackBar.open('Paciente actualizado exitosamente', 'Cerrar', { duration: 3000 });
            this.dialogRef.close(true);
          },
          error: (error) => {
            this.loading = false;
            this.snackBar.open(error.error?.message || 'Error al actualizar paciente', 'Cerrar', { duration: 3000 });
          }
        });
      } else {
        this.pacienteService.createPaciente(pacienteData).subscribe({
          next: () => {
            this.loading = false;
            this.snackBar.open('Paciente creado exitosamente', 'Cerrar', { duration: 3000 });
            this.dialogRef.close(true);
          },
          error: (error) => {
            this.loading = false;
            this.snackBar.open(error.error?.message || 'Error al crear paciente', 'Cerrar', { duration: 3000 });
          }
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getErrorMessage(controlName: string): string {
    const control = this.pacienteForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (control?.hasError('email')) {
      return 'Ingrese un email válido';
    }
    if (control?.hasError('minlength')) {
      const requiredLength = control.getError('minlength').requiredLength;
      return `Mínimo ${requiredLength} caracteres`;
    }
    if (control?.hasError('pattern')) {
      if (controlName === 'cedula') {
        return 'Debe tener al menos 6 dígitos';
      }
    }
    return '';
  }
} 