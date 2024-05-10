import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SavedLocationsComponent } from './saved-locations.component';
import { SavedLocationsService } from '../../services/saved-locations.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('SavedLocationsComponent', () => {
  let component: SavedLocationsComponent;
  let fixture: ComponentFixture<SavedLocationsComponent>;
  let savedLocationsService: SavedLocationsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [SavedLocationsService],
    }).compileComponents();

    fixture = TestBed.createComponent(SavedLocationsComponent);
    component = fixture.componentInstance;
    savedLocationsService = TestBed.inject(SavedLocationsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch saved locations on ngOnInit', () => {
    const mockData = {
      status: true,
      message: '',
      data: ['Location1', 'Location2'],
    };
    jest
      .spyOn(savedLocationsService, 'getsavedLocations')
      .mockReturnValue(of(mockData));
    component.ngOnInit();
    expect(savedLocationsService.getsavedLocations).toHaveBeenCalled();
    expect(component.locationData).toEqual(mockData.data);
  });

  it('should fetch saved locations on onFocus', () => {
    const mockData = {
      status: true,
      message: '',
      data: ['Location1', 'Location2'],
    };
    jest
      .spyOn(savedLocationsService, 'getsavedLocations')
      .mockReturnValue(of(mockData));
    component.onFocus();
    expect(savedLocationsService.getsavedLocations).toHaveBeenCalled();
    expect(component.locationData).toEqual(mockData.data);
  });
});
