import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';


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
    
}
