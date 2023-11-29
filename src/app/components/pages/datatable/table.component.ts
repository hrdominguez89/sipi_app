// table.component.ts
import { Component, OnInit, Input, TemplateRef, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataSharingService } from '../../../services/data-sharing.service';
import { DialogService } from '../../../services/dialog.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DialogTemplateComponent } from '../../commons/dialog-template/dialog-template.component';
import { UsersService } from '../../../services/users.service';
import { ProgramsService } from '../../../services/programs.service';
import { ComputersService } from '../../../services/computers.service';
import { StudentsService } from '../../../services/students.service';
import { ReactiveFormComponent } from '../../reactive-form/reactive-form.component';
import { ViewChild } from '@angular/core';
import { CustomSnackbarComponent } from '../../commons/custom-snackbar/custom-snackbar.component';
import { Subject, takeUntil } from 'rxjs';

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

export class TableComponent implements OnInit, OnDestroy {
  tableData: any[] = [];
  columnHeaders: string[] = [];
  @Input() tableName: string | null = null;
  data: any = null;
  id: number = 0;
  formConfig: any[] = [];
  operacionActual: Operacion = Operacion.Crear;
  operacionCapitalizada: string = '';
  selectOptions: any[] = [
    { label: 'Administrador', value: 1 },
    { label: 'Profesor', value: 2 },
    { label: 'Bedele', value: 3 },
  ]
  shouldRenderTable: boolean = true;
  private matDialogRef!: MatDialogRef<DialogTemplateComponent>;
  private destroy$ = new Subject<void>();

  @ViewChild(ReactiveFormComponent) reactiveFormComponent!: ReactiveFormComponent;
  @ViewChild(CustomSnackbarComponent) snackbarComponent!: CustomSnackbarComponent;

  constructor(
    private route: ActivatedRoute,
    private dataSharingService: DataSharingService,
    private dialogService: DialogService,
    private usersService: UsersService,
    private programsService: ProgramsService,
    private computersService: ComputersService,
    private studentsService: StudentsService,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    // Obtiene el nombre de la tabla de los parámetros de la ruta
    this.tableName = this.route.snapshot.paramMap.get('tableName');

    // Se suscribe al servicio de comunicación para recibir actualizaciones
    this.dataSharingService.getDataAndHeaders()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        this.tableData = data.data;
        this.columnHeaders = data.headers;
      });

    this.formConfig = this.getFormConfig();
    this.cdr.detectChanges();

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
              this.snackbarComponent.message = `Creación exitosa`
              this.snackbarComponent.show();
            },
            (error) => {
              console.error('Error al enviar datos:', error);
              this.snackbarComponent.message = `Creación Fallida ${error.error.message}`
              this.snackbarComponent.show();
            }
          );
        } else if (operacion === Operacion.Editar) {
          this.usersService.actualizarUser(this.id, datos).subscribe(
            (response) => {
              console.log('Datos actualizados exitosamente:', response);
              this.snackbarComponent.message = `Actualización exitosa`
              this.snackbarComponent.show();
            },
            (error) => {
              console.error('Error al enviar datos:', error);
              this.snackbarComponent.message = `Actualización fallida ${error.error.message}`
              this.snackbarComponent.show();
            }
          )
        }
        break;
      case 'Estudiantes':
        if (operacion === Operacion.Crear) {
          this.studentsService.agregarStudent(datos).subscribe(
            (response) => {
              console.log('Datos creados exitosamente:', response);
              this.snackbarComponent.message = `Creación exitosa`
              this.snackbarComponent.show();
            },
            (error) => {
              console.error('Error al enviar datos:', error);
              this.snackbarComponent.message = `Creación Fallida ${error.error.message}`
              this.snackbarComponent.show();
            }
          );
        } else if (operacion === Operacion.Editar) {
          this.studentsService.actualizarStudent(this.id, datos).subscribe(
            (response) => {
              console.log('Datos actualizados exitosamente:', response);
              this.snackbarComponent.message = `Actualización exitosa`
              this.snackbarComponent.show();
            },
            (error) => {
              console.error('Error al enviar datos:', error);
              this.snackbarComponent.message = `Actualización fallida ${error.error.message}`
              this.snackbarComponent.show();
            }
          )
        }
        break;
      case 'Computadoras':
        if (operacion === Operacion.Crear) {
          this.computersService.agregarComputadora(datos).subscribe(
            (response) => {
              console.log('Datos creados exitosamente:', response);
              this.snackbarComponent.message = `Creación exitosa`
              this.snackbarComponent.show();
            },
            (error) => {
              console.error('Error al enviar datos:', error);
              this.snackbarComponent.message = `Creación Fallida ${error.error.message}`
              this.snackbarComponent.show();
            }
          );
        } else if (operacion === Operacion.Editar) {
          this.computersService.actualizarComputadora(this.id, datos).subscribe(
            (response) => {
              console.log('Datos actualizados exitosamente:', response);
              this.snackbarComponent.message = `Actualización exitosa`
              this.snackbarComponent.show();
            },
            (error) => {
              console.error('Error al enviar datos:', error);
              this.snackbarComponent.message = `Actualización fallida ${error.error.message}`
              this.snackbarComponent.show();
            }
          )
        }
        break;
      case 'Programas':
        if (operacion === Operacion.Crear) {
          this.programsService.agregarProgram(datos).subscribe(
            (response) => {
              console.log('Datos creados exitosamente:', response);
              this.snackbarComponent.message = `Creación exitosa`
              this.snackbarComponent.show();
            },
            (error) => {
              console.error('Error al enviar datos:', error);
              this.snackbarComponent.message = `Creación Fallida ${error.error.message}`
              this.snackbarComponent.show();
            }
          );
        } else if (operacion === Operacion.Editar) {
          this.programsService.actualizarProgram(this.id, datos).subscribe(
            (response) => {
              console.log('Datos actualizados exitosamente:', response);
              this.snackbarComponent.message = `Actualización exitosa`
              this.snackbarComponent.show();
            },
            (error) => {
              console.error('Error al enviar datos:', error);
              this.snackbarComponent.message = `Actualización fallida ${error.error.message}`
              this.snackbarComponent.show();
            }
          )
        }
        break;
    }
  }

  private getFormConfig(): any[] {
    let baseConfig: any[] = [];

    switch (this.tableName) {
      case 'Usuarios':
        baseConfig = [
          { name: 'email', label: 'Correo Electrónico', type: 'email' },
          { name: 'fullname', label: 'Nombre Completo', type: 'text' },
          { name: 'password', label: 'Contraseña', type: 'password' },
          {
            name: 'rol',
            label: 'Rol',
            type: 'select',
            options: this.selectOptions,
          },
        ];
        break;
      case 'Computadoras':
        baseConfig = [
          { name: 'name', label: 'Nombre', type: 'text' },
          { name: 'brand', label: 'Marca', type: 'text' },
          { name: 'model', label: 'Modelo', type: 'text' },
          { name: 'serie', label: 'Número de Serie', type: 'text' },
          { name: 'details', label: 'Detalles', type: 'text' },
        ];
        break;
      case 'Programas':
        baseConfig = [
          { name: 'name', label: 'Nombre', type: 'text' },
          { name: 'version', label: 'Versión', type: 'text' },
          { name: 'observations', label: 'Observaciones', type: 'text' },
        ];
        break;
      case 'Estudiantes':
        baseConfig = [
          { name: 'dni', label: 'DNI', type: 'text' },
          { name: 'fullname', label: 'Nombre completo', type: 'text' },
        ];
        break;
      default:
        return ['no existe el campo'];
    }
    return baseConfig;
  }

  borrarItem(item: any) {
    const idToDelete = item?.id;
    // Lógica para borrar el elemento
    if (idToDelete === undefined) {
      this.snackbarComponent.message = `No es posible continuar con la operación`
      this.snackbarComponent.show();
      return;
    }
    const confirmacion = window.confirm('¿Estás seguro de que deseas borrar este elemento?');

    if (confirmacion) {
      this.enviarDatosAlServicio(Operacion.Eliminar, idToDelete);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
