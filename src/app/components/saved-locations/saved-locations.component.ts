import { Component } from '@angular/core';
import { LabelCardComponent } from '../label-card/label-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-saved-locations',
  standalone: true,
  imports: [LabelCardComponent, CommonModule],
  templateUrl: './saved-locations.component.html',
  styleUrl: './saved-locations.component.css',
})
export class SavedLocationsComponent {
  locationData = [
    { location: 'Kochi', country: 'India' },
    { location: 'Kottayam', country: 'India' },
  ];
}
