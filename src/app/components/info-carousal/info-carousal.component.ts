import { WeatherIconService } from './../../services/weather-icon.service';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { CarouselInfoTileComponent } from '../carousel-info-tile/carousel-info-tile.component';
import { WeatherDataService } from '../../services/weather-data.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  WeatherApiResponse,
  HourlyWeather,
  WeatherUVApiResponse,
  HourlyUnits,
  HourlyWeatherUV,
} from '../../types/weather-data-interfaces';
@Component({
  selector: 'app-info-carousal',
  standalone: true,
  imports: [CarouselInfoTileComponent, CommonModule, HttpClientModule],
  providers: [WeatherDataService, WeatherIconService],
  templateUrl: './info-carousal.component.html',
  styleUrl: './info-carousal.component.css',
})
export class InfoCarousalComponent {
  availablePositions: [number, number][] = [];
  currentPositionIndex: number = 0;
  resizeObservable$!: Observable<Event>;
  resizeSubscription$!: Subscription;
  weather_data: WeatherApiResponse;
  weather_data_uv: WeatherUVApiResponse;
  time_data: string[] = [];
  wind_speed: number[] = [];
  time: string[] = [];
  temperature: number[] = [];
  humidity: number[] = [];
  uv: number[] = [];
  weather_code: number[] = [];
  latitude: number = 52.52;
  longitude: number = 13.41;
  forecast_days: number = 1;

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private router: Router,
    private WeatherDataService: WeatherDataService,
    private WeatherIconService: WeatherIconService
  ) {
    const emptyHourlyWeather: HourlyWeather = {
      time: [],
      temperature_2m: [],
      relative_humidity_2m: [],
      weather_code: [],
      wind_speed_10m: [],
    };

    this.weather_data = {
      latitude: 0,
      longitude: 0,
      generationtime_ms: 0,
      utc_offset_seconds: 0,
      timezone: '',
      timezone_abbreviation: '',
      elevation: 0,
      hourly_units: {
        time: '',
        temperature_2m: '',
        relative_humidity_2m: '',
        weather_code: '',
        wind_speed_10m: '',
      },
      hourly: emptyHourlyWeather,
    };

    const emptyHourlyUnits: HourlyUnits = {
      time: '',
      pm10: '',
      pm2_5: '',
      uv_index: '',
    };

    const emptyHourlyWeatherUV: HourlyWeatherUV = {
      time: [],
      pm10: [],
      pm2_5: [],
      uv_index: [],
    };

    this.weather_data_uv = {
      latitude: 0,
      longitude: 0,
      generationtime_ms: 0,
      utc_offset_seconds: 0,
      timezone: '',
      timezone_abbreviation: '',
      elevation: 0,
      hourly_units: emptyHourlyUnits,
      hourly: emptyHourlyWeatherUV,
    };
  }
  setPositionNumbers(newViewportWidth: number): void {
    if (newViewportWidth >= 850) {
      this.availablePositions = [
        [1, 7],
        [8, 14],
        [15, 21],
        [15, 24],
      ];
    } else if (newViewportWidth >= 600) {
      this.availablePositions = [
        [1, 5],
        [6, 10],
        [11, 15],
        [16, 20],
        [21, 24],
      ];
    } else if (newViewportWidth >= 520) {
      this.availablePositions = [
        [1, 3],
        [4, 6],
        [7, 9],
        [10, 12],
        [13, 15],
        [16, 18],
        [19, 21],
        [22, 24],
      ];
    }
  }
  goToNextPosition(): void {
    if (this.currentPositionIndex < this.availablePositions.length - 1) {
      this.currentPositionIndex++;
      this.scrollItemToView(
        this.availablePositions[this.currentPositionIndex][1]
      );
    }
  }

  goToPreviousPosition(): void {
    if (this.currentPositionIndex > 0) {
      this.currentPositionIndex--;
      this.scrollItemToView(
        this.availablePositions[this.currentPositionIndex][0]
      );
    }
  }
  scrollItemToView(item: number) {
    const carousel =
      this.elementRef.nativeElement.ownerDocument.getElementById(
        'info-carousal'
      );
    if (carousel) {
      carousel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const item20 = carousel.querySelector('#item' + item);
      if (item20) {
        item20.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  getWeatherIconUrl(
    weather_icon_code: number,
    timeObject: string
  ): string | undefined {
    return this.WeatherIconService.getWeatherIconUrl(
      weather_icon_code,
      timeObject
    );
  }

  getCurrentViewportWidth(): number {
    return this.elementRef.nativeElement.ownerDocument.defaultView.innerWidth;
  }
  ngOnInit(): void {
    // Initial viewport widt
    const viewportWidth = this.getCurrentViewportWidth();
    console.log('Viewport width:', viewportWidth);
    this.setPositionNumbers(viewportWidth);

    // Subscribe to window resize event
    this.renderer.listen('window', 'resize', () => {
      const newViewportWidth = this.getCurrentViewportWidth();
      console.log('New viewport width:', newViewportWidth);
      this.setPositionNumbers(newViewportWidth);
    });

    this.WeatherDataService.getHourlyWeatherData(
      this.latitude,
      this.longitude,
      this.forecast_days
    ).subscribe(
      (data) => {
        this.weather_data = data;
        this.time_data = this.weather_data.hourly.time;
        for (const dateTimeString of this.weather_data.hourly.time) {
          const timePart = dateTimeString.substring(11);
          this.time.push(timePart);
        }
        this.temperature = this.weather_data.hourly.temperature_2m;
        this.humidity = this.weather_data.hourly.relative_humidity_2m;
        this.wind_speed = this.weather_data.hourly.wind_speed_10m;
        this.weather_code = this.weather_data.hourly.weather_code;
      },
      (error) => {
        console.log('Error while fetching Hourly Weather Data', error);
      }
    );

    this.WeatherDataService.getHourlyUVData(
      this.latitude,
      this.longitude,
      this.forecast_days
    ).subscribe(
      (data) => {
        this.weather_data_uv = data;
        this.uv = this.weather_data_uv.hourly.uv_index;
      },
      (error) => {
        console.log('Error while fetching Hourly UV Data', error);
      }
    );
  }
}
