import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCarousalComponent } from './info-carousal.component';

describe('InfoCarousalComponent', () => {
  let component: InfoCarousalComponent;
  let fixture: ComponentFixture<InfoCarousalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoCarousalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoCarousalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
