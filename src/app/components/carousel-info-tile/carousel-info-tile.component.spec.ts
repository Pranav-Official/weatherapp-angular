import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselInfoTileComponent } from './carousel-info-tile.component';

describe('CarouselInfoTileComponent', () => {
  let component: CarouselInfoTileComponent;
  let fixture: ComponentFixture<CarouselInfoTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselInfoTileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselInfoTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
