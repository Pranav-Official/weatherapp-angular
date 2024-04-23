import { Component } from '@angular/core';
import { SelectorComponent } from '../selector/selector.component';

@Component({
  selector: 'app-login-signup',
  standalone: true,
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css',
  imports: [SelectorComponent],
})
export class LoginSignupComponent {}
