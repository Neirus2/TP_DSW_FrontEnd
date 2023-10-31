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
      // El item ya está en el carrito, puedes manejarlo de alguna manera, como mostrar un mensaje de error.
      console.log("El item ya está en el carrito.");
    } else {
      // El item no está en el carrito, así que lo agregamos.
      this.cartItems.push(item);
      this.saveCartItems();
    }
  }
  

  // Obtener los elementos del carrito
  getCartItems(): CartItem[] {
    this.loadCartItems();
    return this.cartItems;
  }

  // Actualizar la cantidad de un producto en el carrito
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

  // Eliminar un producto del carrito
  removeFromCart(productId: string) {
    const index = this.cartItems.findIndex((cartItem) => cartItem._id === productId);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.saveCartItems();
    }
  }

  // Calcular el total del carrito
  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  }

  // Guardar los datos del carrito en el localStorage
  private saveCartItems() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  // Cargar los datos del carrito desde el localStorage
  private loadCartItems() {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      this.cartItems = JSON.parse(savedCartItems);
    } else {
      this.cartItems = [];
    }
  }

}

