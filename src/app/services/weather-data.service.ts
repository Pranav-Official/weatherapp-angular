import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  baseUrl = '';

  constructor(private http: HttpClient) {}

  getHourlyWeatherData(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(
      'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
      {
        headers: headers,
      }
    );
  }

  getHourlyUVData(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(
      'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=52.52&longitude=13.41&hourly=pm10,pm2_5,uv_index',
      {
        headers: headers,
      }
    );
  }
}
