import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackBarCustomService } from 'src/app/services/snack-bar-custom.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent {
  user: any;
  newPassword !: string;
  confirmPassword !: NewPasswordComponent;

  constructor(public dialogRef: MatDialogRef<NewPasswordComponent>, @Inject(MAT_DIALOG_DATA) public data: {user: any}, private _snackBar: SnackBarCustomService) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  saveNewPassword() {

  }

  ngOnInit(): void {
    this.user = this.data.user;
    console.log(this.user);
  }
}
