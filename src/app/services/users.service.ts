import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl : string = "http://localhost:8000/api/";
  private userData: any; // passed for editing

  constructor(private http: HttpClient) { }

  setUserData(user: any) {
    this.userData = user;
  }

  getUserData() {
    return this.userData;
  }

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

  // save new password...for admin
  saveNewPassword(newPassword: any, userId: number) {
    var headers = this.setHttpHeaders();
    return this.http.put(`${this.apiUrl}auth/user/${userId}/change-password/`, newPassword, {headers: headers, observe: 'response'})
    .pipe(map(res => res));
  }

  // delete user
  deleteUser(user_id: number) {
    var headers = this.setHttpHeaders();
    return this.http.delete(`${this.apiUrl}auth/user/${user_id}/delete/`, {headers: headers, observe: 'response'})
    .pipe(map(res => res));
  }

  // user changing his/ her own password
  userChangePassword(old_password: string, new_password: string) {
    const passwords = {
      old_password: old_password,
      new_password: new_password
    }

    var headers = this.setHttpHeaders();
    return this.http.put(`${this.apiUrl}auth/user/change-my-password/`, passwords, {headers: headers, observe: 'response'})
    .pipe(map(res => res));
  }

}
