import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements  OnInit {
  
  productId: string | null = null; // Inicializado en null
  productDetails: any; // Define la variable para almacenar los detalles del producto

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    // Obtén el productId de la ruta
    this.productId = this.route.snapshot.paramMap.get('id');
    
    if (this.productId !== null) {
      // Llama al servicio para obtener los detalles del producto
      this.productService.getProductDetailsById(this.productId)
        .subscribe(data => {
          this.productDetails = data;
          console.log(this.productDetails);
        });
      }
  }
}

