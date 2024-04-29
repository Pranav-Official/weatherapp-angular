import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-temperature-widget',
  standalone: true,
  imports: [],
  templateUrl: './temperature-widget.component.html',
  styleUrl: './temperature-widget.component.css',
})
export class TemperatureWidgetComponent {
  isImperial() {
    if (localStorage.getItem('preferred_units') === 'imperial') {
      return true;
    } else {
      return false;
    }
  }
  @Input() temperature: string = '';
  @Input() temperature_max: string = '';
  @Input() temperature_min: string = '';
  @Input() weather_icon_url: string = '';
}
