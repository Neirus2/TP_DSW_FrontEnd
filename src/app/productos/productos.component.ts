import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CategorySelectionService } from '../services/category-selection-service.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  products: any[] = [];
  searchTerm: string = '';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private categorySelectionService: CategorySelectionService
  ) {}

  async ngOnInit() {
    // Verifica la autenticación al cargar la página
    this.authService.checkAuthAndRedirect();

    this.route.queryParams.subscribe((queryParams) => {
      this.searchTerm = queryParams['q'] || ''; // Obtiene el término de búsqueda de la URL
      this.fetchProducts();
    });
    this.categorySelectionService.categorySelected$.subscribe(async (category) => {
      await this.filterByCategory(category);
    });
  }

  async fetchProducts() {
    try {
      if (this.searchTerm === 'Todos' || !this.searchTerm) {
        // Si el término de búsqueda es 'Todos' o no hay término, trae todos los productos
        const data = await firstValueFrom(this.productService.getProducts());
        this.products = data || [];
        console.log(data, 'all data');
      } else {
        // Si hay un término de búsqueda, filtra los productos
        const data = await firstValueFrom(this.productService.getProductsFiltered(this.searchTerm));
        this.products = data || [];
        console.log(data, 'filtered data');
      }
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  }

  async filterByCategory(category: string) {
    try {
      const data = await firstValueFrom(this.productService.filterByCategory(category));
      this.products = data || [];
      console.log(data, 'filtered by category');
    } catch (error) {
      const data = await firstValueFrom(this.productService.getProducts());
      this.products = data || [];
      console.error('Error fetching products by category', error);
    }
  }
}
