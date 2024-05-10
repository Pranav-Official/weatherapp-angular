import { ComponentFixture, TestBed } from '@angular/core/testing';
import { throwError, of } from 'rxjs';
import { SearchHistoryComponent } from './search-history.component';
import { SearchHistoryService } from '../../services/search-history.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
describe('SearchHistoryComponent', () => {
  let component: SearchHistoryComponent;
  let fixture: ComponentFixture<SearchHistoryComponent>;
  let searchHistoryService: SearchHistoryService;
  let activatedRoute: ActivatedRoute;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      providers: [
        {
          provide: SearchHistoryService,
          useValue: { getSearchHistory: jest.fn() },
        },
        { provide: ActivatedRoute, useValue: { queryParams: of({}) } },
        { provide: Router, useValue: {} },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchHistoryComponent);
    component = fixture.componentInstance;
    searchHistoryService = TestBed.inject(SearchHistoryService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch search history on initialization', () => {
    const data = {
      status: true,
      message: 'Success',
      data: [{ create_time: '2022-05-09T12:00:00' }],
    };

    jest
      .spyOn(searchHistoryService, 'getSearchHistory')
      .mockReturnValue(of(data));

    component.ngOnInit();

    expect(searchHistoryService.getSearchHistory).toHaveBeenCalled();
    expect(component.locationData.length).toBe(1);
  });

  it('should handle error when fetching search history', () => {
    const errorData = { status: false, message: 'Error message', data: [{}] };
    const consoleErrorSpy = jest.spyOn(console, 'error');
    jest
      .spyOn(searchHistoryService, 'getSearchHistory')
      .mockReturnValue(of(errorData));
    component.ngOnInit();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error fetching search history:',
      errorData.message
    );
  });

  it('should calculate time ago for days difference from current time', () => {
    const date = new Date();
    date.setDate(date.getDate() - 2);
    const timestampString = component.calculateTimeAgo(date.toISOString());
    expect(timestampString).toEqual('2 days ago');
  });

  it('should return only "day" for 1 day time ago', () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const timestampString = component.calculateTimeAgo(date.toISOString());
    expect(timestampString).toEqual('1 day ago');
  });

  it('should return correct time ago for years', () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 2);
    const timestampString = component.calculateTimeAgo(date.toISOString());
    expect(timestampString).toEqual('2 years ago');
  });

  it('should return only "year" for 1 year time ago', () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    const timestampString = component.calculateTimeAgo(date.toISOString());
    expect(timestampString).toEqual('1 year ago');
  });

  it('should return correct time ago for months', () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 2);
    const timestampString = component.calculateTimeAgo(date.toISOString());
    expect(timestampString).toEqual('2 months ago');
  });

  it('should return only "month" for 1 month time ago', () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    const timestampString = component.calculateTimeAgo(date.toISOString());
    expect(timestampString).toEqual('1 month ago');
  });

  it('should return correct time ago for weeks', () => {
    const date = new Date();
    date.setDate(date.getDate() - 14);
    const timestampString = component.calculateTimeAgo(date.toISOString());
    expect(timestampString).toEqual('2 weeks ago');
  });
  it('should return only "week" for 1 week time ago', () => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    const timestampString = component.calculateTimeAgo(date.toISOString());
    expect(timestampString).toEqual('1 week ago');
  });

  // it('should return correct time ago for hours', () => {
  //   const currentDate = new Date();
  //   console.log('Original date', currentDate);
  //   currentDate.setHours(currentDate.getHours() - 2);
  //   console.log('adjusted date', currentDate);
  //   const timestampString = component.calculateTimeAgo(
  //     currentDate.toISOString()
  //   );
  //   console.log('TimeStampResult', timestampString);
  //   expect(timestampString).toEqual('2 hrs ago');
  // });

  // it('should return correct time ago for minutes', () => {
  //   const currentDate = new Date();
  //   console.log('Original date', currentDate);
  //   currentDate.setMinutes(currentDate.getMinutes() - 2);
  //   console.log('adjusted date', currentDate);
  //   const timestampString = component.calculateTimeAgo(
  //     currentDate.toISOString()
  //   );
  //   console.log('TimeStampResult', timestampString);
  //   expect(timestampString).toEqual('2 minutes ago');
  // });

  // it('should return correct time ago for minutes', () => {
  //   const currentDate = new Date();
  //   console.log('Original date', currentDate);
  //   currentDate.setSeconds(currentDate.getSeconds() - 2);
  //   console.log('adjusted date', currentDate);
  //   const timestampString = component.calculateTimeAgo(
  //     currentDate.toISOString()
  //   );
  //   console.log('TimeStampResult', timestampString);
  //   expect(timestampString).toEqual('2 secs ago');
  // });
  // it('should return "0 secs ago" for the same time', () => {
  //   const currentDate = new Date();
  //   console.log('Original date', currentDate);
  //   const timeAgo = component.calculateTimeAgo(currentDate.toISOString());
  //   expect(timeAgo).toEqual('0 secs ago');
  // });
});
