import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {
  apiUrl : string = "http://localhost:8000/api/";

  constructor(private http: HttpClient) { }

  setHttpHeaders() {
    const token = localStorage.getItem('access');
    var headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    headers.append('Content-type', 'application/json');
    return headers;
  }

  // save purchase history
  savePurchases(purchases: any) {
    var headers = this.setHttpHeaders();
    return this.http.post(`${this.apiUrl}products/new-stock/`, purchases, {headers: headers, observe: 'response'})
    .pipe(map(res => res));
  }

  // purchases for a certain product
  getProductPurchases(product_id: number) {
    var headers = this.setHttpHeaders();
    return this.http.get(`${this.apiUrl}purchases/${product_id}/`, { headers })
      .pipe(map(res => res));
  }
}
