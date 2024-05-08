import { WeatherImageUrls } from './../types/weather_image_url';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class WeatherIconService {
  weather_image_urls: WeatherImageUrls = {
    0: '../../../assets/icons/Sunny Day.png',
    1: '../../../assets/icons/cloudy.png',
    2: '../../../assets/icons/cloudy.png',
    3: '../../../assets/icons/cloudy.png',
    45: '../../../assets/icons/fog.png',
    48: '../../../assets/icons/fog.png',
    51: '../../../assets/icons/drizzle.png',
    53: '../../../assets/icons/drizzle.png',
    55: '../../../assets/icons/drizzle.png',
    56: '../../../assets/icons/freezing_drizzle.png',
    57: '../../../assets/icons/freezing_drizzle.png',
    61: '../../../assets/icons/rain.png',
    63: '../../../assets/icons/rain.png',
    65: '../../../assets/icons/rain.png',
    66: '../../../assets/icons/freezing_drizzle.png',
    67: '../../../assets/icons/freezing_drizzle.png',
    71: '../../../assets/icons/snowfall.png',
    73: '../../../assets/icons/snowfall.png',
    75: '../../../assets/icons/snowfall.png',
    77: '../../../assets/icons/snowgrains.png',
    80: '../../../assets/icons/rain.png',
    81: '../../../assets/icons/rain.png',
    82: '../../../assets/icons/rain.png',
    85: '../../../assets/icons/snowfall.png',
    86: '../../../assets/icons/snowfall.png',
    95: '../../../assets/icons/thunderstorm.png',
    96: '../../../assets/icons/thunderstorm.png',
    99: '../../../assets/icons/thunderstorm.png',
    800: '../../../assets/icons/moon.png',
    900: '../../../assets/icons/cloudy-night.png',
  };

  getWeatherIconUrl = (weather_code: number, day_night_status: boolean) => {
    if (
      (weather_code === 1 || weather_code === 2 || weather_code === 3) &&
      !day_night_status
    ) {
      weather_code = 900; // Cloudy Night
    } else if (weather_code === 0 && !day_night_status) {
      weather_code = 800; // Clear Night
    } else if (
      (weather_code === 1 || weather_code === 2 || weather_code === 3) &&
      day_night_status
    ) {
      weather_code = 1; // Cloudy Day
    } else if (weather_code === 0 && day_night_status) {
      weather_code = 0; // Clear Day
    }

    return this.weather_image_urls[weather_code] || undefined;
  };
}
