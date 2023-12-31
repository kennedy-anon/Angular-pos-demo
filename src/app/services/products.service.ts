import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // apiUrl : string = "http://localhost:8000/api/";
  apiUrl : string = "https://kenz.pythonanywhere.com/api/";

  constructor(private http: HttpClient) { }

  setHttpHeaders() {
    const token = localStorage.getItem('access');
    var headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    headers.append('Content-type', 'application/json');
    return headers;
  }

  // add product details
  addProductService(product: any) {
    var headers = this.setHttpHeaders();
    return this.http.post(`${this.apiUrl}products/`, product, {headers: headers, observe: 'response'})
    .pipe(map(res => res));
  }

  // list products
  listProducts() {
    var headers = this.setHttpHeaders();
    return this.http.get(`${this.apiUrl}products/list/`, { headers })
      .pipe(map(res => res));
  }

  // update product detail and min units alert
  updateProduct(product: any, product_id: number) {
    var headers = this.setHttpHeaders();
    return this.http.put(`${this.apiUrl}products/${product_id}/`, product, {headers: headers, observe: 'response'})
    .pipe(map(res => res));
  }

  // update opening stock
  updateOpeningStock(available_units: number, product_id: number) {
    const opening_stock = {
      available_units: available_units
    }

    var headers = this.setHttpHeaders();
    return this.http.put(`${this.apiUrl}products/${product_id}/update-stock/`, opening_stock, {headers: headers, observe: 'response'})
    .pipe(map(res => res));
  }

  // delete product
  deleteProduct(product_id: number) {
    var headers = this.setHttpHeaders();
    return this.http.delete(`${this.apiUrl}products/${product_id}/delete/`, {headers: headers, observe: 'response'})
    .pipe(map(res => res));
  }

  // fetch stock running low
  getLowOnStock() {
    var headers = this.setHttpHeaders();
    return this.http.get(`${this.apiUrl}products/low-stock/`, { headers })
      .pipe(map(res => res));
  }
}
