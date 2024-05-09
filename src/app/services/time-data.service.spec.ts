import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { TimeDataService } from './time-data.service';
import { HttpClientModule } from '@angular/common/http';

describe('TimeDataService', () => {
  let service: TimeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(TimeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
