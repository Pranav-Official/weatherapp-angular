import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HistoricalDataService } from './historical-data.service';

describe('HistoricalDataService', () => {
  let service: HistoricalDataService;
  let httpMock: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HistoricalDataService],
    });

    service = TestBed.inject(HistoricalDataService);
    httpMock = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should throw error for invalid selector', (done) => {
    const latitude = '12.345';
    const longitude = '-56.789';
    const startDate = '2023-11-19';
    const endDate = '2023-11-20';
    const invalidSelector = 'INVALID_SELECTOR';

    service
      .getHistoricalData(
        latitude,
        longitude,
        startDate,
        endDate,
        invalidSelector
      )
      .subscribe((error) => {
        expect(error.message).toEqual('Invalid selector'); // Check for specific error message
        done();
      });
  });

  // Test getHistoricalData with invalid date format
  it('should throw error for invalid start date format', async () => {
    const latitude = '12.345';
    const longitude = '-56.789';
    const invalidStartDate = 'invalid_date_format';
    const endDate = '2023-11-20';
    const selector = 'TEMPERATURE';

    try {
      await service.getHistoricalData(
        latitude,
        longitude,
        invalidStartDate,
        endDate,
        selector
      );
    } catch (error: any) {
      expect(error.message).toEqual('Invalid start date format'); // Check for specific error message
    }
  });

  it('should throw error for invalid end date format', async () => {
    const latitude = '12.345';
    const longitude = '-56.789';
    const startDate = '2023-11-19';
    const invalidEndDate = 'invalid_date_format';
    const selector = 'TEMPERATURE';

    try {
      await service.getHistoricalData(
        latitude,
        longitude,
        invalidEndDate,
        startDate,
        selector
      );
    } catch (error: any) {
      expect(error.message).toEqual('Invalid start date format'); // Check for specific error message
    }
  });

  it('should throw error for exceeding maximum days limit (UV Index)', async () => {
    const latitude = '12.345';
    const longitude = '-56.789';
    const startDate = '2023-11-19';
    const endDate = '2023-11-30'; // Exceeds 92 days
    const selector = 'UV INDEX';

    try {
      await service.getHistoricalData(
        latitude,
        longitude,
        startDate,
        endDate,
        selector
      );
    } catch (error: any) {
      expect(error.message).toEqual('Maximum number of days is 92'); // Check for specific error message
    }
  });

  it('should throw error for exceeding maximum days limit (Air Quality)', async () => {
    const latitude = '12.345';
    const longitude = '-56.789';
    const startDate = '2023-11-19';
    const endDate = '2023-11-30'; // Exceeds 92 days
    const selector = 'AIR QUALITY';

    try {
      await service.getHistoricalData(
        latitude,
        longitude,
        startDate,
        endDate,
        selector
      );
    } catch (error: any) {
      expect(error.message).toEqual('Maximum number of days is 92'); // Check for specific error message
    }
  });
});
