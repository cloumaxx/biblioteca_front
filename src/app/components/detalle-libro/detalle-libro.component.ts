import { Component, Inject } from '@angular/core';
import { Libro } from '../../models/libro';
import { MAT_DIALOG_DATA, MatDialogModule,MatDialogRef  } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../services/loginServices/login.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LibrosService } from '../../services/librosServices/libros.service';

@Component({
  selector: 'app-detalle-libro',
  standalone: true,
  imports: [MatDialogModule,MatButtonModule,MatFormFieldModule,MatInputModule,ReactiveFormsModule,CommonModule],
  templateUrl: './detalle-libro.component.html',
  styleUrl: './detalle-libro.component.css'
})
export class DetalleLibroComponent {
  user: any;
  libroForm: FormGroup;
  editar: boolean = false; 
  editando: boolean = false; 
  constructor(
    private loginService: LoginService,
    private libroService: LibrosService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DetalleLibroComponent>, // Inyectar MatDialogRef
    @Inject(MAT_DIALOG_DATA) public data: Libro // Recibir datos del libro
  ) { 
    this.libroForm = this.fb.group({
      titulo: [data.titulo, Validators.required],
      autor: [data.autor, Validators.required],
      anno_publicacion: [data.anno_publicacion, Validators.required],
      cantidad_stock: [data.cantidad_stock, Validators.required]
    });
  }

  onClose(): void {
    this.dialogRef.close(); // Cerrar el modal
  }
  ngOnInit(): void {
    this.loginService.getUser().subscribe(user => {
      this.user = user;
      if(this.user.rol == 'administrador'){
        this.editar = true;
      }
      console.log('User info:', this.user);
    });
  }
   // Método para guardar los cambios
   onSave(): void {
    console.log('Guardando cambios:', this.libroForm.value);
    if (this.libroForm.valid) {
      const updatedLibro: Libro = {
        id: this.data.id,
        ...this.libroForm.value
      };

      this.libroService.updateLibro(updatedLibro).subscribe({
        next: (response) => {
          console.log('Libro actualizado:', response);
          
          this.dialogRef.close(response);
        },
        error: (err) => {
          console.error('Error al actualizar el libro:', err);
        }
      });
    }  }
  onCancel(): void {
    this.editar = true;
    this.editando = false;
    this.libroForm.reset(this.data); 
    
  }

  onEdit(): void {
    this.editar = false;
    this.editando = true;
    console.log('Editar libro:', this.data);
  }
}
