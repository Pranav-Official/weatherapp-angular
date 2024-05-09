import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { SearchLocationService } from './search-location.service';
import { HttpClientModule } from '@angular/common/http';

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
});
