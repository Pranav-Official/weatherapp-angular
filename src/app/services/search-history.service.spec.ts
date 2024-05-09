import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { SearchHistoryService } from './search-history.service';
import { HttpClientModule } from '@angular/common/http';

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
// import { HttpClient } from '@angular/common/http';
// import {
//   HttpClientTestingModule,
//   HttpErrorResponse,
// } from '@angular/common/http/testing';
// import { TestBed } from '@angular/core/testing';

// import { SearchHistoryService } from './search-history.service';

// describe('SearchHistoryService', () => {
//   let service: SearchHistoryService;
//   let httpMock: HttpClient;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule],
//       providers: [SearchHistoryService],
//     });

//     service = TestBed.inject(SearchHistoryService);
//     httpMock = TestBed.inject(HttpClient);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   // Test saveSearchHistory with successful response
//   it('should save search history successfully', () => {
//     const mockResponse = { status: true, message: 'Search history saved' };
//     httpMock.post.mockReturnValue(of(mockResponse));

//     const latitude = '12.345';
//     const longitude = '-56.789';
//     const name = 'Test Location';
//     const country = 'USA';
//     const timezone = 'America/Los_Angeles';

//     service
//       .saveSearchHistory(latitude, longitude, name, country, timezone)
//       .subscribe((response) => {
//         expect(response).toEqual(mockResponse);
//       });

//     expect(httpMock.post).toHaveBeenCalledWith(baseUrl + '/searchHistory', {
//       latitude,
//       longitude,
//       name,
//       country,
//       timezone,
//     });
//   });

//   // Test saveSearchHistory with error response
//   it('should handle error when saving search history', () => {
//     const mockError = new HttpErrorResponse({
//       error: 'Internal Server Error',
//       status: 500,
//       statusText: 'Internal Server Error',
//     });
//     httpMock.post.mockReturnValue(throwError(mockError));

//     const latitude = '12.345';
//     const longitude = '-56.789';
//     const name = 'Test Location';
//     const country = 'USA';
//     const timezone = 'America/Los_Angeles';

//     service
//       .saveSearchHistory(latitude, longitude, name, country, timezone)
//       .subscribe({
//         error: (error) => {
//           expect(error).toEqual(mockError);
//         },
//       });

//     expect(httpMock.post).toHaveBeenCalledWith(baseUrl + '/searchHistory', {
//       latitude,
//       longitude,
//       name,
//       country,
//       timezone,
//     });
//   });

//   // Test getSearchHistory with successful response
//   it('should get search history successfully', () => {
//     const mockResponse = {
//       status: true,
//       message: 'Search history retrieved',
//       data: [
//         {
//           /* sample search history data */
//         },
//       ],
//     };
//     httpMock.get.mockReturnValue(of(mockResponse));

//     service.getSearchHistory().subscribe((response) => {
//       expect(response).toEqual(mockResponse);
//     });

//     expect(httpMock.get).toHaveBeenCalledWith(baseUrl + '/searchHistory');
//   });

//   // Test getSearchHistory with error response
//   it('should handle error when getting search history', () => {
//     const mockError = new HttpErrorResponse({
//       error: 'Not Found',
//       status: 404,
//       statusText: 'Not Found',
//     });
//     httpMock.get.mockReturnValue(throwError(mockError));

//     service.getSearchHistory().subscribe({
//       error: (error) => {
//         expect(error).toEqual(mockError);
//       },
//     });

//     expect(httpMock.get).toHaveBeenCalledWith(baseUrl + '/searchHistory');
//   });
// });
