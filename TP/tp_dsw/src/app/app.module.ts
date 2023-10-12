import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavVarComponent } from './nav-var/nav-var.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './carousel/carousel.component';
import { ProductosComponent } from './productos/productos.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { HomeComponent } from './home/home.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TasksComponent } from './tasks/tasks.component';
import { PrivateTasksComponent } from './private-tasks/private-tasks.component';
import { AuthGuard } from "./auth.guard";
import { TokenInterceptorService } from "./services/token-interceptor.service";
import { BottomNavbarComponent } from './bottom-navbar/bottom-navbar.component';
import { ContactFormComponent } from './contacto/contact-form/contact-form.component';
import { DownCompComponent } from './nav-var/down-comp/down-comp.component';
import { NuevoProductoComponent } from './nuevo-producto/nuevo-producto.component';
import { SingleProductComponent } from './productos/single-product/single-product.component';
import { FooterComponent } from './footer/footer.component';
import { JwtModule } from '@auth0/angular-jwt';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { CommonModule } from '@angular/common';
import { EditProductModalComponent } from './productos/edit-product-modal/edit-product-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AuthService } from './services/auth.service';
import { AltaClienteComponent } from './alta-cliente/alta-cliente.component';
import { CartComponent } from './cart/cart/cart.component';


@NgModule({
  declarations: [
    AppComponent,
    NavVarComponent,
    ProductosComponent,
    QuienesSomosComponent,
    ContactoComponent,
    HomeComponent,
    ProductCardComponent,
    LoginComponent,
    SignupComponent,
    TasksComponent,
    PrivateTasksComponent,
    BottomNavbarComponent,
    ContactFormComponent,
    DownCompComponent,
    NuevoProductoComponent,
    SingleProductComponent,
    FooterComponent,
    PerfilUsuarioComponent,
    EditProductModalComponent,
    AdminPanelComponent,
    AltaClienteComponent,
    CartComponent,

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CarouselComponent,
    FormsModule,
    RouterModule,
    HttpClientModule,
      JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'), // Obtén el token almacenado en localStorage
        allowedDomains: ['http://localhost:3000'], // Dominios permitidos (ajusta esto según tu servidor)
        disallowedRoutes: [], // Rutas excluidas (ajusta esto según tu servidor)
      },
    }),
      BrowserAnimationsModule,
  ],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    AuthService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
