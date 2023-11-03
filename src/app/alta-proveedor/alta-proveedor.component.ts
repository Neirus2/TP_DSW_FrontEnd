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

async createNewSupplier() {
  this.supplierService.getSupplierCuit(this.supplier.cuit).subscribe(
    
    (response) => {
      console.log('Respuesta de la verificación de CUIT:', response);
      if (response && response.cuitExists) {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear proveedor',
          text: 'El CUIT ingresado ya existe en la base de datos.',
        });
      } else {
        if (
    !this.supplier.cuit ||
    !this.supplier.businessName ||
    !this.supplier.address ||
    !this.supplier.phoneNumber
    ){
       Swal.fire({
        icon: 'error',
        title: 'Error al crear el supplier',
        text: 'Debes rellenar los campos.',
      });
      
    }else {
  const dataSupplier ={ 
      cuit: this.supplier.cuit,
    businessName: this.supplier.businessName,
    address: this.supplier.address,
    phoneNumber: this.supplier.phoneNumber,
                           }
    
    
    this.supplierService.createNewSupplier(dataSupplier)
      .subscribe(
        {
          next:res => {
            console.log(res);
           Swal.fire(
             'Proveedor creado con éxito!!',
             '',
             'success'
           );
           this.resetForm();
          },
          error:err=> {
            console.log(err);
           Swal.fire({
             icon: 'error',
             title: 'Registro fallido',
             text: err.error,
           });
          }
        }
      );
    }
      
      }
    },
    (error) => {
      console.log('Error al verificar el CUIT:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al verificar el CUIT',
        text: 'Ocurrió un error al verificar el CUIT en la base de datos.',
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

