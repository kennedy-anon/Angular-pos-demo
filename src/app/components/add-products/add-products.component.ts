import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { SnackBarCustomService } from 'src/app/services/snack-bar-custom.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {
  name !: string;
  min_SP !: string;

  constructor(private productsService: ProductsService, private _snackBar: SnackBarCustomService) {}

  addProduct() {
    const product = {
      product_name: this.name,
      min_selling_price: this.min_SP ? this.min_SP : null
    }
    
    this.productsService.addProductService(product).subscribe({
      next: (res =>{
        res.status == 201 ? this._snackBar.showSuccessMessage((res.body as any)?.product_name + " saved successfully."): undefined;
        this.clearFields();
      }),
      error: (err =>{
        if (err.status == 400) {
          this._snackBar.showErrorMessage(err.error.detail);
        } else if (err.status == 403) {
          this._snackBar.showErrorMessage("Session expired. Kindly login again.");
        }
      })
    });
  }

  clearFields() {
    this.name = '';
    this.min_SP = '';
  }
}
