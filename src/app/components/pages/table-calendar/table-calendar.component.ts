import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ComputersService } from 'src/app/services/computers.service';
import { CustomSnackbarComponent } from '../../commons/custom-snackbar/custom-snackbar.component';

@Component({
  selector: 'app-table-calendar',
  templateUrl: './table-calendar.component.html',
  styleUrls: ['./table-calendar.component.css']
})
export class TableCalendarComponent implements OnInit {

  @Input() eventoId: string | null = null;

  dataSource = new MatTableDataSource<any>();
  columnHeaders: string[] = [];


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(CustomSnackbarComponent) snackbarComponent!: CustomSnackbarComponent;

  constructor(private route: ActivatedRoute, private computersService: ComputersService) { }

  ngOnInit(): void {

    this.eventoId = this.route.snapshot.paramMap.get('eventoId')

    this.requestService()
  }

  private requestService() {
    this.computersService.computadorasDisponibles()
      .subscribe((data) => {
        this.dataSource.data = data;
        this.columnHeaders = data.length > 0 ? Object.keys(data[0]) : [];
      },
        (error) => {
          console.error(error);
        }
      );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  solicitudComputadora(item: any) {

    const request = {
      computer_id: item?.id.toString(),
      request_id: this.eventoId?.toString()
    }
    console.log(item)

    this.computersService.solicitudComputadora(request).subscribe(
      (response) => {
        console.log('Datos creados exitosamente:', response);
        this.snackbarComponent.message = `Solicitud aprobada`
        this.snackbarComponent.show();
        this.requestService()
      },
      (error) => {
        console.error('Error al enviar datos:', error);
        this.snackbarComponent.message = `Solicitud fallida ${error.error.message}`
        this.snackbarComponent.show();
      }
    );
  }
}
