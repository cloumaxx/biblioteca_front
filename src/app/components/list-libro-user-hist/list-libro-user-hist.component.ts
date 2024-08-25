import { Component, OnInit } from '@angular/core';
import { PrestamosService } from '../../services/prestamoServices/prestamos.service';
import { LoginService } from '../../services/loginServices/login.service';
import { Prestamo } from '../../models/Prestamo';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PaginatePipe } from '../../pipes/paginate.pipe';
import { NavbarComponent } from '../navbar/navbar.component';
import { Libro } from '../../models/libro';
import { DetalleLibroComponent } from '../detalle-libro/detalle-libro.component';
import { MatDialog } from '@angular/material/dialog';
import { LibrosService } from '../../services/librosServices/libros.service';

@Component({
  selector: 'app-list-libro-user-hist',
  standalone: true,
  imports: [CommonModule,MatPaginatorModule,MatFormFieldModule,PaginatePipe,NavbarComponent],
  templateUrl: './list-libro-user-hist.component.html',
  styleUrl: './list-libro-user-hist.component.css'
})
export class ListLibroUserHistComponent implements OnInit {
  user : any;
  prestamos: Prestamo[] = [];
  id_user: number = 0;
  totalPages: number = 0;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  regresar: boolean = false;
  totalItems: number = 0;
  constructor(
    private prestamosService: PrestamosService,
    private loginService: LoginService,
    private dialog: MatDialog,
    private libroService: LibrosService
  ) { }
  
  ngOnInit(): void {
    
    this.loginService.getUser().subscribe(user => {
      this.user = user;
      console.log(this.user.id);
      this.id_user = this.user.id;
      
    });
    this.loadHistorial();
  }
  /**
   * Obtiene el historial de prestamos del usuario
   */
  loadHistorial(): void {
    this.prestamosService.getHistorial(this.id_user).subscribe(
      res => {
        this.prestamos = res;
        this.totalItems = this.prestamos.length;
      },
      err => console.log(err)
    );
  }
  /**
   * Calcula el total de páginas
   */
  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.prestamos.length / this.itemsPerPage);
  }
  /**
   * Cambia a la siguiente página
   */
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
  /**
   * Cambia a la página anterior
    */
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  } 
  /**
   * 
   * @param libro 
   * Abre el dialogo de detalle del libro
   */
  openDetailDialog(libro: Libro): void {
    const dialogRef = this.dialog.open(DetalleLibroComponent, {
        data: libro,
        width: '60rem' 
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.loadHistorial(); 
        }
    });
  }
  /**
   * 
   * @param fechaDevolucion 
   * @returns 
   * Obtiene el estado del libro
   */
  getEstado(fechaDevolucion: string | null): string {

    return fechaDevolucion ? 'Entregado' : 'En posesión';
  }
  /**
   * 
   * @param libro 
   * @returns
   * Regresa un libro prestado
   */
  regresarLibro(libro:Libro): void {
    this.libroService.regresarLibro(libro, this.user.id).subscribe(
      (data) => {
        this.loadHistorial();
        
      },
      (error) => {
        console.error('Error al prestar el libro:', error);
      }
    );
  
  }
}
