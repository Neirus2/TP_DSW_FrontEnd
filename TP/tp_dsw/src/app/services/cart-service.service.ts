import { Injectable } from '@angular/core';
import { CartItem } from '../cart/art-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  private cartItems: CartItem[] = [];

  constructor() {
    // Al iniciar el servicio, intenta cargar los datos del carrito desde el localStorage
    this.loadCartItems();
  }

  // Agregar un producto al carrito
  addToCart(item: CartItem) {
    this.cartItems.push(item);
    this.saveCartItems();
  }

  // Obtener los elementos del carrito
  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  // Actualizar la cantidad de un producto en el carrito
  updateQuantity(productId: string, newQuantity: number) {
    const item = this.cartItems.find((cartItem) => cartItem._id === productId);
    if (item) {
      item.quantity = newQuantity;
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
    }
  }
}

