import { Component } from '@angular/core';

@Component({
  selector: 'app-add-multiple-products',
  templateUrl: './add-multiple-products.component.html',
  styleUrls: ['./add-multiple-products.component.css']
})
export class AddMultipleProductsComponent {
  productName !: string;

  // add products to the table
  addProducts() {
    console.log(this.productName);
  }

}
