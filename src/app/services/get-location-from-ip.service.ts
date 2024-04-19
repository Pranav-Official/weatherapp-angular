import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

type IpApiResponse = {
  ip: string;
  city: string;
  region: string;
  country_name: string;
  latitude: string;
  longitude: string;
  timezone: string;
};

@Injectable({
  providedIn: 'root',
})
export class GetLocationFromIpService {
  constructor(private http: HttpClient) {}
  getLocation() {
    return this.http.get<IpApiResponse>('https://ipapi.co/json/');
  }
}
