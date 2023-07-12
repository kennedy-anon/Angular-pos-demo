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
  product_name !: string;
  quantity !: number;
  purchase_costs !: number;
  isDisabled : boolean = false; // disables product name input field
  selectedProduct : any;

  displayedColumns = ['no', 'product_name', 'purchase_quantity', 'purchase_costs', 'actions'];
  purchases : any = [];

  config = {
    indexName: 'dev_DenloyPOS_dev_DenloyPOS',
    searchClient
  };

  // selected product
  selectProduct(product: any) {
    this.selectedProduct = {
      product_id: product.product_id
    };
    this.product_name = product.product_name;
    this.isDisabled = true;
    this.searchBox.state.clear();
  }

  // add purchase to the table
  addPurchase() {

  }

}
