import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { AddMultipleProductsComponent } from './components/add-multiple-products/add-multiple-products.component';

const routes: Routes = [
  {path: 'products/add', component: AddProductsComponent},
  {path: 'products/add-multiple', component: AddMultipleProductsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
