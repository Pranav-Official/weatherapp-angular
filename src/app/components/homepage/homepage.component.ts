import { Component } from '@angular/core';
import { TemperatureWidgetComponent } from '../temperature-widget/temperature-widget.component';
@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [TemperatureWidgetComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
