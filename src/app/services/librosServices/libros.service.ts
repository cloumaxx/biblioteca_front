import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Libro } from '../../models/libro';
import { Observable } from 'rxjs';
import { ApiService } from '../ApiService/api.service';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  
  constructor(private http: HttpClient, private apiService: ApiService) {}

  private apiUrl = `${this.apiService.getBaseUrl()}libros/`; 
  /**
   * @returns Observable<Libro[]>
   * Obtiene todos los libros de la base de datos
   */
  getLibrosDisponibles(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl+'libros_disponibles/');
  }
  /**
   * 
   * @param libro 
   * @returns 
   * Actualiza un libro en la base de datos
   */
  updateLibro(libro: Libro): Observable<Libro> {
    return this.http.put<Libro>(`${this.apiUrl}${libro.id}/`, libro);
  }
  /**
   * 
   * @param libro 
   * @returns 
   * Crea un libro en la base
    */
  createLibro(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, libro);
  }
  /**
   * 
   * @param libro 
   * @param usuarioId 
   * @returns 
   * Pide un libro prestado
   */
  pedirLibro(libro: Libro,usuarioId: number): Observable<Libro> {
    const body = { usuario_id: usuarioId };
    return this.http.patch<Libro>(`${this.apiUrl}${libro.id}/prestar_libro/`, body);
  }
  /**
   * 
   * @param libro 
   * @param usuarioId 
   * @returns 
   * Regresa un libro prestado
   */
  regresarLibro(libro: Libro,usuarioId: number): Observable<Libro> {
    const body = { usuario_id: usuarioId };
    return this.http.patch<Libro>(`${this.apiUrl}${libro.id}/devolver_libro/`, body);
  }
  /**
   * 
   * @param libro 
   * @returns 
   * Elimina un libro de la base de datos
   */
  deleteLibro(libro: Libro): Observable<Libro> {
    return this.http.delete<Libro>(`${this.apiUrl}${libro.id}/`);
  }
}
