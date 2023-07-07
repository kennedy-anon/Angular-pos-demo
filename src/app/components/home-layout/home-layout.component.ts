import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent {
  title = 'denloy-POS';
  currentYear = new Date().getFullYear();
  showList: boolean = false;
  expandPurchase: boolean = false;
  userDetail : any;

  constructor(private authService: AuthService, private router: Router) {}

  // expand products navBar
  showProductList() {
    this.showList = !this.showList;
  }

  // expand purchases navBar
  showPurchaseList() {
    this.expandPurchase = !this.expandPurchase;
  }

  // log out
  logout() {
    this.authService.logoutService();
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    const access_token = localStorage.getItem('access');

    if (access_token) {
      this.authService.getUserDetails(access_token).subscribe(res => {
        this.userDetail = res;
      })
    }
  }

}
