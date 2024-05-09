import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

type TimeDateResponse = {
  datetime: string;
  unixtime: number;
  day_of_week: number;
  day_of_year: number;
  dst: boolean;
  dst_from: string;
  dst_offset: number;
  dst_until: string;
  raw_offset: number;
  timezone: string;
  utc_datetime: string;
  utc_offset: string;
  week_number: number;
};

@Injectable({
  providedIn: 'root',
})
export class TimeDataService {
  timeDataBaseUrl = 'http://worldtimeapi.org/api/timezone/';
  constructor(private http: HttpClient) {}

  getTimeData(timezone: string) {
    return this.http.get<{ datetime: string; utc_offset: string }>(
      this.timeDataBaseUrl + timezone
    );
  }
}
