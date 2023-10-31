import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../services/supplier.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ud-proveedor',
  templateUrl: './ud-proveedor.component.html',
  styleUrls: ['./ud-proveedor.component.css']
})
export class UdProveedorComponent {
  cuit: string = '';
   public supplier: any = null; 
  constructor(
      private supplierService: SupplierService,
  ){}

    ngOnInit(): any {};

     async onBuscarClick() {
    try {
      const supplier = await this.supplierService.getSupplierCuit(this.cuit).toPromise();
      console.log('sup del component', supplier);
      this.supplier = supplier;
    } catch (error) {
      Swal.fire('Denegado', 'El proveedor no existe', 'warning');
      console.error('Error al buscar el proveedor', error);
    }
  };

  deleteSupplier() {
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
        this.supplierService.deleteSupplier(this.supplier._id)
        .subscribe(
          res => {
            Swal.fire(
              'Confirmado',
              'La acción ha sido confirmada',
              'success'
            );
            this.supplier= null;
            this.cuit = '';
          },
          (err) => {Swal.fire(
            'Denegado',
            'El supplier no ha podido ser eliminado',
            'warning',
          );
            console.log(err);
            });       
      }
    });
  
  }

}
