import { Component } from '@angular/core';

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

  submitForm() {
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log('Formulario enviado:', this.formData);
  }
  
}
