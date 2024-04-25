import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}
  userSignUp(user: {
    email: string;
    password: string;
    username: string;
  }): Observable<{
    status: boolean;
    message: string;
    data: {
      token: string;
      username: string;
    };
  }> {
    return this.http.post<{
      status: boolean;
      message: string;
      data: {
        token: string;
        username: string;
      };
    }>(baseUrl + '/signup', user);
  }
  userLogin(user: { email: string; password: string }): Observable<{
    status: boolean;
    message: string;
    data: {
      token: string;
      username: string;
    };
  }> {
    return this.http.post<{
      status: boolean;
      message: string;
      data: {
        token: string;
        username: string;
      };
    }>(baseUrl + '/login', user);
  }
}
