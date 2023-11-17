import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  contactForm!: FormGroup;
  username: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService, private readonly fb: FormBuilder) {
    this.contactForm = fb.group({
      formularioNombreUsuario: ['', [Validators.required, Validators.minLength(3)]],
      formularioPasswordUsuario: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  onSubmit() {
    this.authService.loginAndRedirect(this.username, this.password).subscribe(
      // Manejar cualquier resultado o error si es necesario
      () => { },
      error => console.error(error)
    );
  }

}
