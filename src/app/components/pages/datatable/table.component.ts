import { Component, OnInit, Input, TemplateRef, ChangeDetectorRef, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
import { IOperacion } from 'src/app/models/operacion.model';
import { RequestsService } from 'src/app/services/requests.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})

export class TableComponent implements OnInit {
  columnHeaders: string[] = [];
  @Input() tableName: string | null = null;
  data: any = null;
  id: number = 0;
  formConfig: any[] = [];
  operacionActual: IOperacion = IOperacion.Crear;
  operacionCapitalizada: string = '';
  selectOptions: any[] = [
    { label: 'Administrador', value: 1 },
    { label: 'Profesor', value: 2 },
  ]
  status: boolean = true;

  dataSource = new MatTableDataSource<any>();

  private matDialogRef!: MatDialogRef<DialogTemplateComponent>;

  @ViewChild(ReactiveFormComponent) reactiveFormComponent!: ReactiveFormComponent;
  @ViewChild(CustomSnackbarComponent) snackbarComponent!: CustomSnackbarComponent;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private usersService: UsersService,
    private programsService: ProgramsService,
    private computersService: ComputersService,
    private studentsService: StudentsService,
    private cdr: ChangeDetectorRef,
    private requestService: RequestsService
  ) { }


  ngOnInit(): void {
    // Obtiene el nombre de la tabla de los parámetros de la ruta
    this.tableName = this.route.snapshot.paramMap.get('tableName');
    this.refreshTable()
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

  openDialogTemplate(template: TemplateRef<any>, data: any = null) {
    this.data = data;
    this.id = data?.id;

    this.operacionActual = data ? IOperacion.Editar : IOperacion.Crear;
    this.operacionCapitalizada = this.operacionActual.charAt(0).toUpperCase() + this.operacionActual.slice(1);

    this.matDialogRef = this.dialogService.openDialogTemplate({
      template,
    })
    this.matDialogRef
      .afterClosed()
      .subscribe(res => {
        this.reactiveFormComponent.resetForm();
        this.operacionActual = IOperacion.Crear;
      })

    if (this.operacionActual === IOperacion.Editar) {
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
        if (operacion === IOperacion.Crear) {
          this.usersService.agregarUser(datos).subscribe(
            (response) => {
              console.log('Datos creados exitosamente:', response);
              this.snackbarComponent.message = `Creación exitosa`
              this.snackbarComponent.show();
              this.refreshTable();
            },
            (error) => {
              console.error('Error al enviar datos:', error);
              this.snackbarComponent.message = `Creación Fallida ${error.error.message}`
              this.snackbarComponent.show();
            }
          );
        } else if (operacion === IOperacion.Editar) {
          this.usersService.actualizarUser(this.id, datos).subscribe(
            (response) => {
              console.log('Datos actualizados exitosamente:', response);
              this.snackbarComponent.message = `Actualización exitosa`
              this.snackbarComponent.show();
              this.refreshTable();
            },
            (error) => {
              console.error('Error al enviar datos:', error);
              this.snackbarComponent.message = `Actualización fallida ${error.error.message}`
              this.snackbarComponent.show();
            }
          )
        } else if (operacion === IOperacion.Eliminar) {
          this.usersService.eliminarUser(this.id).subscribe(
            (response) => {
              console.log('Datos eliminados exitosamente:', response);
              this.snackbarComponent.message = `Usuario eliminado`
              this.snackbarComponent.show();
              this.refreshTable();
            },
            (error) => {
              console.error('Error al enviar datos:', error);
              this.snackbarComponent.message = `Eliminación fallida ${error.error.message}`
              this.snackbarComponent.show();
            }
          )
        };
        break;
      case 'Estudiantes':
        if (operacion === IOperacion.Crear) {
          this.studentsService.agregarStudent(datos).subscribe(
            (response) => {
              console.log('Datos creados exitosamente:', response);
              this.snackbarComponent.message = `Creación exitosa`
              this.snackbarComponent.show();
              this.refreshTable();
            },
            (error) => {
              console.error('Error al enviar datos:', error);
              this.snackbarComponent.message = `Creación Fallida ${error.error.message}`
              this.snackbarComponent.show();
            }
          );
        } else if (operacion === IOperacion.Editar) {
          this.studentsService.actualizarStudent(this.id, datos).subscribe(
            (response) => {
              console.log('Datos actualizados exitosamente:', response);
              this.snackbarComponent.message = `Actualización exitosa`
              this.snackbarComponent.show();
              this.refreshTable();

            },
            (error) => {
              console.error('Error al enviar datos:', error);
              this.snackbarComponent.message = `Actualización fallida ${error.error.message}`
              this.snackbarComponent.show();
            }
          )
        } else if (operacion === IOperacion.Eliminar) {
          this.studentsService.eliminarStudent(this.id).subscribe(
            (response) => {
              console.log('Datos eliminados exitosamente', response);
              this.snackbarComponent.message = `Estudiante eliminado`
              this.snackbarComponent.show();
              this.refreshTable();

            },
            (error) => {
              console.error('Error al enviar datos:', error);
              this.snackbarComponent.message = `Eliminación fallida ${error.error.message}`
              this.snackbarComponent.show();
            }
          )
        }
        break;
      case 'Computadoras':
        if (operacion === IOperacion.Crear) {
          this.computersService.agregarComputadora(datos).subscribe(
            (response) => {
              console.log('Datos creados exitosamente:', response);
              this.snackbarComponent.message = `Creación exitosa`
              this.snackbarComponent.show();
              this.refreshTable();

            },
            (error) => {
              console.error('Error al enviar datos:', error);
              this.snackbarComponent.message = `Creación Fallida ${error.error.message}`
              this.snackbarComponent.show();
            }
          );
        } else if (operacion === IOperacion.Editar) {
          this.computersService.actualizarComputadora(this.id, datos).subscribe(
            (response) => {
              console.log('Datos actualizados exitosamente:', response);
              this.snackbarComponent.message = `Actualización exitosa`
              this.snackbarComponent.show();
              this.refreshTable();

            },
            (error) => {
              console.error('Error al enviar datos:', error);
              this.snackbarComponent.message = `Actualización fallida ${error.error.message}`
              this.snackbarComponent.show();
            }
          )
        } else if (operacion === IOperacion.Eliminar) {
          this.computersService.eliminarComputadora(this.id).subscribe(

            (response) => {
              console.log('Datos eliminados exitosamente:', response);
              this.snackbarComponent.message = `Computadora eliminada`
              this.snackbarComponent.show();
              this.refreshTable();

            },
            (error) => {
              console.error('Error al enviar datos:', error);
              this.snackbarComponent.message = `Eliminación fallida ${error.error.message}`
              this.snackbarComponent.show();
            }
          )
        };
        break;
      case 'Programas':
        if (operacion === IOperacion.Crear) {
          this.programsService.agregarProgram(datos).subscribe(
            (response) => {
              console.log('Datos creados exitosamente:', response);
              this.snackbarComponent.message = `Creación exitosa`
              this.snackbarComponent.show();
              this.refreshTable();

            },
            (error) => {
              console.error('Error al enviar datos:', error);
              this.snackbarComponent.message = `Creación Fallida ${error.error.message}`
              this.snackbarComponent.show();
            }
          );
        } else if (operacion === IOperacion.Editar) {
          this.programsService.actualizarProgram(this.id, datos).subscribe(
            (response) => {
              console.log('Datos actualizados exitosamente:', response);
              this.snackbarComponent.message = `Actualización exitosa`
              this.snackbarComponent.show();
              this.refreshTable();

            },
            (error) => {
              console.error('Error al enviar datos:', error);
              this.snackbarComponent.message = `Actualización fallida ${error.error.message}`
              this.snackbarComponent.show();
            }
          )
        } else if (operacion === IOperacion.Eliminar) {
          this.programsService.eliminarProgram(this.id).subscribe(
            (response) => {
              console.log('Datos eliminados exitosamente:', response);
              this.snackbarComponent.message = `Programa eliminado`
              this.snackbarComponent.show();
              this.refreshTable();

            },
            (error) => {
              console.error('Error al enviar datos:', error);
              this.snackbarComponent.message = `Eliminación fallida ${error.error.message}`
              this.snackbarComponent.show();
            }
          )
        };
        break;
    }
  }

  private refreshTable() {

    switch (this.tableName) {
      case 'Usuarios':
        return this.usersService.obtenerUsers().subscribe((dato) => {
          this.dataSource.data = dato;
          this.columnHeaders = Object.keys(dato[0]);
          this.cdr.detectChanges();
        });
      case 'Computadoras':
        return this.computersService.obtenerComputadoras().subscribe((dato) => {
          this.dataSource.data = dato;
          this.columnHeaders = Object.keys(dato[0]);
          this.cdr.detectChanges();
        });
      case 'Estudiantes':
        return this.studentsService.obtenerStudents().subscribe((dato) => {
          this.dataSource.data = dato;
          this.columnHeaders = Object.keys(dato[0]);
          this.cdr.detectChanges();
        });
      case 'Programas':
        return this.programsService.obtenerPrograms().subscribe((dato) => {
          this.dataSource.data = dato;
          this.columnHeaders = Object.keys(dato[0]);
          this.cdr.detectChanges();
        });
      case 'Devoluciones':
        return this.computersService.computadorasNoDisponibles().subscribe((dato) => {
          this.dataSource.data = dato;
          this.columnHeaders = Object.keys(dato[0]);
          this.cdr.detectChanges();
        });
      case 'Solicitudes':
        return this.requestService.obtenerSolicitudes().subscribe((dato) => {
          this.dataSource.data = dato;
          this.columnHeaders = Object.keys(dato[0]);
          this.cdr.detectChanges();
        });
      default:
        return false
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

  openDialogTemplateDelete(template: TemplateRef<any>, item: any = null) {
    this.id = item?.id;
    this.operacionActual = item && IOperacion.Eliminar;

    this.matDialogRef = this.dialogService.openDialogTemplate({
      template,
    })
    this.matDialogRef
      .afterClosed()
      .subscribe(res => {
        this.operacionActual = IOperacion.Eliminar;
      })
  }

  borrarItem() {
    // Lógica para borrar el elemento
    const id = this.id
    if (id === undefined) {
      this.snackbarComponent.message = `No es posible continuar con la operación`
      this.snackbarComponent.show();
      return;
    } else {
      this.enviarDatosAlServicio(this.operacionActual, id);
      this.matDialogRef.close();
    }
  }

  aprobarSolicitud(item: any) {
    const id = item?.id
    const status = { status: true }

    this.requestService.revisarSolicitud(id, status).subscribe(
      (response) => {
        console.log('Datos creados exitosamente:', response);
        this.snackbarComponent.message = `Solicitud aprobada`
        this.snackbarComponent.show();
        this.refreshTable();
      },
      (error) => {
        console.error('Error al enviar datos:', error);
        this.snackbarComponent.message = `Solicitud fallida ${error.error.message}`
        this.snackbarComponent.show();
      }
    );
  }
  rechazarSolicitud(item: any) {
    const id = item?.id
    const status = { status: false }

    this.requestService.revisarSolicitud(id, status).subscribe(
      (response) => {
        console.log('Datos creados exitosamente:', response);
        this.snackbarComponent.message = `Solicitud rechazada`
        this.snackbarComponent.show();
        this.refreshTable()
      },
      (error) => {
        console.error('Error al enviar datos:', error);
        this.snackbarComponent.message = `Solicitud Fallida ${error.error.message}`
        this.snackbarComponent.show();
      }
    );
  }

  devolverComputadora(item: any) {
    console.log(item)
    const returnId = { id: item?.id }
    this.computersService.retornarComputadora(returnId).subscribe(
      (response) => {
        console.log('Datos creados exitosamente:', response);
        this.snackbarComponent.message = `Devolución exitosa`
        this.snackbarComponent.show();
        this.refreshTable();
      },
      (error) => {
        console.error('Error al enviar datos:', error);
        this.snackbarComponent.message = `Devolución fallida ${error.error.message}`
        this.snackbarComponent.show();
      }
    );
  }
}
