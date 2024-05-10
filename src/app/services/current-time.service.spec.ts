import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CurrentTimeService } from './current-time.service';

describe('CurrentTimeService', () => {
  let service: CurrentTimeService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrentTimeService],
    });
    service = TestBed.inject(CurrentTimeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch current time for a timezone', () => {
    const mockTimezone = 'America/New_York';
    const mockResponse = {
      datetime: '2024-05-11T12:30:00.000Z',
      timezone: 'America/New_York',
    };

    service.getCurrentTime(mockTimezone).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      'https://worldtimeapi.org/api/timezone/' + mockTimezone
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });
});
