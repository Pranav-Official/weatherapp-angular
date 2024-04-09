import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleInfoComponentComponent } from './single-info-component.component';

describe('SingleInfoComponentComponent', () => {
  let component: SingleInfoComponentComponent;
  let fixture: ComponentFixture<SingleInfoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleInfoComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleInfoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
