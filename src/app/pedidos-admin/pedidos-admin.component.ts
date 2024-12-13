import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pedidos-admin',
  templateUrl: './pedidos-admin.component.html',
  styleUrls: ['./pedidos-admin.component.css']
})
export class PedidosAdminComponent {
  searchTerm: string = '';
  pedidos: any[] = [];
  showModal: boolean = false;
  selectedPedido: any | null = null;
  pedidosFiltrados = this.pedidos;
  selectedStatus: string = '';

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private route: ActivatedRoute
    ) { }

    ngOnInit() {
      this.getOrders();
      this.route.queryParams.subscribe((queryParams) => {
        this.searchTerm = queryParams['q'];
        this.fetchOrders();
      });
      this.pedidosFiltrados = this.pedidos;
    }
  
    filterPedidos(status?: string) {
      this.selectedStatus = status || ''; // Si no se pasa un estado, mostramos todos
      if (status) {
        this.pedidosFiltrados = this.pedidos.filter(pedido => pedido.status === status);
      } else {
        this.pedidosFiltrados = [...this.pedidos]; // Mostrar todos si no hay filtro
      }
    }
  getOrders() {
    this.orderService.getPedidos().subscribe(async(data: any) => {
      for (const pedido of data) {
      try {
          const cliente = await this.authService.getOrderUser(pedido.userId);
          pedido.businessName = cliente.businessName;
      } catch (error) {
        console.error('Error fetching business name for user:', error);
      }
    }
    this.pedidos = data;
    this.pedidosFiltrados = data || [];
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

  async fetchOrders() {
    if (this.searchTerm) {
      // Si hay un término de búsqueda, obtén los pedidos filtrados
      const data = await firstValueFrom(this.orderService.getOrdersFiltered(this.searchTerm));
      
      for (const pedido of data) {
        const cliente = await this.authService.getOrderUser(pedido.userId);
        pedido.businessName = cliente.businessName; // Agrega el nombre del cliente al pedido
      }
      
      // Asigna los pedidos filtrados
      this.pedidosFiltrados = data || [];
      console.log(data, 'filtered data');
    } else {
      // Si no hay término de búsqueda, obtén todos los pedidos
      this.getOrders();
    }
  }
  

  
  async cambiarEstado(pedId: string, nuevoEstado: string) {
    try {
      await firstValueFrom(this.orderService.cambiarEstado(pedId, nuevoEstado));

      this.getOrders();

      this.showModal = false; 
      this.selectedPedido = null;
      
      if (nuevoEstado === 'Terminado' || nuevoEstado === 'Cancelado'){
        console.log('Entrando al mail');
        await firstValueFrom(this.orderService.getEmailByOrder(pedId));
      }

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
