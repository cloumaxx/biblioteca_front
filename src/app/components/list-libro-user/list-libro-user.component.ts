import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Libro } from '../../models/libro';
import { LibrosService } from '../../services/librosServices/libros.service';
import { LoginService } from '../../services/loginServices/login.service';
import { CrearLibroComponent } from '../crear-libro/crear-libro.component';
import { DetalleLibroComponent } from '../detalle-libro/detalle-libro.component';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginatePipe } from '../../pipes/paginate.pipe';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-list-libro-user',
  standalone: true,
  imports: [CommonModule,MatPaginatorModule,MatFormFieldModule,PaginatePipe,NavbarComponent],
  templateUrl: './list-libro-user.component.html',
  styleUrl: './list-libro-user.component.css'
})
export class ListLibroUserComponent {
  libros: Libro[] = [];
  totalItems = 0;
  itemsPerPage = 10;
  currentPage = 1;
  totalPages = 0; 
  admin: boolean = false; 
  userReg: boolean = false;
  user : any;
  idUser: number = 0;

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
    });
  }

  loadLibros(): void {
    this.libroService.getLibrosDisponibles().subscribe(
      (data: Libro[]) => {
        this.libros = data;
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
    console.log('Abriendo modal con libro:', libro);
    const dialogRef = this.dialog.open(DetalleLibroComponent, {
      data: libro,
      width: '90rem' // Ajusta el ancho del modal según sea necesario
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal se cerró');
      this.ngOnInit();  // Vuelve a ejecutar ngOnInit cuando el modal se cierra
    });
  }
  openCreateDialog(): void {
    this.dialog.open(CrearLibroComponent, {
      width: '90rem'
    });
  }
  pedirLibro(libro: Libro): void {
    this.libroService.pedirLibro(libro, this.user.id).subscribe(
      (data) => {
        this.loadLibros();
        
      },
      (error) => {
        console.error('Error al prestar el libro:', error);
      }
    );
  }
}
