import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProgramsService } from 'src/app/services/programs.service';
import { ComputersService } from 'src/app/services/computers.service';
import { StudentsService } from '../../../services/students.service';
import { UsersService } from 'src/app/services/users.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent {

  columnHeaders: string[] = [];  // Inicializa con los encabezados de las columnas
  tableData: any[] = []; // Inicializa con los datos de la tabla
  loading: boolean = false;

  cardData = [
    { id: '1', title: 'Usuarios', description: 'ABM de usuarios.', img: '../../../assets/images/usuarios.png' },
    { id: '2', title: 'Computadoras', description: 'ABM de computadoras y notebooks.', img: '../../../assets/images/computadoras.png' },
    { id: '3', title: 'Estudiantes', description: 'Lista de estudiantes ', img: '../../../assets/images/solicitudes.png' },
    { id: '4', title: 'Programas', description: 'ABM de programas habilitados para su instalación.', img: '../../../assets/images/programas.png' },
    { id: '5', title: 'Calendario y asignaciones', description: 'Entregas programadas y asignación de computadoras. ', img: '../../../assets/images/calendar.png' },
  ]

  constructor(
    private router: Router,
    private dataSharingService: DataSharingService,
    private programsService: ProgramsService,
    private computersService: ComputersService,
    private studentsService: StudentsService,
    private usersService: UsersService,

  ) { }


  onCardClick(cardId: string): void {
    let dataObservable: Observable<any> | null = null;
    let tableName: string | null = null;

    switch (cardId) {
      case '1':
        dataObservable = this.usersService.obtenerUsers();
        tableName = 'Usuarios';
        break;
      case '2':
        dataObservable = this.computersService.obtenerComputadoras();
        tableName = 'Computadoras';
        break;
      case '3':
        dataObservable = this.studentsService.obtenerStudents();
        tableName = 'Estudiantes';
        break;
      case '4':
        dataObservable = this.programsService.obtenerPrograms();
        tableName = 'Programas';
        break;
      case '5':
        this.router.navigate(['/calendar']);
        break;
      default:
        // Manejar un caso no esperado si es necesario
        break;
    }

    if (dataObservable) {
      dataObservable.subscribe(data => {
        const columnHeaders = Object?.keys(data[0]);

        // Actualiza los datos y encabezados combinados
        this.dataSharingService.updateTableDataAndHeaders({ data, headers: columnHeaders });

        // Verifica que tableName tiene un valor antes de navegar
        if (tableName) {
          // Navega a la ruta /table/:tableName
          this.router.navigate(['/table', tableName]);
        }
      },
        error => {
          console.error(error)
        }
      );
    }
  }
}

