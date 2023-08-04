import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBarCustomService } from 'src/app/services/snack-bar-custom.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  userData: any;
  user: any = {
    is_active: false,
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    SystemAdmin: false,
    Cashier: false
  }

  constructor(private usersService: UsersService, private router: Router, private _snackBar: SnackBarCustomService) {
    this.userData = this.usersService.getUserData();
  }

  // saving update
  updateUser() {
    const permissions = this.assignGroupIds();

    const newUserData = {
      user_id: this.user.user_id,
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      username: this.user.username,
      email: this.user.email,
      is_active: this.user.is_active,
      group_ids: permissions.group_ids,
      remove_group_ids: permissions.remove_group_ids
    }

    this.usersService.updateUser(newUserData).subscribe({
      next: (res => {
        res.status == 200 ? this._snackBar.showSuccessMessage((res.body as any)?.detail): undefined;
        this.router.navigate(['/users']);
      }),
      error: (err => {
        if (err.status == 403) {
          this._snackBar.showErrorMessage("Session expired. Kindly login again.");
        } else if (err.status == 400) {
          this._snackBar.showErrorMessage(err.error.detail);
        }
      })
    });

  }

  // assigning permission groups ids
  assignGroupIds() {
    const permissionGroups = [
      { prop: 'SystemAdmin', id: 1 },
      { prop: 'Cashier', id: 2 }
    ];
  
    const group_ids: number[] = [];
    const remove_group_ids: number[] = [];
  
    permissionGroups.forEach(permission => {
      if (this.user[permission.prop]) {
        group_ids.push(permission.id);
      } else {
        remove_group_ids.push(permission.id);
      }
    });

    return {group_ids, remove_group_ids}
  }

  initializeFieldValues() {
    this.user.user_id = this.userData?.id || '';
    this.user.first_name = this.userData?.first_name || '';
    this.user.last_name = this.userData?.last_name || '';
    this.user.username = this.userData?.username || '';
    this.user.email = this.userData?.email || '';
    this.user.is_active = this.userData?.is_active || false;
    this.user.SystemAdmin = this.userData?.user_groups.some((group: { id: number, name: string }) => group.name === 'SystemAdmin');
    this.user.Cashier = this.userData?.user_groups.some((group: { id: number, name: string }) => group.name === 'Cashier');
  }
  
  ngOnInit(): void {
    if (this.userData === undefined) {
      this.router.navigate(['/users']);
    }

    this.initializeFieldValues();
  }
}
