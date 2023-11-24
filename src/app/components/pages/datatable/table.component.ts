// table.component.ts
import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataSharingService } from '../../../services/data-sharing.service';
import { take } from 'rxjs';
import { DialogService } from '../../../services/dialog.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogTemplateComponent } from '../../commons/dialog-template/dialog-template.component';
import { UsersService } from '../../../services/users.service';
import { ProgramsService } from '../../../services/programs.service';
import { ComputersService } from '../../../services/computers.service';
import { StudentsService } from '../../../services/students.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  tableData: any[] = [];
  columnHeaders: string[] = [];
  @Input() tableName: string | null = null;

  formGroup: FormGroup = new FormGroup({});
  formGroupConfig: { [key: string]: FormControl } = {};

  private matDialogRef!: MatDialogRef<DialogTemplateComponent>

  constructor(
    private route: ActivatedRoute,
    private dataSharingService: DataSharingService,
    private dialogService: DialogService,
    private usersService: UsersService,
    private programsService: ProgramsService,
    private computersService: ComputersService,
    private studentsService: StudentsService
  ) { }

  ngOnInit(): void {
    // Obtiene el nombre de la tabla de los parámetros de la ruta
    this.tableName = this.route.snapshot.paramMap.get('tableName');

    // Se suscribe al servicio de comunicación para recibir actualizaciones
    this.dataSharingService.getDataAndHeaders()
      .pipe(take(1)) // Se suscribe solo una vez
      .subscribe(data => {
        this.tableData = data.data;
        this.columnHeaders = data.headers;
      });
  }

  openDialogTemplate(template: TemplateRef<any>) {
    this.formGroup = this.createDynamicForm();
    this.matDialogRef = this.dialogService.openDialogTemplate({
      template,
    })
    this.matDialogRef
      .afterClosed()
      .subscribe(res => {
        console.log('dialog close', res)
        this.formGroup.reset()
      })
  }

  onSave() {
    console.log(this.formGroup.value)
    this.enviarDatosAlServicio(this.formGroup.value);
    this.formGroup.reset()
    this.matDialogRef.close()
  }

  private createDynamicForm(): FormGroup {
    this.formGroupConfig = {};
    // Agrega un control por cada columna en la tabla
    this.columnHeaders.forEach((header) => {
      if (header !== 'id'  && header !== 'created_at' && header !== 'rol_id' && header !== 'active') {
        this.formGroupConfig[header] = new FormControl();
      }
    });

    return new FormGroup(this.formGroupConfig);
  }

  private enviarDatosAlServicio(datos: any) {
    // Llama a tu servicio aquí, pasando el nombre de la tabla y los datos
    console.log('Enviando datos al servicio para la tabla', this.tableName, datos);

    // Selecciona el servicio según el nombre de la tabla
    switch (this.tableName) {
      case 'Usuarios':
        this.usersService.agregarUser(datos).subscribe(
          (response) => {
            console.log('Datos enviados exitosamente:', response);
            // Puedes manejar la respuesta como desees
          },
          (error) => {
            console.error('Error al enviar datos:', error);
            // Puedes manejar el error como desees
          }
        );
        break;
      case 'Computadoras':
        this.computersService.agregarComputadora(datos).subscribe(
          (response) => {
            console.log('Datos enviados exitosamente:', response);
            // Puedes manejar la respuesta como desees
          },
          (error) => {
            console.error('Error al enviar datos:', error);
            // Puedes manejar el error como desees
          }
        );
        break;
      case 'Programas':
        this.programsService.agregarProgram(datos).subscribe(
          (response) => {
            console.log('Datos enviados exitosamente:', response);
            // Puedes manejar la respuesta como desees
          },
          (error) => {
            console.error('Error al enviar datos:', error);
            // Puedes manejar el error como desees
          }
        );
        break;
      case 'Estudiantes':
        this.studentsService.agregarStudent(datos).subscribe(
          (response) => {
            console.log('Datos enviados exitosamente:', response);
            // Puedes manejar la respuesta como desees
          },
          (error) => {
            console.error('Error al enviar datos:', error);
            // Puedes manejar el error como desees
          }
        );
        break;
      default:
        console.warn('Tabla no reconocida:', this.tableName);
        break;
    }
  }


}
