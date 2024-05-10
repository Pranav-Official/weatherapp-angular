import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SavedLocationsService } from './saved-locations.service';

describe('SavedLocationsService', () => {
  let service: SavedLocationsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SavedLocationsService],
    });
    service = TestBed.inject(SavedLocationsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to save location', () => {
    const mockResponse = {
      status: true,
      message: 'Location saved successfully',
    };

    service
      .saveLocation(
        '10.12345',
        '20.54321',
        'UTC+2',
        'Test Location',
        'Test Country'
      )
      .subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/location'
    );
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);
  });

  it('should send a DELETE request to delete location', () => {
    const mockResponse = {
      status: true,
      message: 'Location deleted successfully',
    };

    service
      .deleteLocation(
        '10.12345',
        '20.54321',
        'UTC+2',
        'Test Location',
        'Test Country'
      )
      .subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

    const req = httpTestingController.expectOne(
      (req) =>
        req.method === 'DELETE' && req.url === 'http://localhost:3000/location'
    );
    expect(req.request.method).toEqual('DELETE');
    req.flush(mockResponse);
  });

  it('should send a GET request to check if location is saved', () => {
    const mockResponse = { status: true, message: 'Location exists', data: {} };

    service
      .isLocationSaved(
        '10.12345',
        '20.54321',
        'UTC+2',
        'Test Location',
        'Test Country'
      )
      .subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

    const req = httpTestingController.expectOne(
      (req) =>
        req.method === 'GET' &&
        req.url === 'http://localhost:3000/location/isLocationSaved'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });

  it('should send a GET request to get saved locations', () => {
    const mockResponse = {
      status: true,
      message: 'Locations fetched',
      data: [],
    };

    service.getsavedLocations().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/location'
    );
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });
});
