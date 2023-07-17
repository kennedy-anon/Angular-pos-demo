import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import algoliasearch from 'algoliasearch/lite';
import { ConfirmClearComponent } from 'src/app/dialogs/confirm-clear/confirm-clear.component';
import { CreditSaleComponent } from 'src/app/dialogs/credit-sale/credit-sale.component';
import { AuthService } from 'src/app/services/auth.service';
import { PosService } from 'src/app/services/pos.service';
import { SnackBarCustomService } from 'src/app/services/snack-bar-custom.service';

const searchClient = algoliasearch(
  'HQC4LP3GHT',
  '1027660e333f8d26fcb7aad4eb0b8306'
);

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent {
  @ViewChild('searchBox') searchBox: any;
  @ViewChild('posForm') form!: NgForm;
  config = {
    indexName: 'dev_DenloyPOS_dev_DenloyPOS',
    searchClient
  };

  displayedColumns = ['no', 'product_name', 'units', 'unit_price', 'sub_total', 'actions'];
  footerColumns = ['unit_price', 'sub_total'];
  products : any = [];
  cash_received !: number;
  change : number = 0;
  saleType !: string;
  submitPOS : boolean = false;

  currentProduct : any = {
    product_name: '',
    product_id: '',
    units: 1,
    unitPrice: '',
    min_selling_price: '',
    amount: 0
  }

  constructor(public dialog: MatDialog, private authService: AuthService, private router: Router, private _snackBar: SnackBarCustomService, private posService: PosService) {}

  // clearing form
  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmClearComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'clear' ){
        this.clearFields();
      }
    });
  }

  // selected product
  selectProduct(product: any) {
    this.products = [...this.products, {
      product_name: product.product_name,
      product_id: product.product_id,
      units: 1,
      unitPrice: '',
      min_selling_price: product.min_selling_price,
      amount: 0
    }];

    this.searchBox.state.clear();
  }

  // delete product
  deleteProduct(product: any) {
    this.products.map((item:any, index:any) => {
      if (item.product_id == product.product_id) {
        this.products.splice(index, 1);
        this.products = [...this.products];
      }
    })
  }

  // update subtotal
  updateSubTotal(product: any) {
    const subTotal = Number(product.units) * Number(product.unitPrice);
    product.amount = isNaN(subTotal) ? 0 : subTotal;
  }

  // total for sub total
  getTotal() {
    return this.products.reduce((total: number, product: any) => total + product.amount, 0);
  }

  // calculate change
  calculateChange() {
    this.submitPOS = false;
    if (this.cash_received && (this.cash_received >= this.getTotal())) {
      this.change = this.cash_received - this.getTotal();
    }
  }

  // completing sale
  onSaleSubmit() {
    if (this.submitPOS) {
      const saleDetail = {
        products: this.products,
        sale_type: this.saleType,
        total_sales: this.getTotal(),
        cash_received: this.cash_received ? this.cash_received : null,
        change: this.change ? this.change : null,
        invoice: {
            customer_name: "Chrisitne Muthoni",
            customer_contact_no: "0712345678",
            invoice_amount: this.getTotal() ? this.getTotal() : null,
            invoice_paid: 0
        }
      }
      
      this.posService.saveSale(saleDetail).subscribe({
        next: (res => {
          res.status == 201 ? this._snackBar.showSuccessMessage((res.body as any)?.detail): undefined;
          this.clearFields();
        }),
        error: (err => {
          if (err.status == 403) {
            this._snackBar.showErrorMessage("Session expired. Kindly login again.");
          }
          console.log(err);
        })
      });

    }
  }

  // cash sale
  cashSale() {
    this.saleType = 'cash';
    this.submitPOS = true;
  }

  // credit sale
  creditSale() {
    this.saleType = 'credit';
    this.submitPOS = true;
  }

  openCreditSale(): void {
    const dialogRef = this.dialog.open(CreditSaleComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined ){
        // credit sale
      }
    });
  }

  clearFields() {
    this.form.resetForm();
    this.products = [];
    this.saleType = '';
    this.change = 0;
    this.submitPOS = false;
  }

  logout() {
    this.authService.logoutService();
    this.router.navigate(['/login']);
    this._snackBar.showSuccessMessage('Logged out successfully.');
  }

}
