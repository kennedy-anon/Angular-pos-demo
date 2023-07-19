import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
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

  // retrieving credit sales
  getCreditSales() {
    var headers = this.setHttpHeaders();
    return this.http.get(`${this.apiUrl}sales/credit-sales/`, { headers })
      .pipe(map(res => res));
  }
}