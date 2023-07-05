import { Component } from '@angular/core';
import { AddMultipleProductsService } from 'src/app/services/add-multiple-products.service';

@Component({
  selector: 'app-add-multiple-products',
  templateUrl: './add-multiple-products.component.html',
  styleUrls: ['./add-multiple-products.component.css']
})
export class AddMultipleProductsComponent {
  productName !: string;
  products : any = [];
  displayedColumns = ['no', 'product_name', 'actions'];

  constructor(private addMultipleProductsService: AddMultipleProductsService) {}

  // add products to the table
  addProducts() {
    this.addMultipleProductsService.addProduct(this.productName);
    this.productName = '';
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.addMultipleProductsService.getProducts().subscribe(res=>{
      this.products = res;
    })
  }

}
