import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-account-setting',
  templateUrl: './user-account-setting.component.html',
  styleUrls: ['./user-account-setting.component.css']
})
export class UserAccountSettingComponent {
  userDetail : any;

  constructor(public dialogRef: MatDialogRef<UserAccountSettingComponent>, private authService: AuthService) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    const access_token = localStorage.getItem('access');

    if (access_token) {
      this.authService.getUserDetails(access_token).subscribe(res => {
        this.userDetail = res;
        console.log(this.userDetail);
      })
    }
  }

}
