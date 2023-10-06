import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import jwt_decode from 'jwt-decode'; // Importa de esta manera

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

    const authToken = this.authService.getToken();

    if (authToken) {
      const decodedToken: any = jwt_decode(authToken);
  
      this.userRole = decodedToken.role;};
      console.log(this.userRole)
    

  }
}
