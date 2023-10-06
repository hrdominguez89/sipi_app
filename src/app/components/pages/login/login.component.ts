import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(private router: Router) { }

  logIn() {
    // Realiza las operaciones de autenticación aquí (por ejemplo, verificar credenciales).
    // Si la autenticación es exitosa, navega a la página de inicio.
    console.log('hola')
  }



}
