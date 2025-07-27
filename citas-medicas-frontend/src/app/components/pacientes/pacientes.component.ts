import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PacienteService } from '../../services/paciente.service';
import { Paciente } from '../../models/paciente.model';
import { PacienteFormComponent } from './paciente-form/paciente-form.component';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {
  displayedColumns: string[] = ['nombres', 'apellidos', 'email', 'cedula', 'historia_medica', 'acciones'];
  dataSource: MatTableDataSource<Paciente> = new MatTableDataSource<Paciente>([]);
  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private pacienteService: PacienteService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPacientes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadPacientes(): void {
    this.loading = true;
    this.pacienteService.getPacientes().subscribe({
      next: (pacientes) => {
        this.dataSource.data = pacientes;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open('Error al cargar pacientes', 'Cerrar', { duration: 3000 });
      }
    });
  }

  openPacienteForm(paciente?: Paciente): void {
    const dialogRef = this.dialog.open(PacienteFormComponent, {
      width: '600px',
      data: paciente || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPacientes();
      }
    });
  }

  editPaciente(paciente: Paciente): void {
    this.openPacienteForm(paciente);
  }

  deletePaciente(paciente: Paciente): void {
    if (confirm(`¿Está seguro de eliminar al paciente ${paciente.nombres} ${paciente.apellidos}?`)) {
      this.pacienteService.deletePaciente(paciente.id_paciente!).subscribe({
        next: () => {
          this.snackBar.open('Paciente eliminado exitosamente', 'Cerrar', { duration: 3000 });
          this.loadPacientes();
        },
        error: (error) => {
          this.snackBar.open('Error al eliminar paciente', 'Cerrar', { duration: 3000 });
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


} 