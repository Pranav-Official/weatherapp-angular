import { Component } from '@angular/core';
import { LabelCardComponent } from '../label-card/label-card.component';

@Component({
  selector: 'app-saved-locations',
  standalone: true,
  imports: [LabelCardComponent],
  templateUrl: './saved-locations.component.html',
  styleUrl: './saved-locations.component.css',
})
export class SavedLocationsComponent {}
