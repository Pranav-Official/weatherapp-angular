import { EnvironmentInjector, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

const baseUrl = 'https://archive-api.open-meteo.com/v1/archive';
const airQualityUrl = 'https://air-quality-api.open-meteo.com/v1/air-quality';
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
    selector?: string,
    timezone?: string
  ): Observable<any> {
    let url: string;
    let formattedTimeZone = `${timezone}`.replace('/', '%2F'); //Format timezone for api
    let queryParams = `latitude=${latitude}&longitude=${longitude}&start_date=${start_date}&end_date=${end_date}`;

    //Calculate days for api
    function daysBetween(startDateStr: string, endDateStr: string) {
      const startDate = new Date(startDateStr);
      const endDate = new Date(endDateStr);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return null;
      }
      const timeDiff = endDate.getTime() - startDate.getTime();
      const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      return daysDiff + 1;
    }
    let numberOfDays = daysBetween(start_date ?? '', end_date ?? '');

    switch (selector) {
      case 'TEMPERATURE':
        url = baseUrl;
        queryParams += `&daily=temperature_2m_max&timezone=${formattedTimeZone}${
          localStorage.getItem('preferred_units') === 'imperial'
            ? '&temperature_unit=fahrenheit'
            : ''
        }`;
        break;
      case 'HUMIDITY':
        url = baseUrl;
        queryParams += `&hourly=relative_humidity_2m&timezone=${formattedTimeZone}`;
        break;
      case 'WIND SPEED':
        url = baseUrl;
        queryParams += `&daily=wind_speed_10m_max&timezone=${formattedTimeZone}${
          localStorage.getItem('preferred_units') === 'imperial'
            ? '&wind_speed_unit=mph'
            : ''
        }`;
        break;
      case 'UV INDEX':
        url = uvIndexUrl;
        if (numberOfDays && numberOfDays > 92) {
          return of({
            error: true,
            message: 'Maximum number of days is 92',
          });
        }
        queryParams = `latitude=${latitude}&longitude=${longitude}&daily=uv_index_max&timezone=${formattedTimeZone}&past_days=${numberOfDays}`;
        break;
      case 'AIR QUALITY':
        url = airQualityUrl;
        if (numberOfDays && numberOfDays > 92) {
          return of({
            error: true,
            message: 'Maximum number of days is 92',
          });
        }
        queryParams = `latitude=${latitude}&longitude=${longitude}&hourly=pm10,pm2_5&timezone=${formattedTimeZone}&past_days=${numberOfDays}`;
        break;
      default:
        console.log('Error', selector);
        return of({ error: true, message: 'Invalid selector' });
    }
    return this.http.get<any>(`${url}?${queryParams}`);
  }
}
