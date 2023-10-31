import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../services/product.service';
import Swal from 'sweetalert2';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-edit-product-modal',
  templateUrl: './edit-product-modal.component.html',
  styleUrls: ['./edit-product-modal.component.css']
})
export class EditProductModalComponent implements OnInit {
  @Input() editedProduct: any;
  suppliers: any[] = [];
  public value: string='';

  constructor(
    public activeModal: NgbActiveModal,
    private productService: ProductService,
    private supplierService: SupplierService
  ) {}

  ngOnInit() {
    this.obtenerProveedores();
  }

  obtenerProveedores() {
    this.supplierService.obtenerSuppliers().subscribe((data: any) => {
      this.suppliers = data; 
      console.log("suppliers del modal", this.suppliers);
    });
  }

  saveChanges() {
    this.productService.updateProduct(this.editedProduct, this.editedProduct._id).subscribe(
      res => {
        Swal.fire('Producto actualizado con éxito!!', '', 'success');
        console.log("editedProduct",res);
      },
      (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Actualización fallida',
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
