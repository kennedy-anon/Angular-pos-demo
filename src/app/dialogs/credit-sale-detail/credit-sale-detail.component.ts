import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-credit-sale-detail',
  templateUrl: './credit-sale-detail.component.html',
  styleUrls: ['./credit-sale-detail.component.css']
})
export class CreditSaleDetailComponent {
  creditSaleDataSource = new MatTableDataSource<any>([]);
  creditSaleDisplayedColumns = ['created_at', 'customer_name', 'invoice_amount', 'invoice_paid', 'invoice_balance', 'customer_contact_no'];

  constructor(public dialogRef: MatDialogRef<CreditSaleDetailComponent>, @Inject(MAT_DIALOG_DATA) public data: {invoiceData: any}) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.creditSaleDataSource.data.push(this.data.invoiceData);
  }
}
