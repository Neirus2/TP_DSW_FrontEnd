import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

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

  constructor(private http: HttpClient) { } // Inyecta HttpClient en el constructor

  submitForm() {
    // Realiza una solicitud HTTP POST al servidor para enviar el formulario
    this.http.post('http://localhost:3000/enviar-correo', this.formData).subscribe(
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
