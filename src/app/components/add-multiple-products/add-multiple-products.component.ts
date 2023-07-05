import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditProductNameComponent } from 'src/app/dialogs/edit-product-name/edit-product-name.component';
import { AddMultipleProductsService } from 'src/app/services/add-multiple-products.service';
import { SnackBarCustomComponent } from '../snack-bar-custom/snack-bar-custom.component';

@Component({
  selector: 'app-add-multiple-products',
  templateUrl: './add-multiple-products.component.html',
  styleUrls: ['./add-multiple-products.component.css']
})
export class AddMultipleProductsComponent {
  @ViewChild('_snackbar') _snackbar !: SnackBarCustomComponent;
  productName !: string;
  products : any = [];
  displayedColumns = ['no', 'product_name', 'actions'];

  constructor(private addMultipleProductsService: AddMultipleProductsService, public dialog: MatDialog) {}

  openDialog(product: any): void {
    const dialogRef = this.dialog.open(EditProductNameComponent, {
      height: '200px',
      width: '600px',
      data: {oldProductname: product},
    });

    dialogRef.afterClosed().subscribe(result => {
      //
    });
  }

  // add products to the table
  addProducts() {
    this.addMultipleProductsService.addProduct(this.productName);
    this.productName = '';
  }

  // delete row
  deleteProduct(product: any) {
    this.addMultipleProductsService.deleteProduct(product);
    // this._snackBar.open(product + " deleted.");
    this._snackbar.showSuccessMessage(product + " deleted.");
  }

  // editing product name
  editProduct(product:any) {
    this.openDialog(product);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.addMultipleProductsService.getProducts().subscribe(res=>{
      this.products = [...res].reverse();
    })
  }

}
