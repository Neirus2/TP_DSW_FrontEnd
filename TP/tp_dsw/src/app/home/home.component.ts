import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  featuredProducts = [
    {
      title: 'Mother ASUS PRIME Z790-P DDR4',
      description: '$ 216.800',
      image: 'assets/featuredProducts/prod1.jpg'
    },
    {
      title: 'Mouse Logitech G502 Lightspeed Wireless RGB Lightsync ',
      description: '$ 73.200',
      image: 'assets/featuredProducts/prod2.jpg'
    },

    {
      title: 'Placa de Video ASUS GeForce RTX 3060 TI 8GB GDDR6 TUF GAMING OC V2',
      description: '$ 427.000',
      image: 'assets/featuredProducts/prod3.jpg'
    },
    {
      title: 'Procesador AMD Ryzen 7 7700 5.3GHz Turbo AM5',
      description: '$ 319.550',
      image: 'assets/featuredProducts/prod4.jpg'
    },
  ]
}
