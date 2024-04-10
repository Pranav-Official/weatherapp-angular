import { Component } from '@angular/core';
import { TemperatureWidgetComponent } from '../temperature-widget/temperature-widget.component';
import { MapWidgetComponent } from '../map-widget/map-widget.component';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [TemperatureWidgetComponent, MapWidgetComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
