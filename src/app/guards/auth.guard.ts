import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { LoginService } from '../services/loginServices/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }
  /**
   * 
   * @param route 
   * @returns 
   * Verifica si el usuario tiene permisos para acceder a la ruta
   */
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('access');
    if (token) {
      const user = JSON.parse(localStorage.getItem('user')!);
      const expectedRole = route.data['expectedRol']; // Esperando que se pase el rol esperado como data en la ruta

      if (user.role === expectedRole) {
        return true; // Permitir acceso si el rol coincide
      } else {
        // Redirigir a una página de acceso denegado o al login
        this.router.navigate(['/access-denied']);
        return false;
      }
    } else {
      this.router.navigate(['/login']); // Redirigir al login si no hay token
      return false;
    }
  }
}