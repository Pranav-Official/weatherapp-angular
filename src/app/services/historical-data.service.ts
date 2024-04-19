import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

const baseUrl = 'https://archive-api.open-meteo.com/v1/archive';
const airQualityUrl = 'https://air-quality-api.open-meteo.com/v1/air_quality';
const uvIndexUrl = 'https://api.open-meteo.com/v1/forecast';

@Injectable({
  providedIn: 'root',
})
export class HistoricalDataService {
  constructor(private http: HttpClient) {}

  getHistoricalData(
    latitude?: string,
    longitude?: string,
    start_date?: string,
    end_date?: string,
    selector?: string
    // timezone?: string
  ): Observable<any> {
    let url: string;
    let queryParams = `latitude=${latitude}&longitude=${longitude}&start_date=${start_date}&end_date=${end_date}`;

    switch (selector) {
      case 'TEMPERATURE':
        url = baseUrl;
        queryParams += `&daily=temperature_2m_max&timezone=Asia%2FKolkata`;
        break;
      case 'HUMIDITY':
        url = baseUrl;
        queryParams += `&hourly=relative_humidity_2m&timezone=Asia%2FKolkata`;
        break;
      case 'WIND SPEED':
        url = baseUrl;
        queryParams += `&daily=wind_speed_10m_max`;
        break;
      case 'UV INDEX':
        url = uvIndexUrl;
        queryParams = `latitude=${latitude}&longitude=${longitude}&daily=uv_index_max&timezone=Asia%2FKolkata&past_days=92&forecast_days=3`;
        break;
      case 'AIR QUALITY':
        url = airQualityUrl;
        queryParams = `latitude=${latitude}&longitude=${longitude}&hourly=pm10,pm2_5&timezone=Asia%2FKolkata&past_days=92`;
        break;
      default:
        return throwError('Invalid selector');
    }
    console.log('URLS', this.http.get<any>(`${url}?${queryParams}`));
    return this.http.get<any>(`${url}?${queryParams}`);
  }
}
