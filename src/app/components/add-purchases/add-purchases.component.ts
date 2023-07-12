import { Component, ViewChild } from '@angular/core';
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  'HQC4LP3GHT',
  '1027660e333f8d26fcb7aad4eb0b8306'
);

@Component({
  selector: 'app-add-purchases',
  templateUrl: './add-purchases.component.html',
  styleUrls: ['./add-purchases.component.css']
})
export class AddPurchasesComponent {
  @ViewChild('searchBox') searchBox: any;
  selectedProduct : any = {
    product_name: '',
    product_id: '',
    units: '',
    buying_price: ''
  };

  displayedColumns = ['no', 'product_name', 'purchase_quantity', 'purchase_costs', 'actions'];
  purchases : any = [];

  config = {
    indexName: 'dev_DenloyPOS_dev_DenloyPOS',
    searchClient
  };

  // selected product
  selectProduct(product: any) {
    this.selectedProduct.product_name = product.product_name;
    this.selectedProduct.product_id = product.product_id;
    this.searchBox.state.clear();
  }

  // add purchase to the table
  addPurchase() {
    this.purchases = [...this.purchases, this.selectedProduct];
    this.selectedProduct = {
      product_name: '',
      product_id: '',
      units: '',
      buying_price: ''
    };

  }

  // delete product
  deletePurchase(product: any) {
    this.purchases.map((item:any, index:any) => {
      if (item.product_id == product.product_id) {
        this.purchases.splice(index, 1);
        this.purchases = [...this.purchases];
      }
    })
  }

  editPurchase(purchase: any) {
    
  }

}
