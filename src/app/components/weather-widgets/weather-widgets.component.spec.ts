import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherWidgetsComponent } from './weather-widgets.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherDataService } from '../../services/weather-data.service';
import { of } from 'rxjs';

describe('WeatherWidgetsComponent', () => {
  let component: WeatherWidgetsComponent;
  let fixture: ComponentFixture<WeatherWidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherWidgetsComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  const setupMockSpyValues = (weatherDataService: WeatherDataService) => {
    jest
      .spyOn(weatherDataService, 'getCurrentWeatherData')
      .mockImplementation(() =>
        of({
          current: {
            temperature_2m: 0,
            weather_code: 0,
            relative_humidity_2m: 0,
            wind_speed_10m: 0,
          },
          daily: {
            temperature_2m_max: [0],
            temperature_2m_min: [0],
            sunrise: [''],
            sunset: [''],
          },
        })
      );
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get imperial from local storage', () => {
    localStorage.setItem('preferred_units', 'imperial');
    expect(component.isImperial()).toBe(true);
  });
});
