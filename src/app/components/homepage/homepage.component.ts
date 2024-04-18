import { Component, Input } from '@angular/core';
import { TemperatureWidgetComponent } from '../temperature-widget/temperature-widget.component';
import { MapWidgetComponent } from '../map-widget/map-widget.component';
import { SingleInfoComponent } from '../single-info/single-info.component';
import { SingleInfoLabelComponent } from '../single-info-label/single-info-label.component';
import { SunPositionIndicatorComponent } from '../sun-position-indicator/sun-position-indicator.component';
import { InfoCarousalComponent } from '../info-carousal/info-carousal.component';
import { VisualizationDropDownComponent } from '../visualization-drop-down/visualization-drop-down.component';
import { SelectorComponent } from '../selector/selector.component';
import { WeatherWidgetsComponent } from '../weather-widgets/weather-widgets.component';
import { ActivatedRoute } from '@angular/router';
import { VisualizationCartComponent } from '../visualization-cart/visualization-cart.component';

type selectedLocation = {
  latitude: string;
  longitude: string;
  name: string;
  country: string;
  timezone: string;
};
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
    WeatherWidgetsComponent,
    VisualizationCartComponent,
  ],
})
export class HomepageComponent {
  @Input() selectedLocation: selectedLocation = {
    name: 'Kochi',
    country: 'India',
    latitude: '9.9312',
    longitude: '76.2673',
    timezone: 'Asia/Kolkata',
  };
  forecastSeletor = 'HOURLY';
  visualizationSelector = 'TEMPERATURE';
  queryParams: any;
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    // Retrieve the query parameters from the route
    this.route.queryParams.subscribe((params) => {
      if (!params['latitude']) {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            console.log(
              'Latitude: ' +
                position.coords.latitude +
                ', Longitude: ' +
                position.coords.longitude
            );
            this.selectedLocation = {
              name: 'Kochi',
              country: 'India',
              latitude: position.coords.latitude.toString(),
              longitude: position.coords.longitude.toString(),
              timezone: 'Asia/Kolkata',
            };
          });
        } else {
          console.log('Geolocation is not supported by this browser.');
        }
      }
      this.selectedLocation.country = params['country'];
      this.selectedLocation.name = params['name'];
      this.selectedLocation.latitude = params['latitude'];
      this.selectedLocation.longitude = params['longitude'];
      this.selectedLocation.timezone = params['timezone'];
    });
  }

  selectorChange(forecastSelectorValue: string) {
    this.forecastSeletor = forecastSelectorValue;
  }
}
