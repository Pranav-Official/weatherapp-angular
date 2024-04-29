import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-label-time',
  standalone: true,
  imports: [],
  templateUrl: './label-time.component.html',
  styleUrl: './label-time.component.css',
})
export class LabelTimeComponent {
  @Input() name: string = '';
  @Input() country: string = '';
  @Input() time: string = '';
  @Input() latitude: string = '';
  @Input() longitude: string = '';
  @Input() timezone: string = '';

  constructor(private router: Router) {}
  onClickRoute() {
    this.router.navigate(['/'], {
      queryParams: {
        latitude: this.latitude,
        longitude: this.longitude,
        name: this.name,
        country: this.country,
        timezone: this.timezone,
      },
    });
  }
}
