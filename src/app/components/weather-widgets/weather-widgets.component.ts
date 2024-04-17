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
    | 'moderate'
    | 'poor'
    | 'very poor'
    | 'severe';
  weather_icon_url: string | undefined;
};

function adjustTime(time: string, utcOffset: string): string {
  // Split the time and offset into hours and minutes
  const [timeHours, timeMinutes] = time.split(':').map(Number);
  const offsetSign = utcOffset[0];
  const [offsetHours, offsetMinutes] = utcOffset
    .slice(1)
    .split(':')
    .map(Number);
  // Convert time to minutes
  let totalMinutes = timeHours * 60 + timeMinutes;

  // Adjust time based on offset
  if (offsetSign === '-') {
    totalMinutes -= offsetHours * 60 + offsetMinutes;
  } else {
    totalMinutes += offsetHours * 60 + offsetMinutes;
  }

  // Ensure time is within 24 hours
  totalMinutes = (totalMinutes + 1440) % 1440;

  // Convert back to hours and minutes
  const adjustedHours = Math.floor(totalMinutes / 60);
  const adjustedMinutes = totalMinutes % 60;

  // Format adjusted time
  const adjustedTime = `${adjustedHours
    .toString()
    .padStart(2, '0')}:${adjustedMinutes.toString().padStart(2, '0')}`;

  return adjustedTime;
}

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
export class WeatherWidgetsComponent {
  @Input() latitude: any;
  @Input() longitude: any;
  @Input() timezone: string = '';
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
  ngOnInit(): void {
    this.weatherDataService
      .getCurrentWeatherData(this.latitude, this.longitude)
      .subscribe((data) => {
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
        this.sunriseTimeStamp = data.daily.sunrise[0];
        this.sunsetTimeStamp = data.daily.sunset[0];
        this.timeDataService.getTimeData(this.timezone).subscribe((data) => {
          const currentTimestamp = data.datetime;
          const utsOffset = data.utc_offset;
          this.curentData.sunrise = adjustTime(
            this.sunriseTimeStamp.split('T')[1],
            utsOffset
          );
          this.curentData.sunset = adjustTime(
            this.sunsetTimeStamp.split('T')[1],
            utsOffset
          );
          this.curentData.current_time =
            currentTimestamp.split('+')[0].split('T')[1].split(':')[0] +
            ':' +
            currentTimestamp.split('+')[0].split('T')[1].split(':')[1];
        });
      });
  }
}
