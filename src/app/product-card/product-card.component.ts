import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product: any;

  constructor(
    private router: Router,
    private productService: ProductService) {}

  comprar() {
     this.productService.getProductDetailsById(this.product._id).subscribe(
      {
      next: (product: any) => {
        console.log('Detalles del producto:', product);
        this.router.navigate(['/product', this.product._id]); 
      },
      error: err => {
        console.error('Error al obtener detalles del producto', err);
      }
   });
  }
}

