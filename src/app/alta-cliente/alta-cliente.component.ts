import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-alta-cliente',
  templateUrl: './alta-cliente.component.html',
  styleUrls: ['./alta-cliente.component.css']
})
export class AltaClienteComponent implements OnInit {
  decodedToken: any;
  userData: any; 
  cuit: string = '';
  cuilEncontrado: boolean = false;
  cliente: any = null; 
  clientesEncontrados: any[] = [];
  clienteEliminado: boolean = false;
  clienteModificado: boolean = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {}


  async onBuscarClick() {
  try {
    const authToken = this.authService.getToken();
    
    // Si el término de búsqueda es un número, asumimos que es un CUIT
    if (!isNaN(Number(this.cuit))) {
      const cliente = await this.authService.getClienteCuil(this.cuit, authToken as string);
      console.log(cliente);
      if (cliente) {
        this.cuilEncontrado = true;
        this.cliente = cliente;
        this.clienteModificado = false;
        this.clienteEliminado = false;
      }
    } else {
      // Si no es un número, asumimos que es un nombre y buscamos por nombre
      console.log('buscamos por nombre')
      const clientes = await this.authService.searchClientes(this.cuit, authToken as string);
      if (clientes && clientes.length > 0) {
        this.cuilEncontrado = true;
        this.clientesEncontrados = clientes;
        this.clienteModificado = false;
        this.clienteEliminado = false;
  } else {
    this.cuilEncontrado = false;
    this.cliente = null;
    Swal.fire(
      'Denegado',
      'No se encontraron clientes',
      'warning',
    );
  }
    }
  } catch (error) {
    Swal.fire(
      'Denegado',
      'Error al buscar los clientes',
      'warning',
    );
    console.error('Error al buscar los clientes', error);
  }
}

async onClienteSelect(cliente: any) {
  try {
    const authToken = this.authService.getToken();
    const clienteSeleccionado = cliente;
    console.log(clienteSeleccionado)
    const client = await this.authService.getClienteCuil(clienteSeleccionado, authToken as string);
  } catch (error) {
    console.error('Error al obtener el cliente', error);
  }
}




 deleteClient() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteCliente(this.cliente._id)
        .subscribe(

        {
          next:res => {
               Swal.fire(
               'Confirmado',
               'La acción ha sido confirmada',
               'success'
             );
             this.cliente= null;
             this.cuit = '';
             this.clienteEliminado= true;
             this.clienteModificado= false;
          },
          error:err => {
              Swal.fire(
             'Denegado',
             'El usuario no ha podido ser eliminado',
             'warning',
           );
             console.log(err);
          }
        }
          // res => {
          //   Swal.fire(
          //     'Confirmado',
          //     'La acción ha sido confirmada',
          //     'success'
          //   );
          //   this.cliente= null;
          //   this.cuit = '';
          //   this.clienteEliminado= true;
          //   this.clienteModificado= false;
          // },
          // (err) => {Swal.fire(
          //   'Denegado',
          //   'El usuario no ha podido ser eliminado',
          //   'warning',
          // );
          //   console.log(err);
          //   }
          );       
      }
    });
  
  }

asignPrivileges(){
  Swal.fire({
    title: '¿Estás seguro de asignar rol Administrador?',
    text: 'Esta acción implica cambios importantes',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, confirmar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.authService.asignPrivileges(this.cliente._id)
      .subscribe(
        {
          next:res => {
             Swal.fire(
             'Confirmado',
             'La acción ha sido confirmada',
             'success'
           );
         this.cliente= null;
           this.cuit = '';
           this.clienteModificado= true;
           this.clienteEliminado= false;
          },
          error:err => {
              Swal.fire(
           'Denegado',
           'El usuario no ha podido ser eliminado',
           'warning',
        );
           console.log(err);
          }
        }
        // res => {
        //   Swal.fire(
        //     'Confirmado',
        //     'La acción ha sido confirmada',
        //     'success'
        //   );
        //   this.cliente= null;
        //   this.cuit = '';
        //   this.clienteModificado= true;
        //   this.clienteEliminado= false;
        // },
        // (err) => {Swal.fire(
        //   'Denegado',
        //   'El usuario no ha podido ser eliminado',
        //   'warning',
        // );
        //   console.log(err);
        //   }
        );       
    }
  });
};

}
