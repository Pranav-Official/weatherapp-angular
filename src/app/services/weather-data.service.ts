import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  weatherDataBaseUrl = 'https://api.open-meteo.com/v1/';
  UVDataBaseUrl = 'https://air-quality-api.open-meteo.com/v1/';
  private hourlyParams =
    'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m';
  private hourlyParamsUV = 'pm10,pm2_5,uv_index';
  private currentParams = {
    current:
      'temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m',
    daily: 'temperature_2m_max,temperature_2m_min,sunrise,sunset',
    forecast_days: 1,
  };
  private cuurentParamsAir = 'pm10,pm2_5';
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
    return this.http.get<any>(this.weatherDataBaseUrl + 'forecast', {
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
    return this.http.get<any>(this.UVDataBaseUrl + 'air-quality', {
      headers: headers,
      params: params,
    });
  }
  getCurrentWeatherData(latitude: number, longitude: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = {
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      current: this.currentParams.current,
      daily: this.currentParams.daily,
      forecast_days: this.currentParams.forecast_days.toString(),
    };
    return this.http.get<any>(this.weatherDataBaseUrl + 'forecast', {
      headers: headers,
      params: params,
    });
  }
  getCurrentAirData(latitude: number, longitude: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = {
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      current: this.cuurentParamsAir,
    };
    return this.http.get<any>(this.UVDataBaseUrl + 'air-quality', {
      headers: headers,
      params: params,
    });
  }
}
