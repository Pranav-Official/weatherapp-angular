import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel-info-tile',
  standalone: true,
  imports: [],
  templateUrl: './carousel-info-tile.component.html',
  styleUrl: './carousel-info-tile.component.css',
})
export class CarouselInfoTileComponent {
  time: string = '09:00AM';
  weather_iconUrl: string = '../../../assets/icons/Sunny Day.png';
  temperature: number = 20;
  wind_speed: number = 5;
  rain_percentage: number = 56;
  uv: number = 12;
}
