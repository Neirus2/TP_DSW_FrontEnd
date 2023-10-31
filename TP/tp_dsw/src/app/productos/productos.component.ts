import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategorySelectionService } from '../services/category-selection-service.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  products: any[] = []; // Inicializamos como un array vacío

  searchTerm: string = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private categorySelectionService: CategorySelectionService
  ) {}

  async ngOnInit() {
    this.authService.checkAuthAndRedirect();
    this.route.queryParams.subscribe((queryParams) => {
      this.searchTerm = queryParams['q'];
      this.fetchProducts();
    });

    this.categorySelectionService.categorySelected$.subscribe(async (category) => {
      await this.filterByCategory(category);
    });
  }

  async fetchProducts() {
    if (this.searchTerm) {
      const data = await this.productService.getProductsFiltered(this.searchTerm).toPromise();
      this.products = data || []; // Asignamos un array vacío si 'data' es 'undefined'
      console.log(data, 'filtered data');
    } else {
      const data = await this.productService.getProducts().toPromise();
      this.products = data || []; // Asignamos un array vacío si 'data' es 'undefined'
      console.log(data, 'all data');
    }
  }

  async filterByCategory(category: string) {
    try {
      const data = await this.productService.filterByCategory(category).toPromise();
      this.products = data || []; // Asignamos un array vacío si 'data' es 'undefined'
      console.log(data, 'filtered by category');
    } catch (error) {
      const data = await this.productService.getProducts().toPromise();
      this.products = data || []; 
      console.error('Error fetching products by category', error);
    }
  }
}
