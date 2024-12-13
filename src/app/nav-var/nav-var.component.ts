import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import jwt_decode from 'jwt-decode';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { countService } from '../services/count-cart.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-nav-var',
  templateUrl: './nav-var.component.html',
  styleUrls: ['./nav-var.component.css']
})
export class NavVarComponent implements OnInit {
  isNavOpen = false;
  userRole: string | null = '';
  searchTerm: string = '';
  currentRoute: string = '';
  productsInCart: number = 0;
  productsInCartString: string = 'h';

  constructor(
    private router: Router,
    public authService: AuthService,
    private countService: countService,
    private route: ActivatedRoute
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

  toggleNav() {
  this.isNavOpen = !this.isNavOpen;
  if (this.isNavOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = ''; 
    }
}

  isProductosRoute(): boolean {
    return this.currentRoute.includes('/productos');
  }

  isStockRoute(): boolean {
  return this.currentRoute.includes('/ingreso-stock');
}

  isOrdersRoute(): boolean {
    return this.currentRoute.includes('/pedidos');
  }

  isUserRoleDefined(): boolean {
    return this.userRole !== null && this.userRole !== undefined;
  }


searchProducts() {
  console.log(this.searchTerm);

  if (this.searchTerm) {
    this.router.navigate(['/productos'], { relativeTo: this.route, queryParams: { q: this.searchTerm } });
  }
  else {
    this.router.navigate(['/productos'], { relativeTo: this.route });
  }
}

searchOrders() {
  if(this.searchTerm) {
    this.router.navigate([], { relativeTo: this.route, queryParams: { q: this.searchTerm }});
  }
  else {
    this.router.navigate([], { relativeTo: this.route });
  }
}

}
