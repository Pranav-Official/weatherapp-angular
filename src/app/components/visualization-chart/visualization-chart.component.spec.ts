import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationCartComponent } from './visualization-cart.component';

describe('VisualizationCartComponent', () => {
  let component: VisualizationCartComponent;
  let fixture: ComponentFixture<VisualizationCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizationCartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualizationCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
