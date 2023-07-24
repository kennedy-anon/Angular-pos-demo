import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products.service';
import { SnackBarCustomService } from 'src/app/services/snack-bar-custom.service';

@Component({
  selector: 'app-edit-product-details',
  templateUrl: './edit-product-details.component.html',
  styleUrls: ['./edit-product-details.component.css']
})
export class EditProductDetailsComponent {

  product : any = {
  }

  constructor(public dialogRef: MatDialogRef<EditProductDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: {product: any}, private productsService: ProductsService, 
  private _snackBar: SnackBarCustomService) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  updateProductDetail() {
    this.productsService.updateProduct(this.product, this.product.product_id).subscribe({
      next: (res => {
        res.status == 200 ? this._snackBar.showSuccessMessage('Product updated successfully.') : undefined;
        this.dialogRef.close('success');
      }),
      error: (err => {
        if (err.status == 403) {
          this._snackBar.showErrorMessage("Session expired. Kindly login again.");
        } else if (err.status == 400) {
          this._snackBar.showErrorMessage("Product with this product name already exists.");
        }

      })
    });
  }

  ngOnInit(): void {
    this.product = this.data.product;
  }
}
