import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {

  userData: any;

  constructor(private usersService: UsersService) {
    this.userData = this.usersService.getUserData();
  }
  
}
