import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import algoliasearch from 'algoliasearch/lite';
import { ConfirmClearComponent } from 'src/app/dialogs/confirm-clear/confirm-clear.component';

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
  config = {
    indexName: 'dev_DenloyPOS_dev_DenloyPOS',
    searchClient
  };

  displayedColumns = ['no', 'product_name', 'units', 'unit_price', 'sub_total', 'actions'];
  footerColumns = ['unit_price', 'sub_total'];
  products : any = [];

  currentProduct : any = {
    product_name: '',
    product_id: '',
    units: '1',
    unitPrice: '',
    min_selling_price: '',
    amount: 0
  }

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmClearComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'clear' ){
        this.products = []; // clearing products
      }
    });
  }

  // selected product
  selectProduct(product: any) {
    this.products = [...this.products, {
      product_name: product.product_name,
      product_id: product.product_id,
      units: '1',
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

  onSaleSubmit() {
    console.log(this.products);
  }

  // cash sale
  cashSale() {
    console.log(this.products);
  }

  logout() {

  }

}
