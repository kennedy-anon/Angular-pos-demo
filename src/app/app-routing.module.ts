import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { AddMultipleProductsComponent } from './components/add-multiple-products/add-multiple-products.component';
import { LoginComponent } from './components/login/login.component';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { authGuard } from './guards/auth.guard';
import { adminGuard, cashierGuard } from './guards/access-level.guard';
import { AddPurchasesComponent } from './components/add-purchases/add-purchases.component';
import { PosComponent } from './components/pos/pos.component';
import { CreditSalesComponent } from './components/credit-sales/credit-sales.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'pos', component: PosComponent, canActivate:[authGuard, cashierGuard]},
  {path: '', component: HomeLayoutComponent, canActivate:[authGuard, adminGuard], children: [
    {path: 'products/add', component: AddProductsComponent, canActivate:[authGuard, adminGuard]},
    {path: 'products/add-multiple', component: AddMultipleProductsComponent, canActivate:[authGuard, adminGuard]},
    {path: 'purchases/add', component: AddPurchasesComponent, canActivate:[authGuard, adminGuard]},
    {path: 'sales/credit-sales', component: CreditSalesComponent, canActivate:[authGuard, adminGuard]},
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
