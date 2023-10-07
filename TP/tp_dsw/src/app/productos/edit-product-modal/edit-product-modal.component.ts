import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbActiveModal
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.css']
})
export class EditProductModalComponent {

  @Input() editedProduct: any;
  

  constructor(public activeModal: NgbActiveModal, private productService: ProductService,) {}


  saveChanges() {
    this.productService.updateProduct(this.editedProduct, this.editedProduct._id)
    .subscribe(
      res => {
        console.log(res);
        Swal.fire(
          'Producto actualizado con éxito!!',
          '',
          'success'
        );
      },
      (err) => {
        console.log(err);
        // Muestra la alerta de error con el mensaje personalizado
        Swal  .fire({
          icon: 'error',
          title: 'Actualizacion fallida',
          text: err.error,
        });
      }
      );
    this.activeModal.close(this.editedProduct);
  }

  close() {
    this.activeModal.close(this.editedProduct);
  }

}