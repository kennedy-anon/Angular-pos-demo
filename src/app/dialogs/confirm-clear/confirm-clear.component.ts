import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-clear',
  templateUrl: './confirm-clear.component.html',
  styleUrls: ['./confirm-clear.component.css']
})
export class ConfirmClearComponent {

  constructor(public dialogRef: MatDialogRef<ConfirmClearComponent>) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  clear() {
    this.dialogRef.close('clear');
  }
}
