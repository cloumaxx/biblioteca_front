import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Url Desarollo
  //private baseUrl: string = 'http://127.0.0.1:8000/api/';

  private baseUrl: string = 'https://biblioteca-project-app-135ad2c05795.herokuapp.com/api/';

  /**
   * 
   * @returns string
   * Obtiene la url base de la API
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }
}
