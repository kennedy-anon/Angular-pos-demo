import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl : string = "http://localhost:8000/api/";

  constructor(private http: HttpClient) { }

  // login to get access and refresh token
  loginService(credentials: any) {
    var headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    return this.http.post(`${this.apiUrl}token/`, credentials, {headers: headers, observe: 'response'})
    .pipe(
      catchError(this.handleError), map(res => {
        return this.saveJWTtokens(res);
      })
    );
  }

  // logout
  logoutService() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }

  // save tokens
  saveJWTtokens(response: any) {
    localStorage.setItem('access', response.body.access);
    localStorage.setItem('refresh', response.body.refresh);

    return "Login Successful.";
  }

  // handling login errors
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    let status: number = error.status;
    switch (status) {
      case 0:
        errorMessage = 'Server down! Contact System Admin.';
        break;
      case 401:
        errorMessage = 'Incorrect username or password.';
        break;
    }

    // return an observable with a user-facing error message
    return throwError(() => new Error(errorMessage));
  }

}
