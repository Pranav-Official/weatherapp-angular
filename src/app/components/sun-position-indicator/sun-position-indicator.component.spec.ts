import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SunPositionIndicatorComponent } from './sun-position-indicator.component';

describe('SunPositionIndicatorComponent', () => {
  let component: SunPositionIndicatorComponent;
  let fixture: ComponentFixture<SunPositionIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SunPositionIndicatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SunPositionIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render sunrise', () => {
    component.sunriseTime = '6:00';
    component.sunsetTime = '18:00';
    component.currentTime = '12:00';
    component.ngOnChanges();
    const sunriseTimeTextHtml =
      fixture.nativeElement.querySelector('.sunrise-time p').textContent;
    expect(sunriseTimeTextHtml).toEqual('06:00 AM');
  });
  it('should render sunset', () => {
    component.sunriseTime = '6:00';
    component.sunsetTime = '18:00';
    component.currentTime = '12:00';
    component.ngOnChanges();
    expect(component.sunsetTimeText).toEqual('06:00 PM');
  });
  it('should calculate progress', () => {
    component.sunriseTime = '6:00';
    component.sunsetTime = '18:00';
    component.currentTime = '12:00';
    component.ngOnChanges();
    expect(component.sunProgress).toEqual(50);
  });
});
