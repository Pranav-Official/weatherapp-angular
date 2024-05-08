import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { SearchHistoryService } from './search-history.service';

describe('SearchHistoryService', () => {
  let service: SearchHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(SearchHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
