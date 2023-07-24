import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PurchasesService } from 'src/app/services/purchases.service';
import { SnackBarCustomService } from 'src/app/services/snack-bar-custom.service';

@Component({
  selector: 'app-product-purchase-history',
  templateUrl: './product-purchase-history.component.html',
  styleUrls: ['./product-purchase-history.component.css']
})
export class ProductPurchaseHistoryComponent {
  purchasesDataSource = new MatTableDataSource<any>([]);
  purchasesDisplayedColumns = ['no', 'created_at', 'units', 'buying_price'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialogRef: MatDialogRef<ProductPurchaseHistoryComponent>, private purchasesService: PurchasesService, 
    @Inject(MAT_DIALOG_DATA) public data: {product: any}, private _snackBar: SnackBarCustomService) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.purchasesService.getProductPurchases(this.data.product.product_id).subscribe({
      next: ((res: any) => {
        this.purchasesDataSource.data = res;
      }),
      error: (err => {
        if (err.status == 403) {
          this._snackBar.showErrorMessage("Session expired. Kindly login again.");
        }
      })
    });
    
  }

  ngAfterViewInit(): void {
    this.purchasesDataSource.paginator = this.paginator;
  }
}
