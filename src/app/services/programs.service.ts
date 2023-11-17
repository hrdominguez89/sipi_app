// Ejemplo para el servicio de computadoras (computadoras.service.ts)
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {
  private apiUrl = 'http://localhost/api/programs'; // Reemplaza esto con la URL real de tu API

  constructor(private http: HttpClient) { }

  // Obtener todos los programas
  obtenerPrograms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Obtener una program por ID
  obtenerProgramPorId(programId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${programId}`);
  }

  // Agregar un nuevo program
  agregarProgram(program: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, program);
  }

  // Actualizar un program existente por ID
  actualizarProgram(programId: number, program: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${programId}`, program);
  }

  // Eliminar una Program por ID
  eliminarProgram(programId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${programId}`);
  }
}
