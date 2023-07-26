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

  // retrieving details of a certain credit sale
  getCreditSaleDetail(invoice_no: number) {
    var headers = this.setHttpHeaders();
    return this.http.get(`${this.apiUrl}sales/credit-sales/detail/?invoice_no=${invoice_no}`, { headers })
      .pipe(map(res => res));
  }

  // retrieving all sales
  getAllSales() {
    var headers = this.setHttpHeaders();
    return this.http.get(`${this.apiUrl}sales/all/`, { headers })
      .pipe(map(res => res));
  }

  // product sales report
  productSalesReport(start_date: any, end_date: any) {
    var headers = this.setHttpHeaders();
    return this.http.get(`${this.apiUrl}reports/products-sales-sums/?start_date=${start_date}&end_date=${end_date}`, { headers })
      .pipe(map(res => res));
  }

  // retrieving totals for sales, purchases and credit sales for given date ranges
  getAllTotalsReport(start_date: any, end_date: any) {
    var headers = this.setHttpHeaders();
    return this.http.get(`${this.apiUrl}reports/totals/?start_date=${start_date}&end_date=${end_date}`, { headers })
      .pipe(map(res => res));
  }

  // retrieving last 30 days sales
  getLast30DaySales(end_date: any) {
    var headers = this.setHttpHeaders();
    return this.http.get(`${this.apiUrl}reports/sales/last-30days/?end_date=${end_date}`, { headers })
      .pipe(map(res => res));
  }

  // retrieving monthly sales...last 12 months
  getMonthlySales(end_date: any) {
    var headers = this.setHttpHeaders();
    return this.http.get(`${this.apiUrl}reports/sales/monthly/?end_date=${end_date}`, { headers })
      .pipe(map(res => res));
  }
}
