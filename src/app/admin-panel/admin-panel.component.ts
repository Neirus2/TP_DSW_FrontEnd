import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  constructor(
    private productService: ProductService,
  ) {}
  productosParaStock: number = 0;

  ngOnInit(): void {
    this.obtenerCantidadProductosStock();
  }
  
  obtenerCantidadProductosStock() {
    this.productService.obtenerCantidadProductosParaStock().subscribe((cantidad: number) => {
      this.productosParaStock = cantidad;
      console.log("Productos que encontró el back", cantidad); 
    }, error => {
      console.error("Error en algún lado", error); 
    });
  }
}
