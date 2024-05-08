import { TestBed } from '@angular/core/testing';

import { WeatherIconService } from './weather-icon.service';

describe('WeatherIconService', () => {
  let weatherIconService: WeatherIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    weatherIconService = TestBed.inject(WeatherIconService);
  });

  it('should be created', () => {
    expect(weatherIconService).toBeTruthy();
  });

  it('should return the corresponding image url when a weather code is passed to the function', () => {
    const weather_code = 55;
    const day_night_status = true;
    const expectedUrl = '../../../assets/icons/drizzle.png';

    const url = weatherIconService.getWeatherIconUrl(
      weather_code,
      day_night_status
    );

    expect(url).toEqual(expectedUrl);
  });

  it('should return the cloudy night icon incase the API returns the weather code for cloudy and it is night time', () => {
    const weather_code = 1;
    const day_night_status = false;
    const expectedUrl = '../../../assets/icons/cloudy-night.png';

    const url = weatherIconService.getWeatherIconUrl(
      weather_code,
      day_night_status
    );

    expect(url).toEqual(expectedUrl);
  });

  it('should return the cloudy day icon incase the API returns the weather code for cloudy and it is day time', () => {
    const weather_code = 1;
    const day_night_status = true;
    const expectedUrl = '../../../assets/icons/cloudy.png';

    const url = weatherIconService.getWeatherIconUrl(
      weather_code,
      day_night_status
    );

    expect(url).toEqual(expectedUrl);
  });

  it('should return the clear night icon incase the API returns the weather code for clear sky and it is night time', () => {
    const weather_code = 0;
    const day_night_status = false;
    const expectedUrl = '../../../assets/icons/moon.png';

    const url = weatherIconService.getWeatherIconUrl(
      weather_code,
      day_night_status
    );

    expect(url).toEqual(expectedUrl);
  });

  it('should return the clear day icon incase the API returns the weather code for clear sky and it is day time', () => {
    const weather_code = 0;
    const day_night_status = true;
    const expectedUrl = '../../../assets/icons/Sunny Day.png';

    const url = weatherIconService.getWeatherIconUrl(
      weather_code,
      day_night_status
    );

    expect(url).toEqual(expectedUrl);
  });

  it('should return undefined incase the API returns an invalid weather code', () => {
    const weather_code = 1024;
    const day_night_status = true;
    const expectedUrl = undefined;

    const url = weatherIconService.getWeatherIconUrl(
      weather_code,
      day_night_status
    );

    expect(url).toEqual(expectedUrl);
  });
});
