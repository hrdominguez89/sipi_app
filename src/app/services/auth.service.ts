// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { RolesService } from './roles.service';
import { switchMap, finalize } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    loading$ = this.loadingSubject.asObservable();
    private currentUserSubject = new BehaviorSubject<any>(null);
    currentUser$ = this.currentUserSubject.asObservable();

    constructor(
        private userService: UserService,
        private rolesService: RolesService,
        private router: Router
    ) { }

    checkTokenAndRedirectHome(): void {
        const userData = this.userService.getUserData();
        if (userData) {
            this.currentUserSubject.next(userData);
            this.redirectToDashboard(userData.rol_id);
        }
    }

    loginAndRedirect(username: string, password: string): Observable<void> {
        this.loadingSubject.next(true);

        return this.userService.login(username, password).pipe(
            switchMap((response) => {
                const userData = response.user_data;
                this.currentUserSubject.next(userData);
                this.redirectToDashboard(userData.rol_id);
                return of(undefined);
            }),
            finalize(() => this.loadingSubject.next(false))
        );
    }

    private redirectToDashboard(userRoleId: number): void {
        // Implementa la lógica para redirigir al usuario al panel de control adecuado.
        // En este ejemplo, redirigimos a diferentes paneles según el rol.
        if (this.hasAdminRole(userRoleId)) {
            this.router.navigate(['/dashboard-admin']);
        } else if (this.hasProfessorRole(userRoleId)) {
            this.router.navigate(['/dashboard-prof']);
        } else if (this.hasBedelRole(userRoleId)) {
            this.router.navigate(['/dashboard-bedel']);
        } else {
            this.router.navigate(['/default']);
        }
    }

    private hasAdminRole(userRoleId: number): boolean {
        return userRoleId === 1;
    }

    private hasProfessorRole(userRoleId: number): boolean {
        return userRoleId === 2;
    }

    private hasBedelRole(userRoleId: number): boolean {
        return userRoleId === 3;
    }
}
