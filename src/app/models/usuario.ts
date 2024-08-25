import { Libro } from "./libro";

export interface User {
    id: number;
    nombre: string;
    email: string;
    rol: string; 
    lista_libros: Libro[]; 
  }

export interface Usuario {
  id: number;
  user: {
    username: string;
    email: string;
  };
  nombre: string;
  email: string;
  lista_libros: Libro[];
}