import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel-info-tile',
  standalone: true,
  imports: [],
  templateUrl: './carousel-info-tile.component.html',
  styleUrl: './carousel-info-tile.component.css',
})
export class CarouselInfoTileComponent {
  @Input() time: string = '0';
  @Input() weather_iconUrl: string = '../../../assets/icons/Sunny Day.png';
  @Input() temperature: number = 0;
  @Input() wind_speed: number = 0;
  @Input() humidity: number = 0;
  @Input() uv: number = 0;
}
