import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { LoginSignupComponent } from './login-signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { SettingsService } from '../../services/settings.service';
import { of, throwError } from 'rxjs';

describe('LoginSignupComponent', () => {
  let component: LoginSignupComponent;
  let fixture: ComponentFixture<LoginSignupComponent>;
  let authService: AuthenticationService;
  let settingsService: SettingsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginSignupComponent, HttpClientModule, ReactiveFormsModule],
      providers: [AuthenticationService, SettingsService],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginSignupComponent);
    authService = TestBed.inject(AuthenticationService);
    settingsService = TestBed.inject(SettingsService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the controls of the signupForm', () => {
    const expectedControls = component.signupForm.controls;
    const controls = component.f;
    expect(controls).toEqual(expectedControls);
  });

  it('should submit signup form with valid data', () => {
    component.signupForm.setValue({
      email: 'test@example.com',
      password: 'Password@12345678',
      confirm_password: 'Password@12345678',
      userName: 'Testuser',
    });

    jest.spyOn(authService, 'userSignUp').mockImplementation(() =>
      of({
        status: true,
        message: 'success',
        data: {
          token: 'sampleToken',
          username: 'testUser',
        },
      })
    );

    jest.spyOn(settingsService, 'getSettings').mockImplementation(() =>
      of({
        status: true,
        message: 'success',
        data: {
          save_seach_history: 1,
          prefrered_units: 'metric',
        },
      })
    );

    component.onSubmitSignup();

    expect(localStorage.getItem('accessToken')).toEqual('sampleToken');
    expect(localStorage.getItem('save_seach_history')).toEqual('1');
    console.log(
      'Inside Test - History Value ',
      localStorage.getItem('save_seach_history')
    );
    expect(localStorage.getItem('preferred_units')).toEqual('metric');

    expect(component.accountCreated).toBeTruthy();
    // expect(component.accountCreated).toBeNull();
  });

  it('should return as wrong password when the password field and confirm-password field has different data', fakeAsync(() => {
    component.signupForm.setValue({
      email: 'test@example.com',
      password: 'Password@12345678',
      confirm_password: 'Password@12345678910',
      userName: 'Testuser',
    });

    component.onSubmitSignup();

    // Ensure localStorage items are not set
    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(localStorage.getItem('save_seach_history')).toBeNull();
    expect(localStorage.getItem('preferred_units')).toBeNull();

    expect(component.accountCreated).toBeNull();
    expect(component.wrongPassword).toBeTruthy();
    tick(2000);
    expect(component.wrongPassword).toBeFalsy();
    // expect(component.commonSignup).toEqual('wrong password');
  }));

  it('should login when correct email id and password is given', () => {
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'Password@12345678',
    });

    jest.spyOn(authService, 'userLogin').mockImplementation(() =>
      of({
        status: true,
        message: 'success',
        data: {
          token: 'sampleToken',
          username: 'testUser',
        },
      })
    );

    jest.spyOn(settingsService, 'getSettings').mockImplementation(() =>
      of({
        status: true,
        message: 'success',
        data: {
          save_seach_history: 1,
          prefrered_units: 'metric',
        },
      })
    );

    component.onSubmitLogin();

    expect(localStorage.getItem('accessToken')).toEqual('sampleToken');
    expect(localStorage.getItem('save_search_history')).toEqual('1');
    expect(localStorage.getItem('preferred_units')).toEqual('metric');

    expect(component.success).toBeTruthy();
    // expect(component.accountCreated).toBeNull();
  });
});
