import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private location: Location) { }

  ngOnInit() {

  }

  desloguear() {
    this.userService.logout();
    this.router.navigate(["/"])
  }

  getIsLoggedIn(): boolean {
    return this.userService.getIsLoggedIn();
  }

  isTableRoute(): boolean {
    return this.router.url.includes('/table');
  }

  volverAtras(): void {
    this.location.back();
  }


}
