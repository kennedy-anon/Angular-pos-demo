import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SnackBarCustomService } from 'src/app/services/snack-bar-custom.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username !: string;
  password !:string;

  constructor(private authService: AuthService, private router: Router, private _snackBar: SnackBarCustomService) {}

  login() {
    const credentials = {
      username: this.username,
      password: this.password
    }

    this.authService.loginService(credentials).subscribe({
      next: (res => {
        this._snackBar.showSuccessMessage(res);
        this.getAccessGroups();
      }),
      error: (err => {
        this._snackBar.showErrorMessage(err);
      })
    })
  }

  getAccessGroups() {
    this.authService.getAccessGroups().subscribe({
      next: ((res: any) => {
        if (res.groups.includes('SystemAdmin')) {
          this.router.navigate(['home']);
        } else if (res.groups.includes('Cashier')) {
          this.router.navigate(['/pos']);
        } else {
          this.router.navigate(['']);
        }
      }),
      error: (err => {
      })
    })
  }

}
