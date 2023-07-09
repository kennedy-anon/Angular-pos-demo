import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl : string = "http://localhost:8000/api/";
  private userDetail: any;

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
    this.userDetail = undefined;
  }

  // check if the user is logged in
  isLoggedIn(): Observable<boolean> {
    const access_token = localStorage.getItem('access');
    const refresh_token = localStorage.getItem('refresh');

    if (access_token) {
      // check if the token is valid
      return this.verifyAccessToken(access_token).pipe(map((res: HttpResponse<any>) => {
        return true; // token is valid
      }), catchError((err: any) => {
        // token not valid, try refreshing it
        if (refresh_token && err.error.code === 'token_not_valid') {
          return this.refreshToken(refresh_token).pipe(map((res: HttpResponse<any>) => {
            // token refreshed successfully
            const new_access_token = res.body.access;
            localStorage.setItem('access', new_access_token); // save new token

            return true;
          }), catchError((err: any) => {
            // token could not be refreshed
            return of(false);
          }));
        } else {
          // Token is not valid and cannot be refreshed, return false
          return of(false);
        }
      })
      );
    } else {
      // No access token, return false
      return of(false);
    }

  }

  // retrieve user details after login
  getUserDetails(token: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get(`${this.apiUrl}auth/user/`, { headers })
    .pipe(map(res => {
      this.userDetail = res;
      return res;
    }));
  }

  // get Access groups for the user
  getAccessGroups() {
    const token = localStorage.getItem('access');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.apiUrl}auth/user/access-groups/`, { headers });
  }

  // return the access groups
  accessGroupsService(): Observable<any> {
    return this.getAccessGroups().pipe(map(res => {
      return res;
    }), catchError((err: any) => {
      return this.accessGroupsService(); // loops a few times(after testing - 3 times) while waiting token to be refreshed
    })
    );
  }

  // save tokens
  saveJWTtokens(response: any) {
    localStorage.setItem('access', response.body.access);
    localStorage.setItem('refresh', response.body.refresh);

    return "Login Successful.";
  }

  // verify acces tokens
  verifyAccessToken(access_token: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    const token = {
      "token": access_token
    }

    return this.http.post(`${this.apiUrl}token/verify/`, token, {headers: headers, observe: 'response'});
  }

  // refreshing token
  refreshToken(refresh_token: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-type', 'application/json');
    const refresh = {
      "refresh": refresh_token
    }

    return this.http.post(`${this.apiUrl}token/refresh/`, refresh, {headers: headers, observe: 'response'});
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