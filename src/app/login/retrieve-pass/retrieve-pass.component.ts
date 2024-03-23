import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";

@Component({
  selector: 'app-retrieve-pass',
  templateUrl: './retrieve-pass.component.html',
  styleUrls: ['./retrieve-pass.component.css']
})
export class RetrievePassComponent {
  email:string='';
  showVerificationForm: boolean = false;
  verificationCode: string = '';
  setPassword: boolean = false;
  newPassword: string = '';
  newPassword2: string = '';


   constructor(
    public authService: AuthService,
    private router: Router
   ){}

   ngOnInit(): void {}

   async getUser(email:string){
    try{
      const cliente = await this.authService.getClientByEmail(this.email);
      console.log(cliente);
      if(cliente) {
        this.showVerificationForm = true;
        this.generateAndSendCode();
      }
      else {
      Swal.fire(
      'Denegado',
      'No se encontraron clientes',
      'warning',
    );}
   } 
   catch (error) {
    Swal.fire(
      'Denegado',
      'Error al buscar los clientes',
      'warning',
    );
    console.error('Error al buscar los clientes', error);
  }
  };

  private generateAndSendCode() {
    const generatedCode = this.generateRandomCode();
    this.authService.sendVerificationCodeByEmail(this.email, generatedCode)
      .then(() => {
        console.log('Código enviado exitosamente al correo electrónico.');
      })
      .catch((error) => {
        console.error('Error al enviar el código por correo electrónico:', error);
      });
  }

  private generateRandomCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const codeLength = 6;

    let result = '';
    for (let i = 0; i < codeLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  async verifyCode(code:string) {
    try {
    await this.authService.compareCode(this.email, code);
    console.log('Código verificado exitosamente.');
    this.setPassword = true;
  } catch (error) {
    console.error('Error al verificar el código:', error);
    Swal.fire(
      'Denegado',
      'Código incorrecto',
      'error',
    );
  }
  }

  async getNewPassword() {
    try {
      if(this.newPassword === this.newPassword2) {
      await this.authService.setNewPassword(this.email, this.newPassword);
      await Swal.fire({
            icon: 'success',
            title: 'Contraseña modificada',
            text: '',
           })
           this.router.navigate(['/login']);
    }
    else {
       Swal.fire(
      'Denegado',
      'Las contraseñas no coinciden',
      'error',)
    }
   }
    catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    Swal.fire(
      'Denegado',
      'La contraseña debe poseer al menos 8 caracteres y uno especial',
      'error',
    );
  }
  }

  reloadPage() {
    this.showVerificationForm = false;
  }
}
