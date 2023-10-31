import { Component } from '@angular/core';
import { SupplierService } from '../services/supplier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta-proveedor',
  templateUrl: './alta-proveedor.component.html',
  styleUrls: ['./alta-proveedor.component.css']
})
export class AltaProveedorComponent {
  supplier = {
    cuit: '',
    businessName: '',
    address: '',
    phoneNumber: '',
  };

  constructor(private supplierService: SupplierService) {}

  createNewSupplier() {
    const dataSupplier ={ 
      cuit: this.supplier.cuit,
    businessName: this.supplier.businessName,
    address: this.supplier.address,
    phoneNumber: this.supplier.phoneNumber,
}
    console.log("tjisupllier",this.supplier);
    this.supplierService.createNewSupplier(dataSupplier)
      .subscribe(
        res => {
          console.log(res);
          Swal.fire(
            'Proveedor creado con éxito!!',
            '',
            'success'
          );
          // Limpia los campos después de enviar los datos
          this.resetForm();
        },
        err => {
          console.log(err);
          // Muestra la alerta de error con el mensaje personalizado
          Swal.fire({
            icon: 'error',
            title: 'Registro fallido',
            text: err.error,
          });
        }
      );
  }

  resetForm() {
    this.supplier = {
      cuit: '',
      businessName: '',
      address: '',
      phoneNumber: ''
    };
  }
}
