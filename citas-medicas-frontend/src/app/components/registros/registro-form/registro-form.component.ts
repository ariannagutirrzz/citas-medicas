import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistroService } from '../../../services/registro.service';
import { RegistroMedico } from '../../../models/registroMedico.model';
import { Paciente } from '../../../models/paciente.model';

@Component({
  selector: 'app-registro-form',
  templateUrl: './registro-form.component.html',
  styleUrls: ['./registro-form.component.scss']
})
export class RegistroFormComponent implements OnInit {
  registroForm: FormGroup;
  loading = false;
  isEditMode = false;
  pacientes: Paciente[] = [];

  constructor(
    private fb: FormBuilder,
    private registroService: RegistroService,
    private dialogRef: MatDialogRef<RegistroFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: RegistroMedico
  ) {
    this.registroForm = this.fb.group({
      id_paciente: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      diagnosis: ['', [Validators.required, Validators.minLength(10)]],
      tratamiento: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.loadPacientes();
    
    if (this.data && this.data.id_registro) {
      this.isEditMode = true;
      this.registroForm.patchValue(this.data);
    }
  }

  loadPacientes(): void {
    this.registroService.getPacientes().subscribe({
      next: (pacientes) => {
        this.pacientes = pacientes;
      },
      error: (error) => {
        console.error('Error al cargar pacientes:', error);
        this.snackBar.open('Error al cargar pacientes', 'Cerrar', { duration: 3000 });
      }
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      this.loading = true;
      const registroData = this.registroForm.value;

      if (this.isEditMode) {
        this.registroService.updateRegistro(this.data.id_registro!, registroData).subscribe({
          next: () => {
            this.loading = false;
            this.snackBar.open('Registro médico actualizado exitosamente', 'Cerrar', { duration: 3000 });
            this.dialogRef.close(true);
          },
          error: (error) => {
            this.loading = false;
            this.snackBar.open(error.error?.message || 'Error al actualizar registro médico', 'Cerrar', { duration: 3000 });
          }
        });
      } else {
        this.registroService.createRegistro(registroData).subscribe({
          next: () => {
            this.loading = false;
            this.snackBar.open('Registro médico creado exitosamente', 'Cerrar', { duration: 3000 });
            this.dialogRef.close(true);
          },
          error: (error) => {
            this.loading = false;
            this.snackBar.open(error.error?.message || 'Error al crear registro médico', 'Cerrar', { duration: 3000 });
          }
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getErrorMessage(controlName: string): string {
    const control = this.registroForm.get(controlName);
    if (control?.hasError('required')) {
      if (controlName === 'id_paciente') {
        return 'El paciente es requerido';
      }
      return 'Este campo es requerido';
    }
    if (control?.hasError('minlength')) {
      return 'Debe tener al menos 10 caracteres';
    }
    return '';
  }
} 