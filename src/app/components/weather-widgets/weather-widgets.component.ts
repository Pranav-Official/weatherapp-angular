import { Component, Input, OnChanges, Type } from '@angular/core';
import { SingleInfoLabelComponent } from '../single-info-label/single-info-label.component';
import { SunPositionIndicatorComponent } from '../sun-position-indicator/sun-position-indicator.component';
import { SingleInfoComponent } from '../single-info/single-info.component';
import { TemperatureWidgetComponent } from '../temperature-widget/temperature-widget.component';
import { MapWidgetComponent } from '../map-widget/map-widget.component';
import { WeatherDataService } from '../../services/weather-data.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WeatherIconService } from '../../services/weather-icon.service';
import { TimeDataService } from '../../services/time-data.service';

type CurrentWeatherData = {
  current_time: string;
  temperature: number;
  temperature_max: number;
  temperature_min: number;
  humidity: number;
  wind_speed: number;
  uv_index: number;
  weather_code: number;
  time: string;
  sunrise: string;
  sunset: string;
  air_quality:
    | ''
    | 'excellent'
    | 'fair'
    | 'good'
    | 'poor'
    | 'very poor'
    | 'severe';
  weather_icon_url: string | undefined;
};

@Component({
  selector: 'app-weather-widgets',
  standalone: true,
  templateUrl: './weather-widgets.component.html',
  styleUrl: './weather-widgets.component.css',
  imports: [
    SingleInfoLabelComponent,
    SunPositionIndicatorComponent,
    SingleInfoComponent,
    TemperatureWidgetComponent,
    MapWidgetComponent,
    CommonModule,
    HttpClientModule,
  ],
  providers: [WeatherDataService, WeatherIconService, TimeDataService],
})
export class WeatherWidgetsComponent implements OnChanges {
  isImperial() {
    if (localStorage.getItem('preferred_units') === 'imperial') {
      return true;
    } else {
      return false;
    }
  }
  @Input() latitude: any;
  @Input() longitude: any;
  @Input() timezone: string = '';
  @Input() day_night_status: boolean = false;
  sunriseTimeStamp: string = '';
  sunsetTimeStamp: string = '';

  curentData: CurrentWeatherData = {
    temperature: 0,
    temperature_max: 0,
    temperature_min: 0,
    humidity: 0,
    wind_speed: 0,
    uv_index: 0,
    weather_code: 0,
    time: '',
    sunrise: '',
    sunset: '',
    air_quality: 'fair',
    current_time: '',
    weather_icon_url: '',
  };

  constructor(
    private weatherDataService: WeatherDataService,
    private weatherIconService: WeatherIconService,
    private timeDataService: TimeDataService
  ) {}
  ngOnChanges(): void {
    this.weatherDataService
      .getCurrentWeatherData(this.latitude, this.longitude, this.timezone)
      .subscribe((data) => {
        this.curentData.weather_icon_url =
          this.weatherIconService.getWeatherIconUrl(
            parseInt(data.current.weather_code),
            data.current.is_day
          );
        this.curentData.temperature = data.current.temperature_2m;
        this.curentData.temperature_max = data.daily.temperature_2m_max[0];
        this.curentData.temperature_min = data.daily.temperature_2m_min[0];
        this.curentData.humidity = data.current.relative_humidity_2m;
        this.curentData.wind_speed = data.current.wind_speed_10m;
        this.sunriseTimeStamp = data.daily.sunrise[0];
        this.sunsetTimeStamp = data.daily.sunset[0];

        this.timeDataService.getTimeData(this.timezone).subscribe((data) => {
          const currentTimestamp = data.datetime;
          const utsOffset = data.utc_offset;
          this.curentData.sunrise = this.sunriseTimeStamp.split('T')[1];
          this.curentData.sunset = this.sunsetTimeStamp.split('T')[1];
          this.curentData.current_time =
            currentTimestamp.split('+')[0].split('T')[1].split(':')[0] +
            ':' +
            currentTimestamp.split('+')[0].split('T')[1].split(':')[1];
        });
      });
    this.weatherDataService
      .getCurrentAirData(this.latitude, this.longitude, this.timezone)
      .subscribe((data) => {
        if (parseInt(data.current.european_aqi) > 100) {
          this.curentData.air_quality = 'severe';
        } else if (parseInt(data.current.european_aqi) > 80) {
          this.curentData.air_quality = 'very poor';
        } else if (parseInt(data.current.european_aqi) > 60) {
          this.curentData.air_quality = 'poor';
        } else if (parseInt(data.current.european_aqi) > 40) {
          this.curentData.air_quality = 'fair';
        } else if (parseInt(data.current.european_aqi) > 20) {
          this.curentData.air_quality = 'good';
        } else {
          this.curentData.air_quality = 'excellent';
        }
        this.curentData.uv_index = data.current.uv_index;
      });
  }
}
