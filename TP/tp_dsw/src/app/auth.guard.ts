import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from  './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data['expectedRole']; 

    if (this.authService.loggedIn()) {
      this.authService.getUserData().subscribe(
        (userData) => {
          const userRole = userData.userRole; 
          
          if (userRole === expectedRole) {
            return true; 
          } else {
            this.router.navigate(['/acceso-denegado']); 
            return false;
          }
        },
        (error) => {
          console.error('Error al obtener los datos del usuario:', error);
          this.router.navigate(['/acceso-denegado']); 
          return false;
        }
      );
    }

    this.router.navigate(['/login']);
    return false;
  }
}
