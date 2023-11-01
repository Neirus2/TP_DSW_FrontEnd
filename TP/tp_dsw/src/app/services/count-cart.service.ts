import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class countService {
  private productsInCart = new BehaviorSubject<number>(0);
  productsInCart$ = this.productsInCart.asObservable();

  updateProductsInCartValue(value: number): void {
    this.productsInCart.next(value);
  }

  getProductsInCartValue(): number {
    return this.productsInCart.getValue();
  }
}
