import { Component, Input } from '@angular/core';
import { SelectorComponent } from '../selector/selector.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login-signup',
  standalone: true,
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css',
  imports: [SelectorComponent, CommonModule, ReactiveFormsModule],
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

  constructor(private fb: FormBuilder) {
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
      password: [
        '',
        [
          Validators.required,
          // Validators.pattern(
          //   /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
          // ),
        ],
      ],
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
      console.log('Sign up Values ---> ', this.signupForm.value);
    }
  }

  onSubmitLogin() {
    this.submittedLogin = true;
    this.commonLogin = '';
    if (this.loginForm.valid) {
      console.log('Login Values ---> ', this.loginForm.value);
    }
  }

  setStatus($event: string) {
    this.currentSelector = $event;
    console.log('Selecteoer---->', this.currentSelector);
  }
  @Input() currentSelector: string = '';
}
