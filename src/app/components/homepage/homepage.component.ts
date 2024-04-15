import { Component } from '@angular/core';
import { TemperatureWidgetComponent } from '../temperature-widget/temperature-widget.component';
import { MapWidgetComponent } from '../map-widget/map-widget.component';
import { SingleInfoComponent } from '../single-info/single-info.component';
import { SingleInfoLabelComponent } from '../single-info-label/single-info-label.component';
import { SunPositionIndicatorComponent } from '../sun-position-indicator/sun-position-indicator.component';
import { InfoCarousalComponent } from '../info-carousal/info-carousal.component';
import { VisualizationDropDownComponent } from '../visualization-drop-down/visualization-drop-down.component';
import { SelectorComponent } from '../selector/selector.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  imports: [
    SingleInfoComponent,
    SingleInfoLabelComponent,
    TemperatureWidgetComponent,
    MapWidgetComponent,
    SunPositionIndicatorComponent,
    InfoCarousalComponent,
    VisualizationDropDownComponent,
    SelectorComponent,
  ],
})
export class HomepageComponent {
  hourlySelector = 'HOURLY';
  temperatureSelector = 'TEMPERATURE';
}
