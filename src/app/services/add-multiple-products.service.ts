import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddMultipleProductsService {
  products: any=[];
  public productList = new BehaviorSubject<any>([]);

  constructor() { }

  getProducts() {
    return this.productList.asObservable();
  }

  addProduct(product: any) {
    this.products.push(product);
    this.productList.next(this.products);
  }

  deleteProduct(product: any) {
    this.products.map((item:any, index:any) => {
      if (item === product) {
        this.products.splice(index, 1);
      }
    })

    this.productList.next(this.products);
  }

  // clear all products
  clearProducts() {
    this.products = [];
    this.productList.next(this.products);
  }

}
