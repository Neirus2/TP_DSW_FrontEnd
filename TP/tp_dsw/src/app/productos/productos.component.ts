import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute
import { ProductService } from '../services/product.service';
;

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute, // Agrega ActivatedRoute al constructor
  ) {}

  ngOnInit() {
    // Recupera el valor del parámetro de consulta llamado 'q'
    this.route.queryParams.subscribe((queryParams) => {
      const searchTerm = queryParams['q'];

      console.log(searchTerm);
      
      // Llama al servicio para obtener productos filtrados si searchTerm está presente
      if (searchTerm) {
        console.log(searchTerm, 'antes de llamar al serive')
        this.productService.getProductsFiltered(searchTerm).subscribe((data) => {
          this.products = data;
          console.log(data, 'volvi del service');
        });
      } else {
        // Si no se proporciona un término de búsqueda, obtén todos los productos
        this.productService.getProducts().subscribe((data) => {
          this.products = data;
        });
      }
    });
  }

 
}
