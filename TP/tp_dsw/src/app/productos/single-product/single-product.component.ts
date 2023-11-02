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
import { countService } from 'src/app/services/count-cart.service';
@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements  OnInit {
  
  productId: string | null = null; 
  productDetails: any;
  editedProduct: any = {}; 
  userRole: string | null = '';
  productQuantity: number = 1;
  productStock: any;
  productsInCart: number=0;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private modalService: NgbModal,
    private router : Router,
    private cartService : CartServiceService,
    private authService: AuthService,
    private countService: countService,

  ) {}

  ngOnInit() {
    const productsInCart = localStorage.getItem('productsInCart');
    if (productsInCart) {
      this.productsInCart = parseInt(productsInCart, 10);
    }


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
        this.productStock = this.productDetails.data.stock;
      });
    }
  };

  isUserRoleDefined(): boolean {
  return this.userRole !== null && this.userRole !== undefined;
}

  openEditModal() {

   const modalRef =  this.modalService.open(EditProductModalComponent, { centered: true }); 
   modalRef.componentInstance.editedProduct = { ...this.productDetails.data, _id: this.productId  }; 
   modalRef.result.then((result: any) => {
     if (result) {
       this.productDetails.data = { ...result }; 
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

  addToCart(quantity: number) {
    const productToAdd = {
      ...this.productDetails.data,
      _id: this.productId,
      quantity: quantity,
    }
    const respuesta = this.cartService.addToCart(productToAdd);
    console.log(respuesta);
    if (respuesta) {
      this.productsInCart=this.productsInCart+quantity;
      localStorage.setItem('productsInCart', this.productsInCart.toString());
      this.countService.updateProductsInCartValue(this.productsInCart);
    }
  }
} 

