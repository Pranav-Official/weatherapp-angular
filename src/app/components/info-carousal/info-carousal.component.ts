import { WeatherIconService } from './../../services/weather-icon.service';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
} from '@angular/core';
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
  HourlyUnitsUV,
  HourlyWeatherUV,
  DailyWeatherApiResponse,
  DailyHourlyData,
  DailyHourlyUnits,
  HourlyUnits,
  DailyData,
} from '../../types/weather-data-interfaces';
@Component({
  selector: 'app-info-carousal',
  standalone: true,
  imports: [CarouselInfoTileComponent, CommonModule, HttpClientModule],
  providers: [WeatherDataService, WeatherIconService],
  templateUrl: './info-carousal.component.html',
  styleUrl: './info-carousal.component.css',
})
export class InfoCarousalComponent implements OnChanges {
  @Input() latitude: any = 52.52;
  @Input() longitude: any = 13.41;
  @Input() timezone: any = 'GMT';
  @Input() currentSelector: any = '';

  availablePositions: [number, number][] = [];
  currentPositionIndex: number = 0;
  resizeObservable$!: Observable<Event>;
  resizeSubscription$!: Subscription;

  //Hourly Data Variables
  weather_data: WeatherApiResponse;
  weather_data_uv: WeatherUVApiResponse;
  time_data: string[] = [];
  wind_speed: number[] = [];
  time: string[] = [];
  temperature: number[] = [];
  humidity: number[] = [];
  uv: number[] = [];
  weather_code: number[] = [];
  forecast_days: number = 1;
  forecast_days_daily: number = 16;

  //Daily Data Variables
  weather_data_daily: DailyWeatherApiResponse;
  daily_humidity_dataset: (number | null)[] = [];
  daily_average_humidity: number[] = [];
  daily_average_wind_speed: number[] = [];
  daily_temperature_dataset: (number | null)[] = [];
  daily_uv_dataset: (number | null)[] = [];
  daily_weather_code: (number | null)[] = [];

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private router: Router,
    private WeatherDataService: WeatherDataService,
    private WeatherIconService: WeatherIconService
  ) {
    //Hourly Data API Initialisations
    const emptyHourlyWeather: HourlyWeather = {
      time: [],
      temperature_2m: [],
      relative_humidity_2m: [],
      weather_code: [],
      wind_speed_10m: [],
    };

    const emptyHourlyUnits: HourlyUnits = {
      time: '',
      temperature_2m: '',
      relative_humidity_2m: '',
      weather_code: '',
      wind_speed_10m: '',
    };
    this.weather_data = {
      latitude: 0,
      longitude: 0,
      generationtime_ms: 0,
      utc_offset_seconds: 0,
      timezone: '',
      timezone_abbreviation: '',
      elevation: 0,
      hourly_units: emptyHourlyUnits,
      hourly: emptyHourlyWeather,
    };

    const emptyHourlyUnitsUV: HourlyUnitsUV = {
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
      hourly_units: emptyHourlyUnitsUV,
      hourly: emptyHourlyWeatherUV,
    };

    //Daily Data API Initialisations
    const emptyDailyHourlyUnits: DailyHourlyUnits = {
      time: '',
      relative_humidity_2m: '',
      wind_speed_10m: '',
    };

    const emptyDailyHourlyData: DailyHourlyData = {
      time: [],
      relative_humidity_2m: [],
      wind_speed_10m: [],
    };

    const emptyDailyData: DailyData = {
      time: [],
      relative_humidity_2m: [],
      wind_speed_10m: [],
      weather_code: [],
      temperature_2m_max: [],
      uv_index_max: [],
    };

    this.weather_data_daily = {
      latitude: 0,
      longitude: 0,
      generationtime_ms: 0,
      utc_offset_seconds: 0,
      timezone: '',
      timezone_abbreviation: '',
      elevation: 0,
      hourly_units: emptyDailyHourlyUnits,
      hourly: emptyDailyHourlyData,
      daily: emptyDailyData,
    };
  }

  setPositionNumbers(newViewportWidth: number): void {
    if (newViewportWidth >= 850) {
      this.availablePositions = [
        [0, 0],
        [1, 7],
        [8, 14],
        [15, 21],
        [15, 24],
      ];
    } else if (newViewportWidth >= 600) {
      this.availablePositions = [
        [0, 0],
        [1, 5],
        [6, 10],
        [11, 15],
        [16, 20],
        [21, 24],
      ];
    } else if (newViewportWidth >= 520) {
      this.availablePositions = [
        [0, 0],
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
    console.log(
      'currentPositionIndex: ' +
        this.availablePositions[this.currentPositionIndex][1]
    );
    if (
      this.currentSelector == 'HOURLY' ||
      (this.currentSelector == 'DAILY' &&
        this.availablePositions[this.currentPositionIndex][1] <= 7)
    ) {
      if (this.currentPositionIndex < this.availablePositions.length - 1) {
        this.currentPositionIndex++;
        this.scrollItemToView(
          this.availablePositions[this.currentPositionIndex][1]
        );
      }
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
      carousel.style.overflowX = 'auto'; // or 'scroll'
      carousel.scrollLeft = 0;
      const itemElement = carousel.querySelector('#item' + item);
      if (itemElement) {
        const itemOffsetLeft = itemElement.offsetLeft; // Get the offset of the item relative to the carousel
        carousel.scrollLeft = itemOffsetLeft; // Set the scroll position to the offset of the item
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
  ngOnChanges(): void {
    // Initial viewport width
    const viewportWidth = this.getCurrentViewportWidth();
    this.setPositionNumbers(viewportWidth);

    // Subscribe to window resize event
    this.renderer.listen('window', 'resize', () => {
      const newViewportWidth = this.getCurrentViewportWidth();
      this.setPositionNumbers(newViewportWidth);
    });

    const carousel =
      this.elementRef.nativeElement.ownerDocument.getElementById(
        'info-carousal'
      );
    if (carousel) {
      carousel.style.overflowX = 'auto'; // or 'scroll'
      carousel.scrollLeft = 0;
    }
    this.currentPositionIndex = 0;

    if (this.currentSelector === 'HOURLY') {
      this.time_data = [];
      this.wind_speed = [];
      this.time = [];
      this.temperature = [];
      this.humidity = [];
      this.uv = [];
      this.weather_code = [];
      this.daily_humidity_dataset = [];
      this.daily_average_humidity = [];
      this.daily_average_wind_speed = [];
      this.daily_temperature_dataset = [];
      this.daily_uv_dataset = [];
      this.daily_weather_code = [];
      console.log('Inside Hourly-------------->');
      this.WeatherDataService.getHourlyWeatherData(
        this.latitude,
        this.longitude,
        this.forecast_days,
        this.timezone
      ).subscribe(
        (data) => {
          this.weather_data = data;
          this.time_data = this.weather_data.hourly.time;
          for (const dateTimeString of this.weather_data.hourly.time) {
            const timePart = dateTimeString.substring(11);
            this.time.push(timePart);
          }
          console.log('Hourly Time -----------> ', this.time);
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
        this.forecast_days,
        this.timezone
      ).subscribe(
        (data) => {
          this.weather_data_uv = data;
          this.uv = this.weather_data_uv.hourly.uv_index;
        },
        (error) => {
          console.log('Error while fetching Hourly UV Data', error);
        }
      );
    } else {
      this.time_data = [];
      this.wind_speed = [];
      this.time = [];
      this.temperature = [];
      this.humidity = [];
      this.uv = [];
      this.weather_code = [];
      console.log("Inside 'DAILY--------------->");
      this.WeatherDataService.getDailyWeatherData(
        this.latitude,
        this.longitude,
        this.forecast_days_daily,
        this.timezone
      ).subscribe((data) => {
        this.weather_data_daily = data;
        console.log('Daily Weather Data---------> ', this.weather_data_daily);
        this.time = this.weather_data_daily.daily.time;
        console.log('Time Data');
        this.daily_temperature_dataset =
          this.weather_data_daily.daily.temperature_2m_max;
        this.daily_temperature_dataset.forEach(
          (temperatureObject: number | null) => {
            if (temperatureObject === null) {
              temperatureObject = -999;
            }
            this.temperature.push(temperatureObject);
          }
        );
        this.daily_uv_dataset = this.weather_data_daily.daily.uv_index_max;
        this.daily_uv_dataset.forEach((uvObject: number | null) => {
          if (uvObject === null) uvObject = -999;
          this.uv.push(parseFloat(uvObject.toFixed(1)));
        });
        console.log('UV Data----->', this.uv);
        this.daily_weather_code = this.weather_data_daily.daily.weather_code;
        this.daily_weather_code.forEach(
          (weather_code_object: number | null) => {
            if (weather_code_object === null) weather_code_object = -999;
            this.weather_code.push(weather_code_object);
          }
        );
        this.daily_humidity_dataset =
          this.weather_data_daily.hourly.relative_humidity_2m;

        let sum = 0;
        let count = 0;
        this.weather_data_daily.hourly.relative_humidity_2m.forEach(
          (humidity, index) => {
            if (
              index % 24 === 23 ||
              index === this.weather_data.hourly.relative_humidity_2m.length - 1
            ) {
              sum += humidity || 0;
              count++;
              this.daily_average_humidity.push(sum / count);
              sum = 0;
              count = 0;
            } else {
              sum += humidity || 0;
              count++;
            }
          }
        );

        const formattedHumidity = this.daily_average_humidity.map(
          (value: number) => {
            return parseFloat(value.toFixed(0));
          }
        );
        console.log(formattedHumidity);
        this.humidity = formattedHumidity;

        let dailySumForAverageWindSpeed = 0;
        let hourlyCountForAverageWindSpeed = 0;
        this.weather_data_daily.hourly.wind_speed_10m.forEach(
          (windSpeed, index) => {
            if (
              index % 24 === 23 ||
              index === this.weather_data.hourly.wind_speed_10m.length - 1
            ) {
              dailySumForAverageWindSpeed += windSpeed || 0;
              hourlyCountForAverageWindSpeed++;
              this.daily_average_wind_speed.push(
                dailySumForAverageWindSpeed / hourlyCountForAverageWindSpeed
              );
              dailySumForAverageWindSpeed = 0;
              hourlyCountForAverageWindSpeed = 0;
            } else {
              dailySumForAverageWindSpeed += windSpeed || 0;
              hourlyCountForAverageWindSpeed++;
            }
            const formatted_wind_speed = this.daily_average_wind_speed.map(
              (value: number) => {
                return parseFloat(value.toFixed(1));
              }
            );
            this.wind_speed = formatted_wind_speed;
          }
        );
      });
    }
  }
}
