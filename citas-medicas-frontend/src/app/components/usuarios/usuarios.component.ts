import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = ['nombres', 'apellidos', 'email', 'cedula', 'roles', 'acciones'];
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>([]);
  loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private usuarioService: UsuarioService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadUsuarios(): void {
    this.loading = true;
    this.usuarioService.getUsuarios().subscribe({
      next: (usuarios) => {
        this.dataSource.data = usuarios;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.snackBar.open('Error al cargar usuarios', 'Cerrar', { duration: 3000 });
      }
    });
  }

  getRolLabel(rol: string): string {
    switch (rol) {
      case 'admin': return 'Administrador';
      case 'doctor': return 'Doctor';
      case 'paciente': return 'Paciente';
      default: return rol;
    }
  }

  getRolColor(rol: string): string {
    switch (rol) {
      case 'admin': return 'warn';
      case 'doctor': return 'accent';
      case 'paciente': return 'primary';
      default: return 'primary';
    }
  }

  openUsuarioForm(usuario?: Usuario): void {
    const dialogRef = this.dialog.open(UsuarioFormComponent, {
      width: '600px',
      data: usuario || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsuarios();
      }
    });
  }

  editUsuario(usuario: Usuario): void {
    this.openUsuarioForm(usuario);
  }

  deleteUsuario(usuario: Usuario): void {
    if (confirm(`¿Está seguro de eliminar al usuario ${usuario.nombres} ${usuario.apellidos}?`)) {
      this.usuarioService.deleteUsuario(usuario.id_usuario!).subscribe({
        next: () => {
          this.snackBar.open('Usuario eliminado exitosamente', 'Cerrar', { duration: 3000 });
          this.loadUsuarios();
        },
        error: (error) => {
          this.snackBar.open('Error al eliminar usuario', 'Cerrar', { duration: 3000 });
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