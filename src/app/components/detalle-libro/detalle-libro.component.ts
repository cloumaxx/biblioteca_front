import { Component, Inject } from '@angular/core';
import { Libro } from '../../models/libro';
import { MAT_DIALOG_DATA, MatDialogModule,MatDialogRef  } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../services/loginServices/login.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
      titulo: new FormControl({ value: data.titulo, disabled: !this.editando }, Validators.required),
      autor: new FormControl({ value: data.autor, disabled: !this.editando }, Validators.required),
      anno_publicacion: new FormControl({ value: data.anno_publicacion, disabled: !this.editando }, [Validators.required, Validators.min(1500)]),
      cantidad_stock: new FormControl({ value: data.cantidad_stock, disabled: !this.editando }, Validators.required),
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
        this.toggleControls();
      }
    });
  }
   // Método para guardar los cambios
   onSave(): void {
    if (this.libroForm.valid) {
      const updatedLibro: Libro = {
        id: this.data.id,
        ...this.libroForm.value
      };

      this.libroService.updateLibro(updatedLibro).subscribe({
        next: (response) => {          
          this.dialogRef.close(response);
        },
        error: (err) => {
          console.error('Error al actualizar el libro:', err);
        }
      });
    }  
  }
  /**
   * Método para cancelar la edición
   */
  onCancel(): void {
    this.editar = true;
    this.editando = false;
    this.libroForm.reset(this.data); 
    this.toggleControls();
  }
  /**
   * Método para editar el libro
    */
  onEdit(): void {
    this.editar = false;
    this.editando = true;
    this.toggleControls();
  }
  /**
   * Método para habilitar o deshabilitar los controles del formulario
   */
  private toggleControls() {
    if (this.editando) {
      this.libroForm.get('titulo')?.enable();
      this.libroForm.get('autor')?.enable();
      this.libroForm.get('anno_publicacion')?.enable();
      this.libroForm.get('cantidad_stock')?.enable();
    } else {
      this.libroForm.get('titulo')?.disable();
      this.libroForm.get('autor')?.disable();
      this.libroForm.get('anno_publicacion')?.disable();
      this.libroForm.get('cantidad_stock')?.disable();
    }
  }
}
