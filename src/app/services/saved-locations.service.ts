import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SavedLocationsService {
  constructor(private http: HttpClient) {}
  baseUrl = 'http://localhost:3000/';
  saveLocation(
    latitude: string,
    longitude: string,
    timezone: string
  ): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/savelocation', {
      latitude,
      longitude,
      timezone,
    });
  }
}
