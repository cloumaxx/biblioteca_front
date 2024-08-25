export interface Prestamo {
    id: number;
    fecha_prestamo: string; 
    fecha_devolucion?: string; 
    libro: number; 
    usuario: number;
  }