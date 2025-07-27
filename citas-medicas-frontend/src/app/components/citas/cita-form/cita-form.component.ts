import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CitaService } from '../../../services/cita.service';
import { Cita } from '../../../models/cita.model';
import { Usuario } from '../../../models/usuario.model';
import { Paciente } from '../../../models/paciente.model';

@Component({
  selector: 'app-cita-form',
  templateUrl: './cita-form.component.html',
  styleUrls: ['./cita-form.component.scss']
})
export class CitaFormComponent implements OnInit {
  citaForm: FormGroup;
  loading = false;
  isEditMode = false;
  doctores: Usuario[] = [];
  pacientes: Paciente[] = [];

  constructor(
    private fb: FormBuilder,
    private citaService: CitaService,
    private dialogRef: MatDialogRef<CitaFormComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Cita
  ) {
    this.citaForm = this.fb.group({
      id_doctor: ['', [Validators.required, Validators.min(1)]],
      id_paciente: ['', [Validators.required, Validators.min(1)]],
      fecha: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      es_activa: ['activa', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadDoctores();
    this.loadPacientes();
    
    if (this.data && this.data.id_citas) {
      this.isEditMode = true;
      this.citaForm.patchValue(this.data);
    }
  }

  loadDoctores(): void {
    this.citaService.getDoctores().subscribe({
      next: (doctores) => {
        this.doctores = doctores;
      },
      error: (error) => {
        console.error('Error al cargar doctores:', error);
        this.snackBar.open('Error al cargar doctores', 'Cerrar', { duration: 3000 });
      }
    });
  }

  loadPacientes(): void {
    this.citaService.getPacientes().subscribe({
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
    if (this.citaForm.valid) {
      this.loading = true;
      const citaData = this.citaForm.value;

      if (this.isEditMode) {
        this.citaService.updateCita(this.data.id_citas!, citaData).subscribe({
          next: () => {
            this.loading = false;
            this.snackBar.open('Cita actualizada exitosamente', 'Cerrar', { duration: 3000 });
            this.dialogRef.close(true);
          },
          error: (error) => {
            this.loading = false;
            this.snackBar.open(error.error?.message || 'Error al actualizar cita', 'Cerrar', { duration: 3000 });
          }
        });
      } else {
        console.log('Enviando datos de cita:', citaData);
        this.citaService.createCita(citaData).subscribe({
          next: (response) => {
            console.log('Respuesta del servidor:', response);
            this.loading = false;
            this.snackBar.open('Cita creada exitosamente', 'Cerrar', { duration: 3000 });
            this.dialogRef.close(true);
          },
          error: (error) => {
            console.error('Error al crear cita:', error);
            this.loading = false;
            this.snackBar.open(error.error?.message || error.error?.details || 'Error al crear cita', 'Cerrar', { duration: 3000 });
          }
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  getErrorMessage(controlName: string): string {
    const control = this.citaForm.get(controlName);
    if (control?.hasError('required')) {
      if (controlName === 'id_doctor') {
        return 'El doctor es requerido';
      }
      if (controlName === 'id_paciente') {
        return 'El paciente es requerido';
      }
      return 'Este campo es requerido';
    }
    if (control?.hasError('min')) {
      return 'El valor debe ser mayor a 0';
    }
    return '';
  }
} 