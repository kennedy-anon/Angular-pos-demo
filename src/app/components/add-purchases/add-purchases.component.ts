import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import algoliasearch from 'algoliasearch/lite';
import { EditPurchaseComponent } from 'src/app/dialogs/edit-purchase/edit-purchase.component';
import { PurchasesService } from 'src/app/services/purchases.service';
import { SnackBarCustomService } from 'src/app/services/snack-bar-custom.service';

const searchClient = algoliasearch(
  'HQC4LP3GHT',
  '1027660e333f8d26fcb7aad4eb0b8306'
);

@Component({
  selector: 'app-add-purchases',
  templateUrl: './add-purchases.component.html',
  styleUrls: ['./add-purchases.component.css']
})
export class AddPurchasesComponent {
  @ViewChild('searchBox') searchBox: any;
  selectedProduct : any = {
    product_name: '',
    product_id: '',
    units: '',
    buying_price: ''
  };

  displayedColumns = ['no', 'product_name', 'purchase_quantity', 'purchase_costs', 'actions'];
  purchases : any = [];

  config = {
    indexName: 'dev_DenloyPOS_dev_DenloyPOS',
    searchClient
  };

  constructor(public dialog: MatDialog, private _snackBar: SnackBarCustomService, private purchasesService: PurchasesService) {}

  openDialog(purchase: any): void {
    const dialogRef = this.dialog.open(EditPurchaseComponent, {
      data: {selectedPurchase: purchase},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined ){
        //update purchases
        this._snackBar.showSuccessMessage(result.product_name + ' updated successfully.');
      }
    });
  }

  // selected product
  selectProduct(product: any) {
    this.selectedProduct.product_name = product.product_name;
    this.selectedProduct.product_id = product.product_id;
    this.searchBox.state.clear();
  }

  // add purchase to the table
  addPurchase() {
    this.purchases = [...this.purchases, this.selectedProduct];
    this.selectedProduct = {
      product_name: '',
      product_id: '',
      units: '',
      buying_price: ''
    };

  }

  // delete product
  deletePurchase(product: any) {
    this.purchases.map((item:any, index:any) => {
      if (item.product_id == product.product_id) {
        this.purchases.splice(index, 1);
        this.purchases = [...this.purchases];
        this._snackBar.showSuccessMessage(product.product_name + " deleted.");
      }
    })
  }

  editPurchase(purchase: any) {
    this.openDialog(purchase);
  }

  savePurchases() {
    this.purchasesService.savePurchases(this.purchases).subscribe({
      next: (res =>{
        res.status == 201 ? this._snackBar.showSuccessMessage((res.body as any)?.detail): undefined;
        this.purchases = [];
      }),
      error: (err => {
        if (err.status == 403) {
          this._snackBar.showErrorMessage("Session expired. Kindly login again.");
        }
      })
    });
  }

  clearPurchases() {
    this.purchases = [];
    this._snackBar.showSuccessMessage('Purchases cleared.');
  }

}
