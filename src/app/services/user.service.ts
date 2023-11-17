import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { tap, Observable, Subject } from 'rxjs';

export interface User {
    username: string;
    password: string;
    token: string;
    rol_id: number;
}

@Injectable({
    providedIn: 'root'
})

export class UserService {
    private token: string = '';
    private user: User | null = null;

    constructor(private httpClient: HttpClient) {
        this.cargarStorage();
    }

    public login(username: string, password: string) {
        return this.httpClient.post('http://localhost/api/login', {
            username,
            password
        }).pipe(
            tap((response: any) => {
                if (response && response.status === true && response.token) {
                    localStorage.setItem('token', response.token);
                    this.user = response.user_data;
                }
            })
        );
    }

    public getUserData(): User | null {
        return this.user;
    }

    cargarStorage() {
        const token = localStorage.getItem('token');
        if (token === null) {
            this.token = '';
        } else {
            this.token = token;
        }
    }

    public getToken(): string {
        return this.token;
    }


    logout() {
        // Lógica de cierre de sesión aquí (por ejemplo, eliminar del LocalStorage)
        localStorage.removeItem('token');
    }

    getIsLoggedIn(): boolean {
        return localStorage.getItem("token") !== null;
    }
}




