import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css']
})
export class AddProductsComponent {
  name !: string;
  min_SP !: string;

  constructor(private productsService: ProductsService) {}

  addProduct() {
    const product = {
      "product_name": this.name,
      "min_selling_price": this.min_SP
    }
    
    this.productsService.addProductService(product).subscribe(res => {
      console.log(res);
    })
  }
}
