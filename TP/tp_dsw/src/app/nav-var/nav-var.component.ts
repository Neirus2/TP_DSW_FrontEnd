import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-var',
  templateUrl: './nav-var.component.html',
  styleUrls: ['./nav-var.component.css']
})
export class NavVarComponent implements OnInit {
  userRole: string | null = '';

  constructor(
    public authService: AuthService,
  ) {}

isUserRoleDefined(): boolean {
  return this.userRole !== null && this.userRole !== undefined;
}
  ngOnInit(): void {
    this.authService.getUserData().subscribe(
      (data) => {
        this.userRole = data.userRole;
        console.log(data.userRole)
      },
      (error) => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    );
  }
}
