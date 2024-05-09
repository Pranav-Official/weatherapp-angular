import { TestBed } from '@angular/core/testing';
import { SavedLocationsService } from './saved-locations.service';
import { HttpClientModule } from '@angular/common/http';

describe('SavedLocationsService', () => {
  let service: SavedLocationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(SavedLocationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
