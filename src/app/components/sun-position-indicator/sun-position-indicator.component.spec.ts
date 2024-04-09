import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SunPositionIndicatorComponent } from './sun-position-indicator.component';

describe('SunPositionIndicatorComponent', () => {
  let component: SunPositionIndicatorComponent;
  let fixture: ComponentFixture<SunPositionIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SunPositionIndicatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SunPositionIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
