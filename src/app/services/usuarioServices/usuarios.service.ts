import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, Usuario } from '../../models/usuario';
import { ApiService } from '../ApiService/api.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {


  constructor(private http: HttpClient, private apiService: ApiService) {}
  private apiUrl = `${this.apiService.getBaseUrl()}usuarios/`;  

  /**
   * Esta función recupera un usuario por su ID usando una petición HTTP GET.
   * @param {number} usuario_id - El parámetro `usuario_id` es el identificador único del usuario cuya
   * información desea recuperar.
   * @returns Se devuelve un Observable de tipo Usuario.
   */
  getUsuarioById(usuario_id:number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}${usuario_id}`+'/');
  }

  
}
