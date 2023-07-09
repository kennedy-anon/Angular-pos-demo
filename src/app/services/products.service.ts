import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
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

  // add product details
  addProductService(product: any) {
    var headers = this.setHttpHeaders();
    return this.http.post(`${this.apiUrl}products/`, product, {headers: headers, observe: 'response'})
    .pipe(map(res => res));
  }
}