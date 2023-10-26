import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditProductModalComponent } from '../edit-product-modal/edit-product-modal.component';
import Swal from 'sweetalert2';
import { CartItem } from 'src/app/cart/art-item.model';
import { CartServiceService } from 'src/app/services/cart-service.service';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements  OnInit {
  
  productId: string | null = null; // Inicializado en null
  productDetails: any; // Define la variable para almacenar los detalles del producto
  editedProduct: any = {}; // Objeto para almacenar los datos editados
  userRole: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private modalService: NgbModal,
    private router : Router,
    private cartService : CartServiceService,
    private authService: AuthService,
  ) {}

  ngOnInit() {

    const authToken = this.authService.getToken();

    if (authToken) {
      const decodedToken: any = jwt_decode(authToken);
  
      this.userRole = decodedToken.role;};
      console.log(this.userRole)
    


    this.productId = this.route.snapshot.paramMap.get('id');

    console.log(this.productId);

    if (this.productId !== null) {
      this.productService.getProductDetailsById(this.productId).subscribe(data => {
        this.productDetails = {data: data};
        console.log(this.productDetails);
        // Aquí, asumimos que la estructura de 'productDetails' tiene una propiedad 'image' que contiene la URL de la imagen.
      });
    }
  };

  isUserRoleDefined(): boolean {
  return this.userRole !== null && this.userRole !== undefined;
}

  openEditModal() {

   const modalRef =  this.modalService.open(EditProductModalComponent, { centered: true }); // Abre el modal
   modalRef.componentInstance.editedProduct = { ...this.productDetails.data }; // Pasa los datos al componente modal
   modalRef.result.then((result) => {
     if (result) {
       this.productDetails.data = { ...result }; // Actualiza los datos con los cambios guardados
     }
   }); 
 }
  

  deleteProduct() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.productService.deleteProduct(this.productId)
        .subscribe(
          res => {
            Swal.fire(
              'Confirmado',
              'La acción ha sido confirmada',
              'success'
            );
            this.router.navigate(['/productos']);
          },
          (err) => {
            console.log(err);
            });       
      }
    });
  }

  addToCart() {
    this.cartService.addToCart(this.productDetails.data);
  }
} 

