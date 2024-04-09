import { Component } from '@angular/core';
import { SunPositionIndicatorComponent } from '../sun-position-indicator/sun-position-indicator.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [SunPositionIndicatorComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {}
