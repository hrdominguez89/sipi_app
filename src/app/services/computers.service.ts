import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComputersService {
  private apiUrl = 'http://34.227.164.19/api/computers';

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
    return this.http.delete<any>(`${this.apiUrl}/delete/${computerId}`);
  }

  computadorasDisponibles(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/available`);
  }

  computadorasNoDisponibles(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/notavailable`)
  }

  solicitudComputadora(request: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/requests`, request);
  }

  retornarComputadora(returnId: any): Observable<any> {
    console.log(returnId)
    return this.http.patch<any>(`${this.apiUrl}/return`, returnId);
  }

}
