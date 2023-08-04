import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackBarCustomService } from 'src/app/services/snack-bar-custom.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent {
  user: any;
  newPassword !: string;
  confirmPassword !: string;

  constructor(public dialogRef: MatDialogRef<NewPasswordComponent>, @Inject(MAT_DIALOG_DATA) public data: {user: any}, private _snackBar: SnackBarCustomService, 
  private usersService: UsersService) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  saveNewPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this._snackBar.showErrorMessage("Passwords do not match.");
      return;
    }

    if (this.user.user_id) {
      const pass = {
        new_password: this.newPassword
      }

      this.usersService.saveNewPassword(pass, this.user.user_id).subscribe({
        next: (res => {
          res.status == 200 ? this._snackBar.showSuccessMessage((res.body as any)?.detail): undefined;
          this.dialogRef.close();
        }),
        error: (err => {
          if (err.status == 403) {
            this._snackBar.showErrorMessage("Session expired. Kindly login again.");
          } else if (err.status == 400) {
            if (err.error.new_password) {
              this._snackBar.showErrorMessage((err.error.new_password.join('\n')));
            }
          }
        })
      });
    }

  }

  ngOnInit(): void {
    this.user = this.data.user;
  }
}
