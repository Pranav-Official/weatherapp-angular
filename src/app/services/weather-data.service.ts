import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  //HourlyWeatherAPIs Section
  weatherDataBaseUrl = 'https://api.open-meteo.com/v1/';
  UVDataBaseUrl = 'https://air-quality-api.open-meteo.com/v1/';
  private hourlyParams = {
    hourly: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
    hourlyParamsUV: 'pm10,pm2_5,uv_index',
  };

  private currentParams = {
    current:
      'temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m',
    daily: 'temperature_2m_max,temperature_2m_min,sunrise,sunset',
    forecast_days: 1,
  };
  private cuurentParamsAir = 'european_aqi,uv_index';

  //DailyWeatherAPIs Section
  private dailyParams = {
    hourly: 'relative_humidity_2m,wind_speed_10m',
    forecast_days: 16,
    daily: 'weather_code,temperature_2m_max,uv_index_max',
  };

  constructor(private http: HttpClient) {}

  //Hourly Weather Data APIs

  getHourlyWeatherData(
    latitude: number,
    longitude: number,
    forecastDays: number,
    timezone: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const params = {
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      hourly: this.hourlyParams.hourly,
      forecast_days: forecastDays.toString(),
      timezone: timezone,
    };
    return this.http.get<any>(this.weatherDataBaseUrl + 'forecast', {
      headers: headers,
      params:
        localStorage.getItem('preferred_units') === 'imperial'
          ? {
              ...params,
              temperature_unit: 'fahrenheit',
              wind_speed_unit: 'mph',
            } //imperial params
          : params,
    });
  }

  getHourlyUVData(
    latitude: number,
    longitude: number,
    forecastDays: number,
    timezone: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = {
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      hourly: this.hourlyParams.hourlyParamsUV,
      forecast_days: forecastDays.toString(),
      timezone: timezone,
    };
    return this.http.get<any>(this.UVDataBaseUrl + 'air-quality', {
      headers: headers,
      params: params,
    });
  }

  //Weather Widgets Data APIs

  getCurrentWeatherData(
    latitude: number,
    longitude: number,
    timezone: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = {
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      current: this.currentParams.current,
      daily: this.currentParams.daily,
      forecast_days: this.currentParams.forecast_days.toString(),
      timezone: timezone,
    };
    return this.http.get<any>(this.weatherDataBaseUrl + 'forecast', {
      headers: headers,
      params:
        localStorage.getItem('preferred_units') === 'imperial'
          ? {
              ...params,
              temperature_unit: 'fahrenheit',
              wind_speed_unit: 'mph',
            } //imperial params
          : params,
    });
  }
  getCurrentAirData(
    latitude: number,
    longitude: number,
    timezone: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const params = {
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      current: this.cuurentParamsAir,
      timezone: timezone,
    };
    return this.http.get<any>(this.UVDataBaseUrl + 'air-quality', {
      headers: headers,
      params: params,
    });
  }

  //Daily Weather Data APIs

  getDailyWeatherData(
    latitude: number,
    longitude: number,
    forecastDays: number,
    timezone: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const params = {
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      hourly: this.dailyParams.hourly,
      forecast_days: this.dailyParams.forecast_days.toString(),
      daily: this.dailyParams.daily.toString(),
      timezone: timezone,
    };
    return this.http.get<any>(this.weatherDataBaseUrl + 'forecast', {
      headers: headers,
      params:
        localStorage.getItem('preferred_units') === 'imperial'
          ? {
              ...params,
              temperature_unit: 'fahrenheit',
              wind_speed_unit: 'mph',
            } //imperial params
          : params,
    });
  }
}
