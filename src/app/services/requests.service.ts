import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  private apiUrl = 'http://localhost/api/requests';

  constructor(private http: HttpClient) { }

  // Obtener todas las solicitudes
  obtenerSolicitudes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
  // Agregar una nueva solicitud
  agregarSolicitudProfessor(request: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, request);
  }
  // Revisar una solicitud
  revisarSolicitud(request_id: any, status: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/review/${request_id}`, status);
  }
}

