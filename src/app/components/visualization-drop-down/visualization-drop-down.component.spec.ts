import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationDropDownComponent } from './visualization-drop-down.component';

describe('VisualizationDropDownComponent', () => {
  let component: VisualizationDropDownComponent;
  let fixture: ComponentFixture<VisualizationDropDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualizationDropDownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisualizationDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
