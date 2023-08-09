import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
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

  // save credit sale payment
  saveCreditSalePayment(payment: any) {
    var headers = this.setHttpHeaders();
    return this.http.post(`${this.apiUrl}payments/credit-sale-payment/`, payment, {headers: headers, observe: 'response'})
    .pipe(map(res => res));
  }
}
