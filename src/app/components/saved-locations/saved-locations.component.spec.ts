import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { SavedLocationsComponent } from './saved-locations.component';

describe('SavedLocationsComponent', () => {
  let component: SavedLocationsComponent;
  let fixture: ComponentFixture<SavedLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedLocationsComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SavedLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
