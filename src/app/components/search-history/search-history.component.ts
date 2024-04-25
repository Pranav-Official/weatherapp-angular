import { Component } from '@angular/core';
import { LabelTimeComponent } from '../label-time/label-time.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-history',
  standalone: true,
  templateUrl: './search-history.component.html',
  styleUrl: './search-history.component.css',
  imports: [LabelTimeComponent, CommonModule],
})
export class SearchHistoryComponent {
  locationData = [
    { location: 'Kochi', country: 'India', time: '6 min' },
    { location: 'Kottayam', country: 'India', time: '5 min' },
  ];
}
