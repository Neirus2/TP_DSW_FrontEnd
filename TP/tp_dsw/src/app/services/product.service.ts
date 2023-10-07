import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private URL = 'http://localhost:3000/api'

  constructor( 
    private http: HttpClient,
    private router: Router 
    ) { } 
  
    createNewProduct(product: any) {
      return this.http.post<any>(this.URL + '/createNewProduct', product)
      }
    
      getProducts(): Observable<any[]> {
        return this.http.get<any[]>(this.URL+ '/products');
      }

      getProductDetailsById(productId: any): Observable<any> {
        const url = `${this.URL}/product/${productId}`; // Reemplaza con la ruta adecuada en tu servidor
        return this.http.get(url);
      }
    
      deleteProduct(productId: any) {
        const url = `${this.URL}/product/${productId}`; // Reemplaza con la ruta adecuada en tu servidor
        return this.http.delete(url);
      }
      updateProduct(updatedProduct: any, productId: any) {
          const url = `${this.URL}/product/${productId}`; // Reemplaza con la ruta adecuada en tu servidor
          return this.http.patch(url, updatedProduct);
}
}
