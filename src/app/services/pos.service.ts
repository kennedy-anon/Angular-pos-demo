import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PosService {
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

  // recording a sale
  saveSale(sale: any): Observable<HttpResponse<any> | Blob> {
    var headers = this.setHttpHeaders();
    return this.http.post(`${this.apiUrl}products/pos/`, sale, {headers: headers, observe: 'response', responseType: 'blob'})
    .pipe(map(res => res));
  }
}
