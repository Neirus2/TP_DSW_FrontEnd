import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import jwt_decode from 'jwt-decode'; // Importa de esta manera
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CategorySelectionService } from '../services/category-selection-service.service';
@Component({
  selector: 'app-nav-var',
  templateUrl: './nav-var.component.html',
  styleUrls: ['./nav-var.component.css']
})
export class NavVarComponent implements OnInit {
  userRole: string | null = '';
  searchTerm: '' | undefined;

  constructor(
    public authService: AuthService,
    private router: Router,
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
  searchProducts() {
    console.log(this.searchTerm);
    if (this.searchTerm) {
      // Realiza la redirección a la página de productos con el parámetro de búsqueda
      this.router.navigate(['/productos'], { queryParams: { q: this.searchTerm } });
    }
  }
}


