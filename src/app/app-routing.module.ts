import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosComponent } from './productos/productos.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from "./auth.guard";
import { NuevoProductoComponent } from './nuevo-producto/nuevo-producto.component';
import { SingleProductComponent } from './productos/single-product/single-product.component';
import { PerfilUsuarioComponent } from './perfil-usuario/perfil-usuario.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AltaClienteComponent } from './alta-cliente/alta-cliente.component';
import { CartComponent } from './cart/cart/cart.component';
import { RetrievePassComponent } from './login/retrieve-pass/retrieve-pass.component';
import { AltaProveedorComponent } from './alta-proveedor/alta-proveedor.component';
import { IngresoStockComponent } from './ingreso-stock/ingreso-stock.component';
import { UdProveedorComponent } from './ud-proveedor/ud-proveedor.component';
import { OrdersComponent } from './orders/orders.component';
import { PedidosAdminComponent } from './pedidos-admin/pedidos-admin.component';
const routes: Routes = [

 { path: '', component: HomeComponent }, //ruta inicial, si quisiera que me lleve a otra --> redirecTo: '/nombre_pag',pathMatch: 'full'
  { path: 'productos', component: ProductosComponent },
  { path: 'quienes-somos', component: QuienesSomosComponent },
  { path: 'contacto', component: ContactoComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'nuevo-producto', component: NuevoProductoComponent },
  { path: 'product/:id', component: SingleProductComponent },
  { path: 'perfilUsuario', component: PerfilUsuarioComponent},
  { path: 'cart', component: CartComponent },
  { path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuard], data: { expectedRole: 'Administrador' }},
  { path: 'alta-usuario', component: AltaClienteComponent,canActivate: [AuthGuard], data: { expectedRole: 'Administrador'}},
  { path: 'ingreso-stock', component: IngresoStockComponent,canActivate: [AuthGuard], data: { expectedRole: 'Administrador'}},
  {path:'retrieve-pass',component:RetrievePassComponent},
  {path: 'alta-proveedor', component:AltaProveedorComponent,canActivate: [AuthGuard], data: { expectedRole: 'Administrador'} },
  {path: 'ud-proveedor', component:UdProveedorComponent,canActivate: [AuthGuard], data: { expectedRole: 'Administrador'}},
  {path: 'myorders', component:OrdersComponent},
  {path: 'pedidos', component:PedidosAdminComponent,canActivate: [AuthGuard], data: { expectedRole: 'Administrador'} },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

