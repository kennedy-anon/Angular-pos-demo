import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'denloy-POS';

  showList: boolean = false;

  showProductList() {
    this.showList = !this.showList;
  }
}
