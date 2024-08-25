import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Libro } from '../../models/libro';
import { LibrosService } from '../../services/librosServices/libros.service';
import { LoginService } from '../../services/loginServices/login.service';
import { CrearLibroComponent } from '../crear-libro/crear-libro.component';
import { DetalleLibroComponent } from '../detalle-libro/detalle-libro.component';
import { CommonModule } from '@angular/common';
import { pipe } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginatePipe } from '../../pipes/paginate.pipe';
import { NavbarComponent } from '../navbar/navbar.component';
import { UsuariosService } from '../../services/usuarioServices/usuarios.service';
import { User } from '../../models/usuario';

@Component({
  selector: 'app-list-libro-user-pos',
  standalone: true,
  imports: [CommonModule,MatPaginatorModule,MatFormFieldModule,PaginatePipe,NavbarComponent],
  templateUrl: './list-libro-user-pos.component.html',
  styleUrl: './list-libro-user-pos.component.css'
})
export class ListLibroUserPosComponent {
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
    private dialog: MatDialog,
    private usuarioService: UsuariosService
  ) { }
  ngOnInit(): void {
    
    this.loginService.getUser().subscribe(user => {
      this.user = user;
      this.idUser = this.user.id;
    });
    this.loadLibros();
  }

  loadLibros(): void {
    this.usuarioService.getUsuarioById(this.idUser).subscribe(
      (data) => {
        this.libros = data.lista_libros;
        console.log("Data: ", data);
        console.log("Libros: ", this.libros);
        // Aquí puedes realizar más operaciones si es necesario
      },
      (error) => {
        console.error('Error al cargar los libros:', error);
      }
    );
  }

  calculateTotalPages(): void {
    this.totalPages = 0 // Math.ceil(this.libros.length / this.itemsPerPage);
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
  regresarLibro(libro:Libro): void {
    this.libroService.regresarLibro(libro, this.user.id).subscribe(
      (data) => {
        this.loadLibros();
        
      },
      (error) => {
        console.error('Error al prestar el libro:', error);
      }
    );
  
  }
}
