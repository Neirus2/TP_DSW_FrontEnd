import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
  };

  getPedidosUsuario(userId: string) {
    return this.http.get(`${this.URL}/orders/${userId}`);
  };

  cancelOrder(userId: string) {
    const body = { status: 'cancelado' };
    return this.http.patch(`${this.URL}/cancelOrder/${userId}`, body);
  };

  getPedidos(): Observable<any[]> {
    return this.http.get<any[]>(this.URL + '/pedidos');
  };

  cambiarEstado(pedId:string, nuevoEstado:string)
  {
    const body = { status: nuevoEstado};
    console.log(body);
    return this.http.patch(`${this.URL}/changeStatus/${pedId}`, body);
  }

  getEmailByOrder(pedId: string){
    return this.http.get(`${this.URL}/getEmail/${pedId}`);
  }

  getOrdersFiltered(searchTerm: string): Observable<any[]> {
    console.log(searchTerm, 'service');
    const url = `${this.URL}/searchOrders/${searchTerm}`;
    console.log(url);
    return this.http.get<any[]>(url);
  }
}

  