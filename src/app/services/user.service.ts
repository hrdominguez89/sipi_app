import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { tap } from 'rxjs';

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
        return this.httpClient.post('http://34.227.164.19/api/login', {
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
        // Remueve el token del localStorage
        localStorage.removeItem('token');
    }

    getIsLoggedIn(): boolean {
        return localStorage.getItem("token") !== null;
    }
}




