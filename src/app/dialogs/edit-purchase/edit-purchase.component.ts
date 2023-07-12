import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-purchase',
  templateUrl: './edit-purchase.component.html',
  styleUrls: ['./edit-purchase.component.css']
})
export class EditPurchaseComponent {

  constructor(public dialogRef: MatDialogRef<EditPurchaseComponent>) {}

  selectedProduct : any = {
    product_name: '',
    product_id: '',
    units: '',
    buying_price: ''
  };

  onCancelClick(): void {
    this.dialogRef.close();
  }


  updatePurchase() {

  }

}
