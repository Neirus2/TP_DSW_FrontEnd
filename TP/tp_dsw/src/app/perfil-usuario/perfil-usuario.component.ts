import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})

export class PerfilUsuarioComponent {
    selectedImageFile: File | null = null; // Variable para almacenar la imagen seleccionada
  user = {
    profileImage: null as string | null,
  };
    imagePath: string | null = null;
  constructor(
    public authService: AuthService,
    private http: HttpClient,
  ) {}

ngOnInit() {
  // Obtén el token de localStorage
  const authToken = localStorage.getItem('token');

  if (authToken) {
    // Decodifica el token para obtener sus contenidos
    const decodedToken: any = jwt_decode(authToken);

    // Comprueba si el token contiene la URL de la imagen de perfil
    if (decodedToken.profileImage) {
      // Asigna la URL de la imagen de perfil a la propiedad user.profileImage
      this.user.profileImage = decodedToken.profileImage;
    }
  }
}


// Función para manejar la selección de archivos
handleFileInput(event: any) {
  this.selectedImageFile = event.target.files[0];
  if (this.selectedImageFile) {
    // Verifica si event.target es null antes de acceder a event.target.result
    if (event.target) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          this.user.profileImage = e.target.result;
        }
      };
      reader.readAsDataURL(this.selectedImageFile);
    }
  }
}


  // Función para cargar la imagen de perfil
  uploadProfileImage(event: Event) {
    event.preventDefault();
    if (this.selectedImageFile) {
      const authToken = localStorage.getItem('token');

      const headers = new HttpHeaders({
      Authorization: 'Bearer ' + authToken,
      });
      const formData = new FormData();
      formData.append('profileImage', this.selectedImageFile);
    
      // Enviar la imagen al servidor para su almacenamiento
      this.http.post('http://localhost:3000/api/upload-profile-image', formData, {headers}).subscribe((response: any) => {
        // Actualiza la ruta de la imagen en el usuario y en la base de datos
       this.imagePath = 'http://localhost:3000/uploadsProfileImages/' + response.imagePath;



console.log(response.imagePath)

        this.imagePath = 'http://localhost:3000/uploadsProfileImages/' + response.imagePath;
        // Limpia la selección de archivos
        this.selectedImageFile = null;
      });
    }


  }
}
