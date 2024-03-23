import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../services/product.service';
import { CategorySelectionService } from '../services/category-selection-service.service';

@Component({
  selector: 'app-ingreso-stock',
  templateUrl: './ingreso-stock.component.html',
  styleUrls: ['./ingreso-stock.component.css']
})
export class IngresoStockComponent implements OnInit {
  products: any[] = [];
  currentRoute: string = '';
  searchTerm: string = '';
  quantityToBuy: number = 1;

  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private productService: ProductService,
    private categorySelectionService: CategorySelectionService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams) => {
      this.searchTerm = queryParams['q'];
      this.fetchProducts();
    });
    this.categorySelectionService.categorySelected$.subscribe(async (category) => {
    await this.filterByCategory(category);
    });
  }

async fetchProducts() {
   const noStockData = await firstValueFrom(this.productService.getNoStockProducts())

  if (this.searchTerm) {
    // Obtener todos los productos filtrados por el término de búsqueda
    const filteredData = await firstValueFrom(this.productService.getProductsFiltered(this.searchTerm));

    this.products = filteredData.filter(product => product.stock < product.stockMin);
  } else {
    // Si no hay término de búsqueda, mostrar todos los productos sin stock
    this.products = noStockData;
  }
  console.log(this.products);
}

 async filterByCategory(category: string) {
    try {
      const data = await firstValueFrom(this.productService.filterByCategory(category)); 
      this.products = data || []; 
      console.log(data, 'filtered by category');
      this.products = data.filter(product => product.stock < product.stockMin);
    } catch (error) {
      const data = await firstValueFrom(this.productService.getProducts());
      this.products = data || []; 
      console.error('Error fetching products by category', error);
    }
  }

 solicitarStock(productId: any, quantity: number) {
    // Obtener el producto correspondiente al productId
    const productToUpdate = this.products.find(product => product._id === productId);

    if (productToUpdate) {
      const newStock = productToUpdate.stock + quantity;
      // Llamar al servicio para actualizar el stock
      this.productService.updateProduct({ stock: newStock }, productId).subscribe(
      
      {
        next:res => {
          Swal.fire('Producto actualizado con éxito!!', '', 'success');
          console.log("updatedProduct",res);
          this.fetchProducts();
        },
        error:err => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Actualización fallida',
            text: err.error,
         });
        }

      }
    );
    } else {
      console.error('Producto no encontrado');
    }
  }
}
