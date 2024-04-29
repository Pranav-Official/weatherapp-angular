import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class SearchHistoryService {
  constructor(private http: HttpClient) {}

  saveSearchHistory(
    latitude: string,
    longitude: string,
    name: string,
    country: string,
    timezone: string
  ): Observable<{ status: boolean; message: string }> {
    return this.http.post<{ status: boolean; message: string }>(
      baseUrl + '/searchHistory',
      {
        latitude,
        longitude,
        timezone,
        name,
        country,
      }
    );
  }

  getSearchHistory(): Observable<{
    status: boolean;
    message: string;
    data: any;
  }> {
    return this.http.get<{
      status: boolean;
      message: string;
      data: any;
    }>(baseUrl + '/searchHistory');
  }
}
