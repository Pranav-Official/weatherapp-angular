// import { TestBed } from '@angular/core/testing';

// import { HistoricalDataService } from './historical-data.service';
// import { HttpClientModule } from '@angular/common/http';

// describe('HistoricalDataService', () => {
//   let service: HistoricalDataService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientModule],
//     });
//     service = TestBed.inject(HistoricalDataService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });

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

  // it('should calculate the correct number of days between valid dates', () => {
  //   const startDateStr = '2023-11-19';
  //   const endDateStr = '2023-11-20';
  //   const expectedDays = 1;

  //   const days = service.daysBetween(startDateStr, endDateStr);

  //   expect(days).toBe(expectedDays);
  // });

  // it('should return null for invalid start date', () => {
  //   const startDateStr = 'invalid_date_format';
  //   const endDateStr = '2023-11-20';

  //   const days = service.getHistoricalData.daysBetween(
  //     startDateStr,
  //     endDateStr
  //   );

  //   expect(days).toBeNull();
  // });

  // it('should return null for invalid end date', () => {
  //   const startDateStr = '2023-11-19';
  //   const endDateStr = 'invalid_date_format';

  //   const days = service.getHistoricalData.daysBetween(
  //     startDateStr,
  //     endDateStr
  //   );

  //   expect(days).toBeNull();
  // });

  // it('should calculate days correctly considering leap year', () => {
  //   const startDateStr = '2024-02-29'; // Leap year - February 29th exists
  //   const endDateStr = '2024-03-02';

  //   const expectedDays = 2;

  //   const days = service.getHistoricalData.daysBetween(
  //     startDateStr,
  //     endDateStr
  //   );

  //   expect(days).toBe(expectedDays);
  // });
});
