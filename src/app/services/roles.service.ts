// roles.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private rolesUrl = 'http://localhost/api/roles';

  constructor(private httpClient: HttpClient) {}

  getRoles(): Observable<any> {
    const token = localStorage.getItem('token');
    
    // Verificar si el token existe antes de hacer la solicitud
    if (!token) {
      throw new Error('Token not found');
    }

    // Configurar las cabeceras con el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // Realizar la solicitud GET
    return this.httpClient.get(this.rolesUrl, { headers });
  }
}
