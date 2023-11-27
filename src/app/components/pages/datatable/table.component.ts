// table.component.ts
import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataSharingService } from '../../../services/data-sharing.service';
import { take } from 'rxjs';
import { DialogService } from '../../../services/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogTemplateComponent } from '../../commons/dialog-template/dialog-template.component';
import { UsersService } from '../../../services/users.service';
import { ProgramsService } from '../../../services/programs.service';
import { ComputersService } from '../../../services/computers.service';
import { StudentsService } from '../../../services/students.service';
import { ReactiveFormComponent } from '../../reactive-form/reactive-form.component';
import { ViewChild } from '@angular/core';

export enum Operacion {
  Crear = 'crear',
  Editar = 'editar',
  Eliminar = 'eliminar',
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})

export class TableComponent implements OnInit {
  tableData: any[] = [];
  columnHeaders: string[] = [];
  @Input() tableName: string | null = null;
  data: any = null;
  id: number = 0;
  formConfig: any[] = [];

  private matDialogRef!: MatDialogRef<DialogTemplateComponent>
  operacionActual: Operacion = Operacion.Crear;
  operacionCapitalizada: string = '';

  @ViewChild(ReactiveFormComponent) reactiveFormComponent!: ReactiveFormComponent;

  constructor(
    private route: ActivatedRoute,
    private dataSharingService: DataSharingService,
    private dialogService: DialogService,
    private usersService: UsersService,
    private programsService: ProgramsService,
    private computersService: ComputersService,
    private studentsService: StudentsService,
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

    this.formConfig = this.getFormConfig();


  }

  openDialogTemplate(template: TemplateRef<any>, data: any = null) {
    this.data = data;
    this.id = data?.id;

    this.operacionActual = data ? Operacion.Editar : Operacion.Crear;
    this.operacionCapitalizada = this.operacionActual.charAt(0).toUpperCase() + this.operacionActual.slice(1);

    this.matDialogRef = this.dialogService.openDialogTemplate({
      template,
    })
    this.matDialogRef
      .afterClosed()
      .subscribe(res => {
        console.log('dialog close', res)
        this.reactiveFormComponent.resetForm();
        this.operacionActual = Operacion.Crear;
      })

    if (this.operacionActual === Operacion.Editar) {
      this.reactiveFormComponent?.fillForm();
    }
  }

  onSave(formValue: any) {
    this.enviarDatosAlServicio(this.operacionActual, formValue);
    this.matDialogRef.close();
  }

  private enviarDatosAlServicio(operacion: string, datos: any) {
    // enviar datos al servicio según la operación y la tabla
    switch (this.tableName) {
      case 'Usuarios':
        if (operacion === Operacion.Crear) {
          this.usersService.agregarUser(datos).subscribe(
            (response) => {
              console.log('Datos creados exitosamente:', response);
            },
            (error) => {
              console.error('Error al enviar datos:', error);
            }
          );
        } else if (operacion === Operacion.Editar) {
          this.usersService.actualizarUser(this.id, datos).subscribe(
            (response) => {
              console.log('Datos actualizados exitosamente:', response);
            },
            (error) => {
              console.error('Error al enviar datos:', error);
            }
          )
        }
        break;
      case 'Estudiantes':
        if (operacion === Operacion.Crear) {
          this.studentsService.agregarStudent(datos).subscribe(
            (response) => {
              console.log('Datos creados exitosamente:', response);
            },
            (error) => {
              console.error('Error al enviar datos:', error);
            }
          );
        } else if (operacion === Operacion.Editar) {
          this.studentsService.actualizarStudent(this.id, datos).subscribe(
            (response) => {
              console.log('Datos actualizados exitosamente:', response);
            },
            (error) => {
              console.error('Error al enviar datos:', error);
            }
          )
        }
        break;
      case 'Computadoras':
        if (operacion === Operacion.Crear) {
          this.computersService.agregarComputadora(datos).subscribe(
            (response) => {
              console.log('Datos creados exitosamente:', response);
            },
            (error) => {
              console.error('Error al enviar datos:', error);
            }
          );
        } else if (operacion === Operacion.Editar) {
          this.computersService.actualizarComputadora(this.id, datos).subscribe(
            (response) => {
              console.log('Datos actualizados exitosamente:', response);
            },
            (error) => {
              console.error('Error al enviar datos:', error);
            }
          )
        }
        break;
      case 'Programas':
        if (operacion === Operacion.Crear) {
          this.programsService.agregarProgram(datos).subscribe(
            (response) => {
              console.log('Datos creados exitosamente:', response);
            },
            (error) => {
              console.error('Error al enviar datos:', error);
            }
          );
        } else if (operacion === Operacion.Editar) {
          this.programsService.actualizarProgram(this.id, datos).subscribe(
            (response) => {
              console.log('Datos actualizados exitosamente:', response);
            },
            (error) => {
              console.error('Error al enviar datos:', error);
            }
          )
        }
        break;
    }
  }

  private getFormConfig(): any[] {
    switch (this.tableName) {
      case 'Usuarios':
        return [
          { name: 'email', label: 'Correo Electrónico', type: 'email' },
          { name: 'fullname', label: 'Nombre Completo', type: 'text' },
          { name: 'password', label: 'Contraseña', type: 'password' },
          // { name: 'rol', label: 'Rol', type:'number' },
        ];
      case 'Computadoras':
        return [
          { name: 'name', label: 'Nombre', type: 'text' },
          { name: 'brand', label: 'Marca', type: 'text' },
          { name: 'model', label: 'Modelo', type: 'text' },
          { name: 'serie', label: 'Número de Serie', type: 'text' },
          { name: 'details', label: 'Detalles', type: 'text' },
        ];
      case 'Programas':
        return [
          { name: 'name', label: 'Nombre', type: 'text' },
          { name: 'version', label: 'Versión', type: 'text' },
          { name: 'observations', label: 'Observaciones', type: 'text' },
        ];
      case 'Estudiantes':
        return [
          { name: 'dni', label: 'DNI', type: 'text' },
          { name: 'fullname', label: 'Nombre completo', type: 'text' },
        ];
      default:
        return ['no existe el campo'];
    }
  }

  borrarItem(item: any) {
    const idToDelete = item?.id;
    // Lógica para borrar el elemento
    if (idToDelete === undefined) {
      console.error('No se puede continuar con la operación.');
      return;
    }
    const confirmacion = window.confirm('¿Estás seguro de que deseas borrar este elemento?');

    if (confirmacion) {
      this.enviarDatosAlServicio(Operacion.Eliminar, idToDelete);
    }
  }


}
