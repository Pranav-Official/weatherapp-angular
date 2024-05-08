import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { CarouselInfoTileComponent } from './carousel-info-tile.component';

describe('CarouselInfoTileComponent', () => {
  let component: CarouselInfoTileComponent;
  let fixture: ComponentFixture<CarouselInfoTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselInfoTileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarouselInfoTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear(); // Clear local storage after each test
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true when preferred units is imperial', () => {
    localStorage.setItem('preferred_units', 'imperial');
    expect(component.isImperial()).toBe(true);
  });

  it('should return false when preferred units is not imperial', () => {
    localStorage.setItem('preferred_units', 'metric');
    expect(component.isImperial()).toBe(false);
  });

  it('should return false when preferred units is not set', () => {
    expect(component.isImperial()).toBe(false);
  });

  it('should call formatTime when time input changes', () => {
    const formatTimeSpy = jest.spyOn(component, 'formatTime');

    const changes = {
      time: new SimpleChange(null, '2022-05-05', true),
    };

    component.ngOnChanges(changes);

    expect(formatTimeSpy).toHaveBeenCalled();
  });

  it('should format time correctly', () => {
    component.time = '2022-05-05T12:00:00';
    (component as any).formatTime();
    expect(component.time).toEqual('May 05');
  });

  it('should not format time if time is not set', () => {
    // Set up the component with time not set
    component.time = undefined;
    component.formatTime();
    expect(component.time).toBeUndefined();
  });
});
