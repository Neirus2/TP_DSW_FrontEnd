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
    const url = `${this.URL}/deleteUser/${userId}`;         
    return this.http.delete(url);
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
    
    this.http.get<any>(this.URL + `/searchUser/${cuit}`, { headers }).subscribe(
      {
        next:response => {
              if (response) {
                const cliente = response;
                resolve(cliente); 
            } else {
                console.log('Cliente no encontrado');
                reject('Cliente no encontrado'); 
                   }
                        },
        error:error => {
                  console.error('Error en la solicitud HTTP', error);
                  reject(error);
                     }
      }
     
      
      // (response) => {
      //   if (response) {
      //     console.log('Cliente encontrado:', response);
      //     const cliente = response;
      //     resolve(cliente); 
      //   } else {
      //     console.log('Cliente no encontrado');
      //     reject('Cliente no encontrado'); 
      //   }
      // },
      // (error) => {
      //   console.error('Error en la solicitud HTTP', error);
      //   reject(error);
      // }
    );
  });
}

async searchClientes(query: string, authToken: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    
    this.http.get<any>(this.URL + `/searchUser/${query}`, { headers }).subscribe(
      {
        next:response => {
              if (response) {
                console.log('Cliente encontrado:', response);
                const cliente = response;
                resolve(cliente); 
            } else {
                console.log('Cliente no encontrado');
                reject('Cliente no encontrado'); 
                   }
                        },
        error:error => {
                  console.error('Error en la solicitud HTTP', error);
                  reject(error);
                     }
      }
    );
  });
}

getOrderUser(userId: any): Promise<any> {
    return new Promise((resolve, reject) => {    
    this.http.get<any>(this.URL + `/userById/${userId}`).subscribe(
      {
        next:response => {
              if (response) {
                console.log('Cliente encontrado:', response);
                const cliente = response;
                resolve(cliente); 
            } else {
                console.log('Cliente no encontrado');
                reject('Cliente no encontrado'); 
                   }
                        },
        error:error => {
                  console.error('Error en la solicitud HTTP', error);
                  reject(error);
                     }
      }
    );
  });
  }

async getClientByEmail(email: string): Promise<any[]> {
  return new Promise((resolve, reject) => {    
    this.http.get<any>(this.URL + `/user/${email}`).subscribe(
      {
        next:response => {
              if (response) {
                console.log('Cliente encontrado:', response);
                const cliente = response;
                resolve(cliente); 
            } else {
                console.log('Cliente no encontrado');
                reject('Cliente no encontrado'); 
                   }
                        },
        error:error => {
                  console.error('Error en la solicitud HTTP', error);
                  reject(error);
                     }
      }
    );
  });
}

sendVerificationCodeByEmail(email: string, code: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const requestBody = { email, code }; // Crear el cuerpo de la solicitud con el email y el código

    this.http.post<any>(this.URL + '/sendCode', requestBody).subscribe(
      {
        next: response => {
          if (response) {
            console.log('Código enviado correctamente:', response);
            resolve(response);
          } else {
            console.log('No se recibió una respuesta válida del servidor');
            reject('No se recibió una respuesta válida del servidor');
          }
        },
        error: error => {
          console.error('Error en la solicitud HTTP', error);
          reject(error);
        }
      }
    );
  });
}

compareCode(email:string, code: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const requestBody = { email, code };

    this.http.post<any>(this.URL + '/compareCode', requestBody).subscribe(
      {
        next: response => {
          if (response) {
            console.log('Código ingresado correctamente:', response);
            resolve(response);
          } else {
            console.log('No se recibió una respuesta válida del servidor');
            reject('No se recibió una respuesta válida del servidor');
          }
        },
        error: error => {
          console.error('Error en la solicitud HTTP', error);
          reject(error);
        }
      }
    );
  });
}

setNewPassword(email:string, password: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const requestBody = { email, password }; 

    this.http.patch<any>(this.URL + '/newPassword', requestBody).subscribe(
      {
        next: response => {
          if (response) {
            console.log('Contraseña actualizada correctamente:', response);
            resolve(response);
          } else {
            console.log('No se recibió una respuesta válida del servidor');
            reject('No se recibió una respuesta válida del servidor');
          }
        },
        error: error => {
          console.error('Error en la solicitud HTTP', error);
          reject(error);
        }
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

      {
        next:response => {
          if (response) {
          console.log('Cliente encontrado:', response);
          const cliente = response;
           resolve(cliente); 
        } else {
           console.log('Cliente no encontrado');
           reject('Cliente no encontrado');
         }
        },
        error:error => {
          console.error('Error en la solicitud HTTP', error);
          reject(error);
        }
      }
      // (response) => {
      //   if (response) {
      //     console.log('Cliente encontrado:', response);
      //     const cliente = response;
      //     resolve(cliente); 
      //   } else {
      //     console.log('Cliente no encontrado');
      //     reject('Cliente no encontrado');
      //   }
      // },
      // (error) => {
      //   console.error('Error en la solicitud HTTP', error);
      //   reject(error); 
      // }
    );
  });
}

  isAuthenticated(): boolean {
      const token = localStorage.getItem('token'); 
      if (token) {
        return true;
      }
      return false;
    }

    checkAuthAndRedirect(): void {
      if (!this.isAuthenticated()) {
        this.router.navigate(['/login']); 
      }
    }

  }