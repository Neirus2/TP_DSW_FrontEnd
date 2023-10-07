import { Component, EventEmitter, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';

@Component({
  selector: 'app-nuevo-producto',
  templateUrl: './nuevo-producto.component.html',
  styleUrls: ['./nuevo-producto.component.css']
})
export class NuevoProductoComponent implements OnInit {
  uploadInput: EventEmitter<UploadInput> = new EventEmitter<UploadInput>();
  humanizeBytes = humanizeBytes;
  files: UploadFile[] = [];

  product = {
    desc: '',
    stock: '',
    price: ''
  }
  
  selectedFile: any;
  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  // Guardar el producto en la base de datos
  createNewProduct() {
    this.productService.createNewProduct(this.product)
      .subscribe(
        res => {
          console.log(res);
          Swal.fire(
            'Producto creado con éxito!!',
            '',
            'success'
          );
        },
        (err) => {
          console.log(err);
          // Muestra la alerta de error con el mensaje personalizado
          Swal.fire({
            icon: 'error',
            title: 'Registro fallido',
            text: err.error,
          });
        }
        );
        this.product.desc= '';
            this.product.price= '';
            this.product.stock= '';
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    };
  }


}