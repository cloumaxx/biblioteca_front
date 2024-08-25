import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../../models/libro';
import { Prestamo } from '../../models/Prestamo';
import { ApiService } from '../ApiService/api.service';

@Injectable({
  providedIn: 'root'
})
export class PrestamosService {

  constructor(private http: HttpClient, private apiService: ApiService) {}
  private apiUrl = `${this.apiService.getBaseUrl()}prestamos/`; 

  getHistorial(usuario_id:number): Observable<Prestamo[]> {
    
    return this.http.get<Prestamo[]>(this.apiUrl+'prestamos_por_usuario/?usuario_id='+usuario_id);
  }
}
