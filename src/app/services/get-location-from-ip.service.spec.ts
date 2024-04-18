import { TestBed } from '@angular/core/testing';

import { GetLocationFromIpService } from './get-location-from-ip.service';

describe('GetLocationFromIpService', () => {
  let service: GetLocationFromIpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetLocationFromIpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
