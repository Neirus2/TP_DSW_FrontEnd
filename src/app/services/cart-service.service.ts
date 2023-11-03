import { Injectable } from '@angular/core';
import { CartItem } from '../cart/art-item.model';
import Swal from 'sweetalert2';
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
      Swal.fire({
      title: 'Producto repetido',
      text: "Puedes agregar más de este producto yendo a tu carrito",
      icon: 'warning'});
      return false
    } else {
      this.cartItems.push(item);
      this.saveCartItems();
      return true;
    }
  }
  
  getCartItems(): CartItem[] {
    this.loadCartItems();
    return this.cartItems;
  }

  updateQuantity(productId: string, newQuantity: number) {
    const item = this.cartItems.find((cartItem) => cartItem._id === productId);
    if (item) {
      if(item.stock >= newQuantity) {
        item.quantity = newQuantity;
      }     
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
  
  calculateProductsInCart(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity , 0);
  }
  
  private saveCartItems() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

private loadCartItems() {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      const parsedItems = JSON.parse(savedCartItems);

      if (Array.isArray(parsedItems)) {
        this.cartItems = parsedItems; // Si los datos guardados son un array, asignarlos directamente
      } else {
        this.cartItems = []; // Si no es un array, inicializar como un array vacío
      }
    } else {
      this.cartItems = []; // Si no hay datos guardados, inicializar como un array vacío
    }
  }
}

