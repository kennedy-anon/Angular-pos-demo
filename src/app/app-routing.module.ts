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
import { ListProductsComponent } from './components/list-products/list-products.component';
import { StockRunningLowComponent } from './components/stock-running-low/stock-running-low.component';
import { AllSalesComponent } from './components/all-sales/all-sales.component';
import { ListPurchasesComponent } from './components/list-purchases/list-purchases.component';
import { ProductSalesReportComponent } from './components/product-sales-report/product-sales-report.component';
import { HomeComponent } from './components/home/home.component';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'pos', component: PosComponent, canActivate:[authGuard, cashierGuard]},
  {path: '', component: HomeLayoutComponent, canActivate:[authGuard, adminGuard], children: [
    {path: 'home', component: HomeComponent, canActivate:[authGuard, adminGuard]},
    {path: 'products/add', component: AddProductsComponent, canActivate:[authGuard, adminGuard]},
    {path: 'products/add-multiple', component: AddMultipleProductsComponent, canActivate:[authGuard, adminGuard]},
    {path: 'products/list', component: ListProductsComponent, canActivate:[authGuard, adminGuard]},
    {path: 'products/low-stock', component: StockRunningLowComponent, canActivate:[authGuard, adminGuard]},
    {path: 'purchases/add', component: AddPurchasesComponent, canActivate:[authGuard, adminGuard]},
    {path: 'purchases/list', component: ListPurchasesComponent, canActivate:[authGuard, adminGuard]},
    {path: 'sales/credit-sales', component: CreditSalesComponent, canActivate:[authGuard, adminGuard]},
    {path: 'sales/all', component: AllSalesComponent, canActivate:[authGuard, adminGuard]},
    {path: 'sales/product-report', component: ProductSalesReportComponent, canActivate:[authGuard, adminGuard]},
    {path: 'users', component: ListUsersComponent, canActivate:[authGuard, adminGuard]},
    {path: 'users/edit', component: EditUserComponent, canActivate:[authGuard, adminGuard]},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
