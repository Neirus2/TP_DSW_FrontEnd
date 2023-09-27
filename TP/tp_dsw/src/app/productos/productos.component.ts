import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service'; // Reemplaza con la ubicación correcta de tu servicio

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
    // Llama al servicio para obtener la lista de productos
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
}