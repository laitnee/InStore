import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'login/:redirectUrl', component: LoginComponent},
  { path: 'user', loadChildren: './user/user.module#UserModule'},
  { path: 'inventory', loadChildren: './inventory/inventory.module#InventoryModule'},
  { path: 'manager', loadChildren: './manager/manager.module#ManagerModule'},
  { path: 'checkout', loadChildren: './checkout/checkout.module#CheckoutModule'},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
