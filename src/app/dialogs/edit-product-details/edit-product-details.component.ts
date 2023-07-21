import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-product-details',
  templateUrl: './edit-product-details.component.html',
  styleUrls: ['./edit-product-details.component.css']
})
export class EditProductDetailsComponent {

  product : any = {

  }

  constructor(public dialogRef: MatDialogRef<EditProductDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: {product: any}) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  updateProductDetail() {
    
  }

  ngOnInit(): void {
    this.product = this.data.product;
  }
}
