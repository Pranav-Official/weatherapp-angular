import { Component, Input, Type } from '@angular/core';
import { SingleInfoLabelComponent } from '../single-info-label/single-info-label.component';
import { SunPositionIndicatorComponent } from '../sun-position-indicator/sun-position-indicator.component';
import { SingleInfoComponent } from '../single-info/single-info.component';
import { TemperatureWidgetComponent } from '../temperature-widget/temperature-widget.component';
import { MapWidgetComponent } from '../map-widget/map-widget.component';
import { WeatherDataService } from '../../services/weather-data.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { WeatherIconService } from '../../services/weather-icon.service';

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
    | 'moderate'
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
  providers: [WeatherDataService, WeatherIconService],
})
export class WeatherWidgetsComponent {
  @Input() latitude: any;
  @Input() longitude: any;

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
    private weatherIconService: WeatherIconService
  ) {}
  ngOnInit(): void {
    this.weatherDataService
      .getCurrentWeatherData(this.latitude, this.longitude)
      .subscribe((data) => {
        console.log(' current weather data', data);
        this.curentData.weather_icon_url =
          this.weatherIconService.getWeatherIconUrl(
            parseInt(data.current.weather_code),
            '10:00'
          );
        this.curentData.temperature = data.current.temperature_2m;
        this.curentData.temperature_max = data.daily.temperature_2m_max[0];
        this.curentData.temperature_min = data.daily.temperature_2m_min[0];
        this.curentData.humidity = data.current.relative_humidity_2m;
        this.curentData.wind_speed = data.current.wind_speed_10m;
        this.curentData.sunrise = data.daily.sunrise[0].split('T')[1];
        this.curentData.sunset = data.daily.sunset[0].split('T')[1];
        console.log(
          'sunset and sunrise',
          this.curentData.sunset,
          this.curentData.sunrise
        );
      });
  }
}
