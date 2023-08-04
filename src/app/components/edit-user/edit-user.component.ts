import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private usersService: UsersService, private router: Router) {
    this.userData = this.usersService.getUserData();
  }

  initializeFieldValues() {
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
