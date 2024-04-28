import { Component, OnInit } from '@angular/core';
import { LabelTimeComponent } from '../label-time/label-time.component';
import { CommonModule } from '@angular/common';
import { SearchHistoryService } from '../../services/search-history.service';

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

  constructor(private searchHistoryService: SearchHistoryService) {}
  ngOnInit() {
    this.searchHistoryService.getSearchHistory().subscribe((data) => {
      if (data.status) {
        this.locationData = data.data.map((location: any) => {
          return {
            ...location,
            time: this.getTimeAgo(location.create_time),
          };
        });
      } else {
        console.error('Error fetching search history:', data.message);
      }
    });
  }

  // getTimeAgo(createTime: string) {
  //   const then = new Date(createTime);
  //   console.log('then', then);
  //   const now = new Date();
  //   console.log('now', now);
  //   const diff = then.getTime() - now.getTime();
  //   console.log('Difference', diff);

  //   const difference = Math.floor(diff / 1000);
  //   const seconds = Math.floor(difference / 1000);
  //   const minutes = Math.floor(seconds / 60);
  //   const hours = Math.floor(minutes / 60);
  //   const days = Math.floor(hours / 24);

  //   if (seconds < 60) {
  //     return `${seconds} sec ago`;
  //   } else if (minutes < 60) {
  //     return `${minutes} min ago`;
  //   } else if (hours < 24) {
  //     return `${hours} hrs ago`;
  //   } else {
  //     if (`${days}` == '1') {
  //       return `${days} day ago`;
  //     }
  //     return `${days} days ago`;
  //   }
  // }

  getTimeAgo(createTime: string) {
    const then = new Date(createTime).getTime();
    console.log('then', then);
    const now = new Date().getTime();
    console.log('now', now);
    const diff = Math.abs(now - then);

    console.log('Difference', diff);

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    console.log('hours:mins:secs', hours, ' ', minutes, ' ', seconds);

    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
    }
  }
}
