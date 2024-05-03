import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-carousel-info-tile',
  standalone: true,
  imports: [],
  templateUrl: './carousel-info-tile.component.html',
  styleUrl: './carousel-info-tile.component.css',
})
export class CarouselInfoTileComponent {
  isImperial() {
    if (localStorage.getItem('preferred_units') === 'imperial') {
      return true;
    } else {
      return false;
    }
  }
  @Input() time: string | undefined = '0';
  @Input() weather_icon_url: string | undefined = '';
  @Input() temperature: number = 0;
  @Input() wind_speed: number = 0;
  @Input() humidity: number = 0;
  @Input() uv: number = 0;
  formattedDate: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['time']) {
      this.formatTime();
    }
  }

  formatTime(): void {
    if (!this.time) return;
    const date = new Date(this.time);
    if (!isNaN(date.getTime())) {
      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
      };
      this.time = date.toLocaleDateString('en-US', options);
    }
  }
}
