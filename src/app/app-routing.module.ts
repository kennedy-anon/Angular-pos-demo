import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { AddMultipleProductsComponent } from './components/add-multiple-products/add-multiple-products.component';
import { LoginComponent } from './components/login/login.component';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/access-level.guard';
import { AddPurchasesComponent } from './components/add-purchases/add-purchases.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: HomeLayoutComponent, canActivate:[authGuard, adminGuard], children: [
    {path: 'products/add', component: AddProductsComponent, canActivate:[authGuard, adminGuard]},
    {path: 'products/add-multiple', component: AddMultipleProductsComponent, canActivate:[authGuard, adminGuard]},
    {path: 'purchases/add', component: AddPurchasesComponent, canActivate:[authGuard, adminGuard]},
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
