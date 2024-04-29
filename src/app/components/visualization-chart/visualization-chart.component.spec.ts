import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationChartComponent } from './visualization-chart.component';

describe('VisualizationCartComponent', () => {
  let component: VisualizationChartComponent;
  let fixture: ComponentFixture<VisualizationChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizationChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VisualizationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
