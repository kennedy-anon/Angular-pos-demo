import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products.service';
import { SnackBarCustomService } from 'src/app/services/snack-bar-custom.service';

@Component({
  selector: 'app-edit-opening-stock',
  templateUrl: './edit-opening-stock.component.html',
  styleUrls: ['./edit-opening-stock.component.css']
})
export class EditOpeningStockComponent {

  product: any;

  constructor(public dialogRef: MatDialogRef<EditOpeningStockComponent>, @Inject(MAT_DIALOG_DATA) public data: {product: any}, private productsService: ProductsService, 
  private _snackBar: SnackBarCustomService) {
    this.product = this.data.product;
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  updateOpeningStock() {
    
  }

}
