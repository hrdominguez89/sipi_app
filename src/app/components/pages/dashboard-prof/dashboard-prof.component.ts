import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { RequestsService } from '../../../services/requests.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ReactiveFormComponent } from '../../reactive-form/reactive-form.component';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogTemplateComponent } from '../../commons/dialog-template/dialog-template.component';
import { DialogService } from 'src/app/services/dialog.service';
import { IOperacion } from 'src/app/models/operacion.model';
import { CustomSnackbarComponent } from '../../commons/custom-snackbar/custom-snackbar.component';

@Component({
  selector: 'app-dashboard-prof',
  templateUrl: './dashboard-prof.component.html',
  styleUrls: ['./dashboard-prof.component.css']
})
export class DashboardProfComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>();
  selectOptions: any[] = [
    { label: 'Visual Studio Code', value: 'visual code' },
    { label: 'Visio', value: 'Visio' },
    { label: 'Sql', value: 'Sql' },
    { label: 'Node', value: 'node' },
    { label: 'Git', value: 'git' },
  ]
  formConfig: any[] = [];
  operacionCapitalizada: IOperacion = IOperacion.Crear
  @Input() tableName: string = 'Solicitudes'

  private matDialogRef!: MatDialogRef<DialogTemplateComponent>;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(ReactiveFormComponent) reactiveFormComponent!: ReactiveFormComponent;
  @ViewChild(CustomSnackbarComponent) snackbarComponent!: CustomSnackbarComponent;

  constructor(private requestsService: RequestsService, private dialogService: DialogService,) { }

  ngOnInit() {
    this.requestsService.obtenerSolicitudes().subscribe(
      (data) => {
        this.dataSource.data = data;
        this.displayedColumns = data.length > 0 ? Object.keys(data[0]) : [];
      },
      (error) => {
        console.error(error);
      }
    );
    this.formConfig = this.getFormConfig();
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

  openDialogTemplate(template: TemplateRef<any>) {

    this.matDialogRef = this.dialogService.openDialogTemplate({
      template,
    })
    this.matDialogRef
      .afterClosed()
      .subscribe(res => {
        this.reactiveFormComponent.resetForm();
      })

  }

  onSave(formValue: any) {
    this.crearSolicitud(formValue);
    this.matDialogRef.close();
  }

  private crearSolicitud(datos: any) {
    this.requestsService.agregarSolicitudProfessor(datos).subscribe(
      (response) => {
        console.log('Datos creados exitosamente:', response);
        this.snackbarComponent.message = `Creación exitosa`
        this.snackbarComponent.show();
        this.requestsService.obtenerSolicitudes().subscribe(
          (data) => {
            this.dataSource.data = data;
            this.displayedColumns = data.length > 0 ? Object.keys(data[0]) : [];
          })
      },
      (error) => {
        console.error('Error al enviar datos:', error);
        this.snackbarComponent.message = `Creación Fallida ${error.error.message}`
        this.snackbarComponent.show();
      }
    );
  }

  private getFormConfig(): any[] {
    let baseConfig: any[] = [];
    baseConfig = [
      {
        name: "requestedPrograms",
        label: "Programas necesarios",
        type: 'select',
        options: this.selectOptions,
      },
      { name: "requestedDate", label: 'Fecha', type: 'date' },
      { name: "requestedAmount", label: 'Cantidad solicitada', type: 'text' },
      { name: "observations", label: 'Observaciones', type: 'text' },
    ];
    return baseConfig;
  }

}
