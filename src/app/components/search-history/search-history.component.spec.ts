import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { SearchHistoryComponent } from './search-history.component';
import { SearchHistoryService } from '../../services/search-history.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
describe('SearchHistoryComponent', () => {
  let component: SearchHistoryComponent;
  let fixture: ComponentFixture<SearchHistoryComponent>;
  let searchHistoryService: SearchHistoryService;
  let httpMock: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchHistoryComponent, HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({}),
          },
        },
        SearchHistoryService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchHistoryComponent);
    component = fixture.componentInstance;
    searchHistoryService = TestBed.inject(SearchHistoryService);
    httpMock = jest.spyOn(searchHistoryService, 'getSearchHistory') as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should call getSearchHistory on init', () => {
  //   component.ngOnInit();

  //   expect(httpMock.get).toHaveBeenCalledWith('/searchHistory');
  // });

  it('should calculate time ago for days difference from current time', () => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const timestampString = twoDaysAgo.toISOString();

    expect(component.calculateTimeAgo(timestampString)).toEqual('2 days ago');
  });
});

// it('should calculate time ago for hours difference from current time', () => {
//   const fiveHoursAgo = new Date();
//   fiveHoursAgo.setHours(fiveHoursAgo.getHours() - 5);
//   const timestampString = fiveHoursAgo.toISOString();
//   expect(component.calculateTimeAgo(timestampString)).toEqual('10 hrs ago');
// });

// it('should calculate time ago for seconds', () => {
//   const thirtySecondsAgo = new Date();
//   thirtySecondsAgo.setSeconds(thirtySecondsAgo.getSeconds() - 30);
//   const timestampString = thirtySecondsAgo.toISOString();
//   expect(component.calculateTimeAgo(timestampString)).toEqual('30 secs ago');
// });

// it('should calculate time ago for minutes', () => {
//   const fiveMinutesAgo = new Date();
//   fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);
//   const timestampString = fiveMinutesAgo.toISOString();
//   expect(component.calculateTimeAgo(timestampString)).toEqual('5 mins ago');
// });

// it('should calculate time ago for hours', () => {
//   const fiveHoursAgo = new Date();
//   fiveHoursAgo.setHours(fiveHoursAgo.getHours() - 5);
//   const timestampString = fiveHoursAgo.toISOString();
//   expect(component.calculateTimeAgo(timestampString)).toEqual('5 hrs ago');
// });

// it('should calculate time ago for days', () => {
//   const twoDaysAgo = new Date();
//   twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
//   const timestampString = twoDaysAgo.toISOString();
//   expect(component.calculateTimeAgo(timestampString)).toEqual('2 days ago');
// });

// it('should return "0 secs ago" for the current time', () => {
//   const now = new Date();
//   const timestampString = now.toISOString();
//   expect(component.calculateTimeAgo(timestampString)).toEqual('0 secs ago');
// });

// it('should handle dates in the future', () => {
//   const futureDate = new Date();
//   futureDate.setDate(futureDate.getDate() + 1);
//   const timestampString = futureDate.toISOString();
//   expect(component.calculateTimeAgo(timestampString)).toEqual('0 secs ago'); // Or handle future dates differently
// });

// it('should handle successful search history response', () => {
//   const mockData = [
//     { id: 1, name: 'Location 1', create_time: '2024-05-07T00:00:00Z' },
//     { id: 2, name: 'Location 2', create_time: '2024-05-06T12:00:00Z' },
//   ];
//   const expectedProcessedData = [
//     { ...mockData[0], time: '0 secs ago' },
//     { ...mockData[1], time: '1 day ago' },
//   ];

//   httpMock.get.mockReturnValue(of({ status: true, data: mockData }));

//   component.ngOnInit();

//   expect(component.locationData).toEqual(expectedProcessedData);
// });

// it('should handle error response from getSearchHistory', () => {
//   const errorMessage = 'Internal server error';

//   httpMock.get.mockReturnValue(of({ status: false, message: errorMessage }));

//   spyOn(console, 'error'); // Spy on console.error for logging

//   component.ngOnInit();

//   expect(console.error).toHaveBeenCalledWith(
//     'Error fetching search history:',
//     errorMessage
//   );
// });
///
//});
