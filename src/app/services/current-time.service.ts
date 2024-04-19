import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentTimeService {
  baseUrl = 'https://worldtimeapi.org/api/timezone/';
  constructor(private http: HttpClient) {}

  getCurrentTime(timezone: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(this.baseUrl + timezone);
  }
}
