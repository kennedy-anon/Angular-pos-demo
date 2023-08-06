import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { SnackBarCustomService } from 'src/app/services/snack-bar-custom.service';

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

  constructor(public dialogRef: MatDialogRef<UserAccountSettingComponent>, private _snackBar: SnackBarCustomService, private authService: AuthService) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  saveNewPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this._snackBar.showErrorMessage("Passwords do not match.");
      return;
    }
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
