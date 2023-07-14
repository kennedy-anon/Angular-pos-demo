import { Component } from '@angular/core';
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
  'HQC4LP3GHT',
  '1027660e333f8d26fcb7aad4eb0b8306'
);

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent {
  config = {
    indexName: 'dev_DenloyPOS_dev_DenloyPOS',
    searchClient
  };

  displayedColumns = ['no', 'product_name', 'units', 'unit_price', 'sub_total', 'actions'];
  products : any = [];

  currentProduct : any = {
    product_name: '',
    product_id: '',
    units: '',
    unitPrice: '',
    min_selling_price: '',
    amount: ''
  }

  constructor() {}

  // selected product
  selectProduct(product: any) {

  }

  logout() {

  }

}
