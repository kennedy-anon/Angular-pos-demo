import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-credit-sale',
  templateUrl: './credit-sale.component.html',
  styleUrls: ['./credit-sale.component.css']
})
export class CreditSaleComponent {

  invoice : any = {
    customer_name: '',
    customer_contact_no: '',
    invoice_paid: ''
  };

  constructor(public dialogRef: MatDialogRef<CreditSaleComponent>) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  saveCreditSale() {
    this.dialogRef.close(this.invoice);
  }

}
