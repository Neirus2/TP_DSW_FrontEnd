import { Injectable } from '@angular/core';
import {  Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './services/auth.service';
import jwt_decode from 'jwt-decode'; // Importa de esta manera

@Injectable({
  providedIn: 'root'
})

export class AuthGuard  {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const expectedRole = route.data['expectedRole'];

    return new Promise<boolean>((resolve, reject) => {
      const token = this.authService.getToken();

      if (token) {
        const decodedToken: any = jwt_decode(token);
        const userRole = decodedToken.role;

        console.log(userRole);

        if (userRole === expectedRole) {
          resolve(true);
        } else {
          this.router.navigate(['/acceso-denegado']);
          resolve(false);
        }
      } else {
        console.error('No se encontró un token de autenticación.');
        this.router.navigate(['/acceso-denegado']);
        resolve(false);
      }
    });
  }
}
