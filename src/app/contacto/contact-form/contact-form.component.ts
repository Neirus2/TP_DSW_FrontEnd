import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
  formData = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private http: HttpClient,
    private authService: AuthService,) { }

  submitForm() {
    const authToken= this.authService.getToken();
    
    const headers = {
      Authorization: 'Bearer ' + authToken,
    };
 console.log(headers);
    this.http.post('http://localhost:3000/enviar-correo', this.formData,{ headers }).subscribe(
      (response) => {
        console.log('Formulario enviado:', this.formData);
          Swal.fire(
            'Mensaje enviado con éxito!!',
            '',
            'success'
          )

      },
      (error) => {
        console.error('Error al enviar el formulario:', error);
          
        Swal.fire({
          icon: 'warning',
          title: 'Error al enviar el formulario',
          text: error.error,
          showClass: {
            popup: 'swal2-noanimation',
          },
        });
      }
    );
      this.formData.name = '';
      this.formData.email = '';
      this.formData.message = '';
  }
}
