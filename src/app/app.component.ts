import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'denloy-POS';
  currentYear = new Date().getFullYear();

  showList: boolean = false;
  expandPurchase: boolean = false;

  showProductList() {
    this.showList = !this.showList;
  }

  showPurchaseList() {
    this.expandPurchase = !this.expandPurchase;
  }
}
