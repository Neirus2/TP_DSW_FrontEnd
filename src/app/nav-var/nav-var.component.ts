import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import jwt_decode from 'jwt-decode';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { countService } from '../services/count-cart.service';


@Component({
  selector: 'app-nav-var',
  templateUrl: './nav-var.component.html',
  styleUrls: ['./nav-var.component.css']
})
export class NavVarComponent implements OnInit {
  userRole: string | null = '';
  searchTerm: string = '';
  currentRoute: string = '';
  productsInCart: number = 0;
  productsInCartString: string = 'h';

  constructor(
    private router: Router,
    public authService: AuthService,
    private countService: countService,
  )
  
  {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = event.urlAfterRedirects || event.url;
        }
      });
  }
  ngOnInit(): void {
    this.countService.productsInCart$.subscribe(value => {
      this.productsInCart = value;
    });
    const productsInCartString = localStorage.getItem('productsInCart');
  if(productsInCartString != null) {
    this.productsInCart = parseInt(productsInCartString);}

    const authToken = this.authService.getToken();

    if (authToken) {
      const decodedToken: any = jwt_decode(authToken);
      this.userRole = decodedToken.role;
      console.log(this.userRole);
    }
  }

  isProductosRoute(): boolean {
    return this.currentRoute.includes('/productos');
  }

  isUserRoleDefined(): boolean {
    return this.userRole !== null && this.userRole !== undefined;
  }


  searchProducts() {
    console.log(this.searchTerm);
    if (this.searchTerm) {
      this.router.navigate(['/productos'], { queryParams: { q: this.searchTerm } });
    }
  }
}
