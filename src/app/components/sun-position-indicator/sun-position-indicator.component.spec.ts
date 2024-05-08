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
  it('should calculate progress to eaqual to 0 if current time is before sunrise', () => {
    component.sunriseTime = '6:00';
    component.sunsetTime = '18:00';
    component.currentTime = '5:00';
    component.ngOnChanges();
    expect(component.sunProgress).toEqual(0);
  });
  it('should calculate progress to eaqual to 100 if current time is after sunset', () => {
    component.sunriseTime = '6:00';
    component.sunsetTime = '18:00';
    component.currentTime = '19:00';
    component.ngOnChanges();
    expect(component.sunProgress).toEqual(100);
  });
  it('test for sunset after 10PM', () => {
    component.sunriseTime = '18:00';
    component.sunsetTime = '22:00';
    component.currentTime = '12:00';
    component.ngOnChanges();
    expect(component.sunsetTimeText).toEqual('10:00 PM');
  });
  it('test for sunset before  12', () => {
    component.sunriseTime = '3:00';
    component.sunsetTime = '10:00';
    component.currentTime = '6:00';
    component.ngOnChanges();
    expect(component.sunriseTimeText).toEqual('3:00 AM');
  });
});
