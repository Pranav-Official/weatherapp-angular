import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-label-card',
  standalone: true,
  imports: [],
  templateUrl: './label-card.component.html',
  styleUrl: './label-card.component.css',
})
export class LabelCardComponent {
  constructor(private router: Router) {}

  @Input() location: string = '';
  @Input() country: string = '';
  @Input() latitude: string = '';
  @Input() longitude: string = '';
  @Input() timezone: string = '';

  onSavedLocationClick(
    latitude: string,
    longitude: string,
    name: string,
    country: string,
    timezone: string
  ) {
    this.router.navigate(['/'], {
      queryParams: { latitude, longitude, country, name, timezone },
    });

    // // this.showDropdown = false;
    // const inputElement = document.getElementById(
    //   'searchInput'
    // ) as HTMLInputElement;
    // if (inputElement) {
    //   inputElement.value = '';
    // }
  }
}
