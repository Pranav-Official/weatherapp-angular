import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { SettingsService } from './settings.service';

describe('SettingsServiceService', () => {
  let service: SettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(SettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
