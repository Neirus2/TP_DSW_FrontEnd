import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  featuredProducts = [
    {
      title: 'Producto 1',
      description: 'Descripción del producto 1',
      image: 'assets/featuredProducts/prod1.jpg'
    },
    {
      title: 'Producto 2',
      description: 'Descripción del producto 2',
      image: 'assets/featuredProducts/prod2.jpg'
    },

    {
      title: 'Producto 3',
      description: 'Descripción del producto 2',
      image: 'assets/featuredProducts/prod3.jpg'
    },
    {
      title: 'Producto 4',
      description: 'Descripción del producto 2',
      image: 'assets/featuredProducts/prod4.jpg'
    },
  ]
}
