import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserStateService } from './user-state.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000/api';
  private _userRole: string | null = null;
  get userRole(): string | null {
    return this._userRole;
  
  }
  constructor(
    private http: HttpClient,
    private router: Router,
    private userStateService: UserStateService
  ) { }

  signUp(user: any) {
    return this.http.post<any>(this.URL + '/signup', user);
  }

  logIn(user: any): Observable<any> {
    return this.http.post<any>(this.URL + '/login', user).pipe(
      tap((response) => {
        // Almacena el token en localStorage
        localStorage.setItem('token', response.token);
        
        // Almacena el rol del usuario en el servicio AuthService
        this._userRole = response.role;
        console.log('Rol del usuario:', this._userRole);
        this.userStateService.userRole = response.role;
      })
    );
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getUserData(): Observable<any> {
    const authToken = this.getToken();

    if (!authToken) {
      return new Observable<any>((observer) => {
        observer.error('No hay token de autenticación.');
      });
    }

    const headers = {
      Authorization: 'Bearer ' + authToken,
    };

    return this.http.get<any>(this.URL + '/user', { headers });
  }
}
