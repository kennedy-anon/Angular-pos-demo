import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackBarCustomService } from 'src/app/services/snack-bar-custom.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  user: any;

  constructor(public dialogRef: MatDialogRef<AddUserComponent>, private _snackBar: SnackBarCustomService) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  saveUser() {
    
  }

}
