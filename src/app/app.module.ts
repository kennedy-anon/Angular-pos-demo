import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AddProductsComponent } from './components/add-products/add-products.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AddMultipleProductsComponent } from './components/add-multiple-products/add-multiple-products.component';
import { MatTableModule } from '@angular/material/table';
import { EditProductNameComponent } from './dialogs/edit-product-name/edit-product-name.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LoginComponent } from './components/login/login.component';
import { HomeLayoutComponent } from './components/home-layout/home-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { AddPurchasesComponent } from './components/add-purchases/add-purchases.component';
import { NgAisModule } from 'angular-instantsearch';
import { EditPurchaseComponent } from './dialogs/edit-purchase/edit-purchase.component';
import { PosComponent } from './components/pos/pos.component';
import { ConfirmClearComponent } from './dialogs/confirm-clear/confirm-clear.component';
import { CreditSaleComponent } from './dialogs/credit-sale/credit-sale.component';
import { CreditSalesComponent } from './components/credit-sales/credit-sales.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { CreditSalePaymentComponent } from './dialogs/credit-sale-payment/credit-sale-payment.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProductsComponent,
    AddMultipleProductsComponent,
    EditProductNameComponent,
    LoginComponent,
    HomeLayoutComponent,
    AddPurchasesComponent,
    EditPurchaseComponent,
    PosComponent,
    ConfirmClearComponent,
    CreditSaleComponent,
    CreditSalesComponent,
    CreditSalePaymentComponent,
  ],
  imports: [
    NgAisModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule,
    HttpClientModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
