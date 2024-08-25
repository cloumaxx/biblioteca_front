import { Component, OnInit } from '@angular/core';
import { Libro } from '../../models/libro';
import { LibrosService } from '../../services/librosServices/libros.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Asegúrate de tener esto también
import { PaginatePipe } from '../../pipes/paginate.pipe';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DetalleLibroComponent } from '../detalle-libro/detalle-libro.component';
import { CrearLibroComponent } from '../crear-libro/crear-libro.component';
import { LoginService } from '../../services/loginServices/login.service';
import {  MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-list-libros',
  standalone: true,
  imports: [CommonModule,MatPaginatorModule,MatFormFieldModule, PaginatePipe,MatDialogModule],
  templateUrl: './list-libros-admin.component.html',
  styleUrl: './list-libros-admin.component.css'
})
export class ListLibrosAdminComponent  implements OnInit {
  libros: Libro[] = [];
  totalItems = 0;
  itemsPerPage = 10;
  currentPage = 1;
  totalPages = 0; 
  admin: boolean = false; 
  userReg: boolean = false;
  user : any;
  
  constructor(
    private loginService: LoginService,
    private libroService: LibrosService,
    private dialog: MatDialog) { }
  ngOnInit(): void {
    this.loadLibros();
    this.loginService.getUser().subscribe(user => {
      this.user = user;
      if(this.user.rol == 'administrador'){
        this.admin = true;
      }
      if(this.user.rol == 'usuario regular'){
        this.userReg = true;
      }
      console.log('User info:', this.user);
    });
  }
  /**
   * Obtiene los libros disponibles
   */
  loadLibros(): void {
    this.libroService.getLibrosDisponibles().subscribe(
      (data: Libro[]) => {
        this.libros = data;
        this.totalItems = data.length;
        this.calculateTotalPages();
      },
      (error) => {
        console.error('Error al obtener los libros:', error);
      }
    );
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.libros.length / this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  openDetailDialog(libro: Libro): void {
    const dialogRef = this.dialog.open(DetalleLibroComponent, {
        data: libro,
        width: '60rem' 
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.loadLibros(); 
        }
    });
  
  }
  openCreateDialog(): void {
    const dialogRef =this.dialog.open(CrearLibroComponent, {
      width: '60rem'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.loadLibros(); 
      }
  });
  }
  /**
   * 
   * @param libro 
   * Elimina un libro
   * 
   */
  deleteLibro(libro: Libro): void {
    console.log('Eliminando libro:', libro);
    this.libroService.deleteLibro(libro).subscribe(
      (data) => {
        console.log('Libro eliminado:', data);
        this.loadLibros();
      },
      (error) => {
        console.error('Error al eliminar el libro:', error);
      }
    );
  }
}
