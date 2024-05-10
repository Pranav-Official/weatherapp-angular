import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthenticationService],
    });
    service = TestBed.inject(AuthenticationService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to register the user', () => {
    const mockResponse = {
      status: true,
      message: 'User created successfully',
      data: {
        token: 'asdfg34vbnm',
        username: 'ann',
      },
    };
    service
      .userSignUp({
        email: 'ann@gmail.com',
        password: 'password@123',
        username: 'ann',
      })
      .subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

    const req = httpTestingController.expectOne('http://localhost:3000/signup');
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);
  });

  it('should send a POST request to login the user', () => {
    const mockResponse = {
      status: true,
      message: 'User logged in successfully',
      data: {
        username: 'ann',
        token: 'asdfg34vbnm',
      },
    };
    service
      .userLogin({
        email: 'ann@gmail.com',
        password: 'password@123',
      })
      .subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

    const req = httpTestingController.expectOne('http://localhost:3000/login');
    expect(req.request.method).toEqual('POST');
    req.flush(mockResponse);
  });
});
