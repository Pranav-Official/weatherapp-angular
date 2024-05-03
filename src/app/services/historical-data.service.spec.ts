import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HistoricalDataService } from './historical-data.service';

describe('HistoricalDataService', () => {
  let service: HistoricalDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(HistoricalDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
