import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackBarCustomService } from 'src/app/services/snack-bar-custom.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  user: any = {
    username: '', 
    password: '',
    confirm_password: '',
    email: '',
    first_name: '',
    last_name: ''
  };

  constructor(public dialogRef: MatDialogRef<AddUserComponent>, private _snackBar: SnackBarCustomService, private usersService: UsersService) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  handleSaveErrors(err: any) {
    if (err.error.username) {
      this._snackBar.showErrorMessage((err.error.username.join('\n')));
    } else if (err.error.password) {
      this._snackBar.showErrorMessage((err.error.password.join('\n')));
    }
  }

  saveUser() {
    if (this.user.password !== this.user.confirm_password) {
      this._snackBar.showErrorMessage("Passwords do not match.");
      return;
    }

    // submitting form
    this.usersService.addNewUser(this.user).subscribe({
      next: ((res: any) => {
        res.status == 201 ? this._snackBar.showSuccessMessage((res.body as any)?.detail): undefined;
        this.dialogRef.close('created');
      }),
      error: (err => {
        if (err.status == 403) {
          this._snackBar.showErrorMessage("Session expired. Kindly login again.");
        } else if (err.status == 400) {
          this.handleSaveErrors(err);
        }
      })
    });
  }

}
