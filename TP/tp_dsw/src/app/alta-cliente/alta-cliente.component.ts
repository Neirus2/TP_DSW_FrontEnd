import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-alta-cliente',
  templateUrl: './alta-cliente.component.html',
  styleUrls: ['./alta-cliente.component.css']
})
export class AltaClienteComponent implements OnInit {
 decodedToken: any;
 userData: any; 
 cuit:string='';
 cuilEncontrado:boolean=false;

constructor(

    public authService: AuthService,

           ) {}


  ngOnInit(): void {

}
async onBuscarClick() {
  try {
    const authToken = this.authService.getToken();
    const cliente = await this.authService.getClienteCuil(this.cuit, authToken as string);
    console.log("Cliente del alta", cliente);
    if (cliente){this.cuilEncontrado = true;}
  } catch (error) {
    console.error('Error al buscar el cliente', error);
  }
}
}
