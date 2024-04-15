import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  hourlyWeatherDataBaseUrl = 'https://api.open-meteo.com/v1/';
  hourlyUIDataBaseUrl = 'https://air-quality-api.open-meteo.com/v1/';
  private hourlyParams =
    'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m';
  private hourlyParamsUV = 'pm10,pm2_5,uv_index';
  constructor(private http: HttpClient) {}

  getHourlyWeatherData(
    latitude: number,
    longitude: number,
    forecastDays: number
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const params = {
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      hourly: this.hourlyParams,
      forecast_days: forecastDays.toString(),
    };
    return this.http.get<any>(this.hourlyWeatherDataBaseUrl + 'forecast', {
      headers: headers,
      params: params,
    });
  }

  getHourlyUVData(
    latitude: number,
    longitude: number,
    forecastDays: number
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = {
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      hourly: this.hourlyParamsUV,
      forecast_days: forecastDays.toString(),
    };
    return this.http.get<any>(this.hourlyUIDataBaseUrl + 'air-quality', {
      headers: headers,
      params: params,
    });
  }
}
