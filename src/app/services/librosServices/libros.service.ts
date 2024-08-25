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
  
  getLibrosDisponibles(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl+'libros_disponibles/');
  }
  updateLibro(libro: Libro): Observable<Libro> {
    return this.http.put<Libro>(`${this.apiUrl}${libro.id}/`, libro);
  }
  createLibro(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, libro);
  }
  pedirLibro(libro: Libro,usuarioId: number): Observable<Libro> {
    const body = { usuario_id: usuarioId };
    return this.http.patch<Libro>(`${this.apiUrl}${libro.id}/prestar_libro/`, body);
  }
  regresarLibro(libro: Libro,usuarioId: number): Observable<Libro> {
    const body = { usuario_id: usuarioId };
    return this.http.patch<Libro>(`${this.apiUrl}${libro.id}/devolver_libro/`, body);
  }
  deleteLibro(libro: Libro): Observable<Libro> {
    return this.http.delete<Libro>(`${this.apiUrl}${libro.id}/`);
  }
}
