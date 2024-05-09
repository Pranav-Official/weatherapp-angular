import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationChartComponent } from './visualization-chart.component';
import { HttpClientModule } from '@angular/common/http';

describe('VisualizationCartComponent', () => {
  let component: VisualizationChartComponent;
  let fixture: ComponentFixture<VisualizationChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizationChartComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(VisualizationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
