import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { SupplierService } from '../services/supplier.service';
@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {
  product = {
    desc: '',
    stock: '',
    price: '',
    cat: '',
    supplier: '',
    image: null as File | null 
  }
   suppliers: any[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private authService: AuthService,
    private supplierService: SupplierService,
  ) {}
  
  ngOnInit(): void {
    this.authService.checkAuthAndRedirect();
    this.obtenerProveedores();
  }

    obtenerProveedores() {
    this.supplierService.obtenerSuppliers().subscribe((data: any) => {
      this.suppliers = data; 
      console.log(this.suppliers);
    });
  }

  onImageSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      this.product.image = inputElement.files[0];
    }
  }
  createNewProduct() {
    const formData = new FormData();
    formData.append('desc', this.product.desc);
    formData.append('stock', this.product.stock);
    formData.append('price', this.product.price);
    formData.append('cat', this.product.cat);
    formData.append('supplier', this.product.supplier);
    if (this.product.image) {
      formData.append('image', this.product.image);
    }


    this.productService.createNewProduct(formData)
      .subscribe(
        {
          next:res => {
            console.log(res);
           Swal.fire(
             'Producto creado con éxito!!',
             '',
            'success'
           );
          },
          error:err => {
            console.log(err);

           Swal.fire({
             icon: 'error',
             title: 'Registro fallido',
             text: err.error,
           });
          }
        }
        // res => {
        //   console.log(res);
        //   Swal.fire(
        //     'Producto creado con éxito!!',
        //     '',
        //     'success'
        //   );
        // },
        // (err) => {
        //   console.log(err);

        //   Swal.fire({
        //     icon: 'error',
        //     title: 'Registro fallido',
        //     text: err.error,
        //   });
        // }
      );

    this.product.desc = '';
    this.product.price = '';
    this.product.stock = '';
    this.product.image = null;
    this.product.supplier= '';
  }
}