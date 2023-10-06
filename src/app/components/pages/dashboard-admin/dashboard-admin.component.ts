import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent {
  cardData = [
    { id: '1', title: 'Usuarios', description: 'ABM de usuarios.', img: '../../../assets/images/usuarios.png' },
    { id: '2', title: 'Computadoras', description: 'ABM de computadoras y notebooks.', img: '../../../assets/images/computadoras.png' },
    { id: '3', title: 'Solicitudes', description: 'Lista de solicitudes de notebooks enviadas por los profesores. ', img: '../../../assets/images/solicitudes.png' }]
}
