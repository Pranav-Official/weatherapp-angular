import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, debounceTime } from 'rxjs';

interface LocationDetails {
  results: {
    id: number;
    name: string;
    latitude: string;
    longitude: string;
    elevation: string;
    feature_code: string;
    country_code: string;
    admin1_id: number;
    admin2_id: number;
    admin3_id: number;
    admin4_id: number;
    timezone: string;
    population: number;
    postcodes: number[];
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class SearchLocationService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'https://geocoding-api.open-meteo.com/v1/';

  searchLocation(partialName: string): Observable<LocationDetails> {
    return this.http
      .get<LocationDetails>(
        `${this.baseUrl}search?name=${partialName}&count=5&limit=10&language=en&format=json`
      )
      .pipe(debounceTime(300));
  }
}
