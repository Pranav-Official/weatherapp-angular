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
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-login-signup',
  standalone: true,
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css',
  imports: [SelectorComponent, CommonModule, ReactiveFormsModule],
  providers: [],
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
    private AuthenticationService: AuthenticationService,
    private settingsService: SettingsService
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
    this.commonSignup = '';
    if (this.signupForm.valid) {
      const { email, password, userName, confirm_password } =
        this.signupForm.value;
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
              this.settingsService.getSettings().subscribe((data) => {
                if (data.status) {
                  localStorage.setItem(
                    'save_seach_history',
                    data.data.save_seach_history
                  );
                  localStorage.setItem(
                    'preferred_units',
                    data.data.prefrered_units
                  );
                }
              });
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
    console.log('Inside Function 1');
    this.submittedLogin = true;
    this.commonLogin = '';
    if (this.loginForm.valid) {
      console.log('Inside Function 2');
      const { email, password } = this.loginForm.value;
      this.AuthenticationService.userLogin({ email, password }).subscribe(
        (data) => {
          if (data.status) {
            console.log('Inside Function 3');
            localStorage.setItem('accessToken', data.data.token);
            this.settingsService.getSettings().subscribe((data) => {
              if (data.status) {
                console.log('Inside Function 4', data.data.save_seach_history);
                localStorage.setItem(
                  'save_search_history',
                  data.data.save_seach_history
                );
                console.log('Inside Function 5', data.data.save_seach_history);
                localStorage.setItem(
                  'preferred_units',
                  data.data.prefrered_units
                );
                console.log('Inside Function 6', data.data.prefrered_units);
              }
            });
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
  }
  @Input() currentSelector: string = '';
}
