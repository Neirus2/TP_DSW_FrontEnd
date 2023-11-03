import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos-admin',
  templateUrl: './pedidos-admin.component.html',
  styleUrls: ['./pedidos-admin.component.css']
})
export class PedidosAdminComponent {
  pedidos: any[] = [];
  showModal: boolean = false;
  selectedPedido: any | null = null;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders() {
    this.orderService.getPedidos().subscribe((data: any) => {
      this.pedidos = data;
    });
  }

  openModal(pedido: any) {
    this.showModal = true;
    this.selectedPedido = pedido._id;
    console.log("ID del pedido:", this.selectedPedido);
  }

  closeModal() {
    this.showModal = false;
    this.selectedPedido = null;
  }

  async cambiarEstado(pedId: string, nuevoEstado: string) {
    try {
      await firstValueFrom(this.orderService.cambiarEstado(pedId, nuevoEstado));


      this.getOrders();

      this.showModal = false; 
      this.selectedPedido = null; 

      Swal.fire({
        icon: 'success',
        title: '¡Estado actualizado!',
        text: `El pedido ${pedId} ahora está ${nuevoEstado}`,
      });
    } catch (error) {
      console.error('Error al cambiar el estado del pedido:', error);
    }
  }
}
