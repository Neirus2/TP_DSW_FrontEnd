import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private URL = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  createNewOrder (orderData: any): Observable<any> {
    console.log('intente', orderData)
    return this.http.post<any>(this.URL + '/generateNewOrder', orderData);
  }

  getPedidosUsuario(userId: string) {
    return this.http.get(`${this.URL}/orders/${userId}`);
  }

  cancelOrder(userId: string) {
    const body = { status: 'cancelado' };
    return this.http.patch(`${this.URL}/cancelOrder/${userId}`, body);
  }
  
}