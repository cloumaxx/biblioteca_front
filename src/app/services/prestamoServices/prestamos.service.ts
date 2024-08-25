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

  /**
   * La función `getHistorial` recupera el historial de préstamos de un usuario haciendo una petición HTTP GET a un
   * punto final específico de la API.
   * @param {number} usuario_id - El parámetro `usuario_id` es el identificador único del usuario para el que se desea obtener el historial de préstamos.
   * para el que se desea recuperar el historial de préstamos. Este identificador se utiliza para hacer una solicitud a la API
   * que devuelve una lista de préstamos asociados al usuario especificado.
   * @returns Se devuelve un Observable de tipo Prestamo array.
   */
  getHistorial(usuario_id:number): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(this.apiUrl+'prestamos_por_usuario/?usuario_id='+usuario_id);
  }
}
