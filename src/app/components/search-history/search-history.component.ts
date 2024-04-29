import { Component, OnInit } from '@angular/core';
import { LabelTimeComponent } from '../label-time/label-time.component';
import { CommonModule } from '@angular/common';
import { SearchHistoryService } from '../../services/search-history.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-history',
  standalone: true,
  templateUrl: './search-history.component.html',
  styleUrl: './search-history.component.css',
  imports: [LabelTimeComponent, CommonModule],
  providers: [],
})
export class SearchHistoryComponent implements OnInit {
  locationData: any[] = [];

  constructor(
    private searchHistoryService: SearchHistoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchHistoryService.getSearchHistory().subscribe((data) => {
        if (data.status) {
          this.locationData = data.data.map((location: any) => {
            return {
              ...location,
              time: this.calculateTimeAgo(location.create_time),
            };
          });
        } else {
          console.error('Error fetching search history:', data.message);
        }
      });
    });
  }

  calculateTimeAgo(dateString: string): string {
    // Replace space with T to create a valid date string

    let date = new Date(dateString);
    let currrentDateTime = new Date();
    currrentDateTime = this.adjustForTimezone(currrentDateTime);
    const diffTime = Math.abs(currrentDateTime.getTime() - date.getTime());
    const seconds = Math.floor(diffTime / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(weeks / 4);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return years + ' years ago';
    }
    if (months > 0) {
      return months + ' months ago';
    }
    if (weeks > 0) {
      return weeks + ' weeks ago';
    }
    if (days > 0) {
      return days + ' days ago';
    }
    if (hours > 0) {
      return hours + ' hrs ago';
    }
    if (minutes > 0) {
      return minutes + ' mins ago';
    }
    if (seconds > 0) {
      return seconds + ' secs ago';
    }
    return '0 secs ago';
  }
  adjustForTimezone(date: Date): Date {
    var timeOffsetInMS: number = date.getTimezoneOffset() * -60000;
    date.setTime(date.getTime() + timeOffsetInMS);
    return date;
  }
}
