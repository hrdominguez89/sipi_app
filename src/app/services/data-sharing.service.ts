// data-sharing.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  // BehaviorSubjects para almacenar datos y encabezados de la tabla
  private tableDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private columnHeadersSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  
  // Clave de localStorage para persistir datos
  private readonly STORAGE_KEY = 'tableDataAndHeaders';

  constructor() {
    // Recupera cualquier dato almacenado en el localStorage durante la inicialización del servicio
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    if (storedData) {
      // Si hay datos almacenados, se parsean y se actualizan los BehaviorSubjects
      const parsedData = JSON.parse(storedData);
      this.updateTableDataAndHeaders(parsedData);
    }
  }
  // Obtiene un Observable que emite tanto datos como encabezados
  getDataAndHeaders(): Observable<{ data: any[], headers: string[] }> {
    return combineLatest([this.tableDataSubject, this.columnHeadersSubject]).pipe(
      map(([data, headers]) => ({ data, headers }))
    );
  }
  // Actualiza tanto los datos como los encabezados y los almacena en el localStorage
  updateTableDataAndHeaders(dataAndHeaders: { data: any[], headers: string[] }): void {
    this.tableDataSubject.next(dataAndHeaders.data);
    this.columnHeadersSubject.next(dataAndHeaders.headers);

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(dataAndHeaders));
    
  }
  // Obtiene un Observable que emite los datos de la tabla
  getTableData(): Observable<any[]> {
    return this.tableDataSubject.asObservable();
  }
  // Obtiene un Observable que emite los encabezados de la tabla
  getColumnHeaders(): Observable<string[]> {
    return this.columnHeadersSubject.asObservable();
  }

}
