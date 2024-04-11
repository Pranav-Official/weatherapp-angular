import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastDurationSelectorComponent } from './forecast-duration-selector.component';

describe('ForecastDurationSelectorComponent', () => {
  let component: ForecastDurationSelectorComponent;
  let fixture: ComponentFixture<ForecastDurationSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastDurationSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForecastDurationSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
