import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibrosService } from '../../services/librosServices/libros.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Libro } from '../../models/libro';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-libro',
  standalone: true,
  imports: [MatFormField,MatDialogModule, MatLabel, MatError,ReactiveFormsModule,CommonModule],
  templateUrl: './crear-libro.component.html',
  styleUrl: './crear-libro.component.css'
})
export class CrearLibroComponent {
  libroForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CrearLibroComponent>,
    private fb: FormBuilder,
    private libroService: LibrosService
  ) {
    this.libroForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      anno_publicacion: ['', [Validators.required, Validators.min(0)]],
      cantidad_stock: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSave(): void {
    if (this.libroForm.valid) {
      const nuevoLibro: Libro = this.libroForm.value;

      this.libroService.createLibro(nuevoLibro).subscribe({
        next: (response) => {
          console.log('Libro creado:', response);
          this.dialogRef.close(response);
        },
        error: (err) => {
          console.error('Error al crear el libro:', err);
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
