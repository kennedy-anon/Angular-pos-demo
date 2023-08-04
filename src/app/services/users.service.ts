import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
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

  // list all users
  listUsers() {
    var headers = this.setHttpHeaders();
    return this.http.get(`${this.apiUrl}auth/user/list/`, { headers })
      .pipe(map(res => res));
  }

  // add new user
  addNewUser(user: any) {
    var headers = this.setHttpHeaders();
    return this.http.post(`${this.apiUrl}auth/user/create-new/`, user, {headers: headers, observe: 'response'})
    .pipe(map(res => res));
  }

  // update user
  updateUser(user: any) {
    var headers = this.setHttpHeaders();
    return this.http.post(`${this.apiUrl}auth/user/update/`, user, {headers: headers, observe: 'response'})
    .pipe(map(res => res));
  }
}
