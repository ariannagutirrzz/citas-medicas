import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistroService } from '../../services/registro.service';
import { RegistroMedico } from '../../models/registroMedico.model';
import { Paciente } from '../../models/paciente.model';
import { RegistroFormComponent } from './registro-form/registro-form.component';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.scss']
})
export class RegistrosComponent implements OnInit {
  displayedColumns: string[] = ['fecha', 'paciente', 'diagnosis', 'tratamiento', 'acciones'];
  dataSource: MatTableDataSource<RegistroMedico> = new MatTableDataSource<RegistroMedico>([]);
  loading = false;
  pacientes: Paciente[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private registroService: RegistroService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadRegistros();
    this.loadPacientes();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadRegistros(): void {
    this.loading = true;
    this.registroService.getRegistros().subscribe({
      next: (registros) => {
        this.dataSource.data = registros;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open('Error al cargar registros médicos', 'Cerrar', { duration: 3000 });
      }
    });
  }

  loadPacientes(): void {
    this.registroService.getPacientes().subscribe({
      next: (pacientes) => {
        this.pacientes = pacientes;
      },
      error: (error) => {
        console.error('Error al cargar pacientes:', error);
      }
    });
  }

  openRegistroForm(registro?: RegistroMedico): void {
    const dialogRef = this.dialog.open(RegistroFormComponent, {
      width: '700px',
      data: registro || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadRegistros();
      }
    });
  }

  editRegistro(registro: RegistroMedico): void {
    this.openRegistroForm(registro);
  }

  deleteRegistro(registro: RegistroMedico): void {
    if (confirm(`¿Está seguro de eliminar el registro médico del ${registro.fecha}?`)) {
      this.registroService.deleteRegistro(registro.id_registro!).subscribe({
        next: () => {
          this.snackBar.open('Registro médico eliminado exitosamente', 'Cerrar', { duration: 3000 });
          this.loadRegistros();
        },
        error: (error) => {
          this.snackBar.open('Error al eliminar registro médico', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  getPacienteName(idPaciente: number): string {
    const paciente = this.pacientes.find(p => p.id_paciente === idPaciente);
    return paciente ? `${paciente.nombres} ${paciente.apellidos}` : `ID: ${idPaciente}`;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
} 