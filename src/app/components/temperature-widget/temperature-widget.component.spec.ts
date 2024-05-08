import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureWidgetComponent } from './temperature-widget.component';

describe('TemperatureWidgetComponent', () => {
  let component: TemperatureWidgetComponent;
  let fixture: ComponentFixture<TemperatureWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemperatureWidgetComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TemperatureWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear all mock functions after each test
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true if preferred_units is imperial', () => {
    const localStorageMock: any = {
      getItem: jest.fn().mockReturnValue('imperial'),
    };
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

    expect(component.isImperial()).toBeTruthy();
  });

  it('should return false if preferred_units is not imperial', () => {
    jest.spyOn(localStorage, 'getItem').mockReturnValue('metric');
    expect(component.isImperial()).toBeFalsy();
  });
});
