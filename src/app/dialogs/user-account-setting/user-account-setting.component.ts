import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { SnackBarCustomService } from 'src/app/services/snack-bar-custom.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-account-setting',
  templateUrl: './user-account-setting.component.html',
  styleUrls: ['./user-account-setting.component.css']
})
export class UserAccountSettingComponent {
  userDetail : any = [];
  displayedColumns = ['username', 'first_name', 'last_name', 'email'];
  oldPassword !: string;
  newPassword !: string;
  confirmPassword !: string;

  constructor(public dialogRef: MatDialogRef<UserAccountSettingComponent>, private _snackBar: SnackBarCustomService, private authService: AuthService, 
    private usersService: UsersService) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  // user save password
  saveNewPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this._snackBar.showErrorMessage("Passwords do not match.");
      return;
    }

    this.usersService.userChangePassword(this.oldPassword, this.newPassword).subscribe({
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
          } else {
            this._snackBar.showErrorMessage(err.error.detail);
          }
        }
      })
    });
  }

  ngOnInit(): void {
    const access_token = localStorage.getItem('access');

    if (access_token) {
      this.authService.getUserDetails(access_token).subscribe(res => {
        this.userDetail = [...this.userDetail, res];
      })
    }
  }

}
