import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureWidgetComponent } from './temperature-widget.component';

describe('TemperatureWidgetComponent', () => {
  let component: TemperatureWidgetComponent;
  let fixture: ComponentFixture<TemperatureWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemperatureWidgetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemperatureWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
