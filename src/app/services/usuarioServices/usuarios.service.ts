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

  getUsuarioById(usuario_id:number): Observable<Usuario> {
    
    return this.http.get<Usuario>(`${this.apiUrl}${usuario_id}`+'/');
  }

  
}
