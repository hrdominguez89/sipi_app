import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private location: Location, private datasharingservice: DataSharingService) { }

  ngOnInit() {

  }

  desloguear() {
    this.userService.logout();
    // this.datasharingservice.
    this.router.navigate(["/"])
  }

  getIsLoggedIn(): boolean {
    return this.userService.getIsLoggedIn();
  }

  isTableRoute(): boolean {
    return this.router.url.includes('/table');
  }

  isExcludedRoute(): boolean {
  const excludedRoutes = ['/login', '/dashboard-admin'];
  return excludedRoutes.every(route => !this.router.url.includes(route));
}

  volverAtras(): void {
    this.location.back();
  }


}
