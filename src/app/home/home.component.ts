import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  featuredProducts: any[] = [];  // Lista para almacenar los productos destacados

  constructor(
    public authService: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.authService.checkAuthAndRedirect();

    this.productService.getFeaturedProducts().subscribe(
      {
        next: (products: any[]) => {
        this.featuredProducts = products;
      },
  
      error: err => {
        console.error('Error al obtener los productos destacados', err);
      }
    } );
  }
}
