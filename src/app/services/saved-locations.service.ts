import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000';
@Injectable({
  providedIn: 'root',
})
export class SavedLocationsService {
  constructor(private http: HttpClient) {}

  saveLocation(
    latitude: string,
    longitude: string,
    timezone: string,
    name: string,
    country: string
  ): Observable<{ status: boolean; message: string }> {
    return this.http.post<{ status: boolean; message: string }>(
      baseUrl + '/location',
      {
        latitude,
        longitude,
        timezone,
        name,
        country,
      }
    );
  }

  isLocationSaved(
    latitude: string,
    longitude: string,
    timezone: string,
    name: string,
    country: string
  ): Observable<{
    status: boolean;
    message: string;
    data: any;
  }> {
    return this.http.get<{
      status: boolean;
      message: string;
      data: any;
    }>(baseUrl + '/location/isLocationSaved', {
      params: {
        latitude,
        longitude,
        timezone,
        name,
        country,
      },
    });
  }
}
