import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

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
    image: null as File | null // Agregamos un campo para la imagen
  }

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  // Captura la imagen seleccionada por el usuario
  onImageSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      this.product.image = inputElement.files[0];
    }
  }

  // Guardar el producto en la base de datos, incluyendo la imagen
  createNewProduct() {
    const formData = new FormData();
    formData.append('desc', this.product.desc);
    formData.append('stock', this.product.stock);
    formData.append('price', this.product.price);

    if (this.product.image) {
      formData.append('image', this.product.image);
    }


    this.productService.createNewProduct(formData) // Asegúrate de que el servicio pueda manejar FormData
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

    this.product.desc = '';
    this.product.price = '';
    this.product.stock = '';
    this.product.image = null; // Limpiamos el campo de la imagen
  }
}