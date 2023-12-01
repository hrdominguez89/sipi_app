import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private apiUrl = 'http://localhost/api/students'; 

  constructor(private http: HttpClient) { }

  // Obtener todos los estudiantes
  obtenerStudents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Obtener un estudiante por ID
  obtenerStudentPorId(computerId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${computerId}`);
  }

  // Agregar un nueva student
  agregarStudent(student: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, student);
  }

  // Actualizar un student existente por ID
  actualizarStudent(studentId: number, student: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${studentId}`, student);
  }

  // Eliminar un student por ID
  eliminarStudent(studentId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${studentId}`);
  }
}
