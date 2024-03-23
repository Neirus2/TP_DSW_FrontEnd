import { Component, OnInit } from '@angular/core';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { CartItem } from '../art-item.model';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { countService } from 'src/app/services/count-cart.service';
import Swal from 'sweetalert2';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;
  productsInCart: number = 0;

  constructor(
    private cartService: CartServiceService,
    private orderService: OrderService,
    private authService: AuthService,
    private countService: countService,
    private productService: ProductService
    ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.calculateTotal();
  }

updateQuantity(productId: string, newQuantity: number) {
  this.cartService.updateQuantity(productId, newQuantity);
  this.cartItems = this.cartService.getCartItems();
  this.total = this.cartService.calculateTotal();
  this.productsInCart = this.cartService.calculateProductsInCart();
  localStorage.setItem('productsInCart', this.productsInCart.toString());
  this.countService.updateProductsInCartValue(this.productsInCart);
}

removeFromCart(productId: string) {
  this.cartService.removeFromCart(productId);
  this.cartItems = this.cartService.getCartItems();
  this.total = this.cartService.calculateTotal();
  this.productsInCart = this.cartService.calculateProductsInCart();
  localStorage.setItem('productsInCart', this.productsInCart.toString());
  this.countService.updateProductsInCartValue(this.productsInCart);
}

confirmarPedido() {
  this.authService.getUserData().subscribe((userData) => {
    const orderData = { items: this.cartItems, total: this.total, userId: userData.id };
    if ( orderData.items.length > 0)
    {
      this.orderService.createNewOrder(orderData).subscribe(

      {
        next:response => {
          console.log('Pedido guardado con éxito:', response);
          Swal.fire({
            icon: 'success',
            title: '¡Estado actualizado!',
            text: `El pedido ha sido guardado con éxito`,
      });
          this.setProductsInCartToZero();
          this.setPedToZero();
          this.productService.actualizarStock(orderData).subscribe(
            {
              next:res => {console.log('Stock Actualizado')},
              error:err => {console.log('Error al actualizar el stock')}
            }
          )
        },
        error:error => {
          console.error('Error al guardar el pedido:', error);
        }
      }

    );
    }else
    {
      Swal.fire({
        icon: 'warning',
        title: 'No es posible realizar esta acción',
        text: `Debe agregar items al carrito`,});
    }
    
  });
}

 setProductsInCartToZero() {
    localStorage.setItem('productsInCart', '0');
  }

  setPedToZero(){
    this.cartItems= [];
    localStorage.setItem('cartItems','0');
    this.total=0;
  }

}