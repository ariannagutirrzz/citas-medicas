import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CitaService } from '../../services/cita.service';
import { Cita } from '../../models/cita.model';
import { Usuario } from '../../models/usuario.model';
import { Paciente } from '../../models/paciente.model';
import { CitaFormComponent } from './cita-form/cita-form.component';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss']
})
export class CitasComponent implements OnInit {
  displayedColumns: string[] = ['fecha', 'hora', 'paciente', 'doctor', 'es_activa', 'acciones'];
  dataSource: MatTableDataSource<Cita> = new MatTableDataSource<Cita>([]);
  loading = false;
  doctores: Usuario[] = [];
  pacientes: Paciente[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private citaService: CitaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCitas();
    this.loadDoctores();
    this.loadPacientes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadCitas(): void {
    this.loading = true;
    this.citaService.getCitas().subscribe({
      next: (citas) => {
        this.dataSource.data = citas;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open('Error al cargar citas', 'Cerrar', { duration: 3000 });
      }
    });
  }

  getEstadoColor(estado: string): string {
    switch (estado) {
      case 'activa': return 'primary';
      case 'terminada': return 'accent';
      default: return 'primary';
    }
  }

  getEstadoLabel(estado: string): string {
    switch (estado) {
      case 'activa': return 'Activa';
      case 'terminada': return 'Terminada';
      default: return estado;
    }
  }

  openCitaForm(cita?: Cita): void {
    const dialogRef = this.dialog.open(CitaFormComponent, {
      width: '600px',
      data: cita || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadCitas();
      }
    });
  }

  editCita(cita: Cita): void {
    this.openCitaForm(cita);
  }

  deleteCita(cita: Cita): void {
    if (confirm(`¿Está seguro de eliminar la cita del ${cita.fecha}?`)) {
      this.citaService.deleteCita(cita.id_citas!).subscribe({
        next: () => {
          this.snackBar.open('Cita eliminada exitosamente', 'Cerrar', { duration: 3000 });
          this.loadCitas();
        },
        error: (error) => {
          this.snackBar.open('Error al eliminar cita', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadDoctores(): void {
    this.citaService.getDoctores().subscribe({
      next: (doctores) => {
        this.doctores = doctores;
      },
      error: (error) => {
        console.error('Error al cargar doctores:', error);
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
      }
    });
  }

  getDoctorName(idDoctor: number): string {
    const doctor = this.doctores.find(d => d.id_usuario === idDoctor);
    return doctor ? `${doctor.nombres} ${doctor.apellidos}` : `ID: ${idDoctor}`;
  }

  getPacienteName(idPaciente: number): string {
    const paciente = this.pacientes.find(p => p.id_paciente === idPaciente);
    return paciente ? `${paciente.nombres} ${paciente.apellidos}` : `ID: ${idPaciente}`;
  }
} 