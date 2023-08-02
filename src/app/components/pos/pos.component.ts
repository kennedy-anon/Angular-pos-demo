import { HttpResponse } from '@angular/common/http';
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
  invoice : any = {
    customer_name: '',
    customer_contact_no: '',
    invoice_paid: ''
  };

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

  // handle success save response
  handleSuccessResponse(res : any) {
    if (res instanceof HttpResponse) {
      const contentType = res.headers.get('content-type');

      if ((contentType === 'application/json') && (res.status == 201)) {
        // credit sale saved
      } else if ((contentType === 'application/pdf') && (res.status == 200)) {
        const blob = new Blob([res.body], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        iframe.addEventListener('load', () => {
          iframe.contentWindow?.print();
        });
      }
    }
    
    this._snackBar.showSuccessMessage('Sale added successfully.');
    this.clearFields();
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
            customer_name: this.invoice.customer_name ? this.invoice.customer_name : '',
            customer_contact_no: this.invoice.customer_contact_no ? this.invoice.customer_contact_no : '',
            invoice_amount: this.getTotal() ? this.getTotal() : null,
            invoice_paid: this.invoice.invoice_paid ? this.invoice.invoice_paid : null
        }
      }
      
      this.posService.saveSale(saleDetail).subscribe({
        next: (res => {
          this.handleSuccessResponse(res);
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
    this.onSaleSubmit();
  }

  // collect credit sale details
  openCreditSale(): void {
    if (this.form.valid && (this.products.length != 0)) {
      const dialogRef = this.dialog.open(CreditSaleComponent, {
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result != undefined ){
          this.invoice = result;
          this.creditSale();
        }
      });
    }
    
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
