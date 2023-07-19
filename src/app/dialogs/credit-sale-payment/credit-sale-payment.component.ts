import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PaymentsService } from 'src/app/services/payments.service';
import { SnackBarCustomService } from 'src/app/services/snack-bar-custom.service';

@Component({
  selector: 'app-credit-sale-payment',
  templateUrl: './credit-sale-payment.component.html',
  styleUrls: ['./credit-sale-payment.component.css']
})
export class CreditSalePaymentComponent {
  credit_payment : any = {
    amount : '',
    invoice_no: ''
  }
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns = ['created_at', 'customer_name', 'invoice_amount', 'invoice_paid', 'invoice_balance', 'customer_contact_no'];

  constructor(public dialogRef: MatDialogRef<CreditSalePaymentComponent>, @Inject(MAT_DIALOG_DATA) public data: {invoiceData: any}, 
  private paymentsService: PaymentsService, private _snackBar: SnackBarCustomService) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  savePayment() {
    this.credit_payment.invoice_no = this.dataSource.data[0].invoice_no;
    this.paymentsService.saveCreditSalePayment(this.credit_payment).subscribe({
      next: (res => {
        res.status == 201 ? this._snackBar.showSuccessMessage((res.body as any)?.detail): undefined;
        this.dialogRef.close('save');
      }),
      error: (err => {
        if (err.status == 403) {
          this._snackBar.showErrorMessage("Session expired. Kindly login again.");
        }
      })
    });
  }

  ngOnInit(): void {
    this.dataSource.data.push(this.data.invoiceData);
  }

}
