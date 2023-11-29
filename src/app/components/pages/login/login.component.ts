import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CustomSnackbarComponent } from '../../commons/custom-snackbar/custom-snackbar.component';

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
  @ViewChild(CustomSnackbarComponent) snackbarComponent!: CustomSnackbarComponent;

  onSubmit() {
    this.authService.loginAndRedirect(this.username, this.password).subscribe(
      (res) => {
        this.snackbarComponent.message = `Ingreso exitoso ${this.username}`
        this.snackbarComponent.show();
      },
      err => {
        console.error(err)
        this.snackbarComponent.message = `Ingreso fallido ${err.error.message}`;
        this.snackbarComponent.show();
      }
    );
  }

}
