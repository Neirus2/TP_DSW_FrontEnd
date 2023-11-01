import { Component, OnInit } from '@angular/core';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { CartItem } from '../art-item.model';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(
    private cartService: CartServiceService,
    private orderService: OrderService,
    private authService: AuthService,
    ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.calculateTotal();
  }

updateQuantity(productId: string, newQuantity: number) {
  this.cartService.updateQuantity(productId, newQuantity);
  this.cartItems = this.cartService.getCartItems();
  this.total = this.cartService.calculateTotal();
}

removeFromCart(productId: string) {
  this.cartService.removeFromCart(productId);
  this.cartItems = this.cartService.getCartItems();
  this.total = this.cartService.calculateTotal();
}

confirmarPedido() {
  this.authService.getUserData().subscribe((userData) => {
    const orderData = { items: this.cartItems, total: this.total, userId: userData.id };
    this.orderService.createNewOrder(orderData).subscribe(
      (response) => {
        console.log('Pedido guardado con éxito:', response);
        this.setProductsInCartToZero();
      },
      (error) => {
        console.error('Error al guardar el pedido:', error);
      }
    );
  });
}

 setProductsInCartToZero() {
    localStorage.setItem('productsInCart', '0');
  }
}