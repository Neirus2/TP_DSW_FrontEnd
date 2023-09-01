import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {
    email: '',
    password:   ''
  }


  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  signUp() {
    this.authService.signUp(this.user)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/private-task'])
        },
        err => console.log(err)
        )
  }


}
