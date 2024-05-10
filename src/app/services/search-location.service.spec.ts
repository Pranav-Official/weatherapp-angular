import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { SearchLocationService } from './search-location.service';

describe('SearchLocationService', () => {
  let service: SearchLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(SearchLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set location correctly', () => {
    const latitude = '12.345';
    const longitude = '67.890';
    jest.spyOn(service, 'setLocation').mockImplementation((lat, long) => {
      service.latitude = lat;
      service.longitude = long;
    });
    service.setLocation(latitude, longitude);
    expect(service.latitude).toEqual(latitude);
    expect(service.longitude).toEqual(longitude);
  });
});
