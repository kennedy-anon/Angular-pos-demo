import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddMultipleProductsService } from 'src/app/services/add-multiple-products.service';

@Component({
  selector: 'app-edit-product-name',
  templateUrl: './edit-product-name.component.html',
  styleUrls: ['./edit-product-name.component.css']
})
export class EditProductNameComponent {
  oldProductname !: string;
  productName !: string;

  constructor(public dialogRef: MatDialogRef<EditProductNameComponent>, private addMultipleProductsService: AddMultipleProductsService, @Inject(MAT_DIALOG_DATA) public data: {oldProductname: string}) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  updateProduct(product: any) {
    this.addMultipleProductsService.updateProduct(this.oldProductname, product);
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.oldProductname = this.data.oldProductname; //for later reference
    this.productName = this.data.oldProductname; // to be entered when opening form
  }

}
