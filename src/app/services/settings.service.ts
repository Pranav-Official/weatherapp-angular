import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000';
@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private http: HttpClient) {}

  getSettings(): Observable<{ status: boolean; message: string; data: any }> {
    return this.http.get<{ status: boolean; message: string; data: any }>(
      `${baseUrl}/settings`
    );
  }
}
