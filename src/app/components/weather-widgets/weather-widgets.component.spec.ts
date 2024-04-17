import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherWidgetsComponent } from './weather-widgets.component';

describe('WeatherWidgetsComponent', () => {
  let component: WeatherWidgetsComponent;
  let fixture: ComponentFixture<WeatherWidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherWidgetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeatherWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
