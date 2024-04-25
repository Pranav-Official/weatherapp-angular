import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelTimeComponent } from './label-time.component';

describe('LabelTimeComponent', () => {
  let component: LabelTimeComponent;
  let fixture: ComponentFixture<LabelTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabelTimeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LabelTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
