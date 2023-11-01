import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {
    businessName: '',
    cuit: '',
    address: '',
    phoneNumber: '',
    email: '',
    password:   ''
  }


  constructor(
    private authService: AuthService,
    private router: Router,
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit() {
    
  }
  

  signUp() {
    this.authService.signUp(this.user)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/login'])
        },
        (err) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Registro fallido',
            text: err.error,
          });
        }
        )
  }


}
