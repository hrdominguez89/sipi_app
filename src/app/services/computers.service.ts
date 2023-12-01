// Ejemplo para el servicio de computadoras (computadoras.service.ts)
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComputersService {
  private apiUrl = 'http://localhost/api/computers'; // Reemplaza esto con la URL real de tu API

  constructor(private http: HttpClient) { }

  // Obtener todas las computadoras
  obtenerComputadoras(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Obtener una computadora por ID
  obtenerComputadoraPorId(computerId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${computerId}`);
  }

  // Agregar una nueva computadora
  agregarComputadora(computadora: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, computadora);
  }

  // Actualizar una computadora existente por ID
  actualizarComputadora(computerId: number, computadora: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${computerId}`, computadora);
  }

  // Eliminar una computadora por ID
  eliminarComputadora(computerId: number): Observable<any> {
    console.log(computerId)
    return this.http.delete<any>(`${this.apiUrl}/delete/${computerId}`);
  }
}
