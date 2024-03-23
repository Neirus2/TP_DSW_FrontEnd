import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../services/supplier.service';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-ud-proveedor',
  templateUrl: './ud-proveedor.component.html',
  styleUrls: ['./ud-proveedor.component.css']
})
export class UdProveedorComponent {
  cuit: string = '';
  foundCuil: boolean = false;
  foundSuppliers: any[] = [];
  newAddress: string = '';
  newPhoneNumber: string = '';
  showModal: boolean = false;
  supplier: any = null; 

  constructor(
      private supplierService: SupplierService,
  ){}
  
openModal() {
    this.showModal = true;
  }
closeModal() {
    this.showModal = false;
  }

    ngOnInit(): any {};

    async onBuscarClick() {
  try {
    // Si el término de búsqueda es un número, asumimos que es un CUIT
   if (!isNaN(Number(this.cuit))) {
      const supplier = await firstValueFrom(this.supplierService.getSupplierCuit(this.cuit));
      if (supplier !== null) {
        this.foundCuil = true;
        this.supplier = supplier;
      } else {
        this.foundCuil = false;
        this.supplier = null;
        Swal.fire(
          'Denegado',
          'No se encontraron proveedores',
          'warning'
        );
      }
    } else {
      // Si no es un número, asumimos que es un nombre y buscamos por nombre
      console.log('buscamos por nombre')
      const suppliers = await this.supplierService.searchSuppliers(this.cuit);
      if (suppliers && suppliers.length > 0) {
        console.log('es verdadero');
        console.log(suppliers)
        this.foundCuil = true;
        this.foundSuppliers = suppliers;
        console.log(this.foundSuppliers)
      } else {
        console.log('es falso');
        this.foundCuil = false;
        this.supplier = null;
        Swal.fire(
          'Denegado',
          'No se encontraron proveedores',
          'warning',
    );
  }
    }
  } catch (error) {
    Swal.fire(
      'Denegado',
      'Error al buscar los proveedores',
      'warning',
    );
    console.error('Error al buscar los proveedores', error);
  }
}

async onSupplierSelect(supplier: any) {
  try {
    const selectedSupplier = supplier;
    console.log(selectedSupplier);
    const sup = await firstValueFrom(this.supplierService.getSupplierCuit(selectedSupplier));
  } catch (error) {
    console.error('Error al obtener el proveedor', error);
  }
}

  /*   async onBuscarClick() {
    try {
       if (!isNaN(Number(this.cuit))) {
      const supplier = await firstValueFrom(this.supplierService.getSupplierCuit(this.cuit)); //aca usabamos el .toPromise pero estaba deprecado
      console.log('sup del component', supplier);
      this.supplier = supplier;}
      else {
        const suppliers = await this.supplierService.searchSuppliers(this.cuit);
        console.log(suppliers)
        if (suppliers && suppliers.length > 0) {
        this.foundCuil = true;
        this.foundSuppliers = suppliers;
      } }
    } catch (error) {
      Swal.fire('Denegado', 'El proveedor no existe', 'warning');
      console.error('Error al buscar el proveedor', error);
    }
  };

  async onSupplierSelect(supplier: any) {
  try {
    const selectedSupplier = supplier;
    console.log(selectedSupplier)
    const sup = await firstValueFrom(this.supplierService.getSupplierCuit(this.cuit));
  } catch (error) {
    console.error('Error al obtener el cliente', error);
  }
}*/

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
          { next:response => {
                      Swal.fire(
                        'Confirmado',
                        'La acción ha sido confirmada',
                        'success'
                      );
                      this.supplier= null;
                      this.cuit = '';

                             },
            error:error => {
                      Swal.fire(
                        'Denegado',
                        'El supplier no ha podido ser eliminado',
                        'warning',
                              );
                      console.log(error);

                           }
          }
         
          // res => {
          //   Swal.fire(
          //     'Confirmado',
          //     'La acción ha sido confirmada',
          //     'success'
          //   );
          //   this.supplier= null;
          //   this.cuit = '';
          // },
          // (err) => {Swal.fire(
          //   'Denegado',
          //   'El supplier no ha podido ser eliminado',
          //   'warning',
          // );
          //   console.log(err);
          //   }
          );       
      }
    });
  
  };

  updateSupplierDetails(){
     if (this.supplier.address && this.supplier.phoneNumber) {
      this.supplierService.updateDetails(this.supplier._id, {
        address: this.supplier.address,
        phoneNumber: this.supplier.phoneNumber
      }).subscribe(

        {
          next:response => { Swal.fire('Proveedor actualizado con éxito', '', 'success');
                            this.closeModal();
                           },
          error:error => {Swal.fire('Error al actualizar el proveedor', error.error, 'error');},

        }

        // res => {
        //   Swal.fire('Proveedor actualizado con éxito', '', 'success');
        //   this.closeModal();
        // },
        // err => {
        //   Swal.fire('Error al actualizar el proveedor', err.error, 'error');
        // }


      );

      this.newAddress = '';
      this.newPhoneNumber = '';
    } else {
      Swal.fire('Campos requeridos vacíos', 'Completa los campos requeridos', 'warning');
    }
  };
}
