import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleInfoLabelComponent } from './single-info-label.component';

describe('SingleInfoLabelComponent', () => {
  let component: SingleInfoLabelComponent;
  let fixture: ComponentFixture<SingleInfoLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleInfoLabelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleInfoLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
