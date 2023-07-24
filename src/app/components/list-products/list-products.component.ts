import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDeleteComponent } from 'src/app/dialogs/confirm-delete/confirm-delete.component';
import { EditProductDetailsComponent } from 'src/app/dialogs/edit-product-details/edit-product-details.component';
import { ProductPurchaseHistoryComponent } from 'src/app/dialogs/product-purchase-history/product-purchase-history.component';
import { ProductsService } from 'src/app/services/products.service';
import { SnackBarCustomService } from 'src/app/services/snack-bar-custom.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent {
  defaultFilterPredicate !: (data: any, filter: string) => boolean;
  product_name_filter !: string;
  productsDataSource = new MatTableDataSource<any>([]);
  productsDisplayedColumns = ['no', 'product_name', 'available_units', 'min_selling_price', 'min_units_alert', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private productsService: ProductsService, private _snackBar: SnackBarCustomService) {}
  
  // open edit product detail
  openEditProduct(product: any) {
    const dialogRef = this.dialog.open(EditProductDetailsComponent, {
      data: {product: product},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchProducts();
      if (result != undefined ){
        // do nothing
      }
    });
  }

  // view purchase history for the product
  openPurchaseHistory(product: any) {
    const dialogRef = this.dialog.open(ProductPurchaseHistoryComponent, {
      data: {product: product},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined ){
        // do nothing
      }
    });
  }

  confirmDeleteProduct(product: any) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {name: product.product_name},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete' ){
        this.deleteProduct(product);
      }
    });
  }

  deleteProduct(product: any) {
    this.productsService.deleteProduct(product.product_id).subscribe({
      next: (res => {
        res.status == 204 ? this._snackBar.showSuccessMessage(`'${product.product_name}' deleted successfully.`) : undefined;
        this.fetchProducts(); // refreshing
      }),
      error: (err => {
        if (err.status == 403) {
          this._snackBar.showErrorMessage("Session expired. Kindly login again.");
        }
      })
    })
  }

  // filter by product name
  filterByName(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productsDataSource.filter = filterValue.trim().toLowerCase();
  }

  clearFilters(){
    this.productsDataSource.filterPredicate = this.defaultFilterPredicate;
    this.productsDataSource.filter = '';
    this.product_name_filter = '';
  }

  fetchProducts() {
    this.productsService.listProducts().subscribe({
      next: ((res: any) => {
        this.productsDataSource.data = res;
      }),
      error: (err => {
        if (err.status == 403) {
          this._snackBar.showErrorMessage("Session expired. Kindly login again.");
        }
      })
    });
  }

  ngOnInit(): void {
    this.defaultFilterPredicate = this.productsDataSource.filterPredicate;
    this.fetchProducts();
  }

  ngAfterViewInit(): void {
    this.productsDataSource.paginator = this.paginator;
    this.productsDataSource.sort = this.sort;
  }

}
