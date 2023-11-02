
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{

  orders: any[] = [];
  userId: string = ''; // Aquí colocarás el ID del usuario autenticado

  constructor(
    private orderService: OrderService,
    private authService: AuthService
     ) {}

  ngOnInit(): void {
    this.authService.getUserData().subscribe((data) => {
      this.userId = data.id;
      console.log(this.userId);
    this.orderService.getPedidosUsuario(this.userId).subscribe((data: any) => {
      this.orders = data.pedidos;
      console.log(this.orders);
       // Almacena los pedidos recuperados en la variable 'pedidos'
    });
  }); 
  }

   hourFormat(fechaISO: string): string {
    const fecha = new Date(fechaISO);
    const fechaFormateada = fecha.toISOString().split('T')[0];
    return fechaFormateada;
  }

cancelOrder(orderId: string) {
  Swal.fire({
    title: '¿Estás seguro de cancelar el pedido?',
    text: "Esta acción no se puede deshacer",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, confirmar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.orderService.cancelOrder(orderId)
      .subscribe({
        next:res => {
          Swal.fire('Confirmado', 'Pedido Cancelado', 'success').then(() => {
            location.reload();
          });
        },
        error:err => {
          console.log(err);
        }
      }); 
    }
  });
}





}

