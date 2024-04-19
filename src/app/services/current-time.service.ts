import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentTimeService {
  baseUrl = 'https://timeapi.io/api/Time/current/';
  constructor(private http: HttpClient) {}

  getCurrentTime(latitude: string, longitude: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = {
      latitude: latitude.toString(),
      longitude: longitude.toString(),
    };
    return this.http.get<any>(this.baseUrl + 'coordinate', {
      params: params,
    });
  }
}
