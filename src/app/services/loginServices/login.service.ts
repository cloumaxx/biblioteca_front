import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AuthResponse } from '../../models/Auth';
import { ApiService } from '../ApiService/api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router, private apiService: ApiService) {}
  private apiUrl = `${this.apiService.getBaseUrl()}login/`;  

  /**
  * La función de login envía las credenciales del usuario al servidor, establece la sesión basándose en la respuesta,
  * y redirige al usuario a diferentes páginas basadas en su rol.
  * @param credentials - La función `login` que has proporcionado recibe un objeto `credentials` con las propiedades
  * con las propiedades `username` y `password`. A continuación, hace una solicitud POST a un punto final de la API con estos
  * credenciales y espera un objeto `AuthResponse` a cambio.
  * @returns La función `login` devuelve un Observable de tipo `AuthResponse`.
  */
  login(credentials: { username: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl, credentials).pipe(
      tap(response => {
        this.setSession(response);
  
        // Redirigir basado en el rol del usuario
        const userRol = response.user.rol; 
        console.log('Rol del usuario:', userRol);
        if (userRol === 'administrador') {
          this.router.navigate(['/listado-libros']);
        } else if (userRol === 'usuario regular') {
          console.log('Redirigiendo a /listado-libros-user');

          this.router.navigate(['/listado-libros-user']);
        }
      })
    );
  }
  
  /**
   * La función `setSession` almacena los datos de autenticación en el localStorage del navegador.
   * @param {AuthResponse} response - El parámetro `response` de la función `setSession` es del tipo
   * `AuthResponse`, que contiene las siguientes propiedades:
   */
  setSession(response: AuthResponse): void {
    localStorage.setItem('access', response.access);
    localStorage.setItem('refresh', response.refresh);
    if (response.user) {
      localStorage.setItem('user', JSON.stringify(response.user));
    }
  }

  getUser(): Observable<AuthResponse> {
    // Carga el usuario del localStorage si no está en el subject
    if (!this.userSubject.value) {
      const user = localStorage.getItem('user');
      if (user) {
        this.userSubject.next(JSON.parse(user));
      }
    }
    return this.userSubject.asObservable();
  }

  /**
   * La función `logout` elimina los tokens de acceso del usuario y la información del almacenamiento local, actualiza el
   * usuario a null, y navega a la página de inicio de sesión.
   */
  logout(): void {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']); // Redirigir al login después del logout
  }

  // Método para obtener el token de acceso
  getAccessToken() {
    return localStorage.getItem('access_token');
  }
  
  
}
