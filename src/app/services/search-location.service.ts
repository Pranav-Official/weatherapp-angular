import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, debounceTime } from 'rxjs';

interface LocationDetails {
  results: {
    id: number;
    name: string;
    latitude: string;
    longitude: string;
    country_code: string;
    timezone: string;
    country_id: number;
    country: string;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class SearchLocationService {
  constructor(private http: HttpClient) {}
  latitude: string | undefined;
  longitude: string | undefined;

  private baseUrl = 'https://geocoding-api.open-meteo.com/v1/';

  searchLocation(partialName: string): Observable<LocationDetails> {
    return this.http
      .get<LocationDetails>(
        `${this.baseUrl}search?name=${partialName}&count=5&limit=10&language=en&format=json`
      )
      .pipe(debounceTime(300));
  }
  setLocation(latitude?: string, longitude?: string) {
    latitude = this.latitude;
    longitude = this.longitude;
  }
}
