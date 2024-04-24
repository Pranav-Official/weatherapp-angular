import { Component } from '@angular/core';
import { LabelTimeComponent } from '../label-time/label-time.component';

@Component({
  selector: 'app-search-history',
  standalone: true,
  templateUrl: './search-history.component.html',
  styleUrl: './search-history.component.css',
  imports: [LabelTimeComponent],
})
export class SearchHistoryComponent {}
