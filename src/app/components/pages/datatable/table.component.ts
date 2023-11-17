// table.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataSharingService } from '../../../services/data-sharing.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  tableData: any[] = [];
  columnHeaders: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private dataSharingService: DataSharingService
  ) { }

  ngOnInit(): void {
    // Obtiene el nombre de la tabla de los parámetros de la ruta
    const tableName = this.route.snapshot.paramMap.get('tableName');

    // Se suscribe al servicio de comunicación para recibir actualizaciones
    this.dataSharingService.getDataAndHeaders()
      .pipe(take(1)) // Se suscribe solo una vez
      .subscribe(data => {
        this.tableData = data.data;
        this.columnHeaders = data.headers;
      });
  }
}
