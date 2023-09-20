import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TasksComponent } from './tasks/tasks.component';
import { PrivateTasksComponent } from './private-tasks/private-tasks.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from "./auth.guard";
import { NuevoProductoComponent } from './nuevo-producto/nuevo-producto.component';

const routes: Routes = [

 { path: '', component: HomeComponent }, //ruta inicial, si quisiera que me lleve a otra --> redirecTo: '/nombre_pag',pathMatch: 'full'
  { path: 'productos', component: ProductosComponent },
  { path: 'quienes-somos', component: QuienesSomosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'task', component: TasksComponent },
  { path: 'private-task', component: PrivateTasksComponent, canActivate: [ AuthGuard ] },
  { path: 'signup', component: SignupComponent },
  { path: 'nuevoProducto', component: NuevoProductoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

