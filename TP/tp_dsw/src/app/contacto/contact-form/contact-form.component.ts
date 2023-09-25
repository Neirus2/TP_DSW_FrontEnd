import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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
        // Aquí puedes manejar la respuesta del servidor, como mostrar un mensaje de éxito al usuario.
      },
      (error) => {
        console.error('Error al enviar el formulario:', error);
        // Aquí puedes manejar cualquier error que ocurra al enviar el formulario.
      }
    );
      this.formData.name = '';
      this.formData.email = '';
      this.formData.message = '';
  }
}
