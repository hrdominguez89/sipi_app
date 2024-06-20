import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarRequestsService {

  private apiUrl = 'http://34.227.164.19/api/requests';

  constructor(private http: HttpClient) { }

  // Obtener todas las solicitudes
  obtenerSolicitudesCalendario(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/calendar`);
  }
}