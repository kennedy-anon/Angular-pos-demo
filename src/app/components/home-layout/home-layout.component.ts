import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent {
  mobileQuery: MediaQueryList;

  title = 'denloy-POS';
  currentYear = new Date().getFullYear();
  showList: boolean = false;
  expandPurchase: boolean = false;
  expandSales: boolean = false;
  userDetail : any;

  private _mobileQueryListener: () => void;

  constructor(private authService: AuthService, private router: Router, media: MediaMatcher, changeDetectorRef: ChangeDetectorRef) {
    this.mobileQuery = media.matchMedia('(max-width: 769px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  // expand products navBar
  showProductList() {
    this.showList = !this.showList;
  }

  // expand purchases navBar
  showPurchaseList() {
    this.expandPurchase = !this.expandPurchase;
  }

  // expand sale navBar
  showSalesList() {
    this.expandSales = !this.expandSales;
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
