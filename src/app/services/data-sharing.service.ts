// data-sharing.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataSharingService {
    private tableDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
    private columnHeadersSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

    constructor() { }

    getDataAndHeaders(): Observable<{ data: any[], headers: string[] }> {
        return combineLatest([this.tableDataSubject, this.columnHeadersSubject]).pipe(
            map(([data, headers]) => ({ data, headers }))
        );
    }

    updateTableDataAndHeaders(dataAndHeaders: { data: any[], headers: string[] }): void {
        this.tableDataSubject.next(dataAndHeaders.data);
        this.columnHeadersSubject.next(dataAndHeaders.headers);
      }
    
      getTableData(): Observable<any[]> {
        return this.tableDataSubject.asObservable();
      }
    
      getColumnHeaders(): Observable<string[]> {
        return this.columnHeadersSubject.asObservable();
      }
 
}
