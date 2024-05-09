import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherWidgetsComponent } from './weather-widgets.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherDataService } from '../../services/weather-data.service';
import { of } from 'rxjs';
import { TimeDataService } from '../../services/time-data.service';
import { WeatherIconService } from '../../services/weather-icon.service';

describe('WeatherWidgetsComponent', () => {
  jest.mock('../../services/weather-data.service');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherWidgetsComponent, HttpClientModule],
    }).compileComponents();
  });

  const setupMockSpyValues = (
    weatherDataService: WeatherDataService,
    timeDataService: TimeDataService,
    weatherIconService: WeatherIconService
  ) => {
    jest
      .spyOn(weatherDataService, 'getCurrentWeatherData')
      .mockImplementation(() =>
        of({
          current: {
            weather_code: 10, // Example code for sunny weather
            is_day: true,
            temperature_2m: 25,
            relative_humidity_2m: 60,
            wind_speed_10m: 5,
          },
          daily: {
            temperature_2m_max: [28],
            temperature_2m_min: [18],
            sunrise: ['2024-05-09T06:00:00Z'],
            sunset: ['2024-05-09T20:00:00Z'],
          },
        })
      );
    jest.spyOn(weatherDataService, 'getCurrentAirData').mockImplementation(() =>
      of({
        current: {
          european_aqi: 300,
          uv_index: 8,
        },
      })
    );
    jest.spyOn(timeDataService, 'getTimeData').mockImplementation(() =>
      of({
        datetime: '2024-05-09T12:00:00+00:00',
        utc_offset: '00:00',
      })
    );
  };

  const setup = () => {
    const fixture = TestBed.createComponent(WeatherWidgetsComponent);
    const component = fixture.debugElement.componentInstance;
    const weatherDataService = TestBed.inject(WeatherDataService);
    const timeDataService = TestBed.inject(TimeDataService);
    const weatherIconService = TestBed.inject(WeatherIconService);
    const spyObj = setupMockSpyValues(
      weatherDataService,
      timeDataService,
      weatherIconService
    );
    return { fixture, component, spyObj, weatherDataService };
  };

  it('should create', () => {
    const { component } = setup();
    expect(component).toBeTruthy();
  });
  it('should get imperial from local storage', () => {
    const { component } = setup();
    localStorage.setItem('preferred_units', 'imperial');
    expect(component.isImperial()).toBe(true);
  });

  it('should get metric from local storage', () => {
    const { component } = setup();
    localStorage.setItem('preferred_units', 'metric');
    expect(component.isImperial()).toBe(false);
  });

  it('should get default metric from local storage', () => {
    const { component } = setup();
    expect(component.isImperial()).toBe(false);
  });

  it('should get current weather data from service', () => {
    const { component, fixture } = setup();
    component.ngOnChanges();
    fixture.detectChanges();
    expect(component.curentData.temperature).toEqual(25);
  });

  it('should get current air data from service', () => {
    const { component, fixture } = setup();
    component.ngOnChanges();
    fixture.detectChanges();
    expect(component.curentData.uv_index).toEqual(8);
  });
  it('it should set `severe` to air quality if the value is greater than 100', () => {
    const { component, fixture, weatherDataService } = setup();
    component.ngOnChanges();
    fixture.detectChanges();
    jest.spyOn(weatherDataService, 'getCurrentAirData').mockImplementation(() =>
      of({
        current: {
          european_aqi: 110,
          uv_index: 8,
        },
      })
    );
    expect(component.curentData.air_quality).toBe('severe');
  });
  it('it should set `very poor` to air quality if the value is less than 100 aand greater than 80', () => {
    const { component, fixture, weatherDataService } = setup();
    component.ngOnChanges();
    fixture.detectChanges();
    jest.spyOn(weatherDataService, 'getCurrentAirData').mockImplementation(() =>
      of({
        current: {
          european_aqi: 90,
          uv_index: 8,
        },
      })
    );
    expect(component.curentData.air_quality).toBe('very poor');
  });
});
