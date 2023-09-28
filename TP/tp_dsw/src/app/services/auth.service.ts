import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000/api'

  constructor( 
    private http: HttpClient,
    private router: Router 
    ) { } 

  signUp(user: any) {
  return this.http.post<any>(this.URL + '/signup', user)
  }

  logIn(user: any) {
    return this.http.post<any>(this.URL + '/login', user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }
  
  logOut() {
    localStorage.removeItem('');
    this.router.navigate(['/login'])
  }

 getUserData(): Observable<any> {
    const authToken = this.getToken();
    if (!authToken) {
      // Si no hay un token, el usuario no está autenticado
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
