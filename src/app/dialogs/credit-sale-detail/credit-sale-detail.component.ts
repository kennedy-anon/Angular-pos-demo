import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SalesService } from 'src/app/services/sales.service';
import { SnackBarCustomService } from 'src/app/services/snack-bar-custom.service';

@Component({
  selector: 'app-credit-sale-detail',
  templateUrl: './credit-sale-detail.component.html',
  styleUrls: ['./credit-sale-detail.component.css']
})
export class CreditSaleDetailComponent {
  creditSaleDataSource = new MatTableDataSource<any>([]);
  productsDataSource = new MatTableDataSource<any>([]);
  paymentsDataSource = new MatTableDataSource<any>([]);
  creditSaleDisplayedColumns = ['created_at', 'customer_name', 'invoice_amount', 'invoice_paid', 'invoice_balance', 'customer_contact_no'];

  constructor(public dialogRef: MatDialogRef<CreditSaleDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: {invoiceData: any},
  private salesService: SalesService, private _snackBar: SnackBarCustomService) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.creditSaleDataSource.data.push(this.data.invoiceData);
    this.salesService.getCreditSaleDetail(this.data.invoiceData.invoice_no).subscribe({
      next: ((res: any) => {
        this.productsDataSource.data.push(res.products);
        this.paymentsDataSource.data.push(res.payments);
      }),
      error: (err => {
        if (err.status == 403) {
          this._snackBar.showErrorMessage("Session expired. Kindly login again.");
        }
      })
    });
  }
}
