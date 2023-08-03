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

  saveUser() {
    // this.usersService.addNewUser(this.user).subscribe()
  }

}
