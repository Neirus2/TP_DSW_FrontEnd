import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  }
  constructor(
    private authService: AuthService,
    private router: Router,
    private sanitizer: DomSanitizer,
   
  ) {  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    
    }
sanitizeInput(input: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(input);
  }
  logIn () {
    //this.user.email = this.sanitizeInput(this.user.email) as string;
    // this.user.password = this.sanitizeInput(this.user.password) as string;
    this.authService.logIn(this.user) 
      .subscribe(
        res => {
          console.log(res);

          localStorage.setItem('token', res.token);
          this.router.navigate(['/']);
        },
        (err) => {
          console.log(err);

        let errorMessage = 'Inicio de sesión fallido. Por favor, inténtelo de nuevo.';

        if (err.status === 401) {
          errorMessage = 'Credenciales incorrectas. Por favor, verifique su nombre de usuario y contraseña.';
        } else if (err.status === 403) {
          errorMessage = 'Acceso denegado. No tiene permiso para acceder a esta página.';
        } 

        Swal.fire({
          icon: 'error',
          title: 'Inicio de sesión fallido',
          text: err.error,
          timer: 1000,
        });
        }
      );
  }

}
