// data-sharing.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  private tableDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private columnHeadersSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private readonly STORAGE_KEY = 'tableDataAndHeaders';

  constructor() {
    const storedData = localStorage.getItem(this.STORAGE_KEY);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      this.updateTableDataAndHeaders(parsedData);
    }
  }

  getDataAndHeaders(): Observable<{ data: any[], headers: string[] }> {
    return combineLatest([this.tableDataSubject, this.columnHeadersSubject]).pipe(
      map(([data, headers]) => ({ data, headers }))
    );
  }

  updateTableDataAndHeaders(dataAndHeaders: { data: any[], headers: string[] }): void {
    this.tableDataSubject.next(dataAndHeaders.data);
    this.columnHeadersSubject.next(dataAndHeaders.headers);

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(dataAndHeaders));
  }

  getTableData(): Observable<any[]> {
    return this.tableDataSubject.asObservable();
  }

  getColumnHeaders(): Observable<string[]> {
    return this.columnHeadersSubject.asObservable();
  }

}
