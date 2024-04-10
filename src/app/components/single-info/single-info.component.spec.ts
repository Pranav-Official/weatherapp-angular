import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleInfoComponent } from './single-info.component';

describe('SingleInfoComponent', () => {
  let component: SingleInfoComponent;
  let fixture: ComponentFixture<SingleInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SingleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
