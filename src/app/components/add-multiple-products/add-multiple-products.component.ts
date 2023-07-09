import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditProductNameComponent } from 'src/app/dialogs/edit-product-name/edit-product-name.component';
import { AddMultipleProductsService } from 'src/app/services/add-multiple-products.service';
import { ProductsService } from 'src/app/services/products.service';
import { SnackBarCustomService } from 'src/app/services/snack-bar-custom.service';

@Component({
  selector: 'app-add-multiple-products',
  templateUrl: './add-multiple-products.component.html',
  styleUrls: ['./add-multiple-products.component.css']
})
export class AddMultipleProductsComponent {
  productName !: string;
  products : any = [];
  displayedColumns = ['no', 'product_name', 'actions'];
  saveComplete = false;

  constructor(private addMultipleProductsService: AddMultipleProductsService, public dialog: MatDialog, private _snackBar: SnackBarCustomService, 
    private productsService: ProductsService) {}

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
    this._snackBar.showSuccessMessage(product + " deleted.");
  }

  // editing product name
  editProduct(product:any) {
    this.openDialog(product);
  }

  // clear the whole table
  clearProducts() {
    this.addMultipleProductsService.clearProducts();
    this._snackBar.showSuccessMessage("Products cleared.");
  }

  // save products
  saveProducts() {
    var productCount = this.products.length;
    for (let product in this.products) {
      const productDetail = {
        product_name: this.products[product],
        min_selling_price: null
      }

      this.productsService.addProductService(productDetail).subscribe({
        next: (res =>{
          res.status == 201 ? this.addMultipleProductsService.deleteProduct((res.body as any)?.product_name): undefined;
          productCount -= 1;
          productCount == 0 ? this.saveComplete = true : undefined;
        }),
        error: (err =>{
          if (err.status == 400) {
            this._snackBar.showErrorMessage(err.error.product_name + " - " + err.error.detail);
          } else if (err.status == 403) {
            this._snackBar.showErrorMessage("Session expired. Kindly login again.");
          }
          productCount -= 1;
          productCount == 0 ? this.saveComplete = true : undefined;
        })
      });

    }
  }

  // hides the saving complete message displayed after products are saved
  hideSaveMessage() {
    this.saveComplete =false;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.addMultipleProductsService.getProducts().subscribe(res=>{
      this.products = [...res].reverse();
    })
  }

}
