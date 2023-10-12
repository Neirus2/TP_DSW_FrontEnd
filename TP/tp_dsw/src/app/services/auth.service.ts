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
        localStorage.setItem('token', response.token);
        this._userRole = response.role;
        this.userStateService.userRole = response.role;
      })
    );
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  deleteCliente(userId:string){ 
    console.log("este es el id en auth",userId);
    const url = `${this.URL}/deleteUser/${userId}`;
    console.log(url);         
    return this.http.delete(url);
    console.log("deleteCLient click");
  }

  asignPrivileges(userId: string) { 
    const url = `${this.URL}/asignPrivileges/${userId}`;
    return this.http.patch(url, { role: 'Administrador' });
  }
  
  getToken(){
    return localStorage.getItem('token');
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('cartItems');
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

  getUserImage(userId: any){
    return `${this.URL}/getUserImage/${userId}`;
  }

async getClienteCuil(cuit: string, authToken: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    console.log('Este es el CUIT ingresado', cuit);
    
    this.http.get<any>(this.URL + `/user/${cuit}`, { headers }).subscribe(
      (response) => {
        if (response) {
          console.log('Cliente encontrado:', response);
          const cliente = response;
          resolve(cliente); // Resuelve la promesa con el cliente
        } else {
          console.log('Cliente no encontrado');
          reject('Cliente no encontrado'); // Rechaza la promesa en caso de no encontrar el cliente
        }
      },
      (error) => {
        console.error('Error en la solicitud HTTP', error);
        reject(error); // Rechaza la promesa en caso de error
      }
    );
  });
}

async getClienteEmail(cuit: string, authToken: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    console.log('Este es el CUIT ingresado', cuit);
    
    this.http.get<any>(this.URL + `/user/${cuit}`, { headers }).subscribe(
      (response) => {
        if (response) {
          console.log('Cliente encontrado:', response);
          const cliente = response;
          resolve(cliente); // Resuelve la promesa con el cliente
        } else {
          console.log('Cliente no encontrado');
          reject('Cliente no encontrado'); // Rechaza la promesa en caso de no encontrar el cliente
        }
      },
      (error) => {
        console.error('Error en la solicitud HTTP', error);
        reject(error); // Rechaza la promesa en caso de error
      }
    );
  });
}
}