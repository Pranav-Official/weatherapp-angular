import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { LoginSignupComponent } from './login-signup.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('LoginSignupComponent', () => {
  let component: LoginSignupComponent;
  let fixture: ComponentFixture<LoginSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginSignupComponent, HttpClientModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return the controls of the signupForm', () => {
    const expectedControls = component.signupForm.controls;
    const controls = component.f;
    expect(controls).toEqual(expectedControls);
  });
});
