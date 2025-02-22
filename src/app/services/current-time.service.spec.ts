import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { CurrentTimeService } from './current-time.service';

describe('CurrentTimeService', () => {
  let service: CurrentTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(CurrentTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
