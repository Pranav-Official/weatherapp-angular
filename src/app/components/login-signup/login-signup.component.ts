import { Component, Input } from '@angular/core';
import { SelectorComponent } from '../selector/selector.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login-signup',
  standalone: true,
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css',
  imports: [SelectorComponent, CommonModule, ReactiveFormsModule],
  providers: [AuthenticationService],
})
export class LoginSignupComponent {
  signupForm!: FormGroup;
  submittedSignup = false;
  commonSignup = '';
  wrongPassword: boolean = false;
  accountCreated: boolean | null = null;
  user_id: string = '';

  loginForm!: FormGroup;
  submittedLogin = false;
  commonLogin = '';
  success = false;

  constructor(
    private fb: FormBuilder,
    private AuthenticationService: AuthenticationService
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
          ),
        ],
      ],
      confirm_password: ['', [Validators.required]],
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  get fl() {
    return this.loginForm.controls;
  }

  onSubmitSignup() {
    this.submittedSignup = true;
    console.log('Submit Clicked');
    this.commonSignup = '';
    if (this.signupForm.valid) {
      const { email, password, userName, confirm_password } =
        this.signupForm.value;
      console.log('Details ---> ', email, password, userName, confirm_password);
      if (password === confirm_password) {
        const username = userName;
        // const jwt_decoded = localStorage.getItem('access_token');
        this.AuthenticationService.userSignUp({
          email,
          password,
          username,
        }).subscribe(
          (data) => {
            if (data.status) {
              localStorage.setItem('accessToken', data.data.token);
              this.accountCreated = true;
              setTimeout(() => {
                this.accountCreated = null;
                window.location.reload();
              });
              this.submittedSignup = false;
            }
          },
          ({ error }) => {
            this.commonSignup = error.message;
            this.accountCreated = false;
            setTimeout(() => {
              this.accountCreated = null;
            }, 2000);
            this.submittedSignup = false;
          }
        );
      } else {
        this.wrongPassword = true;
        setTimeout(() => {
          this.wrongPassword = false;
        }, 2000);
        this.submittedSignup = false;
      }
    }
  }

  onSubmitLogin() {
    this.submittedLogin = true;
    this.commonLogin = '';
    if (this.loginForm.valid) {
      console.log('hiiii');
      const { email, password } = this.loginForm.value;
      this.AuthenticationService.userLogin({ email, password }).subscribe(
        (data) => {
          if (data.status) {
            localStorage.setItem('accessToken', data.data.token);
            console.log('token', data.data.token);
            console.log(data);
            this.success = true;
            window.location.reload();
          }
        },
        ({ error }) => {
          this.commonLogin = error.message;
        }
      );
    }
  }

  setStatus($event: string) {
    this.currentSelector = $event;
    console.log('Selector---->', this.currentSelector);
  }
  @Input() currentSelector: string = '';
}
