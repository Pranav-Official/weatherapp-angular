import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { GetLocationFromIpService } from './get-location-from-ip.service';
import { HttpClientModule } from '@angular/common/http';

describe('GetLocationFromIpService', () => {
  let service: GetLocationFromIpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(GetLocationFromIpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
