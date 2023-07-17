import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-credit-sale',
  templateUrl: './credit-sale.component.html',
  styleUrls: ['./credit-sale.component.css']
})
export class CreditSaleComponent {

  invoice : any;

  constructor(public dialogRef: MatDialogRef<CreditSaleComponent>) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  saveCreditSale() {
    
  }

}
