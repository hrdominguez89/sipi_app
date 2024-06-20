import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'https://34.227.164.19/api/users'; 
  constructor(private http: HttpClient) { }

  // Obtener todos los usuarios
  obtenerUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Obtener un usuario por ID
  obtenerUserPorId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${userId}`);
  }

  // Agregar un nuevo usuario
  agregarUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, user);
  }

  // Actualizar un usuario existente por ID
  actualizarUser(userId: number, user: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${userId}`, user);
  }

  // Eliminar un usuario por ID
  eliminarUser(userId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${userId}`);
  }
}
