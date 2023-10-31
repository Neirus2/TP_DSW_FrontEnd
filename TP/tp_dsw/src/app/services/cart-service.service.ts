import { Injectable } from '@angular/core';
import { CartItem } from '../cart/art-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  private cartItems: CartItem[] = [];
  

  constructor() {
    this.loadCartItems()
  }

  addToCart(item: CartItem) {
    const existingItemIndex = this.cartItems.findIndex(cartItem => cartItem._id === item._id);
  
    if (existingItemIndex !== -1) {
      console.log("El item ya está en el carrito.");
    } else {
      this.cartItems.push(item);
      this.saveCartItems();
    }
  }
  
  getCartItems(): CartItem[] {
    this.loadCartItems();
    return this.cartItems;
  }

  updateQuantity(productId: string, newQuantity: number) {
    const item = this.cartItems.find((cartItem) => cartItem._id === productId);
    if (item) {
      item.quantity = newQuantity;
      if(item.quantity < 1) {
        item.quantity = 1
      }
      this.saveCartItems();
    }

  }

  removeFromCart(productId: string) {
    const index = this.cartItems.findIndex((cartItem) => cartItem._id === productId);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.saveCartItems();
    }
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  }
  private saveCartItems() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  private loadCartItems() {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      this.cartItems = JSON.parse(savedCartItems);
    } else {
      this.cartItems = [];
    }
  }

}

