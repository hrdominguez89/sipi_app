import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) { }
  onSubmit() {
    this.authService.loginAndRedirect(this.username, this.password).subscribe(
      // Manejar cualquier resultado o error si es necesario
      () => { },
      error => console.error(error)
    );
  }

}
