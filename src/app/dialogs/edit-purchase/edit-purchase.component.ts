import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-purchase',
  templateUrl: './edit-purchase.component.html',
  styleUrls: ['./edit-purchase.component.css']
})
export class EditPurchaseComponent {

  constructor(public dialogRef: MatDialogRef<EditPurchaseComponent>, @Inject(MAT_DIALOG_DATA) public data: {selectedPurchase: any}) {}

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
    this.dialogRef.close(this.selectedProduct);
  }

  ngOnInit(): void {
    this.selectedProduct = this.data.selectedPurchase;
  }

}
